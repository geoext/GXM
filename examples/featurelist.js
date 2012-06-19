/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** api: example[featurelist]
 *  MapPanel and interacting Featurelist
 *  ----------------
 *  This example shows the use of the GXM.FeatureList-class to manage and 
 *  interact with the features of a GXM.MapPanel.
 */

Ext.require([
    'GXM.Map',
    'GXM.FeatureList'
]);

Ext.setup({
    viewport : {
        autoMaximize : true
    },
    onReady : function() {
        // Create a random string (used for the description of a random feature)
        var getRandomStr = function(max) {
            var randomStr = "", 
                capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", 
                capitalsLen = capitals.length, 
                consonants = "bcdfghjklmnpqrstvwxyz", 
                consonantsLen = consonants.length, 
                vowels = "aeiou",
                vowelsLen = vowels.length, 
                i = 0, 
                max = max ? parseInt(max, 10) : 8;
            
            randomStr += capitals.charAt(Math.floor(Math.random() * capitalsLen));
            
            for(; i < (max - 1); i++) {
                if(i % 2 === 1) {
                    randomStr += consonants.charAt(Math.floor(Math.random() * consonantsLen));
                } else {
                    randomStr += vowels.charAt(Math.floor(Math.random() * vowelsLen));
                }
            }
            return randomStr;
        };

        OpenLayers.Layer.Vector.prototype.renderers = ["SVG2", "VML", "Canvas"];

        var projection4326 = new OpenLayers.Projection("EPSG:4326");
        var projection900913 = new OpenLayers.Projection("EPSG:900913");
        
        // Create a vector layer for drawing features
        var layerVector = new OpenLayers.Layer.Vector('Vector data', {
            displayInLayerSwitcher : false,
            styleMap : new OpenLayers.StyleMap({
                label : '${r1} ${r2}',
                strokeColor : '#ee7e00',
                strokeWidth : 3,
                strokeOpacity : 0.85,
                fillColor : '#eed000',
                fillOpacity : 0.8,
                pointRadius : 7,
                fontSize : "12px",
                fontFamily : "sans-serif",
                labelXOffset : "0",
                labelYOffset : "-10"
            })
        });
        
        // Create and draw a number (112) of random features 
        var dx = 20;
        var dy = 20;
        var px,
            py;
        var feature, 
            features = [];
        
        for(var x = -150; x <= 150; x += dx) {
            for(var y = -65; y <= 65; y += dy) {
                px = x + (2 * dx * (Math.random() - 0.5));
                py = y + (2 * dy * (Math.random() - 0.5));
                feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(px, py).transform(projection4326, projection900913), {
                    x : px,
                    y : py,
                    r1 : getRandomStr(5),
                    r2 : getRandomStr(7)
                });
                features.push(feature);
            }
        }
        layerVector.addFeatures(features);
        
        // Create the map object
        var map = new OpenLayers.Map({
            theme : null,
            projection : projection900913,
            units : 'm',
            numZoomLevels : 18,
            maxExtent : new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            controls : [
                new OpenLayers.Control.Attribution(), 
                new OpenLayers.Control.TouchNavigation({
                    dragPanOptions : {
                        interval : 100,
                        enableKinetic : true
                    }
                })
            ],
            layers : [
                new OpenLayers.Layer.OSM.Mapnik('OpenStreetMap Mapnik', {
                    sphericalMercator : true,
                    attribution : 'Data <a href="http://creativecommons.org/licenses/by-sa/2.0">CC-By-SA</a> from <a href="http://openstreetmap.org/">OpenStreetMap</a>'
                }), 
                layerVector]
        });
        
        // Create the GXM.Map using the map configuration from above (see OpenLayers.Map constructor)
        var mapPanel = Ext.create('GXM.Map', {
            map : map,
            title : 'MapPanel',
            mapCenter : [0,3000000],
            mapZoom : 2
        });
        
        // Create the GXM FeatureList that also contains a listener dealing with
        // tap events on a specific feature in the list triggering a map zoom to the feature.
        var featureList = {
            xtype: 'gxm_featurelist',
            layer : layerVector,
            title : 'FeatureList',
            listeners : {
                itemtap : function(list, idx, target, record, e, eOpts) {
                    var feature = record.getFeature(), 
                        geom = feature.geometry, 
                        center = new OpenLayers.LonLat(geom.x, geom.y), 
                        zoom = 5;
                    mapPanel.getMap().setCenter(center, zoom);
                    viewport.setActiveItem(mapPanel);
                }
            }
        };
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('featurelist');
        
        // Create the viewport
        viewport = Ext.create('Ext.TabPanel', {
            fullscreen : true,
            items : [
                mapPanel, 
                featureList, 
                {
                    xtype : 'toolbar',
                    docked : 'bottom',
                    items : [
                        {xtype : 'spacer'},
                        btnSource
                    ]
                }
            ]
        });
        
        list = viewport.getItems(0).items[2];
    }
});
