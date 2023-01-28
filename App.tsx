import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import Button from './src/Button';
import Loading from './src/Loading';
import { useCookie } from './src/useCookie';
import { useTranslation } from './src/useTranslation';

/**
 * 스플래시 스크린의 아이콘 출처: https://kor.pngtree.com/freepng/fresh-made-crispy-fortune-cookie_6323404.html
 * 스플래시 스크린 만들기 가이드: https://docs.expo.dev/guides/splash-screens/
 * 스플래시 스크린 피그마 템플릿: https://www.figma.com/community/file/1155362909441341285
 * 아이콘 및 이미지 생성: https://easyappicon.com/
 */

function App(): JSX.Element {
    const { t, locale, setLocale, format } = useTranslation();
    const { cookieKey } = useCookie();
    const [isLoaded, setIsLoaded] = useState(false);

    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const date = new Date().getDate();
    const todayText = format(t('today_is'), year, month, date);

    const locales = ['ko', 'en', 'ja', 'zh', 'es'];

    useEffect(() => {
        if (cookieKey !== '') {
            setIsLoaded(true);
        }
    }, [cookieKey]);

    useEffect(() => {
        if (locale !== null) {
            SplashScreen.hide();
        }
    }, [locale]);

    if (!isLoaded) {
        return <Loading />;
    }

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <LottieView
                    autoPlay={true}
                    source={require('./assets/background.json')}
                    resizeMode="cover"
                    style={{
                        position: 'absolute',
                        zIndex: -1,
                    }}
                />
                <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.topContainer}>
                        <Text style={styles.todayText}>{todayText}</Text>
                        <Text style={styles.cookieText}>{t(cookieKey)}</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={styles.buttonsContainer}>
                            {locales.map(item => (
                                <Button
                                    key={item}
                                    onPress={() => setLocale(item)}
                                    isSelected={locale === item}
                                    text={item.toUpperCase()}
                                />
                            ))}
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todayText: {
        position: 'absolute',
        top: 70,
        fontSize: 13,
        color: '#8b658f',
    },
    cookieText: {
        fontSize: 22,
        color: '#372538',
        textAlign: 'center',
        marginHorizontal: 30,
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 25,
    },
});

export default App;
