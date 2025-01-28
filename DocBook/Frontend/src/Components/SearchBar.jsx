import React, { useState } from "react";

const SearchBar = ({ onSearch, placeholder }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term); // Trigger search dynamically as the user types
    };

    return (
        <div className="flex justify-center mb-4">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder={placeholder || "Search..."}
                className="w-full sm:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
        </div>
    );
};

export default SearchBar;