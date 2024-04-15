import * as SQLite from "expo-sqlite";
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";

const DATABASE_NAME = "HotFootDB.db";

/**
 * 최초 데이터 베이스에 연결한다.
 * @returns {SQLite.WebSQLDatabase} db
 */

export const useDatabase = () => {
  const openDatabase = () => {
    if (Platform.OS === "web") {
      return {
        transaction: () => {
          return {
            executeSql: () => {},
          };
        },
      };
    }

    const db = SQLite.openDatabase(DATABASE_NAME);
    // [필수] 코드가 트랜잭션내에서 작동하지 않는 경우
    db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () => {});

    FileSystem.getInfoAsync(
      FileSystem.documentDirectory + "SQLite/" + DATABASE_NAME
    )
      .then(({ exists, uri }) => {
        if (exists) {
          console.log("Database file exists at:", uri);
        } else {
          console.log("Database file does not exist.");
        }
      })
      .catch((error) => {
        console.error("Error getting database info:", error);
      });

    return db;
  };

  const createTables = async (dbInstance) => {
    const queries = [
      `create table if not exists courses
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              name TEXT, 
              travelMinute INTEGER,
              arrivalTime TEXT,
              totalMinute INTEGER,
              startTime TEXT,
              active INTEGER
            )`,
      `create table if not exists todos
            (
              id INTEGER PRIMARY KEY AUTOINCREMENT, 
              name TEXT,
              iconId INTEGER, 
              minutes INTEGER
            )`,
      `create table if not exists courseTodo
            (
              courseId INTEGER, 
              todoId INTEGER,
              listOrder INTEGER,
              FOREIGN KEY(courseId) REFERENCES courses(id),
              FOREIGN KEY(todoId) REFERENCES todos(id)
            )`,
      `create table if not exists dbSetting
            (
              setting INTEGER
            )`,
    ];
    return await new Promise((resolve, reject) => {
      dbInstance.transaction(
        (tx) => {
          queries.forEach((query) => {
            tx.executeSql(query);
          });
        },
        (error) => {
          reject("데이터베이스 테이블 생성 오류");
          console.log(error);
          return false;
        },
        () => {
          console.log;
          resolve();
        }
      );
    });
  };

  return { openDatabase, createTables };
};
