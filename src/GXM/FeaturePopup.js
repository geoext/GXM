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
 */

/**
 * @class GXM.FeaturePopup
 * The class that is used to construct a GXM FeaturePopup.
 *
 * Sample code create a lazily instanciated GXM.FeaturePopup:
 *
 *      var featPopup = {
 *          xtype: 'gxm_featurepopup',
 *          // call with OL feature
 *          feature : olFeature
 *      };
 *
 * Set centered to false to have the popup show up at the feature's
 * location and move with it as well when the map is panned.
 *
 * Sample code create a directly instanciated GXM.FeaturePopup:
 *
 *      var featPopup = Ext.create('GXM.FeaturePopup', {
 *          feature : olFeature,
 *          renderTo: 'popup'
 *      });
 *
 */
Ext.define('GXM.FeaturePopup', {

    extend: 'Ext.Panel',
    requires: [
        'GXM.version'
    ],
    xtype: 'gxm_featurepopup',

    /**
     * @property {Boolean} scrollable
     * @private
     *  A FeaturePopup is always scrollable.
     */
    scrollable: true,

    /**
     * @property {String} layout
     * @private
     *  Currently all FeaturePopups are in the fit-layout.
     */
    layout: 'fit',

    /**
     * @property {Boolean} insideViewport
     * @private
     *  Are we inside of the map's viewport?
     */
    insideViewport: null,

    /**
     * @property {OpenLayers.LonLat} location
     * @private
     *  The geographic location of the popup.
     */
    location: null,

    /**
     * @property {OpenLayers.Map} map
     * @private
     *  The OpenLayers Map object.
     */
    map: null,

    config: {

        /**
         * @cfg {String} cls
         * The CSS class used to customize this popup.
         */
        cls: 'gxm-feature-popup',

        /**
         * @cfg {Boolean} hideOnMaskTap
         * shall the popup hide when the surrounding mask is being
         *  tapped? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-hideOnMaskTap>`_
         */
        hideOnMaskTap: true,

        /**
         * @cfg {OpenLayers.Feature.Vector} feature
         * <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Feature/Vector-js.html>`_
         *  The feature this popup is about to derive its information from.
         */
        feature: null,

        /**
         * @cfg {Ext.XTemplate <http://docs.sencha.com/touch/2-0/#!/api/Ext.XTemplate>} tpl
         * The template used to render the popup content. If not provided, a
         *  rudimentary template is being used.
         */
        tpl: null,

        /**
         * @cfg {Boolean} styleHtmlContent
         *  shall HTML content be styled when rendering content?
         *   Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-styleHtmlContent>`_
         */
        styleHtmlContent: true,

        /**
         * @cfg {Boolean} centered
         * shall the popup be centered within the viewport?
         *  Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-centered>`_
         */
        centered: true,

        /**
         * @cfg {Boolean} modal
         *  Should the panel be modal?
         */
        modal: true
    },

    /**
     * @private
     * The constructor function
     */
    constructor: function (config) {
        if (!config.tpl) {
            config.tpl = new Ext.XTemplate('<p>You clicked the feature with the ID: {feature.id}</p>', '<p> Overwrite the config-property tpl to get a custom text.</p>');
        }
        if (config.feature) {
            this._feature = config.feature;
            delete config.feature;
        }
        this.callParent(arguments);
    },

    /**
     * @private
     * Initializes the Component.
     */
    initialize: function () {

        var feature = this.getFeature();
        // set the given feature in order
        // to call the apply method
        // which cares about the data types
        // necessary because we do the manual setting
        // of feature in constructor due to
        // known issues with circular
        // references
        if (Ext.isDefined(feature)) {
            this.setFeature(feature);
        }

        this.callParent();
        if (!this.getCentered()) {
            if (feature.layer && feature.layer.map) {
                this.map = feature.layer.map;
            } else {
                var mapPanel = Ext.Viewport.down('gxm_map');
                if (mapPanel) {
                    this.map = mapPanel.getMap();
                }
            }
            if (this.map) {
                this.map.events.on({
                    "move" : this.onMapMove,
                    scope : this
                });
                this.location = this.getFeature().geometry.getBounds().getCenterLonLat();
                var mapExtent =  this.map.getExtent();
                if (mapExtent && this.location) {
                    this.insideViewport = mapExtent.containsLonLat(this.location);
                }
                this.on('show', this.position, this);
            }
        }
    },

    /**
     * @private
     * Intersects the :func:`setFeature` function.
     *  Adds the passed feature via setData to prevent data loss. Is needed to
     *  support more than one datatype for the new feature.
     *
     *  @param {Object} newFeature the new feature representation.
     *  @return {OpenLayers.Feature}
     */
    applyFeature: function (newFeature) {
        if (newFeature instanceof OpenLayers.Feature.Vector) {

            // set the feature as data, because if we pass
            // an OL object directly as data it gets lost
            this.setData({
                feature: newFeature
            });
        } else if (newFeature instanceof OpenLayers.Geometry) {
            // TODO
        } else if (newFeature instanceof Ext.Record) {
            // TODO
        }
        if (!this.getCentered()) {
            this.location = newFeature.geometry.getBounds().getCenterLonLat();
            this.map && this.position();
        }
        return newFeature;
    },

    /**
     * @private
     * Reposition the popup when the map moves.
     */
    onMapMove: function() {
        if (!(this.getHidden() && this.insideViewport)){
            this._mapMove = true;
            this.position();
            delete this._mapMove;
        }
        this.position();
    },

    /**
     * @private
     * Determine the correct position of the popup if it's tied to a feature's
     * geometry.
     */
    position: function() {
        var me = this;
        if(me._mapMove === true) {
            me.insideViewport = me.map.getExtent().containsLonLat(me.location);
            if(me.insideViewport === me.getHidden()) {
                me.setHidden(!me.insideViewport);
            }
        }
        if(!me.getHidden()) {
            var locationPx = me.map.getPixelFromLonLat(me.location),
                mapBox = Ext.fly(me.map.div).getBox(true),
                y = locationPx.y + mapBox.y,
                x = locationPx.x + mapBox.x,
                elSize = this.element.getSize();
            if (locationPx.x > mapBox.width / 2) {
                // right
                x -= elSize.width;
            }
            if (locationPx.y > mapBox.height / 2) {
                // bottom
                y -= elSize.height;
            }
            me.setLeft(x);
            me.setTop(y);
        }
    }

});
