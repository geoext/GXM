
.. currentmodule:: GXM

:class:`GXM.Button`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.Button <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Button>`_
    



xtype
    ``gxm_button``




.. class:: Button(config)

    The class that is used to build a GXM button.



Example Use
-----------

Sample code to create a GXM.Button that controls zooms in:

.. code-block:: javascript

  // create the GXM.Button:
  var btnZoomIn = new GXM.Button({
      control: new OpenLayers.Control.ZoomIn(),
      map: map,
      iconCls: 'add',
      iconMask: true,
      handler: function(){
          // implement Ext.Button handlers as usual
      }
  });

  // The GXM.Button can be used e.g. in a toolbar that is docked to a panel:
  new Ext.Panel({
      dockedItems: [{
          xtype: 'toolbar',
          dock: 'top',
          items: [
              btnZoomIn
          ]
      }
  });


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.Button <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Button>`_.


.. describe:: control

    ``OpenLayers.Control`` The control instance that this button shall work
    on.

.. describe:: exclusiveGroup

    ``String``  An identifier for the exclusive group of GXM-Buttons that
    this button belongs to. This can be used to press/unpress buttons that
    would otherwise compete with each other.
    
    An example would be the buttons to control the digitizing of geometries
    on the map where you would have a GXM.Button for points, linestrings and
    polygons. When these buttons share the same `exclusiveGroup` the pressed
    state will be managed automatically.

.. describe:: map

    ``OpenLayers.Map`` The map that this control belongs to. If the control
    isn't already added to the map's list of controls, it'll be added by the
    class.

.. describe:: mapPanel

    ``GXM.MapPanel`` The MapPanel this button belongs to. Might be used to
    derive the :attr:`map`.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.Button <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Button>`_.


.. attribute:: Button.control

    ``OpenLayers.Control`` The control instance that this button works on.

.. attribute:: Button.exclusiveGroup

    ``String`` An identifier for the exclusive group of GXM-Buttons that
    this button belongs to.

.. attribute:: Button.map

    ``OpenLayers.Map`` An OpenLayers-Map-instance.

.. attribute:: Button.mapPanel

    ``GXM.MapPanel`` The MapPanel of this button.




Public Methods
--------------

Public methods in addition to those
listed for `Ext.Button <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Button>`_.


.. method:: Button.getExclusiveGroupMembers

    :return:  ``Array(GXM.Button)`` An array of all members of the
        :attr:`exclusiveGroup` that this Button belongs to.
    
    Returns an array of all members of the :attr:`exclusiveGroup` that this
    Button belongs to.





