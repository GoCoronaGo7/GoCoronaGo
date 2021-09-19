import Dash, { SideBar } from './dash.js'
const { useState } = React

export default function UserDash () {
    const [active, setActive] = useState(0)

    const sideBar = <SideBar options={[['Doctors', '/static/images/doctor.svg']]}{...{ active, setActive }}/>
    return <Dash {...{ sideBar }}></Dash>
}
