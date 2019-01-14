import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import FretboardString from './fretboardstring.js'


const noteToolBox = require('./notes.js')

const letter = null



class FretBoard extends Component {
  constructor (props) {
  	super(props)

    this.state = {
      notes: props.notes,
      selected: [],
      selectedRow: [],
      mode: 'Chord Namer',
      chordName: ''
    }

    this.playNote = this.playNote.bind(this)
    this.changeRow = this.changeRow.bind(this)
    
    this.addString = this.addString.bind(this)
    this.removeString = this.removeString.bind(this)

    this.addSelected = this.addSelected.bind(this)

    this.setMode = this.setMode.bind(this)
    this.updateChordName = this.updateChordName.bind(this)

  }

  setMode (e) {
    this.setState({mode: e})
  }

  updateChordName (name) {
    this.setState({chordName: 'Chord: ' + name})
  }

  addSelected (row, note, selected) {
    const selectedNotes = this.state.selected
    const selectedRow = this.state.selectedRow
    //console.log(selectedNotes)
    if (selected) {
      selectedNotes.push(note)
      //console.log(selectedNotes)
      selectedRow.push(row)
      this.setState({selected: selectedNotes})
      this.setState({selectedRow: selectedRow})

    } else {
      selectedRow.splice(selectedRow.indexOf(row), 1)
      selectedNotes.splice(selectedNotes.indexOf(note), 1)
      this.setState({selected: selectedNotes})
      this.setState({selectedRow: selectedRow})
    }
    console.log(selectedNotes)
    console.log(selectedRow)

    const hasMultiple = (new Set(selectedRow)).size !== selectedRow.length
    const chord = noteToolBox.getChordName(selectedNotes)
    //console.log(chord)


    if (hasMultiple) {
      this.updateChordName('Too many notes per string')
    } else if (chord === undefined) {
      this.updateChordName('')
    } else {
      this.updateChordName(chord)
    }

  }

  playNote (e, id) {
    
    id = id.split('-')
    const noteClicked = e.target.innerText
    let num = 11 - id[1]
    const string = parseInt(id[0])
    num = num + (12 * id[0])
    //console.log(string)
    const noteToPlay = noteToolBox.getNextFreq(string, num, noteClicked, this.state.notes)

    noteToolBox.loadAudio(noteToPlay)
    
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
  	const { title, strings, mode, notes } = this.props
    
    return (
      <div>
      	<h1>{this.state.chordName}</h1>
        <div className='mode'>
          <DropdownButton noCaret title={this.state.mode} key='mode-change' id='mode-change' className="text-center center-block float-right">
              
            <MenuItem onSelect={this.setMode} eventKey={'Sound'} >Sound</MenuItem>
            <MenuItem onSelect={this.setMode} eventKey={'Chord Namer'} >Chord Namer</MenuItem>
              
          </DropdownButton>
        </div>
      	<Grid className="fretboard">
          {this.state.notes.map((set, rowIndex) => (
            <FretboardString 
              set={set}
              row={rowIndex}
              changeRowHandler={this.changeRow}
              playNoteHandler={this.playNote}
              addSelectedHandler={this.addSelected}
              last={rowIndex === this.state.notes.length -1 ? true : false}
              mode={this.state.mode}
              key={rowIndex}
            />

          ))}
          
        </Grid>

        <button onClick={this.addString} type="button" className="btn btn-success btn-md" id="add-string">
          <span className="fas fa-plus-square" aria-hidden="true"></span> Add String
        </button>
        <button onClick={this.removeString} type="button" className="btn btn-danger btn-md float-right" id="remove-string">
          <span className="fas fa-minus-square" aria-hidden="true"></span> Remove String
        </button>
      	
      	

      </div>
    )
  }
}

export default FretBoard