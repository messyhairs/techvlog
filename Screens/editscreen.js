import React, { Component, useState } from 'react';
import { View, Platform, Text, AlertIOS, ToastAndroid, SafeAreaView, StyleSheet, ScrollView, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { getbannerdata } from './viewyourstory'
import Textarea from 'react-native-textarea';
import { cos } from 'react-native-reanimated';

export default class EditScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            title: '',
            storypara: '',
            getcurrentstory: []
        }
    }
    getcurrentstories = async () => {
        try {
            let stories = await AsyncStorage.getItem('currentstory');
            const story = JSON.parse(stories);
            // console.log(story.title);
            this.setState({ data: story });
            let users = await AsyncStorage.getItem('userdatas');
            const userdatas = JSON.parse(users);
            console.log(userdatas);
            this.setState({ data: userdatas });
            const gettoken = this.state.data.token;
            // const getuserid = this.state.data.userid;
            const stories_id = story.stories_id;
            const localurl = 'http://192.168.1.16:8000/api/edit/';
            // const localurl = 'http://localhost:8000/api/edit/';
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + gettoken,
                    'Accept': 'application/json',
                },

            };
            Axios.get(localurl + stories_id, config)
                .then(response => {
                    console.log(response.data.title);
                    this.setState({ getcurrentstory: response.data });
                    console.log(this.state.getcurrentstory.title, '*********')
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
        this.getcurrentstories();
    }

    updatestories = async () => {
        try {
            let stories = await AsyncStorage.getItem('currentstory');
            const story = JSON.parse(stories);
            // console.log(story);
            const stories_id = story.stories_id;
            // userIsYoungerThan18 ? "Minor" : "Adult";
            // const { storypara } = this.state.storypara
            // const { title } = this.state.title;
            const username = story.username;
            const useremail = story.useremail
            // const url = 'http://localhost:8000/api/update/'
            const url = 'http://192.168.1.16:8000/api/update/'
            fetch(url + stories_id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + gettoken
                },
                body: JSON.stringify({
                    username: story.username,
                    useremail: story.useremail,
                    // password: password,
                    title: this.state.title,
                    storypara: this.state.storypara,
                })
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    // alert(responseJson.messgae)
                    if (responseJson.messgae === 'update') {
                        AsyncStorage.removeItem('currentstory');
                        if (Platform.OS === 'android') {
                            ToastAndroid.show("your story updated succesfully!", ToastAndroid.SHORT);
                        }
                        if (Platform.OS === 'ios') {
                            AlertIOS.alert('your story updated succesfully');
                            // ToastAndroid.show("your story updated succesfully!", ToastAndroid.SHORT);
                        }
                        setTimeout(() => {
                            // window.location.reload('homeScreenStack')
                            // <SplashScreen />
                            this.props.navigation.navigate('SplashScreen')
                        }, 500);
                        // this.props.navigation.navigate(
                        //     'viewstoryScreenStack',
                        //     // { story: stories },
                        // );
                    }
                    // window.NavigationPreloadManager();
                })

        } catch (e) {
            // error reading value
            console.log(e);
        }
    }
    deletestories = async () => {
        try {
            let stories = await AsyncStorage.getItem('currentstory');
            const story = JSON.parse(stories);
            // console.log(story);
            const stories_id = story.stories_id;
            const username = story.username;
            const useremail = story.useremail
            // const url = 'http://localhost:8000/api/delete/'
            const url = 'http://192.168.1.16:8000/api/delete/'
            fetch(url + stories_id, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer ' + gettoken
                },
                body: JSON.stringify({
                    username: story.username,
                    useremail: story.useremail,
                    // password: password,
                    title: this.state.title,
                    storypara: this.state.storypara,
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(responseJson.messgae, ToastAndroid.SHORT);
                    }
                    if (Platform.OS === 'ios') {
                        AlertIOS.alert(responseJson.messgae);
                        // ToastAndroid.show("your story updated succesfully!", ToastAndroid.SHORT);
                    }
                    setTimeout(() => {
                        // window.location.reload('homeScreenStack')
                        // <SplashScreen />
                        this.props.navigation.navigate('SplashScreen')
                    }, 500);
                    // setTimeout(() => {
                    //     window.location.reload('homeScreenStack')
                    // }, 2000);
                    // alert(responseJson.messgae)
                    // window.NavigationPreloadManager();
                })

        } catch (e) {
            // error reading value
            console.log(e);
        }
    }
    onChangeText() {
        console.log(e);
    }

    render() {
        // getbannerdata().then(res => {
        //     console.log(res);
        // })
        if (this.state.title) {
            this.state.title = this.state.title;
            console.log(this.state.title)
        } else {
            this.state.title = this.state.getcurrentstory.title;
            console.log(this.state.title)
        }
        if (this.state.storypara) {
            this.state.storypara = this.state.storypara;
            console.log(this.state.storypara)
        } else {
            this.state.storypara = this.state.getcurrentstory.storypara;
            console.log(this.state.storypara)
        }
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.mainBody}>
                        <View>
                            <Text style={styles.storytitle}>Title</Text>
                            <TextInput style={styles.titleanswer}
                                defaultValue={this.state.getcurrentstory.title}
                                onChangeText={title => this.setState({ title })}
                            />
                        </View>
                        <View>
                            <Text style={styles.contenthead}>Content</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                defaultValue={this.state.getcurrentstory.storypara}
                                onChangeText={storypara => this.setState({ storypara })}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto' }}>
                                <View style={{ width: 120, height: 50 }}>
                                    <Button title="update" onPress={this.updatestories} />
                                    {/* <Text onPress={this.updatestories}>update</Text> */}
                                </View>
                                <View style={{ width: 120, height: 50, marginLeft: 20 }}>
                                    <Button title="Delete" onPress={this.deletestories} />
                                    {/* <Text onPress={this.deletestories}>delete</Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }

}

const styles = StyleSheet.create({
    storycontentbottomview: {
        paddingBottom: 50,
    },
    mainBody: {
        // paddingBottom: 50
        marginTop: 50
    },
    storytitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 15
    },
    titleanswer: {
        color: '#003666',
        textAlign: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#dadae8',
        paddingBottom: 3,
        paddingTop: 3,
        paddingLeft: 3,
        paddingRight: 3,
        width: '70%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    contenthead: {
        textAlign: 'center',
        fontWeight: 'bold',
        paddingBottom: 15
    },
    contentanswer: {
        color: '#136ad5',
        textAlign: 'justify',
        paddingLeft: 5,
        paddingRight: 5
    },
    textareaContainer: {
        // height: 300,
        marginTop: 20,
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    textarea: {
        // textAlignVertical: 'top',  // hack android
        // height: 200,
        fontSize: 14,
        color: '#333',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#dadae8',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 50
    },
});