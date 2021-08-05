const {
  useState
} = React;
import Selector from './components/selector.js'; // CONSTANTS

const routeMap = {
  'Cases': 'stats/latest',
  'Testing': 'stats/testing/latest',
  'Beds': 'hospitals/beds'
};
const apiUrl = 'https://api.rootnet.in/covid19-in/'; // GLOBAL VARIABLES

let display = 'Cases';
const apiCache = new Map();
const regions = {};
let regionStatDisplay, dropDownList, options;
document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(Stats, null), document.getElementById('statsHolder'));
});

const Stats = () => {
  const [active, setActive] = useState('Cases');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Selector, {
    active: (active, setActive)
  }));
};

async function refresh() {
  const activeButton = getActive()?.innerHTML || 'Cases';
  const statsDisplayDiv = document.querySelector('#statsDisplay');
  const Stats = await getStatData(activeButton);
  ReactDom.render( /*#__PURE__*/React.createElement(Stats, null), statsDisplayDiv);
  return;
}

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

  let element = /*#__PURE__*/React.createElement("span", {
    style: "color: green;"
  }, " Test ");

  switch (type) {
    case 'Cases':
      {
        element = /*#__PURE__*/React.createElement("div", {
          id: "statsHolderSmall"
        }, /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, "Discharged Cases"), /*#__PURE__*/React.createElement("p", null, Number(data.summary.discharged).toLocaleString())), /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, "Deaths"), /*#__PURE__*/React.createElement("p", null, Number(data.summary.deaths).toLocaleString())), /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, "Total"), /*#__PURE__*/React.createElement("p", null, Number(data.summary.total).toLocaleString())));
        break;
      }

    case 'Testing':
      {
        element = /*#__PURE__*/React.createElement("div", {
          id: "statsHolderSmall"
        }, /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, "Total Number of Tests"), /*#__PURE__*/React.createElement("p", null, "$", Number(data.totalSamplesTested))));
        break;
      }

    case 'Beds':
      {
        element = /*#__PURE__*/React.createElement("div", {
          id: "statsHolderSmall"
        }, /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, " Rural Beds Available "), /*#__PURE__*/React.createElement("p", null, "$", Number(data.summary.ruralBeds).toLocaleString())), /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, " Urban Beds Available "), /*#__PURE__*/React.createElement("p", null, "$", Number(data.summary.urbanBeds).toLocaleString())), /*#__PURE__*/React.createElement("div", {
          className: "highlight"
        }, /*#__PURE__*/React.createElement("h1", null, " Total Beds Available "), /*#__PURE__*/React.createElement("p", null, " $", Number(data.summary.totalBeds).toLocaleString())));
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
  dropDownList.empty();
  regions[type]?.map(makeMenuCard).map(x => dropDownList.append(x)); // $('#regional-dropDownMenuListMain').menu();

  options = $('.dropdownList');
  options.on('click', event => {
    const target = event.target.innerHTML;
    $("#regionalSelectedStats").html(target);
    const selected = getActive().innerHTML;
    const index = regions[selected].indexOf(target);
    const dat = data[index];

    if (index == -1 || !dat) {
      console.error('Error');
    }

    regionStatDisplay.empty().append(makeCard(selected, dat));
    dropDownList.css('display', 'none');
  });
  $('#regionalData').css('display', 'block');
  const region = $("#regionalSelectedStats").text();
  const index = regions[type].indexOf(region);
  const dat = data[index];

  if (!dat) {
    return;
  }

  ;
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
        </div>`;
  } else {
    return `<div class="highlight">
            <h1>${data.state}</h1>
            <h3>Rural Beds</h3>
            <p>${data.ruralBeds}</p>
            <h3>Urban Beds</h3>
            <p>${data.urbanBeds}</p>
            <h3>Total Beds</h3>
            <p>${data.totalBeds}</p>
        </div>`;
  }
}

function makeMenuCard(name) {
  return `<li id="dropdown-${name}" class="dropdownList">${name}</button>`;
}

const mapFn = t => t == 'Cases' ? x => x.loc : x => x.state;