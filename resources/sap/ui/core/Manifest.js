/*
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/Object','sap/ui/thirdparty/URI','jquery.sap.resources'],function(q,B,U){"use strict";var r=/\{\{([^\}\}]+)\}\}/g;function g(v){var V=q.sap.Version(v);return V.getSuffix()?q.sap.Version(V.getMajor()+"."+V.getMinor()+"."+V.getPatch()):V;}function p(o,c){for(var k in o){if(!o.hasOwnProperty(k)){continue;}var v=o[k];switch(typeof v){case"object":if(v){p(v,c);}break;case"string":c(o,k,v);break;default:}}}function a(o,P){if(o&&P&&typeof P==="string"&&P[0]==="/"){var b=P.substring(1).split("/"),s;for(var i=0,l=b.length;i<l;i++){s=b[i];o=o.hasOwnProperty(s)?o[s]:undefined;if(o===null||typeof o!=="object"){if(i+1<l&&o!==undefined){o=undefined;}break;}}return o;}return o&&o[P];}function d(o){if(o&&typeof o==='object'&&!Object.isFrozen(o)){Object.freeze(o);for(var k in o){if(o.hasOwnProperty(k)){d(o[k]);}}}}var M=B.extend("sap.ui.core.Manifest",{constructor:function(m,o){B.apply(this,arguments);this._uid=q.sap.uid();this._iInstanceCount=0;this._bIncludesLoaded=false;this._oRawManifest=m;this._bProcess=!(o&&o.process===false);this._sComponentName=o&&o.componentName;var c=this.getComponentName(),b=o&&o.baseUrl||c&&q.sap.getModulePath(c,"/");if(b){this._oBaseUri=new U(b).absoluteTo(new U(document.baseURI).search(""));}if(o&&typeof o.url==="string"){this._oManifestBaseUri=new U(o.url).absoluteTo(new U(document.baseURI).search("")).search("");}else{this._oManifestBaseUri=this._oBaseUri;}d(this._oRawManifest);this._oManifest=this._bProcess?null:this._oRawManifest;},_processEntries:function(m){var t=this;var c=(m["sap.app"]&&m["sap.app"]["i18n"])||"i18n/i18n.properties";var R;p(m,function(o,k,v){o[k]=v.replace(r,function(s,b){if(!R){R=q.sap.resources({url:t.resolveUri(new U(c)).toString()});}return R.getText(b);});});return m;},getJson:function(){if(!this._oManifest){this._oManifest=this._processEntries(q.extend(true,{},this._oRawManifest));}return this._oManifest;},getRawJson:function(){return this._oRawManifest;},getEntry:function(P){if(!P||P.indexOf(".")<=0){q.sap.log.warning("Manifest entries with keys without namespace prefix can not be read via getEntry. Key: "+P+", Component: "+this.getComponentName());return null;}var m=this.getJson();var e=a(m,P);if(P&&P[0]!=="/"&&!q.isPlainObject(e)){q.sap.log.warning("Manifest entry with key '"+P+"' must be an object. Component: "+this.getComponentName());return null;}return e;},checkUI5Version:function(){var m=this.getEntry("/sap.ui5/dependencies/minUI5Version");if(m&&q.sap.log.isLoggable(q.sap.log.LogLevel.WARNING)&&sap.ui.getCore().getConfiguration().getDebug()){sap.ui.getVersionInfo({async:true}).then(function(v){var o=g(m);var V=g(v&&v.version);if(o.compareTo(V)>0){q.sap.log.warning("Component \""+this.getComponentName()+"\" requires at least version \""+o.toString()+"\" but running on \""+V.toString()+"\"!");}}.bind(this),function(e){q.sap.log.warning("The validation of the version for Component \""+this.getComponentName()+"\" failed! Reasion: "+e);}.bind(this));}},loadIncludes:function(){if(this._bIncludesLoaded){return;}var R=this.getEntry("/sap.ui5/resources");if(!R){return;}var c=this.getComponentName();var J=R["js"];if(J){for(var i=0;i<J.length;i++){var o=J[i];var f=o.uri;if(f){var m=f.match(/\.js$/i);if(m){var s=c.replace(/\./g,'/')+(f.slice(0,1)==='/'?'':'/')+f.slice(0,m.index);q.sap.log.info("Component \""+c+"\" is loading JS: \""+s+"\"");sap.ui.requireSync(s);}}}}var C=R["css"];if(C){for(var j=0;j<C.length;j++){var b=C[j];if(b.uri){var e=this.resolveUri(new U(b.uri)).toString();q.sap.log.info("Component \""+c+"\" is loading CSS: \""+e+"\"");q.sap.includeStyleSheet(e,{id:b.id,"data-sap-ui-manifest-uid":this._uid});}}}this._bIncludesLoaded=true;},removeIncludes:function(){if(!this._bIncludesLoaded){return;}var R=this.getEntry("/sap.ui5/resources");if(!R){return;}var c=this.getComponentName();var C=R["css"];if(C){var l=document.querySelectorAll("link[data-sap-ui-manifest-uid='"+this._uid+"']");for(var i=0;i<l.length;i++){var L=l[i];q.sap.log.info("Component \""+c+"\" is removing CSS: \""+L.href+"\"");L.parentNode.removeChild(L);}}this._bIncludesLoaded=false;},loadDependencies:function(){var D=this.getEntry("/sap.ui5/dependencies"),c=this.getComponentName();if(D){var l=D["libs"];if(l){for(var L in l){if(!l[L].lazy){q.sap.log.info("Component \""+c+"\" is loading library: \""+L+"\"");sap.ui.getCore().loadLibrary(L);}}}var C=D["components"];if(C){for(var n in C){if(!C[n].lazy){q.sap.log.info("Component \""+c+"\" is loading component: \""+n+".Component\"");sap.ui.requireSync("sap/ui/core/Component").load({name:n});}}}}},defineResourceRoots:function(){var R=this.getEntry("/sap.ui5/resourceRoots");if(R){for(var s in R){var b=R[s];var o=new U(b);if(o.is("absolute")||(o.path()&&o.path()[0]==="/")){q.sap.log.error("Resource root for \""+s+"\" is absolute and therefore won't be registered! \""+b+"\"",this.getComponentName());continue;}b=this.resolveUri(o).toString();q.sap.registerModulePath(s,b);}}},getComponentName:function(){var R=this.getRawJson();return this._sComponentName||a(R,"/sap.ui5/componentName")||a(R,"/sap.app/id");},resolveUri:function(u,R){return M._resolveUriRelativeTo(u,R==="manifest"?this._oManifestBaseUri:this._oBaseUri);},init:function(i){if(this._iInstanceCount===0){this.checkUI5Version();this.defineResourceRoots();this.loadDependencies();this.loadIncludes();this.activateCustomizing();}if(i){this.activateCustomizing(i);}this._iInstanceCount++;},exit:function(i){var I=Math.max(this._iInstanceCount-1,0);if(i){this.deactivateCustomizing(i);}if(I===0){this.deactivateCustomizing();this.removeIncludes();}this._iInstanceCount=I;},activateCustomizing:function(i){var u=this.getEntry("sap.ui5",true),e=u&&u["extends"]&&u["extends"].extensions;if(!q.isEmptyObject(e)){var C=sap.ui.requireSync('sap/ui/core/CustomizingConfiguration');if(!i){C.activateForComponent(this.getComponentName());}else{C.activateForComponentInstance(i);}}},deactivateCustomizing:function(i){var C=sap.ui.require('sap/ui/core/CustomizingConfiguration');if(C){if(!i){C.deactivateForComponent(this.getComponentName());}else{C.deactivateForComponentInstance(i);}}}});M._resolveUriRelativeTo=function(u,b){if(u.is("absolute")||(u.path()&&u.path()[0]==="/")){return u;}var P=new U(document.baseURI).search("");b=b.absoluteTo(P);return u.absoluteTo(b).relativeTo(P);};M.load=function(o){var m=o&&o.manifestUrl,c=o&&o.componentName,A=o&&o.async,f=o&&o.failOnError;var b=new U(m);["sap-language","sap-client"].forEach(function(n){if(!b.hasQuery(n)){var v=sap.ui.getCore().getConfiguration().getSAPParam(n);if(v){b.addQuery(n,v);}}});m=b.toString();q.sap.log.info("Loading manifest via URL: "+m);var e=q.sap.loadResource({url:m,dataType:"json",async:typeof A!=="undefined"?A:false,headers:{"Accept-Language":sap.ui.getCore().getConfiguration().getLanguageTag()},failOnError:typeof f!=="undefined"?f:true});if(A){return e.then(function(e){return new M(e,{componentName:c,process:false,url:m});});}return new M(e,{componentName:c,process:false,url:m});};return M;});