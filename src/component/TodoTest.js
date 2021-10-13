import React, { useState, useEffect } from 'react';

const TodoTest = () => {
    const [todo, setTodo] = useState('');
    const [item, setItem] = useState([]);

    useEffect(() => {
        const mm = localStorage.getItem("majed");
        const loadedTodos = JSON.parse(mm);
        if (loadedTodos) {
            setItem(loadedTodos);
        }
      }, []);
    
      useEffect(() => {
        const data = JSON.stringify(item);
        localStorage.setItem("majed", data);
      }, [item]);

    const addItem = () => {
        setItem([...item, todo,]);
        setTodo('');
    }

    const deleteItem =(id ) => {
        const updateItem = item.filter((elemnt, index) =>{
            return id !== index
        })
        setItem(updateItem)
    }

    return (
        <>
            <div className="addItems" >
                <h1>Todo Application. </h1>
                <input 
                    type="text" 
                    placeholder="Write Your Text"
                    value={todo}
                    onChange={(e)=>{setTodo(e.target.value)}}
                
                />
                <button type="submit" title="Add Items" onClick={ addItem }>Add</button>
            </div>

            <div className="showItems" >
                
                    
                    {
                        item.map((element, index) => {
                           return (
                            <div className="singleItems" key={index}>   
                                <h3>{element}</h3>,
                                <i className="far fa-trash-alt icon" title="Delete Item" onClick={ () => deleteItem(index) } ></i>
                            </div>
                           )
                        })
                        
                    }

                
            </div>
        </>
    )
}

export default TodoTest
