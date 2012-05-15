/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: (define)
 *  module = GXM
 *  class = FeaturePopup
 *  base_link = `Ext.Panel <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel>`_
 */

/** api: example
 *  Sample code to create a GXM.FeaturePopup:
 * 
 *  .. code-block:: javascript
 *  
 *    // create a lazily instanciated GXM.LayerList:
 *    var featPopup = {
 *        xtype: 'gxm_featurepopup',
 *        // call with GXM.Map...
 *        map : gxmMap
 *    };
 *    
 */

/** api: constructor
 *  .. class:: FeaturePopup(config)
 *   
 *      The class that is used to construct a GXM FeaturePopup.
 */
Ext.define('GXM.FeaturePopup', {

    extend: 'Ext.Panel',
    xtype : 'gxm_featurepopup',
    
    /** private: property[scrollable]
     *  
     *  ``Boolean`` A FeaturePopup is always scrollable.  
     *  
     *  Defaults to ``true``.
     */
	scrollable: true,
	
	/** private: property[layout]
     *  
     *  ``String`` Currently all FeaturePopups are in the fit-layout. 
     *  
     *  Defaults to ``fit``.
     */
	layout: 'fit',
	
    config: {
    	
        /** api: config[hideOnMaskTap] 
         * 
         *  `Boolean` shall the popup hide when the surrounding mask is being 
         *  tapped? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-hideOnMaskTap>`_
         *  
         *  Default is `true`.
         */
    	hideOnMaskTap: true,
    	
    	/** api: config[feature]
         * 
         *  `OpenLayers.Feature.Vector <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Feature/Vector-js.html>`_ 
         *  The feature this popup is about to derive its information from.
         */
        feature: null,
        
        /** api: config[tpl]
         * 
         *  `Ext.XTemplate <http://docs.sencha.com/touch/2-0/#!/api/Ext.XTemplate>`_
         *  The template used to render the popup content. If not provided, a 
         *  rudimentary template is being used. 
         */
        tpl: null,
        
        /** api: config[styleHtmlContent] 
         * 
         *  `Boolean` shall HTML content be styled when rendering content? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-styleHtmlContent>`_
         *  
         *  Default is `true`.
         */
        styleHtmlContent: true,
        
        /** api: config[centered] 
         * 
         *  `Boolean` shall the popup be centered within the viewport? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-centered>`_
         *  
         *  Default is `true`.
         */
        centered : true,
        
        /** api: config[modal] 
         * 
         *  `Boolean` shall the popup be modal? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-modal>`_
         *  
         *  Default is `true`.
         */
        modal : true
    },
    
    /** private: method[constructor]
     * 
     *  The constructor function
     */
    constructor: function(config){
        if (!config.tpl) {
            config.tpl = new Ext.XTemplate('<p>You clicked the feature with the ID: {feature.id}</p>', '<p>Overwrite the config-property tpl to get a custom text.</p>');
        }
        if (config.feature) {
            this._feature = config.feature;
            delete config.feature;
        }
        this.callParent(arguments);
    },
    
    /** private: method[initialize]
     * 
     *  Initializes the Component.
     */
    initialize: function() {
    	
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
    },
    
    /** private: method[applyFeature]
     * 
     *  ``Function`` Intersects the :func:`setFeature` function.
     *  Adds the passed feature via setData to prevent data loss. Is needed to 
     *  support more than one datatype for the new feature. 
     */
    applyFeature: function(newFeature) {
		if(newFeature instanceof OpenLayers.Feature.Vector) {
			
			// set the feature as data, because if we pass
			// an OL object directly as data it gets lost
			this.setData({
				feature: newFeature
			});
		}
		else if (feature instanceof OpenLayers.Geometry) {
			// TODO
		}
		else if (feature instanceof Ext.Record) {
			// TODO
		}
		
		return newFeature;
	}
    
});
