import React, { useState, useEffect, useRef } from 'react'
import Item from './Item'
import store from "../redux/store";
import { addTodoList } from '../redux/actions'

function Main() {
    let [state, setState] = useState(store.getState())
    let [activeTodosList, setActiveTodosList] = useState(
        localStorage.getItem('todosListActive') !== null
            ? Number(localStorage.getItem('todosListActive'))
            : 0
    )
    let [input, setInput] = useState('')

    useEffect(() => {
        const sub = store.subscribe(() => {
            let page = localStorage.getItem('todosListActive') !== null
                ? Number(localStorage.getItem('todosListActive'))
                : 0
            if(store.getState()[page] === undefined && store.getState().length > 0){
                localStorage.setItem('todosListActive', page - 1)
                setActiveTodosList(page - 1)
                localStorage.setItem('todosListActive', page - 1)
            }
            if(store.getState().length === 0){
                localStorage.setItem('todosListActive', 0)
                setActiveTodosList(0)
            }
            setState(store.getState())
            localStorage.setItem('todos', JSON.stringify(store.getState()))
        })

        return () => sub()
    }, [])

    function createTodoList(){
        if(input){
            store.dispatch(addTodoList(input))
            setInput('')
        }
    }

    function toTodosList(index){
        setActiveTodosList(index)
        console.log(index, activeTodosList)
        localStorage.setItem('todosListActive', index)
    }

    return(
        <div className='body'>
            <div className="all-tasks">
                <h2 className="task-list-title">My lists</h2>
                <ul className="task-list">
                    {
                        state.length > 0
                        ? state.map((elem, index) => {
                            return(
                                <li onClick={() => toTodosList(index)} className={`list-name ${activeTodosList === index ? 'active-list' : ''}`}  key={elem.id}>{elem.name}</li>
                            )
                        }) : void 0
                    }
                </ul>

                <div className='form'>
                    <input 
                        type="text"
                        className="new list"
                        placeholder="new list name"
                        aria-label="new list name"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <button className="btn create" onClick={createTodoList}>+</button>
                </div>
                {
                    state.length === 0 ? <p>You dont have todo list</p> : void 0
                }
            </div>
            {
                state.length > 0 ? <Item info={state[activeTodosList]}/> : void 0
            }

        </div>
    )
}

export default Main