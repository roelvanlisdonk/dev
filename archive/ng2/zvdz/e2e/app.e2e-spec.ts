import { ZvdzPage } from './app.po';

describe('zvdz App', function() {
  let page: ZvdzPage;

  beforeEach(() => {
    page = new ZvdzPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
