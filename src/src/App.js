import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Tile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: this.props.value
        }

        this.updateValue = this.updateValue.bind(this)
    }

    updateValue(e) {
        console.log('You put in a ' + e.target.value)
        this.setState({value: e.target.value})
        let url = 'http://localhost:8000/api/v1/moves/'
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                game: 4,
                x: this.props.x,
                y: this.props.y,
                value: parseInt(e.target.value)
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    render() {
        return (
            <div className="tile">
                <input type="text" value={this.props.value} onChange={this.updateValue}></input>
            </div>
        );
    }
}

class Board extends Component {
    constructor(props) {
        super(props)

        this.state = {
            tiles: null,
        }


    }

    componentDidMount() {
        let url = 'http://localhost:8000/api/v1/games/4/'
        fetch(url)
            .then((resp) => resp.json())
            .then(data => {
                this.setState({tiles: data})
            })
    }

    renderTile(x, y, value) {
        return <Tile key={x + '' + y} x={x} y={y} value={value}/>;
    }

    render() {
        console.log('Rendering board')
        let board = []
        for (let i = 0; i < 9; i++) {
            let row = []
            for (let j = 0; j < 9; j++) {
                let value = null
                if (this.state.tiles !== null) {
                    value = this.state.tiles[i][j]
                } else {
                    value = null
                }
                // console.log(this.state)
                // console.log(value)
                row.push(
                    this.renderTile(j, i, value)
                )
            }
            board.push(<div key={'row' + i} className="board-row">{row}</div>)
        }
        return (
            <div>
                {board}
            </div>
        );
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
          <Board />
      </div>
    );
  }
}

export default App;
