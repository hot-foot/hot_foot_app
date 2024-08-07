import React, { useState, useEffect } from "react";
import ProcessListSheet from "./ProcessListSheet";
import AddProcessSheet from "./addProcessSheet";
import TodoIconSheet from "./todoIconSheet";
import { useDatabase } from "../../hooks/useDatabase";
import { useTodo } from "../../hooks/useTodo";
import { useIconImage } from "../../hooks/useIconImage";

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
  const { images } = useIconImage();
  const [iconId, setIconId] = useState(0);

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
    setIconId(0);
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
        onAdd={(iconId) => {
          setIconId(iconId);
          setAddSheetVisible(true);
          setIconSheetVisible(false);
        }}
      />
      <AddProcessSheet
        isVisible={isAddSheetVisible}
        onClose={handleAddProcessSheet}
        onChange={handleChangeIcon}
        selectedIconId={iconId}
        onAddTodo={handleAddTodo}
      />
    </>
  );
};

export default AddProcessComponent;
