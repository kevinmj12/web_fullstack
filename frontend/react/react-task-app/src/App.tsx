import { useState } from "react";
import { appContainer, board, buttons } from "./app.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedSelector } from "./hooks/redux";

function App() {
  const [activeBoardId, setActiveBoardId] = useState("board-0");

  const boards = useTypedSelector((state) => state.boards.boardArray);

  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];

  return (
    <div className={appContainer}>
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />
      <div className={board}>
        <ListsContainer
          lists={getActiveBoard.lists}
          boardId={getActiveBoard.boardId}
        />
      </div>
      <div className={buttons}>{/* <button>이 게시판 삭제하기</button> */}</div>
    </div>
  );
}

export default App;
