
.. currentmodule:: GXM

:class:`GXM.MapPanel`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.Component <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Component>`_
    



xtype
    ``gxm_mappanel``




.. class:: MapPanel(config)

    The class that is used to build a GXM map.



Example Use
-----------

Sample code to create a GXM.MapPanel that fills the whole screen:

.. code-block:: javascript

  Ext.setup({
      onReady: function(){
          var mp = new GXM.MapPanel({
              layers: [
                  // an array of OpenLayers.Layer-objects
              ],
              // set the center of the map
              center: [8, 51],
              // control the initial zoomlevel
              zoom: 11
          });
      } // end of the onReady-funcion
  });


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.Component <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Component>`_.


.. describe:: bounds

    ``OpenLayers.Bounds or Array(Number)``  An initial extent for the map
    (used if center and zoom are not provided.  If an array, the first four
    items should be minx, miny, maxx, maxy.

.. describe:: center

    ``OpenLayers.LonLat, Array(Number) or String``  A location for the
    initial map center.  If an array is provided, the first two items should
    represent x & y coordinates. If a string is provided, it should consist
    of a x & y coordinate seperated by a comma.

.. describe:: controls

    ``Array(OpenLayers.Control)``
    The layers provided here will be added to this MapPanel's map.

.. describe:: fullscreen

    ``Boolean`` Shall this component be rendered to fill the full screen of
    the device? Defaults to ``true``.

.. describe:: layers

    ``Array(OpenLayers.Layer)``
    The layers provided here will be added to this MapPanel's map.

.. describe:: map

    ``OpenLayers.Map or Object``  A configured map or a configuration object
    for the map constructor.  A configured map will be available after
    construction through the :attr:`map` property.

.. describe:: zoom

    ``Number``  An initial zoom level for the map.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.Component <http://dev.sencha.com/deploy/touch/docs/?class=Ext.Component>`_.


.. attribute:: MapPanel.layers

    :class:`GXM.data.LayerStore`  A store containing gxm_layer-model
    instances.

.. attribute:: MapPanel.map

    ``OpenLayers.Map`` An OpenLayers-Map-instance.







