/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full 
 * text of the license.
 */

/** api: (define)
 *  module = GXM.plugin
 *  class = Tracker
 *  base_link = `Ext.util.GeoLocation <http://docs.sencha.com/touch/2-0/#!/api/Ext.util.GeoLocation>`_
 */

/** api: constructor
 *  .. class:: Tracker(config)
 */
Ext.define('GXM.plugin.Tracker', {
    extend: 'Ext.util.GeoLocation',
    alias : 'plugin.gxm_maptracker',

    config: {
        accuracyStyle: {
            fillColor: '#000',
            fillOpacity: 0.1,
            strokeWidth: 0
        },

        locationStyle: {   
            graphicName: 'cross',
            strokeColor: '#f00',
            strokeWidth: 2,
            fillOpacity: 0,
            pointRadius: 10
        },

        vector: null,

        host: null,

        trackSuspended: null
    },

    /**
     * Initialize the plugin, binding to the host Ext.Map instance
     * @param {Ext.Map} host
     */
    init : function(host) {
        if (host && host.isMap === true) {
            this.setHost(host);
            host.setGeo(this);
            this.setVector(new OpenLayers.Layer.Vector());
            host.getMap().addLayers([this.getVector()]);
        }
    },

    applyTrackSuspended: function(config) {
        return Boolean(config);
    },

    updateTrackSuspended: function(trackSuspended) {
        if (trackSuspended) {
            this.un('locationupdate', this.updateTrack, this);
            this.setAutoUpdate(null);
        }
        else {
            this.on('locationupdate', this.updateTrack, this);
            this.setAutoUpdate(true);
        }
    },

    // @private
    updateTrack: function() {
        if (this.getTrackSuspended()) {
            return;
        }

        var vector = this.getVector();        
        if (vector) {
            vector.removeAllFeatures();
            var lonlat = new OpenLayers.LonLat(this.getLongitude(), this.getLatitude());
            lonlat = lonlat.transform(new OpenLayers.Projection("EPSG:4326"),
                this.getHost().getMap().getProjectionObject());
            var point = new OpenLayers.Geometry.Point(lonlat.lon, lonlat.lat);
            var circle = new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.Polygon.createRegularPolygon(
                    point,
                    this.getAccuracy()/2,
                    40,
                    0
                ),
                {},
                this.getAccuracyStyle()
            );
            vector.addFeatures([
                circle,
                new OpenLayers.Feature.Vector(
                    point,
                    {},
                    this.getLocationStyle()
                )
            ]);
            this.getHost().getMap().zoomToExtent(vector.getDataExtent());
        }
    },

    suspendUpdates: function() {
        this.setTrackSuspended(true);
    },

    resumeUpdates: function() {
        this.setTrackSuspended(false);
    }
});
