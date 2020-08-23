import React, { Component } from 'react'
import SvgIcon from './SvgIcon'

class ActionControls extends Component {
  render() {
    return (
      <div className="mt-auto mb-auto test-component">
        <div className="col-xl-4 justify-content-center">
          <div className="row text-center">
            <button
              id="moveToRight"
              type="button"
              className={`btn btn-icon btn-${
                this.props.activateSourceAction ? 'primary' : 'light'
              }`}
              disabled={this.props.activateSourceAction ? '' : 'disabled'}
              onClick={() =>
                this.props.handleUpDownEvents === 'true'
                  ? this.props.handleUpDownAction(true)
                  : this.props.handleTransferAction(true)
              }
            >
              <SvgIcon
                className={this.props.firstActionIcon}
                SVGString={this.props.firstSVGString}
              />
            </button>
          </div>
          <div className="row text-center">
            <button
              id="moveToLeft"
              type="button"
              className={`btn btn-icon mt-1 btn-${
                this.props.activateTargetAction ? 'primary' : 'light'
              }`}
              disabled={this.props.activateTargetAction ? '' : 'disabled'}
              onClick={event =>
                this.props.handleUpDownEvents === 'true'
                  ? this.props.handleUpDownAction(false)
                  : this.props.handleTransferAction(false)
              }
            >
              <SvgIcon
                className={this.props.secondActionIcon}
                SVGString={this.props.secondSVGString}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ActionControls
