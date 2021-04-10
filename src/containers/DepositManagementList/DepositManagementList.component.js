import React from 'react'
import { isEmpty } from 'lodash'
import { DepositTable } from 'components'
import { Empty, Row, Col, Pagination } from 'antd'

const DepositManagementListComponent = props => {
  const { depositList, pageNumber, onChangePage, onChangeDateDeposit } = props

  const _renderTable = () => {
    let content = []
    if (!isEmpty(depositList.content)) {
      depositList.content.map(deposit => {
        content.push(
          <DepositTable
            id={deposit.id}
            billingAmount={deposit.billingAmount}
            billingDate={deposit.billingDate}
            depositDate={deposit.depositDate}
            onChangeDateDeposit={onChangeDateDeposit}
          />,
        )
        return ''
      })
    } else {
      content.push(<Empty />)
    }
    return content
  }
  return (
    <div>
      {_renderTable()}
      {!isEmpty(depositList.content) && (
        <Row>
          <Col span={12}>
            {depositList.totalElements} 件中 {(pageNumber - 1) * depositList.pageable.pageSize + 1}{' '}
            から{' '}
            {depositList.pageable.pageSize * pageNumber > depositList.totalElements
              ? depositList.totalElements
              : depositList.pageable.pageSize * pageNumber}{' '}
            まで表示
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Pagination
              current={pageNumber}
              total={depositList.totalElements}
              pageSize={depositList.size}
              onChange={onChangePage}
            />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default DepositManagementListComponent
