const musicNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
const chordMusic = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']

const chords = {
  powerChord: {
    dis: 7
  },
  Major: {
    dis: [4, 7]   
  },
  Minor: {
    dis: [3, 7]
  },
  Diminished: {
    dis: [3, 6]
  },
  Augmented: {
    dis: [4, 8]
  }
}

const getChordName = function (noteArray) {
  //console.log(noteArray)

  let chordName  
  // Attempts to see if the notes are a power chord
  if (noteArray.length === 2) {
    //console.log('testing power chord')
    noteArray.forEach(function (note, index) {
      if (chordMusic[chordMusic.indexOf(note) + chords.powerChord.dis] === noteArray[(index + 1) % noteArray.length]) {
        chordName = note + ' Power chord'
        
      }       
    })
    return chordName
  } else if (noteArray.length === 3) {
    let match
    
    match = checkThreeNoteChord(noteArray, 'Major')
    //console.log(match)
    if (match.length === 3) {
      chordName = match.pop() + ' Major'
      return chordName
    } else {
      match = checkThreeNoteChord(noteArray, 'Minor')
    }
    //console.log(match)
    if (match.length === 3) {
      chordName = match.pop() + ' Minor'
      return chordName
    } else {
      match = checkThreeNoteChord(noteArray, 'Diminished') 
    }
    //console.log(match)
    if (match.length === 3) {
      chordName = match.pop() + ' Diminished'
      return chordName
    } else {
      match = checkThreeNoteChord(noteArray, 'Augmented') 
    }
    //console.log(match)
    if (match.length === 3) {
      chordName = match.pop() + ' Augmented'
      return chordName
    }


    
  }

  
}

const checkThreeNoteChord = function (noteArray, chord) {
  let match
  noteArray.every(function(rootNote) {  
    
    match = []
    match = noteArray.filter(function(note, index) {
      const i = (index + 1) % noteArray.length
      if (chordMusic[chordMusic.indexOf(rootNote) + chords[chord].dis[0]] === noteArray[i]) {
        //console.log(noteArray[i])
        //console.log(match)
        return noteArray[i]
                   
      } else if (chordMusic[chordMusic.indexOf(rootNote) + chords[chord].dis[1]] === noteArray[i]) {
        //console.log(noteArray[i])
        //console.log(match)
        return noteArray[i]
        
      } 
    })
    //console.log(match)
    if (match.length === 2) {
      match.push(rootNote)
      return false
    } else return true
  })
  return match
}

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

const octaves = {

  5: {
    'C': 523.251,
    'C#': 554.365,
    'D': 587.33,
    'D#': 622.254,
    'E': 659.255,
    'F': 698.456,
    'F#': 739.989,
    'G': 783.991,
    'G#': 830.609,
    'A': 880,
    'A#': 932.328,
    'B': 987.767
  },
  
  4: {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.67,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88
  },
  
  3: {
    'C': 130.81,
    'C#': 138.59,
    'D': 146.83,
    'D#': 155.56,
    'E': 164.81,
    'F': 174.61,
    'F#': 185.00,
    'G': 196.00,
    'G#': 207.65,
    'A': 220.00,
    'A#': 233.08,
    'B': 246.94
  },
  
  2: {
    'C': 65.406,
    'C#': 69.296,
    'D': 73.416,
    'D#': 77.782,
    'E': 82.407,
    'F': 87.31,
    'F#': 92.50,
    'G': 98.00,
    'G#': 103.83,
    'A': 110.00,
    'A#': 116.54,
    'B': 123.47
  },
  last: null

}

const getNoteIndexDistance = function (octave, current, noteArray) {
  return Math.abs(noteArray.indexOf(octave) - noteArray.indexOf(current))
}

const getHigherNoteFreq = function (highestNote, divider, note, stringSet) {
  const octave = octaves[5][highestNote] / divider
  console.log(octave)
  let noteFreq = octave
  for (let i = 0; i < getNoteIndexDistance(highestNote, note, stringSet); i++) {
    noteFreq = noteFreq * 1.05946309
  }
  console.log(noteFreq)
  return noteFreq
}

const getLowerNoteFreq = function (highestNote, divider, note, stringSet) {
  const octave = octaves[5][highestNote] / divider
  console.log(octave)
  let noteFreq = octave
  for (let i = 0; i < getNoteIndexDistance(highestNote, note, stringSet); i++) {
    noteFreq = noteFreq / 1.05946309
  }
  console.log(noteFreq)
  return noteFreq
}

const getNextFreq = function (string, num, note, noteSet) {
  // Find the octave, start with highest possible note  
  const highestNote = noteSet[0][noteSet[0].length - 1]
  // Determine if the clicked on note is higher or lower in the array than the octave
  console.log(noteSet[string].indexOf(note))
  console.log(noteSet[string].indexOf(highestNote))
  if (noteSet[string].indexOf(note) > noteSet[string].indexOf(highestNote)) {
    //console.log((string + 1))
    let noteFreq = null
    if (string === 0) {
      noteFreq = getHigherNoteFreq(highestNote, 1, note, noteSet[string])
    } else if (string === 1 || string === 2) {
      noteFreq = getHigherNoteFreq(highestNote, 2, note, noteSet[string])
    } else if (string === 3 || string === 4 || string === 5) {
      noteFreq = getHigherNoteFreq(highestNote, 4, note, noteSet[string])
    } else if (string === 5) {
      //noteFreq = octaves[3][note] 
    } else if (string === 6 || string === 7) {
      noteFreq = getHigherNoteFreq(highestNote, 4, note, noteSet[string])
    }
      
    console.log(noteFreq)
    return noteFreq
  } else if (noteSet[string].indexOf(note) <= noteSet[string].indexOf(highestNote)) {
    let noteFreq =null
    if (string === 0) {
      noteFreq = getLowerNoteFreq(highestNote, 1, note, noteSet[string])
    } else if (string === 1 || string === 2) {
      noteFreq = getLowerNoteFreq(highestNote, 2, note, noteSet[string])
    } else if (string === 3 || string === 4 || string === 5) {
      noteFreq = getLowerNoteFreq(highestNote, 4, note, noteSet[string])
    } else if (string === 5) {
      ///noteFreq = octaves[3][note] 
    } else if (string === 6 || string === 7) {
      noteFreq = getLowerNoteFreq(highestNote, 4, note, noteSet[string])
    }
      
    console.log(noteFreq)
    return noteFreq
  }
  console.log(noteSet)
  console.log(note)
  //console.log(num)
  console.log(highestNote)
  
  
}

const loadAudio = function (tone) {
  try {window.AudioContext = window.AudioContext || window.webkitAudioContext
    const context = new AudioContext()
    const volume = context.createGain()
    volume.gain.value = 1.5
    volume.connect(context.destination)

    const now = context.currentTime
    const oscillator = context.createOscillator()
    oscillator.type = 'sine'
    oscillator.connect(volume)
    oscillator.frequency.value = tone
    oscillator.start(now)
    oscillator.stop(now + 0.5)

  }
  catch (e) {
    console.log(e)
  }
}




module.exports = {
  getRowNotes,
  getFourth,
  getNextFreq,
  loadAudio,
  getChordName
}