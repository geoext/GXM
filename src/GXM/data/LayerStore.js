/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full 
 * text of the license.
 */

/**
 * @requires GXM/data/models/Layer.js
 */

/** api: (define)
 *  module = GXM.data
 *  class = LayerStore
 *  base_link = `Ext.data.Store <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Store>`_
 */

/** api: constructor
 *  .. class:: LayerStore(config)
 *   
 *      The class that is used to construct a GXM LayerStore.
 */
Ext.define('GXM.data.LayerStore', {
    extend: 'Ext.data.Store',
    requires: [
        'GXM.version',
        'GXM.data.LayerModel'
    ],
    config: {
    	
        /** api: config[model]
         * 
         *  ``String`` The identifier for the model to be used. 
         *  Defaults to ``gxm_layer``.
         */
        model: 'GXM.data.LayerModel',
        
        /** api: config[proxy]
         * 
         *  ``String/Ext.data.Proxy/Object`` The proxy to be used by the store.
         *  Defaults to a configuration object for a `Ext.data.MemoryProxy <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.proxy.Memory>`_
         *  that has a `Ext.data.reader.Json <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.reader.Json>`_ set as `reader`-property.
         */
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: ''
            }
        }
    },
    
    /** api: method[getLayerByIndex]
     *  :param idx: ``Integer`` The index of the record having the layer to return.
     *  :return:  ``OpenLayers.Layer`` The layer object the record at the given index contains.
     *  
     *  Returns the layer object of the record at the given index.
     */ 
    getLayerByIndex: function(idx) {
        return this.getAt(idx).raw;
    }
});
