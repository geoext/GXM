/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/**
 * @requires GXM/data/LayerStore.js
 */

/** api: (define)
 *  module = GXM
 *  class = LayerList
 *  base_link = `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_
 */

/** api: example
 *  Sample code to create a GXM.LayerList:
 * 
 *  .. code-block:: javascript
 *  
 *    // create a lazily instanciated GXM.LayerList:
 *    var layerList = {
 *        xtype: 'gxm_layerlist',
 *        // call with mapPanel...
 *        map: gxmMap,
 *        listeners: {
 *            itemtap: function(){
 *                Ext.Msg.alert(
 *                    'Application event "itemtap"', 
 *                    'You can still register events as usual.'
 *                );
 *            }
 *        }
 *    };
 *    
 */

/** api: constructor
 *  .. class:: LayerList(config)
 *   
 *      The class that is used to construct a GXM LayerList.
 */
Ext.define('GXM.LayerList', {
	
    extend: 'Ext.List',
    xtype : 'gxm_layerlist',
    
    /** api: property[olMap]
     *  
     *  ``OpenLayers.Map``  The reference to the related OpenLayers Map object.
     *  This is for readonly use. To pass a map object to this class use the
     *  :attr:`map` config option. 
     */
    olMap: null,
    
    /** api: property[visibleOverlayCls]
     * 
     *  ``String`` The CSS class that the list items for currently visible 
     *  overlay layers will get. 
     *  
     *  Defaults to ``gxm-visible-overlay-indicator``.
     */
    visibleOverlayCls: 'gxm-visible-overlay-indicator',
    
    /** api: property[invisibleOverlayCls]
     * 
     *  ``String`` The CSS class that the list items for currently invisible 
     *  overlay layers will get. 
     *  
     *  Defaults to ``gxm-invisible-overlay-indicator``.
     */
    invisibleOverlayCls: 'gxm-invisible-overlay-indicator',
    
    /** api: property[activeBaselayerCls]
     * 
     *  ``String`` The CSS class that the list item of the currently active 
     *  baselayer will get. 
     *  
     *  Defaults to ``gxm-active-baselayer-indicator``.
     */
    activeBaselayerCls: 'gxm-active-baselayer-indicator',
    
    /** api: property[inactiveBaselayerCls]
     * 
     *  ``String`` The CSS class that the list items of the currently inactive 
     *  baselayers will get. 
     *  
     *  Defaults to ``gxm-inactive-baselayer-indicator``.
     */
    inactiveBaselayerCls: 'gxm-inactive-baselayer-indicator',
    
    /**
     * These do all get a getter-, setter- and applier-method
     */
    config: {
    	
        /** api: config[map] 
         * 
         *  :class:`GXM.Map` The GXM Map component this `LayerList` refers to. Might be used to 
         *  derive the corresponding OpenLayers Map object.
         */
        map: null,
        
        /** api: config[layers]
         * 
         *  :class:`GXM.data.LayerStore` The layerstore this list is about to use.
         */
        store: null
    },
    
    /** private: method[constructor]
     * 
     *  The constructor function
     */
    constructor: function(config){
        this.callParent(arguments);
    },
    
    /** private: method[initialize]
     * 
     *  Initializes the Component.
     */
    initialize: function(){
    	var me = this,
        	map = this.getMap();
    	
        if (map && map instanceof GXM.Map) {
        	me.olMap = map.getMap();
        	me.setStore(map.layers);
        }
        
        me.setItemTpl(new Ext.XTemplate(
            '<span class="{[this.getVisibilityIconClass(values.layer)]} {[this.getDisplayInLayerSwitcherClass(values.layer)]}"></span>',
            '<span class="gxm-layer-item">{name}</span>',
            {
                // template member functions
                getVisibilityIconClass: function(layer) {
                    var cls = '';
                    
                    if (layer.isBaseLayer) {
                        if (layer.map.baseLayer === layer) {
                            cls = me.activeBaselayerCls;
                        } else {
                            cls = me.inactiveBaselayerCls;
                        }
                    } else {
                        if (layer.getVisibility()) {
                            cls = me.visibleOverlayCls;
                        } else {
                            cls = me.invisibleOverlayCls;
                        }
                    }
                    return cls;
                },
                getDisplayInLayerSwitcherClass: function(layer){
                    var cls = '';
                    
                    if (!Ext.isDefined(layer.displayInLayerSwitcher) || layer.displayInLayerSwitcher === true) {
                        cls = 'gxm-display-in-layerswitcher-true'
                    } else {
                        cls = 'gxm-display-in-layerswitcher-false'
                    }
                    
                    return cls;
                }
            }
        ));
        
        if (me.olMap) {
        	me.olMap.events.on({
                "changelayer": me.onChangeLayer,
                "addlayer": me.onChangeLayer,
                "removelayer": me.onChangeLayer,
                scope: me
            });
        }
        
        me.addListener('itemtap', me.reactOnItemTap, me);
        me.addListener('refresh', me.hideUndesiredRecords, me);    
        
        me.callParent();
    },
    
    /** private: method[prepareData]
     *  :param data: ``Object`` The raw data object that was used to create the
     *      record.
     *  :param index: ``Number`` the index number of the Record being prepared 
     *      for rendering.
     *  :param record: ``Record`` The Record being prepared for rendering.
     *  
     *  :return: ``Object`` the adjusted data with a new member ``layer`` 
     *      referencing the raw ``OpenLayers.Layer``-object
     *      
     *  A private method to give this DataViews template-methods access to the 
     *  raw ``OpenLayers.Layer``-object.
     */
    prepareData: function(data, index, record) {
        if (record) {
            data.layer = record.getLayer();
        }
        return data;
    },
    
    /** private: method[onItemTap]
     *  
     *  Hides the records having the layers with displayInLayerSwitcher=false
     */
    hideUndesiredRecords: function() {
        var allItems = this.getViewItems();
        
        Ext.each(allItems, function(domItem) {
            if (Ext.DomQuery.select('.gxm-display-in-layerswitcher-false', domItem).length > 0) {
                Ext.fly(domItem).addCls('gxm-display-in-layerswitcher-false')
            }
        });
    },
    
    /** private: method[onChangeLayer]
     *  :param evt: ``Ext.EventObject`` The event-object 
     *  
     *  Reloads the store and refreshes the lists UI so it reflects the current 
     *  state of layers managed by the list.
     */
    onChangeLayer: function(evt){
        this.refresh();
    },
    
    /** private: method[onItemTap]
     *  :param item: ``Ext.Element`` The listitem that was tapped
     *  :param index: ``Number`` The index inside the list
     *  :param e: ``Ext.EventObject`` The event-object 
     *  
     *  Called on item tap. Toggles visibility of the associated layers or sets
     *  the maps baselayer.
     */
    reactOnItemTap: function(dataview, index, target, record, e, eOpts){
        var layer = record.getLayer();
        if (layer.isBaseLayer) {
            this.olMap.setBaseLayer(layer);
        }
        else {
            layer.setVisibility(!layer.getVisibility());
        }
        this.refresh();
        return true;
    }
}, 

/**
 * Create an alias `ļayers` for :attr:`store` to have backwards compatibility
 */
function() {
    GXM.util.Base.createConfigAlias(GXM.LayerList, 'layers', 'store');
});
