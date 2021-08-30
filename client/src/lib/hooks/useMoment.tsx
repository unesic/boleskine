import moment from "moment";
import "moment/locale/sr";
import "moment/locale/en-in";
import { useSelector } from "react-redux";
import { selectLanguage } from "store/auth.slice";

export const useMoment = () => {
	const language = useSelector(selectLanguage);
	return (...args: any) => moment(...args).locale(language);
};
