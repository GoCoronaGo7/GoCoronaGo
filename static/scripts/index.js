function toggleTheme() {
    const localDarkMode = JSON.parse(localStorage.getItem('dark')); // get Client side store

    let isDarkMode = localDarkMode ? true : false; // isDarkMode is a boolean 

    const cssLink = $('link#theme');
    const button = $('#theme-toggle-button'); // get the theme toggle button
    const moonSVG = $('#lightmode-button');
    const sunSVG = $('#darkmode-button');

    if (isDarkMode) {
        moonSVG.css('display', 'block');
        sunSVG.css('display', 'none');

        const oldLink = cssLink.attr('href');
        const newLink = oldLink.replace('darkmode', 'lightmode');
        cssLink.attr('href', newLink);

        isDarkMode = false;
        localStorage.setItem('dark', false)
    } else {
        moonSVG.css('display', 'none');
        sunSVG.css('display', 'block');
        
        const oldLink = cssLink.attr('href');
        const newLink = oldLink.replace('lightmode', 'darkmode');
        cssLink.attr('href', newLink);

        isDarkMode = true;
        localStorage.setItem('dark', true)
    }
}
$(document).ready(function() {
    const cssLink = $('link#theme');
    const moonSVG = $('#lightmode-button');
    const sunSVG = $('#darkmode-button');

    const localDarkMode = JSON.parse(localStorage.getItem('dark')); // get Client side store
    let isDarkMode = localDarkMode ? true : false; // isDarkMode is a boolean 

    if (isDarkMode) {
        moonSVG.css('display', 'none');
        sunSVG.css('display', 'block');

        const oldLink = cssLink.attr('href');
        const newLink = oldLink.replace('lightmode', 'darkmode');
        cssLink.attr('href', newLink);
    }

    $('#theme-toggle-button').click(toggleTheme);
})

