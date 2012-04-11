
.. currentmodule:: 

:class:`.gxm_feature`
================================================================================


.. cssclass:: meta


Extends
    * `Ext.data.Model <http://docs.sencha.com/touch/2-0/#!/api/Ext.data.Model>`_
    



xtype
    ``gxm_feature``




.. class:: gxm_feature

Class defines a model for records containing an OpenLayers feature object.
Usually this class is not instantiated directly, but referenced by its name ``gxm_feature``
as string representation as a config option within creation of a superior component,
for example a store.



Example Use
-----------

Sample code to use a gxm_feature model:

.. code-block:: javascript

   Ext.create('Ext.data.Store', {

           model: 'gxm_feature',

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


.. method:: gxm_feature.getLayer

    :return:  ``OpenLayers.Feature`` The raw feature object of the corresponding record
    
    Returns the feature object of the record created with this model.





