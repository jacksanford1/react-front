import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import MainRouter from './MainRouter'

const App = () => (
  <BrowserRouter> {/*this is a special feature of react-router-dom, not sure what it does yet*/}
    <MainRouter /> {/*this is a component that we imported*/}
  </BrowserRouter>
)

export default App;
