///////////////////////////////////////////////////////////////////////////
// Sample "headless" widget for the Esri Web AppBuilder Version 1.1.
// This sample implements map tips on feature layers.       
//
// No license, no copyright, no warranties.
//
// Created by: Larry Stout
//
// Date: May 25, 2015
///////////////////////////////////////////////////////////////////////////
define([
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/_base/fx',
  'dojo/_base/lang',
  'dojo/on',
  'dijit/popup',
  'dijit/TooltipDialog',
  'jimu/BaseWidget'
], function(
  declare, 
  array, 
  baseFx,
  lang, 
  on, 
  popup,
  TooltipDialog,
  BaseWidget
) { 
  var clazz = declare([BaseWidget], {
    name: 'AnvilMapTips',
    baseClass: 'jimu-widget-anvil-map-tips',
    showMapTips: true,
    mapTipTimes: {  //These are the defaults
      delay: 500,
      life: 5000,
      fadeIn: 400,
      fadeOut: 400
    },
    
    postCreate: function() {
      this.inherited(arguments);
    },
    
    startup: function() {
      this.inherited(arguments);
      
      var mapTipLayers = lang.getObject('featureLayerMapTips.layers', false, this.config);
      if (mapTipLayers && !this._isEmpty(mapTipLayers)) {
        var layer;
        var layerTitle;
        
        // Create the MapTip dialog
        this.mapTip = new TooltipDialog({
          id: 'mapTipDialog',
          style: 'position:absolute; max-width:300px; z-index:100;',
          'class': this.baseClass
        });
        this.mapTip.startup();
        
        // Override the default map tip times if map tip times are configured.
        lang.mixin(this.mapTipTimes, lang.getObject('mapTipTimes', false, this.config));

        // Add mouse events for each configured feature layer
        array.forEach(this.map.graphicsLayerIds, function(layerId) {
          layer = this.map.getLayer(layerId);
          layerTitle = lang.getObject('arcgisProps.title', false, layer);
          if (layer && layer.declaredClass === 'esri.layers.FeatureLayer' && layerTitle && mapTipLayers[layerTitle]) {
            var mapTipTemplate = lang.getObject(layerTitle + '.mapTip', false, mapTipLayers);
            if (mapTipTemplate) {
              on(layer, 'mouse-out', lang.hitch(this, function() {
                if (this.showMapTips) {
                  clearTimeout(this.mapTipDelay);
                  clearTimeout(this.mapTipLife);
                  this._hideMapTip();
                }
              }));

              on(layer, 'mouse-over', lang.hitch(this, function(evt) {
                // If there is an info window showing don't show a MapTip.
                if (this.showMapTips && !this.map.infoWindow.isShowing) {
                  clearTimeout(this.mapTipDelay);
                  clearTimeout(this.mapTipLife);
                  this.mapTipDelay = setTimeout(
                    lang.hitch(this, '_showMaptip', mapTipTemplate, evt),
                    this.mapTipTimes.delay
                  );
                }
              }));
            }
          }
        }, this);
      }
    },

    _showMaptip: function(mapTipTemplate, evt) {
      var content = lang.replace(mapTipTemplate, evt.graphic.attributes);
      if (this.nullValue && this.nullValueReplacement) {
        content = content.replace(this.nullValue, this.nullValueReplacement);
      }
      this.mapTip.setContent(content);

      popup.open({
        popup: this.mapTip,
        x: evt.pageX + 10,
        y: evt.pageY + 10
      });

      // Fade in the MapTip
      baseFx.animateProperty({
        node: this.mapTip.domNode,
        duration: this.mapTipTimes.fadeIn,
        properties: {
          opacity: 0.85
        },
        onEnd: lang.hitch(this, function() {
          this.mapTipLife = setTimeout(lang.hitch(this, '_hideMapTip'), this.mapTipTimes.life);
        })
      }).play();
    },

    _hideMapTip: function() {
      // Fade out the MapTip
      baseFx.animateProperty({
        node: this.mapTip.domNode,
        duration: this.mapTipTimes.fadeOut,
        properties: {
          opacity: 0
        },
        onEnd: lang.hitch(this, function() {
          popup.close(this.mapTip);
        })
      }).play();
    },
    
    _isEmpty: function(obj) {
      // Returns false if obj has at least one property or true otherwise
      var empty = true;
      for (var prop in obj) { 
        if (obj.hasOwnProperty(prop)) { 
          empty = false; 
          break; 
        } 
      }
      return empty;
    }
    
  });
  return clazz;
});
