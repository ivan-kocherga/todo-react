export function reducerTodo(state, action) {
    if(action.type === 'add-todo-list'){
        state.push(
            {
                name: action.payload,
                id: Date.now(),
                elements: []
            }
        )
        return state
    }else if(action.type === 'add-todo-list-item'){
        state.forEach(elem => {
            if (elem.id === action.payload.todoList.id) {
                elem.elements.push(
                    {
                        name: action.payload.name,
                        complete: false,
                        id: Date.now(),
                    }
                )
            }
        })
        return state
    }else if(action.type === 'change-todo-list-item-complete'){
        for(let elem of state){
            if(elem.id === action.payload.idTodoList){
                for(let elemItem of elem.elements){
                    if (elemItem.id === action.payload.idTodoListItem) {
                        elemItem.complete = !elemItem.complete
                    }
                }
            }
        }
        return state
    }else if(action.type === 'delete-complete-tasks'){
        let newState = state.concat()
        for(let elem of newState){
            if(elem.id === action.payload.id){
                elem.elements = elem.elements.filter(elem => !elem.complete)
            }
        }
        return newState
    }else if(action.type === 'delete-list'){
        let newState = state.concat()
        newState = newState.filter(elem => elem.id !== action.payload.id)
        return newState
    }else {
        return state
    }
}
