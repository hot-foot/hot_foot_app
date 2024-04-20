import { useEffect, useState } from "react";
import _ from "lodash";

export const useCourse = (db) => {
  const [courses, setCourses] = useState([]);

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

  const fetchData = (setData) => {
    executeTransaction((tx) => {
      tx.executeSql("SELECT * FROM courses", [], (_, { rows }) => {
        setCourses(rows._array);
        if (setData) {
          setData(rows._array);
        }
      });
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

  useEffect(() => {
    fetchData();
  }, []);

  const createCourse = (course) => {
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
            console.log("create course:", result);
          },
          (_, error) => {
            console.log(error);
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

  return {
    fetchData,
    fetchCourseTodo,
    createCourse,
    copyCourse,
    deleteCourse,
  };
};
