import React, { useState } from "react";
import store from "../redux/store";
import {
  addTodoListItem,
  changeCompleteListItem,
  deleteCompleteTasks,
  deleteList,
} from "../redux/actions";

function Item(props) {
  let [input, setInput] = useState("");
  let [update, setUpdate] = useState(0);

  function createTodoListItem() {
    if (input) {
      store.dispatch(addTodoListItem(input, props.info));
      setInput("");
    }
  }

  function changeComplete(id) {
    setUpdate(update++);
    store.dispatch(changeCompleteListItem(props.info.id, id));
  }

  function clearDoneTasks() {
    store.dispatch(deleteCompleteTasks(props.info.id));
  }

  function deleteListHandler() {
    store.dispatch(deleteList(props.info.id));
  }

  return (
    <div className="todo-list">
      <div className="todo-header">
        <h2 className="list-title">{props.info.name}</h2>
        <p className="task-count">{props.info.elements.length}</p>
      </div>

      <div className="todo-body">
        <div className="tasks">
          {props.info.elements.map((elem) => {
            return (
              <div className="task" key={elem.id}>
                <input
                  type="checkbox"
                  checked={elem.complete}
                  onChange={() => setUpdate(update++)}
                  id={`task=${elem.id}`}
                />
                <label
                  htmlFor={`task=${elem.id}`}
                  onClick={() => changeComplete(elem.id)}
                >
                  <span className="custom-checkbox"></span>
                  {elem.name}
                </label>
              </div>
            );
          })}
          {props.info.elements.length === 0 ? (
            <div className="task">
              <label>You dont have tasks</label>
            </div>
          ) : (
            void 0
          )}
          <div className="new-task-creator">
            <div className="form tasks">
              <input
                type="text"
                className="new task"
                placeholder="new task name"
                aria-label="new task name"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button
                onClick={createTodoListItem}
                className="btn create"
                aria-label="create new task"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="delete-stuff">
          <button className="btn delete" onClick={clearDoneTasks}>
            Clear completed tasks
          </button>
          <button className="btn delete" onClick={deleteListHandler}>
            Delete list
          </button>
        </div>
      </div>
    </div>
  );
}

export default Item;
