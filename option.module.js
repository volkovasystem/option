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
																					.indexOf(
																						(
																							"resolve"
																						)
																					)
																				===	0
																			)
																	)
																?	(
																		entity
																		.splice(
																			(
																				index
																			),

																			(
																				1
																			)
																		)
																		[ 0 ](
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
																			.indexOf(
																				(
																					"format"
																				)
																			)
																		===	0
																	)
															)
														?	(
																entity
																.splice(
																	(
																		index
																	),

																	(
																		1
																	)
																)
																[ 0 ](
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

OptionPrototype.format = (
	function format( formatProcedure ){
		if(
				(
						formatProcedure
						.name
						.includes(
							(
								"format"
							)
						)
					!==	true
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
			this
			.push(
				(
					formatProcedure
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
						resolveProcedure
						.name
						.includes(
							(
								"resolve"
							)
						)
					!==	true
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
			this
			.push(
				(
					resolveProcedure
				)
			);
		}

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
													.indexOf(
														(
															"flush"
														)
													)
												===	0
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
