import React, { Component } from 'react'
import '../css/styles.css'
import Transfer from './Transfer'

// by assuming am getting array of numbers or text, created dummy data for sourceItems i.e. ["1", "2"...]
const sourceData = []
for (let i = 0; i < 10; i++) {
  sourceData.push((i + 1).toString())
}

// by assuming am getting array of numbers or text, created dummy data for targetData i.e. ["11", "12"...]
const targetData = []
for (let i = 0; i < 10; i++) {
  targetData.push((i + 11).toString())
}

class App extends Component {
  render() {
    return (
      <div>
        <div className="container mb-4 mt-4">
          <div className="row text-center justify-content-center mb-4 mt-4">
            <h4 className="test-component"> {this.props.title} </h4>
          </div>
          <Transfer
            sourceItems={sourceData}
            targetItems={targetData}
            titles={['Source', 'Target']}
          />
        </div>
      </div>
    )
  }
}

export default App
