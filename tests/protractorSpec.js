describe('angularjs homepage', function() {

  describe('Protractor Apollo Home Row', function() {
    it('should have a title', function() {
      browser.get('http://localhost:8080/#/');
      expect(browser.getTitle()).toEqual('Homerow Apollo');
    });

    it('should start a new game', function() {
        browser.get('http://localhost:8080/#/leaderboard');
        element(by.buttonText("playAgain( )")).click();
       expect(browser.getLocationAbsUrl()).toEqual("/");
      });
  });

  describe('Protractor Apollo game logic', function() {
    it('should have a title', function() {

      browser.get('http://localhost:8080/#/');
      browser.waitForAngular();
      browser.executeScript("var editor = $('.CodeMirror').CodeMirror;editor.setValue('\'Hello \' + \'world!\';');");

    });

  });





});

