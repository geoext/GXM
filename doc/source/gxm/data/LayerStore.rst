
.. currentmodule:: GXM.data

:class:`GXM.data.LayerStore`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.data.Store <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Store>`_
    






.. class:: LayerStore(config)

    The class that is used to construct a GXM LayerStore.


    


Config Options
--------------

Configuration properties in addition to
those listed for `Ext.data.Store <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Store>`_.


.. describe:: model

    ``String`` The identifier for the model to be used.
    Defaults to ``gxm_layer``.

.. describe:: proxy

    ``String/Ext.data.Proxy/Object`` The proxy to be used by the store.
    Defaults to a configuration object for a `Ext.data.MemoryProxy <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.proxy.Memory>`_
    that has a `Ext.data.reader.Json <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.reader.Json>`_ set as `reader`-property.






Public Methods
--------------

Public methods in addition to those
listed for `Ext.data.Store <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Store>`_.


.. method:: LayerStore.getLayerByIndex

    :param idx: ``Integer`` The index of the record having the layer to return.
    :return:  ``OpenLayers.Layer`` The layer object the record at the given index contains.
    
    Returns the layer object of the record at the given index.





