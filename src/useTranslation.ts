import { useEffect, useState } from 'react';
import { NativeModules, Platform } from 'react-native';
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

const deviceLanguage: string =
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

export const useTranslation = () => {
    const [locale, setLocale] = useState('ko');

    useEffect(() => {
        setLocale(deviceLanguage.substring(0, 2));
    }, []);

    return {
        locale,
        setLocale,
        t: (scope: Scope) => i18n.t(scope, { locale }),
    };
};
