import '../App.css'
import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import { UniqueBrush } from '../pages/UniqueBrush';
import BallsLoop from '../pages/BallsLoop';
import BallsReflect from '../pages/BallsRefrect';



export function ToolHome() {


  return (
    <BrowserRouter>
      <ul>
        <NavLink activeClassName="active" to="/UniqueBrush">
          ユニークブラシ
        </NavLink> <br />

        <NavLink activeClassName="active" to="/ballsLoop">
          ボールのループ
        </NavLink><br />

        <NavLink activeClassName="active" to="/ballsReflect">
          ボールの反射
        </NavLink><br />
      </ul>

      <switch>
        <Route path="/uniqueBrush">
          <UniqueBrush />
        </Route>

        <Route path="/ballsReflect">
          <BallsReflect />
        </Route>

        <Route path="/ballsLoop">
          <BallsLoop />
        </Route>

      </switch>

    </BrowserRouter>
  )
}

export default ToolHome