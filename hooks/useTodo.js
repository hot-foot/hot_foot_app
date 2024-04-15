import { useEffect, useState } from "react";

export const useTodo = (db) => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(`select * from todos;`, [], (_, { rows: { _array } }) =>
        setTodos(_array)
      );
    });
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
                return false;
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
          return false;
        }
      );
    });
  };

  const updateTodo = (todo) => {
    db.transaction((tx) => {
      tx.executeSql(
        `update todos
            set name = ?, iconId = ?, minutes = ?
            where id = ?`,
        [todo.name, todo.iconId, todo.minutes, todo.id],
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

  const deleteTodo = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        `delete from todos where id = ?`,
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
    initDefaultTodo,
    createTodo,
    updateTodo,
    deleteTodo,
    todos,
  };
};
