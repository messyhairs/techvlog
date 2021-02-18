import React, { useState, createRef, useEffect, useRef } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Platform,
    Button
} from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import Loader from './loader';
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const RegisterScreen = (props) => {
    const [username, setusername] = useState('');
    const [useremail, setuseremail] = useState('');
    const [userage, setuserage] = useState('');
    const [useraddress, setuseraddress] = useState('');
    const [password, setpassword] = useState('');
    const [role, setrole] = useState('');
    const [contactnumber, setcontactnumber] = useState('');
    const [tagline, settagline] = useState('');
    const [noofex, setnoofex] = useState('');

    // const expotoken = useState('');
    // const [pushnotificationtoken, setpushnotificationtoken] = useState('');
    // const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');
    const [
        isRegistraionSuccess,
        setIsRegistraionSuccess
    ] = useState(false);

    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const addressInputRef = createRef();
    const passwordInputRef = createRef();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    useEffect(() => {
        registerForPushNotificationsAsync().then(token => {
            setExpoPushToken(token)
            console.log('********', token)
        }
        );

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener);
            Notifications.removeNotificationSubscription(responseListener);
        };
    }, []);
    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "You've got mail! 📬",
                body: 'TechVlog',
                data: { data: 'goes here' },
            },
            trigger: { seconds: 1 },
        });
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
            console.log(expoPushToken)
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }


    const handleSubmitButton = () => {
        // alert(expoPushToken)
        setErrortext('');
        if (!username) {
            alert('Please fill Name');
            return;
        }
        if (!useremail) {
            alert('Please fill Email');
            return;
        }
        if (!userage) {
            alert('Please fill Age');
            return;
        }
        if (!useraddress) {
            alert('Please fill Address');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        if (!role) {
            alert('Please fill role');
            return;
        }
        if (!tagline) {
            alert('Please fill tagline');
            return;
        }
        if (!noofex) {
            alert('Please fill noofex');
            return;
        }
        if (!contactnumber) {
            alert('Please fill contactnumber');
            return;
        }
        //Show Loader
        // setLoading(true);
        // const url = 'http://172.26.240.1:8000/api/createaccount';
        // const localurl = 'http://192.168.1.16:8000/api/createaccount';
        const localurl = 'https://tranquil-dusk-36378.herokuapp.com/api/createaccount'
        // const localurl = 'http://localhost:8000/api/createaccount';

        fetch(localurl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                useremail: useremail,
                password: password,
                userage: userage,
                useraddress: useraddress,
                role: role,
                noofex: noofex,
                contactnumber: contactnumber,
                tagline: tagline,
                expoPushToken: expoPushToken
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                // setLoading(false);
                console.log(responseJson);
                if (responseJson.message === 'success') {
                    setIsRegistraionSuccess(true);
                    Notifications.scheduleNotificationAsync({
                        content: {
                            // title: responseJson.message,
                            title: 'Hello' + ' ' + responseJson.result.username + ' ' + 'welcom to TechVlog',
                            body: 'TechVlog',
                            // data: { data: 'goes here' },
                            // data: 'Hello' + ' ' + responseJson.result.username + ' ' + 'welcom to TechVlog'
                        },
                        trigger: { seconds: 1 },
                    });
                    console.log(
                        'Registration Successful. Please Login to proceed'
                    );
                } else {
                    setErrortext(responseJson.msg);
                }
            })
            .catch((error) => {
                //Hide Loader
                // setLoading(false);
                console.error(error);
            });
    };
    if (isRegistraionSuccess) {
        // schedulePushNotification();
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#eeeeee',
                    justifyContent: 'center',
                }}>
                <Text style={styles.successTextStyle}>
                    Registration Successful
        </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.buttonTextStyle}>Login Now</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#eeeeee' }}>
            {/* <Loader loading={loading} /> */}
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                {/* <View style={{ alignItems: 'center' }}>
                    <Image
                        // source={require('../Image/aboutreact.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View> */}
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(username) => setusername(username)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Name"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(useremail) => setuseremail(useremail)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Email"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="email-address"
                            ref={emailInputRef}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userpassword) =>
                                setpassword(userpassword)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Password"
                            placeholderTextColor="#8b9cb5"
                            ref={passwordInputRef}
                            returnKeyType="next"
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(userage) => setuserage(userage)}
                            underlineColorAndroid="#f000"
                            placeholder="Enter Age"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="numeric"
                            ref={ageInputRef}
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(useraddress) =>
                                setuseraddress(useraddress)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="your city"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            ref={addressInputRef}
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(tagline) =>
                                settagline(tagline)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Tagline"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(noofex) =>
                                setnoofex(noofex)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="year of experience"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            keyboardType="numeric"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(role) =>
                                setrole(role)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="eg: Front end developer"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={(contactnumber) =>
                                setcontactnumber(contactnumber)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Mobile or phone number"
                            placeholderTextColor="#8b9cb5"
                            autoCapitalize="sentences"
                            returnKeyType="next"
                            keyboardType="numeric"
                            blurOnSubmit={false}
                        />
                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>REGISTER</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                {/* <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification && notification.request.content.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                </View>
                <Button
                    title="Press to schedule a notification"
                    onPress={async () => {
                        await schedulePushNotification();
                    }}
                /> */}
            </ScrollView>
        </View >
    );

}

export default RegisterScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    hiddenInput: {
        width: 0,
        height: 0,
    },
    buttonStyle: {
        backgroundColor: '#f6f6f5',
        borderWidth: 0,
        color: '#003580',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#003580',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#444444',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: '#0d0735',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});