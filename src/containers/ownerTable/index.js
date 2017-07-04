import React from 'react';

// components
import Table from '../../components/table';

// css
import './ownersTable.css';

const tableHeadings = [
  {id: "name", displayName: "name"},
  {id: "cap_room", displayName: "cap room"},
  {id: "spots_available", displayName: "spots"},
  {id: "years_remaining", displayName: "years remaining"},
]

/*
* @params
* players: <object> player data to display
*/
const OwnersTable = (props) => {
  if (!props.owners) return false;

  const settings = {
    column: "name",
    direction: "asc"
  }

  return (
    <Table tableHeadings={tableHeadings} data={props.owners} defaultSort={settings} perPage={12} tableId={"owners-table"} />
  )
}

export default OwnersTable;
