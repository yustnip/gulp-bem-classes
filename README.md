# gulp-bem-classes

[![npm](https://img.shields.io/npm/dt/gulp-bem-classes.svg)](https://www.npmjs.com/package/gulp-bem-classes)
[![npm](https://img.shields.io/npm/v/gulp-bem-classes.svg)](https://www.npmjs.com/package/gulp-bem-classes)

It finds and replaces strings like `bClass="b('block')('element')"` to regular HTML classes. Used the [bem-cn](https://github.com/albburtsev/bem-cn) formatter inside.

## Usage

### Install

`yarn add gulp-bem-classes --dev`

or

`npm i gulp-bem-classes -D`

### All in one mode

1. Connect the plugin inside gulpfile.js:

  ```js
  var bemClasses = require( 'gulp-bem-classes' )

  gulp.task( 'templates', function() {
    return gulp.src( './templates/*.html' )
      .pipe( bemClasses() )
      .pipe( gulp.dest( './dist' ) )
  } )
  ```

2. Use b_ inside your templates:

  ```html
  <div bClass="b('block')">
    <div bClass="b('block')('element')">Element</div>
    <div bClass="b('block')('element', {size: 'small'})">Small element</div>
  </div>
  ```

  It will be formatted to:

  ```html
  <div class="block">
    <div class="block__element">Element</div>
    <div class="block__element block__element_size_small">Small element</div>
  </div>
  ```

### Block per file mode

Example with the [gulp-file-include](https://github.com/coderhaoxin/gulp-file-include) package.

1. Connect the plugin inside gulpfile.js:

  ```js
  var bemClasses = require( 'gulp-bem-classes' ),
      fileInclude = require( 'gulp-file-include' )

  gulp.task( 'blocks', function() {
    return gulp.src( './templates/blocks/*.html' )
      .pipe( bemClasses( { blockPerFile: true } ) )
      .pipe( gulp.dest('./templates/blocks/generated') )
  } )

  gulp.task( 'templates', function() {
    return gulp.src( './templates/*.html' )
      .pipe( fileInclude( {
        prefix: '@@',
        basepath: './templates/blocks/generated',
        indent: true
      } ) )
      .pipe( bemClasses() )
      .pipe( gulp.dest('./') )
  } )
  ```

2. Use b_ inside your templates (comments are not required):

  ```html
  <!-- included-block.html -->
  <div bRootClass="b('included-block')">
    <div bClass="b('element')">Element</div>
    <div bClass="b('element', {size: 'small'})">Small element</div>
  </div>

  <!-- index.html -->
  <div>
    @@include('included-block.html')
    <div bClass="b('block')({visible: true})">Another element</div>
  </div>
  ```

  It will be formatted to:

  ```html
  <div>
    <div class="included-block">
      <div class="included-block__element">Element</div>
      <div class="included-block__element included-block__element_size_small">Small element</div>
    </div>
    <div class="block block_visible">Another element</div>
  </div>
  ```

More info about the bem-cn syntax you can find in the package [repo](https://github.com/albburtsev/bem-cn).
