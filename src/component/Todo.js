import React, { useState } from 'react';

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);

    const addItem = () => {
        if(!inputData) {

        } else {
            setItems([...items, inputData]);
            setInputData('');
        }
    }

    // Delete Items
    const deleteItem = (id) => {
        const updatedItems = items.filter((element, index) =>{
            return index !== id ;
        })
        setItems(updatedItems);
    }

    // remove data
    const removeAll = () => {
        setItems([]);
    }

    return (
        <>
            <div className="addItems">
                <input type="text" placeholder="Add Items" 
                    value={inputData}
                    onChange={(e)=> setInputData(e.target.value)}
                
                />
                <button type="button" title="Add Item" onClick={addItem}>Add</button>
            </div>

            <div className="showItems">
                {
                    items.map((element, index)=>{
                        return(
                            <div className="singleItems" key={index}>
                                <h3>{element}</h3>
                                <i className="far fa-trash-alt icon" title="Delete Item" onClick={ () => deleteItem(index)}></i>
                            </div>
                        )
                    })
                }
            </div>

            {/* clear All data */}

            <div className="clearData">
                <button type="button" onClick={removeAll}>Delete All Items</button>
            </div>
        </>
    )
}

export default Todo
