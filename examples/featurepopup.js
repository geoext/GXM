/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** api: example[featurepopup]
 *  FeatureList and FeaturePopop interaction
 *  ----------------
 *  This example shows the use of the GXM.FeatureList-class in combination
 *  with the GXM.FeaturePopup-class to generate a small popup when tapping
 *  on a list entry.
 */

Ext.require([
    'GXM.FeatureList',
    'GXM.FeaturePopup'
]);

Ext.setup({
    onReady : function() {
        // Create a random string (used for the description of a random feature)
        var getRandomStr = function(max) {
            var randomStr = "",
                capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                capitalsLen = capitals.length,
                consonants = "bcdfghjklmnpqrstvwxyz",
                consonantsLen = consonants.length,
                vowels = "aeiouy",
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
        
        // Create the GXM.FeatureList that also contains a listener dealing with
        // tap events on a specific feature in the list triggering a GXM.FeaturePopup.
        var featureList = {
            xtype : 'gxm_featurelist',
            layer : layerVector,
            title : 'FeatureList',
            listeners : {
                itemtap : function(list, idx, target, record, e, eOpts) {
                    var feature = record.getFeature();
                    
                    var popup = {
                        xtype: 'gxm_featurepopup',
                        feature : feature,
                        tpl : Ext.create('Ext.XTemplate', '<p class="key-popup-info">You clicked the feature: </p>', '<p class="value-popup-info">{feature.attributes.r1} {feature.attributes.r2}</p>', '<p class="key-popup-info">At the position: </p>', '<p class="value-popup-info">', '    <ul><li>x = {[values.feature.geometry.x.toFixed(3)]}', '        <li>y = {[values.feature.geometry.y.toFixed(3)]} </ul>', '</p>', '<p class="key-popup-info">Which is in WGS84: </p>', '<p class="value-popup-info">', '    <ul><li>lon = {[values.feature.data.x.toFixed(3)]}', '        <li>lat = {[values.feature.data.y.toFixed(3)]} </ul>', '</p>')
                    };
                    
                    Ext.Viewport.add(popup);
                }
            }
        };
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('featurepopup');
        
        // Create the viewport
        var viewport = Ext.create('Ext.TabPanel', {
            fullscreen : true,
            items : [
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
    }
});
