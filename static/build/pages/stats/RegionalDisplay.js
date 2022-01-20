import Dropdown from '../../components/Dropdown.js';
const {
  useState
} = React;
export default function RegionalDisplay({
  type,
  dat
}) {
  const [region, setRegion] = useState('Tamil Nadu');
  if (type === 'Testing') return /*#__PURE__*/React.createElement("div", {
    display: "none"
  });
  const data = dat[regions[type].indexOf(region)];
  if (!data) return null;
  let element;

  if (type === 'Cases') {
    element = /*#__PURE__*/React.createElement("div", {
      className: "highlight"
    }, /*#__PURE__*/React.createElement("h1", null, data.loc), /*#__PURE__*/React.createElement("h3", null, "Cured"), /*#__PURE__*/React.createElement("p", null, data.discharged), /*#__PURE__*/React.createElement("h3", null, "Deaths"), /*#__PURE__*/React.createElement("p", null, data.deaths), /*#__PURE__*/React.createElement("h3", null, "Total"), /*#__PURE__*/React.createElement("p", null, data.totalConfirmed));
  } else {
    element = /*#__PURE__*/React.createElement("div", {
      className: "highlight"
    }, /*#__PURE__*/React.createElement("h1", null, data.state), /*#__PURE__*/React.createElement("h3", null, "Rural Beds"), /*#__PURE__*/React.createElement("p", null, data.ruralBeds), /*#__PURE__*/React.createElement("h3", null, "Urban Beds"), /*#__PURE__*/React.createElement("p", null, data.urbanBeds), /*#__PURE__*/React.createElement("h3", null, "Total Beds"), /*#__PURE__*/React.createElement("p", null, data.totalBeds));
  }

  return /*#__PURE__*/React.createElement("div", {
    id: "regionalData"
  }, /*#__PURE__*/React.createElement(DropDown, {
    region: region,
    setRegion: setRegion,
    regionData: regions[type]
  }), element);
}

function DropDown({
  regionData,
  region,
  setRegion
}) {
  return /*#__PURE__*/React.createElement(Dropdown, {
    options: regionData,
    value: region,
    onChange: ({
      value
    }) => setRegion(value)
  });
}
//# sourceMappingURL=RegionalDisplay.js.map