import Button from "react-bootstrap/Button";
import { useState } from "react";
function SearchWithAnimation() {
  const [isSearchVisible, setSearchVisible] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  return (
    <div className="search-container">
      <Button variant="outline-light" onClick={toggleSearch}>
        <i className="bi bi-search text-white"></i>
      </Button>
      {isSearchVisible && (
        <input type="text" className="search-input" placeholder="Search" />
      )}
    </div>
  );
}

export default SearchWithAnimation;
