import RegionalDisplay from './RegionalDisplay.js'
import LoadingIcon from './LoadingIcon.js'

const { useState, useEffect } = React

const apiCache = new Map()

// CONSTANTS
const routeMap = {
    Cases: 'stats/latest',
    Testing: 'stats/testing/latest',
    Beds: 'hospitals/beds'
}
const apiUrl = 'https://api.rootnet.in/covid19-in/'

export default function StatsDisplay ({ active: type }) {
    const [data, setData] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        async function getData () {
            const url = apiUrl + routeMap[type]
            const dat = await apiGet(url).catch(console.error)
            if (!dat || !dat.success) {
                setError('ERROR GETTING DATA')
            }
            setData({ ...dat.data, type })
        }
        getData()
    }, [type])

    if (data && data.type === type) {
        loadRegions(data, type)
        let element
        switch (type) {
        case 'Cases': {
            element = (<div id="statsHolderSmall">
                <div className="highlight">
                    <h1>Discharged Cases</h1>
                    <p>{Number(data.summary.discharged).toLocaleString()}</p>
                </div>

                <div className="highlight">
                    <h1>Deaths</h1>
                    <p>{Number(data.summary.deaths).toLocaleString()}</p>
                </div>

                <div className="highlight">
                    <h1>Total</h1>
                    <p>{Number(data.summary.total).toLocaleString()}</p>
                </div>
            </div>)
            break
        }

        case 'Testing': {
            element = (
                <div id="statsHolderSmall">
                    <div className="highlight">
                        <h1>Total Number of Tests</h1>
                        <p>{Number(data.totalSamplesTested).toLocaleString()}</p>
                    </div>
                </div>
            )
            break
        }

        case 'Beds': {
            element = (
                <div id="statsHolderSmall">
                    <div className="highlight">
                        <h1> Rural Beds Available </h1>
                        <p>{Number(data.summary.ruralBeds).toLocaleString()}</p>
                    </div>

                    <div className="highlight">
                        <h1> Urban Beds Available </h1>
                        <p>{Number(data.summary.urbanBeds).toLocaleString()}</p>
                    </div>

                    <div className="highlight">
                        <h1> Total Beds Available </h1>
                        <p> {Number(data.summary.totalBeds).toLocaleString()}</p>
                    </div>
                </div>
            )
        }
        }
        return (<div id="statsDisplayBounds">
            {element}
            <RegionalDisplay type={type} dat={data.regional}/>
        </div>
        )
    } else {
        return <div>
            <LoadingIcon />
            { error }
        </div>
    }
}

function apiGet (url) {
    const data = apiCache.get(url)
    if (!data) {
        return fetch(url).then(x => x.json()).then(x => {
            apiCache.set(url, x)
            return x
        }).catch(console.error)
    }
    return Promise.resolve().then(() => data)
}

function loadRegions (data, type) {
    if (!data?.regional) return
    if (!regions[type]?.length) {
        regions[type] = []
        regions[type].push(...data.regional.map(mapFn(type)))
    }
}

const mapFn = (t) => t === 'Cases' ? x => x.loc : x => x.state
