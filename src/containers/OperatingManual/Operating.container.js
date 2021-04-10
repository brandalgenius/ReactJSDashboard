import React, { useState, useEffect } from 'react'
import OperatingComponent from './Operating.component'
import publicService from 'services/public/publicService'

const OperatingContainer = () => {
  const [operation, setOperation] = useState([])

  useEffect(() => {
    const LOAD_DATA = async () => {
      await publicService.GET_OPERATION_MANUAL().then(operation => {
        setOperation(operation)
      })
    }
    LOAD_DATA()
  }, [])

  return <OperatingComponent operation={operation} />
}

export default OperatingContainer
