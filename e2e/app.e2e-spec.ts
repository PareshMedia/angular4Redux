import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';

describe('angular-poc App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should help to debug', function (done) {
    console.log('before debugger'); //gets displayed in console
    browser.debugger();
    console.log('after debugger'); //gets displayed in console as well, but shouldn't
    done();
  });
});
