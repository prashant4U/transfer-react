import React from 'react'
import CheckBox from './CheckBox'
import NoData from './NoData'

const Container = ({
  listItems = [],
  title,
  checkBoxLabel,
  selectedItems,
  handleOnChange
}) => {
  const renderedList = items => {
    return !items.length ? (
      <NoData title="No Data" />
    ) : (
      items.map(item => {
        return (
          <div key={`row_${item.key}`} className="row border mt-1 row-hover">
            <div className="mt-3 ml-1 float-left card-pricing-plan-name font-weight-bold text-uppercase">
              <div className="custom-control custom-checkbox">
                <CheckBox
                  id={`${checkBoxLabel}${item.key}`}
                  className="custom-control-input cursor"
                  item={item}
                  selectedItems={selectedItems}
                  handleOnChange={handleOnChange}
                />
                <label
                  className="custom-control-label cursor"
                  htmlFor={`${checkBoxLabel}${item.key}`}
                >
                  {item.title}
                </label>
              </div>
            </div>
          </div>
        )
      })
    )
  }

  return (
    <div className="col-md-4">
      <div className="card card-pricing shadow-none border">
        <div className="card-header" style={{ paddingLeft: '20px' }}>
          <div className="custom-control custom-checkbox">
            <CheckBox
              id={`checkbox_${title}`}
              className="custom-control-input dt-checkboxes"
              item={{
                selected:
                  listItems.length > 0 &&
                  listItems.filter(item => item.selected === true).length ===
                    listItems.length,
                allSelection: true,
                isSource:
                  listItems.filter(item => item.isSource === true).length > 0
              }}
              handleOnChange={handleOnChange}
            />
            <label
              id="custom-title"
              className="custom-control-label"
              htmlFor={`checkbox_${title}`}
            >
              {title}
            </label>
          </div>
        </div>
        <div
          className="card-body text-center"
          style={{
            height: '524px',
            overflow: 'auto',
            backgroundColor: '#ffffff'
          }}
        >
          {renderedList(listItems)}
        </div>
      </div>
    </div>
  )
}

export default Container
