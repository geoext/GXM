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
 *  @class GXM.data.FeatureModel
 *
 *  Class defines a model for records containing an OpenLayers feature object.
 *  Usually this class is not instantiated directly, but referenced by its name ``gxm_feature``
 *  as string representation as a config option within creation of a superior component,
 *  for example a store.
 *
 *  Sample code to use a gxm_feature model:
 *      Ext.create('Ext.data.Store', {
 *          model: 'gxm_feature',
 *          proxy: {
 *              type: 'memory',
 *              reader: {
 *                  type: 'json',
 *                  root: ''
 *              }
 *          }
 *      });
 */

Ext.define('GXM.data.FeatureModel', {
    extend: "Ext.data.Model",
    alias: 'model.gxm_feature',
    requires: [
        'GXM.version'
    ],
    config: {
        fields: [
            {
                name: 'id'
            }
        ]
    },

    /**
     * Returns the feature object of the record created with this model.
     * @return {OpenLayers.Feature} The raw feature object of the corresponding record
     */
    getFeature: function () {
        return this.raw;
    }
});
