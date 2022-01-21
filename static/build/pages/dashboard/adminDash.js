import Dash, { SideBar } from './dash.js';
import Patients from './subPages/Patients.js';
const {
  useState
} = React;
export default function AdminDash() {
  const [active, setActive] = useState(0);
  const patients = window.patients;
  const sideBar = /*#__PURE__*/React.createElement(SideBar, {
    admin: true,
    options: [['Patients', '/static/images/doctor.svg']],
    active,
    setActive
  });
  return /*#__PURE__*/React.createElement(Dash, {
    admin: true,
    sideBar
  }, " ", /*#__PURE__*/React.createElement(Patients, {
    patients: patients
  }), " ");
}
//# sourceMappingURL=adminDash.js.map