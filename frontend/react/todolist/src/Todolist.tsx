import { useState } from "react";
import TodoModal from "./TodoModal";

type Todo = {
  id: number;
  text: string;
  isChecked: boolean;
};

const Todolist: React.FC = () => {
  const title: string = "오늘 할 일";

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "공부하기",
      isChecked: false,
    },
    {
      id: 2,
      text: "잠자기",
      isChecked: false,
    },
    {
      id: 3,
      text: "미팅하기",
      isChecked: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo.trim(),
          isChecked: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const removeTodo = (itemId: number) => {
    setTodos(todos.filter((todo) => todo.id !== itemId));
  };

  const handleTodoClick = (todo: Todo) => {
    setSelectedTodo(todo);
    setShowDetail(true);
  };

  const handleCloseDetail = () => {
    setShowDetail(false);
  };

  return (
    <div className="container">
      <h1>{title}</h1>
      <div>
        <input
          type="text"
          placeholder="To-Do 추가"
          onChange={(e) => setNewTodo(e.target.value)}
          style={{
            marginRight: "10px",
            marginBottom: "20px",
          }}
        />
        <button
          onClick={() => {
            addTodo();
          }}
        >
          추가
        </button>
      </div>

      <div className="board">
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type="checkbox"
              onClick={() => handleCheckedChange(todo.id)}
            ></input>
            <span onClick={() => handleTodoClick(todo)}>
              {todo.isChecked ? <del>{todo.text}</del> : todo.text}
            </span>
            <button
              className="delete-button"
              onClick={() => removeTodo(todo.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <TodoModal
        show={showDetail}
        todo={selectedTodo}
        handleClose={handleCloseDetail}
      ></TodoModal>
    </div>
  );
};

export default Todolist;
