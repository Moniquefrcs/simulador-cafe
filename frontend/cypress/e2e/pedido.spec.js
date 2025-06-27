
describe("Montagem de café", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("Deve montar café com leite e adicionais válidos", () => {
    cy.get("select").select("Café com Leite");
    cy.get("input[type=checkbox]").first().check(); // leite
    cy.contains("chocolate").parent().find("input").check();
    cy.contains("Fazer Pedido").click();
    cy.contains("Pedido recebido com sucesso!");
  });

  it("Deve impedir leite em café sem permissão", () => {
    cy.get("select").select("Café Tradicional");
    cy.get("input[type=checkbox]").first().should("be.disabled");
  });
});
