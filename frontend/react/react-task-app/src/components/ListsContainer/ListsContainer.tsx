import React from "react";
import { IList } from "../../types";
import List from "../List/List";
import { listContainer } from "./ListsContainer.css";
import ActionButton from "../ActionButton/ActionButton";

type TListsContainerProps = {
  lists: IList[];
  boardId: string;
};

const ListsContainer: React.FC<TListsContainerProps> = ({ lists, boardId }) => {
  return (
    <div className={listContainer}>
      {lists.map((list) => (
        <List key={list.listId} list={list} boardId={boardId} />
      ))}
      <ActionButton boardId={boardId} listId={""} list />
    </div>
  );
};

export default ListsContainer;
