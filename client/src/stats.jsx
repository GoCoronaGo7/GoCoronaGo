import Selector from './pages/stats/Selector.js'
import StatsDisplay from './pages/stats/StatsDisplay.js'

const { useState } = React

window.regions = {}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<Stats />, document.getElementById('statsHolder'))
})

const Stats = () => {
    const [active, setActive] = useState('Cases')

    return (<>
        <Selector active={active} setActive={setActive} />
        <StatsDisplay active={active}/>
    </>)
}
