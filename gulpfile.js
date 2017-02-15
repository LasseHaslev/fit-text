const elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application as well as publishing vendor resources.
 |
 */



elixir.config.assetsPath = 'src';
elixir.config.publicPath = 'dist';

elixir((mix) => {
    mix.webpack('app.js')
    .scripts('src/FitText.js', 'dist/FitText.js', './', {
        module: {
            loaders: [
                { test: /\.js$/, loader: 'buble' }
            ]
        }
    });
});
