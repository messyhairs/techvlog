import React, { useState, createRef, Component } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Image,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './loader';

const LoginScreen = ({ navigation }) => {
    const [useremail, setuseremail] = useState('');
    const [password, setpassword] = useState('');
    // const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const passwordInputRef = createRef();

    const handleSubmitPress = () => {
        setErrortext('');
        if (!useremail) {
            alert('Please fill Email');
            return;
        }
        if (!password) {
            alert('Please fill Password');
            return;
        }
        // setLoading(true);
        // const url = 'http://172.26.240.1:8000/api/login';
        // const localurl = 'http://192.168.1.16:8000/api/login';
        const localurl = 'https://tranquil-dusk-36378.herokuapp.com/api/login'
        // const localurl = 'http://localhost:8000/api/login';

        // fetch('http://localhost:3000/api/user/login', {
        fetch(localurl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                useremail: useremail,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //Hide Loader
                // setLoading(false);
                console.log(responseJson);
                // If server response message same as Data Matched
                if (responseJson.message === 'success') {
                    AsyncStorage.setItem('user_id', responseJson.userid);
                    AsyncStorage.setItem('userdatas', JSON.stringify(responseJson))
                    // console.log(responseJson.data.email);
                    navigation.replace('DrawerNavigationRoutes');
                    // navigation.replace('DrawerNavigationRoutes', { datas: 'hello gokul' } )
                } else {
                    setErrortext(responseJson.message);
                    console.log(responseJson.message);
                }
            })
            .catch((error) => {
                //Hide Loader
                // setLoading(false);
                console.error(error);
            });
    };

    return (
        <View style={styles.mainBody}>
            {/* <Loader loading={loading} /> */}
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View>
                    <KeyboardAvoidingView enabled>
                        <View style={{ alignItems: 'center' }}>
                            <Image
                                // source={require('../Image/aboutreact.png')}
                                style={{
                                    width: '50%',
                                    height: 100,
                                    resizeMode: 'contain',
                                    margin: 30,
                                }}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(useremail) =>
                                    setuseremail(useremail)
                                }
                                placeholder="Enter Email" //dummy@abc.com
                                placeholderTextColor="#8b9cb5"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                returnKeyType="next"
                                onSubmitEditing={() =>
                                    passwordInputRef.current &&
                                    passwordInputRef.current.focus()
                                }
                                underlineColorAndroid="#f000"
                                blurOnSubmit={false}
                            />
                        </View>
                        <View style={styles.SectionStyle}>
                            <TextInput
                                style={styles.inputStyle}
                                onChangeText={(password) =>
                                    setpassword(password)
                                }
                                placeholder="Enter Password" //12345
                                placeholderTextColor="#8b9cb5"
                                keyboardType="default"
                                ref={passwordInputRef}
                                onSubmitEditing={Keyboard.dismiss}
                                blurOnSubmit={false}
                                secureTextEntry={true}
                                underlineColorAndroid="#f000"
                                returnKeyType="next"
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
                            onPress={handleSubmitPress}>
                            <Text style={styles.buttonTextStyle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Text
                            style={styles.registerTextStyle}
                            onPress={() => navigation.navigate('RegisterScreen')}>
                            New? Register here
            </Text>
                    </KeyboardAvoidingView>
                </View>
            </ScrollView>
        </View>
    );
};
export default LoginScreen;

export class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
    }

    render() {
        return (
            <View>
                <Text>tes app</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignContent: 'center',
    },
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#204056',
        borderWidth: 0,
        // color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 50,
        marginBottom: 25,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: '#00334e',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        // borderRadius: 30,
        borderColor: '#dadae8',
        marginTop: 20,
        paddingTop: 20,
        paddingBottom: 20,
        // outline: 'none'
    },
    registerTextStyle: {
        color: '#464646',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center',
        padding: 10,
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
});




