import React from 'react';
import { StyleSheet, Text, View, Image ,Linking, Platform, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons,Entypo,Foundation } from '@expo/vector-icons';

const Profile =(props) =>{
    const {_id,Name,Position,Email,Phone,DOB,Picture,AadharNumber} = props.route.params.item

    console.log(_id)

    const createTwoButtonAlert = () =>{
        Alert.alert(
        "Intimation",
        "Would you like to delete this?",
        [
            {
            text: "Yes",
            onPress: () => {deleteData()},
            },
            { text: "No", onPress: () => console.log("No Pressed") }
        ],
        { cancelable: true }
        );
    }

    const deleteData =()=>{
        fetch("http://10.0.2.2:3000/delete",{
            method:"post",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: JSON.stringify({
                  id:_id
            })
        })
        .then(res=>res.json())
        .then(_deleted=>{
            console.log("Deleted")
        }).catch(err=>{
            console.log(err)
        })
    }

    
    const opendial=()=>{
        if(Platform.OS=="android"){
            Linking.openURL(`tel:${Phone}`)
        }else{
            Linking.openURL(`telprompt:${Phone}`)
        }
    }
    return(
        <View style={styles.linear}>
                <LinearGradient
                colors={["gold","black"]}
                style={{height:"20%"}}
                />
            <View style={{alignItems:"center"}}>
                <Image 
                    style={{width:120,height:120,borderRadius:60,marginTop:-50}}        
                    source={{uri:Picture}} />
            </View>
            <View style={{alignItems:"center",margin:10}}>
                <Title>{Name}</Title>
                <Text style={styles.mytext}>{Position}</Text>
            </View>
            <Card style={styles.mycard} onPress={()=>{
                    Linking.openURL(`mailto:${Email}`)}}>
                <View style={styles.innercard}>
                    <MaterialIcons name="email" size={32} color="red" />        
                    <Text style={styles.mytext}>{Email}</Text>
                </View>
            </Card>
            <Card style={styles.mycard} onPress={()=>opendial()}>
                <View style={styles.innercard}>
                    <Entypo name="phone" size={32} color="red" />
                    <Text style={styles.mytext}>{Phone}</Text>        
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.innercard}>
                    <Entypo name="calendar" size={32} color="red" />
                    <Text style={styles.mytext}>{AadharNumber}</Text>        
                </View>
            </Card>
            <Card style={styles.mycard}>
                <View style={styles.innercard}>
                    <Foundation name="calendar" size={36} color="red" />        
                    <Text style={styles.mytext}> {DOB}</Text>
                </View>
            </Card>
            <View style={styles.buttonset}>
                <Button icon="account-edit" mode="contained" onPress={() =>{props.navigation.navigate("Create",
                {_id,Name,Email,Position,Picture,DOB,Phone})}}>
                Edit
                </Button>
                <Button icon="delete" mode="contained" onPress={() =>{createTwoButtonAlert(),props.navigation.navigate("Home")}}> 
                Delete
                </Button>
            </View>
    </View>
    )
}

const styles= StyleSheet.create({
    linear:{
        flex:1
    },
    mycard:{
        margin:5,
        padding:8
    },
    innercard:{
        flexDirection:"row"
    },
    mytext:{
        fontSize:20,
        marginLeft:5,
        marginTop:2
    },
    buttonset:{
        margin:10,
        flexDirection:'row',
        justifyContent:"space-around"
}})

export default Profile


