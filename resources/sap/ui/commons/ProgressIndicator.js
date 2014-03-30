/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.ProgressIndicator");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.ProgressIndicator",{metadata:{library:"sap.ui.commons",properties:{"visible":{type:"boolean",group:"Behavior",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"barColor":{type:"sap.ui.core.BarColor",group:"Appearance",defaultValue:sap.ui.core.BarColor.NEUTRAL},"displayValue":{type:"string",group:"Appearance",defaultValue:'0%'},"percentValue":{type:"int",group:"Data",defaultValue:0},"showValue":{type:"boolean",group:"Appearance",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}}}});
sap.ui.commons.ProgressIndicator.prototype.onclick=function(e){this.focus()};
sap.ui.commons.ProgressIndicator.prototype.setEndBar=function(){var w=this.getPercentValue();var a;var b=this.getBarColor();var t;this.oBar=jQuery.sap.domById(this.getId()+'-bar');this.oEnd=jQuery.sap.domById(this.getId()+'-end');this.oBox=jQuery.sap.domById(this.getId()+'-box');jQuery(this.oEnd).removeClass('sapUiProgIndEndHidden');switch(b){case"POSITIVE":jQuery(this.oEnd).addClass('sapUiProgIndPosEnd');break;case"NEGATIVE":jQuery(this.oEnd).addClass('sapUiProgIndNegEnd');break;case"CRITICAL":jQuery(this.oEnd).addClass('sapUiProgIndCritEnd');break;case"NEUTRAL":jQuery(this.oEnd).addClass('sapUiProgIndEnd');break;default:jQuery(this.oEnd).addClass('sapUiProgIndEnd');break}if(w>100){a=(10000/w)+'%'}else{a='100%'}if(w>100){t=(w-100)*20}else{t=(100-w)*20}jQuery(this.oBox).animate({width:a},0,'linear');if(this.bRtl){jQuery(this.oEnd).animate({right:a},t,'linear')}else{jQuery(this.oEnd).animate({left:a},t,'linear')}jQuery(this.oBar).animate({width:w+'%'},t,'linear');if(!this.oThis){this.oThis=jQuery.sap.byId(this.getId())}this.oThis.attr('aria-valuenow',w+'%')};
sap.ui.commons.ProgressIndicator.prototype.setEndBarGoesBack=function(p){var w=this.getPercentValue();var a;var b=this.getBarColor();var t;this.oBar=jQuery.sap.domById(this.getId()+'-bar');this.oEnd=jQuery.sap.domById(this.getId()+'-end');this.oBox=jQuery.sap.domById(this.getId()+'-box');if(p>100){a=(10000/p)+'%'}else{a='100%'}switch(b){case"POSITIVE":jQuery(this.oEnd).removeClass('sapUiProgIndPosEnd');break;case"NEGATIVE":jQuery(this.oEnd).removeClass('sapUiProgIndNegEnd');break;case"CRITICAL":jQuery(this.oEnd).removeClass('sapUiProgIndCritEnd');break;case"NEUTRAL":jQuery(this.oEnd).removeClass('sapUiProgIndEnd');break;default:jQuery(this.oEnd).removeClass('sapUiProgIndEnd');break}jQuery(this.oEnd).addClass('sapUiProgIndEndHidden');if(w>100){t=(w-100)*20}else{t=(100-w)*20}jQuery(this.oBox).animate({width:a},0,'linear');if(this.bRtl){jQuery(this.oEnd).animate({right:a},t,'linear')}else{jQuery(this.oEnd).animate({left:a},t,'linear')}jQuery(this.oBar).animate({width:w+'%'},t,'linear');if(!this.oThis){this.oThis=jQuery.sap.byId(this.getId())}this.oThis.attr('aria-valuenow',w+'%')};
sap.ui.commons.ProgressIndicator.prototype.setPercentValue=function(p){var w=this.getPercentValue();var a;var b=this.getBarColor();this.oBar=jQuery.sap.domById(this.getId()+'-bar');this.oEnd=jQuery.sap.domById(this.getId()+'-end');this.oBox=jQuery.sap.domById(this.getId()+'-box');var t=this;var c;if(p<0){p=0}if(p>100){a=(10000/p)+'%'}else{a='100%'}if(!this.oBar){c=p*20;this.setProperty('percentValue',p,true);jQuery(this.oBar).animate({width:p+'%'},c,'linear');return this}if(p>100&&w<=100){c=(100-w)*20;this.setProperty('percentValue',p,true);jQuery(this.oBar).animate({width:'100%'},c,'linear',function(){t.setEndBar()})}else if(p<=100&&w>100){c=(w-100)*20;this.setProperty('percentValue',p,true);jQuery(this.oBar).animate({width:'100%'},c,'linear',function(){t.setEndBarGoesBack()})}else if(p>100&&w>100){if(p>w){c=(p-w)*20}else{c=(w-p)*20}a=(10000/p)+'%';this.setProperty('percentValue',p,true);jQuery(this.oBox).animate({width:a},0,'linear');if(this.bRtl){jQuery(this.oEnd).animate({right:a},c,'linear')}else{jQuery(this.oEnd).animate({left:a},c,'linear')}jQuery(this.oBar).animate({width:p+'%'},c,'linear',function(){});if(!this.oThis){this.oThis=jQuery.sap.byId(this.getId())}this.oThis.attr('aria-valuenow',p+'%')}else{if(p>w){c=(p-w)*20}else{c=(w-p)*20}this.setProperty('percentValue',p,true);jQuery(this.oBar).animate({width:p+'%'},c,'linear');if(!this.oThis){this.oThis=jQuery.sap.byId(this.getId())}this.oThis.attr('aria-valuenow',p+'%')}return this};
