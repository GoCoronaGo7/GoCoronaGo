import PaginatedDisplay from './Paginator.js';
export default function Patients({
  patients
}) {
  async function click(patientUsername) {
    const res = await makeFetch({
      patient_name: patientUsername,
      completed: true
    }).catch(console.error);

    if (res.status === 200) {
      window.location.reload();
    }
  }

  function makeFetch(data) {
    return fetch('/dashboard/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  return /*#__PURE__*/React.createElement("div", {
    className: "window patients"
  }, ' ', /*#__PURE__*/React.createElement(PaginatedDisplay, {
    data: patients.sort((a, b) => a.status === 'pending' ? -1 : 1),
    click: click,
    makeComponent: x => /*#__PURE__*/React.createElement(TableItem, {
      data: x,
      click: click,
      addDetails: async patientUsername => {
        const note = prompt('Enter note:', '');
        const data = {
          patient_name: patientUsername,
          note
        };
        const res = await makeFetch(data).catch(console.error);

        if (res.status === 200) {
          window.location.reload();
        }
      },
      key: x.patient_username
    })
  }), ' ');
}

function TableItem({
  data,
  click,
  addDetails
}) {
  const {
    patient_username: patientUsername,
    time,
    status,
    details
  } = data;
  const date = new Date(Number(time));
  const {
    meet_id: meetId
  } = window.metadata.doctor;
  return /*#__PURE__*/React.createElement("div", {
    className: "doctor patient",
    key: patientUsername
  }, /*#__PURE__*/React.createElement("div", {
    className: "doctorProfile"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image"
  }, ' ', /*#__PURE__*/React.createElement("object", {
    data: "/static/images/doctor.svg",
    "aria-label": "admin"
  }), ' '), /*#__PURE__*/React.createElement("span", null, patientUsername)), /*#__PURE__*/React.createElement("div", {
    className: "doctorDetails"
  }, /*#__PURE__*/React.createElement("span", null, "Time: ", date.toString().split('GMT')[0]), /*#__PURE__*/React.createElement("span", null, "Details: ", details)), /*#__PURE__*/React.createElement("div", {
    className: "bookingButton bookingControl"
  }, status === 'pending' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block"
  }, /*#__PURE__*/React.createElement("a", {
    href: 'https://meet.google.com/' + meetId
  }, "Join Meet")), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => addDetails(patientUsername)
  }, "Add Note"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block",
    onClick: () => click(patientUsername)
  }, "Mark as complete")) : /*#__PURE__*/React.createElement("div", {
    className: "block-cursor"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary btn-block finished",
    disabled: true
  }, ' ', "Marked Complete"))));
}
//# sourceMappingURL=Patients.js.map