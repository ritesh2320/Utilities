import en from './i18n/en';
import { I18n, type TranslateOptions } from 'i18n-js';
import { languageList } from './Constant';

let translations: { [key: string | number]: any } = {
    en: { ...en }
};

const i18n = new I18n(translations);

const defaultLanguage = 'en';

const translate = (scope: string, options?: TranslateOptions): string => {
    if (options) {
        return i18n.t(scope, options);
    }
    return i18n.t(scope);
};

const getSystemLanguage = () => {
    let systemLanguage = i18n.locale;
    if (systemLanguage.includes('en')) {
        systemLanguage = 'en';
    }
    //If we are supporting any other language by default then we will need to add those here
    return systemLanguage;
};

/*
 *method initialize or update app language
 * @param: language code
 * */
const setI18nConfig = async (
    lang: string = defaultLanguage,
    fileContents: any = {}
) => {
    return new Promise(async resolve => {
        translations = {
            ...translations,
            ...{ [lang]: { ...translations[lang], ...fileContents } }
        };
        // set i18n-js config
        i18n.enableFallback = true;
        i18n.defaultLocale = defaultLanguage;
        i18n.store(translations);
        i18n.locale = lang;
        resolve(true);
    });
};

/**
 * method to get current language code
 * @returns Language Code (e.g. - en | hi)
 */
const getCurrentLanguage = () => {
    let currentLanguage: string;
    if (i18n.locale && i18n.locale !== '') {
        currentLanguage = i18n.locale;
    } else {
        currentLanguage = getSystemLanguage();
    }
    return currentLanguage;
};

const translateWithLocale = (
    locale: string,
    callBack: () => void,
    currentLocale: string
) => {
    i18n.withLocale(locale, () => {
        callBack();
    });
    i18n.locale = currentLocale;
};

export {
    defaultLanguage,
    getCurrentLanguage,
    getSystemLanguage,
    languageList,
    setI18nConfig,
    translate,
    translateWithLocale
};

export * from './i18n/en';
