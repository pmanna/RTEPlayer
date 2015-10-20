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

function ResourceLoader(options) {
  this.BASEURL = options.BASEURL;
  this.IMAGEURL = options.IMAGEURL;
  this.STREAMURL = options.STREAMURL;
}
 
ResourceLoader.prototype.loadTemplate = function(resource, showList, callback) {
  var self = this;
  evaluateScripts([resource], function(success) {
    if(success) {
      var resource = Template.call(self, showList);
      
      callback.call(self, resource);
    } else {
      var title = "Resource Loader Error",
        description = `Error loading resource '${resource}'. \n\n Try again later.`,
        alert = createAlert(title, description);

      navigationDocument.presentModal(alert);
    }
  }); 
}

ResourceLoader.prototype.loadFeed = function(url, callback) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var resultObj = JSON.parse(xmlhttp.responseText);

        callback(resultObj);
    }
  }

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}