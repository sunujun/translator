import React from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/useCookie';
import { useTranslation } from './src/useTranslation';

function App(): JSX.Element {
    const { t, locale, setLocale } = useTranslation();
    const { cookieKey } = useCookie();

    if (locale === null) {
        return <></>;
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor="transparent" barStyle="dark-content" />
            <Text>{t(cookieKey)}</Text>
            <View style={styles.buttonsContainer}>
                <Button onPress={() => setLocale('ko')} isSelected={locale === 'ko'} text="KO" />
                <Button onPress={() => setLocale('en')} isSelected={locale === 'en'} text="EN" />
                <Button onPress={() => setLocale('ja')} isSelected={locale === 'ja'} text="JA" />
                <Button onPress={() => setLocale('zh')} isSelected={locale === 'zh'} text="ZH" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
});

export default App;
