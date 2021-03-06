import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const fields = () => (
    {
      type,
      value,
      onChange
    }
  )

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset,
    fields
  }
}