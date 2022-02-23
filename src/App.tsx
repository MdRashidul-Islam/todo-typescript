import { Box, Button, Grid, TextField } from "@mui/material";
import { useCallback, useEffect, useReducer, useRef } from "react";
import "./App.css";

//get data from localStorage
const getLocalItems = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
interface Todo {
  id: number;
  text: string;
}

type ActionType =
  | {
      type: "ADD";
      text: string;
    }
  | { type: "REMOVE"; id: number };

function App() {
  function reducer(state: Todo[], action: ActionType) {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
    }
  }
  const [todos, dispatch] = useReducer(reducer, getLocalItems());

  const newTodoRef = useRef<HTMLInputElement>(null);

  const addTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  const removeTodo = (id: number) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  };

  //add to local storage
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="main_container">
      <div className="section">
        <input type="text" ref={newTodoRef} placeholder="ADD TODO" />
        <button onClick={addTodo}>+</button>
        <div className="content">
          {todos.map((todo) => (
            <div className="single_todo" key={todo.id}>
              <div className="todo_text"> ✓ {todo.text}</div>
              <div className="button">
                <button onClick={() => removeTodo(todo.id)}>X</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
