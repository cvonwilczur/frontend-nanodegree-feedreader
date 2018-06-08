/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests.
 */

/* We're placing all of our tests within the $() function, since some of these tests may require DOM elements. We want to ensure they don't run until the DOM is ready. */
$(function() {
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

    it('have URLs', function() {
      for (let i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe(0);
      }
    });

    /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

    it('have names', function() {
      for (let i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe(0);
      }
    });
  });

  describe('The menu', function() {
    /* This test ensures the menu element is
         * hidden by default. */

    it('starts hidden', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    /* This test ensures the menu changes
          * visibility when the menu icon is clicked.
          */

    it('displays the menu when clicked and hides the menu when clicked again', function() {
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(false);
      $('.menu-icon-link').click();
      expect($('body').hasClass('menu-hidden')).toBe(true);
    })
  });

  describe('Initial Entries', function() {
    /* Thist test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */

    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      })
    });

    it('loads at least a single .entry element within the .feed container', function() {
      expect($('.entry .feed')).toBeDefined();
    });

  });

  describe('New Feed Selection', function() {
    /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes. The beforeEach has a nested loadFeed
         meaning that it will save the url content of the first loadfeed and wait for the second loadfeed
         to refresh before proceeding with the test.
         */
    beforeEach(function(done) {
      loadFeed(0, function() {
        firstContent = $('.entry-link')[0].href;
        loadFeed(1, function() {
          secondContent = $('.entry-link')[0].href;
          done();
        });
      });
    });

    it('has content that actually changes when loadFeed runs', function() {
      expect(firstContent).not.toBe(secondContent);
    });
  });

}());
