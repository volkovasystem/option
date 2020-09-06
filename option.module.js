"use strict";

/*;
	@license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@license:copyright;

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
	@license:module;
*/

const CONTEXT = (
	Symbol( "context" )
);

const Option = (
	function Option( optionData, providerList ){
		/*;
			@definition:
				@class:#Option
					@description:
						Option class interface for procedure parameter.
					@description;
				@class;

				@parameter:#optionData
					@type:
							object
						|	object:as:Option
					@type;

					@description:
					@description;

					@optional;
				@parameter;

				@parameter:#providerList
					@type:
							object:as:Array:of:function
					@type;

					@description:
					@description;

					@optional;
				@parameter;

				@result:#result
					@type:
							object:as:Option
					@type;

					@description:
					@description;
				@result;

				@trigger:#trigger
					@type:
							object:as:Error
					@type;

					@description:
					@description;

					@tag:#cannot-create-option-object;
				@trigger;
			@definition;
		*/

		const resolveParameterList = (
			function resolveParameterList( ){
				const parameterList = (
					Array
					.from(
						(
							arguments
						)
					)
				);

				const optionCache = (
					Object
					.assign(
						...	(
								parameterList
								.filter(
									(
										( parameter ) => (
												(
														typeof
														parameter
													==	"object"
												)

											&&	(
														parameter
													!==	null
												)

											&&	(
														Array
														.isArray(
															(
																parameter
															)
														)
													!==	true
												)
										)
									)
								)
								.concat(
									(
										[
											{ }
										]
									)
								)
								.map(
									( data ) => (
											(
													(
															(
																			data
																instanceof	Option
															)
														===	true
													)

												&&	(
															typeof
															data
															.context
														==	"function"
													)
											)
										?	(
												data
												.context( )
											)
										:	(
												data
											)
									)
								)
							)
					)
				);

				const providerCache = (
					parameterList
					.reduce(
						(
							( list, parameter ) => {
								if(
										(
												typeof
												parameter
											==	"function"
										)
								){
									list
									.push(
										(
											parameter
										)
									);
								}
								else if(
										(
												Array
												.isArray(
													(
														parameter
													)
												)
											===	true
										)
								){
									parameter
									.forEach(
										(
											( provider ) => {
												if(
														(
																typeof
																provider
															==	"function"
														)
												){
													list
													.push(
														(
															provider
														)
													);
												}
											}
										)
									);
								}

								return	(
											list
										);
							}
						),

						(
							[ ]
						)
					)
				);

				return	(
							[
								optionCache,
								providerCache
							]
						);
			}
		);

		if(
				(
						(
										this
							instanceof	Option
						)
					===	true
				)
		){
			(
					[
						optionData,
						providerList
					]
				=	(
						resolveParameterList
						.apply(
							(
								this
							),

							(
								Array
								.from(
									(
										arguments
									)
								)
							)
						)
					)
			);

			if(
					(
							typeof
							optionData
						==	"object"
					)

				&&	(
							optionData
						!==	null
					)
			){
				(
						this[ CONTEXT ]
					=	(
							optionData
						)
				);
			}
			else{
				(
						this[ CONTEXT ]
					=	(
							{ }
						)
				);
			}

			providerList
			.forEach(
				(
					( provider ) => {
						this
						.push(
							(
								provider
							)
						);
					}
				)
			);

			for(
				let	property
				in	optionData
			){
				let value = (
					optionData[ property ]
				);

				const self = (
					this
				);

				this
				.push(
					function flush( optionData ){
						if(
								(
										typeof
										optionData
									==	"object"
								)

							&&	(
										optionData
									!==	null
								)
						){
							(
									optionData[ property ]
								=	(
										self[ CONTEXT ][ property ]
									)
							);
						}

						(
								self[ CONTEXT ][ property ]
							=	(
									undefined
								)
						);

						return	(
									this
								);
					}
				);
			}

			return	(
						this
					);
		}
		else{
			(
					[
						optionData,
						providerList
					]
				=	(
						resolveParameterList
						.apply(
							(
								null
							),

							(
								Array
								.from(
									(
										arguments
									)
								)
							)
						)
					)
			);

			return	(
						Option
						.createProxyOption(
							(
								new	Option(
										(
											optionData
										),

										(
											providerList
										)
									)
							)
						)
					);
		}
	}
);

Option.createProxyOption = (
	function createProxyOption( optionInstance ){
		const	{
					proxy: option,
					revoke: revokeOption
				}
			=	(
					Proxy
					.revocable(
						(
							optionInstance
						),

						(
							{
								"get": (
									function get( entity, property, proxy ){
										if(
												(
														Array
														.prototype
														.hasOwnProperty(
															(
																property
															)
														)
													===	true
												)

											||	(
														Object
														.prototype
														.hasOwnProperty(
															(
																property
															)
														)
													===	true
												)

											||	(
														typeof
														property
													==	"symbol"
												)
										){
											if(
													(
															typeof
															Array
															.prototype[ property ]
														==	"function"
													)

												||	(
															typeof
															Object
															.prototype[ property ]
														==	"function"
													)
											){
												return	(
															entity[ property ]
															.bind(
																(
																	entity
																)
															)
														);
											}
											else{
												return	(
															entity[ property ]
														);
											}
										}

										if(
													(
															typeof
															entity[ property ]
														==	"function"
													)
										){
											return	(
														entity[ property ]
														.bind(
															(
																proxy
															)
														)
													);
										}

										try{
											if(
													(
															entity
															.some(
																(
																	( provider ) => (
																			(
																					typeof
																					provider
																				==	"function"
																			)

																		&&	(
																					provider
																					.name
																				===	"transform"
																			)

																		&&	(
																					provider
																					.property
																				===	property
																			)
																	)
																)
															)
														===	true
													)
											){
												const context = (
													Object
													.assign(
														(
															{ }
														),

														(
															entity[ CONTEXT ]
														)
													)
												);

												return	(
															entity
															.reduce(
																(
																	( value, provider ) => (
																			(
																					(
																							typeof
																							provider
																						==	"function"
																					)

																				&&	(
																							provider
																							.name
																						===	"transform"
																					)

																				&&	(
																							provider
																							.property
																						===	property
																					)
																			)
																		?	(
																				provider(
																					(
																						value
																					),

																					(
																						context
																					)
																				)
																			)
																		:	(
																				value
																			)
																	)
																),

																(
																	entity[ CONTEXT ][ property ]
																)
															)
														);
											}

											(
													entity[ CONTEXT ][ property ]
												=	(
														entity
														.reduce(
															(
																( value, provider, index ) => (
																		(
																				(
																						typeof
																						provider
																					==	"function"
																				)

																			&&	(
																						provider
																						.name
																					===	"resolve"
																				)
																		)
																	?	(
																			provider(
																				(
																					property
																				),

																				(
																					value
																				)
																			)
																		)
																	:	(
																			value
																		)
																)
															),

															(
																entity[ CONTEXT ][ property ]
															)
														)
													)
											);

											const value = (
												entity
												.reduce(
													(
														( value, provider, index ) => (
																(
																		(
																				typeof
																				provider
																			==	"function"
																		)

																	&&	(
																				provider
																				.name
																			===	"format"
																		)
																)
															?	(
																	provider(
																		(
																			property
																		),

																		(
																			value
																		)
																	)
																)
															:	(
																	value
																)
														)
													),

													(
														entity[ CONTEXT ][ property ]
													)
												)
											);

											return	(
														value
													);
										}
										catch( error ){
											throw	(
														new	Error(
																	(
																		[
																			"#cannot-get-option-property;",

																			"cannot get option property;",

																			"@error-data:",
																			`${ error };`
																		]
																	)
																)
													);
										}
										finally{
											while(
													(
															entity
															.some(
																(
																	( provider ) => (
																			(
																					typeof
																					provider
																				==	"function"
																			)

																		&&	(
																					(
																							provider
																							.name
																						===	"resolve"
																					)

																				||	(
																							provider
																							.name
																						===	"format"
																					)
																			)
																	)
																)
															)
														===	true
													)
											){
												entity
												.forEach(
													( provider ) => {
														if(
																(
																		typeof
																		provider
																	==	"function"
																)

															&&	(
																		(
																				provider
																				.name
																			===	"resolve"
																		)

																	||	(
																				provider
																				.name
																			===	"format"
																		)
																)
														){
															entity
															.splice(
																(
																	entity
																	.indexOf(
																		(
																			provider
																		)
																	)
																),

																(
																	1
																)
															);
														}
													}
												);
											}
										}
									}
								),

								"set": (
									function set( entity, property, value ){
										if(
												(
														Array
														.prototype
														.hasOwnProperty(
															(
																property
															)
														)
													===	true
												)

											||	(
														Object
														.prototype
														.hasOwnProperty(
															(
																property
															)
														)
													===	true
												)

											||	(
														typeof
														property
													==	"symbol"
												)
										){
											(
													entity[ property ]
												=	(
														value
													)
											);

											return	(
														true
													);
										}

										(
												entity[ CONTEXT ][ property ]
											=	(
													value
												)
										);

										entity
										.push(
											function flush( optionData ){
												if(
														(
																typeof
																optionData
															==	"object"
														)

													&&	(
																optionData
															!==	null
														)
												){
													(
															optionData[ property ]
														=	(
																entity[ CONTEXT ][ property ]
															)
													);
												}

												(
														entity[ CONTEXT ][ property ]
													=	(
															undefined
														)
												);

												return	(
															this
														);
											}
										);

										return	(
													true
												);
									}
								)
							}
						)
					)
				);

		return	(
					{
						"option": option,
						"revokeOption": revokeOption
					}
				);
	}
);

const OptionPrototype = (
		Option
		.prototype
	=	(
			Object
			.create(
				(
					Array
					.prototype
				)
			)
		)
);

OptionPrototype.context = (
	function context( ){
		return	(
					this[ CONTEXT ]
				);
	}
);

OptionPrototype.effect = (
	function effect( ){
		return	(
					Object
					.keys(
						(
							this[ CONTEXT ]
						)
					)
					.reduce(
						(
							( effect, property ) => (
								(
										effect[ property ]
									=	this[ property ]
								),
								(
									effect
								)
							)
						),

						(
							{ }
						)
					)
				);
	}
);

OptionPrototype.check = (
	function check( property ){
		return	(
						(
								property
							in	this[ CONTEXT ]
						)
					===	true
				);
	}
);

OptionPrototype.format = (
	function format( formatProcedure ){
		if(
				(
						typeof
						formatProcedure
					==	"string"
				)

			&&	(
						formatProcedure
						.length
					>	0
				)

			&&	(
						formatProcedure
					!==	"format"
				)

			&&	(
						formatProcedure
						.indexOf(
							(
								"format"
							)
						)
					===	0
				)
		){
			formatProcedure = (
				this
				.find(
					( provider ) => (
							(
									typeof
									provider
								==	"function"
							)

						&&	(
									provider
									.name
								===	formatProcedure
							)
					)
				)
			);

			if(
					(
							typeof
							formatProcedure
						!=	"function"
					)
			){
				throw	(
							new	Error(
										(
											[
												"#cannot-find-format-procedure;",

												"cannot find format procedure;",

												"@format-procedure:",
												`${ formatProcedure };`
											]
										)
									)
						);
			}

			this
			.push(
				function format( property, value ){
					return	(
								formatProcedure(
									(
										property
									),

									(
										value
									)
								)
							);
				}
			);
		}
		else if(
				(
						typeof
						formatProcedure
					==	"function"
				)
		){
			if(
					(
							formatProcedure
							.name
						===	"format"
					)

				||	(
							formatProcedure
							.name
							.indexOf(
								(
									"format"
								)
							)
						===	0
					)
			){
				this
				.push(
					(
						formatProcedure
					)
				);
			}
			else if(
					(
							formatProcedure
							.name
							.length
						<=	0
					)
			){
				this
				.push(
					function format( property, value ){
						return	(
									formatProcedure(
										(
											property
										),

										(
											value
										)
									)
								);
					}
				);
			}
			else{
				throw	(
							new	Error(
										(
											[
												"#cannot-determine-format-procedure;",

												"cannot determine format procedure;",

												"@format-procedure:",
												`${ formatProcedure };`
											]
										)
									)
						);
			}
		}
		else{
			throw	(
						new	Error(
									(
										[
											"#cannot-provide-format-procedure;",

											"cannot provide format procedure;",

											"@format-procedure:",
											`${ formatProcedure };`
										]
									)
								)
					);
		}

		return	(
					this
				);
	}
);

OptionPrototype.resolve = (
	function resolve( resolveProcedure ){
		if(
				(
						typeof
						resolveProcedure
					==	"string"
				)

			&&	(
						resolveProcedure
						.length
					>	0
				)

			&&	(
						resolveProcedure
					!==	"resolve"
				)

			&&	(
						resolveProcedure
						.indexOf(
							(
								"resolve"
							)
						)
					===	0
				)
		){
			resolveProcedure = (
				this
				.find(
					( provider ) => (
							(
									typeof
									provider
								==	"function"
							)

						&&	(
									provider
									.name
								===	resolveProcedure
							)
					)
				)
			);

			if(
					(
							typeof
							resolveProcedure
						!=	"function"
					)
			){
				throw	(
							new	Error(
										(
											[
												"#cannot-find-resolve-procedure;",

												"cannot find resolve procedure;",

												"@resolve-procedure:",
												`${ resolveProcedure };`
											]
										)
									)
						);
			}

			this
			.push(
				function resolve( property, value ){
					return	(
								resolveProcedure(
									(
										property
									),

									(
										value
									)
								)
							);
				}
			);
		}
		else if(
				(
						typeof
						resolveProcedure
					==	"function"
				)
		){
			if(
					(
							resolveProcedure
							.name
						===	"resolve"
					)

				||	(
							resolveProcedure
							.name
							.indexOf(
								(
									"resolve"
								)
							)
						===	0
					)
			){
				this
				.push(
					(
						resolveProcedure
					)
				);
			}
			else if(
					(
							resolveProcedure
							.name
							.length
						<=	0
					)
			){
				this
				.push(
					function resolve( property, value ){
						return	(
									resolveProcedure(
										(
											property
										),

										(
											value
										)
									)
								);
					}
				);
			}
			else{
				throw	(
							new	Error(
										(
											[
												"#cannot-determine-resolve-procedure;",

												"cannot determine resolve procedure;",

												"@resolve-procedure:",
												`${ resolveProcedure };`
											]
										)
									)
						);
			}
		}
		else{
			throw	(
						new	Error(
									(
										[
											"#cannot-provide-resolve-procedure;",

											"cannot provide resolve procedure;",

											"@resolve-procedure:",
											`${ resolveProcedure };`
										]
									)
								)
					);
		}

		return	(
					this
				);
	}
);

OptionPrototype.transform = (
	function transform( property, flow ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		flow = (
			parameterList
			.slice(
				(
					0
				)
			)
			.reduce(
				(
					( procedureList, parameter ) => {
						if(
								(
										typeof
										parameter
									==	"function"
								)
						){
							procedureList
							.push(
								(
									parameter
								)
							);
						}
						else if(
								(
										typeof
										parameter
									==	"string"
								)
						){
							procedureList
							.push(
								(
									this
									.find(
										( provider ) => (
												(
														typeof
														provider
													==	"function"
												)

											&&	(
														provider
														.name
													===	parameter
												)
										)
									)
								)
							);
						}
						else if(
								(
										Array
										.isArray(
											(
												parameter
											)
										)
									===	true
								)
						){
							parameter
							.forEach(
								(
									( procedure ) => {
										if(
												(
														typeof
														procedure
													==	"function"
												)
										){
											procedureList
											.push(
												(
													procedure
												)
											);
										}
										else if(
												(
														typeof
														procedure
													==	"string"
												)
										){
											procedureList
											.push(
												(
													this
													.find(
														( provider ) => (
																(
																		typeof
																		provider
																	==	"function"
																)

															&&	(
																		provider
																		.name
																	===	procedure
																)
														)
													)
												)
											);
										}
										else{
											throw	(
														new	Error(
																	(
																		[
																			"#cannot-determine-transform-procedure;",

																			"cannot determine transform procedure;",

																			"@parameter-list:",
																			`${ parameterList };`
																		]
																	)
																)
													);
										}
									}
								)
							);
						}
						else{
							throw	(
										new	Error(
													(
														[
															"#cannot-determine-transform-procedure;",

															"cannot determine transform procedure;",

															"@parameter-list:",
															`${ parameterList };`
														]
													)
												)
									);
						}

						return	(
									procedureList
								);
					}
				),

				(
					[ ]
				)
			)
			.filter(
				(
					( procedure ) => (
							(
									typeof
									procedure
								==	"function"
							)
					)
				)
			)
		);

		const transformProcedure = (
			function transform( value, context ){
				return	(
							flow
							.reduce(
								(
									( value, procedure ) => (
										procedure(
											(
												value
											),

											(
												context
											)
										)
									)
								),

								(
									value
								)
							)
						);
			}
		);

		(
				transformProcedure
				.property
			=	(
					property
				)
		);

		this
		.push(
			(
				transformProcedure
			)
		);

		return	(
					this
				);
	}
);

OptionPrototype.flush = (
	function flush( optionData ){
		return	(
					this
					.reduce(
						(
							( entity, provider ) => (
									(
											(
													typeof
													provider
												==	"function"
											)

										&&	(
													provider
													.name
												===	"flush"
											)
									)
								?	(
										provider
										.bind(
											(
												entity
											)
										)(
											(
												optionData
											)
										)
									)
								:	(
										entity
									)
							)
						),

						(
							this
						)
					)
				);
	}
);

OptionPrototype.clean = (
	function clean( ){
		while(
				(
						this
						.length
					>	0
				)
		){
			this
			.pop( )
		}

		return	(
					this
				);
	}
);

OptionPrototype.valueOf = (
	function valueOf( ){
		return	(
					Object
					.assign(
						(
							{ }
						),

						(
							this[ CONTEXT ]
						)
					)
				);
	}
);

OptionPrototype.toJSON = (
	function toJSON( ){
		return	(
					this
					.valueOf( )
				);
	}
);

OptionPrototype.toString = (
	function toString( ){
		return	(
					JSON
					.stringify(
						(
							this
							.toJSON( )
						)
					)
				);
	}
);

module.exports = Option;
