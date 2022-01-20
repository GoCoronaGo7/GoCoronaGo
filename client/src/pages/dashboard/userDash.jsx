import Doctors from './subPages/Doctors.js'

import Dash, { SideBar } from './dash.js'
import BookAppointment from './subPages/BookAppointment.js'
import Appointments from './subPages/Appointment.js'
const { useState, useMemo } = React

export default function UserDash () {
    const [active, setActive] = useState(
        location.hash.replace('#', '').length ? 1 : 0
    )
    const sideBar = (
        <SideBar
            options={[
                ['Doctors', '/static/images/doctor.svg'],
                ['Book', '/static/images/book.svg'],
                ['Appointments', '/static/images/appointment.svg']
            ]}
            {...{ active, setActive }}
        />
    )
    function click (name) {
        location.hash = name
        setActive(1)
    }

    const content = useMemo(() => {
        switch (active) {
        case 0:
            return <Doctors doctors={window.doctors} click={click} />
        case 1:
            return <BookAppointment setActive={setActive} />
        case 2:
            return <Appointments requests={window.requests} />
        default:
            return <></>
        }
    }, [active])
    return <Dash {...{ doctors: window.doctors, sideBar }}> {content} </Dash>
}
