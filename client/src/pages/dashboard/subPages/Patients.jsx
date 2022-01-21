import PaginatedDisplay from './Paginator.js'

export default function Patients ({ patients }) {
    async function click (patientUsername) {
        const res = await makeFetch({
            patient_name: patientUsername,
            completed: true
        }).catch(console.error)
        if (res.status === 200) {
            window.location.reload()
        }
    }
    function makeFetch (data) {
        return fetch('/dashboard/request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    return (
        <div className="window patients">
            {' '}
            <PaginatedDisplay
                data={patients.sort((a, b) => a.status === 'pending' ? -1 : 1)}
                click={click}
                makeComponent={(x) => (
                    <TableItem
                        data={x}
                        click={click}
                        addDetails={async (patientUsername) => {
                            const note = prompt('Enter note:', '')
                            const data = {
                                patient_name: patientUsername,
                                note
                            }
                            const res = await makeFetch(data).catch(
                                console.error
                            )
                            if (res.status === 200) {
                                window.location.reload()
                            }
                        }}
                        key={x.patient_username}
                    />
                )}
            />{' '}
        </div>
    )
}

Patients.propTypes = {
    patients: PropTypes.array.isRequired
}

function TableItem ({ data, click, addDetails }) {
    const { patient_username: patientUsername, time, status, details } = data
    const date = new Date(Number(time))
    const { meet_id: meetId } = window.metadata.doctor

    return (
        <div className="doctor patient" key={patientUsername}>
            <div className="doctorProfile">
                <div className="image">
                    {' '}
                    <object
                        data="/static/images/doctor.svg"
                        aria-label="admin"
                    />{' '}
                </div>
                <span>{patientUsername}</span>
            </div>
            <div className="doctorDetails">
                <span>Time: {date.toString().split('GMT')[0]}</span>
                <span>Details: {details}</span>
            </div>
            <div className="bookingButton bookingControl">
                {status === 'pending'
                    ? (
                        <>
                            <button className="btn btn-primary btn-block">
                                <a href={'https://meet.google.com/' + meetId}>
                                Join Meet
                                </a>
                            </button>
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => addDetails(patientUsername)}
                            >
                            Add Note
                            </button>
                            <button
                                className="btn btn-primary btn-block"
                                onClick={() => click(patientUsername)}
                            >
                            Mark as complete
                            </button>
                        </>
                    )
                    : (
                        <div className="block-cursor">
                            <button
                                className="btn btn-primary btn-block finished"
                                disabled
                            >
                                {' '}
                            Marked Complete
                            </button>
                        </div>
                    )}
            </div>
        </div>
    )
}

TableItem.propTypes = {
    data: PropTypes.object,
    click: PropTypes.func,
    addDetails: PropTypes.func
}
