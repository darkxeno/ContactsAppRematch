(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{101:function(e,t,n){e.exports=n(178)},107:function(e,t,n){},178:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(20),o=n.n(c),i=n(47),s=(n(107),n(82)),u=n(16),l=n(184),d=n(28);var m=Object(u.a)({cardRoot:{margin:"1em"},cardText1stLine:{fontSize:"14px"},cardText2ndLine:{paddingTop:"16px",fontSize:"14px",paddingBottom:"2em"}})(function(e){var t=e.classes;return r.a.createElement(l.a,{interactive:!0,elevation:d.a.TWO,className:t.cardRoot},r.a.createElement("h1",null,"Contacts App"),r.a.createElement("div",{className:t.cardText1stLine},"Learning Immer (Bey)"),r.a.createElement("div",{className:t.cardText2ndLine},"This is a example app using immer and react context + hooks."))}),p=n(8),f=n(31),g=n(52),b=n(38),v=n(185),h=n(186);function E(e){var t=e.input,n=e.label,a=e.placeholder,c=e.meta,o=c.touched,i=c.error,s=Object(b.a)(e,["input","label","placeholder","meta"]);return r.a.createElement(v.a,{helperText:i,label:n,intent:o&&i?"danger":void 0},r.a.createElement(h.a,Object.assign({placeholder:a,intent:o&&i?"danger":void 0},t,s)))}E.defaultProps={custom:{}};var O=E,C=n(95),x=n(134),T=n(189);var F=Object(u.a)({contactGroupMultiSelect:{"&.bp3-popover-target":{width:"100%"}},contactGroupTagInputProps:{"& .bp3-input-ghost":{fontSize:"14px"}}})(function(e){var t=e.options,n=e.input,a=n.value,c=n.onChange,o=e.label,i=e.meta,s=i.touched,u=i.error,l=e.classes,d=Object(b.a)(e,["options","input","label","meta","classes"]),m={};return t&&t.length>0&&t.forEach(function(e){m[e.value]=e}),r.a.createElement(v.a,{helperText:u,label:o,intent:s&&u?"danger":void 0},r.a.createElement(T.a,Object.assign({shouldDismissPopover:!1,noResults:r.a.createElement(x.a,{disabled:!0,text:"No results."}),popoverProps:{minimal:!0,targetClassName:l.contactGroupMultiSelect},items:t,selectedItems:""===a?[]:a,onItemSelect:function(e){-1===a.indexOf(e.value)?c([].concat(Object(C.a)(a),[e.value])):(a.splice(a.indexOf(e.value),1),c(a))},tagInputProps:{placeholder:"Select contact groups...",fill:!0,className:l.contactGroupTagInputProps,onRemove:function(e,t){a&&a.length>0&&(a.splice(t,1),c(a))}},itemRenderer:function(e,t){var n=t.handleClick;return r.a.createElement(x.a,{active:-1!==a.indexOf(e.value),key:"option-".concat(e.value),text:e.text,onClick:n})},tagRenderer:function(e){return m[e].text}},d)))}),j=n(27),y=n(191),D=n(54),w=n(89),k=n(90),N={HOME:"home",ADD_CONTACT:"addContact",LIST_CONTACTS:"listContacts",CONTACT_DETAILS:"contactDetails",ADD_GROUP:"addGroup",EDIT_CONTACT:"editContact"},S=[{name:N.HOME,path:"/"},{name:N.ADD_CONTACT,path:"/add"},{name:N.LIST_CONTACTS,path:"/list"},{name:N.EDIT_CONTACT,path:"/edit/:id"},{name:N.CONTACT_DETAILS,path:"/detail/:id"},{name:N.ADD_GROUP,path:"/group/add"}];var A=function(){var e=Object(D.b)(S,{defaultRoute:"home",autoCleanup:!1});return e.usePlugin(w.a,Object(k.a)({useHash:!0,forceDeactivate:!1})),e}();A.start();var L=A.navigate,I=A,M=n(12),R=n.n(M),_=n(30),P=Object(p.state)(null);var z={name:"snackbar",state:P,actions:{setMessage:function(e){Object(p.update)(P,function(){return e})},displayError:function(e){var t="Unknown error";e&&e.message?t=e.message:"string"===typeof e&&(t=e),Object(p.update)(P,function(){return t})},close:function(){Object(p.update)(P,function(){return null})}}},G=z.state,W=z.actions;function B(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{localLoading:!1};return e.actions&&Object.values(e.actions).length>0&&Object.keys(e.actions).forEach(function(n){if(e.actions[n]&&"function"===typeof e.actions[n]&&!0!==e.actions[n].isSync){var a=e.actions[n];e.actions[n]=function(){var r=Object(_.a)(R.a.mark(function r(){var c,o,i,s,u=arguments;return R.a.wrap(function(r){for(;;)switch(r.prev=r.next){case 0:for(console.groupCollapsed("[".concat(e.name,"] executing action: ").concat(n,"()")),c=u.length,o=new Array(c),i=0;i<c;i++)o[i]=u[i];return console.log("Using arguments: ".concat(o)),console.groupEnd(),se.setLoading(!0,e.name),t.localLoading&&!0!==e.state.get().loading&&Object(p.update)(e.state,function(e){e.loading=!0}),r.next=8,a.apply(void 0,o);case 8:return s=r.sent,t.localLoading&&!1!==e.state.get().loading&&Object(p.update)(e.state,function(e){e.loading=!1}),se.setLoading(!1,e.name),r.abrupt("return",s);case 12:case"end":return r.stop()}},r,this)}));return function(){return r.apply(this,arguments)}}()}}),e}var U=n(15);var H=n(42),V=n(66),q=n(59),$=Object(p.state)({});var J=n(91),K=n.n(J);function Q(){for(var e=[],t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];if(n&&n.length>0)return n.forEach(function(t){var n=Object(i.b)(t.state.get()),r=Object(j.a)(n,2),c=r[0],o=r[1];e.push(c);var s=Object(a.useCallback)(function(){var e=t.state.get();e!==c&&o(e)});Object(a.useEffect)(function(){return t.state.on(s),function(){t.state.off(s)}})}),e;throw new Error("useMultipleStates requires at least one argument.")}function X(e,t,n,a,r,c,o){r.changes.push({oldState:t,newPartialState:n,moduleName:a});var i=[];i.push(setTimeout(function(){if(r.changes.length>0){var n=Object(U.a)({},r.oldState),a="";r.changes.forEach(function(e,t){a+=e.moduleName+(t!==r.changes.length-1?" + ":""),n=Object(U.a)({},n,Object(H.a)({},e.moduleName,e.newPartialState))}),function(e,t,n,a,r,c,o){if(console.groupCollapsed("[".concat(a,"] rendering [").concat(r,"] changes from ").concat(c," at: ").concat((new Date).getMilliseconds())),console.log("NEW STATE: ",n),console.log(Object(q.diffString)(t,n)),console.groupEnd(),o>0)return e(n)}(e,t,n,a,r.changes.length,c,o),r.oldState=n,r.changes=[],i.forEach(function(e){return clearTimeout(e)}),i=[]}},0))}function Y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,r={};if(e&&"object"===typeof e&&Object.keys(e).length>0){var c=Object.keys(e);c.forEach(function(n){var a=e[n],c=a.state.get(),o=t[n];r=Object(U.a)({},r,Object(H.a)({},a.name,o?o(c):c))});var o=Object(i.b)(r,n),s=Object(j.a)(o,2),u=s[0],l=s[1],d={oldState:u,newState:{},changes:[]},m=0;return c.forEach(function(r){var c=e[r],o=t[r],i=function(){var e=c.state.get(),t=o?o(e):e;K()(t,u[c.name])||X(l,u,t,c.name,d,n,m)};Object(a.useEffect)(function(){return m+=1,c.state.on(i),function(){m-=1,c.state.off(i)}})}),u}throw new Error("useMultiple requires at least one object argument with one moduleState key.")}r.a.createElement(i.a);var Z=B,ee=function(e){if(e.actions&&"object"===typeof e.actions){var t=e.state.get();e.state.set(Object(U.a)({},t,{modified:!1})),e.actions.setModified=function(t){e.state.get().modified!==t&&Object(p.update)(e.state,function(e){e.modified=t})}}return e},te=function(e){if(e.actions&&"object"===typeof e.actions){var t=e.name||Symbol("state module name is not defined");$.set(Object(U.a)({},$.get(),Object(H.a)({},t,{changes:[]}))),e.state.on(function(){var n=e.state.get();Object(p.update)($,function(e){var a=e[t].changes[e[t].changes.length-1],r=a?Object(V.original)(a).snapshot:void 0;e[t].changes.push({snapshot:n,updatedAt:Date.now()}),console.groupCollapsed("[".concat(t,"] state changed at: ").concat((new Date).getMilliseconds())),console.log("FROM:",r),console.log("TO:",n),console.log("DIFF:"),console.log(Object(q.diffString)(r,n)),console.groupEnd()})})}return e},ne=function(e){return e&&"object"===typeof e&&e.state&&"object"===typeof e.state&&(e.state.useState=function(){for(var t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];return n?Q.apply(void 0,n):Q(e)}),e},ae="list",re="card",ce=Object(p.state)({loading:{state:!1,total:0,message:null},mode:ae,menu:{left:!0,right:!0}});var oe={name:"global",state:ce,actions:{setLoading:function(e,t){Object(p.update)(ce,function(n){e?n.loading.total+=1:n.loading.total-=1,n.loading.state=n.loading.total>0,n.loading.message=t})},changeMode:function(e){e!==ae&&e!==re||(Object(p.update)(ce,function(t){t.mode=e}),W.setMessage("Mode changed to: ".concat(e)))},toggleLeftMenu:function(){Object(p.update)(ce,function(e){e.menu.left=!e.menu.left})},setRightMenuVisibility:function(e){Object(p.update)(ce,function(t){t.menu.right=e})}},selectors:{loader:function(e){return{loading:e.loading}}}},ie=oe.state,se=oe.actions,ue=oe.selectors,le=te(oe),de=n(69);de.initializeApp({apiKey:"AIzaSyB1GATIyuA6FNnAUMBz0kXJ62EvlSWx99o",authDomain:"redux-contacts-app.firebaseapp.com",databaseURL:"https://redux-contacts-app.firebaseio.com/"});var me=de,pe="/groups";function fe(){var e=me.database().ref("".concat(pe));return new Promise(function(t,n){e.once("value",function(e){var n=e.val(),a=[];return Object.keys(n).map(function(e){return a.push(Object(U.a)({id:e},n[e]))}),t(a)},function(e){return n(e)})})}function ge(e){var t=me.database().ref("".concat(pe,"/").concat(e));return new Promise(function(n,a){t.once("value",function(t){var a=t.val();return a.id=e,n(a)},function(e){return a(e)})})}function be(e){var t=me.database().ref("".concat(pe));return new Promise(function(n,a){var r=t.push();r.set(e,function(t){return t?a(t):n(Object(U.a)({id:r.key},e))})})}function ve(e){var t=e.id,n=Object(b.a)(e,["id"]),a=me.database().ref("".concat(pe,"/").concat(t));return new Promise(function(e,r){a.set(Object(U.a)({},n),function(a){return a?r(a):e(Object(U.a)({id:t},n))})})}var he="/jony";function Ee(){var e=me.database().ref("".concat(he));return new Promise(function(t,n){e.once("value",function(e){var n=e.val(),a=[];return Object.keys(n).map(function(e){return a.push(Object(U.a)({id:e},n[e]))}),t(a)},function(e){return n(e)})})}function Oe(e){var t=me.database().ref("".concat(he,"/").concat(e));return new Promise(function(n,a){t.once("value",function(t){var a=t.val();return a&&(a.id=e),n(a)},function(e){return a(e)})})}function Ce(e){var t=me.database().ref("".concat(he));return new Promise(function(n,a){var r=t.push();r.set(e,function(t){return t?a(t):n(Object(U.a)({id:r.key},e))})})}function xe(e){var t=e.id,n=Object(b.a)(e,["id"]),a=me.database().ref("".concat(he,"/").concat(t));return new Promise(function(e,r){a.set(Object(U.a)({},n),function(a){return a?r(a):e(Object(U.a)({id:t},n))})})}function Te(e){var t=me.database().ref("".concat(he,"/").concat(e));return new Promise(function(n,a){t.set(null,function(t){return t?a(t):n({id:e})})})}var Fe=Object(p.state)({list:{},groups:{},current:{}});function je(){return(je=Object(_.a)(R.a.mark(function e(){return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:0===Object.values(Fe.get().list).length&&ye();case 2:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function ye(e){return De.apply(this,arguments)}function De(){return(De=Object(_.a)(R.a.mark(function e(t){var n,a,r,c;return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fe();case 2:if(n=e.sent,a={},n.forEach(function(e){a[e.id]=e}),!t){e.next=12;break}return e.next=8,Oe(t);case 8:e.t0=e.sent,r=[e.t0],e.next=15;break;case 12:return e.next=14,Ee();case 14:r=e.sent;case 15:c={},r.forEach(function(e){e&&(e.groups&&e.groups.length>0&&(e.groupNames=e.groups.map(function(e){return a[e]?a[e].name:""}).join(", ")),c[e.id]=e)}),Object(p.update)(Fe,function(e){t?e.current=c[t]||{}:e.list=c,e.groups=a});case 18:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function we(){return(we=Object(_.a)(R.a.mark(function e(t){var n;return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t.id){e.next=7;break}return e.next=4,xe(t);case 4:n=e.sent,e.next=10;break;case 7:return e.next=9,Ce(t);case 9:n=e.sent;case 10:console.log("current contact updated:",n),Object(p.update)(Fe,function(e){e.current=t,e.modified=!1}),W.setMessage("Contact ".concat(t.id?"updated":"created"," successfully")),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),W.displayError(e.t0);case 18:_e.goBack();case 19:case"end":return e.stop()}},e,this,[[0,15]])}))).apply(this,arguments)}function ke(){return(ke=Object(_.a)(R.a.mark(function e(t){return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t){e.next=7;break}return e.next=4,Te(t);case 4:Object(p.update)(Fe,function(e){e.current={}}),W.setMessage("Contact deleted successfully"),ye();case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),W.displayError(e.t0);case 12:_e.goBack();case 13:case"end":return e.stop()}},e,this,[[0,9]])}))).apply(this,arguments)}var Ne={name:"contacts",state:Fe,actions:{loadData:ye,loadContactsIfEmpty:function(){return je.apply(this,arguments)},saveContact:function(e){return we.apply(this,arguments)},deleteContact:function(e){return ke.apply(this,arguments)}},selectors:{contactForm:function(e){return{current:e.current,groups:e.groups}},contactList:function(e){return{current:e.current,list:e.list,groups:e.groups}},contactListGlobal:function(e){return{mode:e.mode}},contactDetail:function(e){return{current:e.current,loading:e.loading}}}},Se=Ne.actions,Ae=Ne.state,Le=Ne.selectors,Ie=ne(te(ee(Z(Ne,{localLoading:!0})))),Me={List:N.LIST_CONTACTS,About:N.HOME,"Add Contact":N.ADD_CONTACT,"Add Group":N.ADD_GROUP},Re={transitionToContactList:function(){var e=Object(_.a)(R.a.mark(function e(){return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Se.loadData();case 2:L(N.LIST_CONTACTS);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),transitionToEditContact:function(){var e=Object(_.a)(R.a.mark(function e(t){var n;return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,[Se.loadData(n),Se.loadContactsIfEmpty()];case 3:se.setRightMenuVisibility(!0),L(N.EDIT_CONTACT,{id:n});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),transitionToContactDetail:function(){var e=Object(_.a)(R.a.mark(function e(t){var n;return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.id,e.next=3,[Se.loadData(n),Se.loadContactsIfEmpty()];case 3:se.setRightMenuVisibility(!0),L(N.CONTACT_DETAILS,{id:n});case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),transitionToMenuOption:function(e){Re[Me[e]]?Re[Me[e]]():L(Me[e])},goBack:function(){return window.history.back()},router:{canDeactivate:I.canDeactivate}};Re[N.EDIT_CONTACT]=Re.transitionToEditContact,Re[N.CONTACT_DETAILS]=Re.transitionToContactDetail,Re[N.LIST_CONTACTS]=Re.transitionToContactList;var _e=Re,Pe=I.getState(),ze=Pe.name,Ge=Pe.params;_e[ze]&&_e[ze](Ge);var We=Object(p.state)({route:Pe,previousRoute:{}}),Be={name:"history",state:We,actions:_e};I.subscribe(function(e){Object(p.update)(We,function(t){t.route=e.route,t.previousRoute=e.previousRoute})});var Ue=Be.actions,He=Be;var Ve=function(e){var t=e.isModified,n=e.routesToBlock,c=e.children,o=Object(a.useState)({alertIsOpen:!1}),i=Object(j.a)(o,2),s=i[0],u=i[1],l=Object(a.useCallback)(function(){s.continue(),u({alertIsOpen:!1})}),d=Object(a.useCallback)(function(){s.cancel(),u({alertIsOpen:!1})});Object(a.useEffect)(function(){if(Ue.router){var e=function(e){return function(e,n){return!t()||new Promise(function(e,t){u({alertIsOpen:!0,continue:t,cancel:e})})}};n.forEach(function(t){Ue.router.canDeactivate(t,e)})}});var m=s.alertIsOpen;return r.a.createElement("div",null,r.a.createElement(y.a,{cancelButtonText:"Cancel",confirmButtonText:"Continue",icon:"trash",intent:"danger",isOpen:m,onCancel:l,onConfirm:d},r.a.createElement("p",null,"Are you sure you want leave? Your changes will be lost.")),c)},qe=function(e){return void 0!==e&&null!==e&&""!==e},$e=function(e){if(e){return/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)}return!0},Je=function(e){return!e||new RegExp("^(?:(?:https?|ftp)://)(?:S+(?::S*)?@)?(?:(?!10(?:.d{1,3}){3})(?!127(?:.d{1,3}){3})(?!169.254(?:.d{1,3}){2})(?!192.168(?:.d{1,3}){2})(?!172.(?:1[6-9]|2d|3[0-1])(?:.d{1,3}){2})(?:[1-9]d?|1dd|2[01]d|22[0-3])(?:.(?:1?d{1,2}|2[0-4]d|25[0-5])){2}(?:.(?:[1-9]d?|1dd|2[0-4]d|25[0-4]))|(?:(?:[a-z\xa1-\uffff0-9]+-?)*[a-z\xa1-\uffff0-9]+)(?:.(?:[a-z\xa1-\uffff0-9]+-?)*[a-z\xa1-\uffff0-9]+)*(?:.(?:[a-z\xa1-\uffff]{2,})))(?::d{2,5})?(?:/[^s]*)?").test(e)},Ke=function(e,t){return e&&e.length>t};function Qe(e){var t={};return qe(e.email)?$e(e.email)||(t.email="Email format is incorrect"):t.email="Email is required",qe(e.name)||(t.name="Name is Required"),Je(e.imgUrl)||(t.imgUrl="Invalid url"),t}var Xe=Object(u.a)({formCard:{width:"300px",margin:"0.5em 1em",padding:"1em"},formContainer:{paddingTop:"16px"},buttonsContainer:{display:"flex",justifyContent:"space-between"}})(function(e){var t=e.classes,n=e.route,c=Object(a.useCallback)(function(){return Ae.get().modified});return r.a.createElement(Ve,{isModified:c,routesToBlock:[N.ADD_CONTACT,N.EDIT_CONTACT]},r.a.createElement(p.Subscribe,{to:Ae,on:Le.contactForm},function(e){return r.a.createElement(f.b,{onSubmit:Se.saveContact,validate:Qe,initialValues:n.params.id?e.current:{},render:function(n){var a=n.handleSubmit,c=n.pristine,o=n.invalid,i=n.submitting,s=n.reset;return r.a.createElement(l.a,{interactive:!0,elevation:d.a.TWO,className:t.formCard},r.a.createElement("form",{className:t.formContainer,onSubmit:a},r.a.createElement(f.c,{onChange:function(e){var t=e.dirty;Se.setModified(t&&!i)}}),r.a.createElement(f.a,{name:"name",label:"Name",placeholder:"Name",component:O}),r.a.createElement(f.a,{name:"email",label:"Email",placeholder:"Email",component:O}),r.a.createElement(f.a,{name:"phoneNumber",label:"Phone number",placeholder:"Phone number",component:O}),r.a.createElement(f.a,{name:"imgUrl",label:"Profile image url",placeholder:"Profile image url",component:O}),r.a.createElement(f.a,{name:"groups",component:F,label:"Groups",options:Object.values(e.groups).map(function(e){return{value:e.id,text:e.name}})}),r.a.createElement("div",{className:t.buttonsContainer},r.a.createElement(g.b,{text:"Save contact",icon:"floppy-disk",intent:"success",type:"submit",disabled:c||i||o}),r.a.createElement(g.b,{text:"Reset values",disabled:c||i,icon:"refresh",intent:"danger",onClick:s}))))}})}))}),Ye=n(63),Ze=n(51),et=function(e){var t=e.contact,n=e.onEditClick,a=e.onDeleteClick,c=(e.big,e.loading),o=e.classes,i=t.name,s=t.imgUrl,u=t.email,m=t.groupNames,p=c?Ze.a.SKELETON:"";return r.a.createElement(l.a,{interactive:!0,elevation:d.a.TWO,className:o.cardRoot},r.a.createElement("div",{className:o.cardContentContainer},r.a.createElement("h1",{className:o.cardHeader},r.a.createElement("span",{className:p},i||"...")),r.a.createElement("img",{alt:"contact",src:s||"http://i.imgur.com/mbZIBzc.png",className:o.cardImage})),r.a.createElement("div",{className:o.cardTextContainer},r.a.createElement("span",{className:p},u||"..."),r.a.createElement("br",null),r.a.createElement("span",{className:"".concat(o.cardTextGroup," ").concat(p)},m||"Without group")),r.a.createElement("div",{className:o.buttonContainer},r.a.createElement(g.b,{onClick:n,text:"Edit",className:o.button}),r.a.createElement(g.b,{onClick:a,text:"Delete",className:o.button})))};et.defaultProps={big:!1,loading:!1};var tt=Object(u.a)({cardRoot:function(e){return{width:e.big?"auto":"300px",padding:e.big?"inherit":"0px","& .bp3-card.bp3-interactive":{margin:"1em",padding:0}}},cardContentContainer:{position:"relative",textAlign:"center",height:300,width:300},cardHeader:{position:"absolute",bottom:"0px",right:"0px",left:"0px",padding:"8px",margin:"0",color:"white",background:"rgba(0, 0, 0, 0.54)"},cardImage:{maxHeight:300,maxWidth:300},cardTextContainer:{fontSize:"12pt",padding:"8px"},cardTextGroup:{fontSize:"10pt",color:"grey"},buttonContainer:{padding:"8px",position:"relative"},button:{marginRight:"8px"}})(et),nt=Ye.b.div({hoverable:!0,init:{scale:1},hover:{scale:1.2}}),at=Ye.b.div({enter:{opacity:1,transition:function(e){return{delay:50*e.i}}},exit:{opacity:0},props:{i:0}});function rt(e){return e.list.map(function(e){return r.a.createElement(tt,{key:"contact-".concat(e.id),contact:e,onEditClick:function(){return Ue.transitionToEditContact({id:e.id})},onDeleteClick:function(){return Se.deleteContact(e.id)}})})}function ct(e){var t=e.classes,n=e.list,a=e.current;return r.a.createElement(Ye.a,null,n.map(function(e,n){return r.a.createElement(at,{key:"contact-".concat(e.id),id:e.id,i:n},r.a.createElement("div",{role:"presentation",onKeyPress:function(t){return"Enter"===t.key&&Ue.transitionToContactDetail({id:e.id})},onClick:function(){return Ue.transitionToContactDetail({id:e.id})},className:"bp3-tag bp3-interactive ".concat(t.contactListItem," ").concat(a.id===e.id?"selected":"")},r.a.createElement("div",{style:{display:"flex"}},e.imgUrl?r.a.createElement(nt,null,r.a.createElement("img",{src:e.imgUrl,alt:e.name,className:t.contactListItemImage})):r.a.createElement(nt,{className:t.contactListItemAvatar},e.name.substring(0,1).toUpperCase()),r.a.createElement("div",{className:t.contactListItemTextContainer},r.a.createElement("div",{className:t.contactListItemText1stLine},e.name),r.a.createElement("div",{className:t.contactListItemText2ndLine},e.groupNames||"Without group"))),r.a.createElement(nt,null,r.a.createElement(g.b,{icon:"delete",onClick:function(t){Se.deleteContact(e.id),t.stopPropagation()}}))))}))}var ot=r.a.memo(function(e){var t=Y({contacts:Ie,global:le},{contacts:Le.contactList,global:Le.contactListGlobal},"ContactList"),n=t.contacts,a=t.global;return r.a.createElement("div",{className:e.classes.contactListRoot},"list"===a.mode?r.a.createElement("div",{className:e.classes.contactListItemsContainer},r.a.createElement(ct,Object.assign({},e,{current:n.current,list:Object.values(n.list)}))):r.a.createElement("div",{className:e.classes.contactListCardsContainer},r.a.createElement(rt,Object.assign({},e,{current:n.current,list:Object.values(n.list)}))))}),it=Object(u.a)({contactListItem:{"&.bp3-tag.bp3-interactive":{display:"flex",justifyContent:"space-between",height:"60px",paddingLeft:"8px",margin:"3px",backgroundColor:"#394b59",color:"white",boxShadow:"0 0 0 1px rgba(16, 22, 26, 0.2), 0 0 0 rgba(16, 22, 26, 0), 0 1px 1px rgba(16, 22, 26, 0.4)"},"&.bp3-tag.bp3-interactive:hover":{background:"#202B33"},"&.bp3-tag.bp3-interactive.selected":{background:"#5C7080"}},contactListItemImage:{maxWidth:50,minWidth:50,maxHeight:50},contactListItemTextContainer:{display:"flex",flexDirection:"column",alignSelf:"center",marginLeft:"2rem"},contactListItemText1stLine:{fontWeight:"bolder"},contactListItemText2ndLine:{fontSize:"12px"},contactListItemAvatar:{width:"50px",height:"50px",fontSize:"35px",backgroundColor:"#182026",color:"white",textAlign:"center",lineHeight:"50px",borderRadius:"50px"},contactListRoot:{margin:"0.2em 0 0 0",display:"flex",flex:"1 0 auto",flexDirection:"row"},contactListItemsContainer:{display:"flex",flex:"1 0 auto",flexDirection:"column"},contactListCardsContainer:{flexWrap:"wrap"}})(ot);var st=Object(u.a)({contactDetailRoot:{margin:"0.5em 1em",width:"300px"}})(function(e){var t=Y({contacts:Ie},{contacts:Le.contactDetail},"ContactDetail").contacts;return r.a.createElement("div",{className:e.classes.contactDetailRoot},r.a.createElement(tt,{big:!0,contact:t.current,loading:t.loading,onEditClick:function(){return Ue.transitionToEditContact(e.route.params)},onDeleteClick:function(){return Se.deleteContact(e.route.params.id)}}))}),ut=n(92),lt=n(93),dt=n(96),mt=n(94),pt=n(97);function ft(e){var t={};return qe(e.name)?Ke(e.name,4)||(t.name="Name has to 4 o more characters"):t.name="Name is required",t}var gt=Object(p.state)({list:{},current:{}});function bt(){return(bt=Object(_.a)(R.a.mark(function e(t){var n;return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t){e.next=7;break}return e.next=3,ge(t);case 3:n=e.sent,Object(p.update)(gt,function(e){e.current=n}),e.next=11;break;case 7:return e.next=9,fe();case 9:n=e.sent,Object(p.update)(gt,function(e){e.list=n});case 11:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function vt(){return(vt=Object(_.a)(R.a.mark(function e(t){return R.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!t.id){e.next=7;break}return e.next=4,ve(t);case 4:W.setMessage("Group updated successfully"),e.next=10;break;case 7:return e.next=9,be(t);case 9:W.setMessage("Group created successfully");case 10:Object(p.update)(gt,function(e){e.current=t}),e.next=16;break;case 13:e.prev=13,e.t0=e.catch(0),W.displayError(e.t0);case 16:Ue.goBack();case 17:case"end":return e.stop()}},e,this,[[0,13]])}))).apply(this,arguments)}var ht={name:"groups",state:gt,actions:{loadData:function(e){return bt.apply(this,arguments)},saveGroup:function(e){return vt.apply(this,arguments)}}},Et=ht.state,Ot=ht.actions,Ct=(B(ht),function(e){function t(){return Object(ut.a)(this,t),Object(dt.a)(this,Object(mt.a)(t).apply(this,arguments))}return Object(pt.a)(t,e),Object(lt.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.route.params.id;e&&Ot.loadData(e)}},{key:"componentWillReceiveProps",value:function(e){this.props.route.params.id!==e.route.params.id&&Ot.loadData(e.route.params.id)}},{key:"render",value:function(){var e=this.props.classes;return r.a.createElement(p.Subscribe,{to:Et},function(t){return r.a.createElement(f.b,{onSubmit:Ot.saveGroup,validate:ft,initialValues:t.current,render:function(t){var n=t.handleSubmit,a=t.pristine,c=t.invalid,o=t.submitting,i=t.form.reset;return r.a.createElement(l.a,{interactive:!0,elevation:d.a.TWO,className:e.formCard},r.a.createElement("form",{className:e.formContainer,onSubmit:n},r.a.createElement(f.a,{name:"name",label:"Name",placeholder:"Name",component:O}),r.a.createElement("div",{className:e.buttonsContainer},r.a.createElement(g.b,{icon:"floppy-disk",intent:"success",type:"submit",disabled:a||o||c,text:"Save group"}),r.a.createElement(g.b,{icon:"refresh",intent:"danger",onClick:i,disabled:a||o,text:"Reset values"}))))}})})}}]),t}(a.Component)),xt=Object(u.a)({formCard:{width:"300px",margin:"0.5em 1em",padding:"1em"},formContainer:{paddingTop:"16px"},buttonsContainer:{display:"flex",justifyContent:"space-between"}})(Ct),Tt=n(60),Ft={sidebar:{root:{position:"initial"},content:{display:"none"},overlay:{display:"none"},sidebar:{background:"#30404d",paddingTop:"3.5rem"}}},jt=window.matchMedia("(min-width: 800px)");var yt=Object(u.a)(Ft)(function(e){var t=Object(a.useState)({isSmallScreen:!jt.matches,isOpen:!0}),n=Object(j.a)(t,2),c=n[0],o=n[1];function i(){o(Object(U.a)({},c,{isSmallScreen:!jt.matches}))}function s(){var e=ie.get().menu.right;e!==c.isOpen&&o(Object(U.a)({},c,{isOpen:e}))}Object(a.useEffect)(function(){return jt.addListener(i),ie.on(s),function(){jt.removeListener(i),ie.off(s)}});var u=c.isOpen;return c.isSmallScreen?r.a.createElement(Tt.a,{open:u,pullRight:!0,touch:!0,styles:Ft.sidebar,onSetOpen:function(e){se.setRightMenuVisibility(e)},sidebar:r.a.createElement("div",null,r.a.createElement(g.b,{className:"bp3-minimal",icon:"cross",onClick:function(){return se.setRightMenuVisibility(!1)}}),e.children)},r.a.createElement(g.b,{className:"bp3-minimal",icon:"menu",onClick:function(){return se.setRightMenuVisibility(!u)}})):e.children});var Dt=Object(u.a)({contactDetailsLayout:{display:"flex",flex:"1 0 auto"},editContactLayout:{display:"flex",flex:"1 0 auto"}})(function(e){var t=e.route,n=e.classes;if(!t)return r.a.createElement(m,{route:t});switch(t.name){case N.ADD_GROUP:return r.a.createElement(xt,{route:t});case N.CONTACT_DETAILS:return r.a.createElement("div",{className:n.contactDetailsLayout},r.a.createElement(it,null),r.a.createElement(yt,null,r.a.createElement(st,{route:t})));case N.LIST_CONTACTS:return r.a.createElement(it,{route:t});case N.ADD_CONTACT:return r.a.createElement(Xe,{route:t});case N.EDIT_CONTACT:return r.a.createElement("div",{className:n.editContactLayout},r.a.createElement(it,null),r.a.createElement(yt,null,r.a.createElement(Xe,{route:t})));case N.HOME:default:return r.a.createElement(m,{route:t})}}),wt=n(190),kt=n(29),Nt=n(179),St=n(180),At=n(26),Lt=function(e){var t=e.changeListMode;return r.a.createElement(Nt.a,{content:r.a.createElement(St.a,null,r.a.createElement(x.a,{text:"List",onClick:function(){return t("list")}}),r.a.createElement(x.a,{text:"Card",onClick:function(){return t("card")}})),position:At.a.RIGHT_TOP},r.a.createElement(g.b,{icon:"more"}))};var It=function(e){var t=e.route;return r.a.createElement(p.Subscribe,{to:ie},function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(wt.a,null,r.a.createElement(wt.a.Group,{align:kt.a.LEFT},r.a.createElement(g.b,{className:"bp3-minimal",icon:"menu",onClick:se.toggleLeftMenu}),r.a.createElement(wt.a.Divider,null),r.a.createElement(wt.a.Heading,null,"Contacts app")),r.a.createElement(wt.a.Group,{align:kt.a.RIGHT},t.name===N.LIST_CONTACTS?r.a.createElement(Lt,{changeListMode:se.changeMode}):null)))})},Mt=n(187),Rt=n(181),_t=n(188);var Pt=function(){var e=Y({global:le},{global:ue.loader},"Loader").global;return r.a.createElement(Mt.a,{position:At.a.TOP},e.loading.state?r.a.createElement(Rt.a,{message:r.a.createElement("div",null,r.a.createElement("span",null,"Loading ".concat(e.loading.message,"...")),r.a.createElement(_t.a,null))}):null)};var zt=function(){return r.a.createElement(p.Subscribe,{to:G},function(e){return r.a.createElement(Mt.a,{position:At.a.BOTTOM},e?r.a.createElement(Rt.a,{message:e||"",timeout:3e3,onDismiss:W.close}):null)})},Gt={sidebar:{sidebar:{background:"#30404d"}},leftMenuRoot:{paddingTop:"4rem","&.selected":{background:"#5C7080"}}};var Wt=window.matchMedia("(min-width: 800px)"),Bt=Object(u.a)(Gt)(function(e){var t=e.route,n=e.smallScreen,a=e.classes;function c(e){!function(e){Ue.transitionToMenuOption(e.target.textContent)}(e),n&&se.toggleLeftMenu()}return r.a.createElement(St.a,{className:a.leftMenuRoot},r.a.createElement(x.a,{active:t.name===N.HOME,onClick:c,text:"About"}),r.a.createElement(x.a,{active:-1!==[N.LIST_CONTACTS,N.CONTACT_DETAILS,N.EDIT_CONTACT].indexOf(t.name),onClick:c,text:"List"}),r.a.createElement(x.a,{active:t.name===N.ADD_CONTACT,onClick:c,text:"Add Contact"}),r.a.createElement(x.a,{active:t.name===N.ADD_GROUP,onClick:c,text:"Add Group"}))});var Ut=function(e){var t=Object(a.useState)(!Wt.matches),n=Object(j.a)(t,2),c=n[0],o=n[1];function i(){o(!Wt.matches)}Object(a.useEffect)(function(){return Wt.addListener(i),function(){Wt.removeListener(i)}});var s=Y({global:le},{global:function(e){return e.menu.left}},"LeftMenu").global;return!!s&&(c?r.a.createElement(Tt.a,{open:s,styles:Gt.sidebar,onSetOpen:se.toggleLeftMenu,sidebar:r.a.createElement(Bt,Object.assign({smallScreen:c},e))},!1):r.a.createElement(Bt,Object.assign({smallScreen:c},e)))};var Ht=function(e){var t=Object(s.a)({},e),n=Y({history:He},void 0,"App").history.route;return r.a.createElement("div",{className:"bp3-fill",style:{backgroundColor:"#30404d",minHeight:"100vh"}},r.a.createElement(It,{route:n}),r.a.createElement(Pt,null),r.a.createElement("div",{style:{display:"flex"}},r.a.createElement(Ut,{route:n}),r.a.createElement(Dt,Object.assign({route:n},t))),r.a.createElement(zt,null))},Vt=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function qt(e){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?console.log("New content is available; please refresh."):console.log("Content is cached for offline use."))}}}).catch(function(e){console.error("Error during service worker registration:",e)})}o.a.render(r.a.createElement(function(){return r.a.createElement(i.a,null,r.a.createElement(Ht,null))},null),document.getElementById("root")),function(){if("serviceWorker"in navigator){if(new URL("/ContactsAppRematch",window.location).origin!==window.location.origin)return;window.addEventListener("load",function(){var e="".concat("/ContactsAppRematch","/service-worker.js");Vt?(function(e){fetch(e).then(function(t){404===t.status||-1===t.headers.get("content-type").indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):qt(e)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://goo.gl/SC7cgQ")})):qt(e)})}}()}},[[101,2,1]]]);
//# sourceMappingURL=main.8904b9d3.chunk.js.map