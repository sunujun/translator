import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

function Loading() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
                autoPlay
                style={{ width: 150 }}
                source={require('../assets/loading.json')} // https://lottiefiles.com/97111-loading-spinner-dots
            />
        </View>
    );
}

export default Loading;
