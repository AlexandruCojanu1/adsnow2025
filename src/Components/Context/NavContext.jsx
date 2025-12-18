import React, { createContext, useContext } from "react";
import { useLocation } from "react-router-dom";

const NavContext = createContext();

export const NavProvider = ({ children }) => {
    const location = useLocation();
    const pathname = location.pathname;

    const isDropdownActive = (paths = []) => paths.includes(pathname);

    const value = { pathname, isDropdownActive };

    return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNav = () => useContext(NavContext);