/*
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full 
 * text of the license.
 */

/**
 *  @class GXM.data.LayerStore
 *   
 *  The class that is used to construct a GXM LayerStore.
 */
Ext.define('GXM.data.LayerStore', {
    extend: 'Ext.data.Store',
    requires: [
        'GXM.version',
        'GXM.data.LayerModel'
    ],
    xtype: 'gxm_layerstore',
    config: {
    	
        /** 
         * @cfg {string} model
         *  The identifier for the model to be used. 
         */
        model: 'GXM.data.LayerModel',
        
        /** 
         * @cfg {String/Ext.data.Proxy/Object} proxy
         *  The proxy to be used by the store.
         */
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: ''
            }
        }
    },
    
    /**
     *  Returns the layer object of the record at the given index.
     *  @param {Integer} idx The index of the record having the layer to return.
     *  @return {OpenLayers.Layer} The layer object the record at the given index contains.
     *  
     */ 
    getLayerByIndex: function(idx) {
        return this.getAt(idx).raw;
    }
});
