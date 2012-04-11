
.. currentmodule:: GXM

:class:`GXM.LayerList`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_
    






.. class:: LayerList(config)

    The class that is used to construct a GXM LayerList.



Example Use
-----------

Sample code to create a GXM.LayerList:

.. code-block:: javascript

  // create a lazily instanciated GXM.LayerList:
  var layerList = {
      xtype: 'gxm_layerlist',
      // call with mapPanel...
      map: gxmMap,
      listeners: {
          itemtap: function(){
              Ext.Msg.alert(
                  'Application event "itemtap"',
                  'You can still register events as usual.'
              );
          }
      }
  };


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_.


.. describe:: layers

    :class:`GXM.data.LayerStore` The layerstore this list is about to use.

.. describe:: map

    :class:`GXM.Map` The GXM Map component this `LayerList` refers to. Might be used to
    derive the corresponding OpenLayers Map object.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_.


.. attribute:: LayerList.activeBaselayerCls

    ``String`` The CSS class that the list item of the currently active
    baselayer will get.
    
    Defaults to ``gxm-active-baselayer-indicator``.

.. attribute:: LayerList.inactiveBaselayerCls

    ``String`` The CSS class that the list items of the currently inactive
    baselayers will get.
    
    Defaults to ``gxm-inactive-baselayer-indicator``.

.. attribute:: LayerList.invisibleOverlayCls

    ``String`` The CSS class that the list items for currently invisible
    overlay layers will get.
    
    Defaults to ``gxm-invisible-overlay-indicator``.

.. attribute:: LayerList.olMap

    ``OpenLayers.Map``  The reference to the related OpenLayers Map object.
    This is for readonly use. To pass a map object to this class use the
    :attr:`map` config option.

.. attribute:: LayerList.visibleOverlayCls

    ``String`` The CSS class that the list items for currently visible
    overlay layers will get.
    
    Defaults to ``gxm-visible-overlay-indicator``.







