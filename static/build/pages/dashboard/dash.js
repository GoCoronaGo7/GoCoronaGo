const {
  useEffect
} = React; // eslint-disable-next-line react/prop-types

export default function Dash({
  doctors,
  admin,
  sideBar,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    id: "dash"
  }, sideBar, children);
}
export function SideBar({
  admin,
  options,
  active,
  setActive
}) {
  useEffect(() => {
    const buttons = document.querySelectorAll('#sideBarButton');
    buttons.forEach((button, i) => {
      button.addEventListener('click', e => {
        setActive(i);
      });
    });
  }, [setActive]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "sideBar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "profileHolder"
  }, admin ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "profilePic"
  }, ' ', /*#__PURE__*/React.createElement("object", {
    data: "/static/images/admin.svg",
    "aria-label": "admin"
  }), ' '), /*#__PURE__*/React.createElement("h2", null, " Dr.", FLASK_SESSION.username), /*#__PURE__*/React.createElement("span", null, " Doctor ")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    id: "profilePic"
  }, ' ', /*#__PURE__*/React.createElement("object", {
    data: "/static/images/admin.svg",
    "aria-label": "admin"
  }), ' '), /*#__PURE__*/React.createElement("h2", null, " ", FLASK_SESSION.username), /*#__PURE__*/React.createElement("span", null, " Patient "))), options.map(([title, icon], i) => /*#__PURE__*/React.createElement("button", {
    id: "sideBarButton",
    className: 'sideBarButton' + (i === active ? ' active' : ''),
    key: i
  }, /*#__PURE__*/React.createElement("object", {
    "aria-label": title,
    data: icon,
    type: "image/svg+xml"
  }), ' ', title))));
}
//# sourceMappingURL=dash.js.map