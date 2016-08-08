
/*
 * 
 */

var qureWatch = require('../index');


qureWatch.init( __dirname +'/../README.md', function(r) {
	console.log(r);
} );

/*
describe('Simple test', function() {

	// 
	// Simple testing of the methods 'wait'
	// 
	it('should work fine', function(done) {
		
		qureWatch( __dirname +'../README.md' );

		done();
		
	});

});
*/
