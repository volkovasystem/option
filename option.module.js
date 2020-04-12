"use strict";

/*;
	@module-license:
		MIT License

		Copyright (c) 2020 Richeve S. Bebedor <richeve.bebedor@gmail.com>
		@copyright: Richeve S. Bebedor <@year: 2020> <@contact: richeve.bebedor@gmail.com>

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
*/

const Option = (
	function Option( optionData ){
		/*;
			@parameter-definition:
				{
					"optionData": "[@type: object|object as Option]"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: object as Option]"
				}
			@end-result-definition
		*/

		if(
				(
								this
					instanceof	Option
				)
			===	true
		){
			if(
					(
							typeof
							optionData
						==	"object"
					)

				&&	(
							(
											optionData
								instanceof	Option
							)
						===	true
					)
			){
				Object
				.defineProperty(
					this,

					"$optionData",

					{
						"value": (
							(
								new WeakMap( )
							)
							.set(
								this,

								(
									Object
									.assign(
										{ },

										(
											optionData
											.$entity
										)
									)
								)
							)
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);
			}
			else if(
					typeof
					optionData
				==	"object"
			){
				Object
				.defineProperty(
					this,

					"$optionData",

					{
						"value": (
							(
								new WeakMap( )
							)
							.set(
								this,

								(
									Object
									.assign(
										{ },

										optionData
									)
								)
							)
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);
			}
			else if(
					typeof
					optionData
				!= "undefined"
			){
				Object
				.defineProperty(
					this,

					"$optionData",

					{
						"value": (
							(
								new WeakMap( )
							)
							.set(
								this,

								[ optionData ]
							)
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);
			}
			else{
				Object
				.defineProperty(
					this,

					"$optionData",

					{
						"value": (
							(
								new WeakMap( )
							)
							.set(
								this,

								{ }
							)
						),

						"configurable": false,
						"enumerable": false,
						"writable": false
					}
				);
			}

			return	this;
		}
		else{
			return	(
						new	Option(
								optionData
							)
					);
		}
	}
);

Option.prototype.set = (
	function set( property, value ){
		/*;
			@parameter-definition:
				{
					"property": "
						[
							@type:
									number
								|	string
								|	symbol

							<@required>
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

							<@required>
						]
					"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: object as Option]"
				}
			@end-result-definition
		*/

			(
				this
				.$optionData
				.get(
					this
				)
			)[
				property
			]
		=	value;

		if(
				(
						property
					in	this
				)
			===	true
		){
			return	this;
		}

		Object
		.defineProperty(
			this,

			property,

			{
				"configurable": false,
				"enumerable": false,

				"get": (
					function get( ){
						return	(
									this
									.$optionData
									.get(
										this
									)[
										property
									]
								);
					}
				)
			}
		);

		return	this;
	}
);

Option.prototype.valueOf = (
	function valueOf( ){
		return	(
					Object
					.freeze(
						Object
						.assign(
							{ },

							(
								this
								.$optionData
								.get(
									this
								)
							)
						)
					)
				);
	}
);

Option.prototype.toString = (
	function toString( ){
		/*;
			@result-definition:
				{
					"result": "[@type: string]"
				}
			@end-result-definition
		*/
		if(
				typeof
				require
			==	"function"
		){
			const util = require( "util" );

			if(
					typeof
					util
					.inspect
				==	"function"
			){
				return	(
							util
							.inspect(
								this
								.$optionData
								.get(
									this
								)
							)
						);
			}
		}

		return	(
					JSON
					.stringify(
						this
						.$optionData
						.get(
							this
						)
					)
				);
	}
);

module.exports = Option;
