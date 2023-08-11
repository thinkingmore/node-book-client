"use client"
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [ searchText, setSearchText] = useState("");

  const handleSearch = (query) => {
      setSearchText(query);
  };

  return (
    <SearchContext.Provider value={{ handleSearch, searchText }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
