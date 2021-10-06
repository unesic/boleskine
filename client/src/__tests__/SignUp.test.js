import "@testing-library/jest-dom/extend-expect";
import userEvt from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import { render } from ".test-utils/test-utils";
import { SignUp } from "views/SignUp";

describe("View: Sign up", () => {
	it("'Sign up' button is initially disabled, but enabled after user input.", async () => {
		render(<SignUp />);

		expect(
			await screen.findByRole("button", { name: /sign up/i })
		).toBeDisabled();

		userEvt.type(await screen.findByLabelText(/email/i), "test@test.com");
		userEvt.type(await screen.findByLabelText(/^password/i), "password");
		userEvt.type(await screen.findByLabelText(/re-type password/i), "password");

		expect(
			await screen.findByRole("button", { name: /sign up/i })
		).toBeEnabled();
	});
});
