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
 *  class = MapPanel
 *  base_link = `Ext.Component <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Component>`_
 */

/** api: example
 *  Sample code to create a GXM.MapPanel that fills the whole screen:
 * 
 *  .. code-block:: javascript
 *  
 *    Ext.setup({
 *        onReady: function(){
 *            var mp = new GXM.MapPanel({
 *                layers: [            
 *                    // an array of OpenLayers.Layer-objects
 *                ],
 *                // set the center of the map
 *                center: [8, 51],
 *                // control the initial zoomlevel
 *                zoom: 11
 *            });
 *        } // end of the onReady-funcion
 *    });
 *    
 */

/** api: constructor
 *  .. class:: MapPanel(config)
 *   
 *      The class that is used to build a GXM map.
 */
//TODO: rename to GXM.Map, since this is not a Panel
GXM.MapPanel = Ext.extend(Ext.Component, {
    /** api: config[map]
     * 
     *  ``OpenLayers.Map or Object``  A configured map or a configuration object
     *  for the map constructor.  A configured map will be available after
     *  construction through the :attr:`map` property.
     */

    /** api: property[map]
     * 
     *  ``OpenLayers.Map`` An OpenLayers-Map-instance.
     */
    map: null,
    
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
    
    /** api: config[center]
     * 
     *  ``OpenLayers.LonLat, Array(Number) or String``  A location for the 
     *  initial map center.  If an array is provided, the first two items should
     *  represent x & y coordinates. If a string is provided, it should consist
     *  of a x & y coordinate seperated by a comma.
     */
    center: null,
    
    /** api: config[zoom]
     * 
     *  ``Number``  An initial zoom level for the map.
     */
    zoom: null,
    
    /** api: config[extent]
     * 
     *  ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map 
     *  (used if center and zoom are not provided.  If an array, the first four 
     *  items should be minx, miny, maxx, maxy.
     */
    extent: null,
    
    /** api: config[fullscreen]
     * 
     *  ``Boolean`` Shall this component be rendered to fill the full screen of 
     *  the device? Defaults to ``true``.
     */
    //TODO: do we really wish to have this fullscreen?
    //TODO: is this in any case a usefull default?
    fullscreen: true,
    
    /** private: property[monitorResize]
     * 
     *  ``Boolean`` Shall we monitor resize of the element we are rendered in?
     *  Defaults to ``true``.
     */
    // set monitorResize to true just as the original Map-component of 
    // Sencha Touch does (Review BvdE).
    monitorResize: true,
    
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
    
    /** private: method[initComponent]
     * 
     *  Initializes the Component.
     */
    initComponent: function(){
        var me = this;
        // set scroll to false just as the original Map-component of 
        // Sencha Touch does (Review BvdE).
        me.scroll = false;
        
        // check config-property map for an existing OpenLayers.Map-instance, a
        // conf object for an OpenLayers.Map or null
        if ( !(me.map instanceof OpenLayers.Map) ) {
            var mapConf = Ext.applyIf(me.map || {}, {
                allOverlays: true,
                controls: me.initialConfig.controls || me.getDefaultControls()
            });
            me.map = new OpenLayers.Map(mapConf);
        } else {
            // add any additionally configured controls:
            if (me.initialConfig.controls) {
                me.map.addControls(me.initialConfig.controls);
            }
        }
        // this.map is now initialized in any case and has needed and
        // configured controls
        
        // check config-property layers for any layers to be added to the map
        if ( me.layers ) {
            // normalize the case where this.layers was not an array but a layer 
            if(me.layers instanceof OpenLayers.Layer) {
                me.layers = [me.layers];
            }
            
            //TODO: this possibly requests data from the layers to early
            // we might move this e.g. to the renderMap-method
            me.map.addLayers(me.layers);
            
        }
        
        // create a layerstore with the current maps layers
        me.layers = new GXM.data.LayerStore({
            data: me.map.layers
        });
        
        // check config-property controls
        if ( me.controls ) {
            // normalize the case where this.controls was not an array but a control 
            if(me.controls instanceof OpenLayers.Control) {
                me.controls = [me.controls];
            }
            me.map.addControls(me.controls);
        }
        
        // check config-property center
        if ( Ext.isString(me.center) ) {
            me.center = OpenLayers.LonLat.fromString(me.center);
        } else if(Ext.isArray(me.center)) {
            // see: http://trac.osgeo.org/openlayers/ticket/3433
            // me.center = OpenLayers.LonLat.fromArray(me.center);
            me.center = new OpenLayers.LonLat(me.center[0], me.center[1]); 
        } 
        
        // check config-property extent
        if ( Ext.isString(me.extent) ) {
            me.extent = OpenLayers.Bounds.fromString(me.extent);
        } else if(Ext.isArray(me.extent)) {
            me.extent = OpenLayers.Bounds.fromArray(me.extent);
        }
        
        // call the superclass constructor
        GXM.MapPanel.superclass.initComponent.call(me);
        
        // events        
        //TODO: discuss whether we need our own mapping to the OpenLayers-Events
        me.addEvents(
            /** private: event[aftermapmove]
             * 
             *  Fires after the map is moved.
             */
            "aftermapmove",

            /** private: event[afterlayervisibilitychange]
             * 
             *  Fires after a layer changed visibility.
             */
            "afterlayervisibilitychange",

            /** private: event[afterlayeropacitychange]
             * 
             *  Fires after a layer changed opacity.
             */
            "afterlayeropacitychange",

            /** private: event[afterlayerorderchange]
             * 
             *  Fires after a layer order changed.
             */
            "afterlayerorderchange",

            /** private: event[afterlayernamechange]
             * 
             *  Fires after a layer name changed.
             */
            "afterlayernamechange",

            /** private: event[afterlayeradd]
             * 
             *  Fires after a layer added to the map.
             */
            "afterlayeradd",

            /** private: event[afterlayerremove]
             * 
             *  Fires after a layer removed from the map.
             */
            "afterlayerremove"
        );
        
        // bind various listeners to the corresponding OpenLayers.Map-events
        me.map.events.on({
            "moveend": me.onMoveend,
            "changelayer": me.onChangelayer,
            "addlayer": me.onAddlayer,
            "removelayer": me.onRemovelayer,
            scope: me
        });
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
    onAddlayer: function() {
        this.layers.load();
        this.fireEvent("afterlayeradd");
    },

    /** private: method[onRemovelayer]
     * 
     *  The "removelayer" listener bound to the :attr:`map`.
     */
    onRemovelayer: function() {
        this.layers.load();
        this.fireEvent("afterlayerremove");
    },
    
    /** private: method[onRender]
     * 
     *  The internal method called when rendering the component. Calls the 
     *  parent's method and ensures that the visibility mode is set to a usefull
     *  value.
     */   
    onRender : function(container, position) {
        // Call the parents method...
        GXM.MapPanel.superclass.onRender.apply(this, arguments);
        // ...and then set the visibility mode to Ext.Element.OFFSETS just as 
        // the original Map-component of Sencha Touch does (Review BvdE).
        this.el.setVisibilityMode(Ext.Element.OFFSETS);        
    },
    
    /** private: method[afterRender]
     * 
     *  The internal method called when rendering the component is done. Calls 
     *  the parent's method and ensures that the map-rendering process (via 
     *  this.renderMap) starts or is delayed to an appropriate eventlistener.
     */ 
    afterRender: function(){
        GXM.MapPanel.superclass.afterRender.apply(this, arguments);
        var me = this;
        if(!me.ownerCt) {
            me.renderMap();
        } else {
            //TODO: check if we need this
            me.ownerCt.on("move", me.updateMapSize, me);
            me.ownerCt.on({
                "afterlayout": {
                    fn: me.renderMap,
                    scope: me,
                    single: true
                }
            });
        }
    },
    
    /** private: method[renderMap]
     * 
     *  The internal method that explicitly renders the map into the dom-element
     *  of this component. Calls OpenLayers.Map::render to get the map div 
     *  populated.
     */ 
    renderMap: function(){
        var me = this;
        var map = me.map;
        
        // This is taken from the Sencha-Touch Map-component and ensures that 
        // there is no child element inside the target div we wish to render the
        // Map in.
        //TODO: evaluate whether this is enough or whether we need an iteration 
        //      on child elements
        if (me.el && me.el.dom && me.el.dom.firstChild) {
            Ext.fly(me.el.dom.firstChild).remove();
        }
        map.render(me.el.dom);
        
        // Adjust the geographic position according to the passed config-options 
        if (!map.getCenter()) {
            if (me.center || me.zoom ) {
                // center and/or zoom?
                map.setCenter(me.center, me.zoom);
            } else if (me.extent instanceof OpenLayers.Bounds) {
                // extent
                map.zoomToExtent(me.extent, true);
            }else {           
                map.zoomToMaxExtent();
            }    
        }
        
    },
    
    /** private: method[updateMapSize]
     * 
     *  Internal method that updates the Map size when the parent container 
     *  moves (see afterRender-method).
     */
    //TODO: check if we need this
    updateMapSize: function() {
        if(this.map) {
            this.map.updateSize();
        }
    },
    
    
    /** private: method[beforeDestroy]
     * 
     *  Private method called during the destroy sequence.
     */
    beforeDestroy: function() {
        var me = this;
        if(me.ownerCt) {
            me.ownerCt.un("move", me.updateMapSize, me);
        }
        if(me.map && me.map.events) {
            me.map.events.un({
                "moveend": me.onMoveend,
                "changelayer": me.onChangelayer,
                "addlayer": me.onAddlayer,
                "removelayer": me.onRemovelayer,
                scope: me
            });
        }
        // if the map panel was passed a map instance, this map instance
        // is under the user's responsibility
        if(!me.initialConfig.map ||
           !(me.initialConfig.map instanceof OpenLayers.Map)) {         
            if(me.map && me.map.destroy) {
                me.map.destroy();
            }
        }
        delete me.map;
        delete me.layers;
        GXM.MapPanel.superclass.beforeDestroy.apply(me, arguments);
    }
    
});

/** api: function[guess]
 *  :return: ``GXM.MapPanel`` The first map panel found by the Ext
 *      component manager.
 *  
 *  Convenience function for guessing the map panel of an application. This
 *  can reliably be used for all applications that just have one map panel
 *  in the viewport.
 */
GXM.MapPanel.guess = function() {
    var guess;
    Ext.ComponentMgr.all.each(function(cmpId, cmp) { 
        if (cmp instanceof GXM.MapPanel) {
            guess = cmp;
            return false; // return early
        } 
    });
    return guess;
};

/** api: xtype = gxm_mappanel */
Ext.reg('gxm_mappanel', GXM.MapPanel);
