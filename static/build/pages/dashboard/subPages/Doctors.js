import PaginatedDisplay from './Paginator.js';
export default function Doctors({
  doctors,
  click
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "window doctors"
  }, /*#__PURE__*/React.createElement(PaginatedDisplay, {
    data: doctors,
    click: click,
    makeComponent: x => /*#__PURE__*/React.createElement(TableItem, {
      data: x,
      click: click,
      key: x.doctname
    })
  }));
}

function TableItem({
  data,
  click
}) {
  const {
    doctname,
    speciality,
    fee
  } = data;
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
  }, /*#__PURE__*/React.createElement("span", null, "Speciality: ", speciality, " Expert"), /*#__PURE__*/React.createElement("span", null, "Consultation Fee: Rs. ", fee), /*#__PURE__*/React.createElement("span", null, "Availability: Available")), /*#__PURE__*/React.createElement("div", {
    className: "bookingButton"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => click(doctname)
  }, "Book Appointment")));
}
//# sourceMappingURL=Doctors.js.map