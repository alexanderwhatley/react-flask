import React from 'react';

var Plot2 = React.createClass({
  render() {
    return (
    	<div>
			Plotly.plot('tester', [{
				x: [1, 2, 3, 4, 5],
				y: [1, 2, 4, 8, 16] }], {
				margin: { t: 0 } } );
    	</div>
    	);

  }
});

export default Plot2;

