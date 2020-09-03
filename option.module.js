"use strict";

/*;
	@license;
	@start:license:module:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@start:license:copyright:
			Richeve S. Bebedor

			<@license:year-range:2020-present;>

			<@license:contact-detail:richeve.bebedor@gmail.com;>
		@end:license:copyright;

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
	@end:license:module;
*/

const INTERNAL_OPTION = (
	Symbol( "internal-option" )
);

const Option = (
	function Option( optionData, providerList ){
		/*;
			@definition:
				@class:#Option
					@description:
					@description;
				@class;

				@parameter:#optionData
					@type:
							object
						|	object:as:Option
					@type;

					@description:
					@description;
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
					parameterList
					.find(
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
				);

			this[ INTERNAL_OPTION ] = (
				{ }
			);

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
				let property in optionData
			){
				let value = (
					optionData[ property ]
				);

					this[ INTERNAL_OPTION ][ property ]
				=	(
						value
					);

				this
				.push(
					function( option ){
							this[ INTERNAL_OPTION ][ property ]
						=	(
								undefined
							);

						if(
								(
										typeof
										option
									==	"object"
								)

							&&	(
										option
									!==	null
								)
						){
								option[ property ]
							=	(
									value
								);
						}

						return	(
									this
								);
					}
				);
			}

			return	this;
		}
		else{
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
		return	(
					Proxy
					.revocable(
						(
							optionInstance
						),

						(
							{
								"get": (
									function get( entity, property ){
										if(
													(
															typeof
															entity[ property ]
														==	"function"
													)
										){
											return	(
														entity[ property ]
														.bind( entity )
													);
										}

										return	(
													entity[ INTERNAL_OPTION ][ property ]
												);
									}
								),

								"set": (
									function set( entity, property, value ){
											entity[ INTERNAL_OPTION ][ property ]
										=	(
												value
											);

										entity
										.push(
											function( option ){
													entity[ INTERNAL_OPTION ][ property ]
												=	(
														undefined
													);

												if(
														(
																typeof
																option
															==	"object"
														)

													&&	(
																option
															!==	null
														)
												){
														option[ property ]
													=	(
															value
														);
												}

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

OptionPrototype.flush = (
	function flush( option ){
		return	(
					this
					.filter(
						(
							( provider ) => (
									(
											typeof
											provider
										==	"function"
									)

								&&	(
											(
													typeof
													provider
													.name
												!=	"string"
											)

										||	(
													provider
													.name
													.length
												<=	0
											)
									)
							)
						)
					)
					.reduce(
						(
							( entity, provider ) => (
								provider
								.bind(
									(
										entity
									)
								)(
									(
										option
									)
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
							this[ INTERNAL_OPTION ]
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
