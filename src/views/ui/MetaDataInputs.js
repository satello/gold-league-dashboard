import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  FormGroup, Input, Col
} from 'reactstrap';

import _ from "lodash";
import '../../styles/ui/MetaDataInputs.scss';
import * as commoditiesActions from '../../reducers/commodities/actions';

const NEW_METADATA_ID = "__new_metadata__";

const MetaDataInput = (props) => {

  function updateMetadata() {
    const inputs = document.getElementById(props.metadataKey);
    const changes = {
      metadata: [{
        position: props.position,
        key: inputs.getElementsByTagName("input")[0].value,
        value: inputs.getElementsByTagName("input")[1].value
      }]
    }
    props.dispatch(commoditiesActions.updateCommodityDetails(changes));
  }

  function removeMetadata() {
    props.dispatch(commoditiesActions.removeMetadata(props.position));
  }

  let removeIcon = [];

  if (!props.required) {
    removeIcon.push(<div className="remove-icon" onClick={removeMetadata}><span>-</span></div>)
  }

  return (
    <FormGroup row id={props.metadataKey}>
      <Col sm={2}><Input type="text" name="metadataKey" defaultValue={props.metadataKey === NEW_METADATA_ID ? "" : props.metadataKey} onBlur={updateMetadata}/></Col>
      <Col sm={2}><Input type="text" name="metadataValue" defaultValue={props.metadataValue} onBlur={updateMetadata}/></Col>
      {removeIcon}
  </FormGroup>
  )
}


class MetaDataInputs extends Component {

  newMetaData() {
    const cur_new = document.getElementById(NEW_METADATA_ID);
    if (cur_new) {
      return;
    }
    this.props.dispatch(commoditiesActions.newMetaData())
  }

  render() {
    const metadata = this.props.metadata;
    const metadataInputs = [];

    for (var i=0; i<metadata.length; i++) {
      // FIXME barf
      const key = Object.keys(metadata[i])[0];

      if (key) {
        metadataInputs.push(
          <div key={key} className="metadata-pair">
              <MetaDataInput dispatch={this.props.dispatch} position={i} metadataKey={key} metadataValue={metadata[i][key]} />
          </div>
        );
      } else {
        // new input
        // FIXME kinda hacky
        metadataInputs.push(
          <div key="new-key" className="metadata-pair">
              <MetaDataInput dispatch={this.props.dispatch} position={i} metadataKey={NEW_METADATA_ID} metadataValue={""} />
          </div>
        )
      }
    }

    return (
      <div className="metadata">
        {metadataInputs}
        <div className="newMetadataBtn btn" onClick={this.newMetaData.bind(this)}>+</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      commodities: state.commodities,
  };
}

export default connect(mapStateToProps)(MetaDataInputs);
