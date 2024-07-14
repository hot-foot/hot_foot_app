import { useEffect, useState } from "react";

export const useTodo = (db, onDeleteDefaultTodo) => {
  const [todos, setTodos] = useState([]);
  const defaultTodos = [
    { id: 1, name: "식사", iconId: 6, minutes: 20 },
    { id: 2, name: "세수", iconId: 7, minutes: 10 },
    { id: 3, name: "양치", iconId: 8, minutes: 3 },
    { id: 4, name: "샤워", iconId: 9, minutes: 20 },
    { id: 5, name: "머리 말리기 및 손질", iconId: 10, minutes: 10 },
    { id: 6, name: "옷 입기", iconId: 11, minutes: 10 },
    { id: 7, name: "화장하기", iconId: 12, minutes: 15 },
    { id: 8, name: "짐 챙기기", iconId: 13, minutes: 5 },
    { id: 9, name: "여유 부리기", iconId: 14, minutes: 10 },
  ];

  const fetchData = (setData) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM todos", [], (_, { rows }) => {
        setTodos(rows._array);
        if (setData) {
          console.log(rows._array);
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
            defaultTodos.forEach((todo) => {
              tx.executeSql(
                `insert into todos
                  (id, name, iconId, minutes)
                  values
                  (?, ?, ?, ?)`,
                [todo.id, todo.name, todo.iconId, todo.minutes]
              );
            });
            tx.executeSql(`INSERT INTO dbSetting (setting) VALUES (1);`);
          }
        }
      );
    });
  };

  const isDefaultTodo = (name) => {
    return defaultTodos.some((todo) => todo.name === name);
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
          fetchData();
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
          const diffMinutes = todo.minutes - t.minutes;
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
              fetchData();
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
          if (isDefaultTodo(t.name)) {
            console.log("디폴트 할 일은 삭제할 수 없습니다.");
            if (onDeleteDefaultTodo) {
              onDeleteDefaultTodo();
            }
            return;
          }
          tx.executeSql(
            `select * from courseTodo where todoId = ?;`,
            [id],
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
                        fetchData();
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
    todos,
  };
};
