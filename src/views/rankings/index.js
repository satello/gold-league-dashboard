import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card, CardBlock } from 'reactstrap';
import $ from 'jquery';

var TimSort = require('timsort');

// components
import PlayerTable from '../../containers/playerTable';

// actions
import * as playerActions from '../../reducers/players/actions';


class DisplayPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "position": null,
    };
  }

  componentWillMount() {
    if (this.props.route.freeAgents) {
      this.props.loadFreeAgents({});
    } else {
      this.props.loadPlayers({});
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.route.freeAgents && !this.props.route.path) {
      this.props.loadFreeAgents({});
    } else if (this.props.route.freeAgents && !nextProps.route.path) {
      this.props.loadPlayers({});
    }
  }

  updatePosition() {
    const position = $(".query-param-options").val();

    if (position === "ALL") {
      this.setState({"position": null});
    } else {
      this.setState({"position": position});
    }
  }

  comparePlayerValues(a, b) {
    if (a.value > b.value) return -1;
    else if (a.value < b.value) return 1;
    else return 0;
  }

  render() {
    if (!this.props.players.playersLoaded) return false;
    const players = []

    let player;
    const data = this.props.players.data;

    // sort by value
    TimSort.sort(data, this.comparePlayerValues);

    let rank = 1;
    for (var i = 0; i < data.length; i++) {
      player = data[i];

      if (this.state.position) {
        if (this.state.position === player.position) {
          player.rank = rank;
          rank++;
          players.push(player);
        }
      } else {
        player.rank = rank;
        rank++;
        players.push(player);
      }
    }

    return (
      <Card className="playerTable">
        <CardBlock>
          <div className="player-table-header">
            <h6 className="mb-4 text-uppercase">Adjusted Player Rankings</h6>
          </div>
          <select className="query-param-options" onChange={this.updatePosition.bind(this)}>
            <option>ALL</option>
            <option>QB</option>
            <option>RB</option>
            <option>WR</option>
            <option>TE</option>
          </select>
        </CardBlock>
        <PlayerTable players={players} />
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPlayers: () => {
          dispatch(playerActions.loadPlayers());
        },
        loadFreeAgents: () => {
          dispatch(playerActions.loadFreeAgents());
        }
    }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlayers);
