import en from "./en.json";
import sr from "./sr.json";
import type { LanguageT } from "lib/types/language.types";

export const languages: { [language: string]: LanguageT } = {
	en: en,
	"sr-Latn-RS": sr,
};

export type {
	AppT,
	HeaderT,
	InputErrorsT,
	LanguageT,
	NotificationsT,
	SignInT,
	SignUpT,
	ProfileUpdateT,
} from "lib/types/language.types";
