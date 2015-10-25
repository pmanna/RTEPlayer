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

var Presenter = {
	 makeDocument: function(resource, videoFeed) {
		if (!Presenter.parser) {
			Presenter.parser = new DOMParser();
		}

		this.videoLocation = videoFeed;

		var doc = Presenter.parser.parseFromString(resource, "application/xml");

		return doc;
	},
	
	modalDialogPresenter: function(xml) {
		navigationDocument.presentModal(xml);
	},
 
	pushDocument: function(xml) {
		navigationDocument.pushDocument(xml);
	},
	
	load: function(event) {
		var self = this,
			ele = event.target,
			showId = ele.getAttribute("showid");

		if (showId) {
			var xmlhttp = new XMLHttpRequest();

			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var resultObj = JSON.parse(xmlhttp.responseText);
					var videoMetaData = resultObj.shows[0]['media:group'][0]

					var player = new Player();
					var playlist = new Playlist();
					var mediaItem = new MediaItem("video", videoMetaData['rte:server'] + videoMetaData.url);
			 
					player.playlist = playlist;
					player.playlist.push(mediaItem);
					player.present();
				}
			}

			xmlhttp.open("GET", this.videoLocation + showId, true);
			xmlhttp.send();
		}
	},
}
