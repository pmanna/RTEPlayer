
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

var resourceLoader;

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
		</document>`;

		var parser = new DOMParser();
		var alertDoc = parser.parseFromString(alertString, "application/xml");
		
		return alertDoc;
}

App.onLaunch = function(options) {
	var javascriptFiles = [
		`${options.BASEURL}js/ResourceLoader.js`, 
		`${options.BASEURL}js/Presenter.js`
	];

	// var globalConf  = `${options.CONFURL}applications/player/config/config-ios-1-8.js`;
	// var playerConf  = `${options.CONFURL}player/ie/features.js?platform=iphone`;

	var frontFeed   = `${options.FEEDURL}rteavgen/player/latestfront/?format=json&type=mobile-iptv&platform=ipad&cl=0`;
	var latestFeed  = `${options.FEEDURL}rteavgen/player/latest/?format=json&type=mobile-iptv&platform=ipad&cl=0`;
	var popularFeed = `${options.FEEDURL}rteavgen/player/chart/?format=json&type=mobile-iptv&platform=ipad&cl=0`;
	var videoFeed   = `${options.FEEDURL}rteavgen/player/playlist/?type=mobile-iptv&format=json&platform=ipad&showId=`;

	var feedIdx;
	var showLists = [];

	var fetchFeed	= function(idx, someShows) {
		showLists[idx]  = {title: someShows.feed_title, shows: someShows.shows};

		if (++feedIdx === 3) {
			resourceLoader.loadTemplate(`${options.BASEURL}templates/RTEPlayerTemplate.xml.js`, showLists, function(resource) {
				var doc = Presenter.makeDocument(resource, videoFeed);

				doc.addEventListener("select", Presenter.load.bind(Presenter));
				Presenter.pushDocument(doc);
			});
		}
	}

	if (!String.prototype.encodeHTML) {
	  String.prototype.encodeHTML = function () {
	    return this.replace(/&/g, '&amp;')
	               .replace(/</g, '&lt;')
	               .replace(/>/g, '&gt;')
	               .replace(/"/g, '&quot;')
	               .replace(/'/g, '&apos;');
	  };
	}
	
	evaluateScripts(javascriptFiles, function(success) {
		if (success) {

			feedIdx	= 0;

			resourceLoader = new ResourceLoader(options);

			resourceLoader.loadFeed(frontFeed, function(frontShows) {
				fetchFeed(0, frontShows);
			});
			resourceLoader.loadFeed(latestFeed, function(latestShows) {
				fetchFeed(1, latestShows);
			});
			resourceLoader.loadFeed(popularFeed, function(popularShows) {
				fetchFeed(2, popularShows);
			});
		} else {
			var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
			
			navigationDocument.presentModal(errorDoc);
		}
	});
}
