import { ChangeEvent, useState } from "react";
import { icon, input, sideForm } from "./SideForm.css";
import { FiCheck } from "react-icons/fi";
import { useTypedDispatch } from "../../../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { addBoard } from "../../../store/slices/boardsSlice";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideForm: React.FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const [inputText, setInputText] = useState("");
  const dispatch = useTypedDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleOnBlur = () => {
    // 화면 외부 클릭 시 닫힘
    setIsFormOpen(false);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          // 새로운 Board 추가
          board: { boardId: uuidv4(), boardName: inputText, lists: [] },
        })
      );
      dispatch(
        addLog({
          // 새로운 Log 추가
          logId: uuidv4(),
          logMessage: "게시판 등록, ${inpuText}",
          logAuthor: "User",
          logTimestamp: String(Date.now()),
        })
      );
    }
  };

  return (
    <div className={sideForm}>
      <input
        className={input}
        autoFocus // + 버튼 클릭 시 input에 focus
        type="Text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={(e) => {
          handleChange(e);
        }}
        onBlur={handleOnBlur}
      />
      {/* onClick을 사용하면 onBlur가 먼저 실행되어 onMouseDouwn 사용 */}
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};

export default SideForm;
