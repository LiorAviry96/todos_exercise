import { todoService } from "../../services/todo.service.js"
import { ADD_TODO,SET_DONE_TODOS_PERCENT, REMOVE_TODO, SET_TODOS, UNDO_TODOS, UPDATE_TODO, SET_IS_LOADING } from "../reducers/todo.reducer.js"
import { store } from "../store.js"
import { addActivity } from "./user.action.js";

export function loadTodos(filterSort) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return todoService.query(filterSort)
        .then(({ todos, doneTodosPercent }) => {
            //console.log('todos final ',todos)
            //console.log(filterSort)

            store.dispatch({
                type: SET_TODOS,
                todos
            })
            _setTodosData(doneTodosPercent)
            return todos
        })
        .catch(err => {
            console.error('Cannot load todos:', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function loadTodo(todoId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });

    return todoService.get(todoId) // Fetch a specific todo by ID
        .then(todo => {
            // Dispatch the loaded todo (if your state supports a single todo structure)
            store.dispatch({ type: SET_TODOS, todos: [todo] });
            _setTodosData(doneTodosPercent)
            //console.log('Todo Id:', todoId); 
            //console.log('Todo:', todo); // Log the specific todo
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

/*export function removeTodoOptimistic(todoId) {
    return todoService.remove(todoId)
    .then(({ doneTodosPercent }) => {
        store.dispatch({
            type: REMOVE_TODO,
            todoId
        })
        _setTodosData(doneTodosPercent)
    })
    .then(() => addUserActivity('Removed the Todo: ' + todoId))
    .catch(err => {
        console.error('Cannot remove todo:', err)
        throw err
    })
}*/

export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    console.log(type)

    console.log(todo)
    return todoService.save(todo)
        .then(( { savedTodo, doneTodosPercent } ) => {
            store.dispatch({
                type,
                todo: savedTodo
            })
            _setTodosData(doneTodosPercent)
            console.log('got in')
            return savedTodo
        })
        .then(res => {
            const actionName = (todo._id) ? 'Updated' : 'Added'
            return addActivity(`${actionName} a Todo: ` + todo.txt).then(() => res)
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}

function _setTodosData(doneTodosPercent) {
    store.dispatch({
        type: SET_DONE_TODOS_PERCENT,
        doneTodosPercent
    })
}