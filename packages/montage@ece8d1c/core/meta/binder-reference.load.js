montageDefine("ece8d1c","core/meta/binder-reference",{dependencies:["montage","core/promise","core/meta/remote-reference","core/meta/binder","core/logger"],factory:function(e,t){"use strict";e("montage").Montage;var n=e("core/promise").Promise,r=e("core/meta/remote-reference").RemoteReference,i=e("core/meta/binder");e("core/logger").logger("blueprint"),t.BinderReference=r.create(r,{constructor:{value:function(){this.superForValue("constructor")()}},identifier:{get:function(){return this._reference||(this._reference=this.referenceFromValue(this._value)),["binder",this._reference.binderName.toLowerCase(),"reference"].join("_")}},valueFromReference:{value:function(e,t){var r=e.binderName,a=e.binderModuleId,o=n.defer(),s=i.Binder.manager.binderForName(r);if(s)o.resolve(s);else try{var l=t,u=a.indexOf("/");if(u>0){var c=a.substring(0,u),d=t.mappings;c in d&&(a=a.substring(u+1),l=l.getPackage(d[c].location))}o=i.Binder.getBinderWithModuleId(a,l)}catch(h){o.reject(Error("Error cannot find Blueprint Binder "+a))}return o.promise}},referenceFromValue:{value:function(e){var t={};return t.binderName=e.name,t.binderModuleId=e.binderModuleId,t}}})}});