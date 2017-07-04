import React, {Component} from 'react'
import { connect } from 'react-redux';

import {Radar, RadarChart, PolarGrid,
        PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer} from 'recharts';
import {Card, CardBlock, CardTitle, Row} from 'reactstrap';

// actions
import * as ownerActions from '../../../reducers/owners/actions';

import helpers from '../../../helpers';
// components
import PlayerTable from '../../../containers/playerTable';
import PieChart from '../../../components/graphs/piechart.js';

class OwnerDetails extends Component {

  componentWillMount() {
    this.props.loadDetails(this.props.params.name);
  }

  getTeamStrengthsData(positionalValues, totalTeamValue) {
    const teamStrengths = [];

    for (var i=0; i< helpers.positions.length; i++) {
      const position = helpers.positions[i]
      teamStrengths.push({
        name: position,
        value: (positionalValues[position] / totalTeamValue) * 100
      })
    }

    return teamStrengths;
  }

  render() {
    if (!this.props.owners || !this.props.owners.hasLoaded) return false;
    const ownerDetails = this.props.owners.data;
    const players = ownerDetails.players;

    const positionalValues = {
      "RB": 0,
      "WR": 0,
      "QB": 0,
      "TE": 0,
      "PICK": 0
    };
    let totalTeamValue = 0;
    let playerValue;

    for (var i=0; i < players.length; i++) {
      playerValue = players[i].value;
      totalTeamValue += playerValue;
      positionalValues[players[i].position] += playerValue;
    }

    const teamStrengthData = this.getTeamStrengthsData(positionalValues, totalTeamValue);

    return (
      <div>
        <Card>
          <CardBlock>
            <h1>{ownerDetails.name}</h1>
          </CardBlock>
        </Card>

        <Card>
          <Row>
            <div className="col-sm-6 col-md-3">
                <CardBlock>
                  <CardTitle className="text-uppercase small font-weight-bold">Cap Room</CardTitle>
                  <div className="d-flex align-items-center">
                    <h3 className="mr-2 font-weight-normal">{'$' + ownerDetails.cap_room}</h3>
                  </div>
                </CardBlock>
            </div>
            <div className="col-sm-6 col-md-3">
                <CardBlock>
                  <CardTitle className="text-uppercase small font-weight-bold">Roster Spots</CardTitle>
                  <div className="d-flex align-items-center">
                    <h3 className="mr-2 font-weight-normal">{ownerDetails.spots_available}</h3>
                  </div>
                </CardBlock>
            </div>
            <div className="col-sm-6 col-md-3">
                <CardBlock>
                  <CardTitle className="text-uppercase small font-weight-bold">Years Remaining</CardTitle>
                  <div className="d-flex align-items-center">
                    <h3 className="mr-2 font-weight-normal">{ownerDetails.years_remaining}</h3>
                  </div>
                </CardBlock>
            </div>
            <div className="col-sm-6 col-md-3">
                <CardBlock>
                  <CardTitle className="text-uppercase small font-weight-bold">Team Value</CardTitle>
                  <div className="d-flex align-items-center">
                    <h3 className="mr-2 font-weight-normal">{totalTeamValue}</h3>
                  </div>
                </CardBlock>
            </div>
          </Row>
        </Card>

        <Card>
          <CardBlock>
            <PlayerTable players={players} />
          </CardBlock>
        </Card>

        <Card>
          <Row>
            <div className="mb-4 col-md-6 col-sm-12">
              <CardBlock style={{width: '100%', height: '350px'}}>
                <h6 className="text-uppercase mb-4">Team Strengths</h6>
                <PieChart data={teamStrengthData} />
              </CardBlock>
          </div>
          </Row>
        </Card>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadDetails: (name) => {
          dispatch(ownerActions.loadOwnerDetails(name));
        }
    }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDetails);
