// intentially global for better debugging
var map,
    mapPanel,
    viewport;

Ext.setup({
    onReady: function(){

        // OpenLayers specific
        map = new OpenLayers.Map({
            controls: []
        });
        var ol_wms = new OpenLayers.Layer.WMS(
            "OpenLayers WMS", 
            "http://vmap0.tiles.osgeo.org/wms/vmap0", 
            {
                layers: "basic"
            },
            {
                attribution: 'Metacarta WMS hosted on <a href="http://www.osgeo.org/" target="_blank">osgeo.org<a>'
            }
        );
        var geolocationVector = new OpenLayers.Layer.Vector("Geolocation");
        map.addLayers([ol_wms,geolocationVector]);

        var btnClickCallback = function(btn){
            Ext.Msg.alert(
                'Callback defined in application', 
                'You tapped the "' + btn.title + '"-button.'
            );
        };
        
        var zoomin = new OpenLayers.Control.ZoomIn();
        var zoomout = new OpenLayers.Control.ZoomOut();

        var btnZoomIn = new GXM.Button({
            control: zoomin,
            map: map,
            title: 'Zoom In',
            iconCls: 'add',
            iconMask: true,
            handler: Ext.createDelegate(btnClickCallback)
        });
        var btnZoomOut = {
            xtype: 'gxm_button',
            control: zoomout,
            map: map,
            title: 'Zoom Out',
            iconCls: 'minus',
            iconMask: true,
            handler: Ext.createDelegate(btnClickCallback)
        };
        
        var nav = new OpenLayers.Control.TouchNavigation();
        
        var btnNavigation = {
            xtype: 'gxm_button',
            exclusiveGroup: 'working-on-map',
            map: map,
            text: 'Navigation',
            control: nav,
            pressed: true,
            handler: function(btn, evt, activeState){
                Ext.Msg.alert(
                    'Navigation', 
                    'Navigation is ' +
                        (activeState ? 'active' : 'inactive')
                    + '.'
                );
            }
        };

        // create a vector layer for drawing
        var vector = new OpenLayers.Layer.Vector('Vector Layer', {
            styleMap: new OpenLayers.StyleMap({
                temporary: OpenLayers.Util.applyDefaults({
                    pointRadius: 16
                }, OpenLayers.Feature.Vector.style.temporary)
            })
        });
        
        mapPanel = new GXM.MapPanel({
            map: map,
            layers: [vector]
        });
        
        var ctrlDrawPoint = new OpenLayers.Control.DrawFeature(
            vector, 
            OpenLayers.Handler.Point
        );
        var ctrlDrawLine = new OpenLayers.Control.DrawFeature(
            vector, 
            OpenLayers.Handler.Path
        );
        var ctrlDrawPoly = new OpenLayers.Control.DrawFeature(
            vector, 
            OpenLayers.Handler.Polygon
        );
        
        var btnDigPoint = {
            control: ctrlDrawPoint,
            text: 'Point'
        };
        var btnDigLine = {
            control: ctrlDrawLine,
            text: 'Line'
        };
        var btnDigPoly = {
            control: ctrlDrawPoly,
            text: 'Poly'
        };
        
        var digGroup = {
            xtype: 'segmentedbutton',
            defaults: {
                xtype: "gxm_button",
                exclusiveGroup: 'working-on-map',
                map: map
            },
            items: [
                btnDigPoint,
                btnDigLine,
                btnDigPoly
            ]
        };
        
        var ctrlGeolocation = new OpenLayers.Control.Geolocate({
            bind: false,
            watch: false,
            geolocationOptions: {
                enableHighAccuracy: false,
                maximumAge: 0,
                timeout: 7000
            } 
        });
        ctrlGeolocation.events.register('locationupdated', geolocationVector, function(e) {
            this.removeAllFeatures();
            
            var oneDeegreeLongAtEquatorInMeters = 111200,
                oneDeegreeLongAtCurrentLatitude = oneDeegreeLongAtEquatorInMeters * (Math.cos(e.point.y / (180 / Math.PI))),
                accuracyMeters = e.position.coords.accuracy,
                accuracyDeegrees = accuracyMeters / oneDeegreeLongAtCurrentLatitude,
                circle = new OpenLayers.Feature.Vector(
                    OpenLayers.Geometry.Polygon.createRegularPolygon(
                        new OpenLayers.Geometry.Point(e.point.x, e.point.y),
                        accuracyDeegrees,
                        50,
                        0
                    ),
                    {},
                    {
                        fillColor: '#e00',
                        fillOpacity: 0.1,
                        strokeColor: '#f00',
                        fillOpacity: 0.2,
                        strokeWidth: 2
                    }
                );
            this.addFeatures([
                new OpenLayers.Feature.Vector(
                    e.point,
                    {},
                    {
                        graphicName: 'cross',
                        strokeColor: '#f00',
                        strokeWidth: 2,
                        fillOpacity: 0,
                        pointRadius: 10
                    }
                ),
                circle
            ]);
            this.map.zoomToExtent(this.getDataExtent());
        });
        ctrlGeolocation.events.register('deactivate', geolocationVector, function(e) {
            this.removeAllFeatures();
        });
        
        // A button to show relevant code parts
        var btnSource = example.utility.getSourceCodeButton('buttons');
        
        viewport  = new Ext.Panel({
            fullscreen: true,
            layout: 'fit',
            ui: 'light',
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    btnZoomIn, 
                    btnZoomOut, 
                    {xtype: 'spacer'},
                    btnSource,
                    {xtype: 'spacer'}, 
                    btnNavigation
                ]
            },{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    digGroup,
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: 'Locate me',
                            control: ctrlGeolocation,
                            xtype: "gxm_button",
                            exclusiveGroup: 'geolocation',
                            map: map
                        }]
                    }
                ]
            }],
            items: [
                mapPanel
            ]
        });
    }
});
