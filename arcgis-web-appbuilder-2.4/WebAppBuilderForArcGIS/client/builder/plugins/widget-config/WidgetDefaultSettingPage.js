// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
define("dojo/_base/declare dojo/_base/lang dojo/on dojo/keys dijit/_WidgetBase ./JSONEditor".split(" "),function(b,c,d,e,f,g){return b([f],{baseClass:"widget-default-setting",postCreate:function(){this.inherited(arguments);this.jsonEditor=new g({json:this.config});this.jsonEditor.placeAt(this.domNode);this.own(d(this.domNode,"keydown",c.hitch(this,"_onEnterPress")))},_onEnterPress:function(a){(void 0!==a.keyCode?a.keyCode:a.which)===e.ENTER&&a.stopPropagation()},setConfig:function(a){return this.jsonEditor.setJSON(a)},
getConfig:function(){return this.jsonEditor.getJSON()}})});