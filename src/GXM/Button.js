/**
 * Copyright (c) 2012 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license. 
 * 
 * See https://raw.github.com/geoext/GXM/master/license.txt for the full 
 * text of the license.
 */

/** api: (define)
 *  module = GXM
 *  class = Button
 *  base_link = `Ext.Button <http://docs.sencha.com/touch/2-0/#!/api/Ext.Button>`_
 */

/** api: example
 *  Sample code to create a GXM.Button that controls zooms in:
 * 
 *  .. code-block:: javascript
 *  
 *    // create the GXM.Button:
 *    var btnZoomIn = Ext.create('GXM.Button', {
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
 *    Ext.create('Ext.Panel', {
 *        items: [{
 *            xtype: 'toolbar',
 *            docked: 'top',
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
 *      The class that is used to construct a GXM Button.
 */
Ext.define('GXM.Button', {
	
    extend: 'Ext.Button',
    xtype: 'gxm_button',
    
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
    
    /** private: property[togglePressCls]
     *  
     *  ``String``  The CSS class name the button has in case of beeing pressed.
     *  Defaults to ``x-button-pressed``.
     */
    togglePressCls: 'x-button-pressed',
    
    /** api: property[olMap]
     *  
     *  ``OpenLayers.Map``  The reference to the related OpenLayers Map object.
     *  This is for readonly use. To pass a map object to this class use the
     *  :attr:`map` config option. 
     */
    olMap: null,
    
    /**
     * These do all get a getter-, setter- and applier-method
     */
    config: {
    	
        /** api: config[control] 
         * 
         *  ``OpenLayers.Control`` The control instance that this button shall work
         *  on.
         */
        control: null,
        
        /** api: config[map] 
         * 
         *  ``GXM.Map`` The GXM Map component this button belongs to. Might be used to 
         *  derive the corresponding OpenLayers Map object.
         */
        map:  null,
        
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
        exclusiveGroup: null,
        
        /** api: config[pressed] 
         * 
         *  ``Boolean`` The initial state of this button.
         *  Defaults to ``false``.
         */
        pressed: false
    },
    
    /** private: method[constructor]
     * 
     *  The constructor function
     */
    constructor: function(config){
        // To not run into endless recursion we need to delete any
        // OpenLayers components that can be used to configure this
        // component.
        if (config && config.control) {
            this._control = config.control;
            delete config.control;
        }
        this.callParent(arguments);
    },
    
    /** private: method[initialize]
     * 
     *  Initializes the Component.
     */
    initialize: function(){
        this.callParent();
        
        if ( this.getMap() && this.getMap().getMap() ) {
            this.olMap = this.getMap().getMap();
        } else if ( this.getControl() && this.getControl().map ) {
            this.olMap = this.getControl().map;
        }
        
        // store the user scope and handlers
        this.uScope = this.getScope();
        this.uHandler = this.getHandler();
        
        this.setScope(this);
        this.setHandler(this.pHandler);      
        
        if (this.getControl()) {
            if (this.olMap && !this.getControl().map ) {
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
        }
    },
    
    /** private: method[applyPressed]
     * 
     *  ``Function`` Intersects the :func:`setPressed` function.
     *  Adds the corresponding CSS class.
     */
    applyPressed: function(newPressedVal){
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
            var elem = member.element;
            if (myId !== member.id) {
                member.setPressed(false);
            }
        });
        this._isDeactivating = false;

        this.setPressed(true);
    },
    
    /** private: method[onCtrlDeactivate]
     * 
     *  Called on control deactivation. Removes this button's `pressedCls`
     */
    onCtrlDeactivate: function(){
        if(!this._isDeactivating) {
            this.setPressed(false);
        }
    },
    
    /** private: method[pHandler]
     *  
     *  The auto-defined handler-method to invoke as handler for 
     *  the button. Handles the activation/deactivation or triggering of the 
     *  configured OpenLayers.Control.
     */
    pHandler: function(){
        var ctrl = this.getControl();
        if(ctrl && ctrl.type === OpenLayers.Control.TYPE_BUTTON) {
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
    getExclusiveGroupMembers: function(){
        var members = [];
        var myGroup = this.getExclusiveGroup();
        if (myGroup) {
            members = Ext.ComponentQuery.query('gxm_button[exclusiveGroup="' + myGroup + '"]')
        }
        return members;
    }
    
});
