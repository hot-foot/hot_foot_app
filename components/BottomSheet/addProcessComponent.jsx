import React, { useState } from "react";

import { TODO_ICON, TODO_LIST } from "../../data/processData";
import ProcessListSheet from "./ProcessListSheet";
import AddProcessSheet from "./addProcessSheet";
import TodoIconSheet from "./todoIconSheet";

const AddProcessComponent = ({ onAdd, isSheetVisible, closeSheet }) => {
  const [isIconSheetVisible, setIconSheetVisible] = useState(false);
  const [isAddSheetVisible, setAddSheetVisible] = useState(false);
  const [isActionSheetVisible, setActionSheetVisible] =
    useState(isSheetVisible);
  const [selectedIconPath, setSelectedIconPath] = useState(
    TODO_ICON[0].imagePath
  );
  const [todoList, setTodoList] = useState(TODO_LIST);
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
  };

  const handleAddProcessSheet = () => {
    setAddSheetVisible(false);
    setActionSheetVisible(true);
    setSelectedIconPath(TODO_ICON[0].imagePath);
  };
  const handleAddTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
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
