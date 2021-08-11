import Dropdown from './components/Dropdown.js'
import LoadingIcon from './components/LoadingIcon.js'
import SearchBar from './components/SearchBar.js'
import HospitalsDisplay from './components/HospitalDisplay.js'

const { useEffect, useState, useReducer } = React

const apiUrl = location.origin + '/api/data'
const cache = new Map()

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Hospitals />, document.getElementById('root'))
})

function Hospitals () {
    const [region, setRegion] = useState(STATS_DATA.state_names[15])
    const [{ searchQuery, hospitals, filtered }, setSearchQuery] = useReducer(updateHospitals, { searchQuery: '', hospitals: null, filtered: null, region: null })
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchedRegion = region
        getRegionDataByName(fetchedRegion)
            .then(resData => {
                resData ||= 'Failed to fetch Data'
                if (typeof resData === 'string') return setError(resData + ', Contact a developer if the issue persists')
                resData.data = resData.data.sort((a, b) => b.available_beds_with_oxygen - a.available_beds_with_oxygen)
                console.log(resData.data)
                setSearchQuery({ values: resData.data, region: fetchedRegion })
            })
            .catch(console.error)
    }, [region])

    if (error) return <span color='red'> {error} </span>
    if (!hospitals || hospitals.region !== region) return <div id="loadingDisplay" style={{ display: 'grid', placeItems: 'center' }} > < LoadingIcon /> </div>
    return (
        <div id="display">
            < SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <div id="dropDown-bar">
                < Dropdown options={STATS_DATA.state_names} value={region} onChange={({ value }) => setRegion(value)} />
                < RegionDropDown hospitals={hospitals} setSearchQuery={setSearchQuery} />
            </div>
            < HospitalsDisplay hospitals={filtered } />
        </div>
    )
}

function RegionDropDown ({ hospitals, setSearchQuery }) {
    const [regions, setRegion] = useState(null)
    useEffect(() => {
        setRegion(['All Regions', ...new Set(hospitals.values.map(x => x.area || 'NA'))])
    }, [hospitals])
    console.log(regions)
    if (!hospitals || !regions) return <div id="loadingDisplay" style={{ display: 'grid', placeItems: 'center' }} > < LoadingIcon /> </div>
    else return < Dropdown options={regions} value={'All Regions'} onChange={({ value }) => setSearchQuery({ type: 'region', region: value })} />
}
RegionDropDown.propTypes = {
    hospitals: PropTypes.object,
    setSearchQuery: PropTypes.func.isRequired
}

function updateHospitals (state, action) {
    // update search Query
    if (typeof action === 'string' || !action) return { ...state, searchQuery: action, filtered: filterHospitals(state.hospitals, action, state.region) }
    else if (action instanceof Object && action.values && action.region) return { ...state, hospitals: action, filtered: filterHospitals(action, state.searchQuery, state.region) }
    else if (action instanceof Object && action.type === 'region' && action.region) return { ...state, region: action.region, filtered: filterHospitals(state.hospitals, state.searchQuery, action.region) }
    else throw new Error()
}

function filterHospitals (hospitals, action, region) {
    if (!hospitals || hospitals.values?.length === 0) return []
    let filtered = hospitals.values
    if (region && region !== 'All Regions') filtered = filtered.filter(x => x.area === region)
    if (!action || action === '') return filtered

    filtered = filtered.filter(x => x.hospital_name.toLowerCase().includes(action.toLowerCase()))
    return filtered
}

async function getRegionDataByName (name) {
    const code = STATS_DATA.code_names[STATS_DATA.state_names.indexOf(name)]
    if (!code) return 'Invalid State Name'
    const cachedData = cache.get(code)
    if (cachedData) return cachedData
    const data = await fetch(`${apiUrl}?name=${code}`).then(x => x.json()).catch(console.error)
    if (!data) return 'Failed to fetch data from API'

    return data
}
