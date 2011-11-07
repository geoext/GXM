// this holds methods that are being shared by the examples
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
                lines.push(varCode + ' mapPanel = ' + newCode + ' GXM.MapPanel( {');
                lines.push(ind + 'map: map');
                lines.push('} );');
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
                lines.push(varCode + ' btnZoomIn = ' + newCode + ' GXM.Button( {');
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
                lines.push(varCode + ' btnNav = ' + newCode + ' GXM.Button( {');
                lines.push(ind + 'control: nav,');
                lines.push(ind + 'map: map,');
                lines.push(ind + 'title: ' + strS + '"Navigation",' + strE);
                lines.push(ind + 'pressed: ' + boolS + 'true' + boolE + ', ' + comS + '// autoactivate this control' + comE);
                lines.push(ind + 'pressedCls: ' + strS + '"my-btn-pressed-cls",' + strE);
                lines.push('');
                lines.push(comS + '// Use the "exclusiveGroup" configuration to make sure' + comE);
                lines.push(comS + '// that from a group of controls only one is active at' + comE);
                lines.push(comS + '// any time. The digitizing buuttons and the navigation' + comE);
                lines.push(comS + '// buttons on this page are an example: ' + comE);
                lines.push(varCode + ' ctrlDrawPoint = ' + newCode + '  OpenLayers.Control.DrawFeature(');
                lines.push(ind + comS + "// more OpenLayers-configuration" + comE);
                lines.push(');');
                lines.push(varCode + ' ctrlNav = ' + newCode + ' OpenLayers.Control.TouchNavigation();');
                lines.push(varCode + ' btnNav = ' + newCode + ' GXM.Button( {');
                lines.push(ind + 'exclusiveGroup:' + strS + '"working-on-map",' + strE);
                lines.push(ind + 'control: ctrlDrawPoint');
                lines.push(ind + comS + "// more GXM.Button-configuration" + comE);
                lines.push('} );');
                lines.push(varCode + ' btnDigi = ' + newCode + ' GXM.Button( {');
                lines.push(ind + 'exclusiveGroup:' + strS + '"working-on-map",' + strE);
                lines.push(ind + 'control: ctrlNav');
                lines.push(ind + comS + "// more GXM.Button-configuration" + comE);
                lines.push('} );');
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
                lines.push(varCode +' anotherLayerList = ' + newCode + ' GXM.LayerList( {');
                lines.push(ind + 'layers: myLayerStore,');
                lines.push(ind + 'map: myOpenLayersMap');
                lines.push('} );');
                break;
            
            case 'mappanel-simple':
                lines.push('{');
                lines.push(ind + 'xtype : ' + strS + '"gxm_mappanel"' + strE + ',');
                lines.push(ind + comS + '// A reference to' + comE);
                lines.push(ind + comS + '// an OpenLayers.Map' + comE);
                lines.push(ind + 'map   : map');
                lines.push('}');
                break;
            
            case 'mappanel-layers':
                lines.push('{');
                lines.push(ind + 'xtype  : ' + strS + '"gxm_mappanel"' + strE + ',');
                lines.push(ind + 'layers : [');
                lines.push(ind + ind + comS + '// A reference to' + comE);
                lines.push(ind + ind + comS + '// an OpenLayers.Layer' + comE);
                lines.push(ind + ind + 'myLayer');
                lines.push(ind + ']');
                lines.push('}');
                break;
            
            case 'mappanel-center':
                lines.push('new GXM.MapPanel( {');
                lines.push(ind + 'layers : [');
                lines.push(ind + ind + 'myLayer');
                lines.push(ind + '],');
                lines.push(ind + comS + '// pass as array, as string' + comE);
                lines.push(ind + comS + '// or OpenLayers.LonLat-instance' + comE);
                lines.push(ind + 'center : [');
                lines.push(ind + ind + numS + '8' + numE + ',');
                lines.push(ind + ind + numS + '51' + numE);
                lines.push(ind + '],');
                lines.push(ind + comS + '// pass an integer as zoom' + comE);
                lines.push(ind + 'zoom   : ' + numS + '11' + numE);
                lines.push('} )');
                break;
            
            case 'mappanel-extent':
                lines.push('new GXM.MapPanel( {');
                lines.push(ind + 'layers : [');
                lines.push(ind + ind + 'myLayer');
                lines.push(ind + '],');
                lines.push(ind + comS + '// pass as array, as string' + comE);
                lines.push(ind + comS + '// or OpenLayers.Bounds-instance' + comE);
                lines.push(ind + 'extent : ' + strS + '"7,51,8,52"' + strE);
                lines.push('} )');
                break;
                
            default:
                lines.push(comS + '// No documentation for "' + exampleKey + '"' + comE);
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
                this.overlay = new Ext.Panel({
                    floating: true,
                    modal: true,
                    centered: false,
                    styleHtmlContent: true,
                    scroll: 'both',
                    html: sourceCode
                });
                this.overlay.showBy(this);
            }
        }
        return btn;
    }
};