import Dropdown from './Dropdown.js'
import LoadingIcon from './LoadingIcon.js'
import SearchBar from './SearchBar.js'

const { useEffect, useState, useReducer, useMemo } = React

const apiUrl = location.origin + '/api/data'
const cache = new Map()

export default function HospitalDisplay () {
    const [region, setRegion] = useState(STATS_DATA.state_names[15])
    const [{ searchQuery, hospitals, filtered }, setSearchQuery] = useReducer(updateHospitals, { searchQuery: '', hospitals: null, filtered: null })
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchedRegion = region
        getRegionDataByName(fetchedRegion)
            .then(resData => {
                resData ||= 'Failed to fetch Data'
                if (typeof resData === 'string') return setError(resData + ', Contact a developer if the issue persists')
                setSearchQuery({ values: resData.data, region: fetchedRegion })
            })
            .catch(console.error)
    }, [region])

    if (error) return <span color='red'> {error} </span>
    if (!hospitals || hospitals.region !== region) return <div style={{ display: 'grid', placeItems: 'center' }} > < LoadingIcon /> </div>
    return (
        <div>
            < SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            < Dropdown options={STATS_DATA.state_names} value={region} onChange={({ value }) => setRegion(value)} />
            < HospitalsDisplay hospitals={filtered} />
        </div>
    )
}

function HospitalsDisplay ({ hospitals }) {
    return <span color='white'> {hospitals?.length || 'No items matched'} </span>
}

HospitalsDisplay.propTypes = {
    hospitals: PropTypes.array
}

function RegionalDropdown ({ hospitals, setSearchQuery }) {
    const [regions, setRegions] = useState(null)

    useMemo(() => {
        console.log(hospitals)
    }, [hospitals])

    if (!hospitals) return null
    if (!regions) return <div id="loadingDisplay" style={{ display: 'grid', placeItems: 'center' }} > < LoadingIcon /> </div>
    else return <div> {hospitals.length} </div>
}

RegionalDropdown.propTypes = {
    hospitals: PropTypes.object,
    setSearchQuery: PropTypes.func.isRequired
}

function updateHospitals (state, action) {
    // update search Query
    if (typeof action === 'string' || !action) return { ...state, searchQuery: action, filtered: filterHospitals(state.hospitals, action) }
    else if (action instanceof Object && action.values && action.region) return { ...state, hospitals: action, filtered: filterHospitals(action, state.searchQuery) }
    else throw new Error()
}

function filterHospitals (hospitals, action) {
    if (!hospitals || hospitals.values?.length === 0) return []
    if (!action || action === '') return hospitals.values
    return hospitals.values.filter(x => x.hospital_name.toLowerCase().includes(action.toLowerCase()))
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
