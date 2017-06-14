import React from 'react';

// components
import Table from '../../components/table';

// css
import './playerTable.scss';


const tableHeadings = [
  {id: "rank", displayName: "rank"},
  {id: "name", displayName: "name"},
  {id: "position", displayName: "position"},
  {id: "value", displayName: "value"},
  {id: "owner", displayName: "owner"},
  {id: "cost", displayName: "cost"},
  {id: "years", displayName: "years remaining"},
]

/*
* @params
* players: <object> player data to display
*/
const PlayerTable = (props) => {
  if (!props.players) return false;

  const settings = {
    column: "value",
    direction: "desc"
  }

  return (
    <Table tableHeadings={tableHeadings} data={props.players} defaultSort={settings} perPage={100} />
  )
}

export default PlayerTable;
