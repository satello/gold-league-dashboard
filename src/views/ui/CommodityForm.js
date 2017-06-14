import React from 'react';
import {
  Button, Form, FormGroup, Label, Input, Col, InputGroup, InputGroupAddon
} from 'reactstrap';

import MetaDataInputs from './MetaDataInputs'

import * as commoditiesActions from '../../reducers/commodities/actions';

const AttributeInput = (props) => {

  function updateAttribute() {
    const input = document.getElementById(props.attributeId);
    const changes = {
      [props.attributeName]: input.value
    }
    props.dispatch(commoditiesActions.updateCommodityDetails(changes));
  }

  return (
    <Col sm={9}><Input type="text" name={props.attributeName} id={props.attributeId} defaultValue={props.defaultValue} onBlur={updateAttribute}/></Col>
  )
}

const PriceInput = (props) => {

  function updatePrice() {
    const input = document.getElementById(props.attributeId);
    const changes = {
      [props.attributeName]: input.value
    }
    props.dispatch(commoditiesActions.updateCommodityDetails(changes));
  }

  return (
    <Col sm={2}>
      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <Input type="number" name={props.attributeName} id={props.attributeId} defaultValue={props.defaultValue} onBlur={updatePrice}/>
      </InputGroup>
    </Col>
  )
}

const TypeInput = (props) => {

  function updateType() {
    const input = document.getElementById(props.attributeId);
    const changes = {
      [props.attributeName]: input.value
    }
    props.dispatch(commoditiesActions.updateCommodityDetails(changes));
  }

  const options = [];
  for (var i=0; i<props.types.length; i++) {
    options.push(
      <option key={'option-' + i} value={props.types[i].id}>{props.types[i].name}</option>
    )
  }

  return (
    <Col sm={2}>
      <Input type="select" name={props.attributeName} id={props.attributeId} defaultValue={props.defaultValue} onBlur={updateType}>
        {options}
      </Input>
    </Col>
  )
}

const CommodityForm = (props) => {
  return (
    <Form onSubmit={e => props.submitForm(e)}>
      <div className="edit-commodity-form-block">
        <h4>Attributes</h4>
        <FormGroup row>
          <Label for="commodityName" sm={2}>Name:</Label>
          <AttributeInput dispatch={props.dispatch} attributeName="name" attributeId="commodityName" defaultValue={props.commodity.name} />
        </FormGroup>
        <FormGroup row>
          <Label for="commodityDescription" sm={2}>Description:</Label>
          <AttributeInput dispatch={props.dispatch} attributeName="description" attributeId="commodityDescription" defaultValue={props.commodity.description} />
        </FormGroup>
        <FormGroup row>
          <Label for="commodityPrice" sm={2}>Price:</Label>
          <PriceInput dispatch={props.dispatch} attributeName="price" attributeId="commodityPrice" defaultValue={props.commodity.price} />
        </FormGroup>
        <FormGroup row>
          <Label for="commodityType" sm={2}>Type:</Label>
          <TypeInput dispatch={props.dispatch} attributeName="typeId" attributeId="commodityType" types={props.commodity.commodityTypes} defaultValue={props.commodity.typeId} />
        </FormGroup>
      </div>
      <div className="edit-commodity-form-block">
        <h4>Custom Data</h4>
        <MetaDataInputs metadata={props.commodity.metadata ? props.commodity.metadata : []} />
      </div>
      <Button>Submit</Button>
    </Form>
  )
}

export default CommodityForm;
