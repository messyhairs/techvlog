import React, { Component, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Loader from './loader';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            profiles: [],
            testdatas: '',
            userstory: [],
            activeSections: [],
            isLoading: false
        }
    }
    // closeActivityIndicator = () => setTimeout(() => this.setState({
    //     animating: false
    // }), 60000)

    componentDidMount() {
        // this.closeActivityIndicator()
        this.getdata();
    }
    showLoader = () => {
        this.setState({ isLoading: true });
    };
    profiledetails = (e, stories) => {
        this.props.navigation.navigate(
            'Profiles'
        );
        AsyncStorage.setItem('userprofiles', stories.creator)
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
            // const localurl = 'http://192.168.1.16:8000/api/getuserdetails/';
            const localurl = 'https://tranquil-dusk-36378.herokuapp.com/api/getuserdetails/'
            // const localurl = 'http://localhost:8000/api/getuserdetails/';
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
            // const localurl1 = 'http://192.168.1.16:8000/api/allstories';
            const localurl1 = 'https://tranquil-dusk-36378.herokuapp.com/api/allstories'
            // const localurl1 = 'http://localhost:8000/api/allstories';
            Axios.get(localurl1, config)
                .then(response => {
                    // this.setState({ profiles: response.data.profile });
                    console.log(response)
                    const getdatas = response.data.stories;
                    getdatas.forEach(datas => {
                        const obj = {
                            'username': datas.username, 'useremail': datas.useremail,
                            'title': datas.title, 'storycontent': datas.storypara, 'creator': datas.creatorid
                        };
                        this.setState({
                            userstory: [...this.state.userstory, obj]
                        });
                        console.log(this.state.userstory);
                        // this.setState({ userstory: datas });
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
    // updateState = () => this.setState({myState: 'The state is updated'})  


    render() {
        const animating = this.state.animating
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.mainBody}>
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
                                <View>
                                    {/* <Text>Posted by <TouchableOpacity
                                        style={styles.buttonStyle}
                                        activeOpacity={0.5} onPress={((e) => this.profiledetails(e, stories))}>
                                        <Text style={styles.buttonTextStyle}>
                                            {stories.username}
                                        </Text>
                                    </TouchableOpacity></Text> */}
                                    <Text style={styles.leftContainer}>posted by <Text style={styles.underline} onPress={((e) => this.profiledetails(e, stories))}>{stories.username}</Text></Text>
                                </View>
                            </Card>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    storycontentbottomview: {
        paddingBottom: 50,
        textAlign: 'justify'
    },
    mainBody: {
        paddingBottom: 50
    },
    buttonStyle: {
        backgroundColor: '#0c2340',
        borderWidth: 0,
        borderColor: '#7DE24E',
        width: 100,
        // height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 8,
        // marginRight: 35,
        // marginTop: 90,
        // marginBottom: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // backgroundColor: 'green'
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    buttonTextStyle: {
        color: '#fefefe',
        // paddingVertical: 10,
        fontSize: 16,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    underline: { textDecorationLine: 'underline' }

});