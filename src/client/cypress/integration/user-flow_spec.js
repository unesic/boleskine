import { v4 as uuidv4 } from "uuid";

describe("Main user flow", () => {
	it("User authenticate, create, update and delete entry while making sure the values add up.", () => {
		cy.viewport("macbook-15");
		cy.visit("http://localhost:3000");

		// User authenticate using email and password.
		cy.findByRole("textbox", { name: /email/i }).type("johndoe@mail.com");
		cy.findByLabelText(/password/i).type("johndoe123");
		cy.findByRole("checkbox", { name: /remember me/i }).check();
		cy.findByRole("button", { name: /sign in/i }).click();

		let oldWeekIncome;
		const incAmount = "275";
		const description_1 = uuidv4();

		// Wait for UI to update and read the initial weekly total.
		cy.get('[data-testid="current-week-income"]').then(
			(amt) => (oldWeekIncome = amt.text())
		);

		// Create a new entry
		cy.findByRole("textbox", { name: /description/i }).type(description_1);
		cy.findByText(/type/i).click();
		cy.findByText(/^note/i).click();
		cy.findByRole("button", { name: /add entry/i }).click();

		// Hover over created entry and click on options.
		cy.findByText(description_1).scrollIntoView().trigger("mouseover");
		cy.get(`[data-testid="${description_1}-option"]`).click();
		expect(
			cy.findByRole("button", { name: /edit entry/i }).should("be.visible")
		);

		// Update created entry.
		cy.findByRole("button", { name: /edit entry/i }).click();
		expect(cy.findByRole("button", { name: /^update/i }).should("be.visible"));
		cy.findByText(/^note/i).click();
		cy.findByText(/^income/i).click();
		cy.findByRole("spinbutton", { name: /amount/i }).type(incAmount);
		cy.findByRole("button", { name: /update/i }).click();

		// Wait for the entry to appear and see if the values add up.
		cy.wait(500);
		cy.get('[data-testid="current-week-income"]').then((amount) => {
			const oldInc = parseFloat(oldWeekIncome.replace(/€|,/g, ""));
			const newInc = parseFloat(amount.text().replace(/€|,/g, ""));
			const currInc = oldInc + parseFloat(incAmount);
			oldWeekIncome = currInc;

			expect(currInc).to.be.equal(parseFloat(newInc));
		});

		// Create another entry.
		let oldWeekExpense;
		const expAmount = "300";
		const description_2 = uuidv4();

		// Wait for UI to update and read the initial weekly total.
		cy.get('[data-testid="current-week-expense"]').then(
			(amt) => (oldWeekExpense = amt.text())
		);

		cy.findByRole("textbox", { name: /description/i }).type(description_2);
		cy.findByText(/type/i).click();
		cy.findByText(/^expense/i).click();
		cy.findByRole("spinbutton", { name: /amount/i }).type(expAmount);
		cy.findByRole("button", { name: /add entry/i }).click();

		// Wait for the entry to appear and see if the values add up.
		cy.wait(500);
		cy.get('[data-testid="current-week-expense"]').then((amount) => {
			const oldExp = parseFloat(oldWeekExpense.replace(/€|,/g, ""));
			const newExp = parseFloat(amount.text().replace(/€|,/g, ""));
			const currExp = oldExp + parseFloat(expAmount);
			oldWeekExpense = currExp;

			expect(currExp).to.be.equal(newExp);
		});

		// Hover over created entry and click on options.
		cy.findByText(description_1).scrollIntoView().trigger("mouseover");
		cy.get(`[data-testid="${description_1}-option"]`).click();
		expect(
			cy.findByRole("button", { name: /remove entry/i }).should("be.visible")
		);

		// Remove created entry.
		cy.findByRole("button", { name: /remove entry/i }).click();
		expect(
			cy
				.findByRole("button", { name: /yes, delete it\./i })
				.should("be.visible")
		);
		cy.findByRole("button", { name: /yes, delete it\./i }).click();

		// Hover over created entry and click on options.
		cy.wait(1000);
		cy.findByText(description_2).scrollIntoView().trigger("mouseover");
		cy.get(`[data-testid="${description_2}-option"]`).click();
		expect(
			cy.findByRole("button", { name: /remove entry/i }).should("be.visible")
		);

		// Remove created entry.
		cy.findByRole("button", { name: /remove entry/i }).click();
		expect(
			cy
				.findByRole("button", { name: /yes, delete it\./i })
				.should("be.visible")
		);
		cy.findByRole("button", { name: /yes, delete it\./i }).click();

		// Check if the UI is updated properly.
		cy.wait(1000);
		cy.get('[data-testid="current-week-income"]').then((amount) => {
			const newInc = parseFloat(amount.text().replace(/€|,/g, ""));
			const currInc = oldWeekIncome - parseFloat(incAmount);
			oldWeekIncome = currInc;

			expect(currInc).to.be.equal(newInc);
		});
		cy.get('[data-testid="current-week-expense"]').then((amount) => {
			const newExp = parseFloat(amount.text().replace(/€|,/g, ""));
			const currExp = oldWeekExpense - parseFloat(expAmount);
			oldWeekExpense = currExp;

			expect(currExp).to.be.equal(newExp);
		});
	});
});
