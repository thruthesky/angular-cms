import { AngularCmsPage } from './app.po';

describe('angular-cms App', () => {
  let page: AngularCmsPage;

  beforeEach(() => {
    page = new AngularCmsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
