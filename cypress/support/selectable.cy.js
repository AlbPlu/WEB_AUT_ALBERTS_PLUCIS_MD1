const SelectablePage = {
  url: 'https://demoqa.com/selectable',
  gridTab: '#demo-tab-grid',
  selectableItems: {
    one: '#row1 > li:nth-child(1)',
    two: '#row1 > li:nth-child(2)',
    three: '#row1 > li:nth-child(3)',
    four: '#row2 > li:nth-child(1)',
    five: '#row2 > li:nth-child(2)',
    six: '#row2 > li:nth-child(3)',
    seven: '#row3 > li:nth-child(1)',
    eight: '#row3 > li:nth-child(2)',
    nine: '#row3 > li:nth-child(3)',
  },
  getItemByText(text) {
    switch (text.toLowerCase()) {
      case 'one': return cy.get(this.selectableItems.one);
      case 'two': return cy.get(this.selectableItems.two);
      case 'three': return cy.get(this.selectableItems.three);
      case 'four': return cy.get(this.selectableItems.four);
      case 'five': return cy.get(this.selectableItems.five);
      case 'six': return cy.get(this.selectableItems.six);
      case 'seven': return cy.get(this.selectableItems.seven);
      case 'eight': return cy.get(this.selectableItems.eight);
      case 'nine': return cy.get(this.selectableItems.nine);
      default: throw new Error(`Item "${text}" not found in selectableItems`);
    }
  },
  itemIsHighlighted(text) {
    this.getItemByText(text).should('have.class', 'list-group-item active');
  },
  itemIsNotHighlighted(text) {
    this.getItemByText(text).should('not.have.class', 'list-group-item active');
  }
};


describe('Selectable Grid Functionality', () => {

  beforeEach(() => {
    // a. Open https://demoqa.com/selectable
    cy.visit(SelectablePage.url);
  });

  it('should allow selecting items in the grid and validate highlights', () => {
    // b. Click "Grid"
    cy.get(SelectablePage.gridTab).click();

    // c. Click - "Two", "Four", "Six", "Eight"
    SelectablePage.getItemByText('Two').click();
    SelectablePage.getItemByText('Four').click();
    SelectablePage.getItemByText('Six').click();
    SelectablePage.getItemByText('Eight').click();


    // d. Validate that "Two", "Four", "Six", "Eight" are highlighted
    SelectablePage.itemIsHighlighted('Two');
    SelectablePage.itemIsHighlighted('Four');
    SelectablePage.itemIsHighlighted('Six');
    SelectablePage.itemIsHighlighted('Eight');

    // e. Validate that "One", "Three", "Five", "Seven", "Nine" are not highlighted
    SelectablePage.itemIsNotHighlighted('One');
    SelectablePage.itemIsNotHighlighted('Three');
    SelectablePage.itemIsNotHighlighted('Five');
    SelectablePage.itemIsNotHighlighted('Seven');
    SelectablePage.itemIsNotHighlighted('Nine');
  });
});