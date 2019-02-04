import React, { Component } from 'react';
import './App.css';


class Tile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: null
        }

        this.updateValue = this.updateValue.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value})
    }

    updateValue(e) {
        console.log('You put in a ' + e.target.value)
        e.persist()
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
        .then(response => {
            // Handle a bad move
            if (response.status !== 201) {
                e.target.value = ''
            }
        })
    }

    render() {
        return (
            <div className="tile">
                <input type="text" value={this.state.value} onChange={this.updateValue} maxLength="1"></input>
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
        return <Tile key={x + '' + y} x={x} y={y} value={value} />;
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

class ControlPanel extends Component {
    resetGame() {
        let url = 'http://localhost:8000/api/v1/games/4/?reset=true'
        fetch(url, {
            method: 'POST'
        }).then(function() {
            window.location.reload();
        })
    }

    render() {
        return (
            <button className="btn btn-primary reset-button" onClick={this.resetGame}>Reset</button>
        )
    }
}

class App extends Component {
  render() {
    return (
        <div>
            <div className="App">
                <div className="board-wrapper">
                    <Board className="board" />
                </div>
            </div>
            <ControlPanel className="control-panel"/>
        </div>
    );
  }
}

export default App;
