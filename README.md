[![Codacy Badge](https://api.codacy.com/project/badge/grade/b2d72331184b4830951c09d953a5c12a)](https://www.codacy.com/app/paolo/RTEPlayer)
#Purpose

This project is an experiment to understand how a tvOS app would work.

It's loosely based over [this Ray Wenderlich tutorial](http://www.raywenderlich.com/114886/beginning-tvos-development-with-tvml-tutorial), that in turn was based on Apple's own [TVML Catalog](https://developer.apple.com/library/prerelease/tvos/samplecode/TVMLCatalog/Introduction/Intro.html), but I wanted to try it on a _real_ feed, so I've turned to the [Ireland's RTÉ](http://www.rte.ie) feeds, as used by their mobile app on iOS.

---

#Usage

The app in itself is very simple, as it uses [TVML](https://developer.apple.com/library/prerelease/tvos/documentation/LanguagesUtilities/Conceptual/ATV_Template_Guide/), so all the logic and the templates are on external JavaScript files (the _OnServer_ folder) that will be made available from a HTTP server. The article linked above explains this in detail, and I'm usually hosting them on my own server.

The native part of the app just keeps links to the server itself and a few endpoints for the content.

---

#Disclaimer

The processing of the feed is solely based on my understanding of how it's supposed to work, I've had no access to official documentation, so it may or may not work by the time you'll try the code.

~~I haven't tried to connect from outside Ireland, so it may also be the case that the content is not available to you for copyright reasons~~.

I've tested the app outside Ireland (still in Europe, though), and it works.

---

##TODO

- Live feeds have been added, but they seem to be a bit unstable: without docs it's difficult to do more though
- Quality isn't that good: the feeds were supposed to be consumed on an iPhone, obviously, so it's expected that they look blocky on a Full HD screen
- The feeds are not refreshed automatically: it may be good to add that as well
  