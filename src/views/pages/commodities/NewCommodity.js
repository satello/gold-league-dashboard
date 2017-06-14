import React, {Component} from 'react';
import { connect } from 'react-redux';
import {browserHistory} from 'react-router';
import {
    Card, CardBlock
} from 'reactstrap';

import CommodityForm from '../../ui/CommodityForm';

// import '../../../styles/EditCommodity.scss';
import * as commoditiesActions from '../../../reducers/commodities/actions';

class NewCommodity extends Component {
  constructor(props) {
    super(props);
    this.submitEditForm = this.submitEditForm.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(commoditiesActions.resetStore());
    this.props.dispatch(commoditiesActions.getCommodityTypes());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.commodities.formSubmitted) {
      browserHistory.push('/commodities');
    }
  }

  submitEditForm(e) {
    e.preventDefault();
    this.props.dispatch(commoditiesActions.submitCommodityForm());
  }

  render() {
    if (!this.props.commodities || !this.props.commodities.typeHasLoaded) return false;

    const commodity = this.props.commodities;

    return (
      <div className="view">
        <Card className="mb-8">
            <CardBlock>
              <CommodityForm dispatch={this.props.dispatch} commodity={commodity} submitForm={this.submitEditForm}/>
            </CardBlock>
        </Card>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
      commodities: state.commodities,
  };
}

export default connect(mapStateToProps)(NewCommodity);
