/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** api: example[map]
 *  Map component
 *  ----------------
 *  This example shows the use of the GXM.Map-class to generate
 *  a component that renders an OpenLayers.Map in a way it is easily
 *  embedable into other Sench Touch components.
 */

Ext.require([
    'GXM.Map'
]);


Ext.setup({
    viewport : {
        autoMaximize : true
    },
    onReady : function() {
        // OpenLayers specific setup
        var map = new OpenLayers.Map({
            controls : [
                new OpenLayers.Control.TouchNavigation({
                    dragPanOptions : {
                        interval : 100,
                        enableKinetic : true
                    }
                }), 
                new OpenLayers.Control.Attribution(),
                new OpenLayers.Control.Navigation()
            ]
        });
                
        var layerOwsOsmTerrestris = new OpenLayers.Layer.WMS('terrestris', 'http://ows.terrestris.de/osm/service', {
            layers : 'OSM-WMS'
        }, {
            singleTile : false,
            attribution : '&copy; terrestris GmbH &amp; Co. KG<br>Data &copy; OpenStreetMap contributors, CC-BY-SA'
        });

        map.addLayers([layerOwsOsmTerrestris]);

        // Helper method to get a tab card by index
        var getCard = function(idx) {
            var card;
            // Case GXM.Map with OpenLayers.Map
            if(idx === 0) {
                card = {
                    xtype : 'gxm_map',
                    // A reference to an OpenLayers.Map
                    map : map,
                    mapCenter : [10.15,51.34],
                    mapZoom: 6,
                    title : 'Map',
                    sourceCode: example.utility.getExampleCode('mappanel-simple')
                };
            // Case GXM.Map with OpenLayers.Layer
            } else if(idx === 1) {
                card = {
                    xtype : 'gxm_map',
                    // A reference to an OpenLayers.Layer
                    layers : [layerOwsOsmTerrestris.clone()],
                    mapCenter : [10.15,51.34],
                    mapZoom: 6,
                    controls: [
                        new OpenLayers.Control.TouchNavigation({
                            dragPanOptions : {
                                interval : 100,
                                enableKinetic : true
                            }
                        }),
                        new OpenLayers.Control.Attribution(),
                        new OpenLayers.Control.Navigation()
                    ],
                    title : '&hellip; layers',
                    sourceCode: example.utility.getExampleCode('mappanel-layers')
                };
            // Case GXM.Map with OpenLayers.Map and mapCenter and mapZoom
            } else if(idx === 2) {
                card = {
                    xtype: 'gxm_map',
                    layers : [layerOwsOsmTerrestris.clone()],
                    // Pass as array, as string or OpenLayers.LonLat-instance
                    mapCenter : [7.1, 50.74],
                    // Pass as an integer
                    mapZoom: 12,
                    controls: [
                        new OpenLayers.Control.TouchNavigation({
                            dragPanOptions : {
                                interval : 100,
                                enableKinetic : true
                            }
                        }),
                        new OpenLayers.Control.Attribution(),
                        new OpenLayers.Control.Navigation()
                    ],
                    title : '&hellip; center',
                    sourceCode: example.utility.getExampleCode('mappanel-center')
                };
            // Case GXM.Map with OpenLayers.Map and mapExtent
            } else if(idx === 3) {
                card = {
                    xtype : 'gxm_map',
                    layers : [layerOwsOsmTerrestris.clone()],
                    // Pass as array, as string or OpenLayers.Bounds-instance
                    mapExtent : '7,51,8,52',
                    controls: [
                        new OpenLayers.Control.TouchNavigation({
                            dragPanOptions : {
                                interval : 100,
                                enableKinetic : true
                            }
                        }),
                        new OpenLayers.Control.Attribution(),
                        new OpenLayers.Control.Navigation()
                    ],
                    title : '&hellip; extent',
                    sourceCode: example.utility.getExampleCode('mappanel-extent')
                };
            }
            return card;
        };
        
        // Create viewport and also add a button showing a snipped of sourcecode in a
        // floating Ext.Panel. See example-utility.js for the shown code.
        var viewport = Ext.create('Ext.TabPanel', {
            fullscreen : true,
            ui : 'dark',
            tabBar : {
                docked : 'top',
                layout : {
                    pack : 'center'
                }
            },
            items : [getCard(0), getCard(1), getCard(2), getCard(3), {
                xtype : 'toolbar',
                ui : 'dark',
                items : [
                    {xtype : 'spacer'},
                    {
                        xtype : 'button',
                        text : 'Source',
                        handler : function() {
                            Ext.create('Ext.Panel', {
                                fullscreen: false,
                                draggable : false,
                                modal : true,
                                height: '40%',
                                width: '40%',
                                centered : false,
                                styleHtmlContent : true,
                                scrollable : true,
                                hideOnMaskTap: true,
                                html : viewport.getActiveItem().config.sourceCode
                            }).showBy(this);
                        }
                }],
                docked : 'bottom'
            }]
        });
    }
});
