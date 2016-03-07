var _ = require( 'lodash' );
var q = require( 'q' );

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var keys = step.input( 'key' ).toArray();
        var defs = step.input( 'default' ).toArray();

        var self = this;

        var results = [ ];
        _.zipWith( keys, defs, function( k, d ) { return { key: k, def: d } })
            .forEach( function( item ) {
                results.push( self.storage.user( item.key, item.def ) );
            } );

        q.all( results )
            .then( function( res ) { return self.complete( res ) } )
            .fail( function( err ) { return self.fail( err ) } );

    }
};
