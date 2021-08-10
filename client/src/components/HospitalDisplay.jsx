const { useState, useEffect } = React

<<<<<<< HEAD
const { useEffect, useState, useReducer, useMemo } = React

const apiUrl = location.origin + '/api/data'
const cache = new Map()

export default function HospitalDisplay () {
    const [region, setRegion] = useState(STATS_DATA.state_names[15])
    const [{ searchQuery, hospitals, filtered }, setSearchQuery] = useReducer(updateHospitals, { searchQuery: '', hospitals: null, filtered: null })
    const [error, setError] = useState('')
=======
const ITEMS_COUNT = 15
const icons = {
    start: 'https://github.com/google/material-design-icons/raw/master/ios/av/fast_rewind/materialicons/black/baseline_fast_rewind_black_48pt.xcassets/baseline_fast_rewind_black_48pt.imageset/baseline_fast_rewind_black_48pt_3x.png',
    previous: 'https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_back_ios/materialicons/black/baseline_arrow_back_ios_black_48pt.xcassets/baseline_arrow_back_ios_black_48pt.imageset/baseline_arrow_back_ios_black_48pt_3x.png',
    next: 'https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_forward_ios/materialicons/black/baseline_arrow_forward_ios_black_48pt.xcassets/baseline_arrow_forward_ios_black_48pt.imageset/baseline_arrow_forward_ios_black_48pt_3x.png',
    end: 'https://github.com/google/material-design-icons/raw/master/ios/av/fast_forward/materialicons/black/baseline_fast_forward_black_48pt.xcassets/baseline_fast_forward_black_48pt.imageset/baseline_fast_forward_black_48pt_3x.png'
}
>>>>>>> hospitals

const buttonClickHandlers = {
    start: (page, setPage, click) => {
        if (page <= 1) return false
        if (click) setPage(1)
        return true
    },
    previous: (page, setPage, click) => {
        if (page === 1) return false
        if (click) setPage(page - 1)
        return true
    },
    next: (page, setPage, click, maxPages) => {
        if (page >= maxPages - 1) return false
        if (click) setPage(page + 1)
        return true
    },
    end: (page, setPage, click, maxPages) => {
        if (page === maxPages - 1) return false
        if (click) setPage(maxPages - 1)
        return true
    }
}

export default function HospitalsDisplay ({ hospitals }) {
    const [page, setPage] = useState(1)
    const maxPages = Math.ceil(hospitals.length / ITEMS_COUNT)
    return (
        <div id="hospitalsDisplay">
            <Navigator page={page} setPage={setPage} maxPages={maxPages}/>
            <div id="header">
                <span> fill</span>
            </div>
            <TabledDisplay hospitals={hospitals} page={page} />
        </div>
    )
}
<<<<<<< HEAD

function HospitalsDisplay ({ hospitals }) {
    return <span color='white'> {hospitals?.length || 'No items matched'} </span>
}

=======
>>>>>>> hospitals
HospitalsDisplay.propTypes = {
    hospitals: PropTypes.array
}

<<<<<<< HEAD
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
=======
function Navigator ({ page, setPage, maxPages }) {
    useEffect(() => {
        const listeners = []
        const handlerFactory = (handler) => () => {
            handler(page, setPage, true, maxPages)
        }
        for (const [key, handler] of Object.entries(buttonClickHandlers)) {
            const element = document.getElementById(`nav-${key}`)
            const func = handlerFactory(handler)
            element.addEventListener('click', func)
            listeners.push([element, func])
        }
        return () => {
            for (const [el, handler] of listeners) {
                el.removeEventListener('click', handler)
            }
        }
    })

    useEffect(() => {
        const handlerFactory = (handler) => () => handler(page, setPage, false, maxPages)

        for (const [key, handler] of Object.entries(buttonClickHandlers)) {
            const element = document.getElementById(`nav-${key}`)
            const clickable = handlerFactory(handler)
            console.log('clickable', clickable)
            if (clickable()) element.removeAttribute('disabled')
            else element.setAttribute('disabled', 'disabled')
        }
    }, [page, setPage, maxPages])

    return (<div id="navigator">
        <button id="nav-start" > <img src={icons.start} alt="start" /></button>
        <button id="nav-previous"> <img style={{ transform: 'translateX(5px)' }}src={icons.previous} alt="previous" /></button>
        <button id="nav-current" style={{ display: 'flex', width: '60px', justifyContent: 'center' }}> {page} </button>
        <button id="nav-next"> <img src={icons.next} alt="next" /></button>
        <button id="nav-end"> <img src={icons.end} alt="end" /></button>
    </div>)
}

Navigator.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    maxPages: PropTypes.number.isRequired
>>>>>>> hospitals
}

function TabledDisplay ({ hospitals, page }) {
    console.log(page)
    return (
        <div id="hospitalsTable">
            {hospitals.map(x => <div key={x.hospital_name} > {x.hospital_name} </div>).splice(page * ITEMS_COUNT, ITEMS_COUNT)}
        </div>
    )
}
<<<<<<< HEAD
async function getRegionDataByName (name) {
    const code = STATS_DATA.code_names[STATS_DATA.state_names.indexOf(name)]
    if (!code) return 'Invalid State Name'
    const cachedData = cache.get(code)
    if (cachedData) return cachedData
    const data = await fetch(`${apiUrl}?name=${code}`).then(x => x.json()).catch(console.error)
    if (!data) return 'Failed to fetch data from API'
    return data
=======
TabledDisplay.propTypes = {
    hospitals: PropTypes.array,
    page: PropTypes.number
>>>>>>> hospitals
}
