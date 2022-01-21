import PaginatedDisplay from './Paginator.js'
export default function Doctors ({ doctors, click }) {
    return (
        <div className="window doctors">
            <PaginatedDisplay
                data={doctors}
                click={click}
                makeComponent={(x) => (
                    <TableItem data={x} click={click} key={x.doctname} />
                )}
            />
        </div>
    )
}

Doctors.propTypes = {
    doctors: PropTypes.array,
    click: PropTypes.func
}

function TableItem ({ data, click }) {
    const { doctname, speciality, fee } = data
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
                <span>Availability: Available</span>
            </div>
            <div className="bookingButton">
                <button className="btn btn-primary btn-block" onClick={() => click(doctname)}>
                    Book Appointment
                </button>
            </div>
        </div>
    )
}
TableItem.propTypes = {
    data: PropTypes.object,
    click: PropTypes.func
}
