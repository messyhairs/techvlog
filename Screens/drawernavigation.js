import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './homescreen';
import SettingsScreen from './settingscreen';
import Storycreatescreen from './storycreate';
import CustomSidebarMenu from './sidebarmenu';
import NavigationDrawerHeader from './drawerheader';
import Viewstory from './viewyourstory';
// import EditScreen from './editscreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// const EditstoryScreenStack = ({ navigation }) => {
//     return (
//         <Stack.Navigator initialRouteName="EditScreen">
//             <Stack.Screen
//                 name="EditScreen"
//                 component={EditScreen}
//                 options={{
//                     title: 'EditScreen', //Set Header Title
//                     headerLeft: () => (
//                         <NavigationDrawerHeader navigationProps={navigation} />
//                     ),
//                     headerStyle: {
//                         backgroundColor: '#307ecc', //Set Header color
//                     },
//                     headerTintColor: '#fff', //Set Header text color
//                     headerTitleStyle: {
//                         fontWeight: 'bold', //Set Header text style
//                     },
//                 }}
//             />
//         </Stack.Navigator>
//     );
// };
const homeScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    title: 'All Blogs', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerHeader navigationProps={navigation} />
                    ),
                    headerStyle: {
                        backgroundColor: '#307ecc', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    // headerTitleStyle: {
                    //     fontWeight: 'bold', //Set Header text style
                    // },
                }}
            />
        </Stack.Navigator>
    );
};

const settingScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="SettingsScreen"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#307ecc', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'bold', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{
                    title: 'Settings', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

const storycreateScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="CreateStory"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#050f2c', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'normal', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="CreateStory"
                component={Storycreatescreen}
                options={{
                    title: 'create your blog', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};


const viewstoryScreenStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            initialRouteName="Viewstory"
            screenOptions={{
                headerLeft: () => (
                    <NavigationDrawerHeader navigationProps={navigation} />
                ),
                headerStyle: {
                    backgroundColor: '#050f2c', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                    fontWeight: 'normal', //Set Header text style
                },
            }}>
            <Stack.Screen
                name="Viewstory"
                component={Viewstory}
                options={{
                    title: 'Your blogs', //Set Header Title
                }}
            />
        </Stack.Navigator>
    );
};

const DrawerNavigatorRoutes = (props) => {
    return (
        <Drawer.Navigator
            drawerContentOptions={{
                activeTintColor: '#cee1f2',
                color: '#cee1f2',
                itemStyle: { marginVertical: 5, color: 'white' },
                labelStyle: {
                    color: '#d8d8d8',
                },
            }}
            screenOptions={{ headerShown: false }}
            drawerContent={CustomSidebarMenu}>
            <Drawer.Screen
                name="homeScreenStack"
                options={{ drawerLabel: 'All Blogs' }}
                component={homeScreenStack}
            />
            <Drawer.Screen
                name="settingScreenStack"
                options={{ drawerLabel: 'Setting Screen' }}
                component={settingScreenStack}
            />
            <Drawer.Screen
                name="CreateStory"
                options={{ drawerLabel: 'Create Blogs' }}
                component={storycreateScreenStack}
            />

            <Drawer.Screen
                name="viewstoryScreenStack"
                options={{ drawerLabel: 'Your Blogs' }}
                component={viewstoryScreenStack}
            />
            {/* <Drawer.Screen
                name="EditstoryScreenStack"
                options={{ drawerLabel: 'Edit Screen' }}
                component={EditstoryScreenStack}
            /> */}
        </Drawer.Navigator>
    );
};
const styles = StyleSheet.create({
    navwidth: {
        color: 'red'
    }
})
export default DrawerNavigatorRoutes;