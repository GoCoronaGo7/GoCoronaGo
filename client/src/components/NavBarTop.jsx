import NavBar, { ContentGroup } from './NavBar.js'
const { useEffect, useState } = React

const initialMode = window.darkMode
const themeColours = {
    background: ['', '#faebd7'],
    link: ['', 'rgb(87, 158, 132)'],
    rowBackground: ['#002025', '']
}

function Nav () {
    const [mode, setMode] = useState(initialMode)
    if (window.darkMode !== mode) setMode(window.darkMode)

    useEffect(() => {
        window.swapCall = setMode.bind(this)
    }, [setMode])

    const theme = {}
    for (const [key, value] of Object.entries(themeColours)) {
        theme[key] = value[Number(mode)]
    }

    return (<>
        <NavBar id="navbar-pro" contentBackground={ theme.rowBackground } debug={true} contentTop="-2">
            <ContentGroup as="a" className="navbar-brand" title={ FLASK_SESSION.loggedin ? FLASK_SESSION.name : 'GoCoronaGo'} rootUrl="/" />
            <div className="navbar-collapse">
                <ContentGroup title="Accounts" width="300" height="100"
                    opts={
                        FLASK_SESSION.loggedin
                            ? [['/dashboard', 'Dashboard']]
                            : [['/login', 'Login'], ['/register', 'Register']]
                    } />
                <ContentGroup title="Stats" width="300" height="100"
                    opts={
                        [
                            ['/stats', 'Stats'],
                            ['/hospitals', 'Hospitals']]
                    } />
                <ContentGroup title="Blogs" width="300" height="100"
                    opts={
                        [
                            ['/blog', 'View Blogs'],
                            ['/add_blog', 'Add Blog']]
                    } />
            </div>
        </NavBar>
    </>)
}

export default Nav
