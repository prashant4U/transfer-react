# Transfer Component

Simple, configurable Transfer Component built using react.

This component mainly focuses on Transfer of Items from left to right and vice versa provided with two lists and items from right lists are re-orderable by up and down direction respectively.

Features Provided:

1. Select items i.e. move items from left to right from left List
2. Select items i.e. move items from right to left from right List
3. Reorder selections i.e. items in right list only (move up and down)

## Execution Steps

In the project directory, you have to install dependencies first:

```shell
npm install
```

after completing with dependencies In the project directory, you can run:

```shell
npm start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Folders structure of this project:

```shell
└──transfer-react
   ├── public
   │     └── index.html
   ├── src
         ├── components
         ├── css
         └── test
```

## Example Usage

```js
import React, { Component } from 'react'
import '../css/styles.css'
import Transfer from './components/Transfer'

// a example to test

const sourceData = []
for (let i = 0; i < 10; i++) {
  sourceData.push((i + 1).toString())
}

const targetData = []
for (let i = 0; i < 10; i++) {
  targetData.push((i + 11).toString())
}

const titles = ['Source', 'Target']

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
            titles={titles}
          />
        </div>
      </div>
    )
  }
}

export default App
```

## Props you can send

## sourceItems

```js
e.g const sourceData = ["Audi", "BMW", "Jaguar", "Mercedes" , "VW"]
```

## targetItems

```js
e.g const targetData = ["Ferrari", "Ford", "GMC", "Lamborghini", "Toyota"]
```

## titles

```js
e.g const titles = ['Source', 'Target']
```

## Note

you can also set only array elements for sourceItems and targetItems as [1,2,3,4,5,6..10] and [11,12,13,14,15,16..20] respectively, just in place of number you are now going to see Item1, Item2 and go on in the two list, and for titles the defaults labels are the `Source` and `Target`

## Unit Testing

have used `RITEway Testing Framework` for unit testing purpose, RITEway produces standard TAP output, so it's easy to integrate with just about any test formatter and reporting tool. (TAP is a well established standard with hundreds (thousands?) of integrations).

you can run test cases using below command

```shell
npm test
```
