import '../App.css'
import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';


export function WorkMenu() {
  return (
    <div>
      <ul>
        <NavLink activeClassName="active" to="/uniqueBrush">
          UniqueBrush
        </NavLink><br />

        <NavLink activeClassName="active" to="/lineGame">
          LineGame
        </NavLink><br />

        <NavLink activeClassName="active" to="/clock">
          Clock
        </NavLink><br />

        <NavLink activeClassName="active" to="/camera">
          Camera
        </NavLink><br />

        <NavLink activeClassName="active" to="/growArt">
          GrowArt
        </NavLink><br />

        <NavLink activeClassName="active" to="/ballsReflect">
          BallsReflect
        </NavLink><br />

        <NavLink activeClassName="active" to="/ballsLoop">
          BallsLoop
        </NavLink><br />

        <NavLink activeClassName="active" to="/sound">
          Sound
        </NavLink><br />


      </ul>

    </div>
  )
}

export default WorkMenu