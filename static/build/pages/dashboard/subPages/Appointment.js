import PaginatedDisplay from './Paginator.js';
export default function Appointments({
  requests
}) {
  console.log({
    requests
  });

  function click() {}

  return /*#__PURE__*/React.createElement("div", {
    className: "window"
  }, /*#__PURE__*/React.createElement(PaginatedDisplay, {
    data: requests,
    click: click,
    makeComponent: x => /*#__PURE__*/React.createElement(Item, {
      data: x,
      click: click,
      key: x.doctname
    })
  }));
}

function Item({
  data,
  click
}) {
  const {
    doctname,
    status,
    time,
    details
  } = data;
  const {
    speciality,
    fee,
    meet_id: meetId
  } = window.doctors.find(x => x.doctname === doctname);
  const date = new Date(Number(time));
  return /*#__PURE__*/React.createElement("div", {
    className: "doctor",
    key: doctname
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctorProfile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, ' ', /*#__PURE__*/React.createElement("object", {
    data: "/static/images/doctor.svg",
    "aria-label": "admin"
  }), ' '), /*#__PURE__*/React.createElement("span", null, 'Dr. ' + doctname)), /*#__PURE__*/React.createElement("div", {
    className: "doctorDetails"
  }, /*#__PURE__*/React.createElement("span", null, "Speciality: ", speciality, " Expert"), /*#__PURE__*/React.createElement("span", null, "Consultation Fee: Rs. ", fee), /*#__PURE__*/React.createElement("span", null, "Time: ", date.toString().split('GMT')[0]), /*#__PURE__*/React.createElement("span", null, "Details: ", details || 'None')), /*#__PURE__*/React.createElement("div", {
    className: "bookingButton"
  }, status === 'pending' ? /*#__PURE__*/React.createElement("button", null, /*#__PURE__*/React.createElement("a", {
    href: 'https://meet.google.com/' + meetId
  }, "Join Meet")) : /*#__PURE__*/React.createElement("button", {
    className: "finished"
  }, "Appointment Completed")));
}
//# sourceMappingURL=Appointment.js.map