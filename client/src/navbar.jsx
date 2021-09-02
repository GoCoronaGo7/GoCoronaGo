import Nav from './components/NavBarTop.js'

const { render, unmountComponentAtNode } = ReactDOM

let target
let oldNav
let showNav = false

document.addEventListener('DOMContentLoaded', () => {
    renderNav()
    window.onresize = renderNav
})

function renderNav () {
    target ||= document.getElementById('navBar-react')
    oldNav ||= document.querySelectorAll('.navbar-normal')
    const matches = window.matchMedia('(min-width: 768px)')?.matches
    if (matches) {
        if (showNav) return
        showNav = true
        oldNav.forEach(x => {
            x.style.display = 'none'
            x.style.visibility = 'hidden'
        })
        target.style.display = 'flex'
        return render(<Nav />, target)
    } else {
        oldNav.forEach(x => {
            x.style.removeProperty('display')
            x.style.removeProperty('visibility')
        })
        target.style.display = 'none'
        unmountComponentAtNode(target)
        showNav = false
    }
}
