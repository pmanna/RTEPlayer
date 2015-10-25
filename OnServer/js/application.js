
/*
The MIT License (MIT)

Copyright (c) 2015 Paolo Manna

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

  App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`, 
    `${options.BASEURL}js/Presenter.js`
  ];

  var globalConf  = `${options.CONFURL}applications/player/config/config-ios-1-8.js`;
  var playerConf  = `${options.CONFURL}player/ie/features.js?platform=iphone`;

  var frontFeed   = `${options.FEEDURL}rteavgen/player/latestfront/?format=json&type=mobile-iptv&cl=0`;
  var latestFeed  = `${options.FEEDURL}rteavgen/player/latest/?format=json&type=mobile-iptv&cl=0`;
  var popularFeed = `${options.FEEDURL}rteavgen/player/chart/?format=json&type=mobile-iptv&cl=0`;
  var videoFeed   = `${options.FEEDURL}rteavgen/player/playlist/?type=mobile-iptv&format=json&showId=`;
  
  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      var showLists = [];

      resourceLoader = new ResourceLoader(options);

      resourceLoader.loadFeed(frontFeed, function(frontShows) {
        showLists[0]  = {title: frontShows.feed_title, shows: frontShows.shows};

        resourceLoader.loadFeed(latestFeed, function(latestShows) {
          showLists[1]  = {title: latestShows.feed_title, shows: latestShows.shows};

          resourceLoader.loadFeed(popularFeed, function(popularShows) {
            showLists[2]  = {title: popularShows.feed_title, shows: popularShows.shows};

            resourceLoader.loadTemplate(`${options.BASEURL}templates/RTEPlayerTemplate.xml.js`, showLists, function(resource) {
              var doc = Presenter.makeDocument(resource, videoFeed);

              doc.addEventListener("select", Presenter.load.bind(Presenter));
              Presenter.pushDocument(doc);
            });
          });
        });
      })
    } else {
      var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
      
      navigationDocument.presentModal(errorDoc);
    }
  });
}
 
var createAlert = function(title, description) {
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
          <button>
            <text>OK</text>
          </button>
      </alertTemplate>
    </document>`

    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}
