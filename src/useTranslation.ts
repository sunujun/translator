import { useEffect, useState } from 'react';
import { NativeModules, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n, Scope } from 'i18n-js';
import ko from './language/ko.json';
import en from './language/en.json';
import ja from './language/ja.json';
import zh from './language/zh.json';

const i18n = new I18n({
    ko,
    en,
    ja,
    zh,
});

i18n.enableFallback = true;
i18n.defaultLocale = 'ko';
const deviceLanguage: string =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;
const LOCALE_KEY = 'locale';

export const useTranslation = () => {
    const [locale, _setLocale] = useState('');

    const setLocale = (localeValue: string) => {
        _setLocale(localeValue);
        AsyncStorage.setItem(LOCALE_KEY, localeValue);
    };

    const init = async () => {
        const fs = await AsyncStorage.getItem(LOCALE_KEY);
        if (fs !== null) {
            _setLocale(fs);
        } else {
            _setLocale(deviceLanguage.substring(0, 2));
        }
    };

    useEffect(() => {
        setTimeout(() => {
            init();
        }, 3000);
    }, []);

    return {
        locale,
        setLocale,
        t: (scope: Scope) => i18n.t(scope, { locale }),
    };
};
