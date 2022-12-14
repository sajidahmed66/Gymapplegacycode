import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity, Platform, Dimensions } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import { EvilIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import ImageView from 'react-native-image-viewing';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

//components & Screen
import Logo from '../../components/Logo';
import ViewImageScreen from './ViewImageScreen';
import ImageFooter from '../../components/ImageFooter';
//import APi
import commonApi from "../../api/commonApi";
import traineeGallaryApi from '../../api/traineeGallaryApi';
import { useDispatch, useSelector } from "react-redux";
import { getFormattedToken } from "../../common/formetedToken";
//To-Dos:
// add expo image picker functionality to the button, (done).
// Display that image to below.(tested).
//Add GirdLike ImageView using FlatList(Done)
//use a modal to view the image full screen.(not done).

const { width, height } = Dimensions.get('window');


//main component.

const AlbumScreen = props => {

    const [imageUri, setImageUri] = useState([]);


    //get formatted token
    const formattedToken = useSelector((state) =>
        getFormattedToken(state.loginReducer.token)
    );

    //function to load photos from server 
    const getPhoto = () => {
        traineeGallaryApi.traineeGetGallryImage(formattedToken)
            .then(res => {
                let imageCollection = res.data.map(imgObj => ({ uri: commonApi.api + imgObj.image }))
                // console.log(imageCollection, res.data)
                setImageUri(res.data);
                setImages(imageCollection)
            })
    }

    // 
    useEffect(() => {
        getPhoto()
    }, []);

    //function and states to open and handle image view Modal.
    const [currentImageIndex, setImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const onSelect = (index,) => {
        setImageIndex(index);
        setImages(images);
        setIsVisible(true);
    }

    // function for selecting Image from file system.
    const pickImage = async () => {
        let result_addImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            //aspect: [4, 3],
            quality: .3,
        })
        if (!result_addImage.cancelled) {
            // setImageUri(cur => [...cur, result_addImage.uri]);
            uploadImage(result_addImage.uri)
        }
    };

    //  function for opening the camera and take photo.
    const takeImageCamera = async () => {
        let result_takePhoto = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            //aspect: [4, 3],
            quality: 0.3,
        })
        console.log(result_takePhoto)
        if (!result_takePhoto.cancelled) {
            //setImageUri(cur => [...cur, result_takePhoto.uri])
            uploadImage(result_takePhoto.uri)
        }
    };

    //upload image handeler 
    const uploadImage = (imageUri) => {
        let uriParts = imageUri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let formData = new FormData();

        formData.append('image',
            {
                uri: imageUri,
                name: `image.${fileType}`,
                type: `image/${fileType}`
            }
        );
        traineeGallaryApi.traineeUploadGallaryImage(formData, formattedToken)
            .then(res => {

                // let image = res.data.map(imgObj => { return { uri: `${commonApi.api}${imgObj.image}` } })
                // console.log(image)
                console.log(res.data)
                setImageUri(res.data)
            })
            .catch(err => console.log(err.response.data))
    }

    //Animated Bottom SheetComponent\\

    //referance for bottomsheet , using createRef();
    let bs = React.createRef();
    let fall = new Animated.Value(1);

    //renderHeader for animated bottom sheet.
    const renderHeader = props => {
        return (
            <View style={styles.header}>
                <View style={styles.panelHeader}>
                    <View style={styles.panelHandle} />
                    <Feather name="chevrons-down" size={24} color="black" />
                </View>
            </View>
        )
    }

    // render Body for animated bottom sheet.
    const renderInner = props => (
        <View style={styles.panel} >
            <View style={{ alignItems: 'center' }} >
                <Text style={styles.panelTitle} > Upload photo</Text>
                <Text style={styles.panelSubtitle} >Choose An Option To Upload</Text>
            </View>
            <TouchableOpacity style={styles.panelButton} onPress={() => takeImageCamera()}>
                <Text style={styles.panelButtonTitle}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.panelButton} onPress={() => pickImage()}>
                <Text style={styles.panelButtonTitle}>Choose From Library</Text>
            </TouchableOpacity>
            {/* this componenr showes below the bottom tab nav so currently removed */}
            {/* <TouchableOpacity
                style={styles.panelButton}
                onPress={() => bs.current.snapTo(1)}>
                <Text style={styles.panelButtonTitle}>Cancel</Text>
            </TouchableOpacity> */}
        </View>
    )

    //RenderItem for FlatList.
    const renderImage = ({ item, index }) => (
        <TouchableOpacity
            style={{ padding: 5, }}
            onPress={() => { onSelect(index) }}
        >
            <Image
                source={{
                    uri: commonApi.api + item.image
                }}
                style={{
                    width: width / 2 - 20,
                    height: height / 5 - 20,
                    borderRadius: 10
                }}
            />
        </TouchableOpacity>

    )

    //Main component Return
    return (
        <View style={styles.screen}>
            <BottomSheet
                ref={bs}
                snapPoints={[400, 0]} // takes in height , use dimension to make this responsive
                renderContent={renderInner}
                renderHeader={renderHeader}
                initialSnap={1}
                callbackNode={fall}
                enabledGestureInteraction={true}
                enabledContentGestureInteraction={false}
            />
            <View>
            </View>
            <View style={styles.flatlistview}>
                {imageUri.length !== 0 ?
                    <FlatList
                        // style={styles.flatlistContainer}
                        numColumns={2}
                        data={imageUri}
                        renderItem={renderImage}
                        keyExtractor={item => item._id}
                    // contentContainerStyle={{}}
                    /> : null}
            </View>
            <View style={styles.addImageIcon}>
                <TouchableOpacity
                    onPress={() => { bs.current.snapTo(0) }}
                >
                    <MaterialCommunityIcons
                        name="camera-plus-outline"
                        size={30}
                        color="black"
                    />
                </TouchableOpacity>
            </View>
            {images.length !== 0 ? <ImageView
                images={images}
                imageIndex={currentImageIndex}
                visible={isVisible}
                onRequestClose={() => setIsVisible(false)}
                FooterComponent={({ imageIndex }) => (
                    <ImageFooter imageIndex={imageIndex} imagesCount={images.length} />
                )}
            /> : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatlistview: {
        alignItems: 'center'
    },
    addImageIcon: {
        position: "absolute",
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        height: 50,
        width: 50,
        bottom: 40,
        right: 15,
        borderRadius: 50
    },
    flatlistContainer: {
        flex: 1,
        height: height - 150,
        width: width - 20,

    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        elevation: 2,
        // shadowColor: '#000000',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 5,
        // shadowOpacity: 0.4,
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: { width: -1, height: -3 },
        shadowRadius: 2,
        shadowOpacity: 0.4,
        elevation: 5,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    panelHeader: {
        alignItems: 'center',
        // justifyContent: 'center'
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    closeIcon: {
        marginBottom: 10,
        // position: 'relative',
        // right: 50
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
})

//Stack navigator;

const AlbumStack = createStackNavigator();

const AlbumStackScreen = props => {
    return (
        <AlbumStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#630093",
                    height: 65
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
            }}
        >
            <AlbumStack.Screen
                name="Album"
                component={AlbumScreen}
                options={{
                    headerLeft: () => <Logo
                        style={{ height: 60, width: 60 }}
                        openDrawer={() => props.navigation.openDrawer()}
                    />,
                    headerLeftContainerStyle: {
                        padding: 10
                    }
                }}

            />
            <AlbumStack.Screen
                name="Add a Image"
                component={ViewImageScreen}
                options={{
                    headerLeftContainerStyle: {
                        padding: 10
                    }
                }}
            />
        </AlbumStack.Navigator>
    )
}


export default AlbumStackScreen;