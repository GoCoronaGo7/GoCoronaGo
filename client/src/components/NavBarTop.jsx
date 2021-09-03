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
            <ContentGroup as="a" className="navbar-brand" title={ window.FLASK_SESSION.loggedin ? window.FLASK_SESSION.name : 'GoCoronaGo'} rootUrl="/" />
            <div className="navbar-collapse">
                {
                    window.FLASK_SESSION.loggedin
                        ? null
                        : <ContentGroup title="Accounts" width="300" height="100">
                            <ul>
                                <li> <a href='/login'>Login</a></li>
                                <li> <a href='/register'>Register</a></li>
                            </ul>
                        </ContentGroup>
                }
                <ContentGroup title="Stats" width="300" height="100">
                    <ul>
                        <li> <a href='/stats'>Stats</a></li>
                        <li> <a href='/hospitals'>Hospitals</a></li>
                    </ul>
                </ContentGroup>
                <ContentGroup title="Blogs" width="300" height="100">
                    <ul>
                        <li> <a href='/blog'>View Blogs</a></li>
                        <li> <a href='/add_blog'>Add Blog</a></li>
                    </ul>
                </ContentGroup>
            </div>
        </NavBar>
    </>)
}

export default Nav
