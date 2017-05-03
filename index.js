'use strict';

const gutil = require( 'gulp-util' );
const through = require( 'through2' );
let b = require( 'bem-cn' );

module.exports = ( options ) => {

  let isBlockPerFile = false;

  if( options ) {
    isBlockPerFile = options.blockPerFile;
  }

  function blockPerFile( data, bRootClassExp, bClassExp ) {
    const withRootClass = data.replace( bRootClassExp, function( str, p1 ) {
      const handledBemClass = eval( p1 );

      // Save the block for the next replacing
      b = eval( p1 );

      return 'class=\"' + handledBemClass + '\"';
    } );

    const result = withRootClass.replace( bClassExp, function( str, p1 ) {
      const handledBemClass = eval( p1 );
      return 'class=\"' + handledBemClass + '\"';
    } );

    // Get back the initial b value
    b = require( 'bem-cn' );

    return result;
  }

  function allInOne( data, bClassExp ) {
    const result = data.replace( bClassExp, function( str, p1 ) {
      const handledBemClass = eval( p1 );
      return 'class=\"' + handledBemClass + '\"';
    } );

    return result;
  }

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
      let result = data;

      const bRootClassExp = /bRootClass\=\"(.*?)\"/ig;
      const bClassExp = /bClass\=\"(.*?)\"/ig;

      if ( isBlockPerFile ) {
        result = blockPerFile( data, bRootClassExp, bClassExp );
      } else {
        result = allInOne( data, bClassExp );
      }

      file.contents = new Buffer( result );
      this.push( file );
    } catch ( err ) {
      this.emit( 'error', new gutil.PluginError('gulp-bem-classes', err ) );
    }

    cb();
  } );
};