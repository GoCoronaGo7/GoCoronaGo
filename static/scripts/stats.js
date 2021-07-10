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
const regions = [];

$(document).ready(function () {
    refresh();
    $('button').on('click', function (event) {
        const previousActive = $('button.active');
        previousActive.removeClass('active');
        const targetButton = $(event.target);
        targetButton.addClass('active');
        refresh()  
    })
});


function getActive() {
    return $('#selector').find('.active')[0];
}

function refresh() {
    const activeButton = getActive().innerHTML;
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
    console.log(dat);
    if (!dat || !dat.success) return `<span style='color: red;'> ERROR GETTING DATA </span>`;

    const data = dat.data;
    if (regions.length === 0) {
        regions.push(...data.regional.map(x => x.loc));
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