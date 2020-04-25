!function(global,factory){if("function"==typeof define&&define.amd)define([],factory);else if("undefined"!=typeof exports)factory();else{factory(),global.option={}}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(){"use strict";
/*;
  	@module-license:
  		MIT License
  
  		Copyright (c) 2020 Richeve S. Bebedor <richeve.bebedor@gmail.com>
  
  		@copyright:
  			Richeve S. Bebedor
  			<
  				@year:
  					2020
  				@end-year
  			>
  			<
  				@contact:
  					richeve.bebedor@gmail.com
  				@end-contact
  			>
  		@end-copyright
  
  		Permission is hereby granted, free of charge, to any person obtaining a copy
  		of this software and associated documentation files (the "Software"), to deal
  		in the Software without restriction, including without limitation the rights
  		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  		copies of the Software, and to permit persons to whom the Software is
  		furnished to do so, subject to the following conditions:
  
  		The above copyright notice and this permission notice shall be included in all
  		copies or substantial portions of the Software.
  
  		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  		SOFTWARE.
  	@end-module-license
  */const Option=function Option(optionData){
/*;
    			@class-procedure-definition:
    			@end-class-procedure-definition
    
    			@parameter-definition:
    				{
    					"optionData": "
    						[
    							@type:
    									object
    								|	object as Option
    							@end-type:
    
    							<
    								@property-definition:
    								@end-property-definition
    							>
    						]
    					"
    				}
    			@end-parameter-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									object as Option
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    
    			@static-property-definition:
    				{
    					"namespace": "
    						[
    							@type:
    									string
    
    								<
    									@default-value:
    										Option
    									@end-default-value
    								>
    							@end-type
    
    							<
    								@property-definition:
    								@end-property-definition
    							>
    						]
    					",
    
    					"type": "
    						[
    							@type:
    									object as Array of string
    
    								<
    									@default-value:
    										class
    										object
    										option
    									@end-default-value
    								>
    							@end-type
    
    							<
    								@property-definition:
    								@end-property-definition
    							>
    						]
    					",
    				}
    			@end-static-property-definition
    
    			@static-procedure-definition:
    				{
    					"checkOption": "
    						[
    							@type:
    									function as checkOption
    							@end-type
    
    							<
    								@procedure-definition:
    									Check if object instance of Option class.
    								@end-procedure-definition
    							>
    						]
    					"
    				}
    			@end-static-procedure-definition
    		*/
return this instanceof Option==1?("object"==typeof optionData&&optionData instanceof Option==1?Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,Object.assign({},optionData.$entity)),configurable:!1,enumerable:!1,writable:!1}):"object"==typeof optionData?Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,Object.assign({},optionData)),configurable:!1,enumerable:!1,writable:!1}):void 0!==optionData?Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,[optionData]),configurable:!1,enumerable:!1,writable:!1}):Object.defineProperty(this,"$optionData",{value:(new WeakMap).set(this,{}),configurable:!1,enumerable:!1,writable:!1}),this):new Option(optionData)};Object.defineProperty(Option,"namespace",{value:"Option",configurable:!1,enumerable:!0,writable:!1}),Object.defineProperty(Option,"type",{value:Object.freeze(["class","object","option"]),configurable:!1,enumerable:!0,writable:!1}),Object.defineProperty(Option,"checkOption",{value:function(entity){
/*;
      					@parameter-definition:
      						{
      							"entity": "
      								[
      									@type:
      											boolean
      										|	function
      										|	object
      										|	number
      										|	string
      										|	symbol
      										|	undefined
      									@end-type
      
      									<@required;>
      								]
      							"
      						}
      					@end-parameter-definition
      
      					@result-definition:
      						{
      							"result": "
      								[
      									@type:
      											boolean
      									@end-type
      								]
      							"
      						}
      					@end-result-definition
      				*/
return"object"==typeof entity&&(entity instanceof Option==1||"string"==typeof entity.constructor.namespace&&entity.constructor.namespace.length>0&&entity.constructor.namespace===Option.namespace||"object"==typeof entity.$type&&null!==entity.$type&&!0===Array.isArray(entity.$type)&&!0===Option.type.every(type=>entity.$type.includes(type)))},configurable:!1,enumerable:!1,writable:!1}),Option.prototype.set=function(property,value,scopeData){if(
/*;
    			@procedure-definition:
    			@end-procedure-definition
    
    			@parameter-definition:
    				{
    					"property": "
    						[
    							@type:
    									number
    								|	string
    								|	symbol
    							@end-type
    
    							<@required;>
    						]
    					",
    					"value": "
    						[
    							@type:
    									boolean
    								|	function
    								|	object
    								|	number
    								|	string
    								|	symbol
    								|	undefined
    							@end-type
    
    							<@required;>
    						]
    					",
    					"scopeData": "
    						[
    							@type:
    									object
    							@end-type
    
    							<@optional;>
    						]
    					"
    				}
    			@end-parameter-definition
    
    			@trigger-definition:
    				{
    					"trigger": "
    						[
    							@type:
    									object as Error
    							@end-type
    
    							<@tag: invalid-set-option-scope-data;>
    							<@tag: invalid-set-option-property;>
    						]
    					"
    				}
    			@end-trigger-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									object as Option
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
"object"==typeof scopeData&&null!==scopeData&&this.setScope(scopeData),"string"!=typeof property&&"number"!=typeof property&&"symbol"!=typeof property)throw new Error(["#invalid-set-option-property;","cannot set option property","invalid property","@property: "+property]);return this.getScope()[property]=value,property in this==1||Object.defineProperty(this,property,{configurable:!1,enumerable:!1,get:function(){return this.getScope()[property]}}),this},Option.prototype.setOption=function(property,value){
/*;
    			@procedure-definition:
    			@end-procedure-definition
    
    			@parameter-definition:
    				{
    					"property": "
    						[
    							@type:
    									number
    								|	string
    								|	symbol
    							@end-type
    
    							<@required;>
    						]
    					",
    
    					"value": "
    						[
    							@type:
    									boolean
    								|	function
    								|	object
    								|	number
    								|	string
    								|	symbol
    								|	undefined
    							@end-type
    
    							<@required;>
    						]
    					"
    				}
    			@end-parameter-definition
    
    			@trigger-definition:
    				{
    					"trigger": "
    						[
    							@type:
    									object as Error
    							@end-type
    
    							<@tag: invalid-set-option-scope-data;>
    							<@tag: invalid-set-option-property;>
    						]
    					"
    				}
    			@end-trigger-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									object as Option
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
return this.set(property,value)},Option.prototype.getOption=function(property){
/*;
    			@procedure-definition:
    			@end-procedure-definition
    
    			@parameter-definition:
    				{
    					"property": "
    						[
    							@type:
    									number
    								|	string
    								|	symbol
    							@end-type
    
    							<@required;>
    						]
    					"
    				}
    			@end-parameter-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									string
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
return this[property]},Option.prototype.checkOption=function(optionQuery){
/*;
    			@procedure-definition:
    			@end-procedure-definition
    
    			@parameter-definition:
    				{
    					"optionQuery": "
    						[
    							@type:
    							@end-type
    
    							<@optional;>
    						]
    					"
    				}
    			@end-parameter-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									boolean
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
return void 0===optionQuery||arguments.length<=0?Object.keys(this.getScope().$optionData).length>0:optionQuery in this==1||void 0!==this[optionQuery]},Option.prototype.setScope=function(scopeData){
/*;
    			@procedure-definition:
    				Set option data container scope.
    			@end-procedure-definition
    
    			@parameter-definition:
    				{
    					"scopeData": "
    						[
    							@type:
    									object
    							@end-type
    
    							<@required;>
    						]
    					"
    				}
    			@end-parameter-definition
    
    			@trigger-definition:
    				{
    					"trigger": "
    						[
    							@type:
    									object as Error
    							@end-type
    
    							<@tag: invalid-set-option-scope-data;>
    						]
    					"
    				}
    			@end-trigger-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									object as Option
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
if("object"!=typeof scopeData||null===scopeData)throw new Error(["#invalid-set-option-scope-data;","cannot set option scope data","invalid scope data","@scope-data: "+scopeData]);return this.$optionData.set(this,scopeData),this},Option.prototype.getScope=function(){
/*;
    			@procedure-definition:
    				Get option data container scope.
    			@end-procedure-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									object
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
return this.$optionData.get(this)},Option.prototype.valueOf=function(){
/*;
    			@procedure-definition:
    			@end-procedure-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									object
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
return Object.freeze(Object.assign({},this.getScope()))},Option.prototype.toString=function(){
/*;
    			@procedure-definition:
    			@end-procedure-definition
    
    			@result-definition:
    				{
    					"result": "
    						[
    							@type:
    									string
    							@end-type
    						]
    					"
    				}
    			@end-result-definition
    		*/
if("function"==typeof require){const util=require("util");if("function"==typeof util.inspect)return util.inspect(this.getScope())}return JSON.stringify(this.getScope())},module.exports=Option}));