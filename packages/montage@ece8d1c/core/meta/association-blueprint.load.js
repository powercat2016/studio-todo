montageDefine("ece8d1c","core/meta/association-blueprint",{dependencies:["montage","core/meta/blueprint-reference","core/meta/property-blueprint","core/logger"],factory:function(e,t){"use strict";e("montage").Montage;var n=e("core/meta/blueprint-reference").BlueprintReference,r=e("core/meta/property-blueprint").PropertyBlueprint;e("core/logger").logger("blueprint"),t.AssociationBlueprint=r.specialize({constructor:{value:function(){this.superForValue("constructor")()}},serializeSelf:{value:function(e){e.setProperty("targetBlueprint",this._targetBlueprintReference),r.serializeSelf.call(this,e)}},deserializeSelf:{value:function(e){r.deserializeSelf.call(this,e),this._targetBlueprintReference=e.getProperty("targetBlueprint")}},_targetBlueprintReference:{value:null},targetBlueprint:{serializable:!1,get:function(){return this._targetBlueprintReference.promise(this.require)},set:function(e){this._targetBlueprintReference=(new n).initWithValue(e)}},isAssociationBlueprint:{get:function(){return!0}}})}});