import React, {Component} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';

import '../../../styles/CommoditiesTable.scss';

import {
    Card, CardBlock
} from 'reactstrap';
import {Table, Th, Thead} from 'reactable';

import * as commoditiesActions from '../../../reducers/commodities/actions';


class CommoditiesTable extends Component {
  componentWillMount() {
    this.props.loadCommodities();
  }

  componentDidUpdate() {
    if (!this.props.commodities || !this.props.commodities.commodityHasLoaded || !this.props.commodities.commodityList) return false;

    // sorta hacky. better way to do this?
    var table = document.getElementById("commodities-table");
    var rows = table.getElementsByTagName("tr");
    // first row headers, last row is for pagination
    for (var i = 1; i < rows.length - 1; i++) {
        var currentRow = table.rows[i];
        currentRow.onclick = this.onRowClick
    }
  }

  onRowClick(e) {
    const commodityRow = e.target.parentNode;
    const cells = commodityRow.getElementsByTagName("td");
    const commodityId = cells[0].innerHTML;
    browserHistory.push('/commodities/' + commodityId);
  }

  newCommodity() {
    browserHistory.push('/commodities/new');
  }

  render() {
    if (!this.props.commodities || !this.props.commodities.commodityHasLoaded || !this.props.commodities.commodityList) return false;

    const tableRows = [];
    const commodityList = this.props.commodities.commodityList;

    for (var i=0; i < commodityList.length; i++) {
      tableRows.push(
        {
          "id": commodityList[i].id,
          "name": commodityList[i].name,
          "description": commodityList[i].description,
          "price": commodityList[i].price,
          "type": commodityList[i].commodity_type.name
        }
      )
    }

    return (
      <Card className="mb-4 commodities-wrapper">
        <CardBlock>
          <div className="commodity-table-header">
            <h6 className="mb-4 text-uppercase">Your Commodities</h6>
            <div className="btn new-commodity" onClick={this.newCommodity}>New Commodity</div>
          </div>
        </CardBlock>
        <CardBlock className="table-responsive">
            <Table id="commodities-table"
              className="table"
              data={tableRows}
              sortable={true}
              defaultSort={{column: 'id', direction: 'asc'}}
              itemsPerPage={10} pageButtonLimit={5}>
                <Thead>
                    <Th column="id"><span>id</span></Th>
                    <Th column="name"><span>name</span></Th>
                    <Th column="description"><span>description</span></Th>
                    <Th column="price"><span>price ($)</span></Th>
                    <Th column="type"><span>type</span></Th>
                </Thead>
            </Table>
        </CardBlock>
      </Card>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCommodities: () => {
            dispatch(commoditiesActions.loadCommodities());
        }
    }
};

const mapStateToProps = (state) => {
    return {
        commodities: state.commodities,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommoditiesTable);
