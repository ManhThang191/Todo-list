import React from 'react'
import { useReducer, useState } from 'react'
// import reducer_Todo from '../UseReducer/UseReducer'
import { Input, Button, Checkbox } from 'antd'
import { CloseOutlined, CarryOutOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons'
import "tailwindcss";
// import Todo from '../Todos/Todo';
import Clock from '../Clock/Clock';


type Todo = {
    id: number,
    content: string,
    complete: boolean
}

type Action = | { type: "ADD_todo"; payload: string }
    | { type: "TOGGLE_todo"; payload: number }
    | { type: "DELE_todo"; payload: number }
    | { type: "Edit_todo"; payload: { id: number; text: string } }


// mang ban dau trong

// const time: Date = new Date()

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
            break;
        case "Edit_todo":
            newState = state.map(todo =>
                todo.id === action.payload.id ? { ...todo, content: action.payload.text } : todo
            );
            break;
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

    const [editingID, setEditingID] = useState<number | null>(null)
    const [editText, setEditText] = useState("")


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

    const handleSaveEdit = (id: number) => {
        if (editText.trim() !== "") {
            dispatch({ type: 'Edit_todo', payload: { id, text: editText } });
        }
        setEditingID(null); // Thoát khỏi chế độ chỉnh sửa
    };

    const handleCancelEdit = () => {

        setEditingID(null); // Đặt lại trạng thái chỉnh sửa về null
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


                            {/* <div className='todo_content' >
                                <span className='todo_text'>
                                    {todo.content}
                                </span>
                            </div> */}

                            {editingID === todo.id ? (
                                // Nếu đang chỉnh sửa, hiển thị ô nhập liệu
                                <Input
                                    className='input_edit'
                                    type="text"
                                    value={editText}
                                    onChange={e => setEditText(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleSaveEdit(todo.id)}
                                    autoFocus
                                />
                            ) : (
                                // Nếu không chỉnh sửa, hiển thị nội dung công việc
                                <span className="todo_text">{todo.content}</span>
                            )}

                            {/* Nút Edit / Save */}
                            {editingID === todo.id ? (
                                <>
                                    <div className='btn_Save_Edit'>
                                        <Button onClick={() => handleSaveEdit(editingID)} className="btn_save">
                                            <SaveOutlined />
                                        </Button>

                                        <Button
                                            className='btn_exit'
                                            onClick={() => handleCancelEdit(editingID)}
                                        >
                                            <CloseOutlined />
                                        </Button>

                                    </div>
                                    {/* <Button onClick={() => handleSaveEdit(editingID)} className="btn_save">
                                        <SaveOutlined />
                                    </Button>

                                    <Button
                                        onClick={() => handleCancelEdit(editingID)}
                                    >
                                        <CloseOutlined />
                                    </Button> */}
                                </>

                            ) : (
                                <Button
                                    onClick={() => {
                                        setEditingID(todo.id);
                                        setEditText(todo.content);
                                    }}
                                    className="btn_edit"
                                >
                                    <EditOutlined />
                                </Button>
                            )}



                            {/* <Button>
                                <EditOutlined />
                            </Button> */}



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