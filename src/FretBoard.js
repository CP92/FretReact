import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'


const noteToolBox = require('./notes.js')
let context


class FretBoard extends Component {
  constructor (props) {
  	super(props)

    this.state = {
      notes: props.notes
    }

    this.fretClick = this.fretClick.bind(this)
    this.changeRow = this.changeRow.bind(this)
    this.loadAudio = this.loadAudio.bind(this)
    this.addString = this.addString.bind(this)
    this.removeString = this.removeString.bind(this)

  }

  loadAudio () {
    try {window.AudioContext = window.AudioContext || window.webkitAudioContext
      context = new AudioContext()
    }
    catch (e) {

    }
  }

  fretClick (e) {
    console.log(e.target.innerText)
  }

  changeRow (e) {
    const note = e.slice(2)
    const row = e.slice(0,1)
    const newNoteRow = noteToolBox.getRowNotes(note)
    const set = this.state.notes
    set[row] = newNoteRow
    this.setState((state, props) => ({
      notes: set
    }))
  }

  addString (e) {
    const lowestOpenNote = this.state.notes[this.state.notes.length - 1][0]
    const set = this.state.notes
    set.push(noteToolBox.getRowNotes(noteToolBox.getFourth(lowestOpenNote)))
    console.log(set)
    this.setState((state, props) => ({
      notes: set
    }))
  }

  removeString (e) {
    const set = this.state.notes
    set.pop()
    this.setState((state, props) => ({
      notes: set
    })) 
  }	



  render () {
  	const { title, strings, key } = this.props
    return (
      <div>
      	<h1>{title}</h1>
      	<Grid className="fretboard">
          {this.state.notes.map((set, rowIndex) => (
            
            <Row key={`row-${rowIndex}`} id={`row-${rowIndex}`} className={`text-center show-grid ${rowIndex === this.state.notes.length - 1 ? 'last-row' : ''}` }>
              {set.map((note, colIndex) => (
                <Col key={`fret-${rowIndex}-${colIndex}`} onClick={colIndex !== 0 ? this.fretClick : null} id={`fret-${rowIndex}-${colIndex}`} sx={1} className={colIndex === 0 ? 'tuner-box box text-center' : 'box text-center'}>
                  {colIndex !== 0 ? <hr style={{height: rowIndex + 1 + 'px'}} className="text-center center-block"/> : null}
                  {colIndex === 0 ? 
                    <DropdownButton noCaret title={note} key={`tuner-${rowIndex}`} id={`tuner-${rowIndex}`} className="text-center center-block">
                      <MenuItem eventKey={note} active >{note}</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-A '} >A</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-A#'} >A#</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-B '} >B</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-C '} >C</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-C#'} >C#</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-D '} >D</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-D#'} >D#</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-E '} >E</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-F '} >F</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-F#'} >F#</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-G '} >G</MenuItem>
                      <MenuItem onSelect={this.changeRow} eventKey={rowIndex + '-G#'} >G#</MenuItem>
                    </DropdownButton> : <span className="note">{note}</span>  }
                  {colIndex !== 0 ? <hr style={{height: rowIndex + 1 + 'px'}} className="text-center center-block"/> : null}  
                </Col>
              ))} 
            </Row>
          ))}
          
        </Grid>

        <button onClick={this.addString} type="button" className="btn btn-success btn-sm" id="add-string">
          <span className="fas fa-plus-square" aria-hidden="true"></span> Add String
        </button>
        <button onClick={this.removeString} type="button" className="btn btn-danger btn-sm float-right" id="remove-string">
          <span className="fas fa-minus-square" aria-hidden="true"></span> Remove String
        </button>
      	
      	

      </div>
    )
  }
}

export default FretBoard