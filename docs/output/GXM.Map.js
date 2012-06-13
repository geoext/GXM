Ext.data.JsonP.GXM_Map({"tagname":"class","name":"GXM.Map","extends":"Ext.Component","mixins":[],"alternateClassNames":[],"aliases":{"widget":["gxm_map"]},"singleton":false,"requires":["GXM.version","GXM.util.Base","GXM.data.LayerStore"],"uses":[],"code_type":"ext_define","inheritable":false,"inheritdoc":null,"meta":{},"id":"class-GXM.Map","members":{"cfg":[],"property":[{"name":"","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-"},{"name":"controls","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-controls"},{"name":"layers","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-layers"},{"name":"map","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-map"},{"name":"mapCenter","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-mapCenter"},{"name":"mapExtent","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-mapExtent"},{"name":"mapZoom","tagname":"property","owner":"GXM.Map","meta":{},"id":"property-mapZoom"}],"method":[{"name":"constructor","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-constructor"},{"name":"","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-"},{"name":"applyMapCenter","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-applyMapCenter"},{"name":"applyMapExtent","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-applyMapExtent"},{"name":"getDefaultControls","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-getDefaultControls"},{"name":"initialize","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-initialize"},{"name":"onAddlayer","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-onAddlayer"},{"name":"onChangelayer","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-onChangelayer"},{"name":"onMoveend","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-onMoveend"},{"name":"onRemovelayer","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-onRemovelayer"},{"name":"onTouchStart","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-onTouchStart"},{"name":"renderMap","tagname":"method","owner":"GXM.Map","meta":{},"id":"method-renderMap"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"Map.js","href":"Map.html#GXM-Map"}],"html_meta":{},"component":true,"superclasses":["Ext.Component"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Component<div class='subclass '><strong>GXM.Map</strong></div></div><h4>Requires</h4><div class='dependency'><a href='#!/api/GXM.data.LayerStore' rel='GXM.data.LayerStore' class='docClass'>GXM.data.LayerStore</a></div><div class='dependency'><a href='#!/api/GXM.util.Base' rel='GXM.util.Base' class='docClass'>GXM.util.Base</a></div><div class='dependency'>GXM.version</div><h4>Files</h4><div class='dependency'><a href='source/Map.html#GXM-Map' target='_blank'>Map.js</a></div></pre><div class='doc-contents'><p>api: constructor\n .. class:: Map(config)</p>\n\n<pre><code> The class that is used to build a GXM map.\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-' class='name not-expandable'></a><span> : Object</span></div><div class='description'><div class='short'><p>api: config[layers]</p>\n\n<p> <code>Array(OpenLayers.Layer)</code>\n The layers provided here will be added to this MapPanel's map.</p>\n</div><div class='long'><p>api: config[layers]</p>\n\n<p> <code>Array(OpenLayers.Layer)</code>\n The layers provided here will be added to this MapPanel's map.</p>\n</div></div></div><div id='property-controls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-controls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-controls' class='name expandable'>controls</a><span> : Object</span></div><div class='description'><div class='short'>api: config[controls]\n\n Array(OpenLayers.Control)\n The layers provided here will be added to this MapPanel's map. ...</div><div class='long'><p>api: config[controls]</p>\n\n<p> <code>Array(OpenLayers.Control)</code>\n The layers provided here will be added to this MapPanel's map.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-layers' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-layers' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-layers' class='name expandable'>layers</a><span> : Object</span></div><div class='description'><div class='short'>api: property[layers]\n\n :class:GXM.data.LayerStore  A store containing gxm_layer-model\n instances. ...</div><div class='long'><p>api: property[layers]</p>\n\n<p> :class:<code><a href=\"#!/api/GXM.data.LayerStore\" rel=\"GXM.data.LayerStore\" class=\"docClass\">GXM.data.LayerStore</a></code>  A store containing gxm_layer-model\n instances.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-map' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-map' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-map' class='name expandable'>map</a><span> : Object</span></div><div class='description'><div class='short'>api: config[map]\n\n OpenLayers.Map or Object  A configured map or a configuration object\n for the map constructor. ...</div><div class='long'><p>api: config[map]</p>\n\n<p> <code>OpenLayers.Map or Object</code>  A configured map or a configuration object\n for the map constructor.  A configured map will be available after\n construction through the :func:<code>getMap()</code> function.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-mapCenter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-mapCenter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-mapCenter' class='name expandable'>mapCenter</a><span> : Object</span></div><div class='description'><div class='short'>api: config[mapCenter]\n\n OpenLayers.LonLat, Array(Number) or String  A location for the\n initial map center. ...</div><div class='long'><p>api: config[mapCenter]</p>\n\n<p> <code>OpenLayers.LonLat, Array(Number) or String</code>  A location for the\n initial map center.  If an array is provided, the first two items should\n represent x &amp; y coordinates. If a string is provided, it should consist\n of a x &amp; y coordinate seperated by a comma.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-mapExtent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-mapExtent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-mapExtent' class='name expandable'>mapExtent</a><span> : Object</span></div><div class='description'><div class='short'>api: config[mapExtent]\n\n OpenLayers.Bounds or Array(Number)  An initial extent for the map\n (used if center and zoom ...</div><div class='long'><p>api: config[mapExtent]</p>\n\n<p> <code>OpenLayers.Bounds or Array(Number)</code>  An initial extent for the map\n (used if center and zoom are not provided.  If an array, the first four\n items should be minx, miny, maxx, maxy.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='property-mapZoom' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-property-mapZoom' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-property-mapZoom' class='name expandable'>mapZoom</a><span> : Object</span></div><div class='description'><div class='short'>api: config[mapZoom]\n\n Number  An initial zoom level for the map. ...</div><div class='long'><p>api: config[mapZoom]</p>\n\n<p> <code>Number</code>  An initial zoom level for the map.</p>\n<p>Defaults to: <code>null</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/GXM.Map-method-constructor' class='name expandable'>GXM.Map</a>( <span class='pre'>Object config</span> ) : Object</div><div class='description'><div class='short'>private: method[constructor]\n\n The constructor function ...</div><div class='long'><p>private: method[constructor]</p>\n\n<p> The constructor function</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-' class='name expandable'></a>( <span class='pre'></span> )</div><div class='description'><div class='short'>api: constructor\n .. ...</div><div class='long'><p>api: constructor\n .. class:: MapPanel(config)</p>\n\n<pre><code> The class ensures the backwards compatibility to GXM 0.1\n</code></pre>\n</div></div></div><div id='method-applyMapCenter' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-applyMapCenter' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-applyMapCenter' class='name expandable'>applyMapCenter</a>( <span class='pre'>Object mapCenter</span> )</div><div class='description'><div class='short'>private: method[applyMapCenter]\n\n Function implicitly called whenever :func:setMapCenter() is called. ...</div><div class='long'><p>private: method[applyMapCenter]</p>\n\n<p> <code>Function</code> implicitly called whenever :func:<code>setMapCenter()</code> is called.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mapCenter</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-applyMapExtent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-applyMapExtent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-applyMapExtent' class='name expandable'>applyMapExtent</a>( <span class='pre'>Object mapExtent</span> )</div><div class='description'><div class='short'>private: method[applyMapExtent]\n\n Function implicitly called whenever :func:setMapExtent() is called. ...</div><div class='long'><p>private: method[applyMapExtent]</p>\n\n<p> <code>Function</code> implicitly called whenever :func:<code>setMapExtent()</code> is called.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>mapExtent</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-getDefaultControls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-getDefaultControls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-getDefaultControls' class='name expandable'>getDefaultControls</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>private: method[getDefaultControls]\n\n Function Returns an array of OpenLayers.Control-instances to be used\n when no e...</div><div class='long'><p>private: method[getDefaultControls]</p>\n\n<p> <code>Function</code> Returns an array of OpenLayers.Control-instances to be used\n when no explicit controls were given.</p>\n</div></div></div><div id='method-initialize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>private: method[initialize]\n\n Initializes the Component. ...</div><div class='long'><p>private: method[initialize]</p>\n\n<p> Initializes the Component.</p>\n</div></div></div><div id='method-onAddlayer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-onAddlayer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-onAddlayer' class='name expandable'>onAddlayer</a>( <span class='pre'>Object olEvt</span> )</div><div class='description'><div class='short'>private: method[onAddlayer]\n\n The \"addlayer\" listener bound to the :attr:map. ...</div><div class='long'><p>private: method[onAddlayer]</p>\n\n<p> The \"addlayer\" listener bound to the :attr:<code>map</code>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>olEvt</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onChangelayer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-onChangelayer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-onChangelayer' class='name expandable'>onChangelayer</a>( <span class='pre'>Object e</span> )</div><div class='description'><div class='short'>private: method[onChangelayer]\n :param e: Object\n\n The \"changelayer\" listener bound to the :attr:map. ...</div><div class='long'><p>private: method[onChangelayer]\n :param e: <code>Object</code></p>\n\n<p> The \"changelayer\" listener bound to the :attr:<code>map</code>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onMoveend' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-onMoveend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-onMoveend' class='name expandable'>onMoveend</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>private: method[onMoveend]\n\n The \"moveend\" listener bound to the :attr:map. ...</div><div class='long'><p>private: method[onMoveend]</p>\n\n<p> The \"moveend\" listener bound to the :attr:<code>map</code>.</p>\n</div></div></div><div id='method-onRemovelayer' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-onRemovelayer' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-onRemovelayer' class='name expandable'>onRemovelayer</a>( <span class='pre'>Object olEvt</span> )</div><div class='description'><div class='short'>private: method[onRemovelayer]\n\n The \"removelayer\" listener bound to the :attr:map. ...</div><div class='long'><p>private: method[onRemovelayer]</p>\n\n<p> The \"removelayer\" listener bound to the :attr:<code>map</code>.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>olEvt</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-onTouchStart' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-onTouchStart' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-onTouchStart' class='name expandable'>onTouchStart</a>( <span class='pre'>Object e</span> )</div><div class='description'><div class='short'>private: method[onTouchStart]\n\n Function makes the event unpreventable ...</div><div class='long'><p>private: method[onTouchStart]</p>\n\n<p> <code>Function</code> makes the event unpreventable</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>e</span> : Object<div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-renderMap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.Map'>GXM.Map</span><br/><a href='source/Map.html#GXM-Map-method-renderMap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.Map-method-renderMap' class='name expandable'>renderMap</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>private: method[renderMap]\n\n The internal method that explicitly renders the map into the dom-element\n of this compon...</div><div class='long'><p>private: method[renderMap]</p>\n\n<p> The internal method that explicitly renders the map into the dom-element\n of this component. Calls OpenLayers.Map::render to get the map div\n populated.</p>\n</div></div></div></div></div></div></div>"});