/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** api: example[featureeditor]
 *  FeatureList and FeatureEditor interaction
 *  ----------------
 *  This example shows the use of the GXM.FeatureList-class in combination
 *  with the GXM.FeatureEditor-class to generate a form to edit the feature's
 *  attributes  when tapping on a list entry.
 */

Ext.require([
    'GXM.FeatureList',
    'GXM.form.FeatureEditor'
]);

Ext.setup({
    onReady : function() {
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
        
        var feature,
            features = [];

        feature = new OpenLayers.Feature.Vector(null, {
            FILETYPE: "MUNI",
            SAMP_POP: 7,
            DDRAWDATE: 1948,
            HEIGHT: 728.7,
            STATE_NAME :'my state',
            DRINK_NAME: 'pop'
        });
        feature.fid = 'foo.1';
        features.push(feature);
        layerVector.addFeatures(features);

        var store = Ext.create('GXM.data.AttributeStore', {
            url: "data/wfsdescribefeaturetype.xml"
        });
        store.load();

        // dummy protocol
        var protocol = new OpenLayers.Protocol.WFS({
            version: '1.1.0',
            url: '/dummy?',
            featureType: 'DOCS',
            featureNS: 'http://www.foo.com/'
        });

        // Create the GXM.FeatureList that also contains a listener dealing with
        // tap events on a specific feature in the list triggering a GXM.FeaturePopup.
        var featureList = {
            xtype : 'gxm_featurelist',
            layer : layerVector,
            itemTpl: '{feature.attributes.FILETYPE}',
            title : 'FeatureList',
            listeners : {
                itemtap : function(list, idx, target, record, e, eOpts) {
                    var feature = record.getFeature();
                    var popup = Ext.create("GXM.form.FeatureEditor", {
                        width: 400,
                        height: 400,
                        centered: true,
                        feature : feature,
                        protocol: protocol,
                        schema: store
                    });
                    Ext.Viewport.add(popup);
                    popup.show();
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
