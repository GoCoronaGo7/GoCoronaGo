const {
  useState,
  useEffect
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
RegionalDisplay.propTypes = {
  type: PropTypes.string,
  dat: PropTypes.array
};

function DropDown({
  regionData,
  region,
  setRegion
}) {
  useEffect(() => {
    const dropDown = document.getElementById('dropDown');
    const dropDownList = document.getElementById('regionalDropDownMenuList');

    const handler = e => {
      dropDownList.style.display = e.type === 'mouseenter' ? 'block' : 'none';
    };

    dropDown.addEventListener('mouseenter', handler);
    dropDown.addEventListener('mouseleave', handler);

    for (const element of dropDownList.childNodes) {
      element.addEventListener('click', event => {
        const target = event.target.innerHTML;
        setRegion(target);
        dropDownList.style.display = 'none';
      });
    }
  }, [setRegion]);
  return /*#__PURE__*/React.createElement("div", {
    id: "dropDown"
  }, /*#__PURE__*/React.createElement("span", {
    id: "regionalSelectedStats"
  }, " ", region, " "), /*#__PURE__*/React.createElement("ul", {
    id: "regionalDropDownMenuList",
    style: {
      display: 'none'
    },
    className: "scrollable-menu dropdown"
  }, regionData.map(makeMenuCard)));
}

DropDown.propTypes = {
  regionData: PropTypes.array,
  region: PropTypes.string,
  setRegion: PropTypes.func
};

function makeMenuCard(name) {
  return /*#__PURE__*/React.createElement("li", {
    key: `dropdown-${name}`,
    className: "dropdownList"
  }, name);
}
//# sourceMappingURL=RegionalDisplay.js.map