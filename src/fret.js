
import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'


const noteToolBox = require('./notes.js')

const letter = null



class Fret extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selected: false
    }

    this.changeSelect = this.changeSelect.bind(this)

  }

  changeSelect (row, note, fretHandler, col, stringHandler, string) {
    if (col === 0) {
      stringHandler(string)
    }

    const selected = !this.state.selected
    this.setState({selected: !this.state.selected})
    //console.log(note)
    fretHandler(row, note, selected)
  }

  render () {
    const { note, colIndex, row, mode, changeRowHandler, playNoteHandler, addSelectedHandler, stringSelected, stringSelectedHandler, string } = this.props
    let color
    if (stringSelected) {
      color = {backgroundColor: 'green',
        height:  row + 1 + 'px'}
      
    } else {
      color = {backgroundColor: '#c8bb93',
        height:  row + 1 + 'px'}
      
    }
    return (
      <Col key={`fret-${row}-${colIndex}`} onClick={mode === 'Sound' ? (e) => playNoteHandler(e, `${row}-${colIndex}`) : (e) => this.changeSelect(row, note, addSelectedHandler, colIndex, stringSelectedHandler, string) } id={`fret-${row}-${colIndex}`} sx={1} className={colIndex === 0 ? 'tuner-box box text-center' : 'box text-center'}>
        {colIndex !== 0 ? <hr style={color} className="text-center center-block"/> : null}
        {colIndex === 0 ? 
          <DropdownButton noCaret title={note} key={`tuner-${row}`} id={`tuner-${row}`} className="text-center center-block">
            <MenuItem eventKey={note} active >{note}</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-A '} >A</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-A#'} >A#</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-B '} >B</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-C '} >C</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-C#'} >C#</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-D '} >D</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-D#'} >D#</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-E '} >E</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-F '} >F</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-F#'} >F#</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-G '} >G</MenuItem>
            <MenuItem onSelect={changeRowHandler} eventKey={row + '-G#'} >G#</MenuItem>
          </DropdownButton> : <span className="note" style={this.state.selected ? {backgroundColor: 'green'} : {backgroundColor: 'yellow'}}>{note}</span> }
        {colIndex !== 0 ? <hr style={color} className="text-center center-block"/> : null}  
      </Col>
             
    )
  }
}

export default Fret