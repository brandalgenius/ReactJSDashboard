import styled from '@emotion/styled'

export const WrapperForm = styled.div`
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
  .ant-input-group-addon {
    background: none;
    border: none;
    padding: 0;
    padding-right: 0px;
    padding-right: 8px;
  }
  .bookmark {
    background: #ffed60;
    border: none;
    :hover {
      border: none;
      color: unset;
    }
  }
  .item-delivery {
    background: #8cb4ff;
    border: none;
    :hover {
      border: none;
      color: unset;
    }
  }
  .application-area {
    background: #47ffc3;
    border: none;
    :hover {
      border: none;
      color: unset;
    }
  }
`
