
const assert = require( "assert" );
const comver = require( "./comver.js" );
const truly = require( "truly" );
const filled = require( "filled" );

assert.equal( truly( comver( "mongod" ).execute( true ) ), true, "should be true" );

assert.equal( truly( comver( "node" ).execute( true ) ), true, "should be true" );

comver( "npm" ).execute( )( function done( error, result ){
	assert.equal( filled( Array.from( arguments ) ), true, "should be true" );
} );

console.log( "ok" );
