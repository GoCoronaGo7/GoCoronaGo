import NavBar, { ContentGroup } from './NavBar.js'
// import styled, { css } from 'styled-components'
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
            <ContentGroup as="a" className="navbar-brand" title="GoCoronaGo" rootUrl="/" />
            <ContentGroup title="Accounts" width="300" height="100">
                <ul>
                    <li> <a href='/login'>Login</a></li>
                    <li> <a href='/register'>Register</a></li>
                </ul>
            </ContentGroup>
        </NavBar>
    </>)
}

export default Nav
