
import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Button from 'react-bootstrap/lib/Button'

const noteToolBox = require('./notes.js')





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
    
    fretHandler(row, note, selected)
  }

  render () {
    const { note, colIndex, row, mode, changeRowHandler, playNoteHandler, addSelectedHandler, stringSelected, stringSelectedHandler, string } = this.props
    let color
    let tune
    if (stringSelected) {
      color = {backgroundColor: 'green',
        height:  row + 1 + 'px'}
    } else {
      color = {backgroundColor: '#c8bb93',
        height:  row + 1 + 'px'}
    }
    if (colIndex !== 0) {

    }
    return (
      <Col key={`fret-${row}-${colIndex}`} id={`fret-${row}-${colIndex}`} sx={1} className={colIndex === 0 ? 'tuner-box box text-center' : 'box text-center'}>
        {/*If the current iteration is the first column, set it to a tuner drop down box, else set it to a fret*/}
        {colIndex !== 0 ? <hr style={color} className="text-center center-block"/> : <Button className='string-button' onClick={mode === 'Sound' ? (e) => playNoteHandler(e, `${row}-${colIndex}`) : (e) => this.changeSelect(row, note, addSelectedHandler, colIndex, stringSelectedHandler, string) }>String</Button>}
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
          </DropdownButton>  
          : <span className="note" onClick={mode === 'Sound' ? (e) => playNoteHandler(e, `${row}-${colIndex}`) : (e) => this.changeSelect(row, note, addSelectedHandler, colIndex, stringSelectedHandler, string) } style={this.state.selected ? {backgroundColor: 'green'} : {backgroundColor: 'yellow'}}>{note}</span> }
        
        {colIndex !== 0 ? <hr style={color} className="text-center center-block"/> : null}  
      </Col>
             
    )
  }
}

export default Fret