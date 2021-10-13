import React, { useEffect, useRef, useState } from 'react'

const Test = () => {

    const inputRef = useRef(null);

    const [todoItem, setTodoItem] = useState([]);
    const [todo, setTodo] = useState('');
    const [editTodo, setEditTodo] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(()=> {
        inputRef.current.focus()
    }, [])

    // get Data
    useEffect(()=>{
        const todo = localStorage.getItem('data');
        const loadTodo = JSON.parse(todo);
        if(loadTodo) {
            setTodoItem(loadTodo)
        }

    }, []);

    // Data Store in local Storeage
    useEffect(() => {
        const convertToJson = JSON.stringify(todoItem);
        localStorage.setItem('data', convertToJson)
    }, [todoItem]);

    const submitHandler = (e) => {
        e.preventDefault();

        const newTodo = {
            id: new Date().getTime(),
            text: todo
        }

        if (!todo) {

        } else {
            setTodoItem([...todoItem].concat(newTodo));
            setTodo('');
        }

    }
    
    const deleteItem = (id) => {
        const updatedItems = todoItem.filter((ele)=>{
            return ele.id !== id
        })
        setTodoItem(updatedItems)
    }

    const editingTodo = (id) => {
        const updatedTodo = todoItem.map((todo) => {
            if (todo.id === id ) {
                todo.text = editText
            } 
            return todo
            
        })
        setTodoItem(updatedTodo);
        setEditTodo(null);
        setEditText('');

    }
    
    return (
        <>
            <h1>Todo Application</h1>

            <form onSubmit={submitHandler}>
                <input
                    className="add-text" 
                    type="text"
                    placeholder="Enter Text"
                    value={todo}
                    ref={inputRef}
                    onChange={ e => setTodo(e.target.value) }
                />
                <input type="submit" value="Add Item" />
            </form>

            <hr className="spaceing" />

            {
                todoItem.map((element) => {
                    return (
                        <div key={element.id} className="todoItemBox">
                            {
                                editTodo === element.id ? (
                                    <input 
                                    type="text" 
                                    onChange={(e)=> setEditText(e.target.value)} 
                                    value={editText }
                                    />
                                ) : (
                                    <div className="singleTodo">
                                        {element.text}
                                    </div>
                                )
                            }

                            <button className="btn" type="button" onClick={() => deleteItem(element.id)}>Delete</button>

                            {
                                editTodo === element.id ? (
                                    <button className="btn" type="button" onClick={() => editingTodo(element.id)}>Submit</button>
                                ) : (
                                    <button className="btn" type="button" onClick={() => setEditTodo(element.id)}>Edit</button>
                                )
                            }

                        </div>
                    )
                }) 
            }
        </>
    )
}

export default Test
