// this is a test file. Trying out something new.

import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    Platform,
    Alert,
    // Linking ==>> use expo linking insted
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permission from 'expo-permissions';
import { v4 as uuidv4 } from 'uuid';
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'


class UploadImage extends Component {
    constructor(props) {
        this.state = {
            endpoint: this.props.endpoint
        }
        defaultProps = {
            onSuccess: undefined,
            onFailure: undefined,
            onStartUpload: undefined,
            alertTitle: 'Please Allow Access',
            alertMessage: [
                'This applicaton needs access to your photo library to upload images.',
                '\n\n',
                'Please go to Settings of your device and grant permissions to Photos.',
            ].join(''),
            alertNo: 'Not Now',
            alertYes: 'Settings',
        };
    }

    render() {
        // return(
        //     <View>
        //         {this.props.callbackUrl!==null ? <Image 
        //             source={{uri: this.state.uploadPhoto? }}
        //         />}
        //     </View>
        // )
    }
}