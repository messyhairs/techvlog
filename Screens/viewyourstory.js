import React, { Component, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { cos } from 'react-native-reanimated';
export default class Viewstory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            profiles: [],
            testdatas: '',
            userstory: [],
            activeSections: [],
            textValue: false,
            currentstories: []
        }
    }

    getdata = async () => {
        try {
            let users = await AsyncStorage.getItem('userdatas');
            const userdatas = JSON.parse(users);
            console.log(userdatas);
            this.setState({ data: userdatas });
            const gettoken = this.state.data.token;
            const getuserid = this.state.data.userid;
            console.log(gettoken);
            // const geturl = 'http://172.26.240.1:8000/api/getuserdetails/';
            // const localurl = 'http://192.168.1.16:8000/api/getuserdetails/';
            // const localurl = 'http://localhost:8000/api/getuserdetails/';
            const localurl = 'https://tranquil-dusk-36378.herokuapp.com/api/getuserdetails'
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + gettoken,
                    'Accept': 'application/json',
                },

            };
            Axios.get(localurl + getuserid, config)
                .then(response => {
                    this.setState({ profiles: response.data.profile });
                    // console.log(response.data.profile.useremail)
                })
                .catch(function (error) {
                    console.log(error);
                })
            // get stories by id
            // const geturl1 = 'http://172.26.240.1:8000/api/yourstories/';
            // const localurl1 = 'http://192.168.1.16:8000/api/allstories';
            const localurl1 = 'https://tranquil-dusk-36378.herokuapp.com/api/allstories'
            // const localurl1 = 'http://localhost:8000/api/allstories';
            Axios.get(localurl1, config)
                .then(response => {
                    const getdatas = response.data.stories;
                    getdatas.forEach(datas => {
                        if (datas.creatorid === getuserid) {
                            const obj = {
                                'username': datas.username, 'useremail': datas.useremail,
                                'title': datas.title, 'storycreator': datas.creator, 'storycontent': datas.storypara, 'stories_id': datas._id
                            };
                            this.setState({
                                userstory: [...this.state.userstory, obj]
                            });
                            console.log(this.state.userstory);
                            // this.setState({ userstory: datas });
                        }
                    })
                })
                .catch(function (error) {
                    console.log(error);
                })
        } catch (e) {
            // error reading value
            console.log(e);
        }
    }
    componentDidMount() {
        // setTimeout(() => {
        //   this.setState({favoritecolor: "yellow"})
        // alert('hello*********')
        this.getdata();
    }
    editformstatus = (e, stories) => {
        // this.setState({
        //     textValue: true
        // })
        // console.log(this.state.textValue)
        // if (this.state.textValue == true) {
        //     //    document.getElementById('hidestory').style.display = 'none'
        //     alert('hello')
        // }
        // user = {
        //     name: 'gokulnathu'
        // }
        this.props.navigation.navigate(
            // 'EditstoryScreenStack',
            'Edit your story'
            // { story: stories },
        );
        // console.log(e.target.value);
        console.log(stories);
        AsyncStorage.setItem('currentstory', JSON.stringify(stories))
        this.setState({
            currentstories: [...this.state.currentstories, stories]
        });
    }
    render() {
        console.log(this.state.currentstories);
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.mainBody} id="hidestory">
                        {this.state.userstory.map((stories, index) => (
                            <Card key={index}>
                                <Card.Title>
                                    <Text>{stories.title}</Text>
                                </Card.Title>
                                <Card.Divider />
                                <View>
                                    <Text style={styles.storycontentbottomview}>{stories.storycontent}</Text>
                                    <Card.Divider />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ width: 50, height: 50 }}>
                                        <Text value={stories.title} onPress={((e) => this.editformstatus(e, stories))}>Edit</Text>
                                    </View>
                                </View>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
// function getbannerdata() {
//     const localurl = 'https://jsonplaceholder.typicode.com/todos/1';
//     return fetch(localurl, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//         },

//     })
//         .then((res) => res.json())
//         .then((resData) => {
//             return resData;
//         })
//         .catch(error => console.log(error))

// };
// export { getbannerdata }


const styles = StyleSheet.create({
    storycontentbottomview: {
        paddingBottom: 50,
        textAlign: 'justify'
    },
    mainBody: {
        paddingBottom: 50
    }
});