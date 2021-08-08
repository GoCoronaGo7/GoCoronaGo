function toggleTheme () {
    const cssLink = document.querySelector('link#theme')
    const isDarkMode = cssLink.getAttribute('href').includes('dark')
    swap(isDarkMode)
}

document.addEventListener('DOMContentLoaded', function () {
    const localLightMode = JSON.parse(localStorage.getItem('light')) // get Client side store
    const isLightMode = !!localLightMode // isLightMode is a boolean

    swap(isLightMode)

    const button = document.querySelector('theme-toggle-button')
    button.addEventListener('onclick', toggleTheme)
})

function swap (isLightMode) {
    const cssLink = document.querySelector('link#theme')
    const moonSVG = document.querySelector('#lightmode-button')
    const sunSVG = document.querySelector('#darkmode-button')

    moonSVG.style.display = isLightMode ? 'none' : 'block'
    sunSVG.style.display = isLightMode ? 'block' : 'none'

    let mode = ['lightmode', 'darkmode']
    if (isLightMode) {
        mode = mode.reverse()
    }
    const oldLink = cssLink.getAttribute('href')
    const newLink = oldLink.replace(...mode)
    cssLink.setAttribute('href', newLink)
    localStorage.setItem('light', isLightMode)
}
