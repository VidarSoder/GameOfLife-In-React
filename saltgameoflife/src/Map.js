import React from "react";

export default function Map(props) {
  let mapArray = [];
  let newArray = JSON.parse(JSON.stringify(props.initGrid));
  for (let i = 0; i < 30; i++) {
    for (let j = 0; j < 30; j++) {
      let uniqueId = Math.random();
      let visisbleClass = newArray[i][j] ? "active" : "inactive";
      let  classes = `${visisbleClass} ${i} ${j}`
      mapArray.push(
        <div className={classes} key={uniqueId} onMouseOver={props.select}/>
      );
    }
  }
  return <div className="Map">{mapArray}</div>;
}
