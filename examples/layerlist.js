// intentially global for better debugging
var map,
    mapPanel,
    viewport;

Ext.setup({
    onReady: function(){
        OpenLayers.Layer.Vector.prototype.renderers = ["SVG2", "VML", "Canvas"];
        
        var gg = new OpenLayers.Projection("EPSG:4326");
        var sm = new OpenLayers.Projection("EPSG:900913");
        var vector = new OpenLayers.Layer.Vector('Vector data');
        
        var dx = 15;
        var dy = 15;
        var px, py;
        var feature, features = [];
        for(var x=-170; x<=170; x+=dx) {
            for(var y=-80; y<=80; y+=dy) {
                px = x + (2 * dx * (Math.random() - 0.5));
                py = y + (2 * dy * (Math.random() - 0.5));
                feature = new OpenLayers.Feature.Vector(
                    new OpenLayers.Geometry.Point(px, py).transform(gg, sm), {x: px, y: py}
                );
                features.push(feature);
            }
        }
        vector.addFeatures(features);
        
        map = new OpenLayers.Map({
            theme: null,
            projection: sm,
            units: "m",
            numZoomLevels: 18,
            maxResolution: 156543.0339,
            maxExtent: new OpenLayers.Bounds(-20037508.34, -20037508.34, 20037508.34, 20037508.34),
            controls: [new OpenLayers.Control.Attribution(), new OpenLayers.Control.TouchNavigation({
                dragPanOptions: {
                    interval: 100,
                    enableKinetic: true
                }
            })],
            layers: [
                new OpenLayers.Layer.OSM.Mapnik(
                    'OpenStreetMap Mapnik', 
                    { 
                        sphericalMercator : true, 
                        attribution : 'Data <a href="http://creativecommons.org/licenses/by-sa/2.0">CC-By-SA</a> from <a href="http://openstreetmap.org/">OpenStreetMap</a>'
                    }
                ),
                new OpenLayers.Layer.OSM.Osmarender(
                    'OpenStreetMap Osmarender', 
                    { 
                        sphericalMercator : true, 
                        attribution : 'Data <a href="http://creativecommons.org/licenses/by-sa/2.0">CC-By-SA</a> from <a href="http://openstreetmap.org/">OpenStreetMap</a>'
                    }
                ),
                new OpenLayers.Layer.OSM.CycleMap(
                    'OpenStreetMap CycleMap', 
                    {
                        sphericalMercator : true, 
                        attribution : 'Data <a href="http://creativecommons.org/licenses/by-sa/2.0">CC-By-SA</a> from <a href="http://openstreetmap.org/">OpenStreetMap</a> &amp; <a href="http://www.opencyclemap.org/">OpenCycleMap</a>'
                    }
                ),
                vector
            ]
            
        });
        
        var btnLayerlist = {
            xtype: 'button',
            text: 'Layerlist',
            handler: function(){
                if (!this.popup) {
                    this.popup = new Ext.Panel({
                        floating: true,
                        modal: true,
                        centered: true,
                        hideOnMaskTap: true,
                        items: [{
                            xtype: 'gxm_layerlist',
                            mapPanel: mapPanel
                        }],
                        scroll: 'vertical'
                    });
                }
                this.popup.show('pop');
            }
        };
        
        mapPanel = new GXM.MapPanel({
            map: map,
            title: 'MapPanel',
            center: new OpenLayers.LonLat(8,51).transform(gg, sm),
            zoom: 3
            
        });
        var layerList = {
            xtype: 'gxm_layerlist',
            // call with mapPanel...
            mapPanel: mapPanel,
            // ... or with layers and map
            //            layers: mapPanel.layers,
            //            map: map,
            listeners: {
                itemtap: function(){
                    Ext.Msg.alert('Application event "itemtap"', 'You can still register events as usual.');
                }
            }
        };
        var layerPanel = {
            xtype: 'panel',
            title: 'LayerList',
            fullscreen: true,
            items: [layerList]
        };
        
//        var sourcePanel = {
//            xtype: 'panel',
//            title: 'Source',
//            fullscreen: true,
//            styleHtmlContent: true,
//            scroll: 'both',
//            html: example.utility.getExampleCode('layerlist')
//        };
        var btnSource = example.utility.getSourceCodeButton('layerlist')
        
        viewport = new Ext.TabPanel({
            tabBar: {
                dock: 'top',
                layout: {
                    pack: 'center'
                }
            },
            cardSwitchAnimation: 'slide',
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        btnLayerlist,
                        {xtype: 'spacer'},
                        btnSource
                    ]
                }
            ],
            fullscreen: true,
            layout: 'card',
            items: [mapPanel, layerPanel]
        });
    }
});
