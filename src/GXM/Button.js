/*global Ext: true, OpenLayers: true */
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
 * @class GXM.Button
 * The class that is used to construct a GXM Button.
 *
 * Sample code to create a GXM.Button that controls zooms in:
 *
 * create the GXM.Button:
 *     var btnZoomIn = Ext.create('GXM.Button', {
 *         control: new OpenLayers.Control.ZoomIn(),
 *         map: gxmMap,
 *         iconCls: 'add',
 *         iconMask: true,
 *         handler: function(){
 *             // implement Ext.Button handlers as usual
 *         }
 *      });
 *
 * The GXM.Button can be used e.g. in a toolbar that is docked to a panel:
 *      Ext.create('Ext.Panel', {
 *          items: [{
 *              xtype: 'toolbar',
 *              docked: 'top',
 *              items: [
 *                 btnZoomIn
 *              ]
 *          }]
 *      });
 */
Ext.define('GXM.Button', {

    extend: 'Ext.Button',

    requires: [
        'GXM.version'
    ],

    xtype: 'gxm_button',

    /**
     *  @private
     *  @property {Boolean} autoadded
     *  When a button instance is created with a control that did
     *  not belong to a map already we add it to the configured map. That also
     *  means that we are responsible for removing said control from the map in
     *  the case that this button is destroyed. This property tracks whether we
     *  added the control to a map.
     */
    autoadded: null,

    /**
     *  @private
     *  @property {Object} uScope
     *  The scope the user-defined button handler method shall be executed in.
     */
    uScope: null,

    /**
     *  @private
     *  @property {Function} uHandler
     *  The user-defined handler-method to invoke as handler for the button.
     */
    uHandler: null,

    /**
     *  @private
     *  @property {String} togllePressCls
     *  The CSS class name the button has in case of beeing pressed.
     */
    togglePressCls: 'x-button-pressed',

    /**
     *  @property {OpenLayers.Map} olMap
     *  The reference to the related OpenLayers Map object.
     *  This is for readonly use. To pass a map object to this class use the
     *  :attr:`map` config option.
     */
    olMap: null,


    // These do all get a getter-, setter- and applier-method

    config: {

        /**
         *  @cfg {OpenLayers.Control} control
         *  The control instance that this button shall work on.
         */
        control: null,

        /**
         *  @cfg {GXM.Map} map
         *  The GXM Map component this button belongs to. Might be used to
         *  derive the corresponding OpenLayers Map object.
         */
        map: null,

        /**
         *  @cfg {String} exclusiveGroup
         *  An identifier for the exclusive group of GXM-Buttons that
         *  this button belongs to. This can be used to press/unpress buttons that
         *  would otherwise compete with each other.
         *
         *  An example would be the buttons to control the digitizing of geometries
         *  on the map where you would have a GXM.Button for points, linestrings and
         *  polygons. When these buttons share the same `exclusiveGroup` the pressed
         *  state will be managed automatically.
         */
        exclusiveGroup: null,

        /**
         *  @cfg {Boolean} pressed
         *  ``Boolean`` The initial state of this button.
         */
        pressed: false
    },

    /**
     *  @private
     *  The constructor function
     */
    constructor: function (config) {
        // To not run into endless recursion we need to delete any
        // OpenLayers components that can be used to configure this
        // component.
        if (config && config.control) {
            this._control = config.control;
            delete config.control;
        }
        this.callParent(arguments);
    },

    /**
     *  @private
     *  Initializes the Component.
     */
    initialize: function () {
        this.callParent();

        if (this.getMap() && this.getMap().getMap()) {
            this.olMap = this.getMap().getMap();
        } else if (this.getControl() && this.getControl().map) {
            this.olMap = this.getControl().map;
        }

        // store the user scope and handlers
        this.uScope = this.getScope();
        this.uHandler = this.getHandler();

        this.setScope(this);
        this.setHandler(this.pHandler);

        if (this.getControl()) {
            if (this.olMap && !this.getControl().map) {
                // add the control to the configured map
                this.olMap.addControl(this.getControl());
                // add internal flag to remove the control 
                // from the map when this button is destroyed
                this.autoadded = true;
            } else {
                this.autoadded = false;
            }

            // register the handlers that sync the visual pressed
            // state with the controls active-state
            this.getControl().events.on({
                activate: this.onCtrlActivate,
                deactivate: this.onCtrlDeactivate,
                scope: this
            });
            // remove the control before we destroy the button
            // in case the control was not added to the map before
            this.onBefore("destroy", function () {
                if (this.autoadded) {
                    this.getControl().destroy();
                }
            }, this);
        }
    },

    /**
     *  @private
     *  Intersects the :func:`setPressed` function. Adds the corresponding CSS class.
     */
    applyPressed: function (newPressedVal) {
        if (this.getControl() && this.getControl().map) {
            if (newPressedVal === true) {
                this.addCls(this.togglePressCls);
                this.getControl().activate();
            } else {
                this.removeCls(this.togglePressCls);
                this.getControl().deactivate();
            }
        }
        return newPressedVal;
    },

    /**
     *  @private
     *  Called when the configured control is activated. Handles the
     *  deactivation of the other OpenLayers.Controls and the updating of the
     *  visual states (removal of `pressedCls`), but only when using a
     *  segmented button and an exclusiveGroup
     */
    onCtrlActivate: function () {
        if (this.getExclusiveGroup()) {
            var exclusiveGroupMembers = this.getExclusiveGroupMembers(),
                myId = this.id;
            this._isDeactivating = true;
            Ext.each(exclusiveGroupMembers, function (member) {
                var elem = member.element;
                if (myId !== member.id) {
                    member.setPressed(false);
                }
            });
            this._isDeactivating = false;

            this.setPressed(true);
        }
    },

    /**
     *  @private
     *  Called on control deactivation. Removes this button's `pressedCls`,
     *  but only when using a segmented button and an exclusiveGroup
     */
    onCtrlDeactivate: function () {
        if (this.getExclusiveGroup()) {
            if (!this._isDeactivating) {
                this.setPressed(false);
            }
        }
    },

    /**
     *  @private
     *  The auto-defined handler-method to invoke as handler for
     *  the button. Handles the activation/deactivation or triggering of the
     *  configured OpenLayers.Control.
     */
    pHandler: function () {
        var ctrl = this.getControl();
        if (ctrl && ctrl.type === OpenLayers.Control.TYPE_BUTTON) {
            ctrl.trigger();
        } else {
            if (!ctrl.active) {
                ctrl.activate();
            } else {
                ctrl.deactivate();
            }
        }
        if (this.uHandler) {
            // adding the controls active state as last arg for the callback
            var args = Ext.toArray(arguments);
            args.push(ctrl.active);
            this.uHandler.apply(this.uScope, args);
        }
    },

    /**
     *  Returns an array of all members of the :attr:`exclusiveGroup` that this
     *  Button belongs to.
     *
     *  @return {GXM.Button[]} An array of all members of the :attr:`exclusiveGroup`
     *  that this Button belongs to.
     */
    getExclusiveGroupMembers: function () {
        var members = [],
            myGroup = this.getExclusiveGroup();
        if (myGroup) {
            members = Ext.ComponentQuery.query('gxm_button[exclusiveGroup="' + myGroup + '"]');
        }
        return members;
    }

});
