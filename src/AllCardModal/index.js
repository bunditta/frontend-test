import React, { Component } from 'react'
import { Modal, Search } from 'semantic-ui-react'
import Card from '../Card'
import './cardModalStyle.css'

class AllCardModal extends Component {
  constructor(props){
    super(props)
  }

  getCard(){
    let cards = this.props.searchQuery.length > 0? this.props.filterCards : this.props.cards
    return cards.map(card => {
      return (
        <Card key={card.id} name={card.name} img={card.imageUrl} addCard={() => this.addCard(card)} />
      )
    })
  }

  addCard(card){
    this.props.addCard(card)
  }

  render(){
    return (
      <Modal id="all-card-modal" open={this.props.open} onClose={() => this.props.close()}>
        <Modal.Content id="modal-wrapper">
          <div className="modal-header">
            <input
              placeholder="Search"
              onChange={e => this.props.onChange(e)}
            />
            <div className="icon-wrapper">
              <img src={require('../search.png')} width="30"/>
            </div>
          </div>
          <div className="modal-content">
            {this.getCard()}
          </div>
        </Modal.Content> 
      </Modal>
    )
  }
}

export default AllCardModal