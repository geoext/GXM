/*global Ext: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/* @requires GXM/version.js
 */

/**
 *  @class GXM.data.LayerModel
 *
 *  Class defines a model for records containing an OpenLayers layer object.
 *  Usually this class is not instantiated directly, but referenced by its name ``gxm_layer``
 *  as string representation as a config option within creation of a superior component,
 *  for example a store.
 *
 *  Sample code to use a gxm_layer model:
 *      storeExt.create('Ext.data.Store', {
 *          model: 'gxm_layer',
 *          proxy: {
 *              type: 'memory',
 *              reader: {
 *                  type: 'json',
 *                  root: ''
 *              }
 *          }
 *      });
 */
Ext.define('GXM.data.LayerModel', {
    extend: "Ext.data.Model",
    alias: 'model.gxm_layer',
    requires: [
        'GXM.version'
    ],
    config: {
        fields: [
            {
                // The name given for the layer
                name: 'name'
            }
        ]
    },

    /**
     *  Returns the layer object of the record created with this model.
     *  @return {OpenLayers.Layer} The raw layer object of this record
     *
     */
    getLayer: function () {
        return this.raw;
    }
});