import Selector from './components/Selector.js';
import StatsDisplay from './components/StatsDisplay.js';
const {
  useState
} = React;
window.regions = {};
document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render( /*#__PURE__*/React.createElement(Stats, null), document.getElementById('statsHolder'));
});

const Stats = () => {
  const [active, setActive] = useState('Cases');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Selector, {
    active: active,
    setActive: setActive
  }), /*#__PURE__*/React.createElement(StatsDisplay, {
    active: active
  }));
};
//# sourceMappingURL=stats.js.map