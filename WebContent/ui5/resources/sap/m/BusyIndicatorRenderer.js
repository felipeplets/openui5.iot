/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.BusyIndicatorRenderer");sap.m.BusyIndicatorRenderer={};
sap.m.BusyIndicatorRenderer.render=function(r,c){var s=c.getSize();var d="";if(c.getDesign()=="auto"){d="sapMBusyIndicator"}else{d=c.getDesign()=="dark"?"sapMBusyIndicatorDark":"sapMBusyIndicatorLight"}r.write("<div");r.writeControlData(c);r.addClass(d);r.writeClasses();var t=c.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t)}if(!c.getVisible()){r.addStyle("visibility","hidden");r.writeStyles()}r.write(">");if(c.getCustomIcon()){r.renderControl(c._iconImage)}else if(c._bUseSvg){this._renderSvg(r,c,s)}else if(c._bUseCanvas){this._renderCanvas(r,c,s)}else{this._renderNative(r,c,s)}if(c.getText()){r.renderControl(c._oLabel)}r.write("</div>")};
sap.m.BusyIndicatorRenderer._renderSvg=function(r,c,s){r.write('<svg');r.writeAttribute('id',c.getId()+'-svg');r.writeAttribute('viewBox','0 0 100 100');r.writeAttribute('class','sapMBusySvg');if(s){r.addStyle('width',s);r.addStyle('height',s);r.writeStyles()}r.write('><g transform = translate(50,50)>');r.write('<path d="M0,-36A36,36 0 1,0 36,0" stroke-width="20%" fill="none" class="sapMSpinSvg">');r.write('<animateTransform attributeName="transform" attributeType="XML" type="rotate" ');r.write('from="0" to="360" dur="1.1s" repeatCount="indefinite" />');r.write('</path></g></svg>')};
sap.m.BusyIndicatorRenderer._renderCanvas=function(r,c,s){r.write('<canvas');r.writeAttribute("id",c.getId()+"-canvas");r.writeAttribute("class","sapMSpinCanvas");r.writeAttribute("width","32");r.writeAttribute("height","32");if(s){r.addStyle('width',s);r.addStyle('height',s);r.writeStyles()}r.write('></canvas>')};
sap.m.BusyIndicatorRenderer._renderNative=function(r,c,s){var S=(c._bIosStyle)?13:4;r.write("<div");r.writeAttribute("class","sapMSpinner");if(s){r.addStyle('width',s);r.addStyle('height',s);r.writeStyles()}r.write(">");for(var i=1;i<S;i++){var b='sapMSpinBar'+i;if(!c._bIosStyle){if(i===3){var B='sapMSpinBar'+4;r.write('<div class="'+b+'"><div class="'+B+'"></div></div>');break}}r.write('<div class="'+b+'"></div>')}r.write("</div>")};
