"use strict";

//; @code-space:template-engine:
const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

//; @procedure:check-directory:
const checkDirectory = (
	async	function checkDirectory( directoryPath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

						directoryPath
					=	(
							path
							.resolve(
								(
									directoryPath
								)
							)
						);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														directoryPath
													)
												)
									)
									.isDirectory( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//; @procedure:check-directory;

//; @procedure:check-file:
const checkFile = (
	async	function checkFile( filePath ){
					const fs = require( "fs" );
					const path = require( "path" );

					const fsAsync = (
						fs
						.promises
					);

						filePath
					=	(
							path
							.resolve(
								(
									filePath
								)
							)
						);

					try{
						return	(
									(
										await	fsAsync
												.stat(
													(
														filePath
													)
												)
									)
									.isFile( )
								);
					}
					catch( error ){
						return	(
									false
								);
					}
			}
);
//; @procedure:check-file;

//;	@procedure:get-directory-file-list:
const getDirectoryFileList = (
	async	function getDirectoryFileList( directoryPath ){
				const fs = require( "fs" );
				const path = require( "path" );

				const fsAsync = (
					fs
					.promises
				);

					directoryPath
				=	(
						path
						.resolve(
							(
								directoryPath
							)
						)
					);

				try{
					return	(
								await	fsAsync
										.readdir(
											(
												directoryPath
											),

											(
												{
													"withFileTypes": (
														true
													)
												}
											)
										)
							);
				}
				catch( error ){
					return	(
								[ ]
							);
				}
			}
);
//;	@procedure:get-directory-file-list;

//;	@procedure:execute-shell-script:
const executeShellScript = (
	async	function executeShellScript( shellScript, moduleDirectoryPath ){
				const childProcess = require( "child_process" );
				const path = require( "path" );

				const execAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				if(
						(
								typeof
								moduleDirectoryPath
							==	"string"
						)

					&&	(
								moduleDirectoryPath
								.length
							>	0
						)
				){
					moduleDirectoryPath = (
						path
						.resolve(
							(
								moduleDirectoryPath
							)
						)
					);
				}
				else{
					moduleDirectoryPath = (
						process
						.cwd( )
					);
				}

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	execAsync(
											(
												shellScript
											),

											(
												{
													"cwd": (
														moduleDirectoryPath
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);
//;	@procedure:execute-shell-script;

//;	@procedure:setup-test-directory:
const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);
//;	@procedure:setup-test-directory;

//;	@procedure:clean-test-directory:
const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellScript(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);
//;	@procedure:clean-test-directory;
//; @code-space:template-engine;

const Option = (
	require( "./option.js" )
);

const TEST_OPTION_INSTANCE = (
	function TEST_OPTION_INSTANCE( ){
		try{
			const actualValue = (
					(
									Option( )
									.option
						instanceof	Option
					)
				===	true
			);

			const testValue = (
				true
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-option-instance;",

						"test option instance;",

						`must assert to, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_SET_GET_OPTION_ON_UNDEFINED_CONTEXT = (
	function TEST_SET_GET_OPTION_ON_UNDEFINED_CONTEXT( ){
		try{
			const option = (
				Option( )
				.option
			);

			(
					option
					.hello
				=	(
						"world"
					)
			);

			const actualValue = (
				option
				.hello
			);

			const testValue = (
				"world"
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-set-get-option-on-undefined-context;",

						"test set get option on undefined context;",

						`must be equal, ${ actualValue }, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_SET_GET_OPTION_WITH_CONTEXT = (
	function TEST_SET_GET_OPTION_WITH_CONTEXT( ){
		try{
			const option = (
				Option(
					(
						{
							"hello": (
								"world"
							)
						}
					)
				)
				.option
			);

			(
					option
					.hello
				=	(
						"mundo"
					)
			);

			const actualValue = (
				option
				.hello
			);

			const testValue = (
				"mundo"
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-set-get-option-with-context;",

						"test set get option on undefined context;",

						`must be equal, ${ actualValue }, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_BASIC_FORMAT_OPTION = (
	function TEST_BASIC_FORMAT_OPTION( ){
		try{
			const option = (
				Option(
					(
						{
							"hello": (
								"world"
							)
						}
					)
				)
				.option
			);

			option
			.formatOption(
				(
					( { property, value } ) => (
							(
									(
											property
										===	"hello"
									)
							)
						?	(
								value
								.toUpperCase( )
							)
						:	(
								value
							)
					)
				)
			);

			const actualValue = (
				option
				.hello
			);

			const testValue = (
				"WORLD"
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-basic-format-option;",

						"test basic format option;",

						`must be equal, ${ actualValue }, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_CONSUME_FORMAT_OPTION = (
	function TEST_CONSUME_FORMAT_OPTION( ){
		try{
			const option = (
				Option(
					(
						{
							"hello": (
								"world"
							)
						}
					)
				)
				.option
			);

			(
				option
				.formatOption(
					(
						( { property, value } ) => (
								(
										(
												property
											===	"hello"
										)
								)
							?	(
									value
									.toUpperCase( )
								)
							:	(
									value
								)
						)
					)
				)
				.hello
			);

			const actualValue = (
				option
				.hello
			);

			const testValue = (
				"world"
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-consume-format-option;",

						"test consume format option;",

						`must be equal, ${ actualValue }, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_BASIC_RESOLVE_OPTION = (
	function TEST_BASIC_RESOLVE_OPTION( ){
		try{
			const option = (
				Option(
					(
						{
							"count": (
								0
							)
						}
					)
				)
				.option
			);

			option
			.resolveOption(
				(
					( { property, value } ) => (
							(
									(
											property
										===	"count"
									)
							)
						?	(
									value
								+	1
							)
						:	(
								value
							)
					)
				)
			);

			const actualValue = (
				option
				.count
			);

			const testValue = (
				1
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-basic-resolve-option;",

						"test basic resolve option;",

						`must be equal, ${ actualValue }, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_CONSUME_RESOLVE_OPTION = (
	function TEST_CONSUME_RESOLVE_OPTION( ){
		try{
			const option = (
				Option(
					(
						{
							"count": (
								0
							)
						}
					)
				)
				.option
			);

			(
				option
				.resolveOption(
					(
						( { property, value } ) => (
								(
										(
												property
											===	"count"
										)
								)
							?	(
										value
									+	1
								)
							:	(
									value
								)
						)
					)
				)
				.count
			);

			const actualValue = (
				option
				.count
			);

			const testValue = (
				1
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-consume-resolve-option;",

						"test consume resolve option;",

						`must be equal, ${ actualValue }, ${ testValue };`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_BASIC_TRANSFORM_OPTION = (
	function TEST_BASIC_TRANSFORM_OPTION( ){
		try{
			const context = (
				{
					"hello": (
						"world"
					)
				}
			);

			const option = (
				Option(
					(
						context
					)
				)
				.option
			);

			option
			.transformOption(
				(
					"hello"
				),

				(
					( { property, value, source, target } ) => (
						value
						.toUpperCase( )
					)
				)
			);

			const actualValue = (
					(
							option
							.hello
						===	"WORLD"
					)

				&&	(
							context
							.hello
						===	"world"
					)
			);

			const testValue = (
				true
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-basic-transform-option;",

						"test basic transform option;",

						`must assert to, ${ testValue }`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_BASIC_TRANSFER_OPTION = (
	function TEST_BASIC_TRANSFER_OPTION( ){
		try{
			const context = (
				{
					"hello": (
						"world"
					)
				}
			);

			const option = (
				Option(
					(
						context
					)
				)
				.option
			);

			option
			.transferOption(
				(
					"hello"
				),

				(
					"hi"
				)
			);

			(
					option
					.hello
				=	(
						"mundo"
					)
			);

			const actualValue = (
					(
							option
							.hello
						===	"mundo"
					)

				&&	(
							context
							.hello
						===	"mundo"
					)

				&&	(
							option
							.hi
						===	"mundo"
					)

				&&	(
							context
							.hi
						===	"mundo"
					)
			);

			const testValue = (
				true
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-basic-transfer-option;",

						"test basic transfer option;",

						`must assert to, ${ testValue }`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

const TEST_BASIC_DETOUR_OPTION = (
	function TEST_BASIC_DETOUR_OPTION( ){
		try{
			const context = (
				{
					"hello": (
						"world"
					)
				}
			);

			const option = (
				Option(
					(
						context
					)
				)
				.option
			);

			option
			.detourOption(
				(
					"hello"
				),

				(
					"hi"
				)
			);

			(
					option
					.hello
				=	(
						"mundo"
					)
			);

			const actualValue = (
					(
							option
							.hello
						===	"world"
					)

				&&	(
							context
							.hello
						===	"world"
					)

				&&	(
							option
							.hi
						===	"mundo"
					)

				&&	(
							context
							.hi
						===	"mundo"
					)
			);

			const testValue = (
				true
			);

			strictAssert
			.equal(
				(
					actualValue
				),

				(
					testValue
				),

				(
					[
						"#test-basic-detour-option;",

						"test basic detour option;",

						`must assert to, ${ testValue }`
					]
				)
			);

			return	(
						true
					);
		}
		catch( error ){
			console
			.error(
				(
					error
				)
			);

			return	(
						false
					);
		}
	}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test option instance"
								),

								"result": (
									TEST_OPTION_INSTANCE( )
								)
							},

							{
								"test": (
									"test set get option on undefined context"
								),

								"result": (
									TEST_SET_GET_OPTION_ON_UNDEFINED_CONTEXT( )
								)
							},

							{
								"test": (
									"test set get option with context"
								),

								"result": (
									TEST_SET_GET_OPTION_WITH_CONTEXT( )
								)
							},

							{
								"test": (
									"test basic format option"
								),

								"result": (
									TEST_BASIC_FORMAT_OPTION( )
								)
							},

							{
								"test": (
									"test consume format option"
								),

								"result": (
									TEST_CONSUME_FORMAT_OPTION( )
								)
							},

							{
								"test": (
									"test basic resolve option"
								),

								"result": (
									TEST_BASIC_RESOLVE_OPTION( )
								)
							},

							{
								"test": (
									"test consume resolve option"
								),

								"result": (
									TEST_CONSUME_RESOLVE_OPTION( )
								)
							},

							{
								"test": (
									"test basic transform option"
								),

								"result": (
									TEST_BASIC_TRANSFORM_OPTION( )
								)
							},

							{
								"test": (
									"test basic transfer option"
								),

								"result": (
									TEST_BASIC_TRANSFER_OPTION( )
								)
							},

							{
								"test": (
									"test basic detour option"
								),

								"result": (
									TEST_BASIC_DETOUR_OPTION( )
								)
							}
						]
					)
				);

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
