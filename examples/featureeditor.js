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
        var layerVector = new OpenLayers.Layer.Vector(null);
        var feature = new OpenLayers.Feature.Vector(null, {
            FILETYPE: "MUNI",
            SAMP_POP: 7,
            DDRAWDATE: new Date(),
            HEIGHT: 728.7,
            STATE_NAME :'my state',
            DRINK_NAME: 'pop'
        });
        feature.fid = 'foo.1';
        var feature2 = new OpenLayers.Feature.Vector(null, {
            FILETYPE: "TOPX",
            SAMP_POP: 5,
            DDRAWDATE: new Date(),
            HEIGHT: 400,
            STATE_NAME :'my state2',
            DRINK_NAME: 'soda'
        });
        feature2.fid = 'foo.2';
        layerVector.addFeatures([feature, feature2]);
        var store = Ext.create('GXM.data.AttributeStore', {
            url: "data/wfsdescribefeaturetype.xml",
            autoLoad: true
        });
        // Create the GXM.FeatureList that also contains a listener dealing with
        // tap events on a specific feature in the list triggering a GXM.FeatureEditor.
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
                        listeners: {
                            "failure": function(editor, msg) {
                                Ext.Msg.show({
                                    zIndex: 1000,
                                    showAnimation: null,
                                    hideAnimation: null,
                                    message: msg,
                                    buttons: [Ext.MessageBox.OK],
                                    promptConfig: false,
                                    fn: function(){}
                                });
                            }
                        },
                        centered: true,
                        feature : feature,
                        schema: store
                    });
                    Ext.Viewport.add(popup);
                    popup.show();
                }
            }
        };
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('featureeditor');
        
        // Create the viewport
        var viewport = Ext.create('Ext.Panel', {
            fullscreen : true,
            layout: 'fit',
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
