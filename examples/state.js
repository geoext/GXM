// intentially global for better debugging
var map,
    mapPanel,
    viewport;

Ext.setup({
    onReady: function(){
        
        // OpenLayers specific
        map = new OpenLayers.Map({
            controls: [
                new OpenLayers.Control.TouchNavigation(),
                new OpenLayers.Control.Attribution(),
                new OpenLayers.Control.Permalink({
                    anchor: true
                })
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
        
        mapPanel = new GXM.MapPanel({
            map: map,
            layers: [ol_wms]
        });
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('state');
        
        // A reload button:
        var btnReload = {
            xtype: 'button',
            text: 'Reload',
            handler: function(){
                Ext.Msg.confirm(
                    "Reload page?", 
                    "The map should have the same center and zoom after reloading.", 
                    function(clicked){
                        if (clicked === "yes") {
                            location.reload();
                        }
                    }
                );
            }
        };
        
        viewport = new Ext.Panel({
            fullscreen: true,
            layout: 'fit',
            items: [
                mapPanel
            ],
            dockedItems: [{
                ui: 'light',
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    btnReload, 
                    {xtype: 'spacer'},
                    btnSource
                ]
            }]
        });
    }
});
