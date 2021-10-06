export type HeaderT = {
	user_copy: string;
	language: string;
	currency: string;
	mode: string;
	profile: string;
	sign_out: string;
};

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

type PopupT = {
	content?: string;
	title: string;
	confirm: string;
	cancel: string;
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
	popup: {
		default: PopupT;
		entry: {
			update: PopupT;
			delete: PopupT;
		};
		user: {
			update: PopupT;
		};
	};
};

type NotificationT = {
	title: string;
	text: string;
};

export type NotificationsT = {
	error: NotificationT;
	entry: {
		created: NotificationT;
		updated: NotificationT;
		deleted: NotificationT;
	};
	controls: {
		mode: NotificationT;
		lang: NotificationT;
		curr: NotificationT;
	};
	user: NotificationT;
};

export type InputErrorsT = {
	firstName: string;
	lastName: string;
	email: {
		default: string;
		required: string;
	};
	password: {
		required: string;
		min: string;
	};
	repassword: {
		required: string;
		matching: string;
	};
	description: {
		required: string;
		max: string;
	};
	type: string;
	amount: {
		required: string;
		positive: string;
	};
};

export type ProfileUpdateT = {
	firstName: {
		label: string;
	};
	lastName: {
		label: string;
	};
	image: {
		label: string;
		overlay: string;
		instruction: string;
		altText: string;
	};
};

export type LanguageT = {
	language: string;
	header: HeaderT;
	sign_in: SignInT;
	sign_up: SignUpT;
	app: AppT;
	notifications: NotificationsT;
	input_errors: InputErrorsT;
	profile_update: ProfileUpdateT;
};
