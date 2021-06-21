/**
 * Base
 */
import { useMemo } from "react";

/**
 * Icons
 */
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

interface SocialButtonsProps {
	variant: "signup" | "login";
}

export const SocialButtons: React.FC<SocialButtonsProps> = ({ variant }) => {
	const text = useMemo(() => (variant === "signup" ? "Sign up" : "Log in"), [
		variant,
	]);
	return (
		<div className="SocialButtons">
			<a
				href={`${process.env.REACT_APP_SERVER_URL}/oauth/github`}
				className="SocialButtons__button SocialButtons__button--github"
			>
				<FaGithub size={22} /> {text} with GitHub
			</a>
			<a
				href={`${process.env.REACT_APP_SERVER_URL}/oauth/google`}
				className="SocialButtons__button SocialButtons__button--google"
			>
				<FaGoogle size={22} /> {text} with Google
			</a>
			<a
				href={`${process.env.REACT_APP_SERVER_URL}/oauth/facebook`}
				className="SocialButtons__button SocialButtons__button--facebook"
			>
				<FaFacebook size={22} /> {text} with Facebook
			</a>
			<a
				href={`${process.env.REACT_APP_SERVER_URL}/oauth/linkedin`}
				className="SocialButtons__button SocialButtons__button--linkedin"
			>
				<FaLinkedin size={22} /> {text} with LinkedIn
			</a>
		</div>
	);
};
