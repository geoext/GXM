Ext.data.JsonP.GXM_FeaturePopup({"tagname":"class","name":"GXM.FeaturePopup","extends":"Ext.Panel","mixins":[],"alternateClassNames":[],"aliases":{"widget":["gxm_featurepopup"]},"singleton":false,"requires":["GXM.version"],"uses":[],"code_type":"ext_define","inheritable":false,"inheritdoc":null,"meta":{},"id":"class-GXM.FeaturePopup","members":{"cfg":[{"name":"centered","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-centered"},{"name":"cls","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-cls"},{"name":"feature","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-feature"},{"name":"hideOnMaskTap","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-hideOnMaskTap"},{"name":"modal","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-modal"},{"name":"styleHtmlContent","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-styleHtmlContent"},{"name":"tpl","tagname":"cfg","owner":"GXM.FeaturePopup","meta":{},"id":"cfg-tpl"}],"property":[{"name":"layout","tagname":"property","owner":"GXM.FeaturePopup","meta":{"private":true},"id":"property-layout"},{"name":"scrollable","tagname":"property","owner":"GXM.FeaturePopup","meta":{"private":true},"id":"property-scrollable"}],"method":[{"name":"constructor","tagname":"method","owner":"GXM.FeaturePopup","meta":{"private":true},"id":"method-constructor"},{"name":"applyFeature","tagname":"method","owner":"GXM.FeaturePopup","meta":{"private":true},"id":"method-applyFeature"},{"name":"initialize","tagname":"method","owner":"GXM.FeaturePopup","meta":{"private":true},"id":"method-initialize"}],"event":[],"css_var":[],"css_mixin":[]},"statics":{"cfg":[],"property":[],"method":[],"event":[],"css_var":[],"css_mixin":[]},"files":[{"filename":"FeaturePopup.js","href":"FeaturePopup.html#GXM-FeaturePopup"}],"html_meta":{},"component":false,"superclasses":["Ext.Panel"],"subclasses":[],"mixedInto":[],"parentMixins":[],"html":"<div><pre class=\"hierarchy\"><h4>Hierarchy</h4><div class='subclass first-child'>Ext.Panel<div class='subclass '><strong>GXM.FeaturePopup</strong></div></div><h4>Requires</h4><div class='dependency'>GXM.version</div><h4>Files</h4><div class='dependency'><a href='source/FeaturePopup.html#GXM-FeaturePopup' target='_blank'>FeaturePopup.js</a></div></pre><div class='doc-contents'><p>The class that is used to construct a GXM FeaturePopup.</p>\n\n<p>Sample code create a lazily instanciated <a href=\"#!/api/GXM.FeaturePopup\" rel=\"GXM.FeaturePopup\" class=\"docClass\">GXM.FeaturePopup</a>:</p>\n\n<pre><code> var featPopup = {\n     xtype: 'gxm_featurepopup',\n     // call with OL feature\n     feature : olFeature\n };\n</code></pre>\n\n<p>Sample code create a directly instanciated <a href=\"#!/api/GXM.FeaturePopup\" rel=\"GXM.FeaturePopup\" class=\"docClass\">GXM.FeaturePopup</a>:</p>\n\n<pre><code> var featPopup = Ext.create('<a href=\"#!/api/GXM.FeaturePopup\" rel=\"GXM.FeaturePopup\" class=\"docClass\">GXM.FeaturePopup</a>', {\n     feature : olFeature,\n     renderTo: 'popup'\n });\n</code></pre>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-cfg'>Config options</h3><div class='subsection'><div id='cfg-centered' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-centered' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-centered' class='name expandable'>centered</a><span> : Boolean</span></div><div class='description'><div class='short'>shall the popup be centered within the viewport?\n Also see the original documentation &lt;http://docs.sencha.com/touc...</div><div class='long'><p>shall the popup be centered within the viewport?\n Also see <code>the original documentation &lt;http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-centered&gt;</code>_</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-cls' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-cls' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-cls' class='name expandable'>cls</a><span> : String</span></div><div class='description'><div class='short'>The CSS class used to customize this popup. ...</div><div class='long'><p>The CSS class used to customize this popup.</p>\n<p>Defaults to: <code>&quot;gxm-feature-popup&quot;</code></p></div></div></div><div id='cfg-feature' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-feature' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-feature' class='name expandable'>feature</a><span> : OpenLayers.Feature.Vector</span></div><div class='description'><div class='short'>http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Feature/Vector-js.html`_\n The feature...</div><div class='long'><p><a href=\"http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Feature/Vector-js.html\">http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Feature/Vector-js.html</a>`_\n The feature this popup is about to derive its information from.</p>\n<p>Defaults to: <code>null</code></p></div></div></div><div id='cfg-hideOnMaskTap' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-hideOnMaskTap' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-hideOnMaskTap' class='name expandable'>hideOnMaskTap</a><span> : Boolean</span></div><div class='description'><div class='short'>shall the popup hide when the surrounding mask is being\n tapped? Also see the original documentation &lt;http://docs....</div><div class='long'><p>shall the popup hide when the surrounding mask is being\n tapped? Also see <code>the original documentation &lt;http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-hideOnMaskTap&gt;</code>_</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-modal' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-modal' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-modal' class='name expandable'>modal</a><span> : Boolean</span></div><div class='description'><div class='short'>Should the panel be modal? ...</div><div class='long'><p>Should the panel be modal?</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-styleHtmlContent' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-styleHtmlContent' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-styleHtmlContent' class='name expandable'>styleHtmlContent</a><span> : Boolean</span></div><div class='description'><div class='short'>shall HTML content be styled when rendering content?\n  Also see the original documentation &lt;http://docs.sencha.com...</div><div class='long'><p>shall HTML content be styled when rendering content?\n  Also see <code>the original documentation &lt;http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-styleHtmlContent&gt;</code>_</p>\n<p>Defaults to: <code>true</code></p></div></div></div><div id='cfg-tpl' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-cfg-tpl' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-cfg-tpl' class='name expandable'>tpl</a><span> : Ext.XTemplate <http://docs.sencha.com/touch/2-0/#!/api/Ext.XTemplate></span></div><div class='description'><div class='short'>The template used to render the popup content. ...</div><div class='long'><p>The template used to render the popup content. If not provided, a\n rudimentary template is being used.</p>\n<p>Defaults to: <code>null</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-property'>Properties</h3><div class='subsection'><div id='property-layout' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-property-layout' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-property-layout' class='name expandable'>layout</a><span> : String</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>Currently all FeaturePopups are in the fit-layout. ...</div><div class='long'><p>Currently all FeaturePopups are in the fit-layout.</p>\n<p>Defaults to: <code>&quot;fit&quot;</code></p></div></div></div><div id='property-scrollable' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-property-scrollable' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-property-scrollable' class='name expandable'>scrollable</a><span> : Boolean</span><strong class='private signature'>private</strong></div><div class='description'><div class='short'>A FeaturePopup is always scrollable. ...</div><div class='long'><p>A FeaturePopup is always scrollable.</p>\n<p>Defaults to: <code>true</code></p></div></div></div></div></div><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-constructor' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-method-constructor' target='_blank' class='view-source'>view source</a></div><strong class='new-keyword'>new</strong><a href='#!/api/GXM.FeaturePopup-method-constructor' class='name expandable'>GXM.FeaturePopup</a>( <span class='pre'>Object config</span> ) : Object<strong class='private signature'>private</strong></div><div class='description'><div class='short'>The constructor function ...</div><div class='long'><p>The constructor function</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>config</span> : Object<div class='sub-desc'>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-applyFeature' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-method-applyFeature' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-method-applyFeature' class='name expandable'>applyFeature</a>( <span class='pre'>Object newFeature</span> ) : OpenLayers.Feature<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Intersects the :func:setFeature function. ...</div><div class='long'><p>Intersects the :func:<code>setFeature</code> function.\n Adds the passed feature via setData to prevent data loss. Is needed to\n support more than one datatype for the new feature.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>newFeature</span> : Object<div class='sub-desc'><p>the new feature representation.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>OpenLayers.Feature</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-initialize' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='GXM.FeaturePopup'>GXM.FeaturePopup</span><br/><a href='source/FeaturePopup.html#GXM-FeaturePopup-method-initialize' target='_blank' class='view-source'>view source</a></div><a href='#!/api/GXM.FeaturePopup-method-initialize' class='name expandable'>initialize</a>( <span class='pre'></span> )<strong class='private signature'>private</strong></div><div class='description'><div class='short'>Initializes the Component. ...</div><div class='long'><p>Initializes the Component.</p>\n</div></div></div></div></div></div></div>"});