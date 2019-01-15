import React, { Component } from 'react'
import './App.scss'
import { Route, Link } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

import FretBoard from './FretBoard.js'

const defaultTuning = [
  {
    id: 'none',
    title: 'Standard E',
    strings: 6,
    notes: [
      ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'],
      ['B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#'],
      ['G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#'],
      ['D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#'],
      ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'],
      ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#']
    ]
  }
]

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      flashMessage: '',
      flashType: null
    }
    

  }



  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  flash = (message, type) => {
    this.setState({ flashMessage: message, flashType: type })

    clearTimeout(this.messageTimeout)

    this.messageTimeout = setTimeout(() => this.setState({flashMessage: null
    }), 2000)
  }

  render () {
    const { flashMessage, flashType, user } = this.state

    return (
      <React.Fragment>
        {/*<Header user={user} />*/}
        {flashMessage && <h3 className={flashType}>{flashMessage}</h3>}
        
        <main className="container">
          {/*
                    <Route path='/sign-up' render={() => (
                      <SignUp flash={this.flash} setUser={this.setUser} />
                    )} />
                    <Route path='/sign-in' render={() => (
                      <SignIn flash={this.flash} setUser={this.setUser} />
                    )} />
                    <AuthenticatedRoute user={user} path='/sign-out' render={() => (
                      <SignOut flash={this.flash} clearUser={this.clearUser} user={user} />
                    )} />
                    <AuthenticatedRoute user={user} path='/change-password' render={() => (
                      <ChangePassword flash={this.flash} user={user} />
                    )} /> */}
          
          

          <h1 className='title text-center'>
            <span style={{color: 'blue'}}>F</span>
            <span style={{color: 'black'}}>r</span>
            <span style={{color: 'blue'}}>e</span>
            <span style={{color: 'black'}}>t</span>
            <span style={{color: 'blue'}}>R</span>
            <span style={{color: 'black'}}>e</span>
            <span style={{color: 'blue'}}>a</span>
            <span style={{color: 'black'}}>c</span>
            <span style={{color: 'blue'}}>t</span>
          </h1>                    

          {defaultTuning.map(tuning => (
            <FretBoard 
              key={tuning.id}
              title={tuning.title + '   ' + this.state.chordName}
              strings={tuning.strings}
              notes={tuning.notes}
              
              
            />
          ))}  
        </main>
        
      </React.Fragment>
    )
  }
}

export default App
