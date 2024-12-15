export function TodoPreview({ todo, onToggleTodo, onChangeColor }) {
    return (
        <article className="todo-preview" style={{ backgroundColor: todo.backgroundColor }}>
            <h2 className={(todo.isDone)? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
            <input
                type="color"
                value={todo.backgroundColor}
                onChange={(ev) => onChangeColor(todo, ev.target.value)}
                title="Choose background color"
            />
        </article>
    )
}
