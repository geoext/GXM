/*global Ext: true */
/*
 * Copyright (c) 2011-2013 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See http://svn.geoext.org/sandbox/gxm/geoext/gxm/license.txt for the full 
 * text of the license.
 */

/**
 * @class GXM.util.Base
 * The class that is used to access the static util methods
 */
Ext.define('GXM.util.Base', {

    requires: [
        'GXM.version'
    ],

    statics: {

        /**
         *  Creates an alias for a config property of a class.
         *  @param {Object} cls The class object to manipulate
         *  @param {String} alias The alias to set for the config
         *  @param {String} origin The config to be aliased
         *  @static
         */
        createConfigAlias: function (cls, alias, origin) {
            // Our strategy: 
            // 1) Use cls.createAlias to get new setters/getters/appliers for the
            //    alias from the auto-created ones of the origin.
            // 2) Grab the classes initialize-method,
            // 3) change it to always first call the origin setter with
            //    the value of the configured alias (if configured in instantiation)
            //    Do this only if the origin has not been configured, e.g.
            //    the origin will win over alias if both are defined
            var init = cls.prototype.initialize,
                capitalizedOrigin = Ext.String.capitalize(origin),
                getterNameOrigin = 'get' + capitalizedOrigin,
                setterNameOrigin = 'set' + capitalizedOrigin,
                applierNameOrigin = 'apply' + capitalizedOrigin,
                capitalizedAlias = Ext.String.capitalize(alias),
                getterNameAlias = 'get' + capitalizedAlias,
                setterNameAlias = 'set' + capitalizedAlias,
                applierNameAlias = 'apply' + capitalizedAlias;

            cls.createAlias(getterNameAlias, getterNameOrigin);
            cls.createAlias(setterNameAlias, setterNameOrigin);
            cls.createAlias(applierNameAlias, applierNameOrigin);

            // overwrite the initialize function
            cls.prototype.initialize = function () {
                if (Ext.isDefined(this.initialConfig[alias])
                         && !Ext.isDefined(this.initialConfig[origin])) {
                    // call original setter with configured alias 
                    this[setterNameOrigin](this.initialConfig[alias]);
                }

                // call original initialize method
                init.apply(this, arguments);
            };
        }
    }
});
