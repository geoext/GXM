function getMap(){
    var map = new OpenLayers.Map({
        layers: [
            new OpenLayers.Layer.WMS(
                "OpenLayers WMS", 
                "http://vmap0.tiles.osgeo.org/wms/vmap0", 
                {
                    layers: "basic"
                }
            )
        ]
    });
    return map;
}

function getMapPanel(opts) {
    var map = getMap();
    var options = Ext.apply(opts || {});
    if (!opts || !opts.map) {
        options.map = map;
    }
    var mappanel = new GXM.MapPanel(options);
    return mappanel;
}

function getLazyMapPanel(opts) {
    var options = Ext.apply(opts || {}, { xtype: 'gxm_mappanel' });
    options.map = ( opts && opts.map ) ? opts.map : getMap();
    var mappanel = options;
    
    var panel = new Ext.Panel({
        fullscreen: true,
        items:[ mappanel ]
    });
    
    return panel.items.get(0);
}
