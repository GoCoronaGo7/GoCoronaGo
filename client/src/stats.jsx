const { useState } = React;

import Selector from './components/Selector.js'; 
import StatsDisplay from './components/StatsDisplay.js';


const regions = {};
let regionStatDisplay, dropDownList, options;


document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Stats />, document.getElementById('statsHolder'))
});

const Stats = () => {
    const [active, setActive] = useState('Cases');
    
    return (<>
        <Selector active={{ value: active, set: setActive }} />
        <StatsDisplay active={active}/>
    </>);
}


function loadRegions(type, data) {
    dropDownList.empty()
    regions[type]?.map(makeMenuCard).map((x) => dropDownList.append(x));
    // $('#regional-dropDownMenuListMain').menu();
    options = $('.dropdownList');
    options.on('click', (event) => {
        const target = event.target.innerHTML;
        $("#regionalSelectedStats").html(target);
        const selected = getActive().innerHTML;
        const index = regions[selected].indexOf(target);
        
        const dat = data[index];
        if (index == -1 || !dat) {
            console.error('Error')  
        }
        regionStatDisplay.empty().append(makeCard(selected, dat));
        dropDownList.css('display', 'none');
    })
    $('#regionalData').css('display', 'block');

    const region = $("#regionalSelectedStats").text();
    const index = regions[type].indexOf(region);
    const dat = data[index];
    if (!dat) {
        return;
    };
    regionStatDisplay.empty().append(makeCard(type, dat));
    return;

}

function makeCard(type, data) {
    if (type == 'Cases') {
        return `<div class="highlight">
            <h1>${data.loc}</h1>
            <h3>Cured</h3>
            <p>${data.discharged}</p>
            <h3>Deaths</h3>
            <p>${data.deaths}</p>
            <h3>Total</h3>
            <p>${data.totalConfirmed}</p>
        </div>`
    } else {
        return `<div class="highlight">
            <h1>${data.state}</h1>
            <h3>Rural Beds</h3>
            <p>${data.ruralBeds}</p>
            <h3>Urban Beds</h3>
            <p>${data.urbanBeds}</p>
            <h3>Total Beds</h3>
            <p>${data.totalBeds}</p>
        </div>`
    }
}

function makeMenuCard(name) {
    return `<li id="dropdown-${name}" class="dropdownList">${name}</button>`
}

const mapFn = (t) => t == 'Cases' ? (x => x.loc) : (x => x.state);