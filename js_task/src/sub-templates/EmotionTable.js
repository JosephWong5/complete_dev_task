import React from 'react';
import emotionData from '../data/data.json';
import '../index.css';

function BarGroup(props) {
  let barPadding = 2;
  let widthScale = d => d * 10;
  let width = widthScale(props.d.Frequency);
  let yMid = props.barHeight * 0.5;

  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.Emotions}</text>
    <rect y={barPadding * 0.5} width={width + 10} height={props.barHeight - barPadding} fill={getBarColour(props.d.Frequency)} />
    <text className="value-label font-bold" x={width + 2} y={yMid} alignmentBaseline="middle" >{props.d.Frequency}</text>
  </g>
}

function getBarColour(frequency) {
  let barColour = "";
  if (frequency >= 150) {
    barColour = "red";
  }
  else if (frequency < 150 && frequency >= 100) {
    barColour = "orange";
  }
  else if (frequency < 100 && frequency >= 50) {
    barColour = "#f1ce0b";
  }
  else if (frequency < 50) {
    barColour = "green";
  }
  return barColour;
}

export default class EmotionTable extends React.Component {
  state = {
    data: emotionData
  }

  render() {
    let barHeight = 30;
    let chartHeight = 0;
    let chartWidth = 0;
    let barGroups = this.state.data.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
      <BarGroup d={d} barHeight={barHeight} />
    </g>)

    let emotionsSize = this.state.data.filter(data => data.Emotions)
    chartHeight = emotionsSize.length * 30.25;

    let highestFreq = this.state.data.reduce((d, i) => d = d > i.Frequency ? d : i.Frequency, 0);
    chartWidth = highestFreq * 11;

    return <svg width={chartWidth} height={chartHeight} >
      <g className="container">
        <text className="title font-bold text-2xl" x="10" y="30">Emotion Frequency Bar Chart</text>
        <g className="chart" transform="translate(150,60)">
          {barGroups}
        </g>
      </g>
    </svg>
  }
}
