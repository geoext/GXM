/**
 * Returns an OpenLayers.Map instance with one WMS layer already added. 
 */
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

/**
 * Returns an GXM.Map instance with a default OpenLayers.Map. If you want to set
 * custom option (e.g. a different map), pass them as first argument. 
 */
function getMapPanel(opts) {
    var map = getMap();
    var options = Ext.apply(opts || {});
    if (!opts || !opts.map) {
        options.map = map;
    }
    var mappanel = Ext.create('GXM.Map', options);
    return mappanel;
}

/**
 * Returns an GXM.Map instance with a default OpenLayers.Map, that was created 
 * lazily as a child of an Ext.Panel. If you want to set custom option (e.g. a 
 * different map), pass the as first argument. 
 */
function getLazyMapPanel(opts) {
    var options = Ext.apply(opts || {}, { xtype: 'gxm_map' });
    options.map = ( opts && opts.map ) ? opts.map : getMap();
    var mappanel = options;
    
    var panel = Ext.create('Ext.Panel', {
        fullscreen: true,
        items:[ mappanel ]
    });
    
    return panel.items.get(0);
}

/**
 * Checks whether we can open a window with window.open, which is a requirement
 * of some tests.
 */
var canOpenWindow  = (function(){
    var win,
        capable = false;
    try {
        win = window.open(location.href);
        if (win){
            capable = true; 
            win.close();
        }
    } catch(e) {
        // ignore
    } finally {
        return function(){
            return capable;
        }
    }
})();