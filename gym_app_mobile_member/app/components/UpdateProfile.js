import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Modal, Button, Dimensions, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import Colors from '../constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as yup from 'yup';

// toDo:
// >>1. Figure out how to pass date data to formik form for submition in Profile Update.
// >>2. Calculate BMI for profile update data.
// 3. Add VAlidation with yup.
// >>4. Redesign the button component for Update Profile.


const { width, height } = Dimensions.get('window');

const UpdateProfile = (props) => {

  console.log("from update Profile", props.profileData)
  const [getProfile, setGetProfile] = useState(null);

  const [date, setDate] = useState(new Date(props.profileData.dateOfBirth));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const closeModal = () => {
    props.setModalVisible(false)
  }
  const ProfileSchema = yup.object({
    email: yup.string().email('imvalid Email').required('Email Required'),
    address: yup.string().required(),
    dateOfBirth: yup.date().required(),
    gender: yup.string().required('Required'),
    weight: yup.string().required().min(2),
    height: yup.string().required().min(3)
  })
  return (
    <Modal
      visible={props.modalVisible}
      animationType='fade'
    >
      <Formik
        initialValues={{
          email: props.profileData.email,
          address: props.profileData.address,
          dateOfBirth: '',
          gender: props.profileData.gender,
          age: `${props.profileData.age}`,
          weight: `${props.profileData.weight}`,
          height: `${props.profileData.height}`,
          bmi: '',
        }}

        onSubmit={(values) => {
          props.setModalVisible(false)
          props.updateProfile(values)
        }
        }
        validationSchema={ProfileSchema}
      >
        {props => {
          const [dateField, setdatefield] = useState('');
          const getFormatedDate = (curDate) => {
            let day = curDate.getDate()
            let month = curDate.getMonth() + 1
            let year = curDate.getFullYear()
            let new_value = day + "/" + month + "/" + year;
            setdatefield(new_value);
          }
          const onChange = (event, selectedDate) => {
            const currentDate = selectedDate || date;
            setShow(Platform.OS === 'ios');
            setDate(currentDate)
            calculate_Age(currentDate)
            getFormatedDate(currentDate)
            props.setFieldValue('dateOfBirth', currentDate)
          };

          const showMode = (currentMode) => {
            setShow(true);
            setMode(currentMode);
          };

          const showDatepicker = () => {
            showMode('date');
          };

          const calculate_Age = (date) => {
            const today = new Date();
            let age_Now = today.getFullYear() - date.getFullYear()
            props.setFieldValue('age', age_Now)
          }

          const bmiCalculator = () => {
            let height = props.values.height / 100;
            let weight = props.values.weight;
            if (height !== "" && weight !== "") {
              let bmi = weight / (height * 2)
              props.setFieldValue('bmi', bmi)
            } else {
              alert("Input both Height and Weight")
            }
          }



          return (
            <View style={styles.modalView}>
              <Text style={styles.headerText}>Update Profile </Text>
              <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }} >
                <View style={{ width: "20%" }}
                ><Text>Email</Text></View>
                <View style={{ width: "80%" }}>

                  <TextInput
                    style={styles.emailInputField}
                    placeholder="Enter Email"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                  />

                </View>
              </View>
              <Text style={styles.errorText} >{props.touched.email && props.errors.email}</Text>

              <View
                style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ width: "20%" }} >
                  <Text>Address</Text>
                </View>
                <View style={{ width: "80%" }} >
                  <TextInput
                    style={styles.emailInputField}
                    placeholder="Enter Address"
                    onChangeText={props.handleChange('address')}
                    onBlur={props.handleBlur('address')}
                    value={props.values.address}
                  />
                </View>
              </View>
              <Text style={styles.errorText} >{props.touched.address && props.errors.address}</Text>

              <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ width: "20%" }} >
                  <Text>BirthDate</Text>
                </View>
                <View style={{ width: "60%" }} >
                  {/* Implement datePicker here! */}
                  <Text
                    style={styles.datePickContainer}
                  >
                    {dateField === '' ? `choose a date` : dateField}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: "20%",
                    padding: 10,
                    alignItems: 'center'
                  }}
                  onPress={() => { showDatepicker() }}
                >
                  <Entypo name="calendar" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText} >{props.touched.dateOfBirth && props.errors.dateOfBirth}</Text>

              <View style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ width: "20%" }} >
                  <Text>Gender</Text>
                </View>
                <View style={{ width: "80%" }} >
                  <DropDownPicker
                    items={[
                      { label: 'Male', value: 'Male' },
                      { label: 'Female', value: 'Female' }
                    ]}
                    defaultValue={props.values.gender}
                    containerStyle={{ height: '100%' }}
                    itemStyle={{ justifyContent: 'flex-start' }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}

                    onChangeItem={item => {
                      console.log(item.value)
                      props.setFieldValue('gender', item.value)
                    }}
                  />
                </View>
              </View>
              <Text style={styles.errorText} >{props.touched.gender && props.errors.gender}</Text>

              <View
                style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ width: "20%" }} >
                  <Text>Weight</Text>
                </View>
                <View style={{ width: "80%" }} >
                  <TextInput
                    keyboardType='numeric'
                    style={styles.emailInputField}
                    placeholder="Enter Weight (kg)"
                    onChangeText={props.handleChange('weight')}
                    onBlur={props.handleBlur('weight')}
                    value={props.values.weight}
                  />
                </View>
              </View>
              <Text style={styles.errorText} >{props.touched.weight && props.errors.weight}</Text>

              <View
                style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ width: "20%" }} >
                  <Text>Height</Text>
                </View>
                <View style={{ width: "80%" }} >
                  <TextInput
                    style={styles.emailInputField}
                    keyboardType='numeric'
                    placeholder="Enter Height (cm) "
                    onChangeText={props.handleChange('height')}
                    onBlur={props.handleBlur('height')}
                    value={props.values.height}
                  />
                </View>
              </View>
              <Text style={styles.errorText} >{props.touched.height && props.errors.height}</Text>

              {/* <View
                style={{ flexDirection: 'row', width: '100%', height: 50, alignItems: 'center', justifyContent: 'space-around', marginBottom: 100 }}>
                <View style={{ width: "20%" }} >
                  <Text>BMI</Text>
                </View>
                <View style={{ width: "80%" }} >
                  <Text
                    style={styles.datePickContainer}
                  >
                    some value
                  </Text>
                </View>
              </View> */}
              {
                show ? <DateTimePicker
                  value={date}
                  mode={mode}
                  display='spinner'
                  onChange={onChange}

                /> : <></>
              }
              {/* <Text>  {date.toString()}</Text> */}
              <View style={{
                width: width - 30,
                height: 60,
                padding: 10,
                alignContent: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'row',
                marginTop: 50
              }}>
                <TouchableOpacity
                  style={{
                    width: "40%",
                    height: 40,
                    backgroundColor: Colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginHorizontal: 5,
                  }}
                  onPress={() => {
                    bmiCalculator()
                    props.handleSubmit()
                  }}
                >
                  <View >
                    <Text style={{
                      color: 'white'
                    }}>
                      Update
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    //flex: 1 
                    marginHorizontal: 5,
                    width: "40%",
                    height: 40,
                    backgroundColor: Colors.complemantary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 20,
                  }}
                  onPress={closeModal}
                >
                  <View>
                    <Text style={{
                      color: 'white'
                    }}>
                      Cancle
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}

      </Formik>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    padding: 20,
    height: height - 100,
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
    alignSelf: 'center'
  },
  emailInputField: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    alignItems: 'center'
  },
  datePickContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderWidth: 1,
    borderColor: '#dfdfdf',
    alignItems: 'center',
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    // marginBottom: 5,
    // marginTop: 3,
    textAlign: 'center',
    fontSize: 12
  }
});



export default UpdateProfile;
