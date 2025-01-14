const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector, useDispatch } = ReactRedux


import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.action.js'
import { ProgressBar } from './ProgressBar.jsx'
export function AppHeader() {

    //const dispatch = useDispatch()

    const navigate = useNavigate()
    //const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const balance = useSelector(storeState => storeState.userModule.balance)
 

    function onLogout() {
        logout()
        .catch((err) => {
            showErrorMsg('OOPs try again')
        })
    }
 

    
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                  <section className="user-section">
                  <div className="user-info">
                      <ProgressBar />
                      <Link to={`/user/${user._id}`}>Hello {user.fullname} <span>{balance.toLocaleString()}</span> </Link>
                  </div>
                  <button onClick={onLogout}>Logout</button>
                  </section>
                ) : (
                    <section>
                        <LoginSignup />
                       
                    </section>
                
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                    <NavLink to="/:userId" >User Prefernce</NavLink>

                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
