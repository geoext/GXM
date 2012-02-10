/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full text of
 * the license.
 */
Ext.ns('GXM.data');

/** api: (define)
 *  module = GXM.data
 *  class = LayerModelPlugin
 */
GXM.data.LayerModelPlugin = Ext.extend(Object, {
    bootstrap: function(model, config){
        Ext.override(model, {
            getLayer: function(){
                return this.raw;   
            }
        });
    }
});

/** api: ptype = gxm_layermodel */
Ext.preg("gxm_layermodel", GXM.data.LayerModelPlugin);

Ext.regModel('gxm_layer', {
    plugins:[{ptype:'gxm_layermodel'}],
    fields: [
        {
            // The name given for the layer
            name: 'name'
        }
    ]
});
