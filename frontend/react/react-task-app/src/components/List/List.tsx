import React from "react";
import { GrSubtract } from "react-icons/gr";
import { IList, ITask } from "../../types";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import {
  deleteList,
  setModalActive,
  updateBoards,
} from "../../store/slices/boardsSlice";
import { addLog } from "../../store/slices/loggerSlice";
import { v4 } from "uuid";
import { setModalData } from "../../store/slices/modalSlice";
import Task from "../Task/Task";
import { deleteButton, header, listWrapper, name } from "./List.css";
import ActionButton from "../ActionButton/ActionButton";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type TListProps = {
  list: IList;
  boardId: string;
};

type TSortableItem = {
  task: ITask;
  boardId: string;
  id: string;
  index: number;
};

const SortableItem: React.FC<TSortableItem> = ({
  task,
  boardId,
  id,
  index,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    cursor: "grab",
  };

  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Task
        taskName={task.taskName}
        taskDescription={task.taskDescription}
        boardId={boardId}
        id={task.taskId}
        index={index}
      />
    </div>
  );
};

const List: React.FC<TListProps> = ({ list, boardId }) => {
  const sensors = useSensors(useSensor(PointerSensor));
  const boards = useTypedSelector((state) => state.boards.boardArray);
  const dispatch = useTypedDispatch();

  const handleListDelete = (listId: string) => {
    dispatch(deleteList({ boardId, listId }));
    dispatch(
      addLog({
        logId: v4(),
        logMessage: "리스트 삭제하기",
        logAuthor: "User",
        logTimestamp: Date.now().toString(),
      })
    );
  };

  const handleTaskChange = (
    boardId: string,
    listId: string,
    taskId: string,
    task: ITask
  ) => {
    dispatch(setModalData({ boardId, listId, task }));
    dispatch(setModalActive(true));
  };

  const findTaskLocation = (taskId: string | number) => {
    for (const board of boards) {
      for (const list of board.lists) {
        const found = list.tasks.find((t) => t.taskId === taskId.toString());
        if (found) {
          return {
            boardId: board.boardId,
            listId: list.listId,
            taskId: found.taskId,
          };
        }
      }
    }
    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const source = findTaskLocation(active.id);
    const destination = findTaskLocation(over.id);

    if (source?.listId === destination?.listId && source && destination) {
      const targetBoardIndex = boards.findIndex(
        (b) => b.boardId === source.boardId
      );
      const targetListIndex = boards[targetBoardIndex].lists.findIndex(
        (l) => l.listId === source.listId
      );

      const newBoards = JSON.parse(JSON.stringify(boards));
      const targetList = newBoards[targetBoardIndex].lists[targetListIndex];

      const oldIndex = targetList.tasks.findIndex(
        (t: ITask) => t.taskId === active.id
      );
      const newIndex = targetList.tasks.findIndex(
        (t: ITask) => t.taskId === over.id
      );

      targetList.tasks = arrayMove(targetList.tasks, oldIndex, newIndex);
      dispatch(updateBoards({ boards: newBoards }));
    }
  };

  return (
    <div className={listWrapper}>
      <div className={header}>
        <div className={name}>{list.listName}</div>
        <GrSubtract
          className={deleteButton}
          onClick={() => handleListDelete(list.listId)}
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={list.tasks.map((task) => task.taskId)}
          strategy={verticalListSortingStrategy}
        >
          {list.tasks.map((task, index) => (
            <div
              key={task.taskId}
              onClick={() =>
                handleTaskChange(boardId, list.listId, task.taskId, task)
              }
            >
              <SortableItem
                key={index}
                task={task}
                boardId={boardId}
                id={task.taskId}
                index={index}
              ></SortableItem>
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <ActionButton boardId={boardId} listId={list.listId} />
    </div>
  );
};

export default List;
