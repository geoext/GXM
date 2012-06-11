/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: (define)
 *  module = 
 *  class = gxm_feature
 *  base_link = `Ext.data.Model <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Model>`_
 */

/** api: example
 *  Sample code to use a gxm_feature model:
 * 
 *  .. code-block:: javascript
 *  
 *     Ext.create('Ext.data.Store', {
 *     
 *             model: 'gxm_feature',
 *        
 *             proxy: {
 *                 type: 'memory',
 *                 reader: {
 *                     type: 'json',
 *                     root: ''
 *                 }
 *             }
 *     });
 */

/** api: xtype = gxm_feature */

/** api: constructor
 *  .. class:: gxm_feature
 *  
 *  Class defines a model for records containing an OpenLayers feature object.
 *  Usually this class is not instantiated directly, but referenced by its name ``gxm_feature`` 
 *  as string representation as a config option within creation of a superior component, 
 *  for example a store. 
 */
Ext.define('GXM.data.FeatureModel', { 
    extend: "Ext.data.Model",
    alias: 'model.gxm_feature',
    config: {
        fields: [
             {
                 name: 'id'
             }
        ]
    },
    
    /** api: method[getLayer]
     *  :return:  ``OpenLayers.Feature`` The raw feature object of the corresponding record
     *  
     *  Returns the feature object of the record created with this model.
     */ 
    getFeature: function(){
        return this.raw;
    }
});
