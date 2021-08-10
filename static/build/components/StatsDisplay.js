import RegionalDisplay from './RegionalDisplay.js';
import LoadingIcon from './LoadingIcon.js';
const {
  useState,
  useEffect
} = React;
const apiCache = new Map(); // CONSTANTS

const routeMap = {
  Cases: 'stats/latest',
  Testing: 'stats/testing/latest',
  Beds: 'hospitals/beds'
};
const apiUrl = 'https://api.rootnet.in/covid19-in/';
export default function StatsDisplay({
  active: type
}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    async function getData() {
      const url = apiUrl + routeMap[type];
      const dat = await apiGet(url).catch(console.error);

      if (!dat || !dat.success) {
        setError('ERROR GETTING DATA');
      }

      setData({ ...dat.data,
        type
      });
    }

    getData();
  }, [type]);

  if (data && data.type === type) {
    loadRegions(data, type);
    let element;

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
          }, /*#__PURE__*/React.createElement("h1", null, "Total Number of Tests"), /*#__PURE__*/React.createElement("p", null, Number(data.totalSamplesTested).toLocaleString())));
          break;
        }

      case 'Beds':
        {
          element = /*#__PURE__*/React.createElement("div", {
            id: "statsHolderSmall"
          }, /*#__PURE__*/React.createElement("div", {
            className: "highlight"
          }, /*#__PURE__*/React.createElement("h1", null, " Rural Beds Available "), /*#__PURE__*/React.createElement("p", null, Number(data.summary.ruralBeds).toLocaleString())), /*#__PURE__*/React.createElement("div", {
            className: "highlight"
          }, /*#__PURE__*/React.createElement("h1", null, " Urban Beds Available "), /*#__PURE__*/React.createElement("p", null, Number(data.summary.urbanBeds).toLocaleString())), /*#__PURE__*/React.createElement("div", {
            className: "highlight"
          }, /*#__PURE__*/React.createElement("h1", null, " Total Beds Available "), /*#__PURE__*/React.createElement("p", null, " ", Number(data.summary.totalBeds).toLocaleString())));
        }
    }

    return /*#__PURE__*/React.createElement("div", {
      id: "statsDisplayBounds"
    }, element, /*#__PURE__*/React.createElement(RegionalDisplay, {
      type: type,
      dat: data.regional
    }));
  } else {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(LoadingIcon, null), error);
  }
}

function apiGet(url) {
  const data = apiCache.get(url);

  if (!data) {
    return fetch(url).then(x => x.json()).then(x => {
      apiCache.set(url, x);
      return x;
    }).catch(console.error);
  }

  return Promise.resolve().then(() => data);
}

function loadRegions(data, type) {
  if (!data?.regional) return;

  if (!regions[type]?.length) {
    regions[type] = [];
    regions[type].push(...data.regional.map(mapFn(type)));
  }
}

const mapFn = t => t === 'Cases' ? x => x.loc : x => x.state;
//# sourceMappingURL=StatsDisplay.js.map