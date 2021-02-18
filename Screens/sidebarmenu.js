// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const getdata = async () => {
    try {
        let users = await AsyncStorage.getItem('userdatas');
        const userdatas = JSON.parse(users);
        // console.log(userdatas);
        // this.setState({ data: userdatas });
        const gettoken = userdatas.token;
        const getuserid = userdatas.userid;
        // console.log(gettoken);
        const localurl = 'https://tranquil-dusk-36378.herokuapp.com/api/getuserdetails/'
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': 'Bearer ' + gettoken,
                'Accept': 'application/json',
            },

        };
        Axios.get(localurl + getuserid, config)
            .then(response => {
                // this.setState({ profiles: response.data.profile });
                console.log(response.data.profile.username);
            })
            .catch(function (error) {
                console.log(error);
            })
    } catch (e) {
        // error reading value
        console.log(e);
    }
}
const CustomSidebarMenu = (props) => {
    // { getdata() }
    return (
        <View style={stylesSidebar.sideMenuContainer}>
            <View style={stylesSidebar.profileHeader}>
                <View style={stylesSidebar.profileHeaderPicCircle}>
                    <Text style={{ fontSize: 25, color: '#307ecc' }}>
                        {/* {response} */}
                        {'Tech Blogs'.charAt(0)}
                    </Text>
                </View>
                <Text style={stylesSidebar.profileHeaderText}>
                    Blogs
        </Text>
            </View>
            <View style={stylesSidebar.profileHeaderLine} />

            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem
                    label={({ color }) =>
                        <Text style={{ color: '#d8d8d8' }}>
                            Logout
            </Text>
                    }
                    onPress={() => {
                        props.navigation.toggleDrawer();
                        Alert.alert(
                            'Logout',
                            'Are you sure? You want to logout?',
                            [
                                {
                                    text: 'Cancel',
                                    onPress: () => {
                                        return null;
                                    },
                                },
                                {
                                    text: 'Confirm',
                                    onPress: () => {
                                        AsyncStorage.clear();
                                        props.navigation.replace('Auth');
                                    },
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
    sideMenuContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#307ecc',
        paddingTop: 40,
        color: 'white',
    },
    profileHeader: {
        flexDirection: 'row',
        backgroundColor: '#307ecc',
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
    },
    profileHeaderText: {
        color: 'white',
        alignSelf: 'center',
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    profileHeaderLine: {
        height: 1,
        marginHorizontal: 20,
        backgroundColor: '#e2e2e2',
        marginTop: 15,
    },
});