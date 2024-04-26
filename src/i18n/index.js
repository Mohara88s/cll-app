import React from 'react';

import * as i18nEn from './en.js';
import * as i18nUa from './ua.js';

const UA = 'ua';
const EN = 'en';

export const languages = ['en', 'ua']

export const i18n = (lang) => {
    switch (lang) {
        case EN:
            return i18nEn;

        case UA:
            return i18nUa;

        default:
            return i18nEn;
    }
}

export const ContextI18n = React.createContext(i18nEn)
