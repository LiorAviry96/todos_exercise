import { userService } from "../services/user.service.js"
import { updateUser } from "../store/actions/user.action.js";

const { useSelector, useDispatch } = ReactRedux
const { useState} = React

export function UserDetails() {

    const dispatch = useDispatch();
    const user = useSelector((storeState) => storeState.userModule.loggedInUser);
    const activities = useSelector((storeState) => storeState.userModule.activities);
    const isLoading = useSelector((storeState) => storeState.userModule.isLoading);

    const [userToEdit, setUserToEdit] = useState(user);
    //console.log('userToEdit', userToEdit)

    
    function onChangPref({ target }){
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
        }        setUserToEdit((prevUser) => ({
            ...prevUser,
            prefs: {
                ...prevUser.pref,
                [field]: value, // Update only the relevant key in prefs
            },
        }));
    }

    function onSavePref(ev){
        ev.preventDefault();
        const userToUpdate = {
            fullname: userToEdit.fullname,
            pref: { color: userToEdit.color, bgColor: userToEdit.bgColor }
        }
       
        updateUser(userToUpdate)
        //console.log('user after change', user)
        alert('Preferences saved!');
        
    }



    return (
        <section className="user-pref-edit">
          <form onSubmit={onSavePref}>
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
          {activities ? (
            !isLoading ? (
              <section className="user-activities">
                <h2>User Activities</h2>
                <ul>
                  {activities.map((activity, idx) => (
                    <li key={idx}>
                      {new Date(activity.at).toLocaleString()}: {activity.txt}
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <div>Loading...</div>
            )
          ) : (
            <p>No Todos to show...</p>
          )}
        </section>
      );
      
}