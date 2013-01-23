/*global Ext: true, OpenLayers: true, GXM: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/* @requires GXM/version.js
 */

/**
 * @class GXM.form.FeatureEditor
 * The class that is used to construct a GXM FeatureEditor. This is a form
 * that can be used to edit the attributes of a feature. The feature itself is 
 * modified and a featuremodified event is triggered on its layer.
 * No editing of geometries is currently supported.
 */
Ext.define("GXM.form.FeatureEditor",{
    extend: 'Ext.form.Panel',
    alias: 'widget.gxm_featureeditor',
    requires: [
        'Ext.field.Text',
        'Ext.field.Number',
        'Ext.field.Checkbox',
        'Ext.field.DatePicker',
        'Ext.field.Select',
        'Ext.data.Validations'
    ],
    /**
     * @event failure
     * Fires if the feature was not updated successfully.
     * @param {GXM.form.FeatureEditor} this
     * @param {String} message
     */

    /**
     * @property {String} modelId
     * @private
     * The identifier of the model that is created on the fly to support
     * validation.
     */
    modelId: null,
    config: {
        /** @cfg {String}
         *  i18n: the text to display on the update button.
         */
        updateText: "Update",
        /** @cfg {String}
         *  i18n: the text to display on the cancel button.
         */
        cancelText: "Cancel",
        /** @cfg {OpenLayers.Feature.Vector}
         *  The feature being edited/displayed.
         */
        feature: null,
        /** @cfg {Object}
         *  An object with as keys the field names, which will provide the ability
         *  to override the xtype that is created by default based on the
         *  schema. 
         */
        fieldConfig: null,
        /** @cfg {Array}
         *  List of field config names corresponding to feature attributes.  If
         *  not provided, fields will be derived from attributes. If provided,
         *  the field order from this list will be used, and fields missing in the
         *  list will be excluded.
         */
        formFields: null,
        /** @cfg {Array}
         *  Optional list of field names (case sensitive) that are to be
         *  excluded from the form.
         */
        excludeFields: null,
        /** @cfg {Boolean}
         *  Set to true to disable editing. Default is false.
         */
        readOnly: false,
        /** @cfg {String}
         *  For multi-lingual applications, this can be used to take the
         *  annotation from the WFS DescribeFeatureType schema in the correct
         *  language. Default is "en".
         */
        language: "en",
        /** @cfg {GXM.data.AttributeStore}
         *  The attribute store that contains information about the fields
         *  of the feature.
         */
        schema: null
    },
    statics: {
        regexes: {
            "text": new RegExp("^(text|string)$", "i"),
            "number": new RegExp("^(number|float|decimal|double|int|long|integer|short)$", "i"),
            "boolean": new RegExp("^(boolean)$", "i"),
            "date": new RegExp("^(date|dateTime)$", "i"),
            "geometry": new RegExp("^[^:]*:?((Multi)?(Point|Line|Polygon|Curve|Surface|Geometry))")
        }
    },
    /**
     * @private
     * If valid, updates the feature.
     */
    doUpdate: function() {
        var me = this; 
        var errors = me.validate();
        if (errors.isValid()) {
            var feature = me.getFeature();
            if (!feature.modified) {
                feature.modified = {
                    attributes: {}
                };
            }
            this.getFieldsAsArray().forEach(function(field) {
                if (field.isDirty()) {
                    var name = field.getName();
                    feature.modified[name] = true;
                    feature.attributes[name] = field.getValue();
                }
            });
            if (feature.state !== OpenLayers.State.INSERT) {
                feature.state = OpenLayers.State.UPDATE;
            }
            if (feature.layer) {
                feature.layer.events.triggerEvent('featuremodified', {
                    feature: feature
                });
            }
        } else {
            var message = '';
            Ext.each(errors.items,function(rec,i){
                message += rec.getField() + ' ' + rec.getMessage() + "<br>";
            });
            this.fireEvent("failure", this, message);
        }
    },
    /**
     * @private
     * Cancel any changes to the feature. If configured with a protocol,
     * update the server as well.
     */
    doCancel: function() {
        this.reset();
        var values = this.getValues(), feature = this.getFeature();
        for (var name in values) {
            feature.attributes[name] = values[name];
        }
        if (feature.layer) {
            feature.layer.events.triggerEvent('featuremodified', {
                feature: feature
            });
        }
    },
    /**
     * @private
     * The constructor.
     */
    constructor: function (config) {
        if (config.feature) {
            this._feature = config.feature;
            delete config.feature;
        }
        this.callParent(arguments);
    },
    /**
     * @private
     * Intersects the :func:`setFeature` function.
     *  Adds the passed feature via setData to prevent data loss. Is needed to
     *  support more than one datatype for the new feature.
     *
     *  @param {Object} feature the new feature representation.
     *  @return {OpenLayers.Feature}
     */
    applyFeature: function (feature) {
        this.setData({
            feature: feature
        });
        return feature;
    },
    /**
     * @private
     * Initialize this class.
     */
    initialize: function() {
        var feature = this.getFeature();
        // set the given feature in order to call the apply method
        // which cares about the data types necessary because we do the manual setting
        // of feature in constructor due to known issues with circular references
        if (Ext.isDefined(feature)) {
            this.setFeature(feature);
        }
        this.add({
            xtype: 'toolbar',
            docked: 'bottom',
            items: [{
                xtype: 'spacer',
                flex: 1
            }, {
                text: this.getUpdateText(),
                handler: 'doUpdate',
                scope: this
            }, {
                text: this.getCancelText(),
                handler: 'doCancel',
                scope: this
            }]
        });
        Ext.applyIf(Ext.data.Validations, {
            range: function(config, value) {
                return value === null || 
                    (value >= config.minValue && value <= config.maxValue);
            }
        });
        var r = this.self.regexes, fieldCfg, record;
        var name, fields = [], schema = this.getSchema();
        var modelConfig = {
            fields: [],
            validations: []
        };
        if (this.getFormFields()) {
            for (var i=0, ii=this.getFormFields().length; i<ii; ++i) {
                name = this.getFormFields()[i];
                var idx = schema.findExact('name', name);
                if (idx !== -1) {
                    record = schema.getAt(idx);
                    fieldCfg = this.recordToField(record, modelConfig);
                    if (fieldCfg !== null) {
                        fields.push(fieldCfg);
                    }
                }
            }
        } else if (schema) {
            schema.each(function(record) {
                var type = record.get("type"); 
                name = record.get("name");
                if (type.match(this.self.regexes["geometry"])) {
                    // exclude gml geometries
                    return;
                }
                var fieldCfg = this.recordToField(record, modelConfig);
                if (fieldCfg !== null) {
                    fields.push(fieldCfg);
                }
            }, this);
        }
        this.modelId = Ext.id(null, 'gxm-attribute-model');
        Ext.define(this.modelId, {
            extend: 'Ext.data.Model',
            config: modelConfig
        });
        this.add(fields);
        this.callParent();
    },
    /**
     * @private
     * Validate the form.
     * @return {Ext.data.Errors} The errors object.
     */
    validate: function() {
        var instance = Ext.create(this.modelId, this.getValues());
        return instance.validate();
    },
    /**
     * @private
     * create fieldConfig from a record from an AttributeStore. Also
     * create the config for the model to be used for validations.
     *
     * @param {GXM.data.AttributeModel} record The record from the 
     * AttributeStore
     * @param {Object} modelConfig The config object for the model.
     * @return {Object} The field configuration object.
     */
    recordToField: function(record, modelConfig) {
        var name = record.get('name');
        if (this.getExcludeFields() && this.getExcludeFields().indexOf(name) !== -1) {
            return null;
        }
        var options = {};
        if (this.getReadOnly() === true) {
            options.readOnly = true;
        }
        var feature = this.getFeature();
        if (feature && feature.attributes[name] !== undefined) {
            options.value = feature.attributes[name];
        }
        var r = this.self.regexes;
        var type = record.get("type");
        type = type.split(":").pop();
        modelConfig.fields.push({name: name, type: type});
        var fieldConfig = null;
        options.name = name;
        var restriction = record.get("restriction") || {};
        var annotation = record.get('annotation');
        if (annotation && annotation.appinfo) {
            options.label = Ext.decode(annotation.appinfo[0]).title[this.getLanguage()];
        } else {
            options.label = record.get('name');
        }
        if (this.getFieldConfig() && this.getFieldConfig()[name]) {
            Ext.apply(options, this.getFieldConfig()[name]);
        }
        var i, ii;
        if (annotation && annotation.documentation) {
            for (i=0, ii=annotation.documentation.length; i<ii; ++i) {
                if (annotation.documentation[i].lang === this.getLanguage()) {
                    options.placeHolder = annotation.documentation[i].textContent;
                    break;
                }
            }
        }
        if (restriction.enumeration) {
            var store = [];
            for (i=0, ii=restriction.enumeration.length; i<ii; ++i) {
                store.push({
                    text: restriction.enumeration[i], 
                    value: restriction.enumeration[i]
                });
            }
            fieldConfig = Ext.apply({
                xtype: "selectfield",
                options: store
            }, options);
        } else if (type.match(r["text"])) {
            var minLength = restriction["minLength"] !== undefined ?
                parseFloat(restriction["minLength"]) : undefined;
            var maxLength = restriction["maxLength"] !== undefined ?
                parseFloat(restriction["maxLength"]) : undefined;
            fieldConfig = Ext.apply({
                xtype: 'textfield',
                maxLength: maxLength
            }, options);
        } else if (type.match(r["number"])) {
            var maxValue = restriction["maxInclusive"] !== undefined ?
                parseFloat(restriction["maxInclusive"]) : undefined;
            var minValue = restriction["minInclusive"] !== undefined ?
                parseFloat(restriction["minInclusive"]) : undefined;
            if (maxValue !== undefined || minValue !== undefined) {
                modelConfig.validations.push({
                    field: name,
                    type: 'range',
                    message: 'out of range, min: ' + minValue + ', max: ' + maxValue,
                    minValue: minValue,
                    maxValue: maxValue
                });
            }
            fieldConfig = Ext.apply({
                xtype: 'numberfield',
                minValue: minValue,
                maxValue: maxValue
            }, options);
        } else if (type.match(r["boolean"])) {
            fieldConfig = Ext.apply({
                xtype: 'checkboxfield',
                checked: (options.value === true)
            }, options);
        } else if (type.match(r["date"])) {
            fieldConfig = Ext.apply({
                xtype: 'datepickerfield'
            }, options);
        }
        return fieldConfig;
    }

});
