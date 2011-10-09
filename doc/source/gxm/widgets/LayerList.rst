
.. currentmodule:: GXM

:class:`GXM.LayerList`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.List <http://dev.sencha.com/deploy/touch/docs/?class=Ext.List>`_
    



xtype
    ``gxm_layerlist``




.. class:: LayerList(config)

    The class that is used to build a GXM list of layers.



Example Use
-----------

Sample code to create a GXM.LayerList:

.. code-block:: javascript

  // create a lazily instanciated GXM.LayerList:
  var layerList = {
      xtype: 'gxm_layerlist',
      // call with mapPanel...
      mapPanel: mapPanel,
      // ... or with layers and map, e.g.
      // layers: mapPanel.layers,
      // map: map,
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
those listed for `Ext.List <http://dev.sencha.com/deploy/touch/docs/?class=Ext.List>`_.


.. describe:: layers

    :class:``GXM.data.LayerStore`` The layerstore this list is about to use.

.. describe:: map

    ``OpenLayers.Map`` The map that the Layer-records belong to.

.. describe:: mapPanel

    ``GXM.MapPanel`` The MapPanel this list belongs to. Might be used to
    derive the :attr:`map` and the :attr:`layers`




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.List <http://dev.sencha.com/deploy/touch/docs/?class=Ext.List>`_.


.. attribute:: LayerList.activeBaselayerCls

    ``String`` The CSS class that the list item of the currently active
    baselayer will get.
    
    Defaults to ``gxm-active-baselayer-indicator``.

.. attribute:: LayerList.inactiveBaselayerCls

    ``String`` The CSS class that the list items of the currently inactive
    baselayers will get.
    
    Defaults to ``gxm-inactive-baselayer-indicator``.

.. attribute:: LayerList.invisibleOverlayCls

    ``String`` The CSS class that the list items forcurrently invisible
    overlay layers will get.
    
    Defaults to ``gxm-invisible-overlay-indicator``.

.. attribute:: LayerList.layers

    :class:``GXM.data.LayerStore`` The layerstore this list uses.

.. attribute:: LayerList.map

    ``OpenLayers.Map`` The map that the Layer-records belong to.

.. attribute:: LayerList.mapPanel

    ``GXM.MapPanel`` The MapPanel of this list.

.. attribute:: LayerList.visibleOverlayCls

    ``String`` The CSS class that the list items for currently visible
    overlay layers will get.
    
    Defaults to ``gxm-visible-overlay-indicator``.







