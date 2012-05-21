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
 * @requires GXM/util/Base.js
 */

/** api: (define)
 *  module = GXM
 *  class = Map
 *  base_link = `Ext.Component <http://docs.sencha.com/touch/2-0/#!/api/Ext.Component>`_
 */

/** api: example
 *  Sample code to create a GXM.Map that fills the whole screen:
 * 
 *  .. code-block:: javascript
 *  
 *    Ext.setup({
 *        onReady: function(){
 *            var mp = Ext.create('GXM.Map', {
 *                layers: [            
 *                    // an array of OpenLayers.Layer-objects
 *                ],
 *                // set the center of the map
 *                mapCenter: [8, 51],
 *                // control the initial zoomlevel
 *                mapZoom: 11
 *            });
 *        } // end of the onReady-funcion
 *    });
 *    
 */

/** api: constructor
 *  .. class:: Map(config)
 *   
 *      The class that is used to build a GXM map.
 */
Ext.define('GXM.Map', {
    
    extend: 'Ext.Component',
    xtype : 'gxm_map',
    isMap: true,
    
    // both 'layers' and 'controls' are not defined via 'config'-object,
    // so that we do not ave to decide what happens on call of e.g.
    // setLayers() / setControls()
    
    /** api: config[layers]
     * 
     *  ``Array(OpenLayers.Layer)``
     *  The layers provided here will be added to this MapPanel's map.
     */
    
    /** api: property[layers]
     * 
     *  :class:`GXM.data.LayerStore`  A store containing gxm_layer-model 
     *  instances.
     */
    layers: null,
    
    /** api: config[controls]
     * 
     *  ``Array(OpenLayers.Control)``
     *  The layers provided here will be added to this MapPanel's map.
     */
    controls: null,
    
    config: {
    	
        /** api: config[map]
         * 
         *  ``OpenLayers.Map or Object``  A configured map or a configuration object
         *  for the map constructor.  A configured map will be available after
         *  construction through the :func:`getMap()` function.
         */
        map: null,
        
        /** api: config[mapCenter]
         * 
         *  ``OpenLayers.LonLat, Array(Number) or String``  A location for the 
         *  initial map center.  If an array is provided, the first two items should
         *  represent x & y coordinates. If a string is provided, it should consist
         *  of a x & y coordinate seperated by a comma.
         */
        mapCenter: null,
        
        /** api: config[mapZoom]
         * 
         *  ``Number``  An initial zoom level for the map.
         */
        mapZoom: null,
        
        /** api: config[mapExtent]
         * 
         *  ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map 
         *  (used if center and zoom are not provided.  If an array, the first four 
         *  items should be minx, miny, maxx, maxy.
         */
        mapExtent: null,

        /**
         * api: config[geo]
         *
         * ``Ext.util.Geolocation``
         * Geolocation provider for the map.
         */
        geo: null,

        /**
         * api: config[useCurrentLocation]
         *
         * ``Boolean`` or ``Ext.util.Geolocation``
         * Pass in true to center the map based on the geolocation coordinates or pass a
         * ``Ext.util.Geolocation GeoLocation`` config to have more control over your GeoLocation options
         */
        useCurrentLocation: false

    },
    
    /** private: method[constructor]
     * 
     *  The constructor function
     */
    constructor: function(config) {
        
        if (config.map instanceof OpenLayers.Map) {
            this._map = config.map;
            delete config.map;
        }
        
        this.callParent(arguments);
        this.element.setVisibilityMode(Ext.Element.OFFSETS);
    
        if (!window.OpenLayers) {
            this.setHtml('OpenLayers is required');
        }
    },
    
    /** private: method[initialize]
     * 
     *  Initializes the Component.
     */
    initialize: function() {
        
        this.callParent();
        
        // check config-property map for an existing OpenLayers.Map-instance, 
        // a conf object for an OpenLayers.Map or null
        if ( !(this.getMap() instanceof OpenLayers.Map) ) {
            var mapConf = Ext.applyIf(this.getMap() || {}, {
                allOverlays: true,
                controls: this.initialConfig.controls || this.getDefaultControls(),
                numZoomLevels: 24
            });
            this.setMap(new OpenLayers.Map(mapConf));
        } else {
            // add any additionally configured controls:
            if (this.initialConfig.controls) {
                this.getMap().addControls(this.initialConfig.controls);
            }
        }
        
        // check property layers
        if ( this.config.layers ) {
            var layers = this.config.layers;
            
            if(this.config.layers instanceof GXM.data.LayerStore) {
                var arr = [];
                this.config.layers.each(function(rec){
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
        if ( Ext.isString(this.getMapCenter()) ) {
            this.setMapCenter(OpenLayers.LonLat.fromString(this.getMapCenter()));
        } else if(Ext.isArray(this.getMapCenter())) {
            this.setMapCenter(OpenLayers.LonLat.fromArray(this.getMapCenter()));
        } 
        
        // check config-property extent
        if ( Ext.isString(this.getMapExtent()) ) {
            this.setMapExtent(OpenLayers.Bounds.fromString(this.getMapExtent()));
        } else if(Ext.isArray(this.getMapExtent())) {
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
        window.m= this;
        this.element.on('touchstart', 'onTouchStart', this);
    },

    /** private: method[onTouchStart]
     * 
     *  ``Function`` makes the event unpreventable 
     */
    onTouchStart: function(e) {
        e.makeUnpreventable();
    },
    
    /** private: method[getDefaultControls]
     * 
     *  ``Function`` Returns an array of OpenLayers.Control-instances to be used
     *  when no explicit controls were given. 
     */
    getDefaultControls: function() {
        return [
            new OpenLayers.Control.TouchNavigation(),
            new OpenLayers.Control.Attribution()
        ];   
    },
    
    /** private: method[renderMap]
     * 
     *  The internal method that explicitly renders the map into the dom-element
     *  of this component. Calls OpenLayers.Map::render to get the map div 
     *  populated.
     */ 
    renderMap: function(){
        var me = this;
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
            if (me.getMapCenter() || me.getMapZoom() ) {
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
    
    /** private: method[applyMapCenter]
     * 
     *  ``Function`` implicitly called whenever :func:`setMapCenter()` is called.
     */
    applyMapCenter: function(mapCenter) {
        var ll = null,
            me = this;
        if ( Ext.isString(mapCenter) ) {
            ll = OpenLayers.LonLat.fromString(mapCenter);
        } else if(Ext.isArray(mapCenter)) {
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
    
    /** private: method[applyMapExtent]
     * 
     *  ``Function`` implicitly called whenever :func:`setMapExtent()` is called.
     */
    applyMapExtent: function(mapExtent) {
        var extent = null,
            me = this;
        if ( Ext.isString(mapExtent) ) {
            extent = OpenLayers.Bounds.fromString(mapExtent);
        } else if(Ext.isArray(mapExtent)) {
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
    
   /** private: method[onMoveend]
    *
    *  The "moveend" listener bound to the :attr:`map`.
    */
   onMoveend: function() {
       this.fireEvent("aftermapmove");
   },

   /** private: method[onChangelayer]
    *  :param e: ``Object``
    *
    *  The "changelayer" listener bound to the :attr:`map`.
    */
   onChangelayer: function(e) {
       var me = this;
       if(e.property) {
           if(e.property === "visibility") {
               me.fireEvent("afterlayervisibilitychange");
           } else if(e.property === "order") {
               me.fireEvent("afterlayerorderchange");
           } else if(e.property === "name") {
               me.fireEvent("afterlayernamechange");
           } else if(e.property === "opacity") {
               me.fireEvent("afterlayeropacitychange");
           }
       }
   },

   /** private: method[onAddlayer]
    * 
    *  The "addlayer" listener bound to the :attr:`map`.
    */
   onAddlayer: function(olEvt) {
       var layer = olEvt.layer;
       this.layers.add(layer); 
       this.fireEvent("afterlayeradd");
   },

   /** private: method[onRemovelayer]
    * 
    *  The "removelayer" listener bound to the :attr:`map`.
    */
   onRemovelayer: function(olEvt) {
       var layer = olEvt.layer;
       var record = this.layers.findRecord('id', layer.id);
       this.layers.remove(record); 
       this.fireEvent("afterlayerremove");
   },

    /**
     * private: method[onGeoUpdate]
     */
    onGeoUpdate: function(geo) {
        if (geo) {
            var lonlat = new OpenLayers.LonLat(geo.getLongitude(), geo.getLatitude());
            lonlat = lonlat.transform(new OpenLayers.Projection("EPSG:4326"),
                this.getMap().getProjectionObject());
            this.setMapCenter(lonlat);
        }
    },

    updateUseCurrentLocation: function(useCurrentLocation) {
        this.setGeo(useCurrentLocation);
        if (!useCurrentLocation) {
            this.renderMap();
        }
    },

    applyGeo: function(config) {
        return Ext.factory(config, Ext.util.Geolocation, this.getGeo());
    },

    updateGeo: function(newGeo, oldGeo) {
        var events = {
            locationupdate : 'onGeoUpdate',
            locationerror : 'onGeoError',
            scope : this
        };

        if (oldGeo) {
            oldGeo.un(events);
        }

        if (newGeo) {
            newGeo.on(events);
            newGeo.updateLocation();
        }
    }

}, 

/** api: constructor
 *  .. class:: MapPanel(config)
 *   
 *      The class ensures the backwards compatibility to GXM 0.1
 */
function() {
    // deprecate the old class "GXM.MapPanel" but keep it for this version for
    // backwards compatibility
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
    
    GXM.util.Base.createConfigAlias(GXM.Map, 'center', 'mapCenter');
    GXM.util.Base.createConfigAlias(GXM.Map, 'zoom', 'mapZoom');
    GXM.util.Base.createConfigAlias(GXM.Map, 'extent', 'mapExtent');
});
