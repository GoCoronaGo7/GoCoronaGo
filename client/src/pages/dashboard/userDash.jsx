import Doctors from './subPages/Doctors.js'

import Dash, { SideBar } from './dash.js'
const { useState, useMemo } = React

export default function UserDash () {
    const [active, setActive] = useState(0)
    console.log(window.doctors, window.requests)
    const sideBar = <SideBar options={[['Doctors', '/static/images/doctor.svg']]}{...{ active, setActive }} />
    const content = useMemo(() => {
        switch (active) {
        case 0:
            return <Doctors doctors={window.doctors} />
        default:
            return <></>
        }
    }, [active])
    return <Dash {...{ doctors: window.doctors, sideBar }}> {content} </Dash>
}
