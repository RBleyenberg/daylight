import { getNavbarTitle } from '../support/app.po';

describe('dare', () => {
  beforeEach(() => cy.visit('/'));

  it('should have the name of the app on the navbar', () => {
    // Function helper example, see `../support/app.po.ts` file
    getNavbarTitle().contains('dare');
  });
});
