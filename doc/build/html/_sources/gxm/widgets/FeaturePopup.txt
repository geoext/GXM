
.. currentmodule:: GXM

:class:`GXM.FeaturePopup`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.Panel <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel>`_
    






.. class:: FeaturePopup(config)

    The class that is used to construct a GXM FeaturePopup.



Example Use
-----------

Sample code to create a GXM.FeaturePopup:

.. code-block:: javascript

  // create a lazily instanciated GXM.LayerList:
  var featPopup = {
      xtype: 'gxm_featurepopup',
      // call with GXM.Map...
      map : gxmMap
  };


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.Panel <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel>`_.


.. describe:: centered

    `Boolean` shall the popup be centered within the viewport? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-centered>`_
    
    Default is `true`.

.. describe:: feature

    `OpenLayers.Feature.Vector <http://dev.openlayers.org/releases/OpenLayers-2.11/doc/apidocs/files/OpenLayers/Feature/Vector-js.html>`_
    The feature this popup is about to derive its information from.

.. describe:: hideOnMaskTap

    `Boolean` shall the popup hide when the surrounding mask is being
    tapped? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-hideOnMaskTap>`_
    
    Default is `true`.

.. describe:: modal

    `Boolean` shall the popup be modal? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-modal>`_
    
    Default is `true`.

.. describe:: styleHtmlContent

    `Boolean` shall HTML content be styled when rendering content? Also see `the original documentation <http://docs.sencha.com/touch/2-0/#!/api/Ext.Panel-cfg-styleHtmlContent>`_
    
    Default is `true`.

.. describe:: tpl

    `Ext.XTemplate <http://docs.sencha.com/touch/2-0/#!/api/Ext.XTemplate>`_
    The template used to render the popup content. If not provided, a
    rudimentary template is being used.









