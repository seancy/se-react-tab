import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        //debug: true,
        //lng:'zh_CN',

        /*interpolation: {
          escapeValue: false, // not needed for react as it escapes by default
        },*/
        // we init with resources
        resources: {
            en: {
                translation: {
                    "key": "hello world",
                    "test0": "test0",
                    "Page":"Page",
                    "of":"of"
                }
            },
            zh_CN: {
                translation:{
                    "key":"你好 世界",
                    "test0": "测试0",
                    "Page": "第",
                    "of": "页,共"
                }

            }
        },


        // have a common namespace used around the full app
        //ns: ["translations"],
        //defaultNS: "translations",

        //keySeparator: false, // we use content as keys


    });

export default i18n;
