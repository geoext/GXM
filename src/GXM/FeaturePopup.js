/*
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
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
    xtype : 'gxm_featurepopup',
    
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
        centered : true,
        
        /**
         * @cfg {Boolean} modal
         *  Should the panel be modal? 
         */
        modal : true
    },
    
    /**
     * @private
     * The constructor function
     */
    constructor: function(config){
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
    
    /**
     * @private
     * Intersects the :func:`setFeature` function.
     *  Adds the passed feature via setData to prevent data loss. Is needed to 
     *  support more than one datatype for the new feature.
     *  
     *  @param {Object} newFeature the new feature representation.
     *  @return {OpenLayers.Feature}
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
