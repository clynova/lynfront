import { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { HiSearch } from "react-icons/hi";
import { products } from "../../data/products";
import { SearchResults } from "./SearchResults";

const SearchBar = ({ isExpanded, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onToggle(false);
        setSearchTerm("");
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onToggle]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length >= 2) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div ref={searchRef} className="relative flex-grow max-w-2xl">
      {isExpanded ? (
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full bg-slate-800/50 text-slate-200 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <SearchResults 
            results={results} 
            onClose={() => {
              onToggle(false);
              setSearchTerm("");
              setResults([]);
            }} 
          />
        </div>
      ) : (
        <button
          onClick={() => onToggle(true)}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
        >
          <HiSearch className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};
SearchBar.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export { SearchBar };
