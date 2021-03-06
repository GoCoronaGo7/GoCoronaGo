import AdminDash from './pages/dashboard/adminDash.js'
import UserDash from './pages/dashboard/userDash.js'

if (!FLASK_SESSION.loggedin) window.location = '/login'
document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Dash />, document.getElementById('root'))
})

const Dash = () => {
    return (<>
        {
            FLASK_SESSION.admin ? <AdminDash/> : <UserDash/>
        }
    </>)
}
