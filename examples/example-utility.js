/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 *
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full
 * text of the license.
 */

/** 
 *  Example utility
 *  ----------------
 *  This file holds methods that are being shared by the examples.
 */

Ext.require([
    'Ext.Panel'
]);

Ext.ns('example');

example.utility = {
    /**
     * Returns a string of relevant code for an example by an identifier.
     */
    getExampleCode : function(exampleKey){
        var strS = '<span class="string">',
            strE = '</span>',
            comS = '<span class="comment">',
            comE = '</span>',
            numS = '<span class="number">',
            numE = '</span>',
            keyS = '<span class="keyword">',
            keyE = '</span>',
            boolS = '<span class="boolean">',
            boolE = '</span>',
            ind = '  ',
            varCode = keyS + 'var' + keyE,
            newCode = keyS + 'new' + keyE,
            extCreateCode = keyS + 'Ext.create(\'' + keyE,
            lines = [];
        
        lines.push('<pre class="example-code">');
        
        switch(exampleKey){
            case 'state':
                lines.push(comS + '// To have a map that keeps track of it\'s current state' + comE);
                lines.push(comS + '// simply give the map a OpenLayers.Control.Permalink.' + comE);
                lines.push(comS + '// This page has such a control with "anchor: true",' + comE);
                lines.push(comS + '// which results in the current map center and zoom' + comE);
                lines.push(comS + '// being stored as parameters after the "#"-sign' + comE);
                lines.push(comS + '// in this pages URL.' + comE);
                lines.push(varCode + ' map = ' + newCode + ' OpenLayers.Map( {');
                lines.push(ind + 'controls: [');
                lines.push(ind + ind + 'new OpenLayers.Control.Permalink( {');
                lines.push(ind + ind + ind + 'anchor: ' + boolS + 'true' + boolE);
                lines.push(ind + ind + '} )');
                lines.push(ind + ']');
                lines.push('} );');
                lines.push(varCode + ' mapPanel = ' + newCode + ' GXM.MapPanel({');
                lines.push(ind + 'map: map');
                lines.push('});');
                lines.push('');
                lines.push(comS + '// If you bookmark the current page after zooming' + comE);
                lines.push(comS + '// and panning around and revisit this page through' + comE);
                lines.push(comS + '// your bookmark, you should see the same map' + comE);
                lines.push(comS + '// that was visible when you made the bookmark.' + comE);
                break;
                
            case 'buttons':   
                lines.push(comS + '// usually you generate a OpenLayers control and' + comE);
                lines.push(comS + '// pass it over to the GXM.Button-constructor:' + comE);
                lines.push(varCode + ' zoomin = ' + newCode + ' OpenLayers.Control.ZoomIn();');
                lines.push(varCode + ' btnZoomIn = ' + extCreateCode + 'GXM.Button\', {');
                lines.push(ind + 'control: zoomin,');
                lines.push(ind + 'map: map, ' + comS + '// adds the control to the map' + comE);
                lines.push(ind + 'title: ' + strS + '"Zoom In"' + strE);
                lines.push('} );');
                lines.push('');
                lines.push(comS + '// in the above code a single-click control' + comE);
                lines.push(comS + '// (OpenLayers.Control.TYPE_BUTTON), is managed, so' + comE);
                lines.push(comS + '// the controls trigger()-method will execute ' + comE);
                lines.push(comS + '// whenever a button-tap occurs.' + comE);
                lines.push('');
                lines.push(comS + '// If you manage controls that are active/inactive' + comE);
                lines.push(comS + '// (for example a TouchNavigation-control) the buttons' + comE);
                lines.push(comS + '// "pressedCls" will reflect the buttons state.' + comE);
                lines.push(comS + '// the "pressed"-configuration is used to autoactivate the control:' + comE);
                lines.push(varCode + ' nav = ' + newCode + ' OpenLayers.Control.TouchNavigation();');
                lines.push(varCode + ' btnNav = ' + extCreateCode + 'GXM.Button\', {');
                lines.push(ind + 'control: nav,');
                lines.push(ind + 'map: map,');
                lines.push(ind + 'title: ' + strS + '"Navigation",' + strE);
                lines.push(ind + 'pressed: ' + boolS + 'true' + boolE + ', ' + comS + '// autoactivate this control' + comE);
                lines.push(ind + 'pressedCls: ' + strS + '"my-btn-pressed-cls",' + strE);
                lines.push('} );');
                lines.push('');
                lines.push(comS + '// Use the "exclusiveGroup" configuration to make sure' + comE);
                lines.push(comS + '// that from a group of controls only one is active at' + comE);
                lines.push(comS + '// any time. The digitizing buuttons and the navigation' + comE);
                lines.push(comS + '// buttons on this page are an example: ' + comE);
                lines.push(varCode + ' ctrlDrawPoint = ' + newCode + '  OpenLayers.Control.DrawFeature(');
                lines.push(ind + comS + "// more OpenLayers-configuration" + comE);
                lines.push(');');
                lines.push(varCode + ' ctrlNav = ' + newCode + ' OpenLayers.Control.TouchNavigation();');
                lines.push(varCode + ' btnNav = ' + extCreateCode + 'GXM.Button\', {');
                lines.push(ind + 'exclusiveGroup:' + strS + '"working-on-map",' + strE);
                lines.push(ind + 'control: ctrlDrawPoint');
                lines.push(ind + comS + "// more GXM.Button-configuration" + comE);
                lines.push('} );');
                lines.push(varCode + ' btnDigi = ' + extCreateCode + 'GXM.Button\', {');
                lines.push(ind + 'exclusiveGroup:' + strS + '"working-on-map",' + strE);
                lines.push(ind + 'control: ctrlNav');
                lines.push(ind + comS + "// more GXM.Button-configuration" + comE);
                lines.push('});');
                break;
            
            case 'layerlist':
                lines.push(comS + '// Use the "xtype"-configuration string "gxm_layerlist"' + comE);
                lines.push(comS + '// to create a LayerList with default styling: ' + comE);
                lines.push(varCode + ' myLayerList = {');
                lines.push(ind + 'xtype: ' + strS + '"gxm_layerlist"' + strE + ',');
                lines.push(ind + 'mapPanel: myMapPanel ' + comS + '// an instance of GXM.MapPanel' + comE);
                lines.push('};');
                lines.push('');
                lines.push(comS + '// You can still register usual event listeners,'+ comE);
                lines.push(comS + '// e.g. for the "itemtap"-event of the LayerList:'+ comE);
                lines.push(varCode + ' myLayerList = {');
                lines.push(ind + comS + '// standard configuration, see above' + comE);
                lines.push(ind + 'listeners: [');
                lines.push(ind + ind + 'scope: ' + keyS + 'this' + keyE+ ',');
                lines.push(ind + ind + 'itemtap: ' + keyS + 'function' + keyE + '() {');
                lines.push(ind + ind + ind + comS + '// your method...' + comE);
                lines.push(ind + ind + '}');
                lines.push(ind + ']');
                lines.push('};');
                lines.push('');
                lines.push(comS + '// The following example shows how to create a LayerList'+ comE);
                lines.push(comS + '// with direct instanciation of GXM.LayerList.'+ comE);
                lines.push(comS + '// Here we use the configuration "layers" that takes an'+ comE);
                lines.push(comS + '// instance of GXM.data.LayerStore:'+ comE);
                lines.push(varCode +' anotherLayerList = ' + extCreateCode + 'GXM.LayerList\', {');
                lines.push(ind + 'layers: myLayerStore,');
                lines.push(ind + 'map: myOpenLayersMap');
                lines.push('});');
                break;
            
            case 'mappanel-simple':
                lines.push('{');
                lines.push(ind + 'xtype : ' + strS + '"gxm_map"' + strE + ',');
                lines.push(ind + comS + '// A reference to' + comE);
                lines.push(ind + comS + '// an OpenLayers.Map' + comE);
                lines.push(ind + 'map : map');
                lines.push('};');
                break;
            
            case 'mappanel-layers':
                lines.push('{');
                lines.push(ind + 'xtype  : ' + strS + '"gxm_map"' + strE + ',');
                lines.push(ind + comS + '// A reference to' + comE);
                lines.push(ind + comS + '// an OpenLayers.Layer' + comE);
                lines.push(ind + 'layers : [');
                lines.push(ind + ind + 'myLayer');
                lines.push(ind + ']');
                lines.push('};');
                break;
            
            case 'mappanel-center':
                lines.push('{');
                lines.push(ind + 'xtype : ' + strS + '"gxm_map"' + strE + ',');
                lines.push(ind + comS + '// pass as array, as string' + comE);
                lines.push(ind + comS + '// or OpenLayers.LonLat-instance' + comE);
                lines.push(ind + 'mapCenter : [');
                lines.push(ind + ind + numS + '7.1' + numE + ',');
                lines.push(ind + ind + numS + '50.74' + numE);
                lines.push(ind + '],');
                lines.push(ind + comS + '// pass an integer as zoom' + comE);
                lines.push(ind + 'mapZoom : ' + numS + '12' + numE);
                lines.push('};');
                break;
            
            case 'mappanel-extent':
                lines.push('{');
                lines.push(ind + 'xtype : ' + strS + '"gxm_map"' + strE + ',');
                lines.push(ind + comS + '// pass as array, as string' + comE);
                lines.push(ind + comS + '// or OpenLayers.Bounds-instance' + comE);
                lines.push(ind + 'mapExtent : ' + strS + '"7,51,8,52"' + strE);
                lines.push('};');
                break;
            
            case 'featurelist':
                lines.push('{');
                lines.push(ind + comS + '// Use the "xtype"-configuration string "gxm_featurelist"' + comE);
                lines.push(ind + comS + '// to create a FeatureList with default styling' + comE);
                lines.push(ind + 'xtype : ' + strS + '"gxm_featurelist"' + strE + ',');
                lines.push(ind + 'ollayer: myLayer,');
                lines.push(ind + 'title : ' + strS + '"myFeatureList"' + strE + ',');
                lines.push(ind + comS + '// Register usual event listeners, e.g. the "itemtap"-event' + comE);
                lines.push(ind + 'listeners: [');
                lines.push(ind + ind + 'scope: ' + keyS + 'this' + keyE+ ',');
                lines.push(ind + ind + 'itemtap: ' + keyS + 'function' + keyE + '() {');
                lines.push(ind + ind + ind + comS + '// your method...' + comE);
                lines.push(ind + ind + '}');
                lines.push(ind + ']');
                lines.push('};');
                break;
            
            case 'featurepopup':
                lines.push('{');
                lines.push(ind + comS + '// Use the "xtype"-configuration string "gxm_featurepopup"' + comE);
                lines.push(ind + comS + '// to create a Popup for a FeatureList entry with default styling' + comE);
                lines.push(ind + 'xtype : ' + strS + '"gxm_featurepopup"' + strE + ',');
                lines.push(ind + 'olFeature: feature,');
                lines.push(ind + comS + '// Define your custom Ext.Template, Ext.XTemplate or Array of' + comE);
                lines.push(ind + comS + '// strings to change the view of the popup' + comE);
                lines.push(ind + 'tpl : ' + extCreateCode + 'Ext.XTemplate\', ...)');
                lines.push('};');
                break;

            case 'featurepopup-map':
                lines.push('{');
                lines.push(ind + comS + '// Use the "xtype"-configuration string "gxm_featurepopup"' + comE);
                lines.push(ind + comS + '// to create a Popup with default styling' + comE);
                lines.push(ind + 'xtype : ' + strS + '"gxm_featurepopup"' + strE + ',');
                lines.push(ind + 'olFeature: feature,');
                lines.push(ind + comS + '// Use centered: false to show the popup at the location of the feature' + comE);
                lines.push(ind + 'centered: false,');
                lines.push(ind + comS + '// Define your custom Ext.Template, Ext.XTemplate or Array of' + comE);
                lines.push(ind + comS + '// strings to change the view of the popup' + comE);
                lines.push(ind + 'tpl : ' + extCreateCode + 'Ext.XTemplate\', ...)');
                lines.push('};');
                break;

            case 'featurerenderer':
                lines.push(comS + '// create a feature renderer and specify symbolType, ' + comE);
                lines.push(comS + '// width and an array of symbolizers' + comE);
                lines.push(varCode + ' renderer = ' + extCreateCode + 'GXM.FeatureRenderer\', {');
                lines.push(ind + 'symbolType: ' + strS + '"Point"' + strE + ',');
                lines.push(ind + 'width: 25, ');
                lines.push(ind + 'symbolizers: [{');
                lines.push(ind + ind + 'graphicName: ' + strS + '"circle"' + strE + ',');
                lines.push(ind + ind + 'fillColor: ' + strS + '"red"' + strE);
                lines.push(ind + '}]');
                lines.push('});');
                break;

            case 'featureeditor':
                lines.push(comS + '// create a featureeditor with a feature and attribute store' + comE);
                lines.push(varCode + ' editor = ' + extCreateCode + 'GXM.form.FeatureEditor\', {');
                lines.push(ind + 'width: 400, ');
                lines.push(ind + 'height: 400, ');
                lines.push(ind + 'centered: true, ');
                lines.push(ind + 'feature: feature, ');
                lines.push(ind + 'schema: store');
                lines.push('});');
                break;
                
            default:
                lines.push(comS + '// No documentation for "' + exampleKey + '"' + comE);
                break;
        }
        
        lines.push('</pre>');
        
        // concatenate the array of code lines
        return lines.join("\n");
    },
    
    /**
     * Gets a plain object to show relevant source code by an identifier.
     */
    getSourceCodeButton: function(exampleKey) {
        var sourceCode = example.utility.getExampleCode(exampleKey);
        var btn = {
            xtype: 'button',
            text: 'Source',
            handler: function(){
                if (this.overlay && this.overlay instanceof Ext.Panel) {
                    this.overlay.destroy();
                }
                this.overlay = Ext.create('Ext.Panel', {
                    fullscreen: false,
                    draggable : false,
                    modal : true,
                    hideOnMaskTap: true,
                    height: '80%',
                    width: '95%',
                    centered : true,
                    styleHtmlContent : true,
                    scrollable : true,
                    html: sourceCode
                });
                this.overlay.showBy(this);
            }
        };
        return btn;
    }
};
