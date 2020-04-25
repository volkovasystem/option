"use strict";

const assert = require( "assert" );

const strictAssert = assert.strict;

const Option = require( "./option.js" );

(
	function( ){
		strictAssert
		.equal(
			(
							Option( )
				instanceof	Option
			),

			true,

			"Option function call must return an instance of Option."
		);
	}
)( );
