/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full text of
 * the license.
 */

Ext.ns("GXM.data");

/**
 * @requires GXM/data/models/Layer.js
 */

/** api: (define)
 *  module = GXM.data
 *  class = LayerStore
 *  base_link = `Ext.data.Store <http://dev.sencha.com/deploy/touch/docs/?class=Ext.data.Store>`_
 */

/** api: constructor
 *  .. class:: LayerStore(config)
 *   
 *      The class that is used to construct a GXM LayerStore.
 */
GXM.data.LayerStore = Ext.extend(Ext.data.Store, {
    /** api: config[model]
     * 
     *  ``String`` The identifier for the model to be used. 
     *  Defaults to ``gxm_layer``.
     */
    
    /** api: config[proxy]
     * 
     *  ``String/Ext.data.Proxy/Object`` The proxy to be used by the store.
     *  Defaults to a configuration object for a `Ext.data.MemoryProxy <http://dev.sencha.com/deploy/touch/docs/?class=Ext.data.MemoryProxy>`_
     *  that has a :class:`GXM.data.LayerReader` set as `reader`-property.
     */
    
    /** api: config[sorters]
     * 
     *  ``Array(Ext.util.Sorter)`` An array of `Sorters <http://dev.sencha.com/deploy/touch/docs/?class=Ext.util.Sorter>`_ 
     *  to be used for ordering of the records. Defaults to a single  sorter 
     *  that orders the layers descending according to the stack size inside of 
     *  the map. That means that layers drawn atop of others in the map will be
     *  on top inside of lists that make use of this store. 
     *  
     *  The configuration of the single sorter can also be configured using the 
     *  :attr:`sortDirection` configuration properties.
     */
    
    /** api: config[sortDirection]
     * 
     *  ``String`` The direction to order the store by if no :attr:`sorters`.
     *  Defaults to `DESC`.
     */
    
    /** api: config[sorterFn]
     * 
     *  ``Function`` The method used to sort store items. The method will
     *  be called with two objects (instances of the configured :attr:`model`) 
     *  and should implement logic that determines ordering of the passed 
     *  objects. Your method should return 
     *  
     *   * ``1`` if the first object is greater than the second object
     *   * ``-1`` if the second object is greater than the first
     *   * ``0`` if they are equal.
     *  
     *  Here is an example method:
     *  
     *  .. code-block:: javascript
     *  
     *    function(obj_1, obj_2) {
     *        var layer_1 = obj_1.getLayer(),
     *            layer_2 = obj_2.getLayer(),
     *            idx_1 = layer_1.getZIndex(),
     *            idx_2 = layer_2.getZIndex(),
     *            res = (idx_1 > idx_2 ? 1 : (idx_1 < idx_2 ? -1 : 0));
     *        return res;
     *    }
     *    
     *  You can further control the sort direction by :attr:`sortDirection`.
     *  
     */
    constructor: function(config) {
        var conf = config || {};
        
        conf.model = conf.model || 'gxm_layer';
        
        conf.proxy = conf.proxy || {
            type: 'memory',
            reader: 'json'
        };
        
        conf.sorters = conf.sorters || [{
            direction: conf.sortDirection || 'DESC',
            sorterFn: conf.sorterFn || function(obj_1, obj_2) {
                var layer_1 = obj_1.getLayer(),
                    layer_2 = obj_2.getLayer(),
                    idx_1 = layer_1.getZIndex(),
                    idx_2 = layer_2.getZIndex(),
                    res = (idx_1 > idx_2 ? 1 : (idx_1 < idx_2 ? -1 : 0));
                return res;
            }
        }];
        
        return GXM.data.LayerStore.superclass.constructor.call(this, conf);
    }
});

/** api: xtype = gxm_layerstore */
Ext.reg('gxm_layerstore', GXM.data.LayerStore);

