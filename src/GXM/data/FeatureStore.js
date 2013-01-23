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
 * @requires GXM/data/FeatureModel.js
 */

/**
 * @class GXM.data.FeatureStore
 *
 * The class that is used to construct a GXM FeatureStore.
 */
Ext.define('GXM.data.FeatureStore', {
    extend: 'Ext.data.Store',
    requires: [
        'GXM.version',
        'GXM.data.FeatureModel'
    ],
    xtype: 'gxm_featurestore',
    config: {

        /** @cfg {string} model
         *  The identifier for the model to be used.
         */
        model: 'GXM.data.FeatureModel',

        /** @cfg {String/Ext.data.Proxy/Object} proxy
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
     *  Returns the feature object of the record at the given index.
     *  @param {Integer} idx The index of the record having the feature to return.
     *  @return  {OpenLayers.Feature} The feature object the record at the given index contains.
     */
    getFeatureByIndex: function (idx) {
        return this.getAt(idx).raw;
    }
});