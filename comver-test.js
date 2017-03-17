
const comver = require( "./comver.js" );

console.log( comver( "mongod" ).execute( true ) );

console.log( comver( "node" ).execute( true ) );

comver( "npm" ).execute( )( function done( error, result ){
	console.log( arguments );
} );
