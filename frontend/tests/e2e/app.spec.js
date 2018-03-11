var chai = require('chai');

describe('webdriver.io page', function() {
  it('should have the right title - the fancy generator way', function () {
    browser.url('http://localhost:3000');
    browser.setValue('input#username', 'test');
    browser.setValue('input#password', 'password');
    browser.click('button[type="submit"]');
    const text = browser.getText('h1#todo-title');
    chai.expect(text).to.equal('To-Do List');
  });
});