// component that displays header strip at home screen.

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import Logo from './Logo';

const Header = props => {

    const openDrawerHandler = () => {
        props.navigation.openDrawer()
    };
    return (
        <View style={styles.header}>
            <Logo openDrawer={openDrawerHandler} style={styles.logo} />
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 70,

        backgroundColor: 'black',
        flexDirection: 'row',
    },
    headerText: {
        color: "#b8000c"
    },
    logo: {
        width: 60,
        height: 60,
    }
});

export default Header;