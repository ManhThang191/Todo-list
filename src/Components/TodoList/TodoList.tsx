// import { useReducer, useState } from "react";
// import { Input,Button } from "antd";
// import {CloseOutlined} from "@ant-design/icons";
// import { Color } from "antd/es/color-picker";

// // 1️⃣ Định nghĩa kiểu dữ liệu
// type Todo = {
//     id: number;
//     text: string;
//     completed: boolean;
// };

// type Action =
//     | { type: "ADD"; payload: string }
//     | { type: "TOGGLE"; payload: number }
//     | { type: "REMOVE"; payload: number }
//     | { type: "EDIT"; payload: { id: number; text: string } };

// // 2️⃣ Tạo reducer function
// const todoReducer = (state: Todo[], action: Action): Todo[] => {
//     switch (action.type) {
//         case "ADD":
//             return [...state, { id: Date.now(), text: action.payload, completed: false }];

//         case "TOGGLE":
//             return state.map((todo) =>
//                 todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
//             );

//         case "REMOVE":
//             return state.filter((todo) => todo.id !== action.payload);

//         case "EDIT":
//             return state.map((todo) =>
//                 todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
//             );

//         default:
//             return state;
//     }
// };

// // 3️⃣ Component TodoList
// const TodoList = () => {
//     const [todos, dispatch] = useReducer(todoReducer, []);
//     const [input, setInput] = useState("");

//     const addTodo = () => {
//         if (input.trim()) {
//             dispatch({ type: "ADD", payload: input });
//             setInput("");
//         }
//     };

//     return (
//         <div className="container" style={{
//             width: "100%",
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             textAlign: "center"
//         }}>
//             <div className="" style={{
//                 background: "green",
//                 width: "30%",
//                 padding: "20px",
//                 borderRadius: "20px"

//             }}>
//                 <h2 className="">📌 Todo List</h2>
//                 <div className="">
//                     <Input type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         className="border p-2 flex-1 rounded"
//                         placeholder="Nhập công việc..."/>

//                     <Button onClick={addTodo}>Them</Button>
//                 </div>

//                 <ul>
//                     {todos.map((todo) => (
//                         <li key={todo.id}  style={{
//                             listStyle: "none",
//                             justifyContent: "space-between"
//                         }}>
//                             <span
//                                 style={{

//                                 }}
//                                 // className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-500" : ""}`}
//                                 onClick={() => dispatch({ type: "TOGGLE", payload: todo.id })}
//                             >
//                                 {todo.text}
//                             </span>


//                             <Button onClick={() => dispatch({ type: "REMOVE", payload: todo.id })}>
//                             <CloseOutlined />
//                             </Button>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>

//     );
// };

// export default TodoList;

import React from 'react'
import { useReducer, useState } from 'react'
// import reducer_Todo from '../UseReducer/UseReducer'
import { Input, Button, Checkbox } from 'antd'
import { CloseOutlined, CarryOutOutlined } from '@ant-design/icons'
import "tailwindcss";
// import Todo from '../Todos/Todo';
import Clock from '../Clock/Clock';


type Todo = {
    id: number,
    content: string,
    complete: boolean
}

type Action = | { type: "ADD_todo"; payload: string } | { type: "TOGGLE_todo"; payload: number } | { type: "DELE_todo"; payload: number }


// mang ban dau trong

const time: Date = new Date()

function reducer_Todo(state: Todo[], action: Action): Todo[] {

    let newState;

    switch (action.type) {
        case "ADD_todo": {
            newState = [...state, { id: Date.now(), content: action.payload, complete: false }];

        }
            break;

        case "TOGGLE_todo":
            newState = state.map(todo =>
                todo.id === action.payload ? { ...todo, complete: !todo.complete } : todo
            );

            break;
        case "DELE_todo":
            newState = state.filter(todo => todo.id !== action.payload);
            break
        default:
            return state;
    }
    localStorage.setItem("todos", JSON.stringify(newState));
    return newState;
}

const InitialState: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
//const initialState: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");

function TodoList() {
    const [state, dispatch] = useReducer(reducer_Todo, InitialState);
    const [text, setText] = useState("");

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch({ type: "ADD_todo", payload: text });
            setText("");
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && text.trim() !== "") {
            dispatch({ type: "ADD_todo", payload: text });
            setText(""); // Xóa nội dung input sau khi thêm
            focus()
        }
    };


    return (
        <div className="container">
            <div className="content">
                <h1 className="title"> <CarryOutOutlined /> Todo List <Clock /> </h1>

                <div className="input_content">
                    <Input
                        className="input"
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Thêm công việc..."
                        onKeyDown={handleKeyDown}
                    >
                    </Input>
                    <Button
                        className='button_add'
                        onClick={handleAddTodo}
                    >
                        Add
                    </Button>
                </div>
                <ul className='list'>
                    {state.map(todo => (
                        <li key={todo.id} className=""

                        onClick={() => dispatch({ type: "TOGGLE_todo", payload: todo.id })}

                        >
                            <Checkbox className='check_box'
                                checked={todo.complete}
                            >
                            </Checkbox>
                            <div className='todo_content' >
                                <span className='todo_text'>
                                    {todo.content}
                                </span>
                            </div>
                            <Button onClick={() => dispatch({ type: "DELE_todo", payload: todo.id })}
                                className="btn_dele"
                            >
                                <CloseOutlined />
                            </Button>

                        </li>
                    ))}
                </ul>
            </div>

        </div>
    )
}

export default TodoList