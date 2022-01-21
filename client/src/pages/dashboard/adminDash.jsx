import Dash, { SideBar } from './dash.js'
import Patients from './subPages/Patients.js'
const { useState } = React

export default function AdminDash () {
    const [active, setActive] = useState(0)
    const patients = window.patients
    const sideBar = <SideBar admin={true}options={[['Patients', '/static/images/doctor.svg']]}{...{ active, setActive }}/>
    return <Dash admin={true} {...{ sideBar }}> <Patients patients={patients}/> </Dash>
}
