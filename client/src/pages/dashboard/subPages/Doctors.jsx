export default function Doctors ({ doctors }) {
    const Doctors = [...doctors.map(({ doctname, speciality, fee }) =>
        <div className="doctor" key={doctname}>
            <div className="doctorProfile">
                <div className="image"> <object data="/static/images/doctor.svg" aria-label="admin" /> </div>
                <span>Dr. {doctname}</span>
            </div>
            <div className="doctorDetails">
                <span>Speciality: {speciality} Expert</span>
                <span>Consultation Fee: Rs. {fee}</span>
                <span>Availability: Available</span>
            </div>
            <div className="bookingButton">
                <button onClick={() => click(doctname)}>
                    Book Appointment
                </button>
            </div>
        </div>
    )]
    function click (name) {
        console.log(name)
    }
    return <div className="window doctors">
        { Doctors }
    </div>
}

Doctors.propTypes = {
    doctors: PropTypes.array
}
