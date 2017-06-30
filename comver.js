/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

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

	@module-configuration:
		{
			"package": "comver",
			"path": "comver/comver.js",
			"file": "comver.js",
			"module": "comver",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"repository": "https://github.com/volkovasystems/comver.git",
			"test": "comver-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Get version of specific command module.
	@end-module-documentation

	@include:
		{
			"comex": "comex",
			"condev": "condev",
			"depher": "depher",
			"diatom": "diatom",
			"falzy": "falzy",
			"pedon": "pedon",
			"protype": "protype",
			"raze": "raze",
			"wichevr": "wichevr",
			"zelf": "zelf"
		}
	@end-include
*/

const comex = require( "comex" );
const condev = require( "condev" );
const depher = require( "depher" );
const diatom = require( "diatom" );
const falzy = require( "falzy" );
const pedon = require( "pedon" );
const protype = require( "protype" );
const raze = require( "raze" );
const wichevr = require( "wichevr" );
const zelf = require( "zelf" );

const PARAMETER_VERSION = "--version";
const TOKEN_MATCH = "v";
const VERSION_PATTERN = /(\d+?\.)+\d+?/;

const CommandVersion = diatom( "CommandVersion" );

CommandVersion.prototype.initialize = function initialize( module ){
	/*;
		@meta-configuration:
			{
				"module:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( module ) || !protype( module, STRING ) ){
		throw new Error( "invalid module" );
	}

	this.context( );

	this.module = module;

	this.parameterVersion = PARAMETER_VERSION;
	this.tokenMatch = TOKEN_MATCH;
	this.versionPattern = VERSION_PATTERN;

	return this;
};

CommandVersion.prototype.context = function context( self ){
	/*;
		@meta-configuration:
			{
				"self:required": "*"
			}
		@end-meta-configuration
	*/

	this.self = zelf( self );

	return this;
};

CommandVersion.prototype.parameter = function parameter( version ){
	/*;
		@meta-configuration:
			{
				"version:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( version ) || !protype( version, STRING ) ){
		throw new Error( "invalid version" );
	}

	this.parameterVersion = wichevr( version, PARAMETER_VERSION );

	return this;
};

CommandVersion.prototype.token = function token( match ){
	/*;
		@meta-configuration:
			{
				"match:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( match ) || !protype( match, STRING ) ){
		throw new Error( "invalid match" );
	}

	this.tokenMatch = wichevr( math, TOKEN_MATCH );

	return this;
};

CommandVersion.prototype.match = function match( pattern ){
	/*;
		@meta-configuration:
			{
				"pattern:required": [
					"string",
					RegExp
				]
			}
		@end-meta-configuration
	*/

	if( falzy( pattern ) || !condev( pattern, [ STRING, RegExp ] ) ){
		throw new Error( "invalid pattern" );
	}

	this.versionPattern = wichevr( pattern, VERSION_PATTERN );

	return this;
};

CommandVersion.prototype.execute = function execute( synchronous, option ){
	/*;
		@meta-configuration:
			{
				"synchronous": "boolean",
				"option": "object"
			}
		@end-meta-configuration
	*/

	let parameter = raze( arguments );

	synchronous = depher( parameter, BOOLEAN, false );

	option = depher( parameter, OBJECT, { } );

	let versionPattern = this.versionPattern.toString( ).replace( /^\/|\/$/g, "" );

	var command = null;
	if( pedon.LINUX || pedon.OSX ){
		command = comex.bind( this.self )( `${ this.module } ${ this.parameterVersion }` )
			.pipe( `grep -Po '(${ this.tokenMatch })?${ versionPattern }'` )
			.pipe( `grep -Po '${ versionPattern }'` );

	}else if( pedon.WINDOWS ){
		//: @todo: Please implement this!
		throw new Error( "platform not currently supported" );

	}else{
		throw new Error( "cannot determine platform, platform not supported" );
	}

	if( synchronous ){
		try{
			return command.execute( true, option );

		}catch( error ){
			throw new Error( `cannot get module version, ${ error.stack }` );
		}

	}else{
		let catcher = command.execute( option )
			.then( function done( error, version ){
				if( error instanceof Error ){
					return catcher.pass( new Error( `cannot get module version, ${ error.stack }` ), "" );

				}else{
					return catcher.pass( null, version );
				}
			} );

		return catcher;
	}
};

const comver = function comver( module ){
	/*;
		@meta-configuration:
			{
				"module:required": "string"
			}
		@end-meta-configuration
	*/

	if( falzy( module ) || !protype( module, STRING ) ){
		throw new Error( "invalid module" );
	}

	return CommandVersion.call( null, module ).context( zelf( this ) );
};

module.exports = comver;
