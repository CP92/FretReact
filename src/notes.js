const musicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const getRowNotes = function (note) {
  note = note.trim()
  const outNotes = []
  if (note === 'A') {
  	return musicNotes
  } else {
  	for (let i = 0; i < musicNotes.length; i++) {
  		const index = (i + musicNotes.indexOf(note)) % musicNotes.length
  		outNotes.push(musicNotes[index])
  	}
  	return outNotes		 
  }
}

const getFourth = function (note) {
  //note = note.replace(/\s/g, '')
  //console.log(note)
  if (musicNotes.indexOf(note) - 5 < 0) {
    //console.log(musicNotes[((musicNotes.indexOf(note) - 5) + 12)])
    return musicNotes[((musicNotes.indexOf(note) - 5) + 12)]
  } else {
    //console.log(musicNotes[musicNotes.indexOf(note) - 5])
    return musicNotes[musicNotes.indexOf(note) - 5]
  }

}

module.exports = {
  getRowNotes,
  getFourth
}