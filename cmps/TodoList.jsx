import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos, onRemoveTodo, onToggleTodo, onChangeColor }) {

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id} style={{ backgroundColor: todo.backgroundColor }}>
                    <TodoPreview todo={todo} onToggleTodo={()=>onToggleTodo(todo)}  onChangeColor={onChangeColor} />
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}