import React, { Component } from 'react'
import ContentEditable from 'react-contenteditable'

import './Thing.css'
import Actions from './Actions'

class Thing extends Component {
  componentDidMount() {
    if (!this.nameInput.htmlEl.textContent) {
      this.nameInput.htmlEl.focus()
    }
  }

  updateName = (ev) => {
    const { thing, saveThing } = this.props
    thing.name = ev.target.value
    console.log(ev.target.value)
    saveThing(thing)
  }

  updateDate = (ev) => {
    const { thing, saveThing } = this.props
    thing.due = ev.target.value
    console.log(ev.target.value)
    saveThing(thing)
  }

  blurOnEnter = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      ev.target.blur()
    }
  }
  
  

  pressed = (ev) => {
    const { thing, checkIt} = this.props
    checkIt(thing)
  }

  render() {
    const { thing, removeThing } = this.props

    return (
      <li className="Thing">
        <input type="checkbox" value="on" onChange={this.pressed} checked = {thing.checked}/>
        
        <div className="details">
          <ContentEditable
            className="name"
            html={thing.name}
            onChange={this.updateName}
            onKeyPress={this.blurOnEnter}
            ref={input => this.nameInput = input}
          />

          <input type= "date" min="2017-01-01" max="2017-12-11" onChange = {this.updateDate} value = {thing.due}/>
          
          <Actions thing={thing} removeThing={removeThing} />
        </div>
      </li>
    )
  }
}

export default Thing