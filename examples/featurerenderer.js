/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

Ext.require([
    'GXM.FeatureRenderer'
]);

Ext.setup({
    viewport : {
        autoMaximize : true
    },
    onReady : function() {
        var items = [];
        var style = new OpenLayers.Style({
            pointRadius: 7,
            graphicName: 'circle'
        }, {
            rules: [
                new OpenLayers.Rule({
                    name: "Unpaid",
                    symbolizer: {
                        fillColor: "red"
                    }
                }),
                new OpenLayers.Rule({
                    name: "Commercial",
                    symbolizer: {
                        fillColor: "blue"
                    }
                }),
                new OpenLayers.Rule({
                    name: "Foo",
                    symbolizer: {
                        fillColor: "olive"
                    }
                })
            ]
        });

        for (var i=0, ii=style.rules.length; i<ii; ++i) {
            var rule = style.rules[i];
            items.push({
                xtype: 'container',
                layout: 'hbox',
                pack: 'start',
                align: 'stretch',
                items: [{
                    xtype: 'gxm_renderer',
                    symbolType: "Point",
                    width: 25,
                    symbolizers: [Ext.apply(Ext.apply({}, style.defaultStyle), rule.symbolizer)]
                }, {
                    flex: 1,
                    xtype: 'label',
                    html: rule.name
                }]
            });
        }

        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('featurerenderer');

        items.push({
            xtype : 'toolbar',
            docked : 'bottom',
            items : [
                {xtype : 'spacer'},
                btnSource
            ]
        });
        
        // Create the viewport
        viewport = Ext.create('Ext.Panel', {
            fullscreen : true,
            items : items
        });
        
    }
});
