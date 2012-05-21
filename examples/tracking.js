/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: example[buttons]
 *  Use geolocation
 *  ----------------
 *  This example shows the use of GXM.plugin.Tracking
 */

Ext.application({
    launch : function() {

       var trackingButton = Ext.create('Ext.Button', {
            iconMask: true,
            iconCls: 'locate'
        });

        var layer = new OpenLayers.Layer.OSM( "Simple OSM Map");

        // Create the map object
        var map = new OpenLayers.Map({
            projection : 'EPSG:900913',
            units : 'm',
            controls : [
                new OpenLayers.Control.TouchNavigation(),
                new OpenLayers.Control.Attribution()
            ],
            layers : [layer]
        });
        
        // Create the map panel using the map configuration from above (see OpenLayers.Map constructor)
        var mapdemo = Ext.create('GXM.Map', {
            map : map,
            title : 'MapPanel',
            mapCenter : [1154447,6665743],
            mapZoom : 6,
            plugins : [
                new GXM.plugin.Tracker({
                    trackSuspended: false, 
                    allowHighAccuracy: false
                })
            ]
        });

        var toolbar = Ext.create('Ext.Toolbar', {
            docked: 'top',
            ui: 'light',
            defaults: {
                iconMask: true
            },
            items: [trackingButton]
        });
        
        // Create the viewport
        var viewport = Ext.create('Ext.Panel', {
            fullscreen : true,
            layout : 'fit',
            ui : 'dark',
            items : [
                mapdemo,
                toolbar
            ] // end items of viewport
        }); // end viewport
    }
});
