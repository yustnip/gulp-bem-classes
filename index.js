'use strict';

const gutil = require( 'gulp-util' );
const through = require( 'through2' );
const b = require( 'b_' );

module.exports = ( options ) => {

  return through.obj( function( file, enc, cb ) {
    if ( file.isNull() ) {
      cb( null, file );
      return;
    }

    if ( file.isStream() ) {
      cb( new gutil.PluginError('gulp-bem-classes', 'Streaming not supported') );
      return;
    }

    try {
      const data = file.contents.toString();
      const exp = /bemClass\=\"(.*?)\"/ig;

      const result = data.replace( exp, function( str, p1 ) {
        const handledBemClass = eval( p1 );
        return 'class=\"' + handledBemClass + '\"';
      } );
      
      file.contents = new Buffer( result );
      this.push( file );
    } catch ( err ) {
      this.emit( 'error', new gutil.PluginError('gulp-bem-classes', err ) );
    }

    cb();
  } );
};