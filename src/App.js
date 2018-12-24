import React, { Component } from 'react'
import axios from 'axios'
import { Button } from 'semantic-ui-react'
import AllCardModal from './AllCardModal'
import Card from './Card'
import 'semantic-ui-css/semantic.min.css';
import './App.css'
import { throws } from 'assert';

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

const axiosConfig = {
  headers: {
    'Authorization': 'hello',
    'Content-Type': 'application/json'
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      showAllCardModal: false,
      cards: [],
      showCards: [],
      addedCards: [],
      searchQuery: '',
      filterCards: []
    }
  }

  componentWillMount(){
    axios.get('http://localhost:3030/api/cards', axiosConfig)
    .then((res) => {
      console.log(res)
      this.setState({
        cards: res.data.cards
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
  }

  showAllCardModal(){
    this.setState({
      showAllCardModal: true
    })
  }

  close(){
    this.setState({
      showAllCardModal: false
    })
  }

  addCard(card){
    let addedCards = this.state.addedCards
    addedCards.push(card)
    this.getCards(card)
    this.setState({
      addedCards
    })
  }

  getAddedCard(){
    return this.state.addedCards.map(card => {
      return (
        <Card key={card.id} name={card.name} img={card.imageUrl} addCard={false} removeCard={() => this.removeCard(card)}/>
      )
    })
  }

  removeCard(removeCard){
    let addedCards = this.state.addedCards
    addedCards = addedCards.filter(card => card !== removeCard)
    this.setState({
      addedCards
    })
  }

  getCards(addedCard){
    let cards = this.state.searchQuery.length === 0? this.state.cards : this.state.filterCards
    cards = cards.filter(card => card !== addedCard)
    
    if(this.state.searchQuery.length === 0){
      this.setState({
        cards
      })
    } else {
      this.setState({
        filterCards: cards
      })
    }
  }

  onChangeSearchHandle(e) {
    axios.get(`http://localhost:3030/api/cards?name=${e.target.value}`, axiosConfig)
    .then((res) => {
      this.setState({
        filterCards: res.data.cards
      })
    })
    .catch((err) => {
      console.log(err.message)
    })

    this.setState({
      searchQuery: e.target.value,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="title">My Pokedex</div>
        <div className="app-body">
          {this.getAddedCard()}
        </div>
        <div className="footer">
          <Button onClick={() => this.showAllCardModal()}>+</Button>
        </div>
        <AllCardModal 
          open={this.state.showAllCardModal} 
          close={() => this.close()} 
          cards={this.state.cards} 
          addCard={(card) => this.addCard(card)}
          onChange={(e) => this.onChangeSearchHandle(e)}
          filterCards={this.state.filterCards}
          searchQuery={this.state.searchQuery}
        /> 
      </div>
    )
  }
}

export default App
