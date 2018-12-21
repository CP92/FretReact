import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'


const noteToolBox = require('./notes.js')
class FretBoard extends Component {
  constructor (props) {
  	super(props)

    this.state = {
      notes: props.notes
    }

    this.changeRow = this.changeRow.bind(this)

  }

  changeRow (e) {
    
    const note = e.slice(2)
    const row = e.slice(0,1)
    console.log(note)
    console.log(row)
    const newNoteRow = noteToolBox.getRowNotes(note)
    console.log(newNoteRow)
    const set = this.state.notes
    set[row] = newNoteRow
    this.setState((state, props) => ({
      notes: set
    }))
  }	



  render () {
  	const { title, strings, key } = this.props
    return (
      <div>
      	<h1>{title}</h1>
      	<Grid>
          {this.state.notes.map((set, rowIndex) => (
            <Row key={`row-${rowIndex}`} id={`row-${rowIndex}`} className={`text-center show-grid ${rowIndex === this.state.notes.length - 1 ? 'last-row' : ''}` }>
              {set.map((note, colIndex) => (
                <Col key={`fret-${rowIndex}-${colIndex}`} id={`fret-${rowIndex}-${colIndex}`} sx={1} className={colIndex === 0 ? 'tuner-box box text-center' : 'box text-center'}>
                  {colIndex === 0 ? 
                    <DropdownButton noCaret title={note} key={`tuner-${rowIndex}`} id={`tuner-${rowIndex}`} class="text-center center-block">
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
                    </DropdownButton> : note}
                </Col>
              ))} 
            </Row>
          ))}
        </Grid>
      	
      	
      </div>
    )
  }
}

export default FretBoard