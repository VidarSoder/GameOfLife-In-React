import React from "react";
import ReactDOM from "react-dom";
import Map from "./Map.js";
import WeatherImage from "./weather";
import "./index.css";

let stat = [1];
let stat2 = [2];
let stat3 = [3];

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      initGrid: Array(30).fill(Array(30).fill(false)),
      generations: 0,
      gameInterval: "",
      gameOver: 0
    };
  }

  randomizeGrid = () => {
    let gridCopy = JSON.parse(JSON.stringify(this.state.initGrid));
    let gridCopy2 = this.state.initGrid;
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        if (Math.floor(Math.random() * 4) + 1 === 1) {
          gridCopy[i][j] = true;
          gridCopy2[i][j] = true;
        } else {
          gridCopy[i][j] = false;
          gridCopy2[i][j] = false;
        }
      }
    }
    this.setState({
      initGrid: gridCopy
    });
  };

  clear = () => {
    this.setState({
      initGrid: Array(30).fill(Array(30).fill(false)),
      generations: 0,
      gameInterval: clearInterval(this.state.gameInterval, 100),
      gameOver: 0
    });
  };

  select = e => {
    let classList = e.target.classList;
    let copy = JSON.parse(JSON.stringify(this.state.initGrid));
    copy[classList[1]][classList[2]] = true;
    this.setState({
      initGrid: copy
    });
  };

  playIteration = () => {
    this.setState({
      gameInterval: setInterval(this.startGame)
    });
  };
  startGame = () => {
    let t = JSON.parse(JSON.stringify(this.state.initGrid));
    let t2 = JSON.parse(JSON.stringify(this.state.initGrid));
    let tempArr = [];
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 30; j++) {
        let c = 0;
        let v = t[i][j];
        if (i === 0)
          tempArr.push(
            t[i][j - 1],
            t[i][j + 1],
            t[i + 1][j],
            t[i + 1][j + 1],
            t[i + 1][j - 1]
          );
        else if (i === 29)
          tempArr.push(
            t[i][j - 1],
            t[i][j + 1],
            t[i - 1][j],
            t[i - 1][j + 1],
            t[i - 1][j - 1]
          );
        else
          tempArr.push(
            t[i][j - 1],
            t[i][j + 1],
            t[i + 1][j],
            t[i + 1][j - 1],
            t[i + 1][j + 1],
            t[i - 1][j - 1],
            t[i - 1][j],
            t[i - 1][j + 1]
          );

        let superArr = tempArr.filter(e => {
          return e !== undefined;
        });
        for (let k = 0; k < superArr.length; k++) {
          c += superArr[k];
        }
        superArr = [];
        tempArr = [];
        if (v) {
          if (c === 2 || c === 3) t2[i][j] = true;
          else t2[i][j] = false;
        } else {
          if (c === 3) t2[i][j] = true;
          else t2[i][j] = false;
        }
      }
    }

    if (this.state.gameOver === 0) stat = JSON.parse(JSON.stringify(t2));
    if (this.state.gameOver === 1) stat2 = JSON.parse(JSON.stringify(t2));
    if (this.state.gameOver === 2) stat3 = JSON.parse(JSON.stringify(t2));
    if (this.state.gameOver === 3) {
      if (
        JSON.stringify(stat) === JSON.stringify(t2) ||
        JSON.stringify(stat2) === JSON.stringify(t2) ||
        JSON.stringify(stat3) === JSON.stringify(t2)
      ) {
        this.setState({
          gameInterval: clearInterval(this.state.gameInterval, 1)
        });
      } else {
        this.setState({
          gameOver: 0
        });
      }
    }

    this.setState({
      initGrid: t2,
      generations: this.state.generations + 1,
      gameOver: this.state.gameOver + 1
    });
  };

  render() {
    return (
      <div className="box-wrapper">
        <div className="Box">
          <h1>Salt - Game Of Life</h1>
          <WeatherImage />
          <Map initGrid={this.state.initGrid} select={this.select} />
          <div className="btn">
            <div className="btn-wrapper">
              <button onClick={this.randomizeGrid}> Randomzie</button>
              <button onClick={this.clear}> clear</button>
              <button onClick={this.playIteration}> Play</button>
            </div>
          </div>

          <p>Generations: {this.state.generations}</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
