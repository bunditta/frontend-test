import React from 'react'
import { Button } from 'semantic-ui-react'
import './cardStyle.css'

const Card = props => (
  <div className="card-container">
    <div className="card-img"><img src={props.img} width="110"/></div>
    <div className="card-detail"> 
      <div className="card-name">{props.name}</div>
      <div className="card-hp">
        Hp
      </div>
      <div className="card-str">
        Str
      </div>
      <div className="card-weak">
        Weak
      </div>
      <div className="card-point">
        <img src={require('../cute.png')} width="30"/>
      </div>
    </div>
    {props.addCard?
      <div className="add-btn">
        <Button onClick={() => props.addCard()}>Add</Button>
      </div> : 
      <div className="remove-btn">
        <Button onClick={() => props.removeCard()}>X</Button>
      </div> 
    }
    
  </div>
)

export default Card