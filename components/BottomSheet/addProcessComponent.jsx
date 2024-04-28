import React, { useState, useEffect } from "react";

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
  const { todos, initDefaultTodo, createTodo } = useTodo(db);
  const [isIconSheetVisible, setIconSheetVisible] = useState(false);
  const [isAddSheetVisible, setAddSheetVisible] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] =
    useState(isSheetVisible);
  const [selectedIconPath, setSelectedIconPath] = useState(
    TODO_ICON[0].imagePath
  );
  const [todoList, setTodoList] = useState(TODO_LIST);

  useEffect(() => {
    createTables(db);
    initDefaultTodo();
  }, []);

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

  const handleAddTodo = (newTodo) => {
    setTodoList((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      createTodo(newTodo);
      return updatedTodos;
    });
    console.log("저장::: 성공적...", newTodo);
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
        // todoList={todoList}
        todoList={todos}
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
