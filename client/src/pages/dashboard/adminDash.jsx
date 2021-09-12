import Dash, { SideBar } from './dash.js'
const { useState } = React

export default function AdminDash () {
    const [active, setActive] = useState(0)

    const sideBar = <SideBar options={[['Patients', '/static/images/doctor.svg']]}{...{ active, setActive }}/>
    return <Dash {...{ sideBar }}></Dash>
}
