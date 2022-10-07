import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import './App.css'
import {ListComponent} from './components/list/list'
import {NavbarComponent} from './components/navbar/navbar'

function App() {

  return (
    <div className="App">
     <ListComponent></ListComponent>
    </div>
  )
}

export default App
