export default class FitText {

    constructor( element, options ) {

        this.defaults = {
            compressor: 1,
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY,
            multiline: false,
            watch: true,
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
    }

    // Resizer() resizes items based on the object width divided by the compressor * 10
    resize() {
        if ( this.options.multiline ) {
            this.resizeChildren();
            return;
        }

        // this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
        var width = this.element.parentNode.clientWidth;

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

        // Prevent it from having the full screen
        element.style.display = 'inline';
        // Set fontsize
        // console.log( this.element.offsetWidth );

        var increaseValue = this.options.compressor / 10,
            newValue = increaseValue,
            lastValue = newValue;

        element.style.fontSize = increaseValue + 'em';
        var lastWidth = element.offsetWidth;

        while ( element.offsetWidth < targetWidth ) {
            lastValue = newValue;
            newValue += increaseValue;

            lastWidth = element.offsetWidth;

            element.style.fontSize = newValue + 'em';

            // console.log( [ element.offsetWidth, lastWidth ] );
            if ( element.offsetWidth < lastWidth || element.offsetWidth >= targetWidth ) {
                element.style.fontSize = lastValue + 'em';

                // set full width 
                element.style.display = 'block';
                element.style.textAlign = 'center';

                break;
            }

            // break;
        }

    };

    // Set events
    setEvents() {
        if (this.options.watch) {
            var self = this;
            var onEvent = function() {
                self.resize();
            };

            window.addEventListener( 'resize', onEvent );
            window.addEventListener( 'load', onEvent );
        }
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
