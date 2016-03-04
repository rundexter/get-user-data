var _ = require( 'lodash' );

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var keys = step.input( 'key' ).toArray();
        var vals = step.input( 'value' ).toArray();
        var defs = step.input( 'default' ).toArray();

        var results = [ ];

        _.zipWith( keys, vals, defs, function( k, v, d ) { return { key: k, value: v, 'default': d } } ).forEach( function( item ) {
            results.push( this.storage.user( item.key, item.value, item.default ) );
        }.bind( this ) );

        this.complete( results );
    }
};
