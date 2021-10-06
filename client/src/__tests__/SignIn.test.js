import "@testing-library/jest-dom/extend-expect";
import userEvt from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { render } from ".test-utils/test-utils";
import { SignIn } from "views/SignIn";

describe("View: Sign in", () => {
	it("'Sign in' button is initially disabled, but enabled after user input.", async () => {
		render(<SignIn />);

		expect(
			await screen.findByRole("button", { name: /sign in/i })
		).toBeDisabled();

		userEvt.type(await screen.findByLabelText(/email/i), "test@test.com");
		userEvt.type(await screen.findByLabelText(/password/i), "password");

		expect(
			await screen.findByRole("button", { name: /sign in/i })
		).toBeEnabled();
	});
});
