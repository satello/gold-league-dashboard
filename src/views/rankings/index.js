import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Card, CardBlock } from 'reactstrap';
import $ from 'jquery';

// components
import PlayerTable from '../../containers/playerTable';

// actions
import * as playerActions from '../../reducers/players/actions';


class DisplayPlayers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "position": null
    };
  }

  componentWillMount() {
    this.props.loadPlayers({});
  }

  componentWillRecieveProps(nextProps) {
    const queryParams = {
      "position": this.state.position
    };

    console.log(queryParams);
    this.props.loadPlayers(queryParams);
  }

  updatePosition() {
    const position = $(".query-param-options").val();

    if (position == "ALL") {
      this.setState({"position": null});
    } else {
      this.setState({"position": position});
    }
  }

  render() {
    if (!this.props.players.playersLoaded) return false;

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
        <PlayerTable players={this.props.players.data} />
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPlayers: () => {
            dispatch(playerActions.loadPlayers());
        }
    }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlayers);
