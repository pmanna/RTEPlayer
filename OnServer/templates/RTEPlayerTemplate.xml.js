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

var Template = function(showList) {
    var result    = `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <catalogTemplate>
      <banner>
        <title>RTÉ Player</title>
      </banner>
      <list> 
        <section> 
          <listItemLockup> 
            <title>RTÉ Latest</title>
            <decorationLabel>${showList.length}</decorationLabel>
            <relatedContent> 
              <grid>
                <section>`;

    for (var ii = 0; ii < showList.length; ii++) {
        var item         = showList[ii];
        var itemDesc    =  `<lockup showid="${item.showid}">
                                <title>${item.title}</title>
                                <img src="${this.IMAGEURL}${item.thumbnail}-320.jpg" width="320" height="180" />
                                <description>${item.description}</description>
                              </lockup>`
        result += itemDesc;
    }

    result += `</section>
              </grid>
            </relatedContent>
          </listItemLockup>
        </section>
      </list>
    </catalogTemplate>
  </document>`;

  return result;
}
