import React from 'react';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import GymLogo from '../../assets/image/logo.png'

const Logo = props => {
    return (
        <View style={{ ...props.style, ...styles.logo  }}>
            <TouchableOpacity onPress={() => {
                props.openDrawer()
            }}>
                <Ionicons name="ios-menu" size={40} color="white" />
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    logo: {
        height: "100%",
        width: "100%"
    }
});

export default Logo;