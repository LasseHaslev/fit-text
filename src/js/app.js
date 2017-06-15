import FitText from '../FitText';

var elements = document.querySelectorAll( '.fittext' );
for (var i = 0, len = elements.length; i < len; i++) {
    window.test = new FitText( elements[i], {
        // debugColor: 'orange',
        compressor: .1,
    } );
}

// new FitText( '.find-me' );

var element = document.querySelector( '.fittext-multiline' );
if (element) {
    window.test = new FitText( element, { multiline: true } );
}
