import React, { Component } from 'react'
import Container from './Container'
import ActionControls from './ActionControls'

// This Transfer Component is created using multiple components which is pure in nature and they are bind together for reusability purpose in future.
class Transfer extends Component {
  constructor(props) {
    super(props)
    // set State on Initializations
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
  // this function generate data in our required format using reduce() method
  getRequiredStateStructure = (input, listFlag) => {
    let requiredStateCollection = []
    input.reduce((accumulator = {}, item, index) => {
      accumulator['key'] = listFlag ? index + 1 : input.length + index + 1
      accumulator['title'] = isNaN(item) ? item : `Item-` + item
      accumulator['isSource'] = listFlag
      accumulator['selected'] = false
      requiredStateCollection.push(accumulator)
      return accumulator[index]
    }, {})
    return requiredStateCollection
  }

  // this function send as callback to CheckBox Component for handling state of checked or unchecked
  handleOnChange = (checked, item) => {
    if (item && item.allSelection && item.allSelection === true) {
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
      let stateObject = {}
      stateObject[item.isSource ? 'source' : 'target'] = changedSelectedState
      this.setState(stateObject)
    } else {
      item.selected = !item.selected
    }

    if (!checked) {
      this.setState({
        selectedKeys: [...this.state.selectedKeys, item]
      })
    } else {
      let filteredSelected = this.state.selectedKeys.filter(
        element => item.key !== element.key
      )
      this.setState({
        selectedKeys: filteredSelected
      })
    }
  }

  // this function send as callback to ActionControls Component for transferring items from source to destination and vice versa.
  handleTransferAction = moveRightToLeft => {
    // below function creates seprate list for selected and unSelected Items
    let filteredList = (moveRightToLeft
      ? this.state.source
      : this.state.target
    ).reduce((accumulator, item) => {
      accumulator[item.selected] = [...(accumulator[item.selected] || []), item]
      return accumulator
    }, {})

    let filteredSelected = filteredList['true']
    let filteredSource = filteredList['false']

    filteredSelected = filteredSelected.map(item => {
      return {
        ...item,
        isSource: !item.isSource,
        selected: !item.selected
      }
    })

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

  // this function send as callback to ActionControls Component for up/down reordering of Target List.
  handleUpDownAction = moveUp => {
    // Created Separate Variable to avoid value updation in main target state.
    let targetList = Object.assign([], this.state.target)
    let selectedList = Object.assign([], this.state.target)
      .filter(element => element.selected === true)
      .sort(function(a, b) {
        return parseInt(a.key) - parseInt(b.key)
      })

    var groupedItem = [],
      temp = [],
      difference
    // Below for loop aims to create selected items from right list in group by way so we can treat two selected items as one and move them up/down accordingly.
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

    // Below for loop aims to reiterate selected items place that item according to its new index using array method splice().
    selectedList.forEach((selectedItem, index) => {
      let fromIndex = targetList.findIndex(
        item => item.key === selectedItem.key
      )

      let objectToMove = targetList.splice(fromIndex, 1)[0]

      let matchedArray = groupedItem.filter(item => {
        return item.some(selected => {
          return selectedItem.key === selected.key
        })
      })[0]

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
      targetList.splice(toIndex, 0, objectToMove)
    })

    // set state of target list after changing index
    this.setState({
      target: targetList
    })
  }

  render() {
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
