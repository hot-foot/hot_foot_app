import { useEffect, useState } from "react";
import _ from "lodash";
import { useNotification } from "./useNotification";

export const useCourse = (db) => {
  const [courses, setCourses] = useState([]);
  const { sendNotification, cancelNotification } = useNotification();

  const deleteNotification = (key, notification) => {
    cancelNotification(key);
    db.transaction((tx) => {
      tx.executeSql(`delete from notifications where id = ?;`, [
        notification.id,
      ]);
    });
  };

  const createNotification = async (course) => {
    let hour = Number(course.startTime.slice(0, 2));
    let minutes = Number(course.startTime.slice(3, 5));

    const key = await sendNotification({
      content: {
        title: "준비 과정 시작 알림",
        body: `${course.name} 시작 알림 입니다.`,
        sound: "BB-06_finish.mp3",
      },
      trigger: {
        hour: hour,
        minute: minutes,
        repeats: true,
      },
    });

    db.transaction((tx) => {
      tx.executeSql(
        `insert into notifications
      (notificationKey, courseId)
      values
      (?, ?)`,
        [key, course.id],
        (_, result) => {
          console.log("notification:", result);
        },
        (_, error) => {
          console.log(error);
          console.log("notification");
        }
      );
    });
  };

  const getStartTime = (arrivalTime, totalMinute, travelMinute) => {
    let date = new Date(arrivalTime);
    date.setMinutes(date.getMinutes() - totalMinute - travelMinute);
    return date;
  };

  const getCourseTodos = (todos, todoIds) => {
    return _.filter(todos, (t) => todoIds.includes(t.id));
  };

  const mergeOrderArrays = (todos, orders) => {
    const todosMap = todos.reduce((acc, todo) => {
      acc[todo.id] = todo;
      return acc;
    }, {});
    const result = [];
    orders.forEach(({ todoId, listOrder }) => {
      const todo = todosMap[todoId];
      if (todo) {
        result.push({ ...todo, order: listOrder });
      }
    });

    return result;
  };

  const executeTransaction = (callback) => {
    db.transaction(callback);
  };

  // const fetchData = (setData) => {
  //   executeTransaction((tx) => {
  //     tx.executeSql("SELECT * FROM courses", [], (_, { rows }) => {
  //       setCourses(rows._array);
  //       if (setData) {
  //         setData(rows._array);
  //       }
  //     });
  //   });
  // };
  const fetchData = (setData) => {
    executeTransaction((tx) => {
      tx.executeSql(
        `SELECT c.id, c.name, c.travelMinute, c.arrivalTime, c.totalMinute, c.startTime, c.active, GROUP_CONCAT(ct.todoId) AS todoIds
         FROM courses c
         LEFT JOIN courseTodo ct ON c.id = ct.courseId
         GROUP BY c.id`,
        [],
        (_, { rows }) => {
          const coursesWithTodos = rows._array.map((course) => ({
            ...course,
            todoIds: course.todoIds
              ? course.todoIds.split(",").map(Number)
              : [],
          }));
          setCourses(coursesWithTodos);
          if (setData) {
            setData(coursesWithTodos);
          }
        }
      );
    });
  };

  const fetchCourseTodo = (id, setData) => {
    executeTransaction((tx) => {
      tx.executeSql(
        `select * from courseTodo where courseId = ? order by listOrder;`,
        [id],
        (x, { rows: { _array: courseTodo } }) => {
          tx.executeSql(
            `select * from todos;`,
            [],
            (y, { rows: { _array: todoList } }) => {
              const courseTodoList = getCourseTodos(
                todoList,
                _.map(courseTodo, "todoId")
              );
              const todoWithOrder = mergeOrderArrays(
                courseTodoList,
                courseTodo
              );
              setData(_.sortBy(todoWithOrder, "order"));
            }
          );
        }
      );
    });
  };

  const fetchCourseById = (id, callback) => {
    executeTransaction((tx) => {
      tx.executeSql(
        `SELECT c.*, GROUP_CONCAT(ct.todoId) AS todoIds
         FROM courses c
         LEFT JOIN courseTodo ct ON c.id = ct.courseId
         WHERE c.id = ?
         GROUP BY c.id`,
        [id],
        (_, { rows }) => {
          const course = rows._array[0];
          course.todoIds = course.todoIds
            ? course.todoIds.split(",").map(Number)
            : [];
          tx.executeSql(
            `SELECT * FROM todos WHERE id IN (${course.todoIds.join(",")})`,
            [],
            (_, { rows }) => {
              course.todos = rows._array;
              callback(course);
            }
          );
        }
      );
    });
  };

  const createCourse = (course, { onSuccess, onError }) => {
    executeTransaction((tx) => {
      tx.executeSql(`select * from todos;`, [], (x, { rows: { _array } }) => {
        const todos = _array;
        const courseTodos = getCourseTodos(todos, course.todoIds);
        const totalMinute = _.sumBy(courseTodos, "minutes");
        const startTime = getStartTime(
          course.arrivalTime,
          totalMinute,
          course.travelMinute
        );

        tx.executeSql(
          `insert into courses
              (name, travelMinute, arrivalTime, totalMinute, startTime, active)
              values
              (?, ?, ?, ?, ?, ?)`,
          [
            course.name,
            course.travelMinute,
            course.arrivalTime.toTimeString(),
            totalMinute,
            startTime.toTimeString(),
            0,
          ],
          (_, result) => {
            fetchData();
            course.todoIds.forEach((t, index) => {
              result.insertId &&
                tx.executeSql(
                  `insert into courseTodo
                        (courseId, todoId, listOrder)
                        values
                        (?, ?, ?)`,
                  [result.insertId, t, index]
                );
            });
            onSuccess();
          },
          (_, error) => {
            onError();
            return false;
          }
        );
      });
    });
  };

  const copyCourse = (id) => {
    executeTransaction((tx) => {
      tx.executeSql(
        `select * from courseTodo where courseId = ?;`,
        [id],
        (x, { rows: { _array: courseTodo } }) => {
          tx.executeSql(
            `select * from courses where id = ?`,
            [id],
            (y, { rows: { _array: list } }) => {
              if (list.length > 0) {
                const course = list[0];
                tx.executeSql(
                  `insert into courses
              (name, travelMinute, arrivalTime, totalMinute, startTime, active)
              values
              (?, ?, ?, ?, ?, ?)`,
                  [
                    course.name,
                    course.travelMinute,
                    course.arrivalTime,
                    course.totalMinute,
                    course.startTime,
                    0,
                  ],
                  (_, result) => {
                    fetchData();
                    courseTodo.forEach((t) => {
                      result.insertId &&
                        tx.executeSql(
                          `insert into courseTodo
                        (courseId, todoId, listOrder)
                        values
                        (?, ?, ?)`,
                          [result.insertId, t.todoId, t.listOrder]
                        );
                    });
                    console.log(result);
                  },
                  (_, error) => {
                    console.log(error);
                    return false;
                  }
                );
              }
            }
          );
        }
      );
    });
  };

  const updateCourse = (course, { onSuccess, onError }) => {
    executeTransaction((tx) => {
      tx.executeSql(
        "UPDATE courses SET name = ?, totalMinute = ?, travelMinute = ?, startTime = ?, arrivalTime = ? WHERE id = ?;",
        [
          course.name,
          course.totalMinute,
          course.travelMinute,
          course.startTime.toTimeString(),
          course.arrivalTime.toTimeString(),
          course.id,
        ],
        (_, result) => {
          if (result.rowsAffected > 0) {
            onSuccess();
          } else {
            onError("No rows updated");
          }
        },
        (_, error) => {
          onError(error.message);
          return false;
        }
      );
    });
  };

  const deleteCourse = (id) => {
    executeTransaction((tx) => {
      tx.executeSql(`delete from courseTodo where courseId = ?`, [id]);
      tx.executeSql(
        `delete from courses where id = ?`,
        [id],
        (_, result) => {
          fetchData();
          console.log(result);
        },
        (_, error) => {
          console.log(error);
          return false;
        }
      );

      tx.executeSql(
        `delete from courseTodo where courseId = ?`,
        [id],
        (_, result) => {
          console.log(result);
        },
        (_, error) => {
          console.log(error);
          return false;
        }
      );
    });
  };

  const updateActive = (id, value) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE courses
            SET active = ?
            WHERE id = ?;`,
        [value, id],
        (_, result) => {
          tx.executeSql(
            `select * from courses where id = ?;`,
            [id],
            async (x, { rows: { _array: courses } }) => {
              console.log("courses::", courses);
              if (courses.length > 0) {
                if (courses[0].active) {
                  console.log("create notification ", courses[0].name);
                  const key = await createNotification(courses[0]);
                }
                if (!courses[0].active) {
                  tx.executeSql(
                    `select * from notifications where courseId = ?;`,
                    [id],
                    (x, { rows: { _array: notifications } }) => {
                      console.log("notifies :: ", notifications);
                      notifications.forEach((n) => {
                        console.log("delete notification ", n.key);
                        deleteNotification(tx, n);
                      });
                    }
                  );
                }
              }
            }
          );
        },
        (_, error) => {}
      );
    });
  };

  return {
    fetchData,
    fetchCourseTodo,
    fetchCourseById,
    createCourse,
    copyCourse,
    updateCourse,
    deleteCourse,
    updateActive,
  };
};
