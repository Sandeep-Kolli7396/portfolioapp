import React, { useState } from 'react';
import { StyleSheet, Text, View , Image ,FlatList, Modal ,Alert, KeyboardAvoidingView } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmploye =({Props,route}) =>{
    const getdetails=(type)=>{
        if(route.params){
            switch(type){
                case "Name":
                    return route.params.Name
                case "Phone":
                    return route.params.Phone
                case "Email":
                    return route.params.Email
                case "DOB":
                    return route.params.DOB
                case "Position":
                    return route.params.Position
                case "AadharNumber":
                    return route.params.AadharNumber
                case "Picture":
                    return route.params.Picture
            }
        }return ""
}

    const [Name,setname] = useState(getdetails("Name"))
    const [Phone,setphone] = useState(getdetails("Phone"))
    const [Email,setemail] = useState(getdetails("Email"))
    const [DOB,setDOB] = useState(getdetails("DOB"))
    const [Position,setposition] = useState(getdetails("Position"))
    const [Picture,setpicture]  = useState(getdetails("Picture"))
    const [AadharNumber,setAadharNumber]  = useState(getdetails("AadharNumber"))
    const [modal,setmodal] = useState(false)
    // const [enableshift,setenableshift] = useState(false)

    const Info = () =>{
        Alert.alert(
        `Details of ${Name} is saved successfully`,
        [
            {
            text: "OK",
            onPress: () => close(),
            }
        ],
        { cancelable: false }
        );
    }

    const updatedetails=(Props)=>{
        fetch("http://10.0.2.2:3000/update",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                  id:route.params._id,
                  Name,
                  Email,
                  Phone,
                  DOB,
                  Position,
                  AadharNumber,
                  Picture
              })
            })
            .then(res=>res.json())
            .then(_data=>{
                // Info()
                // Props.navigation.navigate("Home")
                console.log("Updated successfully")
            }).catch(err=>{
                console.log(`SERVICE ERROR 420 ${err}`)
        })
    }
    
    const submitdata=()=>{
        fetch("http://10.0.2.2:3000/send-data",{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                  Name,
                  Email,
                  Phone,
                  DOB,
                  Position,
                  AadharNumber,
                  Picture
              })
            })
            .then(res=>res.json())
            .then(_data=>{
                // Info()
                // Props.navigation.navigate("Home")
                console.log("Saved successsfully")
            }).catch(err=>{
                console.log(`SERVICE ERROR 420 ${err}`)
        })
    }

    const pickfromGallery = async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA_ROLL)        
            if(granted){
            let data = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })
            if(!data.cancelled){
                let newfile= { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleupload(newfile)
            }
            }
            else{
                Alert.alert("Sorry!!! Permission required")

            }
        }

    const pickfromcamera = async () =>{
        const {granted} = await Permissions.askAsync(Permissions.CAMERA)
        
            if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1,1],
                quality: 1,
            })
            if(data.cancelled==false){
                let newfile= { 
                    uri:data.uri,
                    type:`test/${data.uri.split(".")[1]}`,
                    name:`test.${data.uri.split(".")[1]}`
                }
                handleupload(newfile)
            }
        }
            else{
                Alert.alert("Sorry!!! Permission required")
            }
        }

    const handleupload = (image) =>{
        const data = new FormData()
        data.append('file',image),
        data.append('upload_preset','Personalinfo'),
        data.append('cloud_name','mounishapp')

            fetch('https://api.cloudinary.com/v1_1/mounishapp/image/upload',{
                method:"post",
                body:data
            }).then(res=>res.json())
            .then(data=>{
                setpicture(data.url)
                setmodal(false)
            })
        }
    return(

        // <KeyboardAvoidingView behavior="position" >
        <View style={styles.form}>
            <TextInput
            label='Name'
            theme={theme}
            // onFocus={setenableshift(false)}
            value={Name}
            style={styles.inputstyle}
            mode="outlined"
            onChangeText={text =>{setname(text)}}
            />
            <TextInput
            label='Phone'
            value={Phone}
            // onFocus={setenableshift(false)}
            style={styles.inputstyle}
            mode="outlined"
            keyboardType="phone-pad"
            onChangeText={text =>{setphone(text)}}
            />
            <TextInput
            label='Email'
            value={Email}
            // onFocus={setenableshift(false)}
            style={styles.inputstyle}
            mode="outlined"
            onChangeText={text =>{setemail(text)}}
            />
            <TextInput
            label='Date of birth'
            value={DOB}
            // onFocus={setenableshift(true)}
            style={styles.inputstyle}
            mode="outlined"
            onChangeText={text =>{setDOB(text)}}
            />
            <TextInput
            label='Any other info...'
            value={Position}
            // onFocus={setenableshift(true)}
            style={styles.inputstyle}
            mode="outlined"
            onChangeText={text =>{setposition(text)}}
            />
            <TextInput
            label='Aadhar Number'
            value={AadharNumber}
            // onFocus={setenableshift(true)}
            style={styles.inputstyle}
            mode="outlined"
            onChangeText={text =>{setAadharNumber(text)}}
            />
            <Button
            // style={styles.inputstyle} 
            icon={Picture==""?"upload":"check"} 
            mode="contained" 
            onPress={() => {setmodal(true)}}>
            Upload Image
            </Button>
            {route.params?
            <Button 
            style={styles.inputstyle} 
            mode="contained" 
            onPress={() => updatedetails() }>
                Update
            </Button>
            :
            <Button 
            style={styles.inputstyle} 
            mode="contained" 
            onPress={() => submitdata() }>
                Save
            </Button>
            }
            <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={()=>{
                setmodal(false)
            }}>
            <View style={styles.modalview}>
                <View style={styles.buttonset}>
                    <Button icon="camera" mode="contained" onPress={() =>pickfromcamera()}>
                    Camera
                    </Button>
                    <Button icon="image-area" mode="contained" onPress={() => pickfromGallery()}>
                    Gallery
                    </Button>
                </View>
                <View>
                    <Button mode="contained" onPress={() => {setmodal(false)}}>
                    Cancel
                    </Button>
                </View>
            </View>
            </Modal>
            
        </View>
    // { </KeyboardAvoidingView> }
    )
}
const theme = {
    colors:{
        primary:"blue"
    }
}

const styles = StyleSheet.create({
    form:{
        flex:1
    },
    inputstyle:{
        margin:5
    },
    buttonset:{
        margin:5,
        padding:20,
        flexDirection:'row',
        justifyContent:"space-around"
    },
    modalview:{
       position:"absolute",
       bottom:2,
       width:"100%"
    },
    buttonview:{ 
        justifyContent:"center"
    }
})

export default CreateEmploye


