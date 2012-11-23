/*
 * Copyright (c) 2008-2012 The Open Source Geospatial Foundation
 *
 * Published under the BSD license.
 * See https://github.com/geoext/GXM/blob/master/license.txt for the full text
 * of the license.
 */

/*
 * @include GXM/data/reader/Attribute.js
 */

/**
 * @class GXM.data.AttributeModel
 * <p>A specific model for WFS DescribeFeatureType records.<p>
 *
 * Preconfigured with an Ajax proxy and a
 * {@link GXM.data.reader.Attribute}.
 */


Ext.define('GXM.data.AttributeModel', {
    alternateClassName: ['GXM.data.AttributeRecord'],
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Ajax', 
        'GXM.data.reader.Attribute'
    ],
    alias: 'model.gxm_attribute',
    config:{  
        fields: [
            {name: 'name', type: 'string'},
            {name: 'type', defaultValue: null},
            {name: 'restriction', defaultValue: null},
            {name: 'nillable', type: 'bool'}
        ],
        proxy: {
            type: 'ajax',
            reader: {
                type: 'gxm_attribute'
            }
        }
    }
});
