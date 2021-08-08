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
            className="x-button"
        >
                X
        </button>
    </div>
}
SearchBar.propTypes = {
    setSearchQuery: PropTypes.func.isRequired,
    searchQuery: PropTypes.string
}
