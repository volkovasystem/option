"use strict";

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
*/

const Option = (
	function Option( optionData ){
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

		if(
				(
						(
										this
							instanceof	Option
						)
					===	true
				)
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
					(
							typeof
							optionData
						==	"object"
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
					(
							typeof
							optionData
						!=	"undefined"
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

Object
.defineProperty(
	Option,

	"namespace",

	{
		"value": "Option",

		"configurable": false,
		"enumerable": true,
		"writable": false
	}
);

Object
.defineProperty(
	Option,

	"type",

	{
		"value": (
			Object
			.freeze(
				[
					"class",
					"object",
					"option"
				]
			)
		),

		"configurable": false,
		"enumerable": true,
		"writable": false
	}
);

Object
.defineProperty(
	Option,

	"checkOption",

	{
		"value": (
			function checkOption( entity ){
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

				return	(
								(
										typeof
										entity
									==	"object"
								)

							&&	(
										(
												(
																entity
													instanceof	Option
												)
											===	true
										)

									||	(
												(
														typeof
														(
															(
																option
																.constructor
															)
															.namespace
														)
													==	"string"
												)

											&&	(
														(
															(
																option
																.constructor
																.namespace
															)
															.length
														)
													>	0
												)

											&&	(
														(
															(
																option
																.constructor
															)
															.namespace
														)
													===	(
															Option
															.namespace
														)
												)
										)

									||	(
												(
														typeof
														(
															entity
															.$type
														)
													==	"object"
												)

											&&	(
														entity
														.$type
													!==	null
												)

											&&	(
														Array
														.isArray(
															entity
															.$type
														)
													===	true
												)

											&&	(
														(
															(
																Option
																.type
															)
															.every(
																( type ) => (
																	(
																		entity
																		.$type
																	)
																	.includes(
																		type
																	)
																)
															)
														)
													===	true
												)
										)
								)
						);
			}
		),

		"configurable": false,
		"enumerable": false,
		"writable": false
	}
);

Option.prototype.set = (
	function set( property, value, scopeData ){
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

		if(
				(
						typeof
						scopeData
					==	"object"
				)

			&&	(
						scopeData
					!==	null
				)
		){
			this
			.setScope(
				scopeData
			);
		}

		if(
				(
						typeof
						property
					==	"string"
				)

			||	(
						typeof
						property
					==	"number"
				)

			||	(
						typeof
						property
					==	"symbol"
				)
		){
				this
				.getScope( )[
					property
				]
			=	value;
		}
		else{
			throw	(
						new	Error(
								[
									"#invalid-set-option-property;",

									"cannot set option property",
									"invalid property",

									`@property: ${ property }`
								]
							)
					);
		}

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
									.getScope( )[
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

Option.prototype.setOption = (
	function setOption( property, value ){
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

		return	(
					this
					.set(
						property,
						value
					)
				);
	}
);

Option.prototype.getOption = (
	function getOption( property ){
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

		return	this[ property ];
	}
);

Option.prototype.checkOption = (
	function checkOption( optionQuery ){
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

		if(
				(
						typeof
						optionQuery
					==	"undefined"
				)

			||	(
						arguments
						.length
					<=	0
				)
		){
			return	(
							(
									(
										Object
										.keys(
											(
												this
												.getScope( )
											)
											.$optionData
										)
									)
									.length
								>	0
							)
					);
		}
		else{
			return	(
							(
									(
											optionQuery
										in	this
									)
								===	true
							)

						||	(
									typeof
									this[ optionQuery ]
								!=	"undefined"
							)
					);
		}
	}
);

Option.prototype.setScope = (
	function setScope( scopeData ){
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

		if(
				(
						typeof
						scopeData
					==	"object"
				)

			&&	(
						scopeData
					!==	null
				)
		){
			(
				this
				.$optionData
			)
			.set(
				this,
				scopeData
			);
		}
		else{
			throw	(
						new	Error(
								[
									"#invalid-set-option-scope-data;",

									"cannot set option scope data",
									"invalid scope data",

									`@scope-data: ${ scopeData }`
								]
							)
					);
		}

		return	this;
	}
);

Option.prototype.getScope = (
	function getScope( ){
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

		return	(
					(
						this
						.$optionData
					)
					.get(
						this
					)
				);
	}
);

Option.prototype.valueOf = (
	function valueOf( ){
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

		return	(
					Object
					.freeze(
						Object
						.assign(
							{ },

							(
								this
								.getScope( )
							)
						)
					)
				);
	}
);

Option.prototype.toString = (
	function toString( ){
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

		if(
				(
						typeof
						require
					==	"function"
				)
		){
			const util = require( "util" );

			if(
					(
							typeof
							(
								util
								.inspect
							)
						==	"function"
					)
			){
				return	(
							util
							.inspect(
								this
								.getScope( )
							)
						);
			}
		}

		return	(
					JSON
					.stringify(
						this
						.getScope( )
					)
				);
	}
);

module.exports = Option;
