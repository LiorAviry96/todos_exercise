
import { loadTodos } from "../store/actions/todo.actions.js";
const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function ProgressBar() {


    const [numberOfDone, setNumberOfDone] = useState(0); 
    const todos = useSelector(storeState => storeState.todoModule.todos)
    const dispatch = useDispatch();
    const style = useSelector(state => state.userModule.loggedInUser.pref)




    useEffect(() => {
        onLoadTodos();
    }, []);


    useEffect(() => {
        calculateProgress();
    }, [todos]);


    function onLoadTodos() {
        loadTodos();
    }
    function calculateProgress() { 
        if (!todos || !todos.length) return;
        const doneCount = todos.filter(todo => todo.isDone).length;
        const progress = Math.floor((doneCount / todos.length) * 10);
        setNumberOfDone(progress);
    }


    return (


        <div className="progress-bar" style={style}>
            <span>progress:</span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(((bar, idx) => {
                return <div key={idx + 1} className={`bar ${idx + 1 <= numberOfDone ? 'light' : ''}`}>


                </div>
            }))}
        </div>


    )
}


