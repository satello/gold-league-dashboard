import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Card, CardBlock } from 'reactstrap';

// components
import OwnersTable from '../../containers/ownerTable';

// actions
import * as ownerActions from '../../reducers/owners/actions';


class OwnersPage extends Component {

  componentWillMount() {
    this.props.loadOwners();
  }

  componentDidUpdate() {
    if (!this.props.owners || !this.props.owners.hasLoaded || !this.props.owners.data) return false;

    // sorta hacky. better way to do this?
    var table = document.getElementById("owners-table");
    var rows = table.getElementsByTagName("tr");
    // first row headers, last row is for pagination
    for (var i = 1; i < rows.length - 1; i++) {
        var currentRow = table.rows[i];
        currentRow.onclick = this.onRowClick
    }
  }

  onRowClick(e) {
    const ownerRow = e.target.parentNode;
    const cells = ownerRow.getElementsByTagName("td");
    const ownerName = cells[0].innerHTML;
    browserHistory.push('/owners/' + ownerName);
  }

  render() {
    if (!this.props.owners || !this.props.owners.hasLoaded) return false;

    return (
      <Card>
        <CardBlock>
          <OwnersTable owners={this.props.owners.data}/>
        </CardBlock>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadOwners: () => {
          dispatch(ownerActions.loadOwners());
        }
    }
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(OwnersPage);
