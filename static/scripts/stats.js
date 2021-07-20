// CONSTANTS
const routeMap = {
    'Cases': 'stats/latest',
    'Testing': 'stats/testing/latest',
    'Beds': 'hospitals/beds'
}
const apiUrl = 'https://api.rootnet.in/covid19-in/';


// GLOBAL VARIABLES
let display = 'Cases';
const apiCache = new Map();
const regions = {};
let loaded = false;
let regionStatDisplay, dropDownList, options;

$(document).ready(function () {
    refresh();
    $('button').on('click', function (event) {
        const previousActive = $('button.active');
        previousActive.removeClass('active');
        const targetButton = $(event.target);
        targetButton.addClass('active');
        refresh()
    });
    regionStatDisplay = $('#regionalStatsDisplay');
    dropDownList = $('#regionalDropDownMenuList');

    $('#dropDown').hover((e) => {
        const styleDisplay = e.type == 'mouseenter' ? 'block' : 'none';
        dropDownList.css('display', styleDisplay);
    });

    options = $('.dropdownList');
});


function getActive() {
    return $('#selector').find('.active')[0];
}

function refresh() {
    const activeButton = getActive()?.innerHTML || 'Cases';
    const statsDisplayDiv = $('#statsDisplay');
    removeChilds(statsDisplayDiv);
    getStatData(activeButton)
        .then(data => {
            statsDisplayDiv.append(data);
        });
    return;
}

function removeChilds (parent) {
    parent.empty();
};

async function getStatData(type) {
    const url = apiUrl + routeMap[type];
    const dat = await apiGet(url);
    if (!dat || !dat.success) return `<span style='color: red;'> ERROR GETTING DATA </span>`;

    const data = dat.data;
    
    if (data.regional) {
        if (!regions[type]?.length) {
            regions[type] = [];
            regions[type].push(...data.regional?.map(mapFn(type)));
        }
        loadRegions(type, data.regional);
    } else {
        $('#regionalData').css('display', 'none');
    }
    let element = `<span style='color: green;'> Test </span>`;

    switch (type) {
        case 'Cases': {
            element = `<div id="statsHolderSmall">
                
                <div class="highlight">
                    <h1>Discharged Cases</h1>
                    <p>${Number(data.summary.discharged).toLocaleString()}</p>
                </div>
                
                <div class="highlight">
                    <h1>Deaths</h1>
                    <p>${Number(data.summary.deaths).toLocaleString()}</p>
                </div>

                <div class="highlight">
                    <h1>Total</h1>
                    <p>${Number(data.summary.total).toLocaleString()}</p>
                </div>
            </div>`
            break;
        }
        
        case 'Testing': {
            element = `<div id="statsHolderSmall">
                <div class="highlight">
                    <h1>Total Number of Tests</h1>
                    <p>${Number(data.totalSamplesTested)}</p>
                </div>
            </div>`
            break;
        }
            
        case 'Beds': {
            element = `<div id="statsHolderSmall">
                <div class="highlight">
                    <h1> Rural Beds Available </h1>
                    <p>${Number(data.summary.ruralBeds).toLocaleString()}</p>
                </div>

                <div class="highlight">
                    <h1> Urban Beds Available </h1>
                    <p>${Number(data.summary.urbanBeds).toLocaleString()}</p>
                </div>

                <div class="highlight">
                    <h1> Total Beds Available </h1>
                    <p> ${Number(data.summary.totalBeds).toLocaleString()}</p>
                </div>
            </div>`
        }
    }
    return element;
}


function apiGet(url) {
    data = apiCache.get(url);
    if (!data) {
        return fetch(url).then(x => x.json()).then(x => {
            apiCache.set(url, x);
            return x;
        }).catch(console.error);
    }
    return Promise.resolve().then(() => data);
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