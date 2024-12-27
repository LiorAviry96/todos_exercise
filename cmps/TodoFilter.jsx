const { useState, useEffect,useRef } = React
import { utilService } from "../services/util.service.js"

export function TodoFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...filterBy})
    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy)).current

    useEffect(() => {
        // Notify parent
        onSetFilterBy(filterByToEdit)
        console.log(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        if (!field) return; // Ignore if the name is missing

        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    // Optional support for LAZY Filtering with a button
    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, importance, isDone } = filterByToEdit
    
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form onSubmit={onSubmitFilter}>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                 <label htmlFor="isDone" >Status </label>
                <select id="isDone" name="isDone" value={isDone} onChange={(ev) => handleChange(ev)}>

                    <option value="all" >All</option>
                    <option value="done" >Done</option>
                    <option value="undone" >Active</option>
                 </select>
                <button hidden>Set Filter</button>
            </form>
        </section>
    )
}