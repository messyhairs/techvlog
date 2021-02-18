import React, { Component, useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Loader from './loader';
import { SocialIcon } from 'react-native-elements'

export default class Userprofiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            fletter: ''
        }
    }
    componentDidMount() {
        this.getprofiles();
    }
    Capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    getprofiles = async () => {
        try {
            let userid = await AsyncStorage.getItem('userprofiles');
            // const localurl = 'http://192.168.1.16:8000/api/profiledetails/';
            const localurl = 'https://tranquil-dusk-36378.herokuapp.com/api/profiledetails/'
            const config = {
                headers: {
                    'Accept': 'application/json',
                },

            };
            Axios.get(localurl + userid, config)
                .then(response => {
                    console.log(response.data.profile)
                    const users = response.data.profile
                    this.setState({ profiles: users });
                    this.setState({ fletter: this.state.profiles.username.charAt(0).toUpperCase() })
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                    <View style={styles.mainBody}>
                        {/* <View>
                                <Text>{this.state.fletter}</Text>
                                <View>
                                <Text>{this.state.profiles.useremail}</Text>
                                </View>
                            </View> */}
                        <View style={styles.profileHeader}>
                            <View style={styles.profileHeaderPicCircle}>
                                <Text style={{ fontSize: 25, color: '#307ecc' }}>
                                    {this.state.fletter}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.profileHeaderText}>
                                {this.state.profiles.username}
                            </Text>
                        </View>

                        {/* <View style={{ flex: 1, flexDirection: 'row', marginRight: 'auto', marginLeft: 'auto', marginTop: 50 }}>
                            <View style={{ width: 120, height: 50 }}>
                                <SocialIcon
                                    type='google'
                                />
                            </View>
                            <View style={{ width: 120, height: 50 }}>
                                <SocialIcon
                                    type='google'
                                />
                            </View>
                        </View> */}
                        <View>
                            <Text style={styles.tagline}>{this.state.profiles.tagline}</Text>
                        </View>
                        <View style={styles.profilecontent}>
                            <Text style={styles.summary}>Hello Folks! I'm <Text>{this.state.profiles.username}</Text> working as a <Text>{this.state.profiles.role}</Text> and I'm having <Text>{this.state.profiles.noofex}</Text> <Text>years of experience</Text></Text>
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
        textAlign: 'justify'
    },
    mainBody: {
        paddingBottom: 50
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    underline: { textDecorationLine: 'underline' },

    profileHeader: {
        flexDirection: 'row',
        // backgroundColor: '#307ecc',
        padding: 15,
        textAlign: 'center',
    },
    profileHeaderPicCircle: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        color: 'white',
        backgroundColor: '#ffffff',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    profileHeaderText: {
        color: '#00205b',
        // alignSelf: 'center',
        textAlign: 'center',
        // paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
    },
    profilecontent: {
        paddingTop: 20,
        width: '90%',
        marginLeft:'auto',
        marginRight: 'auto'
    },
    tagline: {
        textAlign: 'center',
        paddingTop: 10
    },
    summary: {
        textAlign: 'justify',
    }
});