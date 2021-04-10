import React from 'react'
import { Helmet } from 'react-helmet'
import CategoryListContainer from 'containers/AdminCategoryList'

const CategoryListPage = () => {
    return (
        <div>
            <Helmet title="カテゴリーマスター" />
            <CategoryListContainer />
        </div>
    )
}

export default CategoryListPage