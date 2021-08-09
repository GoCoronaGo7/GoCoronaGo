const { useState, useEffect } = React

const ITEMS_COUNT = 15
const icons = {
    start: 'https://github.com/google/material-design-icons/raw/master/ios/av/fast_rewind/materialicons/black/baseline_fast_rewind_black_48pt.xcassets/baseline_fast_rewind_black_48pt.imageset/baseline_fast_rewind_black_48pt_3x.png',
    previous: 'https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_back_ios/materialicons/black/baseline_arrow_back_ios_black_48pt.xcassets/baseline_arrow_back_ios_black_48pt.imageset/baseline_arrow_back_ios_black_48pt_3x.png',
    next: 'https://github.com/google/material-design-icons/raw/master/ios/navigation/arrow_forward_ios/materialicons/black/baseline_arrow_forward_ios_black_48pt.xcassets/baseline_arrow_forward_ios_black_48pt.imageset/baseline_arrow_forward_ios_black_48pt_3x.png',
    end: 'https://github.com/google/material-design-icons/raw/master/ios/av/fast_forward/materialicons/black/baseline_fast_forward_black_48pt.xcassets/baseline_fast_forward_black_48pt.imageset/baseline_fast_forward_black_48pt_3x.png'
}

const buttonClickHandlers = {
    start: (page, setPage, click) => {
        if (page === 1) return false
        if (click) setPage(1)
        return true
    },
    previous: (page, setPage, click) => {
        if (page === 1) return false
        if (click) setPage(page - 1)
        return true
    },
    next: (page, setPage, click, maxPages) => {
        if (page === maxPages) return false
        if (click) setPage(page + 1)
        return true
    },
    end: (page, setPage, click, maxPages) => {
        if (page === maxPages) return false
        if (click) setPage(maxPages)
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
HospitalsDisplay.propTypes = {
    hospitals: PropTypes.array
}

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

    return (<div id="navigator">
        <button id="nav-start" > <img src={icons.start} alt="start" /></button>
        <button id="nav-previous"> <img src={icons.previous} alt="previous" /></button>
        <button id="nav-current"> {page} </button>
        <button id="nav-next"> <img src={icons.next} alt="next" /></button>
        <button id="nav-end"> <img src={icons.end} alt="end" /></button>
    </div>)
}

Navigator.propTypes = {
    page: PropTypes.number.isRequired,
    setPage: PropTypes.func.isRequired,
    maxPages: PropTypes.number.isRequired
}

function TabledDisplay ({ hospitals, page }) {
    console.log(page)
    return (
        <div id="hospitalsTable">
            {hospitals.map(x => <div key={x.hospital_name} > {x.hospital_name} </div>).splice(page, ITEMS_COUNT)}
        </div>
    )
}
TabledDisplay.propTypes = {
    hospitals: PropTypes.array,
    page: PropTypes.number
}
