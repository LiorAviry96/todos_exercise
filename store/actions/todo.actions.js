import { todoService } from "../../services/todo.service.js"
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UNDO_TODOS, UPDATE_TODO, SET_IS_LOADING } from "../reducers/todo.reducer.js"
import { store } from "../store.js"


export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy;
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    
    return todoService.query(filterBy)
        .then(todos => {
            // Dispatch the loaded todos
            store.dispatch({ type: SET_TODOS, todos });
            console.log('Todos:', todos); // Log todos here
            return todos; // Ensure the todos are returned for chaining if needed
        })
        .catch(err => {
            console.error('todo action -> Cannot load todos', err);
            throw err;
        })
        .finally(() => {
            // Always turn off the loading state
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        });
}

export function loadTodo(todoId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });

    return todoService.get(todoId) // Fetch a specific todo by ID
        .then(todo => {
            // Dispatch the loaded todo (if your state supports a single todo structure)
            store.dispatch({ type: SET_TODOS, todos: [todo] });
            console.log('Todo Id:', todoId); 
            console.log('Todo:', todo); // Log the specific todo
            return todo; // Return the todo for further use if needed
        })
        .catch(err => {
            console.error('todo action -> Cannot load todo', err);
            throw err;
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false });
        });
}



export function removeTodo(todoId) {

    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function removeTodoOptimistic(todoId) {
    store.dispatch({ type: REMOVE_TODO, todoId })
    return todoService.remove(todoId)
        .catch(err => {
            store.dispatch({ type: UNDO_TODOS })
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}