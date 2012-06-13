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
    
    requires: [
        'GXM.version',
        'GXM.data.LayerStore'
    ],
   
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
                '<span class="{[this.getVisibilityIconClass(values.layer)]}"></span>',
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
                }
            }
        ));
        
        if (me.olMap) {
            me.olMap.events.on({
                "changelayer": me.onChangeLayer,
                "addlayer": me.onAddLayer,
                "removelayer": me.onRemoveLayer,
                scope: me
            });
        }
        
        me.addListener('itemtap', me.reactOnItemTap, me);
        
        var internalLayerStore = me.createInternalLayerStore(me.getStore().data.items);
        me.setStore(internalLayerStore);
        
        me.callParent();
    },
    
    /** private: method[createStoreClone]
     * 
     * :param originalData: ``Array`` The original records of the layer store with all possible layers
     *   of the passed map
     * :return: ``GXM.data.LayerStore`` the new LayerStore instance with the layers to be drawn in the LayerList
     *   
     * A private method creating a new LayerStore instance containing only the layers which should be displayed
     *   in the LayerList. This becomes necessary due to the remove 'collecData' method of the Ext.dataview.ListView 
     *   since Sencha Touch 2.0 and the fact that the original layer store has to be unfiltered/untouched due to
     *   possible references.
     * 
     */
    createInternalLayerStore: function(originalData) {
        
        var dspLayers = [];
        Ext.each(originalData, function (record, idx){
            var layer = record.getLayer();
            if (!Ext.isDefined(layer.displayInLayerSwitcher) || layer.displayInLayerSwitcher === true) {
                record.name = record.get('name');
                dspLayers.push(record.raw);
            } 
        }, this);
        
        var newStore = Ext.create('GXM.data.LayerStore', {
            data: dspLayers
        });
        
        return newStore;
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
    
    /** private: method[onAddLayer]
     *  :param evt: ``Ext.EventObject`` The event-object 
     *  
     *  Adds the new layer to the internal LayerStore instance.
     *  Reloads the store and refreshes the lists UI so it reflects the current 
     *  state of layers managed by the list.
     */
    onAddLayer: function(evt) {
        if(evt && evt.layer) {
            this.getStore().add(evt.layer);
        }
    },
    
    /** private: method[onRemoveLayer]
     *  :param evt: ``Ext.EventObject`` The event-object 
     *  
     *  Removes the layer from the internal LayerStore instance, which has been removed
     *  from the map.
     *  Reloads the store and refreshes the lists UI so it reflects the current 
     *  state of layers managed by the list.
     */
    onRemoveLayer: function(evt) {
        if(evt && evt.layer) {
            var layer = evt.layer;
            var record = this.getStore().findRecord('id', layer.id);
            this.getStore().remove(record);
        }
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
    },
    
    /** private: method[destroy]
     *  
     *  Called prior to destroying the list. We remove all our registered 
     *  handlers and nullify relevant properties.
     */
    destroy: function(){
        if (this.olMap && this.olMap.events) {
            
            this.olMap.events.un({
                "changelayer": this.onChangeLayer,
                "addlayer": this.onAddLayer,
                "removelayer": this.onRemoveLayer,
                scope: this
            });            
        }
        delete this.olMap;
        delete this.map;
        delete this.store;
        delete this.layers;
        
        this.callParent();
    }
}, 

/**
 * Create an alias `ļayers` for :attr:`store` to have backwards compatibility
 */
function() {
    GXM.util.Base.createConfigAlias(GXM.LayerList, 'layers', 'store');
});
