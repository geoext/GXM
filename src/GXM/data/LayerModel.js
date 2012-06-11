/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: example
 *  Sample code to use a gxm_layer model:
 * 
 *  .. code-block:: javascript
 *  
 *     Ext.create('Ext.data.Store', {
 *     
 *             model: 'gxm_layer',
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

/** api: (define)
 *  module = 
 *  class = gxm_layer
 *  base_link = `Ext.data.Model <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Model>`_
 */

/** api: xtype = gxm_layer */

/** api: constructor
 *  .. class:: gxm_layer
 *  
 *  Class defines a model for records containing an OpenLayers layer object.
 *  Usually this class is not instantiated directly, but referenced by its name ``gxm_layer`` 
 *  as string representation as a config option within creation of a superior component, 
 *  for example a store. 
 */
Ext.define('GXM.data.LayerModel', { 
    extend: "Ext.data.Model",
    alias: 'model.gxm_layer',
    config: {
        fields: [
            {
                // The name given for the layer
                name: 'name'
            }
        ]
    },
    
    /** api: method[getLayer]
     *  :return:  ``OpenLayers.Layer`` The raw layer object of this record
     *  
     *  Returns the layer object of the record created with this model.
     */ 
    getLayer: function(){
        return this.raw;
    }
});