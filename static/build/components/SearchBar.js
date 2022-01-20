import CrossButton from './CrossButton.js';
export default function SearchBar({
  setSearchQuery,
  searchQuery
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "search-bar-div"
  }, /*#__PURE__*/React.createElement("input", {
    className: "search-bar",
    key: "random1",
    maxLength: 60,
    value: searchQuery,
    placeholder: "Search",
    onChange: e => setSearchQuery(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSearchQuery(''),
    className: "search-bar"
  }, /*#__PURE__*/React.createElement(CrossButton, null)));
}
//# sourceMappingURL=SearchBar.js.map