const {
  useState,
  useEffect
} = React;
const ITEMS_COUNT = 5;
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
    if (page >= maxPages) return false;
    if (click) setPage(page + 1);
    return true;
  },
  end: (page, setPage, click, maxPages) => {
    if (page === maxPages) return false;
    if (click) setPage(maxPages);
    return true;
  }
};
export default function PaginatedDisplay({
  data,
  makeComponent
}) {
  console.log({
    data
  });
  const [page, setPage] = useState(1);
  const maxPages = Math.ceil(data.length / ITEMS_COUNT);
  useEffect(() => {
    setPage(1);
  }, [setPage, data.length]);
  return /*#__PURE__*/React.createElement("div", {
    id: "paginator"
  }, /*#__PURE__*/React.createElement(Navigator, {
    page: page,
    setPage: setPage,
    maxPages: maxPages
  }), /*#__PURE__*/React.createElement(TabledDisplay, {
    data: data,
    page: page,
    makeComponent: makeComponent
  }));
}

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
      if (clickable()) element.removeAttribute('disabled');else element.setAttribute('disabled', 'disabled');
    }
  }, [page, setPage, maxPages]);
  return /*#__PURE__*/React.createElement("div", {
    id: "navigator"
  }, /*#__PURE__*/React.createElement("button", {
    id: "nav-start"
  }, ' ', /*#__PURE__*/React.createElement("img", {
    src: icons.start,
    alt: "start"
  })), /*#__PURE__*/React.createElement("button", {
    id: "nav-previous"
  }, ' ', /*#__PURE__*/React.createElement("img", {
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
  }, ' ', page, ' '), /*#__PURE__*/React.createElement("button", {
    id: "nav-next"
  }, ' ', /*#__PURE__*/React.createElement("img", {
    src: icons.next,
    alt: "next"
  })), /*#__PURE__*/React.createElement("button", {
    id: "nav-end"
  }, ' ', /*#__PURE__*/React.createElement("img", {
    src: icons.end,
    alt: "end"
  })));
}

function TabledDisplay({
  data,
  page,
  makeComponent
}) {
  useEffect(() => {
    const table = document.getElementById('table');
    table.scrollTop = 0;
  }, [data.length, page]);
  const childs = [...data].splice((page - 1) * ITEMS_COUNT, ITEMS_COUNT).map(makeComponent);
  return /*#__PURE__*/React.createElement("div", {
    id: "table"
  }, " ", childs);
}
//# sourceMappingURL=Paginator.js.map