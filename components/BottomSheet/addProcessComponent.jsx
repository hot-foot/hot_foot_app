import React, { useState } from "react";

import { TODO_ICON, TODO_LIST } from "../../data/processData";
import ProcessListSheet from "./ProcessListSheet";
import AddProcessSheet from "./addProcessSheet";
import TodoIconSheet from "./todoIconSheet";
import { openDatabase } from "expo-sqlite";
import { useTodo } from "../../hooks/useTodo";
import { useDatabase } from "../../hooks/useDatabase";

const AddProcessComponent = ({ onAdd, isSheetVisible, closeSheet }) => {
  const { openDatabase, createTables } = useDatabase();
  const db = openDatabase();
  const { initDefaultTodo } = useTodo(db);
  const [isIconSheetVisible, setIconSheetVisible] = useState(false);
  const [isAddSheetVisible, setAddSheetVisible] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] =
    useState(isSheetVisible);
  const [selectedIconPath, setSelectedIconPath] = useState(
    TODO_ICON[0].imagePath
  );
  const [todoList, setTodoList] = useState(TODO_LIST);

  const initData = () => {
    createTables(db);
    initDefaultTodo();
  };

  const handleSheetPlusBtn = () => {
    setActionSheetVisible(false);
    setAddSheetVisible(true);
  };

  const handleSheetClosure = () => {
    closeSheet();
    setIconSheetVisible(false);
    setAddSheetVisible(false);
  };

  const handleChangeIcon = () => {
    setAddSheetVisible(false);
    setIconSheetVisible(true);
  };
  const handleTodoIconSheet = () => {
    setIconSheetVisible(false);
    setAddSheetVisible(true);
    initData();
  };

  const handleAddProcessSheet = () => {
    setAddSheetVisible(false);
    setActionSheetVisible(true);
    setSelectedIconPath(TODO_ICON[0].imagePath);
  };
  const handleAddTodo = (title, time, iconPath) => {
    const newTodo = {
      id: todoList.length + 1,
      title: title,
      time: time,
      imagePath: iconPath,
    };

    setTodoList([...todoList, newTodo]);

    console.log(newTodo);

    // db.transaction((tx) => {
    //   tx.executeSql(
    //     "INSERT INTO todos (id, title, time, imagePath) VALUES (?, ?, ?, ?);",
    //     [newTodo.id, newTodo.title, newTodo.time, newTodo.imagePath],
    //     (_, result) => console.log("Todo added to database"),
    //     (_, error) => console.log("Failed to add todo to database:", error)
    //   );
    // });

    setAddSheetVisible(false);
  };

  return (
    <>
      <ProcessListSheet
        isVisible={isActionSheetVisible}
        onClose={handleSheetClosure}
        // onAdd={handleAddProcess}
        onAdd={onAdd}
        onPlus={handleSheetPlusBtn}
        todoList={todoList}
      />
      <TodoIconSheet
        isVisible={isIconSheetVisible}
        onClose={handleTodoIconSheet}
        onAdd={(iconPath) => {
          setSelectedIconPath(iconPath);
          setAddSheetVisible(true);
          setIconSheetVisible(false);
        }}
      />
      <AddProcessSheet
        isVisible={isAddSheetVisible}
        onClose={handleAddProcessSheet}
        onChange={handleChangeIcon}
        selectedIconPath={selectedIconPath}
        onAddTodo={handleAddTodo}
      />
    </>
  );
};

export default AddProcessComponent;
