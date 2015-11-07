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

var Template = function(showLists) {
	var result	= `<?xml version="1.0" encoding="UTF-8" ?>
	<document>
		<catalogTemplate>
			<banner>
				<title>RTÉ Player</title>
			</banner>
			<list>
				<header>
					<title>Channels</title>
				</header>`;

	for (ii = 0; ii < showLists.length; ii++) {
		var showList	= showLists[ii];
		var title			= showList.title.encodeHTML();

		result	+= `<section> 
				<listItemLockup> 
					<title>${title}</title>
					<decorationLabel>${showList.shows.length}</decorationLabel>
					<relatedContent> 
						<grid>
							<section>`;

		for (var jj = 0; jj < showList.shows.length; jj++) {
			var item			= showList.shows[jj];
			var itemTitle	= item.title.encodeHTML();
			var itemDesc	= item.description.encodeHTML();

			var itemDesc	= `<lockup showid="${item.showid}">
									<title>${itemTitle}</title>
									<img src="${this.IMAGEURL}${item.thumbnail}-320.jpg" width="320" height="180" />
									<description>${itemDesc}</description>
								</lockup>`;

			result	+= itemDesc;
		}

		result	+= `</section>
						</grid>
					</relatedContent>
				</listItemLockup>
			</section>`;
	}

	// Live feeds
	result	+= `<section> 
			<listItemLockup> 
				<title>Live</title>
				<decorationLabel>3</decorationLabel>
				<relatedContent> 
					<grid>
						<section>
							<lockup showurl="${this.LIVEURL}hls-live/_definst_/rte1/rte1-720.m3u8">
								<title>RTÉ ONE</title>
								<img src="${this.BASEURL}images/rteone.jpg" width="320" height="180" />
							</lockup>
							<lockup showurl="${this.LIVEURL}hls-live/_definst_/rte2/rte2-720.m3u8">
								<title>RTÉ 2</title>
								<img src="${this.BASEURL}images/rte2.jpg" width="320" height="180" />
							</lockup>
							<lockup showurl="${this.LIVEURL}hls-live/_definst_/newsnow/newsnow-576.m3u8">
								<title>RTÉ NewsNow</title>
								<img src="${this.BASEURL}images/rtenews.jpg" width="320" height="180" />
							</lockup>
						</section>
					</grid>
				</relatedContent>
			</listItemLockup>
		</section>`;
	
	result	+= `</list>
		</catalogTemplate>
	</document>`;

	return result;
}
