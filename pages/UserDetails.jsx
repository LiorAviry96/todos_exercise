import { userService } from "../services/user.service.js"
import { saveUserPrefs } from "../store/actions/user.action.js";


const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect} = React
export function UserDetails() {

    const dispatch = useDispatch();
    const user = useSelector((storeState) => storeState.userModule.loggedInUser);

    const [userToEdit, setUserToEdit] = useState(user);

    
    function onChangPref({ target }){
        const { name, value } = target; 
        setUserToEdit((prevUser) => ({
            ...prevUser,
            [name]: value, 
        }));
    }

    function onSavePref(ev){
        console.log(userToEdit)
        ev.preventDefault();
        saveUserPrefs(user._id, {
            color: userToEdit.color,
            bgColor: userToEdit.bgColor,
        });
        alert('Preferences saved!');
        
    }



    return (
        <section className="user-pref-edit">
            <form onSubmit={onSavePref} >
                <label htmlFor="fullName">Full Name:</label>
                <input
                onChange={onChangPref}
                value={userToEdit.fullname || ""}
                type="text"
                name="fullname"
                id="fullname"
                />
                <label htmlFor="color">Color:</label>
                <input
                type="color"
                value={userToEdit.color || ""}
                onChange={onChangPref}
                title="Color"
                name="color"
                id="color"
                  />
                <label htmlFor="bgColor">Background Color:</label>
                <input
                   type="color"
                   value={userToEdit.bgColor || ""}
                   onChange={onChangPref}
                   title="Background Color"
                   name="bgColor"
                   id="bgColor"
                />

                <button>Save</button>
            </form>
        </section>
    )
}