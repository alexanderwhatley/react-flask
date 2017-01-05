import React from 'react';
import Plot from './Plot';

const trace1 = {
  x: ["2016/1/19", "2016/1/20"],
  y: [1, 2],
  type: 'scatter',
  xaxis: 'x1',
  yaxis: 'y1'
};

const trace2 = {
  x: [1, 2],
  y: [1, 2],
  type: 'scatter',
  xaxis: 'x2',
  yaxis: 'y2'
};

const trace2_1 = {
  x: [1, 3],
  y: [5, 6],
  type: 'scatter',
  xaxis: 'x2',
  yaxis: 'y2'
};


const trace3 = {
  x: [1, 2],
  y: [1, 2],
  type: 'scatter',
  xaxis: 'x3',
  yaxis: 'y3'
};

const trace4 = {
  x: [1, 2],
  y: [1, 2],
  type: 'scatter',
  xaxis: 'x4',
  yaxis: 'y4'
};

const data = [trace1, trace2, trace2_1, trace3, trace4];

const subplots_layout = {
  xaxis: {
  	domain: [0, 0.45]
  },
  yaxis: {domain: [0, 0.45]},
  xaxis4: {
    domain: [0.55, 1],
    anchor: 'y4'
  },
  xaxis3: {
    domain: [0, 0.45],
    anchor: 'y3'
  },
  xaxis2: {domain: [0.55, 1]},
  yaxis2: {
    domain: [0, 0.45],
    anchor: 'x2'
  },
  yaxis3: {domain: [0.55, 1]},
  yaxis4: {
    domain: [0.55, 1],
    anchor: 'x4'
  }
};


var Hello = React.createClass({
  render() {
    return (
    	<div>
	    	<div>
		    	<h1>{ MY_VAR }</h1>
		    	<Plot
		    	data = {number_sales_per_month["graph"]}
		    	layout = {subplots_layout}
		    	plot_id = {"Plot1"}
		    	/>
		    </div>
		    <div>
		    	<h2>Hi!</h2>
		    	<Plot 
		    	data = {cur_expt_sales["graph"]}
		    	layout = {subplots_layout}
		    	plot_id = {"Plot2"}
		    	/>
		    </div>
    	</div>
    	);

  }
});

export default Hello;

