/**
 * Copyright @ 2017 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/lang","dojo/_base/array","esri/core/declare","esri/core/lang","esri/views/3d/webgl-engine/lib/Util","esri/views/3d/webgl-engine/lib/gl-matrix","../../webgl-engine-extensions/VertexBufferLayout","../../webgl-engine-extensions/GLVertexArrayObject","../../webgl-engine-extensions/GLXBO","../../webgl-engine-extensions/GLVerTexture","../../support/fx3dUtils","../../support/fx3dUnits","../Effect","./FireballMaterial"],function(i,t,e,r,s,n,a,h,o,_,l,d,g,u){var c=(s.assert,n.vec3d),f=n.vec2,m=40.11,v=c.create(),p=c.create(),w=c.create(),x=s.VertexAttrConstants,b={ALONG:0,AROUND:1},y=e([g],{declaredClass:"esri.views.3d.effects.Fireball.FireballEffect",effectName:"Fireball",constructor:function(t){i.hitch(this,t),this.orderId=2,this._pathIdNum=0,this._tmpPoints=[],this.localOriginFactory=g.createLocalOriginFactory(),this._renderObjects={},this._needsAllLoaded=!0},_initRenderingInfo:function(){this.renderingInfo.radius=40,this.renderingInfo.width=50,this.renderingInfo.height=50,this.renderingInfo.colors=[l.rgbNames.cadetblue,l.rgbNames.yellowgreen,l.rgbNames.lightpink,l.rgbNames.orangered,l.rgbNames.green,l.rgbNames.indianred],this._colorBarDirty=!0,this._renderingInfoDirty=!0,this._curveType=b.AROUND,this._vacDirty=!0,this._shapeDirty=!0,this.inherited(arguments)},_doRenderingInfoChange:function(i){this.inherited(arguments);for(var t in i)i.hasOwnProperty(t)&&this.renderingInfo.hasOwnProperty(t)&&(r.endsWith(t.toLowerCase(),"info")?l.isInforAttrChanged(this.renderingInfo[t],i[t])&&(this._renderingInfoDirty=!0):r.endsWith(t.toLowerCase(),"colors")?i[t]instanceof Array&&(this.renderingInfo[t]=i[t],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"radius"===t.toLowerCase()||"width"===t.toLowerCase()||"height"===t.toLowerCase()||"transparency"===t.toLowerCase()?(this._clampScope(i,t),"radius"==t&&this._radiusUnit?this.renderingInfo[t]=d.toMeters(this._radiusUnit,i[t],this._view.viewingMode):"width"==t&&this._widthUnit?this.renderingInfo[t]=d.toMeters(this._widthUnit,i[t],this._view.viewingMode):"height"==t&&this._heightUnit?this.renderingInfo[t]=d.toMeters(this._heightUnit,i[t],this._view.viewingMode):this.renderingInfo[t]=i[t]):typeof i[t]==typeof this.renderingInfo[t]&&(this.renderingInfo[t]=i[t]))},setContext:function(e){this.inherited(arguments),this._effectConfig&&i.isArray(this._effectConfig.renderingInfo)&&(this._radiusUnit=null,this._widthUnit=null,this._heightUnit=null,t.forEach(this._effectConfig.renderingInfo,function(i){"radius"===i.name.toLowerCase()?(this._radiusUnit=i.unit,this.renderingInfo.radius=d.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"width"===i.name.toLowerCase()?(this._widthUnit=i.unit,this.renderingInfo.width=d.toMeters(this._widthUnit,this.renderingInfo.width,this._view.viewingMode)):"height"===i.name.toLowerCase()&&(this._heightUnit=i.unit,this.renderingInfo.height=d.toMeters(this._heightUnit,this.renderingInfo.height,this._view.viewingMode))}.bind(this)),this._aroundVerticesTexture=new _(this._gl),this._aroundVerticesTextureSize=f.create())},destroy:function(){this._resetXBOs(),this._dispose("_aroundVerticesTexture"),this._dispose("_vao"),this._dispose("_particleVAO")},_resetXBOs:function(){this._dispose("_vbo"),this._dispose("_ibo"),this._dispose("_particleVBO")},_initVertexLayout:function(){this._vertexAttrConstants=[x.AUXPOS1],this._vertexBufferLayout=new a(this._vertexAttrConstants,[3],[5126])},_initRenderContext:function(){return this.inherited(arguments),this._vacDirty&&(this._initVertexLayout(),this._resetXBOs(),this._vacDirty=!1,this._vao&&(this._vao.unbind(),this._vao._initialized=!1),this._particleVAO&&(this._particleVAO.unbind(),this._particleVAO._initialized=!1)),this._vbo||(this._vbo=new o(this._gl,!0,this._vertexBufferLayout)),this._particleVBO||(this._particleVBO=new o(this._gl,!0,this._vertexBufferLayout)),this._ibo||(this._ibo=new o(this._gl,!1)),this._vaoExt&&(this._vao=new h(this._gl,this._vaoExt),this._particleVAO=new h(this._gl,this._vaoExt)),this._localBindsCallback||(this._localBindsCallback=this._localBinds.bind(this)),this._curveType===b.AROUND?this._buildAroundPathGeometries():this._curveType===b.ALONG?this._buildAlongPathGeometries():!1},_buildAroundPathGeometries:function(){var i=this._allGraphics(),e=0;if(i.length>0){var r,s,n,a,h,o,_,d,g,u=0,f=[],x=[],b=0,y=0,M=1,I=[];this._isAddingGeometry||(this._pathIdNum=0,this._tmpPoints=[]);var B=this._vertexBufferLayout.getStride();return t.forEach(i,function(i,t){if(null!=i.geometry)for(o=i.geometry.paths,_=0;_<o.length;_++)if(!(o[_].length<2)){for(n=0,a=0,r=o[_][0],r[2]||(r[2]=m),s=o[_][o[_].length-1],s[2]||(s[2]=m),c.set3(r[0],r[1],r[2],v),"global"===this._view.viewingMode?l.wgs84ToSphericalEngineCoords(v,0,v,0):"local"===this._view.viewingMode&&l.wgs84ToWebMerc(v,0,v,0),c.set3(s[0],s[1],s[2],p),"global"===this._view.viewingMode?l.wgs84ToSphericalEngineCoords(p,0,p,0):"local"===this._view.viewingMode&&l.wgs84ToWebMerc(p,0,p,0),c.subtract(v,p,w),a=c.length(w),"global"===this._view.viewingMode?n=1e3>=a?32:1e4>=a?24:5e5>=a?18:1e6>=a?40:Math.floor(1e-5*a):"local"===this._view.viewingMode&&(n=1e3>=a?48:1e4>=a?42:1e5>=a?32:1e6>=a?24:2e6>=a?36:Math.floor(6e-6*a)),n=2*n+1,d=0;n>d;d++)h=B*(d+b),f[0+h]=this._pathIdNum,f[1+h]=t+e,f[2+h]=d,n-1>d&&(u=2*(d+b-t),x[u+0]=d+b+e,x[u+1]=d+b+e+1);for(b+=n,M=Math.max(1,Math.floor(n/20)),g=0;M>g;g++)h=B*(g+y),I[0+h]=this._pathIdNum,I[1+h]=t+e,I[2+h]=18*g;y+=M,this._pathIdNum++,this._tmpPoints.push([r[0],r[1],r[2]]),this._tmpPoints.push([s[0],s[1],s[2]])}}.bind(this)),this._vbo.addData(this._isAddingGeometry,new Float32Array(f)),this._ibo.addData(this._isAddingGeometry,new Uint32Array(x)),this._particleVBO.addData(this._isAddingGeometry,new Float32Array(I)),this._vao&&(this._vao._initialized=!1),this._particleVAO&&(this._particleVAO._initialized=!1),this._resetAddGeometries(),this._initAroundVerticesTexture()}return!1},_buildAlongPathGeometries:function(){return!1},_initAroundVerticesTexture:function(){if(2*this._pathIdNum!==this._tmpPoints.length)return!1;var i=this._gl.getParameter(3379),t=2,e=this._pathIdNum*t,r=l.nextHighestPowerOfTwo(e);r>i&&(r=i,console.warn("Too many graphics, and some data will be discarded."));var s=Math.ceil(e/r);s=l.nextHighestPowerOfTwo(s),s>i&&(s=i,console.warn("Too many graphics, and some data will be discarded."));for(var n,a=new Float32Array(r*s*4),h=0;h<this._pathIdNum;h++)n=h*t*4,a[0+n]=h,a[1+n]=this._tmpPoints[h*t][0],a[2+n]=this._tmpPoints[h*t][1],a[3+n]=this._tmpPoints[h*t][2],a[4+n]=h,a[5+n]=this._tmpPoints[h*t+1][0],a[6+n]=this._tmpPoints[h*t+1][1],a[7+n]=this._tmpPoints[h*t+1][2];return this._aroundVerticesTexture.setData(r,s,a),f.set2(r,s,this._aroundVerticesTextureSize),!0},_initColourMap:function(){this._colourMapTexture||(this._colourMapTexture=this._gl.createTexture());var i=new Image;i.src=l.spriteImg;var t=this;return i.onload=function(){var e=t._gl.getParameter(t._gl.TEXTURE_BINDING_2D);t._gl.bindTexture(3553,t._colourMapTexture),t._gl.pixelStorei(37440,!0),t._gl.texParameteri(3553,10240,9728),t._gl.texParameteri(3553,10241,9728),t._gl.texParameteri(3553,10242,33071),t._gl.texParameteri(3553,10243,33071),t._gl.texImage2D(3553,0,6408,6408,5121,i),t._gl.generateMipmap(3553),t._gl.bindTexture(3553,e)},0===this._gl.getError()?!0:!1},_loadShaders:function(){return this.inherited(arguments),this._material||(this._material=new u({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,shaderSnippets:this._shaderSnippets})),this._material.loadShaders()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||(this._colorBarTexture=this._gl.createTexture());var i=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture),this._gl.pixelStorei(37440,!0),this._gl.texParameteri(3553,10240,9728),this._gl.texParameteri(3553,10241,9728),this._gl.texParameteri(3553,10242,33071),this._gl.texParameteri(3553,10243,33071);var t=l.createColorBarTexture(32,1,this.renderingInfo.colors);return this._gl.texImage2D(3553,0,6408,6408,5121,t),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,i),0===this._gl.getError()?!0:!1},_localBinds:function(i,t){i.bind(this._material._program),this._vertexBufferLayout.enableVertexAttribArrays(this._gl,this._material._program),t&&t.bind()},_bindBuffer:function(i,t,e){i?(i._initialized||i.initialize(this._localBindsCallback,[t,e]),i.bind()):this._localBinds(t,e)},_unBindBuffer:function(i,t,e){i?i.unbind():(t.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,this._material._program),e&&e.unbind())},render:function(t,e){this.inherited(arguments),this._layer.visible&&this.ready&&this._bindPramsReady()&&(this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0),this._material.bind(i.mixin({},{el:this._aroundVerticesTexture,ol:this._aroundVerticesTextureSize,mi:this._colourMapTexture,lp:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],os:this._vizFieldVerTextureSize,em:this.renderingInfo.animationInterval,me:this.renderingInfo.radius,mm:this.renderingInfo.transparency,se:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,ip:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,is:this._colorBarTexture},t),e),this._material.bindBoolean("drawPath",!0),this._material.blend(!0,e),this._bindBuffer(this._vao,this._vbo,this._ibo),this._gl.drawElements(1,this._ibo.getNum(),5125,0),this._unBindBuffer(this._vao,this._vbo,this._ibo),this._material.bindBoolean("drawPath",!1),this._material.blend(!1,e),this._bindBuffer(this._particleVAO,this._particleVBO,null),this._gl.drawArrays(0,0,this._particleVBO.getNum()),this._material.release(e),this._unBindBuffer(this._particleVAO,this._particleVBO,null))}});return y});