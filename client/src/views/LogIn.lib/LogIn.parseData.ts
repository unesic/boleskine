import jwtDecode from "jwt-decode";

export function parseData(provider: string, accessToken: string) {
	const data = jwtDecode(accessToken);
	switch (provider) {
		case "google":
			return parseGoogleData(data);
		case "github":
			return parseGithubData(data);
		case "facebook":
			return parseFacebookData(data);
		case "linkedin":
			return parseLinkedinData(data);
	}
}

function parseGoogleData(data: any) {
	const { email, given_name, family_name, picture } = data;
	return {
		email: email,
		firstName: given_name,
		lastName: family_name,
		image: picture,
	};
}

function parseGithubData(data: any) {
	const { email, name, avatar_url } = data;
	return {
		email: email,
		firstName: name.split(" ")[0],
		lastName: name.splice(1).join(" "),
		image: avatar_url,
	};
}

function parseFacebookData(data: any) {
	const { email, first_name, last_name, picture } = data;
	return {
		email: email,
		firstName: first_name,
		lastName: last_name,
		image: picture.data.url,
	};
}

function parseLinkedinData(data: any) {
	const { emails, name, photos } = data;
	return {
		email: emails[0].value,
		firstName: name.givenName,
		lastName: name.familyName,
		image: photos[3].value,
	};
}
