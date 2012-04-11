
.. currentmodule:: GXM

:class:`GXM.Button`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.Button <http://docs.sencha.com/touch/2-0/#!/api/Ext.Button>`_
    






.. class:: Button(config)

    The class that is used to construct a GXM Button.



Example Use
-----------

Sample code to create a GXM.Button that controls zooms in:

.. code-block:: javascript

  // create the GXM.Button:
  var btnZoomIn = Ext.create('GXM.Button', {
      control: new OpenLayers.Control.ZoomIn(),
      map: map,
      iconCls: 'add',
      iconMask: true,
      handler: function(){
          // implement Ext.Button handlers as usual
      }
  });

  // The GXM.Button can be used e.g. in a toolbar that is docked to a panel:
  Ext.create('Ext.Panel', {
      items: [{
          xtype: 'toolbar',
          docked: 'top',
          items: [
              btnZoomIn
          ]
      }
  });


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.Button <http://docs.sencha.com/touch/2-0/#!/api/Ext.Button>`_.


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

    ``GXM.Map`` The GXM Map component this button belongs to. Might be used to
    derive the corresponding OpenLayers Map object.

.. describe:: pressed

    ``Boolean`` The initial state of this button.
    Defaults to ``false``.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.Button <http://docs.sencha.com/touch/2-0/#!/api/Ext.Button>`_.


.. attribute:: Button.olMap

    ``OpenLayers.Map``  The reference to the related OpenLayers Map object.
    This is for readonly use. To pass a map object to this class use the
    :attr:`map` config option.




Public Methods
--------------

Public methods in addition to those
listed for `Ext.Button <http://docs.sencha.com/touch/2-0/#!/api/Ext.Button>`_.


.. method:: Button.getExclusiveGroupMembers

    :return:  ``Array(GXM.Button)`` An array of all members of the
        :attr:`exclusiveGroup` that this Button belongs to.
    
    Returns an array of all members of the :attr:`exclusiveGroup` that this
    Button belongs to.





