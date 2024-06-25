import { useEffect, useState } from "react";

export const usePushSetting = (db) => {
  const [setting, setSetting] = useState();

  const fetchPushData = (setData) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM pushSetting", [], (_, { rows }) => {
        if (rows._array.length > 0) {
          setSetting(rows._array[0]);
          if (setData) {
            setData(rows._array[0]);
          }
        }
      });
    });
  };

  useEffect(() => {
    fetchPushData();
  }, []);

  const updatePushSetting = (column, value) => {
    db.transaction((tx) => {
      tx.executeSql(
        `UPDATE pushSetting
            SET ${column} = ?
            WHERE 1;`,
        [value],
        (_, result) => {},
        (_, error) => {}
      );
    });
  };

  const initDefaultPush = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `select * from pushSetting;`,
        [],
        (x, { rows: { _array } }) => {
          const isSet = _array.length > 0;
          if (!isSet) {
            tx.executeSql(
              `insert into pushSetting
                (time, style)
                values
                ('00:00:00 GMT+0900', '단호하게')`,
              []
            );
          }
        }
      );
    });
  };
  return { updatePushSetting, initDefaultPush, fetchPushData };
};
