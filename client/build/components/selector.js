const {
  useEffect
} = React;
const buttons = ['Cases', 'Testing', 'Beds'];
export default function Selector({
  active,
  setActive
}) {
  const children = [];

  for (const el of buttons) {
    children.push( /*#__PURE__*/React.createElement("button", {
      key: el,
      className: active === el ? 'active' : ''
    }, el));
  }

  useEffect(() => {
    const buttons = document.querySelectorAll('#selector > button');
    buttons.forEach(button => {
      button.addEventListener('click', e => {
        if (!button.classList.contains('active')) setActive(button.innerHTML);
      });
    });
  });
  return /*#__PURE__*/React.createElement("div", {
    id: "selector"
  }, children);
}
Selector.propTypes = {
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired
};
//# sourceMappingURL=Selector.js.map