import React from 'react'
import AdminFirstLevelTableComponent from 'components/app/AdminCategoryTable'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'
import { Pagination, Row, Col, Select, Empty } from 'antd'
import { WrapperAdminCategoryList } from './AdminCategoryList.style'

const AdminCategoryListComponent = props => {
    const {
        dataSources,
        stateCategory,
        onChangePageSize,
        onChangePage,
        onShowDetails,
        pageNumber,
        onChangeDetailsPageNumberAndSize,
        orgLevel
    } = props

    const renderMappingContent = array =>
        array.map((item, index) => (
            <AdminFirstLevelTableComponent
                key={index}
                isOdd={index % 2 == 0}
                id={item.id}
                name={item.name}
                onShowDetails={onShowDetails}
                details={item.second}
                onChangeDetailsPageNumberAndSize={onChangeDetailsPageNumberAndSize}
            />
        ))

    return (
        <WrapperAdminCategoryList>
            <Row className="mb-3">
                <Col span={24}>
                <Select defaultValue={stateCategory.pageable.pageSize} onChange={onChangePageSize}>
                    <Select.Option value="10">10</Select.Option>
                    <Select.Option value="25">25</Select.Option>
                    <Select.Option value="50">50</Select.Option>
                    <Select.Option value="100">100</Select.Option>
                </Select>
                &nbsp;件表示
                </Col>
            </Row>
            {isEmpty(dataSources) && <Empty />}
            {!isEmpty(dataSources) && renderMappingContent(dataSources)}
            <Row>
                <Col span={12}>
                    {stateCategory.totalElements} 件中 {(pageNumber - 1) * stateCategory.pageable.pageSize + 1} から {stateCategory.pageable.pageSize * pageNumber > stateCategory.totalElements ? stateCategory.totalElements : stateCategory.pageable.pageSize * pageNumber}{' '}
                    まで表示
                </Col>
                <Col span={12} style={{ textAlign: 'right' }}>
                    <Pagination
                        current={pageNumber}
                        total={stateCategory.totalElements}
                        pageSize={stateCategory.size}
                        onChange={onChangePage}
                    />
                </Col>
            </Row>
        </WrapperAdminCategoryList>
    )
}

AdminCategoryListComponent.propTypes = {
    dataSources: PropTypes.array,
}

export default AdminCategoryListComponent