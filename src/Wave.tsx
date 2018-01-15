import * as React from 'react';
import './Wave.css';

interface Props {
  width: number;
  height: number;
}

interface Point {
  x: number;
  y: number;
}

class Wave extends React.Component<Props> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.tick();
  }

  public render() {
    return (
      <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" className="WaveSVG">
        <path className="Wave" d={this.state.d} fill="#fff"/>
      </svg>
    );
  }

  public state = {
    waveWidth: this.props.width, // Wave SVG width (usually container width)
    waveHeight: 100, // Position from the top of container
    waveDelta: 20, // Wave amplitude
    speed: 1.1, // Wave animation speed
    wavePoints: 3, // How many points will be used to compute our wave
    points: [],
    d: '',
  };

  private lastUpdate: number = 0;
  private totalTime: number = 0;

  private calculateWavePoints(factor: number) {
      var points = [];
    
      const { 
        wavePoints,
        waveDelta,
        waveHeight,
        speed,
      } = this.state;

      const waveWidth = this.props.width;

    for (let i = 0; i <= wavePoints; i++) {
      const xPos: number = (i / wavePoints) * waveWidth;
      const sinSeed: number = (factor + (i + i % wavePoints)) * speed * 100;
      const sinHeight: number = Math.sin(sinSeed / 100) * waveDelta;
      const yPos: number = Math.sin(sinSeed / 100) * sinHeight + waveHeight;

      points.push({
        x: xPos,
        y: yPos,
      });
    }

    return points;
  }

  private buildPath(points: Array<Point>) {
    const { 
      width,
      height,
    } = this.props; 

    if (width < 1) {
      return '';
    }

    let SVGString = 'M ' + points[0].x + ' ' + points[0].y;
  
    const cp0 = {
      x: (points[1].x - points[0].x) / 2,
      y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
    };
  
    SVGString += ' C ' + cp0.x + 
      ' ' + cp0.y + 
      ' ' + cp0.x + 
      ' ' + cp0.y + 
      ' ' + points[1].x + 
      ' ' + points[1].y;
  
    let prevCp = cp0;
    let inverted = -1;
  
    for (let i = 1; i < points.length - 1; i++) {
      // const cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
      const cp1 = {
        x: (points[i].x - prevCp.x) + points[i].x,
        y: (points[i].y - prevCp.y) + points[i].y
      };
  
      SVGString += ' C ' + cp1.x + 
        ' ' + cp1.y + 
        ' ' + cp1.x + 
        ' ' + cp1.y + 
        ' ' + points[i + 1].x + 
        ' ' + points[i + 1].y;

      prevCp = cp1;
      inverted = -inverted;
    }

    SVGString += ' L ' + width + ' ' + height;
    SVGString += ' L 0 ' + height + ' Z';

    return SVGString;
  }

  private tick() {
    const now = Date.now();
  
    if (this.lastUpdate) {
      const elapsed = (now - this.lastUpdate) / 1000;
      this.lastUpdate = now;
  
      this.totalTime += elapsed;
      
      const factor = this.totalTime * Math.PI;

      // console.log(this.calculateWavePoints(factor));

      // console.log(this.buildPath(this.calculateWavePoints(factor)));

      this.setState({
        d: this.buildPath(this.calculateWavePoints(factor))
      });

    } else {
      this.lastUpdate = now;
      this.tick();
    }
    window.requestAnimationFrame(this.tick.bind(this));
  }
}

export default Wave;

// var container = document.body;
// var width = container.offsetWidth;
// var height = container.offsetHeight;
// var wave = document.getElementById('wave');

// var waveWidth = container.offsetWidth;  // Wave SVG width (usually container width)
// var waveHeight = 400;                   // Position from the top of container
// var waveDelta = 20;                     // Wave amplitude
// var speed = 1.1;                        // Wave animation speed
// var wavePoints = 6;                     // How many point will be used to compute our wave

// var points = [];

// function calculateWavePoints(factor) {
//   var points = [];
  
//   for (var i = 0; i <= wavePoints; i++) {
//     var x = i/wavePoints * waveWidth;
//     var sinSeed = (factor + (i + i % wavePoints)) * speed * 100;
//     var sinHeight = Math.sin(sinSeed / 100) * waveDelta;
//     var yPos = Math.sin(sinSeed / 100) * sinHeight  + waveHeight;
//     points.push({x: x, y: yPos});
//   }

//   return points;
// }

// function buildPath(points) {
//   var SVGString = 'M ' + points[0].x + ' ' + points[0].y;

//   var cp0 = {
//     x: (points[1].x - points[0].x) / 2,
//     y: (points[1].y - points[0].y) + points[0].y + (points[1].y - points[0].y)
//   };

//   SVGString += ' C ' + cp0.x + ' ' + cp0.y + ' ' + cp0.x + ' ' + cp0.y + ' ' + points[1].x + ' ' + points[1].y;

//   var prevCp = cp0;
//   var inverted = -1;

//   for (var i = 1; i < points.length-1; i++) {
//     var cpLength = Math.sqrt(prevCp.x * prevCp.x + prevCp.y * prevCp.y);
//     var cp1 = {
//       x: (points[i].x - prevCp.x) + points[i].x,
//       y: (points[i].y - prevCp.y) + points[i].y
//     };

//     SVGString += ' C ' + cp1.x + ' ' + cp1.y + ' ' + cp1.x + ' ' + cp1.y + ' ' + points[i+1].x + ' ' + points[i+1].y;
//     prevCp = cp1;
//     inverted = -inverted;
//   };

//   SVGString += ' L ' + width + ' ' + height;
//   SVGString += ' L 0 ' + height + ' Z';
//   return SVGString;
// }

// function tick() {
//   var now = window.Date.now();

//   if (lastUpdate) {
//     var elapsed = (now-lastUpdate) / 1000;
//     lastUpdate = now;

//     totalTime += elapsed;
    
//     var factor = totalTime*Math.PI;
//     wave.setAttribute('d', buildPath(calculateWavePoints(factor)));
//   } else {
//     lastUpdate = now;
//   }
  
//   window.requestAnimationFrame(tick);
// };
// tick();
