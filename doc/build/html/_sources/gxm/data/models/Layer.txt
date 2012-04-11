
.. currentmodule:: 

:class:`.gxm_layer`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.data.Model <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Model>`_
    



xtype
    ``gxm_layer``




.. class:: gxm_layer

Class defines a model for records containing an OpenLayers layer object.
Usually this class is not instantiated directly, but referenced by its name ``gxm_layer``
as string representation as a config option within creation of a superior component,
for example a store.



Example Use
-----------

Sample code to use a gxm_layer model:

.. code-block:: javascript

   Ext.create('Ext.data.Store', {

           model: 'gxm_layer',

           proxy: {
               type: 'memory',
               reader: {
                   type: 'json',
                   root: ''
               }
           }
   });

    






Public Methods
--------------

Public methods in addition to those
listed for `Ext.data.Model <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Model>`_.


.. method:: gxm_layer.getLayer

    :return:  ``OpenLayers.Layer`` The raw layer object of this record
    
    Returns the layer object of the record created with this model.





