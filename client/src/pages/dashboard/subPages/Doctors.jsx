import PaginatedDisplay from './Paginator.js'
export default function Doctors ({ doctors }) {
    function click (name) {
        console.log(name)
    }
    return <div className="window doctors">
        <PaginatedDisplay doctors={doctors} click={click} />
    </div>
}

Doctors.propTypes = {
    doctors: PropTypes.array
}
