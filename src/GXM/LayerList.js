/*global Ext: true, OpenLayers: true, GXM: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/* @requires GXM/version.js
 * @requires GXM/util/Base.js
 * @requires GXM/data/LayerStore.js
 */

/**
 * @class GXM.LayerList
 *
 * The class that is used to construct a GXM LayerList.
 *
 * Sample code to create a GXM.LayerList:
 *
 *
 * create a lazily instanciated GXM.LayerList:
 *      var layerList = {
 *          xtype: 'gxm_layerlist',
 *          // call with mapPanel...
 *          map: gxmMap,
 *          listeners: {
 *              itemtap: function(){
 *                  Ext.Msg.alert(
 *                      'Application event "itemtap"',
 *                      'You can still register events as usual.'
 *                  );
 *              }
 *          }
 *      };
 */
Ext.define('GXM.LayerList', {
    extend: 'Ext.dataview.List',
    requires: [
        'GXM.version',
        'GXM.util.Base',
        'GXM.data.LayerStore'
    ],
    xtype: 'gxm_layerlist',

    /**
     * @property {OpenLayers.Map} olMap
     *  The reference to the related OpenLayers Map object.
     *  This is for readonly use. To pass a map object to this class use the
     *  :attr:`map` config option.
     */
    olMap: null,

    /**
     * @property {String} visibleOverlayCls
     *  The CSS class that the list items for currently visible
     *  overlay layers will get.
     */
    visibleOverlayCls: 'gxm-visible-overlay-indicator',

    /**
     * @property {String} invisibleOverlayCls
     * The CSS class that the list items for currently invisible
     * overlay layers will get.
     */
    invisibleOverlayCls: 'gxm-invisible-overlay-indicator',

    /**
     * @property {String} activeBaselayerCls
     * The CSS class that the list item of the currently active
     * baselayer will get.
     */
    activeBaselayerCls: 'gxm-active-baselayer-indicator',

    /**
     * @property {String} inactiveBaselyerCls
     * The CSS class that the list items of the currently inactive
     * baselayers will get.
     */
    inactiveBaselayerCls: 'gxm-inactive-baselayer-indicator',


    // These do all get a getter-, setter- and applier-method

    config: {

        /**
         * @cfg {GXM.Map} map
         * The GXM Map component this `LayerList` refers to. Might be used to
         * derive the corresponding OpenLayers Map object.
         */
        map: null,

        /**
         * @cfg {GXM.data.LayerStore} layers
         *  :class:`GXM.data.LayerStore` The layerstore this list is about to use.
         */
        store: null
    },

    /**
     * @private
     *  The constructor function
     */
    constructor: function (config) {
        this.callParent(arguments);
    },

    /**
     * @private
     *  Initializes the Component.
     */
    initialize: function () {
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
                getVisibilityIconClass: function (layer) {
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
     * A private method creating a new LayerStore instance containing only the layers which should be displayed
     * in the LayerList. This becomes necessary due to the remove 'collecData' method of the Ext.dataview.ListView
     * since Sencha Touch 2.0 and the fact that the original layer store has to be unfiltered/untouched due to
     * possible references.
     * @private
     * @param originalData {Array} The original records of the layer store with all possible layers of the passed map
     * @return {GXM.data.LayerStore} the new LayerStore instance with the layers to be drawn in the LayerList
     */
    createInternalLayerStore: function (originalData) {

        var dspLayers = [];
        Ext.each(originalData, function (record, idx) {
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
     *  @private
     *  A private method to give this DataViews template-methods access to the
     *  raw ``OpenLayers.Layer``-object.
     *  @param {Object} data The raw data object that was used to create the record.
     *  @param {Number} index the index number of the Record being prepared for rendering.
     *  @param {Record} record The Record being prepared for rendering.
     *  @return {Object} the adjusted data with a new member ``layer`` referencing the raw
     *  ``OpenLayers.Layer``-object
     */
    prepareData: function (data, index, record) {
        if (record) {
            data.layer = record.getLayer();
        }
        return data;
    },

    /**
     *     @private
     *  Adds the new layer to the internal LayerStore instance.
     *  Reloads the store and refreshes the lists UI so it reflects the current
     *  state of layers managed by the list.
     *  @param {Ext.EventObject} evt The event-object
     */
    onAddLayer: function (evt) {
        if (evt && evt.layer) {
            this.getStore().add(evt.layer);
        }
    },

    /**
     * @private
     *  Removes the layer from the internal LayerStore instance, which has been removed
     *  from the map.
     *  Reloads the store and refreshes the lists UI so it reflects the current
     *  state of layers managed by the list.
     *
     *  @param {Ext.EventObject} evt The event-object
     */
    onRemoveLayer: function (evt) {
        if (evt && evt.layer) {
            var layer = evt.layer;
            var record = this.getStore().findRecord('id', layer.id);
            this.getStore().remove(record);
        }
    },

    /** private: method[onChangeLayer
     * @private
     * Reloads the store and refreshes the lists UI so it reflects the current
     * state of layers managed by the list.
     * @param {Ext.EventObject} evt The event-object
     */
    onChangeLayer: function (evt) {
        this.refresh();
    },

    /** private: method[onItemTap]
     * @private
     * Called on item tap. Toggles visibility of the associated layers or sets
     * the maps baselayer.
     * @param {Ext.Element} item The listitem that was tapped
     * @param {Number} index The index inside the list
     * @param {Ext.EventObject} The event-object
     */
    reactOnItemTap: function (dataview, index, target, record, e, eOpts) {
        var layer = record.getLayer();
        if (layer.isBaseLayer) {
            this.olMap.setBaseLayer(layer);
        } else {
            layer.setVisibility(!layer.getVisibility());
        }
        this.refresh();
        return true;
    },

    /**
     *  @private
     *
     *  Called prior to destroying the list. We remove all our registered
     *  handlers and nullify relevant properties.
     */
    destroy: function () {
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

     // Create an alias `ļayers` for :attr:`store` to have backwards compatibility
     function () {
        GXM.util.Base.createConfigAlias(GXM.LayerList, 'layers', 'store');
    });
