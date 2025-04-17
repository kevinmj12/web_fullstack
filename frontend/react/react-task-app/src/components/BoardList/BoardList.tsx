import { FiLogIn, FiPlusCircle } from "react-icons/fi";
import { useRef, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { IBoard } from "../../types";
import {
  addButton,
  addSection,
  boardItem,
  boardItemActive,
  container,
  title,
} from "./BoardList.css";
import clsx from "clsx";
import SideForm from "./SideForm/SideForm";
import { GoSignOut } from "react-icons/go";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../firebase";
import { removeUser, setUser } from "../../store/slices/userSlice";
import { useAuth } from "../../hooks/useAuth";

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
};

const BoardList: React.FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId,
}) => {
  const boardArray = useTypedSelector((state) => state.boards.boardArray);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const dispatch = useTypedDispatch();

  const handleClick = () => {
    setIsFormOpen(!isFormOpen);
    inputRef.current?.focus();
  };

  const { isAuth } = useAuth();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        dispatch(
          setUser({
            email: userCredential.user.email,
            id: userCredential.user.uid,
          })
        );
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={container}>
      <div className={title}>게시판:</div>

      {boardArray.map((board: IBoard, index) => (
        <div
          key={board.boardId}
          onClick={() => setActiveBoardId(boardArray[index].boardId)}
          className={clsx(
            {
              [boardItemActive]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) ===
                index,
            },
            {
              [boardItem]:
                boardArray.findIndex((b) => b.boardId === activeBoardId) !==
                index,
            }
          )}
        >
          <div>{board.boardName}</div>
        </div>
      ))}
      <div className={addSection}>
        {isFormOpen ? (
          <SideForm setIsFormOpen={setIsFormOpen} />
        ) : (
          <FiPlusCircle className={addButton} onClick={handleClick} />
        )}
      </div>

      {isAuth ? (
        <GoSignOut className={addButton} onClick={handleLogout} />
      ) : (
        <FiLogIn className={addButton} onClick={handleLogin} />
      )}
    </div>
  );
};

export default BoardList;
