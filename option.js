!function(global,factory){if("function"==typeof define&&define.amd)define([],factory);else if("undefined"!=typeof exports)factory();else{factory(),global.option={}}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(){"use strict";const Option=function Option(optionData){return this instanceof Option==1?("object"==typeof optionData&&optionData instanceof Option==1?Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,Object.assign({},optionData.$entity)),configurable:!1,enumerable:!1,writable:!1}):"object"==typeof optionData?Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,Object.assign({},optionData)),configurable:!1,enumerable:!1,writable:!1}):void 0!==optionData?Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,[optionData]),configurable:!1,enumerable:!1,writable:!1}):Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,{}),configurable:!1,enumerable:!1,writable:!1}),this):new Option(optionData)};Object.defineProperty(Option,"namespace",{value:"Option",configurable:!1,enumerable:!0,writable:!1}),Object.defineProperty(Option,"type",{value:Object.freeze(["class","object","option"]),configurable:!1,enumerable:!0,writable:!1}),Object.defineProperty(Option,"checkOption",{value:function(entity){return"object"==typeof entity&&(entity instanceof Option==1||"string"==typeof option.constructor.namespace&&option.constructor.namespace.length>0&&option.constructor.namespace===Option.namespace||"object"==typeof entity.$type&&null!==entity.$type&&!0===Array.isArray(entity.$type)&&!0===Option.type.every(type=>entity.$type.includes(type)))},configurable:!1,enumerable:!1,writable:!1}),Option.prototype.set=function(property,value,scopeData){if("object"==typeof scopeData&&null!==scopeData&&this.setScope(scopeData),"string"!=typeof property&&"number"!=typeof property&&"symbol"!=typeof property)throw new Error(["#invalid-set-option-property;","cannot set option property","invalid property","@property: "+property]);return this.getScope()[property]=value,property in this==1||Object.defineProperty(this,property,{configurable:!1,enumerable:!1,get:function(){return this.getScope()[property]}}),this},Option.prototype.setOption=function(property,value){return this.set(property,value)},Option.prototype.getOption=function(property){return this[property]},Option.prototype.checkOption=function(optionQuery){return void 0===optionQuery||arguments.length<=0?Object.keys(this.getScope().$optionData).length>0:optionQuery in this==1||void 0!==this[optionQuery]},Option.prototype.setScope=function(scopeData){if("object"!=typeof scopeData||null===scopeData)throw new Error(["#invalid-set-option-scope-data;","cannot set option scope data","invalid scope data","@scope-data: "+scopeData]);return this.$optionData.set(this,scopeData),this},Option.prototype.getScope=function(){return this.$optionData.get(this)},Option.prototype.valueOf=function(){return Object.freeze(Object.assign({},this.getScope()))},Option.prototype.toString=function(){if("function"==typeof require){const util=require("util");if("function"==typeof util.inspect)return util.inspect(this.getScope())}return JSON.stringify(this.getScope())},module.exports=Option}));