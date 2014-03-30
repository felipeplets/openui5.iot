/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Button");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.Button",{metadata:{library:"sap.m",properties:{"text":{type:"string",group:"Misc",defaultValue:null},"type":{type:"sap.m.ButtonType",group:"Appearance",defaultValue:sap.m.ButtonType.Default},"width":{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"icon":{type:"sap.ui.core.URI",group:"Appearance",defaultValue:null},"iconFirst":{type:"boolean",group:"Appearance",defaultValue:true},"activeIcon":{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},"iconDensityAware":{type:"boolean",group:"Misc",defaultValue:true}},events:{"tap":{},"press":{}}}});sap.m.Button.M_EVENTS={'tap':'tap','press':'press'};jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.call(sap.m.Button.prototype);jQuery.sap.require("sap.ui.core.theming.Parameters");jQuery.sap.require("sap.ui.core.IconPool");
sap.m.Button.prototype.init=function(){this.orientationProxy=jQuery.proxy(this._handleOrientationChange,this);jQuery(window).bind("orientationchange",this.orientationProxy);this._isPlatformDependent=sap.ui.core.theming.Parameters.get("sapMPlatformDependent")=="true"};
sap.m.Button.prototype.exit=function(e){if(this._image){this._image.destroy()}if(this._iconBtn){this._iconBtn.destroy()}if(this.orientationProxy){jQuery(window).unbind("orientationchange",this.orientationProxy)}};
sap.m.Image.prototype.setIconDensityAware=function(i){this.setProperty("iconDensityAware",i,true);if(this._image){this._image.setDensityAware(i)}};
sap.m.Button.prototype.ontouchstart=function(e){e.originalEvent._sapui_handledByControl=true;if((e.targetTouches&&e.targetTouches.length===1)||!e.targetTouches){this._touchedY=e.targetTouches[0].clientY;this._touchedX=e.targetTouches[0].clientX;if(!this._touchEndProxy){this._touchEndProxy=jQuery.proxy(this._ontouchend,this)}if(!jQuery.support.touch){jQuery(window.document).bind("mouseup",this._touchEndProxy)}else{this.$().bind("touchcancel touchend",this._touchEndProxy)}this._activeButton();this._target=e.target}};
sap.m.Button.prototype.ontouchmove=function(e){var t=e.targetTouches&&((Math.abs(this._touchedY-e.targetTouches[0].clientY)>10)||Math.abs(this._touchedX-e.targetTouches[0].clientX)>10);if(((!!this._target)&&(this._target!=e.target))||t){this._ontouchend(e)}};
sap.m.Button.prototype._ontouchend=function(e){this._inactiveButton();if(!jQuery.support.touch){jQuery(window.document).unbind("mouseup",this._touchEndProxy)}else{this.$().unbind("touchcancel touchend",this._touchEndProxy)}};
sap.m.Button.prototype.ontap=function(e){if(this.getEnabled()){if(!this._target){this._target=e.target}if((!!this._target)&&(this._target===e.target)){this.fireTap({});this.firePress({})}}delete this._target};
sap.m.Button.prototype.onkeydown=function(e){if(e.which==jQuery.sap.KeyCodes.SPACE||e.which==jQuery.sap.KeyCodes.ENTER){this._activeButton();this._target=e.target}};
sap.m.Button.prototype.onkeyup=function(e){if(!this._target){return}this._target=null;if(e.which==jQuery.sap.KeyCodes.SPACE||e.which==jQuery.sap.KeyCodes.ENTER){this._inactiveButton();this.firePress({})}};
sap.m.Button.prototype.sapfocusleave=function(){this._inactiveButton()};
sap.m.Button.prototype._handleOrientationChange=function(){};
sap.m.Button.prototype.onmouseover=function(e){if(jQuery.device.is.desktop){if(this.getEnabled()&&this.getRenderer().onmouseover){this.getRenderer().onmouseover(this)}}};
sap.m.Button.prototype.onmouseout=function(e){if(jQuery.device.is.desktop){if(this.getEnabled()&&this.getRenderer().onmouseout){this.getRenderer().onmouseout(this)}}};
sap.m.Button.prototype._activeButton=function(){if(jQuery.device.is.desktop){if(this.$().hasClass("sapMBtnHover")){this.$().removeClass("sapMBtnHover")}}this.$().addClass("sapMBtnActive");if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image instanceof sap.m.Image){this._image.setSrc(this.getActiveIcon())}}};
sap.m.Button.prototype._inactiveButton=function(){var $=this.$();if($.hasClass("sapMBtnActive")){$.removeClass("sapMBtnActive");if(this.getEnabled()){if(this.getIcon()&&this.getActiveIcon()&&this._image instanceof sap.m.Image){this._image.setSrc(this.getIcon())}}}};
sap.m.Button.prototype._getImage=function(i,s,a,I){if(this._image&&(this._image.getSrc()!=s)){this._image.destroy();this._image=undefined}var o=this._image;if(!!o){o.setSrc(s);if(o instanceof sap.m.Image){o.setActiveSrc(a);o.setDensityAware(I)}}else{o=sap.ui.core.IconPool.createControlByURI({id:i,src:s,activeSrc:a,densityAware:I},sap.m.Image).addStyleClass("sapMBtnCustomIcon").setParent(this,null,true)}return this._image=o};
sap.m.Button.prototype._getInternalIconBtn=function(i,s){var I=this._iconBtn;if(!!I){I.setSrc(s)}else{I=sap.ui.core.IconPool.createControlByURI(s,sap.m.Image)}return this._iconBtn=I};
