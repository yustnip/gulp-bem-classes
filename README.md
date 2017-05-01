# gulp-bem-classes

It finds and replaces strings like `bemClass="b( 'block', 'element' )"` to regular HTML classes. Used [b_](https://github.com/azproduction/b_) formatter inside.

## Usage

1. Install:

  `yarn add gulp-bem-classes --dev`

  or

  `npm i gulp-bem-classes -D`

2. Connect the plugin inside gulpfile.js:

  ```js
  var bemClasses = require( 'gulp-bem-classes' )

  gulp.task( 'templates', function() {
      return gulp.src( './templates/*.html' )
          .pipe( bemClasses() )
          .pipe( gulp.dest( './dist' ) )
  } )
  ```

3. Use b_ inside your templates:

```html
<div bemClass="b( 'block' )">
    <div bemClass="b( 'block', 'element' )">Element</div>
    <div bemClass="b( 'block', 'element', { size: 'small' } )">Small element</div>
</div>
```

It will be formatted to:

```html
<div class="block">
    <div class="block__element">Element</div>
    <div class="block__element block__element_size_small">Small element</div>
</div>
```

More info you can find in the [b_](https://github.com/azproduction/b_) repo.