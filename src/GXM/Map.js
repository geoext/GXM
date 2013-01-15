/*global Ext: true, OpenLayers: true, GXM: true, window: true */
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
 * @class GXM.Map
 * The class that is used to build a GXM map.
 *
 *  Sample code to create a GXM.Map that fills the whole screen:
 *
 *      Ext.setup({
 *          onReady: function(){
 *              var mp = Ext.create('GXM.Map', {
 *                  fullscreen: true,
 *                  layers: [
 *                     // an array of OpenLayers.Layer-objects
 *                  ],
 *                  // set the center of the map
 *                  mapCenter: [8, 51],
 *                  // control the initial zoomlevel
 *                  mapZoom: 11
 *              });
 *          } // end of the onReady-funcion
 *      });
 *
 *
 */
Ext.define('GXM.Map', {

    requires: [
        'GXM.version',
        'GXM.util.Base',
        'GXM.data.LayerStore'
    ],

    extend: 'Ext.Component',
    xtype: 'gxm_map',

    /**
     * Fires after every map move.
     *
     * @event aftermapmove
     */
    /**
     * Fires after every layer visibility change in the assigned map.
     *
     * @event afterlayervisibilitychange
     */
    /**
     * Fires after every layer order change in the assigned map.
     *
     * @event afterlayerorderchange
     */
    /**
     * Fires after every layer name change in the assigned map.
     *
     * @event afterlayernamechange
     */
    /**
     * Fires after every layer opacity change in the assigned map.
     *
     * @event afterlayeropacitychange
     */
    /**
     * Fires after a layer was added to the assigned map.
     *
     * @event afterlayeradd
     */
    /**
     * Fires after a layer was removed from the assigned map.
     *
     * @event afterlayerremove
     */

    statics: {
        /**
         * The first map found via an the Ext.ComponentQuery.query
         * manager.
         *
         * Convenience function for guessing the map of an application.
         * This can reliably be used for all applications that just have one map
         * in the viewport.
         *
         * @return {GXM.Map}
         * @static
         */
        guess: function () {
            var candidates = Ext.ComponentQuery.query("gxm_map");
            return ((candidates && candidates.length > 0)
                ? candidates[0]
                : null);
        }
    },

    // both 'layers' and 'controls' are not defined via 'config'-object,
    // so that we do not ave to decide what happens on call of e.g.
    // setLayers() / setControls()

    /**
     *  @cfg {OpenLayers.Layer[]} layers
     *  The layers provided here will be added to this MapPanel's map.
     */

    /**
     *  @property {GXM.data.LayerStore} layers
     * A store containing gxm_layer-model instances.
     */
    layers: null,

    /**
     *  @cfg {OpenLayers.Control[]} controls
     *  The layers provided here will be added to this MapPanel's map.
     */
    controls: null,

    /**
     * @private {Boolean} olMapAutocreated
     * @readonly
     *
     * We need to track whether we create the OpenLayers.Map this component
     * uses, so we can decide whether we need to destroy it when the GXM.Map
     * is being destroyed.
     */
    olMapAutocreated: null,


    config: {

        /**
         *  @cfg {OpenLayers.Map/Object} map
         *  A configured map or a configuration object for the map constructor.
         *  A configured map will be available after construction through the :func:`getMap()` function.
         */
        map: null,

        /**
         *  @cfg {OpenLayers.LonLat/Number[]/String} mapCenter
         *  A location for the initial map center. If an array is provided, the first two items should
         *  represent x & y coordinates. If a string is provided, it should consist of a x & y coordinate
         *  seperated by a comma.
         */

        mapCenter: null,

        /**
         * @cfg {Number} mapZoom
         * An initial zoom level for the map.
         */
        mapZoom: null,

        /**
         *  @cfg {OpenLayers.Bounds/Number[]} mapExtent
         *  An initial extent for the map (used if center and zoom are not provided.
         *  If an array, the first four items should be minx, miny, maxx, maxy.
         */
        mapExtent: null
    },

    /**
     * @private
     * The constructor function.
     */
    constructor: function (config) {

        if (config.map instanceof OpenLayers.Map) {
            this.olMapAutocreated = false;
            this._map = config.map;
            delete config.map;
        }
        if (config.mapCenter instanceof OpenLayers.LonLat) {
            this._mapCenter = config.mapCenter;
            delete config.mapCenter;
        }
        if (config.mapExtent instanceof OpenLayers.Bounds) {
            this._mapExtent = config.mapExtent;
            delete config.mapExtent;
        }

        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);

        if (!window.OpenLayers) {
            this.setHtml('OpenLayers is required');
        }
    },

    /**
     * @private
     * Initializes the Component.
     */
    initialize: function () {

        this.callParent();

        // check config-property map for an existing OpenLayers.Map-instance,
        // a conf object for an OpenLayers.Map or null
        if (!(this.getMap() instanceof OpenLayers.Map)) {
            var mapConf = Ext.applyIf(this.getMap() || {}, {
                allOverlays: true,
                controls: this.initialConfig.controls || this.getDefaultControls(),
                numZoomLevels: 24
            });
            this.setMap(new OpenLayers.Map(mapConf));
            this.olMapAutocreated = true;
        } else {
            // add any additionally configured controls:
            if (this.initialConfig.controls) {
                this.getMap().addControls(this.initialConfig.controls);
            }
        }

        // check property layers
        if (this.config.layers) {
            var layers = this.config.layers;

            if (this.config.layers instanceof GXM.data.LayerStore) {
                var arr = [];
                this.config.layers.each(function (rec) {
                    arr.push(rec.getLayer());
                });
                layers = arr;
            }

            this.getMap().addLayers(layers);
        }

        this.layers = Ext.create('GXM.data.LayerStore', {
            data: this.getMap().layers
        });

        // check config-property center
        if (Ext.isString(this.getMapCenter())) {
            this.setMapCenter(OpenLayers.LonLat.fromString(this.getMapCenter()));
        } else if (Ext.isArray(this.getMapCenter())) {
            this.setMapCenter(OpenLayers.LonLat.fromArray(this.getMapCenter()));
        }

        // check config-property extent
        if (Ext.isString(this.getMapExtent())) {
            this.setMapExtent(OpenLayers.Bounds.fromString(this.getMapExtent()));
        } else if (Ext.isArray(this.getMapExtent())) {
            this.setMapExtent(OpenLayers.Bounds.fromArray(this.getMapExtent()));
        }

        // bind various listeners to the corresponding OpenLayers.Map-events
        this.getMap().events.on({
            "moveend": this.onMoveend,
            "changelayer": this.onChangelayer,
            "addlayer": this.onAddlayer,
            "removelayer": this.onRemovelayer,
            scope: this
        });

        this.on({
            painted: 'renderMap',
            scope: this
        });

        this.element.on('touchstart', 'onTouchStart', this);
    },

    /**
     * @private
     * makes the event unpreventable
     */
    onTouchStart: function (e) {
        e.makeUnpreventable();
    },

    /**
     * @private
     *  Returns an array of OpenLayers.Control-instances to be used
     *  when no explicit controls were given.
     */
    getDefaultControls: function () {
        return [
            new OpenLayers.Control.TouchNavigation(),
            new OpenLayers.Control.Attribution()
        ];
    },

    /**
     * @private
     *  The internal method that explicitly renders the map into the dom-element
     *  of this component. Calls OpenLayers.Map::render to get the map div
     *  populated.
     */
    renderMap: function () {
        var me = this,
            map = me.getMap();

        // This is taken from the Sencha-Touch Map-component and ensures that
        // there is no child element inside the target div we wish to render the
        // Map in.
        // TODO: evaluate whether this is enough or whether we need an iteration
        //       on child elements

//        if (me.element && me.element.dom && me.element.dom.firstChild) {
//            Ext.fly(me.element.dom.firstChild).destroy();
//        }

        map.render(me.element.dom);

        // Adjust the geographic position according to the passed config-options
        if (!map.getCenter()) {
            if (me.getMapCenter() || me.getMapZoom()) {
                // center and/or zoom?
                map.setCenter(me.getMapCenter(), me.getMapZoom());
            } else if (me.getMapExtent() instanceof OpenLayers.Bounds) {
                // extent
                map.zoomToExtent(me.getMapExtent(), true);
            } else {
                map.zoomToMaxExtent();
            }
        }
    },

    /**
     * @private
     *  implicitly called whenever :func:`setMapCenter()` is called.
     */
    applyMapCenter: function (mapCenter) {
        var ll = null,
            me = this;
        if (Ext.isString(mapCenter)) {
            ll = OpenLayers.LonLat.fromString(mapCenter);
        } else if (Ext.isArray(mapCenter)) {
            ll = OpenLayers.LonLat.fromArray(mapCenter);
        } else {
            ll = mapCenter;
        }

        if (ll instanceof OpenLayers.LonLat) {
            if (me.isPainted()) {
                this.getMap().setCenter(ll);
            }
            return ll;
        }
    },

    /**
     * @private
     *  implicitly called whenever :func:`setMapExtent()` is called.
     */
    applyMapExtent: function (mapExtent) {
        var extent = null,
            me = this;
        if (Ext.isString(mapExtent)) {
            extent = OpenLayers.Bounds.fromString(mapExtent);
        } else if (Ext.isArray(mapExtent)) {
            extent = OpenLayers.Bounds.fromArray(mapExtent);
        } else {
            extent = mapExtent;
        }

        if (extent instanceof OpenLayers.Bounds) {
            if (me.isPainted()) {
                this.getMap().zoomToExtent(extent);
            }
            return extent;
        }
    },

    /**
     * @private
     *  The "moveend" listener bound to the :attr:`map`.
     */
    onMoveend: function () {
        this.fireEvent("aftermapmove");
    },

    /**
     * @private
     *  The "changelayer" listener bound to the :attr:`map`.
     */
    onChangelayer: function (e) {
        var me = this;
        if (e.property) {
            if (e.property === "visibility") {
                me.fireEvent("afterlayervisibilitychange");
            } else if (e.property === "order") {
                me.fireEvent("afterlayerorderchange");
            } else if (e.property === "name") {
                me.fireEvent("afterlayernamechange");
            } else if (e.property === "opacity") {
                me.fireEvent("afterlayeropacitychange");
            }
        }
    },

    /**
     * @private
     *  The "addlayer" listener bound to the :attr:`map`.
     */
    onAddlayer: function (olEvt) {
        var layer = olEvt.layer;
        this.layers.add(layer);
        this.fireEvent("afterlayeradd");
    },

    /**
     * @private
     *  The "removelayer" listener bound to the :attr:`map`.
     */
    onRemovelayer: function (olEvt) {
        var layer = olEvt.layer;
        var record = this.layers.findRecord('id', layer.id);
        if(record) {
            this.layers.remove(record);
        }
        this.fireEvent("afterlayerremove");
    },

    /**
     * @private
     *
     * Private method called during the destroy sequence.
     */
    destroy: function () {
        var me = this;
        if (me.getMap() && me.getMap().events) {
            me.getMap().events.un({
                "moveend": me.onMoveend,
                "changelayer": me.onChangelayer,
                "addlayer": me.onAddlayer,
                "removelayer": me.onRemovelayer,
                scope: me
            });
        }
        // if the map panel was passed a map instance, this map instance
        // is under the user's responsibility
        if (me.olMapAutocreated === true) {
            if (me.getMap() && me.getMap().destroy) {
                me.getMap().destroy();
            }
        }
        delete me._map;
        delete me._layers;

        this.callParent();
    }
},


     function () {
        GXM.util.Base.createConfigAlias(GXM.Map, 'center', 'mapCenter');
        GXM.util.Base.createConfigAlias(GXM.Map, 'zoom', 'mapZoom');
        GXM.util.Base.createConfigAlias(GXM.Map, 'extent', 'mapExtent');
        // deprecate the old class "GXM.MapPanel" but keep it for this version for
        // backwards compatibility
        /**
         * @class GXM.MapPanel
         * The class ensures the backwards compatibility to GXM 0.1
         * The class GXM.MapPanel is deprecated, please use GXM.Map instead
         * @deprecated
         */
        Ext.define('GXM.MapPanel', {
            // possibly better suited would be override, but this works.
            extend: 'GXM.Map',
            initialize: function (config) {
                //<debug warn>
                Ext.Logger.deprecate("The class 'GXM.MapPanel' is deprecated, please use 'GXM.Map' instead", this);
                //</debug>
                this.callParent(arguments);
            }
        });
    });
