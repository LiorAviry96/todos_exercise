import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/actions/todo.actions.js"
import { INCREMENT_BALANCE } from "../store/reducers/user.reducer.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM
const { useDispatch } = ReactRedux

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const [isLoadingTodo, setIsLoadingTodo] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    /*useEffect(() => {
        if (params.todoId) {
            loadTodo(params.todoId).then(todo => setTodoToEdit(todo))
            .catch(err => {
                console.log('Had issues in todo edit', err)
                navigate('/todo')
            })
            .finally(() => setIsLoadingTodo(false))
        }
            
    }, [params.todoId])*/

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoService.get(params.todoId)
            .then(setTodoToEdit)
            .catch(err => console.log('err:', err))
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    /*function onSaveTodo(ev) {
        ev.preventDefault()
        todoService.save(todoToEdit)
            .then((savedTodo) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })
    }*/

    function onSaveTodo(ev){
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then(() => {
                navigate('/todo')
                showSuccessMsg('Todo Saved!')
                navigate('/todo')
            })
            .catch(err => {
                console.log('Had issues saving todo', err)
                showErrorMsg('Had issues saving todo')
            })
       
    }


    const { txt, importance, isDone } = todoToEdit

    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>
        </section>
    )
}