import Dropdown from '../../components/Dropdown.js'

const { useState } = React

export default function RegionalDisplay ({ type, dat }) {
    const [region, setRegion] = useState('Tamil Nadu')

    if (type === 'Testing') return (<div display='none'></div>)
    const data = dat[regions[type].indexOf(region)]
    if (!data) return null

    let element
    if (type === 'Cases') {
        element = <div className="highlight">
            <h1>{data.loc}</h1>
            <h3>Cured</h3>
            <p>{data.discharged}</p>
            <h3>Deaths</h3>
            <p>{data.deaths}</p>
            <h3>Total</h3>
            <p>{data.totalConfirmed}</p>
        </div>
    } else {
        element = <div className="highlight">
            <h1>{data.state}</h1>
            <h3>Rural Beds</h3>
            <p>{data.ruralBeds}</p>
            <h3>Urban Beds</h3>
            <p>{data.urbanBeds}</p>
            <h3>Total Beds</h3>
            <p>{data.totalBeds}</p>
        </div>
    }
    return (
        <div id="regionalData">
            <DropDown region={region} setRegion={setRegion} regionData={regions[type]} />
            { element }
        </div>
    )
}

RegionalDisplay.propTypes = {
    type: PropTypes.string,
    dat: PropTypes.array
}

function DropDown ({ regionData, region, setRegion }) {
    return (< Dropdown options = { regionData } value = { region } onChange = { ({ value }) => setRegion(value)}/>)
}

DropDown.propTypes = {
    regionData: PropTypes.array,
    region: PropTypes.string,
    setRegion: PropTypes.func
}
