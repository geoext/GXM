/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: (define)
 *  module = GXM
 *  class = FeatureList
 *  base_link = `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_
 */

/** api: example
 *  Sample code to create a GXM.FeatureList:
 * 
 *  .. code-block:: javascript
 *  
 *     var featureList = {
 *         xtype : 'gxm_featurelist',
 *         layer : layerVector,
 *         title : 'FeatureList',
 *         listeners : {
 *             itemtap : function(list, idx, target, record, e, eOpts) {
 *                 var feature = record.getFeature(), 
 *                     geom = feature.geometry, 
 *                     center = new OpenLayers.LonLat(geom.x, geom.y), 
 *                     zoom = 5
 *                 mapPanel.getMap().setCenter(center, zoom);
 *                 tp.setActiveItem(mapPanel);
 *             }
 *         }
 *     };
 *    
 */

/** api: constructor
 *  .. class:: FeatureList(config)
 *   
 *      The class that is used to construct a GXM FeatureList.
 */
Ext.define('GXM.FeatureList', {

    extend: 'Ext.List',
    xtype : 'gxm_featurelist',
    
    /** api: property[olLayer]
     * 
     *  `OpenLayers.Layer.Vector <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Layer/Vector-js.html>`_  references the 
     *  layer that was used to instantiate this list.
     */
    olLayer: null,
    
    config: {
    	
        /** api: config[map] 
         * 
         *  :class:`GXM.Map` The GXM Map component this `FeatureList` refers to. 
         *  Might be used to derive the corresponding OpenLayers Map object.
         */
        map: null,
        
        /** api: config[store]
         * 
         *  :class:`GXM.data.FeatureStore` The featurestore this list is about 
         *  to use.
         */
        store: null,
        
        /** api: config[layer]
         * 
         *  `OpenLayers.Layer.Vector <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Layer/Vector-js.html>`_ 
         *  The layer this list is about to derive featuires from for display 
         *  inside the list. Will override any existing configuration for 
         *  :attr:`store`.
         */
        layer: null,
        
        /** api: config[itemTpl]
         * 
         *  `Ext.XTemplate <http://docs.sencha.com/touch/2-0/#!/api/Ext.XTemplate>`_
         *  The template used to render every list-item of the list of features. 
         *  If not provided, a rudimentary template is being used. 
         */
        itemTpl: null
    },
    
    /** private: method[constructor]
     * 
     *  The constructor function
     */
    constructor: function(config) {
        if (config.layer) {
            this._layer = config.layer;
            delete config.layer;
        }
        this.callParent(arguments);
    },
    
    /** private: method[initialize]
     * 
     *  Initializes the Component.
     */
    initialize: function() {
       
        var map = this.getMap();
        
        if (map && map instanceof GXM.Map) {
            this.olMap = map.getMap();
        }
        
        // TODO
        // Allow also initialization with an array of features
        
        var layer = this.getLayer();
        
        if (layer) {
            var features = layer.features;
            var store =  Ext.create('GXM.data.FeatureStore', {
                data: features
            });
            this.setStore(store);
            
            // bind OL events
        	layer.events.on({
                "featureadded": this.onFeatureAdded,
                "featureremoved": this.onFeatureRemoved,
                scope: this
            });
        }
        
        var tpl = this.getItemTpl();
        if (Ext.isDefined(tpl) && tpl instanceof Ext.XTemplate) {
        	this.setItemTpl(tpl);
        } else {
        	this.setItemTpl(new Ext.XTemplate(
                '{[this.renderFeatureListItem(values.feature)]}', {
                    renderFeatureListItem: function(feature){
                        var data = feature.data,
                            geom = feature.geometry,
                            str = geom.toString().substr(0, 30);
                        if (geom.toString().length > 30) {
                            str += '...';
                        }
                        return Ext.String.format('Feature ({0})', str);
                    }
                }
            ));
        }
        
                
        this.callParent();
    },
    
    /** private: method[prepareData]
     *  :param data: ``Object`` The raw data object that was used to create the
     *      record.
     *  :param index: ``Number`` the index number of the Record being prepared 
     *      for rendering.
     *  :param record: ``Record`` The Record being prepared for rendering.
     *  
     *  :return: ``Object`` the adjusted data with a new member ``feature`` 
     *      referencing the raw ``OpenLayers.Feature``-object
     *      
     *  A private method to give this DataViews template-methods access to the 
     *  raw ``OpenLayers.Feature``-object.
     */
    prepareData: function(data, index, record) {
        if (record) {
            data.feature = record.getFeature();
        }
        return data;
    },
        
    /** private: method[onFeatureAdded]
     *  :param evt: ``Ext.EventObject`` The event-object 
     *  
     *  TODO events -featureadded, -featureremoved, double check: only when configured with layer!
     */
	onFeatureAdded: function(evt) {
		this.getStore().add(evt.feature);
	},
	
    /** private: method[onFeatureRemoved]
     *  :param evt: ``Ext.EventObject`` The event-object 
     *  
	 *  TODO events -featureadded, -featureremoved, double check: only when configured with layer!
	 */
	onFeatureRemoved: function(evt) {
		var store = this.getStore(),
			rec = store.findRecord("id", evt.feature.id);
		
		this.getStore().remove(rec);
	}
    
});
