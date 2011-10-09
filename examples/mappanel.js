// intentially global for better debugging
var map,
    viewport;

Ext.setup({
    onReady: function(){
        // OpenLayers specific setup
        map = new OpenLayers.Map({
            controls: [
                new OpenLayers.Control.TouchNavigation(),
                new OpenLayers.Control.Attribution()
            ]
        });
        var ol_wms = new OpenLayers.Layer.WMS(
            "OpenLayers WMS", 
            "http://vmap0.tiles.osgeo.org/wms/vmap0", 
            {
                layers: "basic"
            },
            {
                attribution: 'Metacarta WMS hosted on <a href="http://www.osgeo.org/" target="_blank">osgeo.org<a>'
            }
        );
        
        map.addLayers([ol_wms]);
        
        /**
         * Helper method to get a tab card by index
         */
        var getCard = function(idx){       
            var card;
            if (idx === 0) {
                card = {
                    xtype: 'gxm_mappanel',
                    map: map,
                    title: 'MapPanel',
                    sourceCode: example.utility.getExampleCode('mappanel-simple')
                };
            } else if(idx === 1) {
                card = {
                    xtype: 'gxm_mappanel',
                    layers: [
                        ol_wms.clone()
                    ],
                    title: '&hellip; layers',
                    sourceCode: example.utility.getExampleCode('mappanel-layers')
                };
            } else if(idx === 2) {
                card = new GXM.MapPanel({
                    layers: [
                        ol_wms.clone() 
                    ],
                    center: [ 
                        8, 
                        51
                    ],
                    zoom: 11,
                    title: '&hellip; center',
                    sourceCode: example.utility.getExampleCode('mappanel-center')
                });
            } else if(idx === 3) {
                card = new GXM.MapPanel({
                    layers: [
                        ol_wms.clone()
                    ],
                    extent: '7,51,8,52',
                    title: '&hellip; extent',
                    sourceCode: example.utility.getExampleCode('mappanel-extent')
                });
            }
            return card;
        };
        
        // general layout:    
        viewport  = new Ext.TabPanel({
            fullscreen: true,
            ui: 'light',
            tabBar: {
                dock: 'top',
                layout: {
                    pack: 'center'
                }
            },
            items: [
                getCard(0),
                getCard(1),
                getCard(2),
                getCard(3)
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    items: [{
                        xtype: 'button',
                        text: 'Source',
                        handler: function(){
                            var overlay = new Ext.Panel({
                                floating: true,
                                modal: true,
                                centered: false,
                                styleHtmlContent: true,
                                scroll: 'both',
                                html: viewport.getActiveItem().sourceCode
                            });
                            overlay.showBy(this);
                        }
                    }],
                    dock: 'bottom'
                }
            ]
        });
    }
});