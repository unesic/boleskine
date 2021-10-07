/**
 * Base
 */
import { memo } from "react";

/**
 * Utilities
 */
import { useTranslation } from "lib/hooks/useTranslation";

/**
 * Icons
 */
import { FaFacebook, FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";
interface SocialButtonsProps {
	variant: "sign_in" | "sign_up";
}

export const SocialButtons: React.FC<SocialButtonsProps> = memo(
	({ variant }) => {
		const _si = useTranslation("sign_in");
		const _su = useTranslation("sign_up");
		const _t = variant === "sign_in" ? _si : _su;

		return (
			<div className="SocialButtons">
				<a
					href={`${process.env.REACT_APP_SERVER_URL}/oauth/github`}
					className="SocialButtons__button SocialButtons__button--github"
				>
					<FaGithub size={22} /> {_t.socials.gh}
				</a>
				<a
					href={`${process.env.REACT_APP_SERVER_URL}/oauth/google`}
					className="SocialButtons__button SocialButtons__button--google"
				>
					<FaGoogle size={22} /> {_t.socials.go}
				</a>
				<a
					href={`${process.env.REACT_APP_SERVER_URL}/oauth/facebook`}
					className="SocialButtons__button SocialButtons__button--facebook"
				>
					<FaFacebook size={22} /> {_t.socials.fb}
				</a>
				<a
					href={`${process.env.REACT_APP_SERVER_URL}/oauth/linkedin`}
					className="SocialButtons__button SocialButtons__button--linkedin"
				>
					<FaLinkedin size={22} /> {_t.socials.li}
				</a>
			</div>
		);
	}
);
