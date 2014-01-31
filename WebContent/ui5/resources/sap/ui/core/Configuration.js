/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.core.Configuration");jQuery.sap.require("sap.ui.base.Object");jQuery.sap.require("sap.ui.core.Locale");jQuery.sap.require("sap.ui.thirdparty.URI");(function(){sap.ui.base.Object.extend("sap.ui.core.Configuration",{constructor:function(C){this._oCore=C;function f(){var m;if(!!sap.ui.Device.os.android){m=navigator.userAgent.match(/\s([a-z]{2}-[a-z]{2})[;)]/i);if(m){return m[1]}}return navigator.language||navigator.userLanguage||navigator.browserLanguage}var g={"theme":{type:"string",defaultValue:"base"},"language":{type:"string",defaultValue:f()},"formatLocale":{type:"string",defaultValue:null},"accessibility":{type:"boolean",defaultValue:true},"animation":{type:"boolean",defaultValue:true},"rtl":{type:"boolean",defaultValue:null},"debug":{type:"boolean",defaultValue:false},"inspect":{type:"boolean",defaultValue:false},"originInfo":{type:"boolean",defaultValue:false},"noConflict":{type:"boolean",defaultValue:false,noUrl:true},"noDuplicateIds":{type:"boolean",defaultValue:true},"trace":{type:"boolean",defaultValue:false,noUrl:true},"modules":{type:"string[]",defaultValue:[],noUrl:true},"areas":{type:"string[]",defaultValue:null,noUrl:true},"onInit":{type:"code",defaultValue:undefined,noUrl:true},"uidPrefix":{type:"string",defaultValue:"__",noUrl:true},"ignoreUrlParams":{type:"boolean",defaultValue:false,noUrl:true},"weinreServer":{type:"string",defaultValue:"",noUrl:true},"weinreId":{type:"string",defaultValue:""},"preload":{type:"string",defaultValue:"auto"},"rootComponent":{type:"string",defaultValue:"",noUrl:true},"xx-rootComponentNode":{type:"string",defaultValue:"",noUrl:true},"application":{type:"string",defaultValue:""},"appCacheBuster":{type:"string[]",defaultValue:[]},"xx-appCacheBusterMode":{type:"string",defaultValue:"sync"},"xx-disableCustomizing":{type:"boolean",defaultValue:false,noUrl:true},"xx-loadAllMode":{type:"boolean",defaultValue:false,noUrl:true},"xx-test-mobile":{type:"boolean",defaultValue:false},"xx-preloadLibCss":{type:"string[]",defaultValue:[]},"xx-componentPreload":{type:"string",defaultValue:""},"xx-bindingSyntax":{type:"string",defaultValue:"simple",noUrl:true},"xx-designMode":{type:"boolean",defaultValue:false},"xx-accessibilityMode":{type:"boolean",defaultValue:false},"xx-supportedLanguages":{type:"string[]",defaultValue:[]},"xx-bootTask":{type:"function",defaultValue:undefined,noUrl:true},"xx-suppressDeactivationOfControllerCode":{type:"boolean",defaultValue:false}};var h={"xx-test":"1.15","flexBoxPolyfill":"1.14","sapMeTabContainer":"1.14","sapMeProgessIndicator":"1.14","sapMGrowingList":"1.14","sapMListAsTable":"1.14","sapMDialogWithPadding":"1.14"};this.oFormatSettings=new sap.ui.core.Configuration.FormatSettings(this);var i=this;function s(N,V){if(typeof V==="undefined"||V===null){return}switch(g[N].type){case"boolean":if(typeof V==="string"){if(g[N].defaultValue){i[N]=V.toLowerCase()!="false"}else{i[N]=V.toLowerCase()==="true"||V.toLowerCase()==="x"}}else{i[N]=!!V}break;case"string":i[N]=""+V;break;case"code":i[N]=typeof V==="function"?V:String(V);break;case"function":if(typeof V!=="function"){throw new Error("unsupported value")}i[N]=V;break;case"string[]":if(jQuery.isArray(V)){i[N]=V}else if(typeof V==="string"){i[N]=jQuery.map(V.split(/[ ,;]/),function($){return jQuery.trim($)})}else{throw new Error("unsupported value")}break;default:throw new Error("illegal state")}}function j(T){var r=/^\/sap\/public\/bc\/themes\//i,p,k,m;try{p=new URI().normalize();k=new URI(T,window.location.href).normalize();if(k.hostname()===p.hostname()){m=k.path();if(r.test(k.path())){return m+(m.slice(-1)==='/'?'':'/')+"UI5/"}else{return m}}}catch(e){}jQuery.sap.log.error("Invalid Theme Root URL: URL must point into the central theme repository on the same server - setting ignored")}for(var n in g){i[n]=g[n].defaultValue}var o=window["sap-ui-config"]||{};o.oninit=o.oninit||o["evt-oninit"];for(var n in g){s(n,o[n.toLowerCase()])}if(o.libs){i.modules=jQuery.map(o.libs.split(","),function($){return jQuery.trim($)+".library"}).concat(i.modules)}var P="compatversion";var D=o[P];var B=jQuery.sap.Version("1.14");this._compatversion={};function _(k){var v=!k?D||B.toString():o[P+"-"+k.toLowerCase()]||D||h[k]||B.toString();v=jQuery.sap.Version(v.toLowerCase()==="edge"?sap.ui.version:v);return jQuery.sap.Version(v.getMajor(),v.getMinor())}this._compatversion._default=_();for(var n in h){this._compatversion[n]=_(n)}if(!i.ignoreUrlParams){var u="sap-ui-";var U=jQuery.sap.getUriParameters();if(U.mParams['sap-locale']||U.mParams['sap-language']){var V=U.get('sap-locale')||M[U.get('sap-language').toUpperCase()]||U.get('sap-language');if(V===""){i['language']=g['language'].defaultValue}else{s('language',V)}}if(U.mParams['sap-accessibility']){var V=U.get('sap-accessibility');if(V==="X"||V==="x"){s('xx-accessibilityMode',true)}else{s('xx-accessibilityMode',false)}}if(U.mParams['sap-rtl']){var V=U.get('sap-rtl');if(V==="X"||V==="x"){s('rtl',true)}else{s('rtl',false)}}if(U.mParams['sap-theme']){var V=U.get('sap-theme');if(V===""){i['theme']=g['theme'].defaultValue}else{s('theme',V)}}for(var n in g){if(g[n].noUrl){continue}var V=U.get(u+n);if(V===""){i[n]=g[n].defaultValue}else{s(n,V)}}}this.derivedRTL=sap.ui.core.Locale._impliesRTL(i.language);var t=i.theme;var T;var I=t.indexOf("@");if(I>=0){T=j(t.slice(I+1));if(T){i.theme=t.slice(0,I);i.themeRoot=T}else{i.theme=(o.theme&&o.theme!==t)?o.theme:"base";I=-1}}i.theme=this._normalizeTheme(i.theme,T);var l=i['xx-supportedLanguages'];if(l.length===0||(l.length===1&&l[0]==='*')){l=[]}else if(l.length===1&&l[0]==='default'){l="ar,bg,ca,cs,da,de,el,en,es,et,fi,fr,hi,hr,hu,it,iw,ja,ko,lt,lv,nl,no,pl,pt,ro,ru,sh,sk,sl,sv,th,tr,uk,vi,zh_CN,zh_TW".split(/,/);if(l.length===1&&l[0].slice(0,1)==='@'){l=[]}}i['xx-supportedLanguages']=l;for(var n in g){if(i[n]!==g[n].defaultValue){jQuery.sap.log.info("  "+n+" = "+i[n])}}},getVersion:function(){if(this._version){return this._version}this._version=new jQuery.sap.Version(sap.ui.version);return this._version},getCompatibilityVersion:function(f){if(typeof(f)==="string"&&this._compatversion[f]){return this._compatversion[f]}return this._compatversion._default},getTheme:function(){return this.theme},_setTheme:function(t){this.theme=t;return this},_normalizeTheme:function(t,T){if(t&&T==null&&t.match(/^sap_corbu$/i))return"sap_goldreflection";return t},getLanguage:function(){return this.language},setLanguage:function(l){d(typeof l==="string"&&l,"sLanguage must be a BCP47 language tag or Java Locale id or null");var o=this.getRTL(),C;if(l!=this.language){C=this._collect();this.language=C.language=l;this.derivedRTL=sap.ui.core.Locale._impliesRTL(l);if(o!=this.getRTL()){C.rtl=this.getRTL()}this._endCollect()}return this},getLocale:function(){return new sap.ui.core.Locale(this.language)},getFormatLocale:function(){return this.formatLocale||this.language},setFormatLocale:function(f){d(f===null||typeof f==="string"&&f,"sFormatLocale must be a BCP47 language tag or Java Locale id or null");var C;if(f!=this.formatLocale){C=this._collect();this.formatLocale=C.formatLocale=f;this._endCollect()}return this},getSupportedLanguages:function(){return this["xx-supportedLanguages"]},getAccessibility:function(){return this.accessibility},getAnimation:function(){return this.animation},getRTL:function(){return this.rtl===null?this.derivedRTL:this.rtl},setRTL:function(r){d(r===null||typeof r==="boolean","bRTL must be null or a boolean");var C;if(r!=this.rtl){C=this._collect();this.rtl=C.rtl=this.getRTL();this._endCollect()}return this},getDebug:function(){return this.debug},getInspect:function(){return this.inspect},getOriginInfo:function(){return this.originInfo},getNoDuplicateIds:function(){return this.noDuplicateIds},getTrace:function(){return this.trace},getUIDPrefix:function(){return this.uidPrefix},getDesignMode:function(){return this["xx-designMode"]},getSuppressDeactivationOfControllerCode:function(){return this["xx-suppressDeactivationOfControllerCode"]},getWeinreServer:function(){var w=this.weinreServer;if(!w){w=window.location.protocol+"//"+window.location.hostname+":";w+=(parseInt(window.location.port,10)||8080)+1}return w},getWeinreId:function(){return this.weinreId},getApplication:function(){return this.application},getRootComponent:function(){return this.rootComponent},getAppCacheBuster:function(){return this.appCacheBuster},getAppCacheBusterMode:function(){return this["xx-appCacheBusterMode"]},getDisableCustomizing:function(){return this["xx-disableCustomizing"]},getPreload:function(){return this.preload},getComponentPreload:function(){return this['xx-componentPreload']||this.preload},getFormatSettings:function(){return this.oFormatSettings},_collect:function(){var C=this.mChanges||(this.mChanges={__count:0});C.__count++;return C},_endCollect:function(){var C=this.mChanges;if(C&&(--C.__count)===0){delete C.__count;this._oCore&&this._oCore.fireLocalizationChanged(C);delete this.mChanges}}});var M={"ZH":"zh-Hans","ZF":"zh-Hant","1Q":"en-US-x-saptrc","2Q":"en-US-x-sappsd"};var a={"":{pattern:null},"1":{pattern:"dd.MM.yyyy"},"2":{pattern:"MM/dd/yyyy"},"3":{pattern:"MM-dd-yyyy"},"4":{pattern:"yyyy.MM.dd"},"5":{pattern:"yyyy/MM/dd"},"6":{pattern:"yyyy-MM-dd"},"7":{pattern:"Gyy.MM.dd",ignore:true},"8":{pattern:"Gyy/MM/dd",ignore:true},"9":{pattern:"Gyy-MM-dd",ignore:true},"A":{pattern:"yyyy/MM/dd",ignore:true},"B":{pattern:"yyyy/MM/dd",ignore:true},"C":{pattern:"yyyy/MM/dd",ignore:true}};var b={"":{"short":null,medium:null,dayPeriods:null},"0":{"short":"HH:mm",medium:"HH:mm:ss",dayPeriods:null},"1":{"short":"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["AM","PM"]},"2":{"short":"hh:mm a",medium:"hh:mm:ss a",dayPeriods:["am","pm"]},"3":{"short":"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["AM","PM"]},"4":{"short":"KK:mm a",medium:"KK:mm:ss a",dayPeriods:["am","pm"]}};var c={"":{groupingSeparator:null,decimalSeparator:null}," ":{groupingSeparator:".",decimalSeparator:","},"X":{groupingSeparator:",",decimalSeparator:"."},"Y":{groupingSeparator:" ",decimalSeparator:","}};function d(C,m){if(!C){throw new Error(m)}}sap.ui.base.Object.extend("sap.ui.core.Configuration.FormatSettings",{constructor:function(C){this.oConfiguration=C;this.mSettings={};this.sLegacyDateFormat=undefined;this.sLegacyTimeFormat=undefined;this.sLegacyNumberFormatSymbolSet=undefined},getFormatLocale:function(){function f(t){var l=t.oConfiguration.language;if(!jQuery.isEmptyObject(t.mSettings)){if(l.indexOf("-x-")<0){l=l+"-x-sapufmt"}else if(l.indexOf("-sapufmt")<=l.indexOf("-x-")){l=l+"-sapufmt"}}return l}return new sap.ui.core.Locale(this.oConfiguration.formatLocale||f(this))},_set:function(k,v){var o=this.mSettings[k];if(v!=null){this.mSettings[k]=v}else{delete this.mSettings[k]}if((o==null!=v==null)||!jQuery.sap.equal(o,v)){var C=this.oConfiguration._collect();C[k]=v;this.oConfiguration._endCollect()}},getDatePattern:function(s){return this.mSettings["dateFormat-"+s]},setDatePattern:function(s,p){d(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");this._set("dateFormat-"+s,p);return this},getTimePattern:function(s){return this.mSettings["timeFormat-"+s]},setTimePattern:function(s,p){d(s=="short"||s=="medium"||s=="long"||s=="full","sStyle must be short, medium, long or full");this._set("timeFormat-"+s,p);return this},getNumberSymbol:function(t){return this.mSettings["symbols-latn-"+t]},setNumberSymbol:function(t,s){d(t=="decimal"||t=="group"||t=="plusSign"||t=="minusSign","sType must be decimal, group, plusSign or minusSign");this._set("symbols-latn-"+t,s);return this},_setDayPeriods:function(w,t){this._set("dayPeriods-format-"+w,t);return this},getLegacyDateFormat:function(){return this.sLegacyDateFormat||undefined},setLegacyDateFormat:function(f){f=f?String(f).toUpperCase():"";d(!f||a.hasOwnProperty(f),"sFormatId must be one of ['1','2','3','4','5','6','7','8','9','A','B','C'] or empty");if(a[f].ignore){jQuery.sap.log.warning("The ABAP date format '"+f+"' ("+a[f].pattern+") is not supported yet. Falling back to locale specific date formats.");f=""}var C=this.oConfiguration._collect();this.sLegacyDateFormat=C.legacyDateFormat=f;this.setDatePattern("short",a[f].pattern);this.setDatePattern("medium",a[f].pattern);this.oConfiguration._endCollect();return this},getLegacyTimeFormat:function(){return this.sLegacyTimeFormat||undefined},setLegacyTimeFormat:function(f){d(!f||b.hasOwnProperty(f),"sFormatId must be one of ['0','1','2','3','4'] or empty");var C=this.oConfiguration._collect();this.sLegacyTimeFormat=C.legacyTimeFormat=f=f||"";this.setTimePattern("short",b[f]["short"]);this.setTimePattern("medium",b[f]["medium"]);this._setDayPeriods("abbreviated",b[f].dayPeriods);this.oConfiguration._endCollect();return this},getLegacyNumberFormat:function(){return this.sLegacyNumberFormat||undefined},setLegacyNumberFormat:function(f){f=f?f.toUpperCase():"";d(!f||c.hasOwnProperty(f),"sFormatId must be one of [' ','X','Y'] or empty");var C=this.oConfiguration._collect();this.sLegacyNumberFormat=C.legacyNumberFormat=f;this.setNumberSymbol("group",c[f].groupingSeparator);this.setNumberSymbol("decimal",c[f].decimalSeparator);this.oConfiguration._endCollect()},getCustomLocaleData:function(){return this.mSettings}})}());
