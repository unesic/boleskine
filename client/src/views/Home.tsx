/**
 * Base
 */
import { memo, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

/**
 * Static assets
 */
import { hero_graphic_dark, hero_graphic_light } from "assets/images";
import {
	apollo,
	express,
	formik,
	render,
	mongodb,
	passport,
	react,
	redux,
	router,
	tailwind,
	typescript,
	graphql,
	Github,
	Globe,
	LinkedIn,
	Mail,
} from "assets/icons";
import { useTranslation } from "lib/hooks/useTranslation";

interface HomeProps {}

export const Home: React.FC<HomeProps> = memo(() => {
	const _t = useTranslation("homepage");

	const stack = useMemo(
		() => [
			{ icon: react, label: "React" },
			{ icon: typescript, label: "TypeScript" },
			{ icon: redux, label: "Redux" },
			{ icon: router, label: "Router" },
			{ icon: formik, label: "Formik" },
			{ icon: tailwind, label: "TailwindCSS" },
			{ icon: express, label: "Express" },
			{ icon: apollo, label: "Apollo" },
			{ icon: passport, label: "Passport" },
			{ icon: graphql, label: "GraphQL" },
			{ icon: mongodb, label: "Mongodb" },
			{ icon: render, label: "Render" },
		],
		[]
	);

	const links = useMemo(
		() => [
			{ icon: <Globe />, label: "unesic.dev", url: "https://unesic.dev" },
			{ icon: <Github />, label: "Github", url: "https://github.com/unesic/" },
			{
				icon: <LinkedIn />,
				label: "LinkedIn",
				url: "https://www.linkedin.com/in/unesic/",
			},
			{ icon: <Mail />, label: "Email", url: "mailto:info@unesic.dev" },
		],
		[]
	);

	const darkMode = useMemo(
		() => window.matchMedia("(prefers-color-scheme: dark)").matches,
		[]
	);

	useEffect(() => {
		if (darkMode) document.body.classList.add("dark");
		else document.body.classList.remove("dark");
	}, [darkMode]);

	return (
		<main className="Homepage">
			<header className="Homepage__Header">
				<div className="Homepage__Header__content">
					<h1 className="content-head">{_t.head}</h1>
					{_t.copy.map((t, idx) => (
						<p key={idx} className="content-copy">
							{t}
						</p>
					))}

					<div className="content-btns">
						<Link to="/app" className="Button Button--primary">
							{_t.buttons.app}
						</Link>
						<a
							target="_blank"
							href="https://github.com/unesic/boleskine"
							rel="noreferrer nofollow"
							className="Button Button--github"
						>
							<Github /> {_t.buttons.github}
						</a>
					</div>

					<h2 className="content-subhead">{_t.subhead}</h2>
					<ul className="tech-items">
						{stack.map(({ icon, label }, idx) => (
							<li key={idx} className="tech-items__item">
								<img src={icon} alt={label} className="tech-icon" />{" "}
								<span className="tech-label">{label}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="Homepage__Header__graphic">
					<img
						src={darkMode ? hero_graphic_dark : hero_graphic_light}
						alt="Boleskine hero graphic"
						className="hero-graphic"
					/>
				</div>
			</header>

			<footer className="Homepage__Footer">
				<ul className="footer-links">
					{links.map(({ icon, url, label }, idx) => (
						<li key={idx} className="footer-links__item">
							<a href={url} className="footer-link">
								{icon}
								<span aria-hidden="true" className="footer-link__label">
									{label}
								</span>
							</a>
						</li>
					))}
				</ul>
			</footer>
		</main>
	);
});
