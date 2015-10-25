#Purpose

This project is an experiment to understand how a tvOS app would work.

It's loosely based over [this Ray Wenderlich tutorial](http://www.raywenderlich.com/114886/beginning-tvos-development-with-tvml-tutorial), but I wanted to try it on a _real_ feed, so I've turned to the [Ireland's RTÉ](http://www.rte.ie) feeds, as used by their mobile app.

---

#Usage

The app in itself is very simple, as it uses [TVML](https://developer.apple.com/library/prerelease/tvos/documentation/LanguagesUtilities/Conceptual/ATV_Template_Guide/), so all the logic and the templates are on external JavaScript files (the _OnServer_ folder) that will be made available from a HTTP server. The article linked above explains this in detail.

The app just keeps links to the server itself and a few endpoints for the content.

---

#Disclaimer

The processing of the feed is solely based on my understanding of how it's supposed to work, I've had no access to official documentation, so it may or may not work by the time you'll try the code.

I haven't tried to connect from outside Ireland, so it may also be the case that the content is not available to you for copyright reasons.

---

##TODO

 - I don't know the kind of support the TVJS framework has for Promises (a.k.a Futures), so the progressive loading of the feeds is a bit ugly right now
 - The feeds are also not refreshed automatically: it may be good to add that as well
  