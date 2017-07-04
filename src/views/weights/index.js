import React, {Component} from 'react';
// import { connect } from 'react-redux';
import { Card, CardBlock, Row } from 'reactstrap';

// actions
// import * as weightsActions from '../../reducers/weights/actions';
let WEIGHTS = JSON.parse(localStorage.getItem('weights'));

class Weights extends Component {

  updateWeights(category, e) {
    // FIXME use component state instead of gloabl var
    if (category === "redraft") {
      console.log(e.target.value);
      console.log(e.target.max);
      if (e.target.value > e.target.max) {
        console.log("BIGGER");
        e.target.value = e.target.max;
      }
      WEIGHTS[category] = parseFloat(e.target.value);
    } else {
      WEIGHTS[category][e.target.id] = parseFloat(e.target.value);
    }
    localStorage.setItem("weights", JSON.stringify(WEIGHTS));
  }

  render() {
    const positionalKeys = Object.keys(WEIGHTS.positions);
    const playerKeys = Object.keys(WEIGHTS.players);

    let positionPairs = [];
    for (var i=0; i<positionalKeys.length; i++) {
      positionPairs.push(
        <Row>
          <div className="col-md-2 col-sm-4">
            <p>{positionalKeys[i]}</p>
          </div>
          <div className="col-md-2 col-sm-4">
            <input type="text" id={positionalKeys[i]} onInput={(e) => this.updateWeights('positions', e)} defaultValue={WEIGHTS.positions[positionalKeys[i]]} />
          </div>
        </Row>
      )
    }

    let playerPairs = [];
    for (var j=0; j<playerKeys.length; j++) {
      playerPairs.push(
        <Row>
          <div className="col-md-2 col-sm-4">
            <p>{playerKeys[j]}</p>
          </div>
          <div className="col-md-2 col-sm-4">
            <input type="text" onInput={(e) => this.updateWeights('players', e)} defaultValue={WEIGHTS.players[playerKeys[j]]} />
          </div>
        </Row>
      )
    }

    return (
      <Card>
        <CardBlock>
          <div className="weight-header">
            <h6 className="mb-4 text-uppercase">Weight City</h6>
            <p>All of these weights are multipliers. For example: If you set RB: 1.1 all RB values will be multiplied by 1.1 in the rankings</p>
          </div>
        </CardBlock>
        <CardBlock>
          <h6 className="mb-4 text-uppercase">Positions</h6>
          {positionPairs}
        </CardBlock>
        <CardBlock>
          <h6 className="mb-4 text-uppercase">Players</h6>
          {playerPairs}
        </CardBlock>
        <CardBlock>
          <h6>Other</h6>
          <Row>
            <div className="col-md-2 col-sm-4">
              <p>Redraft Bias (0-1)</p>
            </div>
            <div className="col-md-2 col-sm-4">
              <input type="number" step="0.01" min="0" max="1" onInput={(e) => this.updateWeights('redraft', e)} defaultValue={WEIGHTS.redraft} />
            </div>
          </Row>
        </CardBlock>
      </Card>
    )
  }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadPlayers: () => {
//           dispatch(playerActions.loadPlayers());
//         },
//         loadFreeAgents: () => {
//           dispatch(playerActions.loadFreeAgents());
//         }
//     }
// };
//
// const mapStateToProps = (state) => {
//     return state;
// };

export default Weights;
