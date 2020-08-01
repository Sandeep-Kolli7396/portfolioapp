import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View , Image ,FlatList } from 'react-native';
import {Card,FAB} from 'react-native-paper'
 
const Home=(Props)=> {
    const [data,setData]= useState([])
    const [loading,setLoading] = useState(true)
    
    const fetchData=()=>{
        fetch("http://10.0.2.2:3000/")
        .then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)
        }).catch(err=>{
            console.log(err)
        })
    }
        useEffect(()=>{
            fetchData()
    })

    const renderlist = ((item)=>{
        return(
                <Card style={styles.mycard} onPress={()=>{Props.navigation.navigate("Profile",{item})}}>
            <View style={styles.cardview}>
            <Image
            style={{width:70,height:70,borderRadius:35}}        
            source={{uri:item.Picture}} />
            <View>
            <Text style={styles.text}>{item.Name}</Text>
            <Text style={styles.text}>{item.Position}</Text>
            </View>
            </View>
                </Card>
            )
        })
        
    return(
        <View style={{flex:1}}>
            
            <FlatList
                data={data}
                renderItem={({item})=>{
                    return renderlist(item)
                }}
                keyExtractor={item=>{item._id}}
                onRefresh={()=>
                    fetchData()
                }
                refreshing={loading}
                />
        
        
            <FAB onPress={()=>Props.navigation.navigate("Create")}
            style={styles.fab}
            small={false}
            icon="plus"
            theme={{colors:{accent:"red"}}}
            />
        </View>

    )
}

    const styles = StyleSheet.create({
        mycard:{
            margin:5,
            backgroundColor:"gold"
        },
        cardview:{
            flexDirection:'row',
            padding:8
        },
        text:{
            fontSize:20,
            marginLeft:45,
            padding:1
        },
        div:{
            backgroundColor:"black"
        },
        fab:{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
        },

})

export default Home
