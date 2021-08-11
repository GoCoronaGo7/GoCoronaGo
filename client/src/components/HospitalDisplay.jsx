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
        if (page >= maxPages) return false
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

    useEffect(() => {
        setPage(1)
    }, [setPage, hospitals.length])
    return (
        <div id="hospitalsDisplay">
            <Navigator page={page} setPage={setPage} maxPages={maxPages}/>
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

    useEffect(() => {
        const handlerFactory = (handler) => () => handler(page, setPage, false, maxPages)

        for (const [key, handler] of Object.entries(buttonClickHandlers)) {
            const element = document.getElementById(`nav-${key}`)
            const clickable = handlerFactory(handler)
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
}

function TabledDisplay ({ hospitals, page }) {
    useEffect(() => {
        const table = document.getElementById('hospitalsTable')
        table.scrollTop = 0
    }, [hospitals.length, page])
    return (
        <div id="hospitalsTable">
            <div className="hospitalTableRow header">
                <span className="hospitalName">&nbsp;</span>
                <span className="statsCell" > Normal Beds </span>
                <span className="statsCell" > Oxygen Beds </span>
                <span className="statsCell" > ICU Units </span>
                <span className="statsCell" > Ventilator Units </span>
            </div>
            {[...hospitals].splice((page - 1) * ITEMS_COUNT, ITEMS_COUNT).map(x => <TableItem key={x.hospital_name} data={x} />)}

        </div>
    )
}
TabledDisplay.propTypes = {
    hospitals: PropTypes.array,
    page: PropTypes.number
}

function TableItem ({ data }) {
    if (!data) return null
    const beds = {
        normal: [data.available_beds_without_oxygen, data.total_beds_without_oxygen],
        oxygen: [data.available_beds_with_oxygen, data.total_beds_without_oxygen],
        icu: [data.available_icu_beds_without_ventilator, data.total_icu_beds_without_ventilator],
        vent: [data.available_icu_beds_with_ventilator, data.total_icu_beds_with_ventilator]
    }
    const stats = []
    for (const [key, val] of Object.entries(beds)) {
        stats.push(<span key={key} className={'statsCell statsDisplayCell ' + calcColour(val)}>{val[0]}/ {val[1]}</span>)
    }
    return <div className="hospitalTableRow">
        <div className="hospitalName">
            <div>
                <span className="left"> {data.hospital_name} </span>
            </div>
            <span className="region"> {data.area} </span>
        </div>
        { stats }
    </div>
}
TableItem.propTypes = {
    data: PropTypes.object
}

function calcColour (val) {
    if (val[0] === -1 || val[1] === -1) {
        val[0] = '?'
        val[1] = '?'
        return 'orange'
    }
    if (val[0] === 0) return 'red'
    if (val[0] === val[1]) return 'green'
    else return 'orange'
}
