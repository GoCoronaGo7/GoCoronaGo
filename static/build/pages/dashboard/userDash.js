import Doctors from './subPages/Doctors.js';
import Dash, { SideBar } from './dash.js';
import BookAppointment from './subPages/BookAppointment.js';
import Appointments from './subPages/Appointment.js';
const {
  useState,
  useMemo
} = React;
export default function UserDash() {
  let init = location.hash.replace('#', '').length ? 1 : 0;
  if (location.search.indexOf('app=true') !== -1) init = 2;
  const [active, setActive] = useState(init);
  const sideBar = /*#__PURE__*/React.createElement(SideBar, {
    options: [['Doctors', '/static/images/doctor.svg'], ['Book', '/static/images/book.svg'], ['Appointments', '/static/images/appointment.svg']],
    active,
    setActive
  });

  function click(name) {
    location.hash = name;
    setActive(1);
  }

  const content = useMemo(() => {
    switch (active) {
      case 0:
        return /*#__PURE__*/React.createElement(Doctors, {
          doctors: window.doctors,
          click: click
        });

      case 1:
        return /*#__PURE__*/React.createElement(BookAppointment, {
          setActive: setActive
        });

      case 2:
        return /*#__PURE__*/React.createElement(Appointments, {
          requests: window.requests
        });

      default:
        return /*#__PURE__*/React.createElement(React.Fragment, null);
    }
  }, [active]);
  return /*#__PURE__*/React.createElement(Dash, {
    doctors: window.doctors,
    sideBar
  }, " ", content, " ");
}
//# sourceMappingURL=userDash.js.map