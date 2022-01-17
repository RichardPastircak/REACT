import React, { useState, useContext } from 'react';

const ItemsContext = React.createContext([]);

export const ItemsProvider = ({ children }) => {
  return (
    <ItemsContext.Provider value={useState([])}>
      {children}
    </ItemsContext.Provider>
  );
}

export const useItems = () => useContext(ItemsContext);
