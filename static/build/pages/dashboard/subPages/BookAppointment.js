const {
  useState,
  useMemo
} = React;
export default function BookAppointment({
  setActive
}) {
  const [name, setName] = useState(decodeURIComponent(location.hash.replace('#', '')));
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    const el = document.getElementById('bookingDate');
    const submissionDate = new Date(el.value);
    const time = submissionDate.getTime();

    if (!time || time === null) {
      return setError('TIME');
    } else if (!name) {
      return setError('NAME');
    }

    const data = {
      name,
      time
    };
    const res = await fetch('/dashboard/book', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).catch(console.error);

    if (res.status === 200) {
      location.href += '?app=true';
      setActive(2);
    }

    return null;
  }

  function input(e) {
    setName(e.target.value);
  }

  const Error = useMemo(() => {
    switch (error) {
      case 'TIME':
        return /*#__PURE__*/React.createElement("p", null, " Please enter a valid date ");

      case 'NAME':
        return /*#__PURE__*/React.createElement("p", null, " Please enter a name ");

      default:
        return null;
    }
  }, [error]);
  return /*#__PURE__*/React.createElement("div", {
    className: "window appointment"
  }, Error ? /*#__PURE__*/React.createElement("div", {
    className: "error"
  }, Error) : null, /*#__PURE__*/React.createElement("form", {
    className: "form-container",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, " Doctor Name"), /*#__PURE__*/React.createElement("input", {
    className: "form-control",
    name: "name",
    type: "text",
    value: name,
    onChange: input
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "myDateTimeLocal"
  }, " Appointment Time "), /*#__PURE__*/React.createElement("input", {
    type: "datetime-local",
    name: "myDateTimeLocal",
    id: "bookingDate",
    className: "form-control",
    defaultValue: new Date().toISOString().substring(0, 23)
  }), /*#__PURE__*/React.createElement("input", {
    className: "btn btn-primary btn-block",
    type: "submit",
    value: "Submit"
  })));
}
//# sourceMappingURL=BookAppointment.js.map