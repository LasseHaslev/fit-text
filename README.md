# @lassehaslev/fit-text

> Resizes text to fit width of parent

## Install

Run ```npm install @lassehaslev/fit-text --save``` in your project folder.

## Usage

```js
import FitText from '@lassehaslev/fit-text';
var element = document.querySelector( '.fittext-multiline' );

// Use default options
new FitText( element );

// Overwrite defaults
new FitText( element, {
    compressor: .1,
    minFontSize: Number.NEGATIVE_INFINITY,
    maxFontSize: Number.POSITIVE_INFINITY,
    multiline: false,
    watch: true,
    widthMargin: 0,
    unit: 'em',
    debugColor: null, // Only for debuging
} );
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload
npm run dev
```
