import React, { useState, useEffect } from "react";
import { TODO_ICON } from "../../data/processData";
import ProcessListSheet from "./ProcessListSheet";
import AddProcessSheet from "./addProcessSheet";
import TodoIconSheet from "./todoIconSheet";
import { useDatabase } from "../../hooks/useDatabase";
import { useTodo } from "../../hooks/useTodo";

const AddProcessComponent = ({
  onAdd,
  isSheetVisible,
  closeSheet,
  onDeleteDefaultTodoAttempt,
}) => {
  const { openDatabase, createTables } = useDatabase();
  const db = openDatabase();
  const { todos, initDefaultTodo, createTodo, deleteTodo, fetchData } = useTodo(
    db,
    onDeleteDefaultTodoAttempt
  );
  const [isIconSheetVisible, setIconSheetVisible] = useState(false);
  const [isAddSheetVisible, setAddSheetVisible] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] =
    useState(isSheetVisible);
  const [selectedIconPath, setSelectedIconPath] = useState(
    TODO_ICON[0].imagePath
  );

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
    createTodo(newTodo);
    fetchData();
    setAddSheetVisible(false);
  };

  const handleDeleteTask = (id) => {
    deleteTodo(id);
    fetchData();
  };

  return (
    <>
      <ProcessListSheet
        isVisible={isActionSheetVisible}
        onClose={handleSheetClosure}
        onAdd={onAdd}
        onPlus={handleSheetPlusBtn}
        todoList={todos}
        onDeleteTask={handleDeleteTask}
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
