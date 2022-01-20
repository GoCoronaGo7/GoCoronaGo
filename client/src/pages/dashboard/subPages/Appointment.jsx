import PaginatedDisplay from './Paginator.js'

export default function Appointments ({ requests }) {
    console.log({ requests })
    function click () {}
    return (
        <div className="window">
            <PaginatedDisplay
                data={requests}
                click={click}
                makeComponent={(x) => (
                    <Item data={x} click={click} key={x.doctname} />
                )}
            />
        </div>
    )
}

function Item ({ data, click }) {
    const { doctname, status, time, details } = data
    const {
        speciality,
        fee,
        meet_id: meetId
    } = window.doctors.find((x) => x.doctname === doctname)
    const date = new Date(Number(time))

    return (
        <div className="doctor" key={doctname}>
            <div className="doctorProfile">
                <div className="image">
                    {' '}
                    <object
                        data="/static/images/doctor.svg"
                        aria-label="admin"
                    />{' '}
                </div>
                <span>{'Dr. ' + doctname}</span>
            </div>
            <div className="doctorDetails">
                <span>Speciality: {speciality} Expert</span>
                <span>Consultation Fee: Rs. {fee}</span>
                <span>Time: {date.toString().split('GMT')[0]}</span>
                <span>Details: {details || 'None'}</span>
            </div>
            <div className="bookingButton">
                {status === 'pending'
                    ? (
                        <button>
                            <a href={'https://meet.google.com/' + meetId}>
                            Join Meet
                            </a>
                        </button>
                    )
                    : (
                        <button className="finished">Appointment Completed</button>
                    )}
            </div>
        </div>
    )
}
Item.propTypes = {
    data: PropTypes.object,
    click: PropTypes.func
}
Appointments.propTypes = {
    requests: PropTypes.array
}
