import { useEffect, useState } from "react";

export const useTodo = (db) => {
  const [todos, setTodos] = useState([]);

  const fetchData = (setData) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM todos", [], (_, { rows }) => {
        setTodos(rows._array);
        if (setData) {
          setData(rows._array);
        }
      });
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const initDefaultTodo = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from dbSetting where setting = 1;`,
        [],
        (x, { rows: { _array } }) => {
          console.log("dbsetting", _array);
          const isSet = _array.length > 0;
          if (!isSet) {
            tx.executeSql(
              `insert into todos
                (name, iconId, minutes)
                values
                ('식사', 6, 20),
                ('세수', 7, 10),
                ('양치', 8, 3),
                ('샤워', 9, 20),
                ('머리 말리기 및 손질', 10, 10),
                ('옷 입기', 11, 10),
                ('화장하기', 12, 15),
                ('짐 챙기기', 13, 5),
                ('여유 부리기', 14, 10)`,
              [],
              (_, result) => {
                tx.executeSql(`INSERT INTO dbSetting (setting) VALUES (1);`);
                console.log(result);
              },
              (_, error) => {
                console.log(error);
              }
            );
          }
        }
      );
    });
  };

  const createTodo = (todo) => {
    if (todos.length > 30) {
      return;
    }
    db.transaction((tx) => {
      tx.executeSql(
        `insert into todos
          (name, iconId, minutes)
          values
          (?, ?, ?)`,
        [todo.name, todo.iconId, todo.minutes],
        (_, result) => {
          console.log(result);
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
  };

  const updateTodo = (todo) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from todos where id = ?;`,
        [todo.id],
        (x, { rows: { _array: todos } }) => {
          const t = todos[0];
          const diffMinutes = todo.minutes - t[0].minutes;
          // 10분 -> 5분 = -5분

          tx.executeSql(
            `update todos
              set name = ?, iconId = ?, minutes = ?
              where id = ?`,
            [todo.name, todo.iconId, todo.minutes, todo.id],
            (_, result) => {
              console.log(result);
              tx.executeSql(
                `select * from courseTodo where todoId = ?;`,
                [todo.id],
                (y, { rows: { _array: courseTodo } }) => {
                  courseTodo.forEach((ct) => {
                    tx.executeSql(
                      `update courses
                        set totalMinute = totalMinute + ?
                        where id = ?`,
                      [diffMinutes, ct.courseId]
                    );
                  });
                }
              );
            },
            (_, error) => {
              console.log(error);
            }
          );
        }
      );
    });
  };

  const deleteTodo = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from todos where id = ?;`,
        [id],
        (x, { rows: { _array: todos } }) => {
          const t = todos[0];
          tx.executeSql(
            `select * from courseTodo where todoId = ?;`,
            [todo.id],
            (y, { rows: { _array: courseTodo } }) => {
              courseTodo.forEach((ct) => {
                tx.executeSql(
                  `update courses
                    set totalMinute = totalMinute - ?
                    where id = ?`,
                  [t.minutes, ct.courseId]
                );
              });
              db.transaction((tx) => {
                tx.executeSql(
                  `delete from courseTodo where todoId = ?`,
                  [id],
                  (_, result) => {
                    console.log(result);
                    tx.executeSql(
                      `delete from todos where id = ?`,
                      [id],
                      (_, result) => {
                        console.log(result);
                      },
                      (_, error) => {
                        console.log(error);
                      }
                    );
                  },
                  (_, error) => {
                    console.log(error);
                  }
                );
              });
            }
          );
        }
      );
    });
  };

  return {
    initDefaultTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    fetchData,
  };
};
