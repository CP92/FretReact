# FretReact

## The details

FretReact is a redesign of my [fretmapper](https://github.com/CP92/fret-mapper-client) web app.

This app is used to help visualize the fretboard of a guitar. The dropdown menus on the left represent the open string notes and depending on what note these are set to will change the notes on the right representing the notes at the individual frets.

The main differences:
1. FretReact is built using the React framework from the ground up.
2. The current version has no need for authentication or an API. So users can freely use the app without needing to sign-up/sign-in.
3. Due to the lack of a backend API this means that you are no longer able to save personal custom tunings. This feature will be looked at again in the future, but is not currently the primary feature being worked on. However, this will (eventually) be circumvented by adding preset tunings.

## Future features

1. (Primary) Allow the user to click on a fret and using web audio API the correct note with be played through the users speakers.
2. Allow the user to toggle between showing 11 frets and 23 frets.
3. The ability to highlight multiple frets (chords) and play the chord.

