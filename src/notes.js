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

module.exports = {
  getRowNotes
}