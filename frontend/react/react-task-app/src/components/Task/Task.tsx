import React from "react";
import { container, description, title } from "./Task.css";

type TTaskProps = {
  index: number;
  id: string;
  boardId: string;
  taskName: string;
  taskDescription: string;
};

const Task: React.FC<TTaskProps> = ({
  // index,
  // id,
  // boardId,
  taskName,
  taskDescription,
}) => {
  return (
    <div className={container}>
      <div>
        <div className={title}>{taskName}</div>
        <div className={description}>{taskDescription}</div>
      </div>
    </div>
  );
};

export default Task;
