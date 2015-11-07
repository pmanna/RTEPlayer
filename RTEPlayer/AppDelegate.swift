/*
  AppDelegate.swift
  RTEPlayer

  Created by Paolo on 18/10/2015.
  Copyright © 2015 Paolo Manna. All rights reserved.

    The MIT License (MIT)

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


import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {

    var window: UIWindow?
    var appController: TVApplicationController?
    
    // Substitute this with the actual server you're uploading the JS files to
//    static let TVBaseURL = "http://www.paolomanna.com/public/rteplayer/"
    static let TVBaseURL = "http://localhost:9001/"
    
    // These are configurations for RTE
    static let TVConfURL = "http://www.rte.ie/"
    static let TVFeedURL = "http://feeds.rasset.ie/"
    static let TVImageURL = "http://img.rasset.ie/"
    static let TVLiveURL = "http://cdn.rasset.ie/"
    static let TVBootURL = "\(AppDelegate.TVBaseURL)js/application.js"


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        
        let appControllerContext = TVApplicationControllerContext()
        
        guard let javaScriptURL = NSURL(string: AppDelegate.TVBootURL) else {
            fatalError("unable to create NSURL")
        }
        
        appControllerContext.javaScriptApplicationURL = javaScriptURL
        
        appControllerContext.launchOptions["BASEURL"] = AppDelegate.TVBaseURL
        appControllerContext.launchOptions["CONFURL"] = AppDelegate.TVConfURL
        appControllerContext.launchOptions["FEEDURL"] = AppDelegate.TVFeedURL
        appControllerContext.launchOptions["IMAGEURL"] = AppDelegate.TVImageURL
        appControllerContext.launchOptions["LIVEURL"] = AppDelegate.TVLiveURL
       
        appController = TVApplicationController(context: appControllerContext, window: window, delegate: self)
        
        return true
    }

    func applicationWillResignActive(application: UIApplication) {
        // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
        // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
    }

    func applicationDidEnterBackground(application: UIApplication) {
        // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
        // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
    }

    func applicationWillEnterForeground(application: UIApplication) {
        // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
    }

    func applicationDidBecomeActive(application: UIApplication) {
        // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
    }

    func applicationWillTerminate(application: UIApplication) {
        // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
    }


}

