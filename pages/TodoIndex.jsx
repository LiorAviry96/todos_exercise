import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodoOptimistic } from "../store/actions/todo.actions.js"
import { SET_FILTER_BY, UPDATE_TODO } from "../store/reducers/todo.reducer.js"


const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

const { Link, useSearchParams } = ReactRouterDOM

export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    //const [todos, setTodos] = useState(null)

    // Special hook for accessing search-params:
    //const [searchParams, setSearchParams] = useSearchParams()

    //const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

  //  const [filterBy, setFilterBy] = useState(defaultFilter)
  const dispatch = useDispatch()

    useEffect(() => {
       loadTodos()
       .catch(err => console.log('err:', err))

    }, [filterBy])

    /*function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                setTodos(prevTodos => prevTodos.filter(todo => todo._id !== todoId))
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }*/
    function onRemoveTodo(todoId) {
        const isConfirmed = window.confirm('Are you sure you want to delete this todo?');
         if (!isConfirmed) return;
        removeTodoOptimistic(todoId)
            .then(() => showSuccessMsg('Todo removed'))
            .catch(err => showErrorMsg('Cannot remove todo'))
     }

     function onChangeColor(todo, newColor){
        const updatedTodo = { ...todo, backgroundColor: newColor };
        console.log('changing color')
        todoService.save(updatedTodo)
        .then((savedTodo) => {
            showSuccessMsg('Background color updated');
            dispatch({ type: UPDATE_TODO, todo: savedTodo });
        })
        .catch(err => {
            console.error('Error updating color:', err);
            showErrorMsg('Cannot update background color');
        });

     }
    function onToggleTodo(todo) {
        const todoToSave = { ...todo, isDone: !todo.isDone }
        todoService.save(todoToSave)
            .then((savedTodo) => {
                setTodos(prevTodos => prevTodos.map(currTodo => (currTodo._id !== todo._id) ? currTodo : { ...savedTodo }))
                showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }
    function onSetFilter(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }


    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilter} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} onChangeColor={onChangeColor} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}