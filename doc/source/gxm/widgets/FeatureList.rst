
.. currentmodule:: GXM

:class:`GXM.FeatureList`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_
    






.. class:: FeatureList(config)

    The class that is used to construct a GXM FeatureList.



Example Use
-----------

Sample code to create a GXM.FeatureList:

.. code-block:: javascript

   var featureList = {
       xtype : 'gxm_featurelist',
       layer : layerVector,
       title : 'FeatureList',
       listeners : {
           itemtap : function(list, idx, target, record, e, eOpts) {
               var feature = record.getFeature(),
                   geom = feature.geometry,
                   center = new OpenLayers.LonLat(geom.x, geom.y),
                   zoom = 5
               mapPanel.getMap().setCenter(center, zoom);
               tp.setActiveItem(mapPanel);
           }
       }
   };


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_.


.. describe:: itemTpl

    `Ext.XTemplate <http://docs.sencha.com/touch/2-0/#!/api/Ext.XTemplate>`_
    The template used to render every list-item of the list of features.
    If not provided, a rudimentary template is being used.

.. describe:: layer

    `OpenLayers.Layer.Vector <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Layer/Vector-js.html>`_
    The layer this list is about to derive featuires from for display
    inside the list. Will override any existing configuration for
    :attr:`store`.

.. describe:: map

    :class:`GXM.Map` The GXM Map component this `FeatureList` refers to.
    Might be used to derive the corresponding OpenLayers Map object.

.. describe:: store

    :class:`GXM.data.FeatureStore` The featurestore this list is about
    to use.




Public Properties
-----------------

Public properties in addition to those
listed for `Ext.List <http://docs.sencha.com/touch/2-0/#!/api/Ext.dataview.List>`_.


.. attribute:: FeatureList.olLayer

    `OpenLayers.Layer.Vector <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Layer/Vector-js.html>`_  references the
    layer that was used to instantiate this list.







