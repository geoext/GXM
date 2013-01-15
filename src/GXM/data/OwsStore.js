/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/GXM/GXM2/blob/master/license.txt for the full text
 * of the license.
 */

/**
 * <p>Small Base class to make creating stores for remote OWS information sources
 * easier.</p>
 * <p>NOTE: This is a BASE CLASS and is not designed for direct use in an
 * application. Instead, one should extend from this class in any situation in
 * which you need a {@link Ext.data.proxy.Server} (ex: 'ajax', 'jsonp', etc) and a
 * reader which requires an {@link OpenLayers.Format} to parse the data.</p>
 *
 * @class GXM.data.OwsStore
 */
Ext.define('GXM.data.OwsStore', {
    extend: 'Ext.data.Store',
    alternateClassName: ['GXM.data.OWSStore'],

    config: {
        /**
         * @cfg {String}
         * The URL from which to retrieve the remote OWS response
         */
        url : null,

        /**
         * @cfg {OpenLayers.Format}
         * A parser for transforming the XHR response into an array of objects
         * representing attributes.
         */
        format : null
    },

    /**
     * @private
     */
    constructor: function(config) {
        // At this point, we have to copy the complex objects from the config
        // into the prototype. This is because Ext.data.Store's constructor 
        // creates deep copies of these objects.
        var format;
        if (config.format) {
            format = config.format;
            delete config.format;
        }
        
        this.callParent([config]);

        if(format) {
            this.setFormat(format);
        }
    },
    
    /**
     * @private
     */
    applyUrl: function(newValue) {
        if(newValue && Ext.isString(newValue)) {
            var proxy = this.getProxy();
            if(proxy && proxy.setUrl) {
                proxy.setUrl(newValue);
            }
        }
    },
    
    /**
     * @private
     */
    applyFormat: function(newFormat) {
        var proxy = this.getProxy();
        var reader = (proxy) ? proxy.getReader() : null;
        if(reader) {
            reader.setFormat(newFormat);
        }
    }
});
