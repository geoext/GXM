/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full text of
 * the license.
 */

Ext.ns('GXM');

/** api: (define)
 *  module = GXM
 *  class = Button
 *  base_link = `Ext.Button <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Button>`_
 */

/** api: example
 *  Sample code to create a GXM.Button that controls zooms in:
 * 
 *  .. code-block:: javascript
 *  
 *    // create the GXM.Button:
 *    var btnZoomIn = new GXM.Button({
 *        control: new OpenLayers.Control.ZoomIn(),
 *        map: map,
 *        iconCls: 'add',
 *        iconMask: true,
 *        handler: function(){
 *            // implement Ext.Button handlers as usual
 *        }
 *    });
 *    
 *    // The GXM.Button can be used e.g. in a toolbar that is docked to a panel:
 *    new Ext.Panel({
 *        dockedItems: [{
 *            xtype: 'toolbar',
 *            dock: 'top',
 *            items: [
 *                btnZoomIn
 *            ]
 *        }
 *    });
 *     
 */

/** api: constructor
 *  .. class:: Button(config)
 *   
 *      The class that is used to build a GXM button.
 */
GXM.Button = Ext.extend(Ext.Button, {
    /** api: config[exclusiveGroup]
     * 
     *  ``String``  An identifier for the exclusive group of GXM-Buttons that
     *  this button belongs to. This can be used to press/unpress buttons that
     *  would otherwise compete with each other. 
     *  
     *  An example would be the buttons to control the digitizing of geometries
     *  on the map where you would have a GXM.Button for points, linestrings and
     *  polygons. When these buttons share the same `exclusiveGroup` the pressed
     *  state will be managed automatically.
     */

    /** api: property[exclusiveGroup]
     * 
     *  ``String`` An identifier for the exclusive group of GXM-Buttons that
     *  this button belongs to.
     */
    exclusiveGroup:null,
    
    /** api: config[map]
     * 
     *  ``OpenLayers.Map`` The map that this control belongs to. If the control 
     *  isn't already added to the map's list of controls, it'll be added by the
     *  class.
     */

    /** api: property[map]
     * 
     *  ``OpenLayers.Map`` An OpenLayers-Map-instance.
     */
    map: null,
    
    /** api: config[mapPanel] 
     * 
     *  ``GXM.MapPanel`` The MapPanel this button belongs to. Might be used to 
     *  derive the :attr:`map`.
     */

    /** api: property[mapPanel]
     * 
     *  ``GXM.MapPanel`` The MapPanel of this button.
     */
    mapPanel: null,
    
    /** private: property[uScope]
     * 
     *  ``Object`` The scope the user-defined button handler method shall be 
     *  executed in.
     */
    uScope: null,
    
    /** private: property[uHandler]
     *  
     *  ``Function`` The user-defined handler-method to invoke as handler for 
     *  the button.
     */
    uHandler: null,
    
    /** private: property[pScope]
     * 
     *  ``GXM.Button`` The scope the auto-defined button handler method shall be 
     *  executed in. Will be `this`, e.g. the current GXM.Button-instance.
     */
    
    /** api: config[control] 
     * 
     *  ``OpenLayers.Control`` The control instance that this button shall work
     *  on.
     */

    /** api: property[control]
     * 
     *  ``OpenLayers.Control`` The control instance that this button works on.
     */
    control:null,
    
    /** private: property[autoadded]
     * 
     *  ``Boolean`` When a button instance is created with a control that did 
     *  not belong to a map already we add it to the configured map. That also 
     *  means that we are responsible for removing said control from the map in 
     *  the case that this button is destroyed. This property tracks whether we 
     *  added the control to a map.
     *  
     *  Defaults to `null` but will be set to the correct value on
     *  button instanciation. 
     */
    autoadded: null,
    
    /** private: method[initComponent]
     * 
     *  Initializes the button.
     */
    initComponent : function(){
        GXM.Button.superclass.initComponent.call(this);
        
        // register button for de/activating in exclusiveGroups
        GXM.Button.manager.register(this);
        
        if (!this.map && this.mapPanel && this.mapPanel.map) {
            this.map = this.mapPanel.map;  
        } else if (!this.map && this.control && this.control.map) {
            this.map = this.control.map;  
        }
        
        // store the user scope and handlers
        this.uScope = this.scope;
        this.uHandler = this.handler;
        
        this.scope = this;
        this.handler = this.pHandler;      
        
        if (this.control) {
            if (this.map  && !this.control.map ) {
                // add the control to the configured map
                this.map.addControl(this.control);
                // add internal flag to remove the control 
                // from the map when this button is destroyed
                this.autoadded = true;
            } else {
                this.autoadded = false;
            }
            // if we were configured with pressed:true,
            // we need to activate the control and add 
            // the appropriate css class 
            if(this.pressed && this.control.map) {
                this.addCls(this.pressedCls);
                this.control.activate();
            }
            // register the handlers that sync the visual pressed
            // state with the controls active-state
            this.control.events.on({
                activate: this.onCtrlActivate,
                deactivate: this.onCtrlDeactivate,
                scope: this
            });
        }
    },
    
    /** private: method[pHandler]
     *  
     *  The auto-defined handler-method to invoke as handler for 
     *  the button. Handles the activation/deactivation or triggering of the 
     *  configured OpenLayers.Control.
     */
    pHandler: function(cmp) {
        var ctrl = this.control;
        if(ctrl &&
           ctrl.type === OpenLayers.Control.TYPE_BUTTON) {
            ctrl.trigger();
        } else {
            if ( !ctrl.active ) {
                ctrl.activate();
            } else {
                ctrl.deactivate();
            }
        }
        if(this.uHandler) {
            // adding the controls active state as last arg for the callback
            var args = Ext.toArray(arguments);
            args.push(ctrl.active);
            this.uHandler.apply(this.uScope, args);
        }
    },
    
    /** api: method[getExclusiveGroupMembers]
     *  :return:  ``Array(GXM.Button)`` An array of all members of the 
     *      :attr:`exclusiveGroup` that this Button belongs to.
     *  
     *  Returns an array of all members of the :attr:`exclusiveGroup` that this
     *  Button belongs to.
     */      
    getExclusiveGroupMembers: function() {
        var members = [];
        var myGroup = this.exclusiveGroup;
        if (myGroup) {
            GXM.Button.manager.each(function(id, btn) {
                if(btn.exclusiveGroup === myGroup) {
                    members.push(btn);
                }
            });
        }
        return members;
    },
    
    /** private: method[onCtrlActivate]
     * 
     *  Called when the configured control is activated. Handles the 
     *  deactivation of the other OpenLayers.Controls and the updating of the 
     *  visual states (removal of `pressedCls`).
     */
    onCtrlActivate: function(){
        var exclusiveGroupMembers = this.getExclusiveGroupMembers();
        var myId = this.id;
        this._isDeactivating = true;
        Ext.each(exclusiveGroupMembers, function(member) {
            if (myId !== member.id) {
                member.control.deactivate();
                // we usually do not need to consider the visual apperance of 
                // buttons, but the members of our exclusive grop might be 
                // spread accross different gxm_segmentedbuttons
                if (member.pressed) {
                    member.pressed = false;
                    member.removeCls(member.pressedCls);
                }
            }
        });
        this._isDeactivating = false;

        if (!this.getEl().hasCls(this.pressedCls)) {
            this.addCls(this.pressedCls);
        }
    },
    
    /** private: method[onCtrlDeactivate]
     * 
     *  Called on control deactivation. Removes this button's `pressedCls`
     */
    onCtrlDeactivate: function(){
        if(!this._isDeactivating) {
            this.removeCls(this.pressedCls);
        }
    },
    
    /** private method[beforeDestroy]
     * 
     *  Called prior to destroying the button. We remove all our registered 
     *  handlers and nullify relevant properties.
     */
    beforeDestroy: function() {
        // unregister button for de/activating in exclusiveGroups
        GXM.Button.manager.unregister(this);

        // unregister the handlers that synced the visual pressed
        // state with the controls active-state
        if (this.control && this.control.events) {
            this.control.events.un({
                activate: this.onCtrlActivate,
                deactivate: this.onCtrlDeactivate,
                scope: this
            });
            // remove the control from the map if we added it
            if (this.autoadded) {
                this.map.removeControl(this.control);
            } 
        }
        
        delete this.control;
        delete this.mapPanel;
        delete this.map;
        
        GXM.Button.superclass.beforeDestroy.call(this);
    }
});

/** api: xtype = gxm_button */
Ext.reg('gxm_button', GXM.Button);

// usually a Ext.ComponentQuery.query('gxm_button[exclusiveGroup="humpty"]') 
// would be enough, but it seems as if we currently have a bug in sencha:
// http://www.sencha.com/forum/showthread.php?120633-Ext.ComponentQuery.query()-not-working
GXM.Button.manager = new Ext.AbstractManager();