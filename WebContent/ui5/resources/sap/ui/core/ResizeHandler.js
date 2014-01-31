/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.ResizeHandler");jQuery.sap.require("sap.ui.base.Object");jQuery.sap.require("sap.ui.Global");jQuery.sap.require("jquery.sap.script");(function(){var l=jQuery.sap.log.getLogger("sap.ui.core.ResizeHandler",jQuery.sap.log.Level.ERROR);var c=null;sap.ui.base.Object.extend("sap.ui.core.ResizeHandler",{constructor:function(C){sap.ui.base.Object.apply(this);c=C;this.aResizeListeners=[];this.bRegistered=false;this.iIdCounter=0;this.fDestroyHandler=jQuery.proxy(this.destroy,this);jQuery(window).bind("unload",this.fDestroyHandler)}});function a(r){if(r.bRegistered){r.bRegistered=false;sap.ui.getCore().detachIntervalTimer(r.checkSizes,r)}};sap.ui.core.ResizeHandler.prototype.destroy=function(e){jQuery(window).unbind("unload",this.fDestroyHandler);c=null;this.aResizeListeners=[];a(this)};sap.ui.core.ResizeHandler.prototype.attachListener=function(r,h){var i=r instanceof sap.ui.core.Control,d=i?r.getDomRef():r,w=d?d.offsetWidth:0,H=d?d.offsetHeight:0,I="rs-"+new Date().valueOf()+"-"+this.iIdCounter++,b=(i?("Control "+r.getId()):(r.id?r.id:String(r)));if(!this.bRegistered){this.bRegistered=true;sap.ui.getCore().attachIntervalTimer(this.checkSizes,this)}this.aResizeListeners.push({sId:I,oDomRef:i?null:r,oControl:i?r:null,fHandler:h,iWidth:w,iHeight:H,dbg:b});l.debug("registered "+b);return I};sap.ui.core.ResizeHandler.prototype.detachListener=function(i){var t=this;jQuery.each(this.aResizeListeners,function(b,r){if(r.sId==i){t.aResizeListeners.splice(b,1);l.debug("deregistered "+i);return false}});if(this.aResizeListeners.length==0){a(this)}};sap.ui.core.ResizeHandler.prototype.checkSizes=function(){var d=l.isLoggable();if(d){l.debug("checkSizes:")}jQuery.each(this.aResizeListeners,function(i,r){if(r){var C=!!r.oControl,D=C?r.oControl.getDomRef():r.oDomRef;if(D&&jQuery.contains(document.documentElement,D)){var o=r.iWidth,O=r.iHeight,n=D.offsetWidth,N=D.offsetHeight;if(o!=n||O!=N){r.iWidth=n;r.iHeight=N;var e=jQuery.Event("resize");e.target=D;e.currentTarget=D;e.size={width:n,height:N};e.oldSize={width:o,height:O};e.control=C?r.oControl:null;if(d){l.debug("resize detected for '"+r.dbg+"': "+e.oldSize.width+"x"+e.oldSize.height+" -> "+e.size.width+"x"+e.size.height)}r.fHandler(e)}}}})};sap.ui.core.ResizeHandler.register=function(r,h){if(!c||!c.oResizeHandler){return null}return c.oResizeHandler.attachListener(r,h)};sap.ui.core.ResizeHandler.deregister=function(i){if(!c||!c.oResizeHandler){return}c.oResizeHandler.detachListener(i)};sap.ui.core.ResizeHandler.deregisterAllForControl=function(C){if(!c||!c.oResizeHandler){return}var i=[];jQuery.each(c.oResizeHandler.aResizeListeners,function(b,r){if(r&&r.oControl&&r.oControl.getId()===C){i.push(r.sId)}});jQuery.each(i,function(b,I){sap.ui.core.ResizeHandler.deregister(I)})}}());
