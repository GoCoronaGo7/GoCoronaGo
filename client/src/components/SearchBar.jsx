import CrossButton from './CrossButton.js'

export default function SearchBar ({ setSearchQuery, searchQuery }) {
    return <div className="search-bar-div">
        <input
            className="search-bar"
            key="random1"
            maxLength={60}
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery('')}
            className="search-bar"
        >
            <CrossButton />
        </button>
    </div>
}
SearchBar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string
}
