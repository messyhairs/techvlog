import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

const SettingsScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 16 }}>
               <Text> Settings will comes here</Text>
            </View>
        </SafeAreaView>
    );
};

export default SettingsScreen;