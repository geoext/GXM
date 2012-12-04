/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** api: example[featurepopup-map]
 *  Map and FeaturePopop interaction
 *  ----------------
 *  This example shows the use of the GXM.Map-class in combination
 *  with the GXM.FeaturePopup-class to generate a small popup when tapping
 *  a feature in the map.
 */

Ext.require([
    'GXM.Map',
    'GXM.FeaturePopup'
]);

Ext.setup({
    onReady : function() {
        var layerVector = new OpenLayers.Layer.Vector(null, {renderers: ["Canvas"]});
        layerVector.addFeatures([
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(10.15, 51.34), {
                    foo: 'bar1',
                    myattribute: 'bla1'
                }
            ), 
            new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(11.15, 52.34), {
                    foo: 'bar2',
                    myattribute: 'bla2'
                }
            )
        ]);
        layerVector.events.on({
            featureunselected: function(evt) {
                var popup = Ext.Viewport.down('gxm_featurepopup');
                if (popup) {
                    popup.hide();
                }
            },
            featureselected: function(evt) {
                var feature = evt.feature;
                var popup = Ext.Viewport.down('gxm_featurepopup');
                if (popup) {
                    popup.setFeature(feature);
                } else {
                    popup = Ext.create("GXM.FeaturePopup", {
                        feature: feature,
                        maxWidth: '5em',
                        maxHeight: '5em',
                        centered: false,
                        modal: false,
                        tpl: '{feature.attributes.foo}<br/>{feature.attributes.myattribute}'
                    });
                    Ext.Viewport.add(popup);
                }
                popup.show(false);
            }
        });
        var map = new OpenLayers.Map({
            controls : [
                new OpenLayers.Control.SelectFeature(layerVector, {autoActivate: true}),
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

        var layerOwsOsmTerrestris = new OpenLayers.Layer.WMS('terrestris', 'http://ows.terrestris.de/osm-basemap/service', {
            layers : 'OSM-WMS-Deutschland'
        }, {
            singleTile : false,
            attribution : '&copy; terrestris GmbH &amp; Co. KG<br>Data &copy; OpenStreetMap contributors, CC-BY-SA'
        });

        map.addLayers([layerOwsOsmTerrestris, layerVector]);
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('featurepopup-map');
        
        // Create the viewport
        var viewport = Ext.create('Ext.Panel', {
            layout: 'fit',
            fullscreen : true,
            items : [{
                xtype: 'gxm_map',
                mapCenter : [10.15,51.34],
                mapZoom: 6,
                map: map
            }, {
                xtype : 'toolbar',
                docked : 'bottom',
                items : [
                    {xtype : 'spacer'},
                    btnSource
                ]
            }]
        });
    }
});
