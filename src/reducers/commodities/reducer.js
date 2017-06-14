import * as types from './actionTypes';

const initialState = {
    formSubmitted: false,
    commodityHasLoaded: false,
    typeHasLoaded: false,
    id: null,
    commodityList: [],
    name: null,
    description: null,
    price: null,
    metadata: [],
    typeId: null,
    commodityTypes: []
};

export default function commodities(state = initialState, action = {}) {
    switch (action.type) {

        case types.RESET_STORE:
          return initialState;

        case types.LOAD_COMMODITIES:
          return Object.assign({}, state, {
            commodityHasLoaded: false,
            formSubmitted: false
          });

        case types.COMMODITIES_DETAILS_LOADED:
          return Object.assign({}, state, {
            commodityHasLoaded: true,
            commodityList: action.payload.commodities
          });

        case types.COMMODITY_DETAILS_LOADED:
          return Object.assign({}, state, {
            commodityHasLoaded: true,
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.description,
            price: action.payload.price,
            metadata: action.payload.commodity_metadata,
            typeId: action.payload.commodity_type.id
          });

        case types.UPDATE_COMMODITY_DETAILS:
          let newMetaData;

          if (action.payload.metadata) {
            newMetaData = state.metadata;
            for (var i=0; i<action.payload.metadata.length; i++) {
              const field = action.payload.metadata[i];
              newMetaData[field.position] = {[field.key]: field.value};
            }
          }

          return Object.assign({}, state, {
            name: action.payload.name ? action.payload.name : state.name,
            description: action.payload.description ? action.payload.description : state.description,
            price: action.payload.price ? action.payload.price : state.price,
            metadata: newMetaData ? newMetaData : state.metadata,
            typeId: action.payload.typeId ? action.payload.typeId : state.typeId
          });

        case types.NEW_METADATA:
          let metadataCopy = state.metadata;

          // signify new metadata
          metadataCopy.push({});
          // push empty object to signify new metadata
          return Object.assign({}, state, {
            metadata: metadataCopy
          });

        case types.SUBMIT_FORM:
          return Object.assign({}, state, {
            formSubmitted: false
          });

        case types.SUBMIT_FORM_SUCCESS:
          // reset to initial state
          return Object.assign({}, initialState, {
            formSubmitted: true
          });

        // COMMODITY TYPES
        case types.LOAD_COMMODITY_TYPES:
          return Object.assign({}, state, {
            typeHasLoaded: false
          })

        case types.COMMODITY_TYPES_LOADED:
          return Object.assign({}, state, {
            typeHasLoaded: true,
            commodityTypes: action.payload.commodity_types
          })

        case types.REMOVE_METADATA:
          let curMetadata = state.metadata;
          curMetadata.splice(action.payload.position, 1);

          return Object.assign({}, state, {
            metadata: curMetadata,
          })

        default:
          return state;
    }
}
