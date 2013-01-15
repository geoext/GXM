/*global Ext: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full 
 * text of the license.
 */

/* @requires GXM/version.js
 */

/**
 * @class GXM.data.proxy.Protocol
 * A data proxy for use with {OpenLayers.Protocol} objects.
 *
 * Sample code to create a store that uses a Protocol proxy:
 *
 *      Ext.define('foo.store.MyStore', {
 *          extend: 'Ext.data.JsonStore',
 *          requires: [
 *              'foo.model.MyModel',
 *              'GXM.data.proxy.Protocol'
 *          ],
 *          config: {
 *              autoLoad: false,
 *              model: 'foo.model.MyModel',
 *              proxy: {
 *                  type: 'gxm_protocol',
 *                  setParamsAsOptions: true,
 *                  protocol: new OpenLayers.Protocol.WFS({
 *                      url: "myurl",
 *                      version: "1.1.0",
 *                      featureType: "myfeaturetype",
 *                      featureNS: "myfeaturens",
 *                      outputFormat: 'json',
 *                      readFormat: new OpenLayers.Format.GeoJSON()
 *                  }),
 *                  reader: 'json'
 *              }
 *          }
 *      });
 */
Ext.define('GXM.data.proxy.Protocol', {
    extend: 'Ext.data.proxy.Server',
    alias: 'proxy.gxm_protocol',

    config: {
        /** 
         * @cfg {OpenLayers.Protocol}
         * The protocol used to fetch features.
         */
        protocol: null,

        /** 
         * @cfg {Boolean}
         * Abort any previous request before issuing another. Default is ``true``.
         */
        abortPrevious: true,

        /** 
         * @cfg {Boolean}
         * Should options.params be set directly on options before passing it into
         * the protocol's read method? Default is ``false``.
         */
        setParamsAsOptions: false
    },

    /** 
     * @property {OpenLayers.Protocol.Response}
     * @private
     * The response returned by the read call on the protocol.
     */
    response: null,

    /**
     * Send the request.
     * @param {Ext.data.Operation} operation The Ext.data.Operation object
     * @param {Function} callback The callback function to call when the Operation has completed
     * @param {Object} scope The scope in which to execute the callback
     * @private
     */
    doRequest: function(operation, callback, scope) {
        var me = this,
            params = Ext.applyIf(operation.getParams() || {}, me.getExtraParams() || {}),
            request;

        //copy any sorters, filters etc into the params so they can be sent over the wire
        params = Ext.applyIf(params, me.getParams(operation));

        var o = {
            params: params || {},
            operation: operation,
            request: {
                callback: callback,
                scope: scope,
                arg: operation.arg
            },
            reader: this.getReader()
        };
        var cb = OpenLayers.Function.bind(this.loadResponse, this, o);
        if (this.getAbortPrevious()) {
            this.abortRequest();
        }
        var options = {
            params: params,
            callback: cb,
            scope: this
        };
        Ext.applyIf(options, operation.initialConfig);
        Ext.applyIf(options, operation.initialConfig.arg);
        if (this.getSetParamsAsOptions() === true) {
            Ext.applyIf(options, options.params);
            delete options.params;
        }
        this.response = this.getProtocol().read(options);
    },

    /** 
     * Called to abort any ongoing request.
     * @private
     */
    abortRequest: function() {
        if (this.response) {
            this.getProtocol().abort(this.response);
            this.response = null;
        }
    },

    /**
     * Handle response from the protocol
     * @private
     * @param {Object} o
     * @param {OpenLayers.Protocol.Response} response
     */
    loadResponse: function(o, response) {
        var me = this;
        var operation = o.operation;
        var scope = o.request.scope;
        var callback = o.request.callback;
        if (response.success()) {
            var result = o.reader.read(response.features || response);
            // an empty array for response.features is a valid response
            if (response.features && response.features.length === 0) {
                result.setSuccess(true);
            }
            if (operation.process('read', result, null, response) === false) {
                this.fireEvent('exception', this, response, operation);
            }
        } else {
            me.setException(operation, response);
            me.fireEvent('exception', this, response, operation);
        }
        if (typeof callback == 'function') {
            callback.call(scope || me, operation);
        }
    }
});
