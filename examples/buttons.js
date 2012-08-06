/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: example[buttons]
 *  Buttons in top and bottom toolbar
 *  ----------------
 *  This example shows the use of the GXM.Button-class to generate buttons that 
 *  can be used to manage and control OpenLayers.Control-instances. 
 */

Ext.require([
    'GXM.Map',
    'GXM.Button',
    'Ext.SegmentedButton',
    'Ext.Panel',
    'Ext.Toolbar',
    'Ext.MessageBox'
]);

Ext.setup({
    viewport : {
        autoMaximize : true
    },
    onReady : function() {
        // OpenLayers specific configurations
        // Create the layer definition for the base layer
        var ol_wms = new OpenLayers.Layer.WMS(
            'OpenLayers WMS', 
            'http://ows.terrestris.de/osm-basemap/service', {
                layers : 'OSM-WMS-Deutschland',
                format : 'image/jpeg'
            }, {
                singleTile : false,
                attribution : '&copy; terrestris GmbH &amp; Co. KG' +
                    '<br>Data &copy; OpenStreetMap contributors, CC-BY-SA'
            }
        );
        
        // Create a vector layer for geolocation 
        var geolocationVector = new OpenLayers.Layer.Vector('Geolocation');
        
        // Create a vector layer for drawing features
        var layerVector = new OpenLayers.Layer.Vector('Vector Layer', {
            styleMap : new OpenLayers.StyleMap({
                temporary : OpenLayers.Util.applyDefaults({
                    pointRadius : 16
                }, OpenLayers.Feature.Vector.style.temporary)
            })
        });
        
        // Create the map object
        var map = new OpenLayers.Map({
            projection : 'EPSG:900913',
            units : 'm',
            fractionalZoom : false,
            maxExtent : new OpenLayers.Bounds(
                -20037508.34, 
                -20037508.34, 
                20037508.34, 
                20037508.34
            ),
            resolutions : [
                156543.03390625, 
                78271.516953125, 
                39135.7584765625, 
                19567.87923828125,
                9783.939619140625, 
                4891.9698095703125, 
                2445.9849047851562, 
                1222.9924523925781, 
                611.4962261962891, 
                305.74811309814453, 
                152.87405654907226, 
                76.43702827453613, 
                38.218514137268066, 
                19.109257068634033, 
                9.554628534317017, 
                4.777314267158508, 
                2.388657133579254, 
                1.194328566789627, 
                0.5971642833948135
            ],
            controls : [
                new OpenLayers.Control.Attribution()
            ],
            layers : [ol_wms, geolocationVector, layerVector]
        });
        
        // Create the map panel using the map configuration from above (see OpenLayers.Map constructor)
        var gxmMap = Ext.create('GXM.Map', {
            map : map,
            title : 'MapPanel',
            mapCenter : [1154447,6665743],
            mapZoom : 6
        });
        
        // Define function to be called by a button handler.
        var btnClickCallback = function(btn) {
            Ext.Msg.alert(
                'Callback defined in application', 
                'You tapped the "' + btn.config.title + '"-button.'
            );
        };

        // Usually you generate a OpenLayer control and pass it over to 
        // the GXM.Button-constructor.
        
        // Create the ZoomIn control
        var zoomin = new OpenLayers.Control.ZoomIn();
        
        // Create the ZoomOut control
        var zoomout = new OpenLayers.Control.ZoomOut();
        
        // ZoomIn button
        var btnZoomIn = Ext.create('GXM.Button', {
            control : zoomin,
            map : gxmMap,
            title : 'Zoom In',
            iconCls : 'arrow_down',
            iconMask : true,
            handler : Ext.Function.bind(btnClickCallback)
        });
        
        // ZoomOut button
        var btnZoomOut = Ext.create('GXM.Button', {
            control : zoomout,
            map : gxmMap,
            title : 'Zoom Out',
            iconCls : 'arrow_up',
            iconMask : true,
            handler : Ext.Function.bind(btnClickCallback)
        });
        
        // Create the navigation control (OpenLayers)
        var ctrlNav = new OpenLayers.Control.TouchNavigation();
        
        // Navigation button
        // Button is used to (de)activate the navigation control, feedback 
        // about the state given to the user by a window
        var btnNavigation = Ext.create('GXM.Button', {
            exclusiveGroup : 'working-on-map',
            map : gxmMap,
            text : 'Navigation',
            control : ctrlNav,
            pressed : true,
            id : 'navbtn',
            handler : function(btn, evt, activeState) {
                Ext.Msg.alert('Navigation', 'Navigation is ' 
                    + ( btn._pressed ? 'active' : 'inactive') 
                    + '.'
                );
            }
        });
        
        // include the button into an segmented button, so it gets a pressed / unpressed state
        var navGroup = Ext.create('Ext.SegmentedButton', {
            defaultType : "gxm_button",
            items : [
                btnNavigation 
            ]
        });

        // Create the DrawFeature control (Point)
        var ctrlDrawPoint = new OpenLayers.Control.DrawFeature(
            layerVector, 
            OpenLayers.Handler.Point
        );
        
        // Create the DrawFeature control (Path)
        var ctrlDrawLine = new OpenLayers.Control.DrawFeature(
            layerVector, 
            OpenLayers.Handler.Path
        );
        
        // Create the DrawFeature control (Polygon)
        var ctrlDrawPoly = new OpenLayers.Control.DrawFeature(
            layerVector, 
            OpenLayers.Handler.Polygon
        );

        // DrawFeature button (Point)
        // Use the "exclusiveGroup" configuration to make sure that from a group 
        // of controls only one is active at any time.
        var btnDigPoint = {
            control : ctrlDrawPoint,
            exclusiveGroup : 'working-on-map',
            text : 'Point',
            map : gxmMap
        };
        
        // DrawFeature button (Path)
        var btnDigLine = {
            control : ctrlDrawLine,
            exclusiveGroup : 'working-on-map',
            text : 'Line',
            map : gxmMap
        };
        
        // DrawFeature button (Polygon)
        var btnDigPoly = {
            control : ctrlDrawPoly,
            exclusiveGroup : 'working-on-map',
            text : 'Poly',
            map : gxmMap
        };
        
        // Create a segmented button (group of Ext.Buttons) out of all DrawFeature buttons
        var digGroup = Ext.create('Ext.SegmentedButton', {
            defaultType : "gxm_button",
            items : [
                btnDigPoint, 
                btnDigLine, 
                btnDigPoly
            ]
        });
        
        // Geolocation control
        var ctrlGeolocation = new OpenLayers.Control.Geolocate( {
            bind : false,
            watch : false,
            geolocationOptions : {
                enableHighAccuracy : false,
                maximumAge : 0,
                timeout : 7000
            }
        } );
        
        // Remove all features (on geolocationVector) when the actual position is changing
        ctrlGeolocation.events.register(
            'locationupdated', 
            geolocationVector, 
            function(e) {
                this.removeAllFeatures();
            
                var oneDeegreeLongAtEquatorInMeters = 111200, 
                    oneDeegreeLongAtCurrentLatitude = oneDeegreeLongAtEquatorInMeters * (Math.cos(e.point.y / (180 / Math.PI))), 
                    accuracyMeters = e.position.coords.accuracy, 
                    accuracyDeegrees = accuracyMeters / oneDeegreeLongAtCurrentLatitude, 
                    circle = new OpenLayers.Feature.Vector(OpenLayers.Geometry.Polygon.createRegularPolygon(new OpenLayers.Geometry.Point(e.point.x, e.point.y), accuracyDeegrees, 50, 0), {}, {
                        fillColor : '#e00',
                        fillOpacity : 0.1,
                        strokeColor : '#f00',
                        fillOpacity : 0.2,
                        strokeWidth : 2
                    });
                
                // Add a feature (red cross) to the actual position 
                this.addFeatures([new OpenLayers.Feature.Vector(e.point, {}, {
                    graphicName : 'cross',
                    strokeColor : '#f00',
                    strokeWidth : 2,
                    fillOpacity : 0,
                    pointRadius : 10
                }), circle]);
                
                this.map.zoomToExtent(this.getDataExtent());
            }
        );
        
        // Remove all features (red cross) when control is deactivated
        ctrlGeolocation.events.register(
            'deactivate', 
            geolocationVector, 
            function(e) {
                this.removeAllFeatures();
            }
        );
        
        // Geolocation Button
        var btnGeolocation = Ext.create('GXM.Button', {
            control : ctrlGeolocation,
            exclusiveGroup : 'geolocation',
            text : 'Locate me',
            map : gxmMap
        });
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('buttons');
        
        // Create the viewport
        var viewport = Ext.create('Ext.Panel', {
            fullscreen : true,
            layout : 'fit',
            ui : 'dark',
            items : [
                gxmMap, 
                // The top toolbar:
                {
                    xtype : 'toolbar',
                    docked : 'top',
                    items : [
                        btnZoomIn, 
                        btnZoomOut, 
                        { xtype : 'spacer' },
                        btnSource,
                        { xtype : 'spacer' },
                        navGroup
                    ]
                }, 
                // The bottom toolbar:
                {
                    xtype : 'toolbar',
                    docked : 'bottom',
                    items : [
                        digGroup,
                        { xtype : 'spacer' }, 
                        {
                            xtype : 'segmentedbutton',
                            items : [ 
                               btnGeolocation
                            ]
                        }
                    ]
                } 
            ] // end items of viewport
        }); // end viewport
    }
});
