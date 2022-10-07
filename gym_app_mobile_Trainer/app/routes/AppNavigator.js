import React, { useState } from 'react';

import LeftSideMenu from './LeftSideMenu';
import { useSelector } from "react-redux";

const AppNavigator = props => {
    const checkLogedIn = useSelector((state) => state.trainerLoginReducer.isLoggedIn)
    // if err use useeffect
    if (!checkLogedIn) {
        props.changeAuth(checkLogedIn)
    }
    return (
        <LeftSideMenu />
    )
}

export default AppNavigator;