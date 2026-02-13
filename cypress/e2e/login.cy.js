describe("User Login Test", () => {

  beforeEach(() => {
    cy.visit("/User-Login");   // React route
  });

  it("Login with valid credentials", () => {

    cy.fixture("user").then((user) => {

      // intercept BEFORE click
      cy.intercept("POST", "**/User-Login/**").as("loginApi");

      cy.get('input[name="email"]').type(user.email);
      cy.get('input[name="Password"]').type(user.password); 

      cy.get('button[type="submit"]').click();

      cy.wait("@loginApi")
        .its("response.statusCode")
        .should("eq", 200);

      cy.location("pathname").should("eq", "/");

      
      cy.get('[data-cy="menu-btn"]').click();
      cy.get('[data-cy="logout-btn"]').click();


    });
  });
});
