
.. currentmodule:: GXM

:class:`GXM.Map`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.Component <http://docs.sencha.com/touch/2-0/#!/api/Ext.Component>`_
    






.. class:: MapPanel(config)

    The class ensures the backwards compatibility to GXM 0.1



Example Use
-----------

Sample code to create a GXM.Map that fills the whole screen:

.. code-block:: javascript

  Ext.setup({
      onReady: function(){
          var mp = Ext.create('GXM.Map', {
              layers: [
                  // an array of OpenLayers.Layer-objects
              ],
              // set the center of the map
              mapCenter: [8, 51],
              // control the initial zoomlevel
              mapZoom: 11
          });
      } // end of the onReady-funcion
  });


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.Component <http://docs.sencha.com/touch/2-0/#!/api/Ext.Component>`_.


.. describe:: controls

    ``Array(OpenLayers.Control)``
    The layers provided here will be added to this MapPanel's map.

.. describe:: layers

    ``Array(OpenLayers.Layer)``
    The layers provided here will be added to this MapPanel's map.

.. describe:: map

    ``OpenLayers.Map or Object``  A configured map or a configuration object
    for the map constructor.  A configured map will be available after
    construction through the :func:`getMap()` function.

.. describe:: mapCenter

    ``OpenLayers.LonLat, Array(Number) or String``  A location for the
    initial map center.  If an array is provided, the first two items should
    represent x & y coordinates. If a string is provided, it should consist
    of a x & y coordinate seperated by a comma.

.. describe:: mapExtent

    ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map
    (used if center and zoom are not provided.  If an array, the first four
    items should be minx, miny, maxx, maxy.

.. describe:: mapZoom

    ``Number``  An initial zoom level for the map.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.Component <http://docs.sencha.com/touch/2-0/#!/api/Ext.Component>`_.


.. attribute:: Map.layers

    :class:`GXM.data.LayerStore`  A store containing gxm_layer-model
    instances.







