import { languages } from "assets/languages";
import type {
	LanguageT,
	HeaderT,
	SignInT,
	SignUpT,
	AppT,
	NotificationsT,
} from "assets/languages";
import { useSelector } from "react-redux";
import { selectLanguage } from "store/auth.slice";

export function useTranslation(section: "header"): HeaderT;
export function useTranslation(section: "sign_in"): SignInT;
export function useTranslation(section: "sign_up"): SignUpT;
export function useTranslation(section: "app"): AppT;
export function useTranslation(section: "language"): string;
export function useTranslation(section: "notifications"): NotificationsT;

export function useTranslation(section: any) {
	const language = useSelector(selectLanguage);
	return languages[language ?? "en"][section as keyof LanguageT];
}

export type { HeaderT, SignInT, SignUpT, AppT, NotificationsT, LanguageT };
