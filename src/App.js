import React, { Component } from 'react'
import './App.css'

import marked from 'marked'
import { sampleText } from './sampleText'

class App extends Component {
  state = {
    text: sampleText,
    isShow: false,
  }

  componentDidMount() {
    const text = localStorage.getItem('text')

    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText })
    }
  }
  componentDidUpdate() {
    const { text } = this.state
    localStorage.setItem('text', text)
  }

  handleChange = (event) => {
    const text = event.target.value
    this.setState({ text })
  }

  renderText = (text) => {
    const __html = marked(text)
    return { __html }
  }

  handleShowCheatsheet = () => {
    const isShow = !this.state.isShow
    this.setState({ isShow })
  }

  render() {
    const { isShow } = this.state

    let cheatsheet = null
    let content = null

    if (isShow) {
      cheatsheet = (
        <img
          src='https://static.guides.co/uploads/222/images/Screen%20Shot%202013-10-22%20at%209.38.00%20PM.png'
          alt='markdown cheatsheet'
        />
      )
    } else {
      content = (
        <div
          dangerouslySetInnerHTML={this.renderText(this.state.text)}
          className='content pl-4 pt-4'
        />
      )
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-6 mr-5'>
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className='form-control pl-5 pt-5'
              rows='33'
            />
          </div>
          <div className='card col-5' id='cardResult'>
            <button
              className='btn btn-secondary mt-4 ml-4 mr-4'
              onClick={this.handleShowCheatsheet}>
              {isShow
                ? 'Markdown Cheatsheet close'
                : 'Markdown Cheatsheet Open'}
            </button>
            <div className='card mr-1 mb-2 mt-2' id='cardHeader'>
              {cheatsheet}
              {content}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
