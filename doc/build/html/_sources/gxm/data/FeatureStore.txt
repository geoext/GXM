
.. currentmodule:: GXM.data

:class:`GXM.data.FeatureStore`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.data.Store <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Store>`_
    






.. class:: FeatureStore(config)

    The class that is used to construct a GXM FeatureStore.


    


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
    that has a :class:`Ext.data.reader.Json` set as `reader`-property.









