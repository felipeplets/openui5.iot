/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.Column");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Element");sap.ui.core.Element.extend("sap.m.Column",{metadata:{library:"sap.m",properties:{"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"hAlign":{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin},"vAlign":{type:"sap.ui.core.VerticalAlign",group:"Appearance",defaultValue:sap.ui.core.VerticalAlign.Inherit},"styleClass":{type:"string",group:"Appearance",defaultValue:null},"visible":{type:"boolean",group:"Appearance",defaultValue:true},"minScreenWidth":{type:"string",group:"Behavior",defaultValue:null},"demandPopin":{type:"boolean",group:"Behavior",defaultValue:false},"popinHAlign":{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:sap.ui.core.TextAlign.Begin,deprecated:true},"popinDisplay":{type:"sap.m.PopinDisplay",group:"Appearance",defaultValue:sap.m.PopinDisplay.Block},"mergeDuplicates":{type:"boolean",group:"Behavior",defaultValue:false},"mergeFunctionName":{type:"string",group:"Misc",defaultValue:'getText'}},defaultAggregation:"header",aggregations:{"header":{type:"sap.ui.core.Control",multiple:false},"footer":{type:"sap.ui.core.Control",multiple:false}}}});jQuery.sap.require("sap.ui.core.Renderer");sap.m.Column.prototype._index=-1;sap.m.Column.prototype._screen="";sap.m.Column.prototype._media=null;sap.m.Column.prototype._getTextAlign=sap.ui.core.Renderer.getTextAlign;
sap.m.Column.prototype._clearMedia=function(){if(this._media&&this._minWidth){sap.ui.Device.media.removeRangeSet(this.getId());this._media=null}};
sap.m.Column.prototype._addMedia=function(){if(this._minWidth){sap.ui.Device.media.initRangeSet(this.getId(),[parseFloat(this._minWidth)]);sap.ui.Device.media.attachHandler(this._notifyResize,this,this.getId());this._media=sap.ui.Device.media.getCurrentRange(this.getId());if(this._media){this._media.triggered=false;this._media.matches=!!this._media.from}}};
sap.m.Column.prototype._notifyResize=function(m){if(!this._media.triggered){this._media.triggered=true;return}this._media=m;this._media.triggered=true;this._media.matches=!!m.from;jQuery.sap.delayedCall(0,this,function(){var p=this.getParent();this.fireEvent("media",this);if(p&&p.onColumnResize){p.onColumnResize(this)}})};
sap.m.Column.prototype._validateMinWidth=function(w){if(Object.prototype.toString.call(w)!="[object String]"){throw new Error('expected string for property "minScreenWidth" of '+this)}if(Object.keys(sap.m.ScreenSizes).indexOf(w.toLowerCase())!=-1){return}if(!/^\d+(\.\d+)?(px|em|rem)$/i.test(w)){throw new Error('invalid CSS size("px", "em", "rem" required) or sap.m.ScreenSize enumeration for property "minScreenWidth" of '+this)}};
sap.m.Column.prototype._isWidthPredefined=function(w){var t=this,u=w.replace(/[^a-z]/g,""),b=parseFloat(sap.m.BaseFontSize)||16;jQuery.each(sap.m.ScreenSizes,function(s,a){if(u!="px"){a/=b}if(a+u==w){t._minWidth=this+"px";t._screen=s;return false}})};
sap.m.Column.prototype.applyAlignTo=function(c,a){if((sap.m.Label&&c instanceof sap.m.Label)||(sap.m.Text&&c instanceof sap.m.Text)||(sap.m.Link&&c instanceof sap.m.Link)){var w=c.getWidth(),d=c.getDomRef();if(!w||w=="auto"||w=="inherit"){c.setProperty("width","100%",true);d&&(d.style.width="100%")}if(c.setTextAlign){a=a||this.getHAlign();c.setProperty("textAlign",a,true);d&&(d.style.textAlign=this.getCssAlign(a))}}return c};
sap.m.Column.prototype.getCssAlign=function(a){a=a||this.getHAlign();if(a=="Begin"||a=="End"){a=this._getTextAlign(a)}return a.toLowerCase()};
sap.m.Column.prototype.getStyleClass=function(r){var c=this.getProperty("styleClass");if(!r){return c}if(this._screen&&(!this.getDemandPopin()||!window.matchMedia)){c+=" sapMSize-"+this._screen}else if(this._media&&!this._media.matches){c+=" sapMListTblNone"}return c};
sap.m.Column.prototype.isNeverVisible=function(r){if(r){return this._isNeverVisible}if(!this._minWidth){return this._isNeverVisible=false}var w=parseFloat(this._minWidth),u=this._minWidth.replace(/[^a-z]/g,""),b=parseFloat(sap.m.BaseFontSize)||16;if(u!="px"){w*=b}return this._isNeverVisible=(w>Math.max(window.screen.width,window.screen.height))};
sap.m.Column.prototype.setIndex=function(n){this._index=+n};
sap.m.Column.prototype.setOrder=function(n){this._order=+n};
sap.m.Column.prototype.getOrder=function(){return this.hasOwnProperty("_order")?this._order:this.getInitialOrder()};
sap.m.Column.prototype.setInitialOrder=function(n){this._initialOrder=+n};
sap.m.Column.prototype.getInitialOrder=function(){return this.hasOwnProperty("_initialOrder")?this._initialOrder:-1};
sap.m.Column.prototype.setDisplay=function(t,d){if(!t||this._index<0){return}var i=this._index+1,p=this.getParent(),a=d?"table-cell":"none",h=t.querySelector("tr > th:nth-child("+i+")"),c=t.querySelectorAll("tr > td:nth-child("+i+")"),l=c.length;h.style.display=a;for(i=0;i<l;i++){c[i].style.display=a}if(p&&p.setTableHeaderVisibility){setTimeout(function(){p.setTableHeaderVisibility(d)},0)}};
sap.m.Column.prototype.setDisplayViaMedia=function(t){var p=this.getParent(),d=this._media&&this._media.matches;if(!this.getDemandPopin()&&this._screen&&p&&p.setTableHeaderVisibility){setTimeout(function(){p.setTableHeaderVisibility(d)},0)}else{this.setDisplay(t,d)}};
sap.m.Column.prototype.setVisible=function(v){var p=this.getParent(),t=p&&p.getTableDomRef&&p.getTableDomRef(),i=t&&this._index>=0;this.setProperty("visible",v,i);if(i){this.setDisplay(t,v)}return this};
sap.m.Column.prototype.setMinScreenWidth=function(w){if(w==this.getMinScreenWidth()){return this}this._validateMinWidth(w);this._screen="";this._minWidth=0;this._clearMedia();if(w){w=w.toLowerCase();var a=sap.m.ScreenSizes[w];if(a){a+="px";this._screen=w}else{this._isWidthPredefined(w);a=w}this._minWidth=a;this._addMedia()}return this.setProperty("minScreenWidth",w)};
sap.m.Column.prototype.setDemandPopin=function(v){if(v==this.getDemandPopin()){return this}if(!this.getMinScreenWidth()){return this.setProperty("demandPopin",v,true)}return this.setProperty("demandPopin",v)};
sap.m.Column.prototype.isPopin=function(){if(!this.getDemandPopin()){return false}if(this._media){return!this._media.matches}return false};
sap.m.Column.prototype.isHidden=function(){if(this._media){return!this._media.matches}if(this._screen&&this._minWidth){return parseFloat(this._minWidth)>window.innerWidth}return false};
sap.m.Column.hasBorderBoxSupport=(function(){var w=5,h=false,t="<table style='table-layout:fixed; width:"+w+"px; position:absolute; left:-99px; top:-99px'>"+"<tr><td style='width:"+w+"px; padding:1px; border:1px solid transparent;'></td></tr>"+"</table>",$=jQuery(t);jQuery(document.body).append($);if($.find("td").width()==w){h=true}$.remove();return h}());
sap.m.Column.prototype.onColumnRendered=function($){if(!sap.m.Column.hasBorderBoxSupport&&this._index>=0&&this.getWidth()&&this.getVisible()&&!this.isPopin()&&!this.isNeverVisible()){var a=$.find("th:nth-child("+(this._index+1)+")"),o=a.outerWidth(),w=a.width();a.width(2*o-w)}};
sap.m.Column.prototype.setLastValue=function(v){if(this.getMergeDuplicates()){this._lastValue=v}return this};
sap.m.Column.prototype.getLastValue=function(){return this._lastValue};
sap.m.Column.prototype.onItemsRemoved=function(){this.setLastValue(NaN)};
