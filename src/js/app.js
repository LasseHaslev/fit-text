import FitText from '../FitText';

var elements = document.querySelectorAll( '.fittext' );
for (var i = 0, len = elements.length; i < len; i++) {
    window.test = new FitText( elements[i] );
}

// new FitText( '.find-me' );

var element = document.querySelector( '.fittext-multiline' );
window.test = new FitText( element, { multiline: true } );
