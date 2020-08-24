import React, { Component } from 'react'
import Container from './Container'
import ActionControls from './ActionControls'

class Transfer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: this.getRequiredStateStructure(
        this.props.sourceItems || [],
        true
      ),
      target: this.getRequiredStateStructure(
        this.props.targetItems || [],
        false
      ),
      selectedKeys: []
    }
  }

  getRequiredStateStructure(input, listFlag) {
    let requiredStateCollection = []
    input.reduce((accumulator = {}, item, index) => {
      accumulator['key'] = listFlag ? index + 1 : input.length + index + 1
      accumulator['title'] = isNaN(item) ? item : `Item-` + item
      accumulator['isSource'] = listFlag
      accumulator['selected'] = false
      requiredStateCollection.push(accumulator)
    }, {})
    return requiredStateCollection
  }

  handleOnChange = (checked, item) => {
    console.log('Selected Items: ', item)
    console.log(checked)

    if (item && item.allSelection && item.allSelection === true) {
      //item.selected = checked ? !checked : !item.selected
      let changedSelectedState = (item.isSource
        ? this.state.source
        : this.state.target
      ).map(item => {
        return {
          ...item,
          selected:
            (item.isSource ? this.state.source : this.state.target).filter(
              item => item.selected === true
            ).length !==
            (item.isSource ? this.state.source : this.state.target).length
              ? true
              : !checked
        }
      })
      console.log('changedSelectedState Items: ', changedSelectedState)
      let stateObject = {}
      stateObject[item.isSource ? 'source' : 'target'] = changedSelectedState
      this.setState(stateObject)
      //return
    } else {
      item.selected = !item.selected
    }

    /* let filterdSource = (item.isSource
      ? this.state.source
      : this.state.target
    ).filter(element => item.isSource === element.key) */

    if (!checked) {
      this.setState({
        selectedKeys: [...this.state.selectedKeys, item]
      })
    } else {
      let filterdSelected = this.state.selectedKeys.filter(
        element => item.key !== element.key
      )
      this.setState({
        selectedKeys: filterdSelected
      })
    }
  }

  handleTransferAction = moveRightToLeft => {
    let {
      ['true']: filteredSelected,
      ['false']: filteredSource
    } = (moveRightToLeft ? this.state.source : this.state.target).reduce(
      (accumulator, item) => {
        accumulator[item.selected] = [
          ...(accumulator[item.selected] || []),
          item
        ]
        return accumulator
      },
      {}
    )

    filteredSelected = filteredSelected.map(item => {
      return {
        ...item,
        isSource: !item.isSource,
        selected: !item.selected
      }
    })

    console.log('filteredSelected', filteredSelected)
    console.log('filteredSource', filteredSource)

    if (moveRightToLeft) {
      this.setState({
        source: filteredSource || [],
        target: [...this.state.target, ...filteredSelected]
      })
    } else {
      this.setState({
        source: [...this.state.source, ...filteredSelected],
        target: filteredSource || []
      })
    }
  }

  handleUpDownAction = moveUp => {
    console.log(moveUp)
    console.log(this.state.target)
    let targetList = Object.assign([], this.state.target)
    let selectedList = Object.assign([], this.state.target)
      .filter(element => element.selected === true)
      .sort(function(a, b) {
        return parseInt(a.key) - parseInt(b.key)
      })
    //return
    var groupedItem = [],
      temp = [],
      difference
    selectedList.forEach((selectedItem, index) => {
      let originalIndex = targetList.findIndex(
        item => item.key === selectedItem.key
      )
      if (difference !== originalIndex - index) {
        if (difference !== undefined) {
          groupedItem.push(temp)
          temp = []
        }
        difference = originalIndex - index
      }
      temp.push(selectedItem)
    })

    if (temp.length) {
      groupedItem.push(temp)
    }

    console.log('groupedItem=>', groupedItem)

    //return
    selectedList.forEach((selectedItem, index) => {
      let fromIndex = targetList.findIndex(
        item => item.key === selectedItem.key
      )
      console.log('fromIndex', fromIndex)
      let objectToMove = targetList.splice(fromIndex, 1)[0]

      console.log('objectToMove =>', objectToMove)

      let matchedArray = groupedItem.filter(item => {
        return item.some(selected => {
          return selectedItem.key === selected.key
        })
      })[0]

      console.log('To INdex with matchedArray', fromIndex - 1)

      let toIndex = moveUp
        ? fromIndex - matchedArray.length >= 0
          ? selectedList.length - 1 === targetList.length
            ? index
            : fromIndex - 1
          : targetList.length
        : fromIndex + matchedArray.length <= targetList.length
        ? fromIndex + matchedArray.length
        : 0
      // insert stored item into position `to`
      console.log('To INdex', toIndex)
      targetList.splice(toIndex, 0, objectToMove)
    })

    this.setState({
      target: targetList
    })
  }

  render() {
    console.log('Transfer.js Render', this)
    return (
      <div>
        <div className="row">
          <div className="col-xl-12">
            <div className="row mt-sm-5 mt-3 mb-3 justify-content-center">
              <Container
                listItems={this.state.source}
                title={(this.props.titles && this.props.titles[0]) || 'Source'}
                checkBoxLabel="source"
                handleOnChange={this.handleOnChange}
              />
              <ActionControls
                firstActionIcon="bi bi-chevron-right"
                secondActionIcon="bi bi-chevron-left"
                activateSourceAction={
                  this.state.source.filter(item => item.selected === true)
                    .length > 0
                }
                activateTargetAction={
                  this.state.target.filter(item => item.selected === true)
                    .length > 0
                }
                handleTransferAction={this.handleTransferAction}
                firstSVGString="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                secondSVGString="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
              <Container
                listItems={this.state.target}
                title={(this.props.titles && this.props.titles[1]) || 'Target'}
                checkBoxLabel="target"
                handleOnChange={this.handleOnChange}
              />
              <ActionControls
                firstActionIcon="bi bi-chevron-up"
                secondActionIcon="bi bi-chevron-down"
                handleUpDownAction={this.handleUpDownAction}
                activateSourceAction={
                  this.state.target.filter(item => item.selected === true)
                    .length > 0
                }
                activateTargetAction={
                  this.state.target.filter(item => item.selected === true)
                    .length > 0
                }
                firstSVGString="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                secondSVGString="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                handleUpDownEvents={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Transfer
