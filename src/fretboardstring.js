
import React, { Component } from 'react'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import Fret from './fret.js'


const noteToolBox = require('./notes.js')

const letter = null



class FretboardString extends Component {
  constructor (props) {
  	super(props)

    this.state = {
     
    }
  }

  render () {
  	const { set, row, changeRowHandler, last, mode, playNoteHandler } = this.props
    
    return (
      <Row key={`row-${row}`} id={`row-${row}`} className={`text-center show-grid ${last ? 'last-row' : ''}` }>
        {set.map((note, colIndex) => (
        	<Fret 
            note={note}
            colIndex={colIndex}
            changeRowHandler={changeRowHandler}
            playNoteHandler={playNoteHandler}
            mode={mode}
            row={row}
            key={colIndex}
          />
        ))} 
      </Row>
    )
  }
}

export default FretboardString