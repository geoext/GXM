/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** api: example[layerlist]
 *  MapPanel and interacting LayerList
 *  ----------------
 *  This example shows the use of the GXM.LayerList-class to generate
 *  a list to manage and interact with the Layers of a GXM.MapPanel.
 */

Ext.require([
    'GXM.Map',
    'GXM.LayerList'
]);

Ext.setup({
    viewport : {
        autoMaximize : true
    },
    onReady : function() {
        OpenLayers.Layer.Vector.prototype.renderers = ["SVG2", "VML", "Canvas"];

        var projection4326 = new OpenLayers.Projection("EPSG:4326");
        var projection900913 = new OpenLayers.Projection("EPSG:900913");
        
        // Create a vector layer for drawing features
        var layerVector = new OpenLayers.Layer.Vector('Vector data');
        
        // Create and draw a number (253) of random features 
        var dx = 15;
        var dy = 15;
        var px, py;
        var feature, features = [];
        for(var x = -170; x <= 170; x += dx) {
            for(var y = -80; y <= 80; y += dy) {
                px = x + (2 * dx * (Math.random() - 0.5));
                py = y + (2 * dy * (Math.random() - 0.5));
                feature = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(px, py).transform(projection4326, projection900913), {
                    x : px,
                    y : py
                });
                features.push(feature);
            }
        }
        layerVector.addFeatures(features);
        
        // Create another layer but hide it from the 
        // layerlist by setting display in layer switcher false
        var hiddenLayer = new OpenLayers.Layer.Vector('I should not be in the list!', {
            displayInLayerSwitcher : false
        });
        
        // OpenLayers specific configurations
        // Create map object including all layer definitions (OpenStreetMap)
        var map = new OpenLayers.Map({
            theme : null,
            projection : projection900913,
            units : "m",
            numZoomLevels : 18,
            maxResolution : 156543.0339,
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
                }), new OpenLayers.Layer.OSM.CycleMap('OpenStreetMap CycleMap', {
                    sphericalMercator : true,
                    attribution : 'Data <a href="http://creativecommons.org/licenses/by-sa/2.0">CC-By-SA</a> from <a href="http://openstreetmap.org/">OpenStreetMap</a> &amp; <a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
                }), 
                layerVector,
                hiddenLayer
            ]
        });
        
        // Create the map panel using the map configuration from above (see OpenLayers.Map constructor)
        var mapPanel = Ext.create('GXM.Map', {
            map : map,
            title : 'MapPanel',
            mapCenter : [0,3000000],
            mapZoom : 2
        });
        
        // Create the GXM.LayerList
        var layerList = {
            xtype : 'gxm_layerlist',
            // call with mapPanel...
            map : mapPanel,
            title : 'LayerList',
            // ... or with layers and map
            //layers: mapPanel.layers,
            //map: map,
            listeners : {
                itemtap : function() {
                    Ext.Msg.alert('Application event "itemtap"', 'You can still register events as usual.');
                }
            }
        };
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('layerlist');
        var layerListBtn = {
                xtype: 'button',
                text: 'layerlist',
                handler: function(){
                    if (this.overlay && this.overlay instanceof Ext.Panel) {
                        this.overlay.destroy();
                    }
                    this.overlay = Ext.create('Ext.Panel', {
                        fullscreen: false,
                        draggable : false,
                        modal : true,
                        hideOnMaskTap: true,
                        height: ( Ext.os.deviceType === 'Desktop' || Ext.os.is.iPad 
                                  ? 150 
                                  : '25%' ),
                        width: ( Ext.os.deviceType === 'Desktop' || Ext.os.is.iPad 
                                 ? 300 
                                 : '80%' ),
                        centered : true,
                        layout: 'fit',
                        items: [
                            {
                                xtype : 'gxm_layerlist',
                                // call with mapPanel...
                                map : mapPanel,
                                title : 'LayerList'
                            }
                        ]
                    });
                    this.overlay.show();
                }
            };
        
        // Create the viewports
        var viewport = Ext.create('Ext.TabPanel', {
            fullscreen : true,
            items : [
                mapPanel, 
                layerList, 
                {
                    xtype : 'toolbar',
                    docked : 'bottom',
                    items : [
                        layerListBtn,
                        {xtype : 'spacer'},
                        btnSource
                    ]
                }
            ]
        });
        layerList = viewport.items.get(2);
    }
});
