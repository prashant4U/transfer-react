import React, { useState } from 'react'

const CheckBox = ({ id, className, item = {}, handleOnChange }) => {
  const [checked, setChecked] = useState(item.selected || false)
  return (
    <input
      id={id}
      type="checkbox"
      className={className}
      onChange={() => {
        setChecked(!checked)
        handleOnChange(checked, item)
      }}
      checked={
        id && id.indexOf('checkbox_') > 0 ? item.selected : item.selected
      }
    />
  )
}

export default CheckBox
