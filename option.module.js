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

									<@required>
								]
							"
						}
					@end-parameter-definition

					@result-definition:
						{
							"result": "[@type: boolean]"
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
															option
															.constructor
															.namespace
														)
													==	"string"
												)

											&&	(
														(
															option
															.constructor
															.namespace
															.length
														)
													>	0
												)

											&&	(
														(
															option
															.constructor
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
															Option
															.type
															.every(
																( type ) => (
																	entity
																	.$type
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
					",
					"scopeData": "
						[
							@type:
									object

							<@optional>
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

							<@tag: invalid-set-option-scope-data>
							<@tag: invalid-set-option-property>
						]
					"
				}
			@end-trigger-definition

			@result-definition:
				{
					"result": "[@type: object as Option]"
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

			@trigger-definition:
				{
					"trigger": "
						[
							@type:
								object as Error

							<@tag: invalid-set-option-scope-data>
							<@tag: invalid-set-option-property>
						]
					"
				}
			@end-trigger-definition

			@result-definition:
				{
					"result": "[@type: object as Option]"
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
					"
				}
			@end-parameter-definition

			@result-definition:
				{
					"result": "[@type: string]"
				}
			@end-result-definition
		*/

		return	this[ property ];
	}
);

Option.prototype.checkOption = (
	function checkOption( optionQuery ){

	}
);

Option.prototype.setScope = (
	function setScope( scopeData ){
		/*;
			@procedure-definition:
				Set option data container scope.
			@end-procedure-definition

			@trigger-definition:
				{
					"trigger": "
						[
							@type:
								object as Error

							<@tag: invalid-set-option-scope-data>
						]
					"
				}
			@end-trigger-definition

			@result-definition:
				{
					"result": "[@type: object as Option]"
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
			.$optionData
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
					"result": "[@type: object]"
				}
			@end-result-definition
		*/

		return	(
					this
					.$optionData
					.get(
						this
					)
				);
	}
);

Option.prototype.valueOf = (
	/*;
		@result-definition:
			{
				"result": "[@type: object]"
			}
		@end-result-definition
	*/

	function valueOf( ){
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
					(
						util
						.inspect
					)
				==	"function"
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
