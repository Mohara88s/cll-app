import { useContext } from "react";
import { ContextI18n, i18n as _i18n } from "../i18n";

const useI18n = () => {
    const { setContext, default: i18n,} = useContext(ContextI18n);

    const setLanguage = (lang) => setContext(_i18n(lang));

    return { setLanguage, i18n };
}

export default useI18n;