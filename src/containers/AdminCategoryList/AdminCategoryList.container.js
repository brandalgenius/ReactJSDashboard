import React, { useState, useEffect } from 'react'
import AdminCategoryListComponent from './AdminCategoryList.component'
import { useSelector, useDispatch } from 'react-redux'
import adminCategoryService from 'services/admin/category/adminCategoryService'

const AdminCategoryListContainer = () => {
    const stateCategory = useSelector(state => state.category)
    const stateUser = useSelector(state => state.user)
    const [pageNumber, setPageNumber] = useState(1)
    const [refetch, setRefetch] = useState(0)
    const [category, setCategory] = useState({
        categoryId: null,
        level: null,
        size: null,
        pageNumber: null
    })
    const dispatch = useDispatch()

    const onChangePageSize = value => {
        if (parseInt(value) * pageNumber > stateCategory.totalElements) {
            setPageNumber(Math.floor(stateCategory.totalElements / parseInt(value)) + 1)
        }
        dispatch({
            type: 'category/PAGE',
            payload: {
                size: parseInt(value),
            },
        })
        setRefetch(refetch + 1)
    }

    const onChangeDetailsPageNumberAndSize = value => {
        dispatch({
            type: 'category/PAGE',
            payload: {
                detailSize: parseInt(value.size),
                detailPageNumber: parseInt(value.pageNumber)
            },
        })
        setRefetch(refetch + 1)
    }

    const onChangePage = value => {
        dispatch({
            type: 'category/PAGE',
            payload: {
                number: parseInt(value),
            },
        })
        setPageNumber(parseInt(value))
        setRefetch(refetch + 1)
    }

    const onShowDetails = (id, level, size, number) => {
        dispatch({
            type: 'category/PAGE',
            payload: {
                categoryId: id,
                level: level
            },
        })
        setCategory({
            categoryId: id,
            level: level,
            size: size,
            pageNumber: number
        })
    }

    useEffect(() => {
        const LOAD_DATA = async () => {
            await adminCategoryService
            .GET_FIRST_LEVEL_PAGE(stateCategory.number, stateCategory.size, stateUser.token)
            .then(search => {
                dispatch({
                    type: 'category/SUBMIT',
                    payload: {
                        content: search.content,
                        pageable: search.pageable,
                        totalPages: search.totalPages,
                        totalElements: search.totalElements,
                        last: search.last,
                        first: search.first,
                        sort: search.sort,
                        size: search.size,
                        number: search.number,
                        numberOfElements: search.numberOfElements,
                        empty: search.empty,
                    },
                })
            })
        }
        LOAD_DATA()
    }, [refetch])

    useEffect(() => {
        const LOAD_SECOND_LEVEL_DETAILS = async () => {
            await adminCategoryService
            .GET_SECOND_LEVEL_PAGE(category.pageNumber, category.size, stateCategory.categoryId, stateUser.token)
            .then(details => {
                const page = {
                    ...details,
                    content: details.content.map(c => c.id != null ? { ...c, third: {} } : c)
                }
                const content = stateCategory.content.map(c =>
                    // c.id === stateCategory.categoryId ? { ...c, details: details } : c,
                    c.id === stateCategory.categoryId ? { ...c, second: page } : c,
                )
                dispatch({
                    type: 'category/SUBMIT',
                    payload: {
                        content: content,
                    },
                })
            })
        }

        const LOAD_THIRD_LEVEL_DETAILS = async () => {
            await adminCategoryService
            .GET_THIRD_LEVEL_PAGE(category.pageNumber, category.size, stateCategory.categoryId, stateUser.token)
            .then(details => {
                const content = stateCategory.content.map(c =>
                        (typeof c.second != 'undefined' && Object.entries(c.second).length >= 0) ?
                        {
                            ...c,
                            second: {
                                ...c.second,
                                content: c.second.content.map(d => d.id === stateCategory.categoryId ? { ...d, third: details } : d)
                            }
                        }
                        :
                        c
                    )
                dispatch({
                    type: 'category/SUBMIT',
                    payload: {
                        content: content,
                    },
                })
            })
        }

        if (category.level === 2) LOAD_SECOND_LEVEL_DETAILS()
        else if (category.level === 3) LOAD_THIRD_LEVEL_DETAILS()
    }, [category])

    return (
        <div>
            <AdminCategoryListComponent
                dataSources={stateCategory.content}
                stateCategory={stateCategory}
                onChangePageSize={onChangePageSize}
                onChangePage={onChangePage}
                onShowDetails={onShowDetails}
                pageNumber={pageNumber}
                onChangeDetailsPageNumberAndSize={onChangeDetailsPageNumberAndSize}
                orgLevel={stateCategory.level}
            />
        </div>
    )
}

export default AdminCategoryListContainer
