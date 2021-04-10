import styled from '@emotion/styled'

export const WrapperListing = styled.div`
  position: relative;
`

export const WrapperListingSearch = styled.div`
  position: relative;
  .ant-form-inline .ant-form-item {
    width: 100%;
    .ant-form-item-label {
      width: 30%;
      text-align: left;
    }
  }
  .ant-col .ant-form-item-control-wrapper {
    width: 70%;
  }
`

export const WrapperChekbox = styled.div`
  .ant-checkbox-wrapper {
    margin-right: 25px !important;
  }
`

export const WrapCard = styled.div`
  cursor: pointer !important;
  margin: 4px 0;
  .ant-card {
    .ant-card-body {
      padding: 5px 12px !important;
    }
  }
  .active {
    background-color: #1890ff;
    color: #fff;
  }
`

export const WrapCheckbox = styled.div`
  .ant-checkbox-wrapper:first-child {
    margin-left: 8px;
  }
`

export const WrapperButtonPrefix = styled.div`
  .ant-input-affix-wrapper .ant-input:not(:first-child) {
    padding-left: 11px;
  }
`
