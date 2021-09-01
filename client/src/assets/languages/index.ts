import en from "./en.json";
import sr from "./sr.json";

export type HeaderT = {};

export type SignInT = {
	card_title: string;
	socials: {
		gh: string;
		go: string;
		fb: string;
		li: string;
	};
	spacer: string;
	form: {
		title: string;
		email: string;
		pass: string;
		save: {
			caption: string;
			label: string;
		};
		btn: string;
	};
	no_acc: {
		copy: string;
		link: string;
	};
};

export type SignUpT = {
	card_title: string;
	socials: {
		gh: string;
		go: string;
		fb: string;
		li: string;
	};
	spacer: string;
	form: {
		title: string;
		email: string;
		pass: string;
		repass: string;
		btn: string;
	};
	has_acc: {
		copy: string;
		link: string;
	};
};

export type AppT = {
	calendar_title: string;
	total_inc: string;
	total_exp: string;
	new_entry: {
		title: string;
		desc: string;
		type: {
			placeholder: string;
			inc: string;
			exp: string;
			not: string;
		};
		amount: string;
		btn: string;
	};
	tracking: {
		card_title: string;
		edit_entry: string;
		remove_entry: string;
	};
	analytics: {
		display: {
			copy: string;
			options: {
				wow: string;
				mom: string;
				qoq: string;
			};
			prog: string;
		};
		week: string;
		label: {
			inc: string;
			exp: string;
		};
	};
	misc: {
		popup: {
			confirm: string;
			cancel: string;
		};
	};
};

export type LanguageT = {
	header: HeaderT;
	sign_in: SignInT;
	sign_up: SignUpT;
	app: AppT;
};

export const languages: { [language: string]: LanguageT } = {
	en: en,
	"sr-Latn-RS": sr,
};
