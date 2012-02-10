/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full text of
 * the license.
 */

/**
 * @requires GXM/data/LayerStore.js
 */
// Ext.ns is technically not needed, since the above require-directive
Ext.ns('GXM');

/** api: (define)
 *  module = GXM
 *  class = LayerList
 *  base_link = `Ext.List <http://dev.sencha.com/deploy/touch/docs/?class=Ext.List>`_
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
 *        mapPanel: mapPanel,
 *        // ... or with layers and map, e.g.
 *        // layers: mapPanel.layers,
 *        // map: map,
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
 *      The class that is used to build a GXM list of layers.
 */
GXM.LayerList = Ext.extend(Ext.List, {
    
    /** api: config[layers]
     * 
     *  :class:``GXM.data.LayerStore`` The layerstore this list is about to use.
     */
    
    /** api: property[layers]
     *
     *  :class:``GXM.data.LayerStore`` The layerstore this list uses.
     */
    layers: null,
    
    /** api: config[mapPanel] 
     * 
     *  ``GXM.MapPanel`` The MapPanel this list belongs to. Might be used to 
     *  derive the :attr:`map` and the :attr:`layers`
     */

    /** api: property[mapPanel]
     * 
     *  ``GXM.MapPanel`` The MapPanel of this list.
     */
    mapPanel: null,
    
    /** api: config[map]
     * 
     *  ``OpenLayers.Map`` The map that the Layer-records belong to.
     */

    /** api: property[map]
     * 
     *  ``OpenLayers.Map`` The map that the Layer-records belong to.
     */
    map: null,
    
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
    
    
    /** private: method[initComponent]
     * 
     *  Initializes the layerlist.
     */
    initComponent: function(){
        
        if (this.mapPanel && this.mapPanel instanceof GXM.MapPanel) {
            this.map = this.mapPanel.map;
            this.store = this.mapPanel.layers;
        } else {
            this.store = this.layers || this.store;
        }
        
        // we need a reference inside of the XTemplate-member functions for the 
        // different list-item classes.
        var me = this;
        this.itemTpl = new Ext.XTemplate(
            '<span class="{[this.getVisibilityIconClass(values)]}"></span>',
            '<span class="gxm-layer-item">{name}</span>',
            {
                // template member functions
                getVisibilityIconClass: function(record) {
                    var cls = '',
                        layer = record.getLayer();
                    
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
        );

        if (this.map) {
            this.map.events.on({
                "changelayer": this.onChangeLayer,
                "addlayer": this.onChangeLayer,
                "removelayer": this.onChangeLayer,
                scope: this
            });
        }
        
        GXM.LayerList.superclass.initComponent.call(this);
    },
    
    /** private: method[collectData]
     * :param originalData: ``Array`` An Array of Ext.data.Models to be rendered
     *     into the List.
     * 
     *  Overwrite the collectData function of ``Ext.List`` in order
     *  to have a filtered set of layer records to be rendered within this
     *  ``LayerList``. Only those layers are being displayed, that have the 
     *  OpenLayers property ``displayInLayerSwitcher`` truthy. Advantage hereby 
     *  (compaired to filtering) is that the original records of the layerstore
     *  are not affected and so it is always in sync with the ``MapPanel``.
     */
    collectData: function(originalData) {
        var dspRecords = [];
        Ext.each(originalData, function (record){
            var layer = record.getLayer();
            if (!Ext.isDefined(layer.displayInLayerSwitcher) || layer.displayInLayerSwitcher === true) {
                record.name = record.get('name');
                dspRecords.push(record);
            }
        });
        return dspRecords;
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
     *  :param item: ``Ext.Element`` The listitem that was tapped
     *  :param index: ``Number`` The index inside the list
     *  :param e: ``Ext.EventObject`` The event-object 
     *  
     *  Called on item tap. Toggles visibility of the associated layers or sets
     *  the maps baselayer.
     */
    onItemTap: function(item, index, e){
        var record = this.getStore().getAt(index);
        var layer = record.getLayer();
        if (layer.isBaseLayer) {
            this.map.setBaseLayer(layer);
        }
        else {
            layer.setVisibility(!layer.getVisibility());
        }
        this.refresh();
        GXM.LayerList.superclass.onItemTap.call(this, arguments);
    },
    
    /** private: method[onChangeLayer]
     *  :param evt: ``Ext.EventObject`` The event-object 
     *  
     *  Reloads the store and refreshes the lists UI so it reflects the current 
     *  state of layers managed by the list.
     */
    onChangeLayer: function(evt){
        //TODO: check whether this.store.load is enough (no argument passed).
        this.store.load(this.mapPanel.layers);
        this.refresh();
    },
    
    /** private: method[beforeDestroy]
     *  
     *  Called prior to destroying the list. We remove all our registered 
     *  handlers and nullify relevant properties.
     */
    beforeDestroy: function(){
        if (this.map && this.map.events) {
            this.map.events.un({
                "changelayer": this.onChangeLayer,
                "addlayer": this.onChangeLayer,
                "removelayer": this.onChangeLayer,
                scope: this
            });            
        }
        delete this.map;
        delete this.mapPanel;
        delete this.store;
        delete this.layers;
        
        GXM.LayerList.superclass.beforeDestroy.call(this);
    }
});

/** api: xtype = gxm_layerlist */
Ext.reg('gxm_layerlist', GXM.LayerList);
