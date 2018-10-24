/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/date/UniversalDate','sap/ui/unified/CalendarAppointment','sap/ui/unified/CalendarLegendRenderer','sap/ui/Device','sap/ui/unified/library','sap/ui/core/InvisibleText'],function(q,U,C,a,D,l,I){"use strict";var b=l.CalendarDayType;var c=l.CalendarIntervalType;var d=l.CalendarAppointmentVisualization;var e={};e.render=function(r,R){var t=R.getTooltip_AsString();var v=R.getAppointmentsVisualization();var T=this.getLegendItems(R);r.write("<div");r.writeControlData(R);r.addClass("sapUiCalendarRow");if(!D.system.phone&&R.getAppointmentsReducedHeight()){r.addClass("sapUiCalendarRowAppsRedHeight");}if(v!=d.Standard){r.addClass("sapUiCalendarRowVis"+v);}if(t){r.writeAttributeEscaped("title",t);}var w=R.getWidth();if(w){r.addStyle("width",w);}var h=R.getHeight();if(h){r.addStyle("height",h);}r.writeAccessibilityState(R);r.writeClasses();r.writeStyles();r.write(">");this.renderAppointmentsRow(r,R,T);r.write("</div>");};e.renderAppointmentsRow=function(r,R,t){var i=R.getId();r.write("<div id=\""+i+"-Apps\" class=\"sapUiCalendarRowApps\">");this.renderBeforeAppointments(r,R);this.renderAppointments(r,R,t);this.renderAfterAppointments(r,R);r.write("</div>");};e.renderBeforeAppointments=function(r,R){};e.renderAfterAppointments=function(r,R){};e.renderResizeHandle=function(r,R,A){};e.renderAppointments=function(r,R,t){var A=R._getVisibleAppointments();var f=R._getVisibleIntervalHeaders();var s=R._getStartDate();var n=[];var S=0;var N=0;var g=[];var h=0;var j=0;var k=R.getIntervals();var m=R.getIntervalType();var w=100/k;var i=0;var o=new U(s);var F=false;var L=false;switch(m){case c.Hour:n=R.getNonWorkingHours()||[];S=s.getUTCHours();N=24;break;case c.Day:case c.Week:case c.OneMonth:n=R._getNonWorkingDays();S=s.getUTCDay();N=7;g=R.getNonWorkingHours()||[];h=s.getUTCHours();j=24;break;case c.Month:g=R._getNonWorkingDays();h=s.getUTCDay();j=7;break;default:break;}if(R._isOneMonthIntervalOnSmallSizes()){this.renderSingleDayInterval(r,R,A,t,f,n,S,N,g,h,j,true,true);}else{for(i=0;i<k;i++){if(L){F=true;}else{F=false;}L=false;switch(m){case c.Hour:o.setUTCHours(o.getUTCHours()+1);if(o.getUTCHours()==0){L=true;}break;case c.Day:case c.Week:case c.OneMonth:o.setUTCDate(o.getUTCDate()+1);if(o.getUTCDate()==1){L=true;}break;case c.Month:o.setUTCMonth(o.getUTCMonth()+1);if(o.getUTCMonth()==0){L=true;}break;default:break;}this.renderInterval(r,R,i,w,f,n,S,N,g,h,j,F,L);}this.renderIntervalHeaders(r,R,w,f,k);r.write("<div id=\""+R.getId()+"-Now\" class=\"sapUiCalendarRowNow\"></div>");for(i=0;i<A.length;i++){var p=A[i];this.renderAppointment(r,R,p,t);}r.write("<div id=\""+R.getId()+"-DummyApp\" class=\"sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy\"></div>");}};e.writeCustomAttributes=function(r,R){};e.renderInterval=function(r,R,f,w,g,n,s,N,h,S,k,F,L){var m=R.getId()+"-AppsInt"+f;var i;var o=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||g.length>0);var M=R.getStartDate().getMonth();var p=new Date(R.getStartDate().getFullYear(),M+1,0).getDate();r.write("<div id=\""+m+"\"");r.addClass("sapUiCalendarRowAppsInt");r.addStyle("width",w+"%");if(f>=p&&R.getIntervalType()===c.OneMonth){r.addClass("sapUiCalItemOtherMonth");}for(i=0;i<n.length;i++){if((f+s)%N==n[i]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}if(!o){r.addClass("sapUiCalendarRowAppsIntNoHead");}if(F){r.addClass("sapUiCalendarRowAppsIntFirst");}if(L){r.addClass("sapUiCalendarRowAppsIntLast");}r.writeClasses();r.writeStyles();this.writeCustomAttributes(r,R);r.write(">");if(o){r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");r.writeClasses();r.write(">");r.write("</div>");}if(R.getShowSubIntervals()){var t=R.getIntervalType();var u=0;switch(t){case c.Hour:u=4;break;case c.Day:case c.Week:case c.OneMonth:u=24;break;case c.Month:var v=R._getStartDate();var x=new U(v);x.setUTCMonth(x.getUTCMonth()+f+1,0);u=x.getUTCDate();x.setUTCDate(1);s=x.getUTCDay();break;default:break;}var y=100/u;for(i=0;i<u;i++){r.write("<div");r.addClass("sapUiCalendarRowAppsSubInt");r.addStyle("width",y+"%");for(var j=0;j<h.length;j++){if((i+S)%k==h[j]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}r.writeStyles();r.writeClasses();r.write(">");r.write("</div>");}}r.write("</div>");};e.renderIntervalHeaders=function(r,R,w,f,g){var s=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||f.length>0);if(s){for(var i=0;i<f.length;i++){var o=f[i],L,h;if(R._bRTL){h=w*o.interval;L=w*(g-o.last-1);}else{L=w*o.interval;h=w*(g-o.last-1);}this.renderIntervalHeader(r,o,R._bRTL,L,h);}}};e.renderIntervalHeader=function(r,i,R,f,g){var s=i.appointment.getId();r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");if(f!==undefined){r.addStyle("left",f+"%");}if(g!==undefined){r.addStyle("right",g+"%");}r.writeElementData(i.appointment);r.addClass("sapUiCalendarRowAppsIntHeadFirst");if(i.appointment.getSelected()){r.addClass("sapUiCalendarRowAppsIntHeadSel");}if(i.appointment.getTentative()){r.addClass("sapUiCalendarRowAppsIntHeadTent");}var t=i.appointment.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}var T=i.appointment.getType();var h=i.appointment.getColor();if(!h&&T&&T!=b.None){r.addClass("sapUiCalendarRowAppsIntHead"+T);}if(h){if(R){r.addStyle("border-right-color",h);}else{r.addStyle("border-left-color",h);}}r.writeStyles();r.writeClasses();r.write(">");r.write("<div");r.addClass("sapUiCalendarIntervalHeaderCont");r.writeClasses();if(h){r.addStyle("background-color",i.appointment._getCSSColorForBackground(h));r.writeStyles();}r.write(">");var j=i.appointment.getIcon();if(j){var k=["sapUiCalendarRowAppsIntHeadIcon"];var A={};A["id"]=s+"-Icon";A["title"]=null;r.writeIcon(j,k,A);}var m=i.appointment.getTitle();if(m){r.write("<span");r.writeAttribute("id",s+"-Title");r.addClass("sapUiCalendarRowAppsIntHeadTitle");r.writeClasses();r.write(">");r.writeEscaped(m,true);r.write("</span>");}var n=i.appointment.getText();if(n){r.write("<span");r.writeAttribute("id",s+"-Text");r.addClass("sapUiCalendarRowAppsIntHeadText");r.writeClasses();r.write(">");r.writeEscaped(n,true);r.write("</span>");}r.write("</div>");r.write("</div>");};e.renderAppointment=function(r,R,A,t,f){var o=A.appointment;var T=o.getTooltip_AsString();var s=o.getType();var g=o.getColor();var h=o.getTitle();var i=o.getText();var j=o.getIcon();var k=o.getId();var m={labelledby:{value:I.getStaticId("sap.ui.unified","APPOINTMENT")+" "+k+"-Descr",append:true}};var n=R.getAriaLabelledBy();if(n.length>0){m["labelledby"].value=m["labelledby"].value+" "+n.join(" ");}if(h){m["labelledby"].value=m["labelledby"].value+" "+k+"-Title";}if(i){m["labelledby"].value=m["labelledby"].value+" "+k+"-Text";}r.write("<div");r.writeElementData(o);r.addClass("sapUiCalendarApp");if(o.getSelected()){r.addClass("sapUiCalendarAppSel");m["labelledby"].value=m["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}if(o.getTentative()){r.addClass("sapUiCalendarAppTent");m["labelledby"].value=m["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(!i){r.addClass("sapUiCalendarAppTitleOnly");}if(j){r.addClass("sapUiCalendarAppWithIcon");}if(!f){if(R._bRTL){r.addStyle("right",A.begin+"%");r.addStyle("left",A.end+"%");}else{r.addStyle("left",A.begin+"%");r.addStyle("right",A.end+"%");}}r.writeAttribute("data-sap-level",A.level);if(R._sFocusedAppointmentId==k){r.writeAttribute("tabindex","0");}else{r.writeAttribute("tabindex","-1");}if(T){r.writeAttributeEscaped("title",T);}if(!g&&s&&s!=b.None){r.addClass("sapUiCalendarApp"+s);}if(g){if(R._bRTL){r.addStyle("border-right-color",g);}else{r.addStyle("border-left-color",g);}}r.writeAccessibilityState(o,m);r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapUiCalendarAppCont");if(g&&R.getAppointmentsVisualization()===d.Filled){r.addStyle("background-color",o._getCSSColorForBackground(g));r.writeStyles();}r.writeClasses();r.write(">");if(j){var p=["sapUiCalendarAppIcon"];var u={};u["id"]=k+"-Icon";u["title"]=null;r.writeIcon(j,p,u);}if(h){r.write("<span");r.writeAttribute("id",k+"-Title");r.addClass("sapUiCalendarAppTitle");r.writeClasses();r.write(">");r.writeEscaped(h,true);r.write("</span>");}if(i){r.write("<span");r.writeAttribute("id",k+"-Text");r.addClass("sapUiCalendarAppText");r.writeClasses();r.write(">");r.writeEscaped(i,true);r.write("</span>");}var v=R._oRb.getText("CALENDAR_START_TIME")+": "+R._oFormatAria.format(o.getStartDate());v=v+"; "+R._oRb.getText("CALENDAR_END_TIME")+": "+R._oFormatAria.format(o.getEndDate());if(T){v=v+"; "+T;}if(s&&s!=b.None){v=v+"; "+this.getAriaTextForType(s,t);}r.write("<span id=\""+k+"-Descr\" class=\"sapUiInvisibleText\">"+v+"</span>");r.write("</div>");this.renderResizeHandle(r,R,o);r.write("</div>");};e.renderSingleDayInterval=function(r,R,A,t,f,n,s,N,g,S,h,F,L){var k=1,w=100,m=R.getId()+"-AppsInt"+k,i,o=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||f.length>0),p=R.getStartDate(),M=p.getMonth(),u=new Date(p.getFullYear(),M+1,0).getDate(),v,x=A.concat(R.getIntervalHeaders().filter(function(H){var J=H.getStartDate().getTime(),K=H.getStartDate().getTime(),O=p.getTime(),P=O+1000*60*60*24;return(J>=O&&J<P)||(K>=O&&K<P);}).map(function(H){return{appointment:H,isHeader:true};})).sort(C._getComparer(p)),y;r.write("<div id=\""+m+"\"");r.addClass("sapUiCalendarRowAppsInt");r.addClass("sapUiCalendarMonthRowAppsS");r.addStyle("width",w+"%");if(k>=u&&R.getIntervalType()===c.OneMonth){r.addClass("sapUiCalItemOtherMonth");}for(i=0;i<n.length;i++){if((k+s)%N==n[i]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}if(!o){r.addClass("sapUiCalendarRowAppsIntNoHead");}if(F){r.addClass("sapUiCalendarRowAppsIntFirst");}if(L){r.addClass("sapUiCalendarRowAppsIntLast");}r.writeClasses();r.writeStyles();r.write(">");if(o){r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");r.writeClasses();r.write(">");r.write("</div>");}for(i=0;i<x.length;i++){y=x[i];r.write("<div class=\"sapUiCalendarAppContainer\">");r.write("<div class=\"sapUiCalendarAppContainerLeft\">");r.write("<div>"+y.appointment._getDateRangeIntersectionText(p)+"</div>");r.write("</div>");r.write("<div class=\"sapUiCalendarAppContainerRight\">");if(y.isHeader){this.renderIntervalHeader(r,y);}else{this.renderAppointment(r,R,y,t,true);}r.write("</div>");r.write("</div>");}if(A.length===0){r.write("<div class=\"sapUiCalendarNoApps\">");v=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");r.write(v);r.write("</div>");}r.write("<div id=\""+R.getId()+"-Now\" class=\"sapUiCalendarRowNow\"></div>");r.write("<div id=\""+R.getId()+"-DummyApp\" class=\"sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy\" style='margin:0; height:0px;'></div>");if(R.getShowSubIntervals()){var z=R.getIntervalType();var B=0;switch(z){case c.Hour:B=4;break;case c.Day:case c.Week:case c.OneMonth:B=24;break;case c.Month:var E=new U(p);E.setUTCMonth(E.getUTCMonth()+k+1,0);B=E.getUTCDate();E.setUTCDate(1);s=E.getUTCDay();break;default:break;}var G=100/B;for(i=0;i<B;i++){r.write("<div");r.addClass("sapUiCalendarRowAppsSubInt");r.addStyle("width",G+"%");for(var j=0;j<g.length;j++){if((i+S)%h==g[j]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}r.writeStyles();r.writeClasses();r.write(">");r.write("</div>");}}r.write("</div>");};e.getLegendItems=function(o){var r=[],L,s=o.getLegend();if(s){L=sap.ui.getCore().byId(s);if(L){r=L.getItems();}else{q.sap.log.error("CalendarLegend with id '"+s+"' does not exist!",o);}}return r;};e.getAriaTextForType=function(t,L){var T,s,o,i;if(L&&L.length){for(var i=0;i<L.length;i++){o=L[i];if(o.getType()===t){T=o.getText();break;}}}if(!T){s=a.getTypeAriaText(t);if(s){T=s.getText();}}return T;};return e;},true);