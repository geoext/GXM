/*
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** 
 * @class GXM.FeatureRenderer
 * Create a box component for rendering a vector feature.
 * Update functionality is not yet supported.
 */
Ext.define("GXM.FeatureRenderer",{
    extend: 'Ext.Component',
    alias: 'widget.gxm_renderer',
    config: {
        symbolizers: [OpenLayers.Feature.Vector.style["default"]],
        symbolType: "Polygon",
        minWidth: 20,
        minHeight: 20
    },
    initialize:function(){
        var me = this;
        this.autoEl = {
            tag: "div",
            "class": (this.imgCls ? this.imgCls : ""),
            id: this.getId()
        };
        me.callParent(arguments);

        Ext.applyIf(this, {
            pointFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(0, 0)
                ),
            lineFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.LineString([
                    new OpenLayers.Geometry.Point(-8, -3),
                    new OpenLayers.Geometry.Point(-3, 3),
                    new OpenLayers.Geometry.Point(3, -3),
                    new OpenLayers.Geometry.Point(8, 3)
                    ])
                ),
            polygonFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Polygon([
                    new OpenLayers.Geometry.LinearRing([
                        new OpenLayers.Geometry.Point(-8, -4),
                        new OpenLayers.Geometry.Point(-6, -6),
                        new OpenLayers.Geometry.Point(6, -6),
                        new OpenLayers.Geometry.Point(8, -4),
                        new OpenLayers.Geometry.Point(8, 4),
                        new OpenLayers.Geometry.Point(6, 6),
                        new OpenLayers.Geometry.Point(-6, 6),
                        new OpenLayers.Geometry.Point(-8, 4)
                        ])
                    ])
                ),
            textFeature: new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point(0, 0)
            )
        });
        this.renderer = new OpenLayers.Renderer.Canvas(
            this.element
        );

        this.renderer.map = {
            getResolution: Ext.Function.bind(function() {
                return this.resolution;
            }, this)
        };

        this.feature = this[this.getSymbolType().toLowerCase() + "Feature"];
        this.drawFeature();
    },

    drawFeature: function() {
        this.renderer.clear();
        this.setRendererDimensions();
        var symbolizer, feature, geomType;
        for (var i=0, len=this.getSymbolizers().length; i<len; ++i) {
            symbolizer = this.getSymbolizers()[i];
            feature = this.feature;
            if (symbolizer instanceof OpenLayers.Symbolizer) {
                symbolizer = symbolizer.clone();
                if (OpenLayers.Symbolizer.Text &&
                    symbolizer instanceof OpenLayers.Symbolizer.Text &&
                    symbolizer.graphic === false) {
                        // hide the point geometry
                        symbolizer.fill = symbolizer.stroke = false;
                }
                if (!this.initialConfig.feature) {
                    geomType = symbolizer.CLASS_NAME.split(".").pop().toLowerCase();
                    feature = this[geomType + "Feature"];
                }
            } else {
                // TODO: remove this when OpenLayers.Symbolizer is used everywhere
                symbolizer = Ext.apply({}, symbolizer);
            }
            this.renderer.drawFeature(
                feature.clone(),
                symbolizer
            );
        }
    },

    setRendererDimensions: function() {
        var gb = this.feature.geometry.getBounds();
        var gw = gb.getWidth();
        var gh = gb.getHeight();
        /*
         * Determine resolution based on the following rules:
         * 1) always use value specified in config
         * 2) if not specified, use max res based on width or height of element
         * 3) if no width or height, assume a resolution of 1
         */
        var resolution = this.initialConfig.resolution;
        if(!resolution) {
            resolution = Math.max(gw / this.width || 0, gh / this.height || 0) || 1;
        }
        this.resolution = resolution;
        // determine height and width of element
        var width = Math.max(this.getWidth() || this.getMinWidth(), gw / resolution);
        var height = Math.max(this.getHeight() || this.getMinHeight(), gh / resolution);
        // determine bounds of renderer
        var center = gb.getCenterPixel();
        var bhalfw = width * resolution / 2;
        var bhalfh = height * resolution / 2;
        var bounds = new OpenLayers.Bounds(
            center.x - bhalfw, center.y - bhalfh,
            center.x + bhalfw, center.y + bhalfh
            );
        this.renderer.setSize(new OpenLayers.Size(Math.round(width), Math.round(height)));
        this.renderer.setExtent(bounds, true);
    }

});
