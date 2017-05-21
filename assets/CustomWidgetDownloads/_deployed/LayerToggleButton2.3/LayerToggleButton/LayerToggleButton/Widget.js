///////////////////////////////////////////////////////////////////////////
// Copyright © 2017 Robert Scheitlin. All Rights Reserved.
///////////////////////////////////////////////////////////////////////////

define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  'jimu/WidgetManager'
],
function(
    declare,
    lang,
    array,
    BaseWidget,
    LayerInfos,
    WidgetManager) {
    var clazz = declare([BaseWidget], {
      name: 'LayerToggleButton',
      baseClass: 'widget-layertogglebutton',
      isToggling: false,
      operLayerInfos: null,
      toggleLayerIds: null,

      startup: function() {
        this.inherited(arguments);
        this.operLayerInfos = LayerInfos.getInstanceSync();
        this.setToggleLayer();
      },

      setToggleLayer: function() {
        this.toggleLayerIds = [];
        Object.getOwnPropertyNames(this.config.layerOptions).forEach(lang.hitch(this, function(val) {
          if(this.config.layerOptions[val].display){
            this.toggleLayerIds.push(val);
          }
        }));
      },

      onOpen: function() {
        // var layerInfoArray = this.operLayerInfos.getLayerInfoArray();
        // array.forEach(layerInfoArray, function(layerInfo) {
        //   if(layerInfo._visible){
        //     layerInfo.setTopLayerVisible(false);
        //   }
        // }, this);
        this.setToggleLayer();
        var lObjs = [];
        array.map(this.toggleLayerIds, lang.hitch(this, function(id){
          lObjs.push(this.operLayerInfos.getLayerInfoById(id));
        }));
        if (!this.isToggling) {
          this.isToggling = true;
          array.map(lObjs, lang.hitch(this, function(lObj){
            this.toggleLayer(lObj);
          }));
          setTimeout(lang.hitch(this, function() {
            this.isToggling = false;
            WidgetManager.getInstance().closeWidget(this);
          }), 300);
        }
      },

      toggleLayer: function(lObj) {
        lObj.setTopLayerVisible(!lObj._visible);
      }
    });
return clazz;
});
