montageDefine("ece8d1c","core/deprecate",{dependencies:[],factory:function(e,t){var n=t.deprecationWarning=function n(e,t,n){if(n=n===!0?2:n){var r=Error.stackTraceLimit;Error.stackTraceLimit=n}if("undefined"!=typeof console&&"function"==typeof console.warn){var i=n?Error("").stack:"";t?console.warn(e+" is deprecated, use "+t+" instead.",i):console.warn(e,i)}n&&(Error.stackTraceLimit=r)};t.deprecateMethod=function(e,t,r,i){var a=function(){return n(r,i,3),t.apply(e?e:this,arguments)};return a.deprecatedFunction=t,a},t.callDeprecatedFunction=function(e,t,n,r){var i,a,o=Error.stackTraceLimit;return Error.stackTraceLimit=2,"undefined"!=typeof console&&"function"==typeof console.warn&&(i=Montage.getInfoForObject(e).objectName,r?console.warn(n+" is deprecated, use "+r+" instead.",i):console.warn(n,i)),Error.stackTraceLimit=o,a=ARRAY_PROTOTYPE.slice.call(arguments,4),t.apply(e?e:this,a)}}});