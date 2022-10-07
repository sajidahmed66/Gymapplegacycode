import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Image } from 'react-native'

import { trainerProfileApi } from '../../api/trainerProfileApi'
import { getFormattedToken } from '../../common/formattedToken';
import { useDispatch, useSelector } from "react-redux";
import commonApi from '../../api/commonApi';

const { width, height } = Dimensions.get('window');

const TraineeAlbumForExercise = (props) => {
    let userData = props.traineeExerciseData;
    const [trineeImages, settraineeImages] = useState([])
    const formattedToken = useSelector(state => getFormattedToken(state.trainerLoginReducer.token));

    //console.log("userData", userData)

    useEffect(() => {
        trainerProfileApi.traineeGetImages({ traineeId: userData.trainee._id }, formattedToken)
            .then(res => {
                console.log("from response", res.data)
                settraineeImages(res.data)
            })
            .catch(err => { console.log(err) })
    }, [])
    const renderImage = ({ item }) => (
        <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => { console.log("Image Pressed") }}
        >
            <Image
                source={{
                    uri: commonApi.api + item.image
                }}
                style={{
                    width: width / 2 - 20,
                    height: height / 5 - 20,
                }}
            />
        </TouchableOpacity>

    )

    return (
        <View style={styles.screen} >
            <FlatList
                numColumns={2}
                data={trineeImages}
                renderItem={renderImage}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default TraineeAlbumForExercise

const styles = StyleSheet.create({
    screen: {
        width: width,
        height: height * 0.72
    }
})
