var getElementWidth = function( element ) {
    var cs = getComputedStyle(element);

    var paddingX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    // var paddingY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingButtom);

    var borderX = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
    // var borderY = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);

    // Element width and height minus padding and border
    var elementWidth = element.offsetWidth - paddingX - borderX;
    // elementHeight = element.offsetHeight - paddingY - borderY;
    return elementWidth;
};
export default class FitText {

    constructor( element, options ) {

        this.defaults = {
            compressor: .1,
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY,
            multiline: false,
            watch: true,
            widthMargin: 0,
            unit: 'em',
            debugColor: null,
        };

        this.element = element;

        this.options = this.defaults;

        // Create options by extending defaults with the passed in arugments
        if (options && typeof options === "object") {
            this.options = this.extendDefaults(this.defaults, options);
        }

        // Call once to set.
        this.resize();

        // // Set the events
        this.setEvents();
    };

    // Resizer() resizes items based on the object width divided by the compressor * 10
    resize() {
        if ( this.options.multiline ) {
            this.resizeChildren();
            return;
        }

        var width = getElementWidth( this.element.parentNode );
        width *= 1 - this.options.widthMargin;

        this.fontsizeToWidth.call( this, this.element, width );
    };

    resizeChildren() {
        var width = this.element.clientWidth;
        var children = this.element.children;

        for (var i = 0, len = children.length; i < len; i++) {
            this.fontsizeToWidth( children[i], width );
        }
    }

    fontsizeToWidth( element, targetWidth ) {

        if (this.options.debugColor) {
            element.style.backgroundColor = this.options.debugColor;
        }

        // Prevent it from having the full screen
        element.style.display = 'inline';

        // prevent linebreak
        element.style.whiteSpace = 'nowrap';

        // Set fontsize
        // console.log( this.element.getBoundingClientRect().width );

        var increaseValue = this.options.compressor,
            newValue = increaseValue,
            lastValue = newValue;

        element.style.fontSize = increaseValue + this.options.unit;
        // Todo cache get bounding client rect
        var lastWidth = element.getBoundingClientRect().width;

        while ( element.getBoundingClientRect().width < targetWidth ) {
            lastValue = newValue;
            newValue += increaseValue;

            lastWidth = element.getBoundingClientRect().width;

            element.style.fontSize = newValue + this.options.unit;

            // Old one, but had trouble with first check
            // if ( element.getBoundingClientRect().width < lastWidth || element.getBoundingClientRect().width >= targetWidth ) {
            if ( element.getBoundingClientRect().width >= targetWidth ) {
                element.style.fontSize = lastValue + this.options.unit;

                // set full width 
                if (!this.options.debugColor) {
                    element.style.display = 'block';
                }
                element.style.textAlign = 'center';
                // element.style.whiteSpace = '';

                break;
            }

            // break;
        }

    };

    // Set events
    setEvents() {
        if (this.options.watch) {
            window.addEventListener( 'resize', this.resize.bind( this ) );
            window.addEventListener( 'orientationchange', this.resize.bind( this ) );
        }
        window.addEventListener( 'load', this.resize.bind( this ) );
    };

    // // Utility method to extend defaults with user options
    extendDefaults(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    };

}
