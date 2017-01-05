import React from 'react';

export default class Plot extends React.Component {
  constructor(props){
      super(props);
  }

  drawPlot() {
    Plotly.newPlot(this.props.plot_id, 
    this.props.data, 
    this.props.layout, 
    {
      displayModeBar: false
    });
  }

  componentDidMount() {
    this.drawPlot();
  }

  componentDidUpdate() {
    this.drawPlot();
  }

  render() {
    return (
      <div id={this.props.plot_id} style = {{width: '50%', height: '50%'}}></div>
    );
  }

}