function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/* eslint-disable react/prop-types */
import Dropdown from './Dropdown.js';
const {
  useMemo
} = React;
export default function NavBar({
  children
}) {
  const memoizedChilds = useMemo(() => {
    return children.map(child => {
      return child;
    });
  }, [children]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, memoizedChilds);
}
NavBar.propTypes = {
  children: PropTypes.array
};
export function ContentGroup({
  opts,
  title,
  rootUrl,
  ...props
}) {
  const [options, links] = useMemo(() => {
    if (!opts) return [[], []];
    return opts.filter(Boolean).reduce((acc, val) => [[...acc[0], val[1]], [...acc[1], val[0]]], [[], []]);
  }, [opts]);
  if (!opts) return /*#__PURE__*/React.createElement("a", _extends({
    href: rootUrl
  }, props), title, " ");
  return /*#__PURE__*/React.createElement(Dropdown, {
    baseClassName: "NavDropDown",
    changeOnClick: false,
    value: title,
    onChange: ({
      value
    }) => {
      window.location = links[options.indexOf(value)];
    },
    options
  });
}
//# sourceMappingURL=NavBar.js.map