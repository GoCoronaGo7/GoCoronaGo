const { useState, useMemo } = React
export default function BookAppointment ({ setActive }) {
    const [name, setName] = useState(decodeURIComponent(location.hash.replace('#', '')))
    const [error, setError] = useState('')
    async function submit (e) {
        e.preventDefault()
        const el = document.getElementById('bookingDate')
        const submissionDate = new Date(el.value)
        const time = submissionDate.getTime()
        if (!time || time === null) {
            return setError('TIME')
        } else if (!name) {
            return setError('NAME')
        }
        const data = { name, time }
        const res = await fetch('/dashboard/book', {
            body: JSON.stringify(data),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        }).catch(console.error)
        if (res.status === 200) {
            location.hash = ''
            location.search += '?app=true'
            setActive(2)
            location.reload(true)
        }
        return null
    }
    function input (e) {
        setName(e.target.value)
    }
    const Error = useMemo(() => {
        switch (error) {
        case 'TIME':
            return <p> Please enter a valid date </p>
        case 'NAME':
            return <p> Please enter a name </p>
        default:
            return null
        }
    }, [error])
    return (
        <div className="window appointment">
            {Error
                ? (
                    <div className="error">
                        { Error }
                    </div>
                )
                : null}
            <form className="form-container" onSubmit={submit}>
                <label htmlFor="name"> Doctor Name</label>
                <input className="form-control" name="name" type="text" value={name} onChange={input} />
                <label htmlFor="myDateTimeLocal"> Appointment Time </label>

                <input
                    type="datetime-local"
                    name="myDateTimeLocal"
                    id="bookingDate"
                    className="form-control"
                    defaultValue={new Date().toISOString().substring(0, 23)}
                />
                <input className="btn btn-primary btn-block" type="submit" value="Submit" />
            </form>
        </div>
    )
}

BookAppointment.propTypes = {
    setActive: PropTypes.func
}
