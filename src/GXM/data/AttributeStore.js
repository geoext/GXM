/*
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/GXM/blob/master/license.txt for the full text
 * of the license.
 */

/*
 * @include GXM/data/AttributeModel.js
 */

/**
 * A store to work with DescribeFeatureType responses. This is a regular
 * Ext store preconfigured with a {@link GXM.data.AttributeModel}.
 *
 *
 * Example:
<pre><code>
Ext.create('GXM.data.AttributeStore', {
    ignore: {type: 'xsd:string'},
    url: 'http://host.wfsdescribefeaturetype'
});
</code></pre>
 */
Ext.define('GXM.data.AttributeStore', {
    extend: 'GXM.data.OwsStore',
    requires: ['GXM.data.AttributeModel'],
    config: {
        /** 
         *  @cfg {String} model
         *  The class name for the model to be used. 
         *  Defaults to {@link GXM.data.AttributeModel}.
         */
        model: 'GXM.data.AttributeModel',
        /**
         * @cfg {Object} ignore
         * The ignore object passed to the reader.
         */
        ignore: null
    },
    /**
     * @private
     * We're setting the ignore property in the reader.
     * @param {Object} ignore
     */
    applyIgnore: function(ignore) {
        var reader = this.getProxy().getReader();
        if(reader) { reader.setIgnore(ignore); }
    }
});
