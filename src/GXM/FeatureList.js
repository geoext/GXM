/*global Ext: true, GXM: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/* @requires GXM/version.js
 * @requires GXM/data/FeatureStore.js
 */

/**
 * @class GXM.FeatureList
 *
 *  The class that is used to construct a GXM FeatureList.
 *
 *  Sample code to create a GXM.FeatureList:
 *
 *
 *      var featureList = {
 *          xtype : 'gxm_featurelist',
 *          layer : layerVector,
 *          title : 'FeatureList',
 *          listeners : {
 *              itemtap : function(list, idx, target, record, e, eOpts) {
 *                  var feature = record.getFeature(),
 *                      geom = feature.geometry,
 *                      center = new OpenLayers.LonLat(geom.x, geom.y),
 *                      zoom = 5
 *                  mapPanel.getMap().setCenter(center, zoom);
 *                  tp.setActiveItem(mapPanel);
 *              }
 *          }
 *      };
 */
Ext.define('GXM.FeatureList', {

    extend: 'Ext.dataview.List',

    requires: [
        'GXM.version',
        'GXM.data.FeatureStore'
    ],

    xtype: 'gxm_featurelist',

    /**
     *  @property {OpenLayers.Layer.Vector} olLayer
     *  references the
     *  layer that was used to instantiate this list.
     */
    olLayer: null,

    config: {

        /**
         *  @cfg {GXM.Map} map
         *  The GXM Map component this `FeatureList` refers to. Might be used to derive
         *  the corresponding OpenLayers Map object.
         */
        map: null,

        /**
         *  @cfg {GXM.data.FeatureStore}
         *  The featurestore this list is about to use.
         */
        store: null,

        /**
         *  @cfg {OpenLayers.Layer.Vector} layer
         *  The layer this list is about to derive featuires from for display
         *  inside the list. Will override any existing configuration for :attr:`store`.
         */
        layer: null,

        /**
         *  @cfg {Ext.XTemplate} itemTpl
         *  The template used to render every list-item of the list of features.
         *  If not provided, a rudimentary template is being used.
         */
        itemTpl: null
    },

    /**
     *  @private
     *  The constructor function
     */
    constructor: function (config) {
        if (config.layer) {
            this._layer = config.layer;
            delete config.layer;
        }
        this.callParent(arguments);
    },

    /**
     *  @private
     *  Initializes the Component.
     */
    initialize: function () {

        var map = this.getMap();

        if (map && map instanceof GXM.Map) {
            this.olMap = map.getMap();
        }

        // TODO
        // Allow also initialization with an array of features

        var layer = this.getLayer();

        if (layer) {
            var features = layer.features;
            var store = Ext.create('GXM.data.FeatureStore', {
                data: features
            });
            this.setStore(store);

            // bind OL events
            layer.events.on({
                "featuremodified": this.onFeatureModified,
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
                '{[this.renderFeatureListItem(values.feature)]}',
                {
                    renderFeatureListItem: function (feature) {
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

    /**
     *  @private
     *  @param {Ext.EventObject} evt The event-object
     */
    onFeatureModified: function(evt) {
        var rec = this.getStore().findRecord("id", evt.feature.id);
        rec.set('feature', evt.feature);
    },

    /**
     *  @private
     *  A private method to give this DataViews template-methods access to the
     *  raw ``OpenLayers.Feature``-object.
     *  @param {Object} data The raw data object that was used to create the record.
     *  @param {Number} index the index number of the Record being prepared for rendering.
     *  @param {Recod} record The Record being prepared for rendering
     *  @return {Object} the adjusted data with a new member ``feature`` referencing the
     *  raw ``OpenLayers.Feature``-object
     */
    prepareData: function (data, index, record) {
        if (record) {
            data.feature = record.getFeature();
        }
        return data;
    },

    /**
     *  @private
     *  @param {Ext.EventObject} evt The event-object
     */
    onFeatureAdded: function (evt) {
        this.getStore().add(evt.feature);
    },

    /**
     *  @private
     *  @param {Ext.EventObject} evt The event-object
     */
    onFeatureRemoved: function (evt) {
        var store = this.getStore(),
            rec = store.findRecord("id", evt.feature.id);

        this.getStore().remove(rec);
    },

    /**
     *  @private
     *  Called prior to destroying the list. We remove all our registered
     *  handlers and nullify relevant properties.
     */
    destroy: function () {
        var layer = this.getLayer();
        if (layer && layer.events) {
            layer.events.un({
                "featureadded": this.onFeatureAdded,
                "featureremoved": this.onFeatureRemoved,
                "featuremodified": this.onFeatureModified,
                scope: this
            });
        }

        this.callParent();
    }
});
