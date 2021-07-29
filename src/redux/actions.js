export const addTodoList = (name) =>{
    return{
        type: 'add-todo-list',
        payload: name
    }
}

export const addTodoListItem = (name, todoList) =>{
    return{
        type: 'add-todo-list-item',
        payload: {
            name,
            todoList
        }
    }
}

export const changeCompleteListItem = (idTodoList, idTodoListItem) =>{
    return{
        type: 'change-todo-list-item-complete',
        payload: {
            idTodoList,
            idTodoListItem
        }
    }
}

export const deleteCompleteTasks = (id) =>{
    return{
        type: 'delete-complete-tasks',
        payload: {
            id
        }
    }
}

export const deleteList = (id) =>{
    return{
        type: 'delete-list',
        payload: {
            id
        }
    }
}