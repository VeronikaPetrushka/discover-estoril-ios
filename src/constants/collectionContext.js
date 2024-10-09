import React, { createContext, useContext, useState } from 'react';

const AvailabilityContext = createContext();

export const CollectionProvider = ({ children }) => {
    const [available, setAvailable] = useState([true, false, false, false, false, false]);

    return (
        <AvailabilityContext.Provider value={{ available, setAvailable }}>
            {children}
        </AvailabilityContext.Provider>
    );
};

export const useAvailability = () => {
    return useContext(AvailabilityContext);
};
