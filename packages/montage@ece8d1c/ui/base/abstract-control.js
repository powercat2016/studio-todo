var Montage=require("montage").Montage,Component=require("ui/component").Component,Dict=require("collections/dict");exports.AbstractControl=Component.specialize({dispatchActionEvent:{value:function(){return this.dispatchEvent(this.createActionEvent())}},_detail:{value:null},detail:{get:function(){return null==this._detail&&(this._detail=new Dict),this._detail}},createActionEvent:{value:function(){var e,t=document.createEvent("CustomEvent");return e=this._detail,t.initCustomEvent("action",!0,!0,e),t}}});