/*global Ext: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full 
 * text of the license.
 */

/* @requires GXM/version.js
 * @requires GXM/data/LayerModel.js
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
        },

        sorters: [
            {
                direction: 'DESC',
                sorterFn: function (obj_1, obj_2) {
                    var layer_1 = obj_1.getLayer(),
                        layer_2 = obj_2.getLayer(),
                        idx_1 = layer_1.getZIndex(),
                        idx_2 = layer_2.getZIndex(),
                        res = (idx_1 > idx_2 ? 1 : (idx_1 < idx_2 ? -1 : 0));
                    return res;
                }
            }
        ]
    },

    /**
     *  Returns the layer object of the record at the given index.
     *  @param {Integer} idx The index of the record having the layer to return.
     *  @return {OpenLayers.Layer} The layer object the record at the given index contains.
     *
     */
    getLayerByIndex: function (idx) {
        return this.getAt(idx).raw;
    }
});
