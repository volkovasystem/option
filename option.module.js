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

const OPTION_CONTEXT = (
	Symbol( "option-context" )
);

const Option = (
	function Option( contextData, providerList ){
		/*;
			@definition:
				@class:#Option
					@description:
						Option class interface for procedure parameter.
					@description;
				@class;

				@parameter:#contextData
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
				@trigger;
			@definition;
		*/

		const resolveParameterList = (
			function resolveParameterList( parameterList ){
				(
						parameterList
					=	(
							Array
							.from(
								(
									arguments
								)
							)
						)
				);

				return	(
							[
								(
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
																			.getContext
																		==	"function"
																	)
															)
														?	(
																data
																.getContext( )
															)
														:	(
																data
															)
													)
												)
												.filter(
													(
														( context ) => (
																(
																		typeof
																		context
																		.constructor
																	==	"function"
																)

															&&	(
																		context
																		.constructor
																		.name
																	===	"Object"
																)
														)
													)
												)
											)
									)
								),

								(
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
												else
												if(
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
																else
																if(
																		(
																				typeof
																				provider
																			!=	"function"
																		)

																	&&	(
																				typeof
																				provider
																				.constructor
																			==	"function"
																		)

																	&&	(
																				provider
																				.constructor
																				.name
																			!==	"Object"
																		)
																){
																	list
																	.push(
																		function context( ){
																			return	(
																						provider
																					);
																		}
																	);
																}
															}
														)
													);
												}
												else
												if(
														(
																typeof
																parameter
															!=	"function"
														)

													&&	(
																typeof
																parameter
																.constructor
															==	"function"
														)

													&&	(
																parameter
																.constructor
																.name
															!==	"Object"
														)
												){
													list
													.push(
														function context( ){
															return	(
																		parameter
																	);
														}
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
								)
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
						contextData,
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
							contextData
						==	"object"
					)

				&&	(
							contextData
						!==	null
					)
			){
				(
						this[ OPTION_CONTEXT ]
					=	(
							contextData
						)
				);
			}
			else{
				(
						this[ OPTION_CONTEXT ]
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

			Object
			.keys(
				(
					contextData
				)
			)
			.forEach(
				(
					( property ) => {
						this
						.push(
							function flush( { target: contextData } ){
								if(
										(
												typeof
												contextData
											==	"object"
										)

									&&	(
												contextData
											!==	null
										)
								){
									(
											contextData[ property ]
										=	(
												this
												.getContext( )[ property ]
											)
									);
								}

								(
										this
										.getContext( )[ property ]
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
				)
			);

			return	(
						this
					);
		}
		else{
			(
					[
						contextData,
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

			const	{
						proxy: option,
						revoke: revokeOption
					}
				=	(
						Proxy
						.revocable(
							(
								new	Option(
										(
											contextData
										),

										(
											providerList
										)
									)
							),

							(
								{
									"get": (
										function get( source, property, target ){
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
												){
													if(
															(
																	[
																		"forEach",
																		"push",
																		"pop",
																		"unshift",
																		"shift"
																	]
																	.includes(
																		(
																			property
																		)
																	)
																===	true
															)
													){
														return	(
																	source[ property ]
																	.bind(
																		(
																			{
																				"source": (
																					source
																				),

																				"target": (
																					target
																				)
																			}
																		)
																	)
																);
													}
													else{
														return	(
																	source[ property ]
																	.bind(
																		(
																			source
																		)
																	)
																);
													}
												}
												else
												if(
														(
																typeof
																Object
																.prototype[ property ]
															==	"function"
														)
												){
													return	(
																source[ property ]
																.bind(
																	(
																		source
																	)
																)
															);
												}
												else{
													return	(
																source[ property ]
															);
												}
											}

											if(
														(
																typeof
																source[ property ]
															==	"function"
														)
											){
												return	(
															source[ property ]
															.bind(
																(
																	target
																)
															)
														);
											}
											else
											if(
													(
															property
														===	"revokeOption"
													)
											){
												return	(
															revokeOption
														);
											}

											try{
												if(
														(
																source
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
													const sourceContext = (
														Object
														.assign(
															(
																{ }
															),

															(
																source
																.getContext( )
															)
														)
													);

													return	(
																source
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
																							{
																								"property": (
																									property
																								),

																								"value": (
																									value
																								),

																								"source": (
																									sourceContext
																								),

																								"target": (
																									target
																								)
																							}
																						)
																					)
																				)
																			:	(
																					value
																				)
																		)
																	),

																	(
																		source
																		.getContext( )[ property ]
																	)
																)
															);
												}

												(
														source
														.getContext( )[ property ]
													=	(
															source
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
																						{
																							"property": (
																								property
																							),

																							"value": (
																								value
																							)
																						}
																					)
																				)
																			)
																		:	(
																				value
																			)
																	)
																),

																(
																	source
																	.getContext( )[ property ]
																)
															)
														)
												);

												const value = (
													source
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
																				===	"format"
																			)
																	)
																?	(
																		provider(
																			(
																				{
																					"property": (
																						property
																					),

																					"value": (
																						value
																					)
																				}
																			)
																		)
																	)
																:	(
																		value
																	)
															)
														),

														(
															source
															.getContext( )[ property ]
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
																source
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
													source
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
																source
																.splice(
																	(
																		source
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
										function set( source, property, value, target ){
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
														source[ property ]
													=	(
															value
														)
												);

												return	(
															true
														);
											}

											if(
													(
															(
																	property
																in	(
																		source
																		.getContext( )
																	)
															)
														===	true
													)

												&&	(
															(
																source
																.getContext( )[ property ]
															)
														===	value
													)
											){
												return	(
															true
														);
											}

											if(
													(
															source
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
																				===	"detour"
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
												const sourceContext = (
													Object
													.assign(
														(
															{ }
														),

														(
															source
															.getContext( )
														)
													)
												);

												source
												.forEach(
													(
														( provider ) => {
															if(
																	(
																			typeof
																			provider
																		==	"function"
																	)

																&&	(
																			provider
																			.name
																		===	"detour"
																	)

																&&	(
																			provider
																			.property
																		===	property
																	)
															){
																provider(
																	(
																		{
																			"property": (
																				property
																			),

																			"value": (
																				value
																			),

																			"source": (
																				sourceContext
																			),

																			"target": (
																				target
																			)
																		}
																	)
																);
															}
														}
													)
												);

												return	(
															true
														);
											}

											(
													source
													.getContext( )[ property ]
												=	(
														value
													)
											);

											source
											.push(
												function flush( { target: contextData } ){
													if(
															(
																	typeof
																	contextData
																==	"object"
															)

														&&	(
																	contextData
																!==	null
															)
													){
														(
																contextData[ property ]
															=	(
																	source
																	.getContext( )[ property ]
																)
														);
													}

													(
															source
															.getContext( )[ property ]
														=	(
																undefined
															)
													);

													return	(
																this
															);
												}
											);

											if(
													(
															source
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
																				===	"transfer"
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
												const sourceContext = (
													Object
													.assign(
														(
															{ }
														),

														(
															source
															.getContext( )
														)
													)
												);

												source
												.forEach(
													(
														( provider ) => {
															if(
																	(
																			typeof
																			provider
																		==	"function"
																	)

																&&	(
																			provider
																			.name
																		===	"transfer"
																	)

																&&	(
																			provider
																			.property
																		===	property
																	)
															){
																provider(
																	(
																		{
																			"property": (
																				property
																			),

																			"value": (
																				value
																			),

																			"source": (
																				sourceContext
																			),

																			"target": (
																				target
																			)
																		}
																	)
																);
															}
														}
													)
												);
											}

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

OptionPrototype.forEach = (
	function forEach( ){
		const source = (
				(
					this
					.source
				)

			||	(
					this
				)
		);

		const target = (
				(
					this
					.target
				)

			||	(
					this
				)
		);

		Array
		.prototype
		.forEach
		.apply(
			(
				source
			),

			(
				Array
				.from(
					(
						arguments
					)
				)
			)
		);

		return	(
					target
				);
	}
);

OptionPrototype.push = (
	function push( providerList ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		const source = (
				(
					this
					.source
				)

			||	(
					this
				)
		);

		const target = (
				(
					this
					.target
				)

			||	(
					this
				)
		);

		(
				providerList
			=	(
					parameterList
					.map(
						(
							( provider ) => (
									(
											(
													typeof
													provider
												!=	"function"
											)
									)
								?	(
										function context( ){
											return	(
														provider
													);
										}
									)
								:	(
										provider
									)
							)
						)
					)
				)
		);

		Array
		.prototype
		.push
		.apply(
			(
				source
			),

			(
				providerList
			)
		);

		return	(
					target
				);
	}
);

OptionPrototype.pop = (
	function pop( count = 1 ){
		const source = (
				(
					this
					.source
				)

			||	(
					this
				)
		);

		const target = (
				(
					this
					.target
				)

			||	(
					this
				)
		);

		if(
				(
						count
					>	(
							source
							.length
						)
				)

			||	(
						count
					>=	Infinity
				)
		){
			(
					count
				=	(
						source
						.length
					)
			);
		}

		while(
				(
						(
							count--
						)
					>	0
				)
		){
			Array
			.prototype
			.pop
			.apply(
				(
					source
				)
			);
		}

		return	(
					target
				);
	}
);

OptionPrototype.unshift = (
	function unshift( providerList ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		const source = (
				(
					this
					.source
				)

			||	(
					this
				)
		);

		const target = (
				(
					this
					.target
				)

			||	(
					this
				)
		);

		(
				providerList
			=	(
					parameterList
					.map(
						(
							( provider ) => (
									(
											(
													typeof
													provider
												!=	"function"
											)
									)
								?	(
										function context( ){
											return	(
														provider
													);
										}
									)
								:	(
										provider
									)
							)
						)
					)
				)
		);

		Array
		.prototype
		.unshift
		.apply(
			(
				source
			),

			(
				providerList
			)
		);

		return	(
					target
				);
	}
);

OptionPrototype.shift = (
	function shift( count = 1 ){
		const source = (
				(
					this
					.source
				)

			||	(
					this
				)
		);

		const target = (
				(
					this
					.target
				)

			||	(
					this
				)
		);

		if(
				(
						count
					>	(
							source
							.length
						)
				)

			||	(
						count
					>=	Infinity
				)
		){
			(
					count
				=	(
						source
						.length
					)
			);
		}

		while(
				(
						(
							count--
						)
					>	0
				)
		){
			Array
			.prototype
			.shift
			.apply(
				(
					source
				)
			);
		}

		return	(
					target
				);
	}
);

OptionPrototype.getFlowLength = (
	function getFlowLength( ){
		return	(
					Array
					.prototype
					.filter
					.call(
						(
							this
						),

						(
							( provider ) => (
									(
											typeof
											provider
										==	"function"
									)
							)
						)
					)
					.length
				);
	}
);

OptionPrototype.bindContext = (
	function bindContext( property, provider ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		(
				property
			=	(
					parameterList
					.find(
						(
							( parameter ) => (
									(
											typeof
											parameter
										==	"string"
									)
							)
						)
					)
				)
		);

		(
				provider
			=	(
					parameterList
					.find(
						(
							( parameter ) => (
									(
											typeof
											parameter
										==	"function"
									)
							)
						)
					)
				)
		);

		if(
				(
						typeof
						provider
					==	"function"
				)
		){
			let bindProvider = (
				undefined
			);

			if(
					(
							provider
							.name
						===	"bind"
					)
			){
				(
						bindProvider
					=	(
							provider
						)
				);
			}
			else{
				(
						bindProvider
					=	(
							function bind( { property, value, source, target } ){
								return	(
											provider(
												(
													{
														"property": (
															property
														),

														"value": (
															value
														),

														"source": (
															source
														),

														"target": (
															target
														)
													}
												)
											)
										);
							}
						)
				);
			}

			if(
					(
							typeof
							property
						==	"string"
					)

				&&	(
							property
							.length
						>	0
					)
			){
				(
						bindProvider
						.property
					=	(
							property
						)
				);
			}

			this
			.unshift(
				(
					bindProvider
				)
			);
		}
		else
		if(
				(
						arguments
						.length
					>=	1
				)

			&&	(
						arguments
						.length
					<=	2
				)

			&&	(
						typeof
						property
					==	"string"
				)

			&&	(
						property
						.length
					>	0
				)
		){
			const value = (
				parameterList
				.slice(
					(
						1
					)
				)
				.find(
					(
						( parameter ) => (
								(
										typeof
										parameter
									!=	"function"
								)
						)
					)
				)
			);

			let bindProvider = (
				undefined
			);

			if(
					(
							value
						!==	""
					)

				&&	(
							isNaN(
								(
									value
								)
							)
						!==	true
					)

				&&	(
							typeof
							value
						!=	undefined
					)

				&&	(
							value
						!==	null
					)
			){
				this
				.unshift(
					(
						function context( ){
							return	(
										{
											[ property ]: (
												value
											)
										}
									);
						}
					)
				);

				(
						bindProvider
					=	(
							function bind( { property, source, target } ){
								(
										target[ property ]
									=	(
											source
											.find(
												(
													( context ) => (
															(
																	Object
																	.keys(
																		(
																			context
																		)
																	)
																	.length
																===	1
															)

														&&	(
																	(
																			property
																		in	context
																	)
																===	true
															)
													)
												)
											)[ property ]
										)
								);

								return	(
											target
										);
							}
						)
				);
			}
			else{
				(
						bindProvider
					=	(
							function bind( { property, source, target } ){
								(
										target[ property ]
									=	(
											source
										)
								);

								return	(
											target
										);
							}
						)
				);
			}

			if(
					(
							typeof
							property
						==	"string"
					)

				&&	(
							property
							.length
						>	0
					)
			){
				(
						bindProvider
						.property
					=	(
							property
						)
				);
			}

			this
			.unshift(
				(
					bindProvider
				)
			);
		}
		else{
			throw	(
						new	Error(
								(
									[
										"#cannot-determine-bind-provider;",

										"cannot determine bind provider;",

										"@provider:",
										`${ provider };`
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

OptionPrototype.getContext = (
	function getContext( ){
		if(
				(
						this
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
											===	"context"
										)
								)
							)
						)
					===	true
				)

			&&	(
						this
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
											===	"bind"
										)
								)
							)
						)
					===	true
				)

			&&	(
					Object
					.isExtensible(
						(
							this[ OPTION_CONTEXT ]
						)
					)
				)
		){
			const contextList = (
				this
				.reduce(
					(
						( contextList, provider ) => (
								(
										(
												typeof
												provider
											==	"function"
										)

									&&	(
												provider
												.name
											===	"context"
										)
								)
							?	(
									(
										contextList
										.push(
											(
												provider( )
											)
										)
									),

									(
										contextList
									)
								)
							:	(
									contextList
								)
						)
					),

					(
						[ ]
					)
				)
			);

			return	(
						Object
						.setPrototypeOf(
							(
								this[ OPTION_CONTEXT ]
							),

							(
								this
								.reduce(
									(
										( context, provider ) => (
												(
														(
																typeof
																provider
															==	"function"
														)

													&&	(
																provider
																.name
															===	"bind"
														)
												)
											?	(
													(
														provider(
															(
																{
																	"property": (
																		provider
																		.property
																	),

																	"source": (
																		contextList
																	),

																	"target": (
																		context
																	)
																}
															)
														)
													),

													(
														context
													)
												)
											:	(
													context
												)
										)
									),

									(
										{ }
									)
								)
							)
						)
					);
		}
		else{
			return	(
						this[ OPTION_CONTEXT ]
					);
		}
	}
);

OptionPrototype.getEffect = (
	function getEffect( ){
		return	(
					Object
					.keys(
						(
							this
							.getContext( )
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

OptionPrototype.checkOption = (
	function checkOption( property ){
		return	(
						(
								property
							in	(
									this
									.getContext( )
								)
						)
					===	true
				);
	}
);

OptionPrototype.formatOption = (
	function formatOption( formatProcedure ){
		if(
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
			else
			if(
					(
							formatProcedure
							.name
							.length
						<=	0
					)
			){
				this
				.push(
					function format( { property, value } ){
						return	(
									formatProcedure(
										(
											{
												"property": (
													property
												),

												"value": (
													value
												)
											}
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
		else
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
				function format( { property, value } ){
					return	(
								formatProcedure(
									(
										{
											"property": (
												property
											),

											"value": (
												value
											)
										}
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

OptionPrototype.resolveOption = (
	function resolveOption( resolveProcedure ){
		if(
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
			else
			if(
					(
							resolveProcedure
							.name
							.length
						<=	0
					)
			){
				this
				.push(
					function resolve( { property, value } ){
						return	(
									resolveProcedure(
										(
											{
												"property": (
													property
												),

												"value": (
													value
												)
											}
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
		else
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
				function resolve( { property, value } ){
					return	(
								resolveProcedure(
									(
										{
											"property": (
												property
											),

											"value": (
												value
											)
										}
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

OptionPrototype.transformOption = (
	function transformOption( property, flowList ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		(
				property
			=	(
					parameterList
					.find(
						(
							( parameter ) => (
									(
											typeof
											parameter
										==	"string"
									)
							)
						)
					)
				)
		);

		(
				flowList
			=	(
					parameterList
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
								else
								if(
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
								else
								if(
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
												else
												if(
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
				)
		);

		const transformProcedure = (
			function transform( { property, value, source, target } ){
				return	(
							flowList
							.reduce(
								(
									( value, procedure ) => (
										procedure(
											(
												{
													"property": (
														property
													),

													"value": (
														value
													),

													"source": (
														source
													),

													"target": (
														target
													)
												}
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

OptionPrototype.transferOption = (
	function transferOption( sourceProperty, targetList ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		(
				targetList
			=	(
					parameterList
					.slice(
						(
							1
						)
					)
					.reduce(
						(
							( procedureList, provider ) => {
								if(
										(
												typeof
												provider
											==	"string"
										)

									&&	(
												provider
												.length
											>	0
										)
								){
									procedureList
									.push(
										function transfer( { property, value, source, target } ){
											(
													target[ provider ]
												=	(
														target[ property ]
													)
											);

											return	(
														target
													);
										}
									);
								}
								else
								if(
										(
												typeof
												provider
											==	"function"
										)

									&&	(
												provider
												.name
											===	"transfer"
										)
								){
									procedureList
									.push(
										(
											provider
										)
									);
								}
								else
								if(
										(
												typeof
												provider
											==	"function"
										)
								){
									procedureList
									.push(
										function transfer( { property, value, source, target } ){
											return	(
														provider(
															(
																{
																	"property": (
																		property
																	),

																	"value": (
																		value
																	),

																	"source": (
																		source
																	),

																	"target": (
																		target
																	)
																}
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
																	"#cannot-determine-transfer-procedure;",

																	"cannot determine transfer procedure;",

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
				)
		);

		targetList
		.forEach(
			(
				( transferProcedure ) => {
					(
							transferProcedure
							.property
						=	(
								sourceProperty
							)
					);

					this
					.push(
						(
							transferProcedure
						)
					);
				}
			)
		);

		return	(
					this
				);
	}
);

OptionPrototype.detourOption = (
	function detourOption( sourceProperty, targetList ){
		const parameterList = (
			Array
			.from(
				(
					arguments
				)
			)
		);

		(
				targetList
			=	(
					parameterList
					.slice(
						(
							1
						)
					)
					.reduce(
						(
							( procedureList, provider ) => {
								if(
										(
												typeof
												provider
											==	"string"
										)

									&&	(
												provider
												.length
											>	0
										)
								){
									procedureList
									.push(
										function detour( { property, value, source, target } ){
											(
													target[ provider ]
												=	(
														value
													)
											);

											return	(
														target
													);
										}
									);
								}
								else
								if(
										(
												typeof
												provider
											==	"function"
										)

									&&	(
												provider
												.name
											===	"detour"
										)
								){
									procedureList
									.push(
										(
											provider
										)
									);
								}
								else
								if(
										(
												typeof
												provider
											==	"function"
										)
								){
									procedureList
									.push(
										function detour( { property, value, source, target } ){
											return	(
														provider(
															(
																{
																	"property": (
																		property
																	),

																	"value": (
																		value
																	),

																	"source": (
																		source
																	),

																	"target": (
																		target
																	)
																}
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
																	"#cannot-determine-detour-procedure;",

																	"cannot determine detour procedure;",

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
				)
		);

		targetList
		.forEach(
			(
				( detourProcedure ) => {
					(
							detourProcedure
							.property
						=	(
								sourceProperty
							)
					);

					this
					.push(
						(
							detourProcedure
						)
					);
				}
			)
		);

		return	(
					this
				);
	}
);

OptionPrototype.flushOption = (
	function flushOption( contextData ){
		try{
			return	(
						this
						.reduce(
							(
								( target, provider ) => (
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
													target
												)
											)(
												(
													{
														"target": (
															contextData
														)
													}
												)
											)
										)
									:	(
											target
										)
								)
							),

							(
								this
							)
						)
					);
		}
		catch( error ){
			throw	(
						new	Error(
									(
										[
											"#cannot-flush-option;",

											"cannot flush option;",

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
							source
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
												===	"flush"
											)
									)
								)
							)
						===	true
					)
			){
				source
				.forEach(
					( provider ) => {
						if(
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
						){
							source
							.splice(
								(
									source
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
);

OptionPrototype.cleanOption = (
	function cleanOption( ){
		this
		.pop(
			(
				Infinity
			)
		);

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
							this
							.getContext( )
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
