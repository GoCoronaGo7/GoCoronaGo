import Selector from './components/Selector.js'
import StatsDisplay from './components/StatsDisplay.js'

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
