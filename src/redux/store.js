import { createStore } from "redux";
import { reducerTodo } from "./reducer";

let initialState = [
  {
    name: "My tasks",
    id: 0,
    elements: [
      {
        name: "play with dog",
        complete: false,
        id: 0,
      },
    ],
  },
];

if (localStorage.getItem("todos") !== null) {
  initialState = JSON.parse(localStorage.getItem("todos"));
}

const store = createStore(reducerTodo, initialState);

export default store;
