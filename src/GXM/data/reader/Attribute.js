/*
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/GXM/blob/master/license.txt for the full text
 * of the license.
 */

/*
 * @include OpenLayers/Format/WFSDescribeFeatureType.js
 */

/**
 * A reader to create model objects from a DescribeFeatureType structure. Uses
 * `OpenLayers.Format.WFSDescribeFeatureType` internally for the parsing.
 *
 * Example:
<pre><code>
Ext.define('My.model.Model', {
    field: ['name', 'type'],
    proxy: {
        type: 'ajax',
        url: 'http://wftgetfeaturetype',
        reader: {
            type: 'gxm_attribute'
        }
    }
});
</code></pre> 
 * `gxm_attribute` is the alias to the Attribute reader.
 *
 * 
 */

Ext.define('GXM.data.reader.Attribute', {
    extend: 'Ext.data.reader.Json',
    requires: ['Ext.data.Field'],
    alternateClassName: 'GXM.data.AttributeReader',
    alias: 'reader.gxm_attribute',

    config: {
        /**
         * @cfg {OpenLayers.Format} format
         * A parser for transforming the XHR response
         * into an array of objects representing attributes.  Defaults to
         * `OpenLayers.Format.WFSDescribeFeatureType` parser.
         */
        format: null,

        /**
         * @cfg {Object} ignore
         * Properties of the ignore object should be field names.
         * Values are either arrays or regular expressions.
         */
        ignore: null
    },
    
    /**
     * Create a new reader.
     * @param {Object} config (optional) Config object.
     */
    constructor: function(config) {
        if (!this.model) {
            this.model = 'GeoExt.data.AttributeModel';
        }
        
        this.callParent([config]);
    },
    
    /** 
     * Function called by the parent to deserialize a DescribeFeatureType
     * response into Model objects.
     * @param {Object} request The XHR object that contains the
     * DescribeFeatureType response.
     */
    getResponseData: function(request) {
        var data;
        if(request.responseXML || request.responseText){
            var data = request.responseXML;
            if(!data || !data.documentElement) {
                data = request.responseText;
            }    
        } else {
            data = request;
        }
        
        return data;
    },

    /**
     * Function called by 
     * {@link Ext.data.reader.Reader#read Ext.data.reader.Reader's read method} 
     * to do the actual deserialization.
     *
     * @param {DOMElement/String/Array} data A document element or XHR
     * response string.  As an alternative to fetching attributes data from
     * a remote source, an array of attribute objects can be provided given
     * that the properties of each attribute object map to a provided field
     * name.
     */
    readRecords: function(data) {
        if (!this.getFormat()) {
            this.setFormat(new OpenLayers.Format.WFSDescribeFeatureType());
        }
        var attributes;
        if(data instanceof Array) {
            attributes = data;
        } else {
            // only works with one featureType in the doc
            attributes = this.getFormat().read(data).featureTypes[0].properties;
        }
        var fields = this.getModel().prototype.fields;
        var numFields = fields.length;
        var attr, values, name, record, ignore, value, field, records = [];
        for(var i=0, len=attributes.length; i<len; ++i) {
            ignore = false;
            attr = attributes[i];
            values = {};
            for(var j=0; j<numFields; ++j) {
                field = fields.items[j];
                name = field.getName();
                value = attr[name];
                if(this.ignoreAttribute(name, value)) {
                    ignore = true;
                    break;
                }
                values[name] = value;
            }
            if(!ignore) {
                records[records.length] = values;
            }
        }
        return this.callParent([records]);
    },

    /** 
     * Determine if the attribute should be ignored.
     * @param {String} name The field name.
     * @param {String} value The field value.
     * @return {Boolean} True if the attribute should be ignored.
     */
    ignoreAttribute: function(name, value) {
        var ignore = false,
            ignoreConfig = this.getIgnore();
        if(ignoreConfig && ignoreConfig[name]) {
            var matches = ignoreConfig[name];
            if(typeof matches == "string") {
                ignore = (matches === value);
            } else if(matches instanceof Array) {
                ignore = (matches.indexOf(value) > -1);
            } else if(matches instanceof RegExp) {
                ignore = (matches.test(value));
            }
        }
        return ignore;
    }
});
