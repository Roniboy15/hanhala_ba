import React, { useState } from 'react'
import { LoadHousesContext } from '../context/Context';

const LoadHouseContext = ({ children }) => {
   
const [loadHouses, setLoadHouses] = useState(false);

    return (
        <LoadHousesContext.Provider value={{loadHouses, setLoadHouses }}>
            {children}
        </LoadHousesContext.Provider>
    )
}

export default LoadHouseContext
