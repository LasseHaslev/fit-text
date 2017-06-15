export default class FitText {

    constructor( element, options ) {

        this.defaults = {
            compressor: 1,
            minFontSize: Number.NEGATIVE_INFINITY,
            maxFontSize: Number.POSITIVE_INFINITY,
            multiline: false,
            watch: true,
            widthMargin: 0,
            unit: 'vw',
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

        var width = this.element.parentNode.getBoundingClientRect().width;
        width *= 1 - this.options.widthMargin;

        // console.log(this.element.getBoundingClientRect().width);
        // this.element.style.fontSize = Math.max(Math.min(width / (this.options.compressor*10), parseFloat(this.options.maxFontSize)), parseFloat(this.options.minFontSize)) + this.options.unit;

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
        // console.log( this.element.getBoundingClientRect().width );

        var increaseValue = this.options.compressor / 10,
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

            // console.log( [ element.getBoundingClientRect().width, lastWidth ] );
            if ( element.getBoundingClientRect().width < lastWidth || element.getBoundingClientRect().width >= targetWidth ) {
                element.style.fontSize = lastValue + this.options.unit;

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
            window.addEventListener( 'resize', this.resize.bind( this ) );
            window.addEventListener( 'load', this.resize.bind( this ) );
            window.addEventListener( 'orientationchange', this.resize.bind( this ) );
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

//# sourceMappingURL=FitText.js.map
