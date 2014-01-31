/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * (c) Copyright 2009-2013 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.demokit.IndexLayoutPage");jQuery.sap.require("jquery.sap.encoder");jQuery.sap.require("sap.ui.demokit.IndexLayout");jQuery.sap.require("sap.ui.model.json.JSONModel");jQuery.sap.require("sap.ui.core.IconPool");
sap.ui.demokit.IndexLayoutPage=function IndexPage(d,t,b,c){var m=new sap.ui.model.json.JSONModel(d);sap.ui.getCore().setModel(m);var C=new sap.ui.demokit.IndexLayoutPage.Repeat({categories:{path:"/categories",template:new sap.ui.demokit.IndexLayoutPage.Cat({title:"{text}",layout:new sap.ui.demokit.IndexLayout({enableScaling:true,content:{path:"links",template:new sap.ui.demokit.IndexLayout._Tile({title:"{text}",description:"{desc}",target:t,icon:{path:"icon",formatter:function(i){if(!i){i="learning-assistant"}return"sap-icon://"+i}},href:"{ref}"})}})})}});if(c){sap.ui.core.IconPool.addIcon("explored","custom","brandico","e001",true);sap.ui.core.IconPool.addIcon("cart","custom","brandico","e002",true);sap.ui.core.IconPool.addIcon("makit","custom","brandico","e005",true);sap.ui.core.IconPool.addIcon("helloworld","custom","brandico","e003",true);sap.ui.core.IconPool.addIcon("poa","custom","brandico","e007",true);sap.ui.core.IconPool.addIcon("flexbox","custom","brandico","e00A",true);sap.ui.core.IconPool.addIcon("crud","custom","brandico","e009",true);sap.ui.core.IconPool.addIcon("icon-explorer","custom","brandico","e006",true);sap.ui.core.IconPool.addIcon("splitapp","custom","brandico","e00C",true);sap.ui.core.IconPool.addIcon("mvc","custom","brandico","e00B",true)}sap.ui.getCore().attachInit(function(){if(c){var f=jQuery.sap.getModulePath("","/../test-resources/sap/m/demokit/demokit-home/");sap.ui.demokit.IndexLayoutPage._introduceCustomFont("brandico",f,"demoAppsIconFont")}jQuery("body").append("<div id='root'></div>");C.placeAt("root")})};
sap.ui.core.Element.extend("sap.ui.demokit.IndexLayoutPage.Cat",{metadata:{properties:{"title":"string"},aggregations:{"layout":{type:"sap.ui.demokit.IndexLayout",multiple:false}}}});sap.ui.core.Control.extend("sap.ui.demokit.IndexLayoutPage.Repeat",{metadata:{aggregations:{"categories":{type:"sap.ui.demokit.IndexLayoutPage.Cat",multiple:true}}},renderer:function(r,c){r.write("<div");r.writeControlData(c);r.write(">");var C=c.getCategories();for(var i=0;i<C.length;i++){r.write("<div");r.writeElementData(C[i]);r.write(">");if(C[i].getTitle()){r.write("<h2>");r.writeEscaped(C[i].getTitle());r.write("</h2>")}r.renderControl(C[i].getLayout());r.write("</div>")}r.write("</div>")}});
sap.ui.demokit.IndexLayoutPage._introduceCustomFont=function(f,F,s){var a="@font-face {"+"font-family: '"+f+"';"+"src: url('"+F+s+".eot');"+"src: url('"+F+s+".eot?#iefix') format('embedded-opentype'), url('"+F+s+".ttf') format('truetype');"+"font-weight: normal;"+"font-style: normal;"+"}";jQuery('head').append('<style type="text/css">'+a+'</style>')};
