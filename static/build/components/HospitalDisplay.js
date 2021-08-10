const {
  useState,
  useEffect
} = React;
const ITEMS_COUNT = 15;
const icons = {
  start: 'https://github.com/google/material-design-icons/raw/master/ios/av/fast_rewind/materialicons/black/baseline_fast_rewind_black_48pt.xcassets/baseline_fast_rewind_black_48pt.imageset/baseline_fast_rewind_black_48pt_3x.png',
  previous: 'https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_back_ios/materialicons/black/baseline_arrow_back_ios_black_48pt.xcassets/baseline_arrow_back_ios_black_48pt.imageset/baseline_arrow_back_ios_black_48pt_3x.png',
  next: 'https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_forward_ios/materialicons/black/baseline_arrow_forward_ios_black_48pt.xcassets/baseline_arrow_forward_ios_black_48pt.imageset/baseline_arrow_forward_ios_black_48pt_3x.png',
  end: 'https://github.com/google/material-design-icons/raw/master/ios/av/fast_forward/materialicons/black/baseline_fast_forward_black_48pt.xcassets/baseline_fast_forward_black_48pt.imageset/baseline_fast_forward_black_48pt_3x.png'
};
const buttonClickHandlers = {
  start: (page, setPage, click) => {
    if (page <= 1) return false;
    if (click) setPage(1);
    return true;
  },
  previous: (page, setPage, click) => {
    if (page === 1) return false;
    if (click) setPage(page - 1);
    return true;
  },
  next: (page, setPage, click, maxPages) => {
    if (page >= maxPages - 1) return false;
    if (click) setPage(page + 1);
    return true;
  },
  end: (page, setPage, click, maxPages) => {
    if (page === maxPages - 1) return false;
    if (click) setPage(maxPages - 1);
    return true;
  }
};
export default function HospitalsDisplay({
  hospitals
}) {
  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(hospitals.length / ITEMS_COUNT);
  return /*#__PURE__*/React.createElement("div", {
    id: "hospitalsDisplay"
  }, /*#__PURE__*/React.createElement(Navigator, {
    page: page,
    setPage: setPage,
    maxPages: maxPages
  }), /*#__PURE__*/React.createElement(TabledDisplay, {
    hospitals: hospitals,
    page: page
  }));
}
HospitalsDisplay.propTypes = {
  hospitals: PropTypes.array
};

function Navigator({
  page,
  setPage,
  maxPages
}) {
  useEffect(() => {
    const listeners = [];

    const handlerFactory = handler => () => {
      handler(page, setPage, true, maxPages);
    };

    for (const [key, handler] of Object.entries(buttonClickHandlers)) {
      const element = document.getElementById(`nav-${key}`);
      const func = handlerFactory(handler);
      element.addEventListener('click', func);
      listeners.push([element, func]);
    }

    return () => {
      for (const [el, handler] of listeners) {
        el.removeEventListener('click', handler);
      }
    };
  });
  useEffect(() => {
    const handlerFactory = handler => () => handler(page, setPage, false, maxPages);

    for (const [key, handler] of Object.entries(buttonClickHandlers)) {
      const element = document.getElementById(`nav-${key}`);
      const clickable = handlerFactory(handler);
      console.log('clickable', clickable);
      if (clickable()) element.removeAttribute('disabled');else element.setAttribute('disabled', 'disabled');
    }
  }, [page, setPage, maxPages]);
  return /*#__PURE__*/React.createElement("div", {
    id: "navigator"
  }, /*#__PURE__*/React.createElement("button", {
    id: "nav-start"
  }, " ", /*#__PURE__*/React.createElement("img", {
    src: icons.start,
    alt: "start"
  })), /*#__PURE__*/React.createElement("button", {
    id: "nav-previous"
  }, " ", /*#__PURE__*/React.createElement("img", {
    style: {
      transform: 'translateX(5px)'
    },
    src: icons.previous,
    alt: "previous"
  })), /*#__PURE__*/React.createElement("button", {
    id: "nav-current",
    style: {
      display: 'flex',
      width: '60px',
      justifyContent: 'center'
    }
  }, " ", page, " "), /*#__PURE__*/React.createElement("button", {
    id: "nav-next"
  }, " ", /*#__PURE__*/React.createElement("img", {
    src: icons.next,
    alt: "next"
  })), /*#__PURE__*/React.createElement("button", {
    id: "nav-end"
  }, " ", /*#__PURE__*/React.createElement("img", {
    src: icons.end,
    alt: "end"
  })));
}

Navigator.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  maxPages: PropTypes.number.isRequired
};

function TabledDisplay({
  hospitals,
  page
}) {
  console.log(page);
  return /*#__PURE__*/React.createElement("table", {
    id: "hospitalsTable"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "hospitalTableRow hospitalTableHeader",
    id: "hospitalsTable-header"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "hospitalName"
  }, "\xA0"), /*#__PURE__*/React.createElement("th", null, " Normal Beds "), /*#__PURE__*/React.createElement("th", null, " Oxygen Beds "), /*#__PURE__*/React.createElement("th", null, " ICE Units "), /*#__PURE__*/React.createElement("th", null, " Ventilator Units "))), /*#__PURE__*/React.createElement("tbody", null, hospitals.splice(page * ITEMS_COUNT, ITEMS_COUNT).map(x => /*#__PURE__*/React.createElement(TableItem, {
    key: x.hospital_name,
    data: x
  }))));
}

TabledDisplay.propTypes = {
  hospitals: PropTypes.array,
  page: PropTypes.number
};

function TableItem({
  data
}) {
  if (!data) return null;
  const beds = {
    normal: [data.available_beds_without_oxygen, data.total_beds_without_oxygen],
    oxygen: [data.available_beds_with_oxygen, data.total_beds_without_oxygen],
    icu: [data.available_icu_beds_without_ventilator, data.total_icu_beds_without_ventilator],
    vent: [data.available_icu_beds_with_ventilator, data.total_icu_beds_with_ventilator]
  };
  const stats = [];

  for (const [key, val] of Object.entries(beds)) {
    stats.push( /*#__PURE__*/React.createElement("td", {
      key: key,
      className: calcColour(val[0], val[1])
    }, val[0], "/ ", val[1]));
  }

  return /*#__PURE__*/React.createElement("tr", {
    className: "hospitalTableRow"
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "hospitalName"
  }, /*#__PURE__*/React.createElement("span", {
    className: "left"
  }, " ", data.hospital_name, " ")), /*#__PURE__*/React.createElement("span", {
    className: "region"
  }, " ", data.area, " ")), stats);
}

TableItem.propTypes = {
  data: PropTypes.object
};

function calcColour(a, b) {
  if (a === b) return 'green';
  if (a === 0) return 'red';else return 'orange';
}
//# sourceMappingURL=HospitalDisplay.js.map