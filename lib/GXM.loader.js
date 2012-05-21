/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

Ext.ns('GXM');

(function(){

    /**
     * Check to see if GXM.singleFile is true. It is true if the
     * GXM/SingleFile.js is included before this one, as it is
     * the case in single file builds.
     */
    var singleFile = (Ext.isObject(GXM) && GXM.singleFile);

    window.GXM = Ext.apply(GXM || {}, {version:'0.0.1'});
    
    /**
     * The relative path of this script.
     */
    var scriptName = singleFile ? "GXM.js" : "lib/GXM.loader.js";

    /**
     * Function returning the path of this script.
     */
    var getScriptLocation = function() {
        var scriptLocation = "";
        // If we load other scripts right before GXM using the same
        // mechanism to add script resources dynamically (e.g. OpenLayers), 
        // document.getElementsByTagName will not find the GXM script tag
        // in FF2. Using document.documentElement.getElementsByTagName instead
        // works around this issue.
        var scripts = document.documentElement.getElementsByTagName('script');
        for(var i=0, len=scripts.length; i<len; i++) {
            var src = scripts[i].getAttribute('src');
            if(src) {
                var index = src.lastIndexOf(scriptName); 
                // set path length for src up to a query string
                var pathLength = src.lastIndexOf('?');
                if(pathLength < 0) {
                    pathLength = src.length;
                }
                // is it found, at the end of the URL?
                if((index > -1) && (index + scriptName.length == pathLength)) {
                    scriptLocation = src.slice(0, pathLength - scriptName.length);
                    break;
                }
            }
        }
        return scriptLocation;
    };
    
    /**
     * If GXM.singleFile is false then the JavaScript files in the jsfiles
     * array are autoloaded.
     */
    if(!singleFile) {
        var jsfiles = [
            "util/Base.js",
            "widgets/Map.js",
            "widgets/Button.js",
            "data/models/Layer.js",
            "data/LayerStore.js",
            "widgets/LayerList.js",
            "data/models/Feature.js",
            "data/FeatureStore.js",
            "widgets/FeatureList.js",
            "widgets/FeaturePopup.js",
            "plugin/Tracker.js"
        ];

        var len = jsfiles.length;
        var allScriptTags = [];
        var host = getScriptLocation() + "lib/GXM/";    
        
        Ext.each(jsfiles, function(jsfile) {
            allScriptTags.push(
                "<script type='text/javascript' src='" 
                + host + jsfile 
                +"'></script>" );
        });
        
        document.write(allScriptTags.join(""));
    }    
    
})();
