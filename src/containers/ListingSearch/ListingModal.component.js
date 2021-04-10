import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Card, Icon, Modal, Checkbox, Switch, Spin } from 'antd'
import { WrapperChekbox, WrapCard, WrapCheckbox } from './ListingSearch.style'
import ChecklistPrefectures from 'components/ChecklistPrefectures'
const CheckboxGroup = Checkbox.Group

const objType = {
  isLoading: PropTypes.bool,
  checklistModal: PropTypes.bool,
  handleChecklistModal: PropTypes.func,
  onSubmitChecklist: PropTypes.func,
  titleModal: PropTypes.string,
  typeModal: PropTypes.string,
  handleCheckGroup: PropTypes.func,
  organizationsData: PropTypes.array,
}

const ListingModal = props => {
  const {
    isLoading,
    checklistModal,
    handleChecklistModal,
    onSubmitChecklist,
    titleModal,
    typeModal,
    biddingData,
    biddingCheckedList,
    industryData,
    industryCheckedList,
    handleCheckGroup,
    checkedIndeterminateBidding,
    checkedIndeterminateIndustry,
    industryCheckedAll,
    biddingCheckedAll,
    organizationsData,
    changeCheckedAll,
    organizationLocation,
    organizationSecondDataDisplay,
    handleChangeOrganizations,
    organizationShowDetail,
    handleCheckAll,
    handleChangeRegion,
    regionCheckAll,
    regionIndeterminateCheckAll,
    dataRegion,
  } = props

  const renderChecklistForm = () => {
    if (typeModal === 'organizations') {
      return (
        <Fragment>
          <Col span={8}>
            <Card>
              <Row style={{ marginBottom: 16 }}>
                <Switch defaultChecked onChange={changeCheckedAll} /> 全て✔する
              </Row>
              <Row>
                {organizationsData.length > 0 &&
                  organizationsData.map((val, key) => (
                    <WrapCard
                      key={`first-${key}`}
                      onClick={e => handleChangeOrganizations(e, 'first', val, key)}
                    >
                      <Card className={key === organizationLocation ? 'active' : ''}>
                        <Col span={18}>{val.name}</Col>
                        <Col span={6} style={{ textAlign: 'right' }}>
                          <Icon type="right" />
                        </Col>
                      </Card>
                    </WrapCard>
                  ))}
              </Row>
            </Card>
          </Col>
          <Col span={16}>
            <Card>
              <Row style={{ marginBottom: 16 }}>
                <Checkbox
                  indeterminate={organizationSecondDataDisplay.indeterminate}
                  checked={organizationSecondDataDisplay.checked}
                  onChange={e => handleCheckAll(e, 'organizations')}
                >
                  全て✔する
                </Checkbox>
              </Row>
              <Row style={{ overflow: 'auto', height: 562 }}>
                {organizationSecondDataDisplay.secondLevel.map((val, key) => (
                  <Fragment key={`second-${key}`}>
                    <Col span={24}>
                      <Checkbox
                        val={val.name}
                        key={`${val.name}-${key}`}
                        checked={val.checked}
                        indeterminate={val.indeterminate}
                        onClick={e => handleChangeOrganizations(e, 'second', val, key)}
                      >
                        {val.name}
                      </Checkbox>
                      {val.thirdLevel.length > 0 && (
                        <Button
                          size="small"
                          style={{ height: 18, fontSize: 12 }}
                          onClick={() => organizationShowDetail(val, key)}
                        >
                          詳しく見る
                        </Button>
                      )}
                    </Col>
                    {val.detail && (
                      <Col span={24} style={{ marginLeft: 16 }}>
                        <WrapCheckbox>
                          {val.thirdLevel.map((valThird, keyThird) => (
                            <Checkbox
                              val={valThird.name}
                              key={`${valThird.name}-${keyThird}`}
                              checked={valThird.checked}
                              onClick={e =>
                                handleChangeOrganizations(e, 'third', valThird, keyThird, key)
                              }
                            >
                              {valThird.name}
                            </Checkbox>
                          ))}
                        </WrapCheckbox>
                      </Col>
                    )}
                  </Fragment>
                ))}
              </Row>
            </Card>
          </Col>
        </Fragment>
      )
    } else if (typeModal === 'industry') {
      return (
        <Col span={24}>
          <Card>
            <Row style={{ marginBottom: 16 }}>
              <Checkbox
                indeterminate={checkedIndeterminateIndustry}
                onChange={e => handleCheckAll(e, 'industry')}
                checked={industryCheckedAll}
              >
                全て✔する
              </Checkbox>
            </Row>
            <Row>
              <WrapperChekbox>
                <CheckboxGroup
                  options={industryData}
                  value={industryCheckedList}
                  onChange={checkedList => handleCheckGroup(checkedList, 'industry')}
                />
              </WrapperChekbox>
            </Row>
          </Card>
        </Col>
      )
    } else if (typeModal === 'region') {
      return (
        <WrapperChekbox>
          <ChecklistPrefectures
            regionIndeterminateCheckAll={regionIndeterminateCheckAll}
            handleCheckAll={handleCheckAll}
            regionCheckAll={regionCheckAll}
            dataRegion={dataRegion}
            handleChangeRegion={handleChangeRegion}
          />
        </WrapperChekbox>
      )
    } else if (typeModal === 'bidding') {
      return (
        <Col span={24}>
          <Card>
            <Row style={{ marginBottom: 16 }}>
              <Checkbox
                indeterminate={checkedIndeterminateBidding}
                onChange={e => handleCheckAll(e, 'bidding')}
                checked={biddingCheckedAll}
              >
                全て✔する
              </Checkbox>
            </Row>
            <Row>
              <WrapperChekbox>
                <CheckboxGroup
                  options={biddingData}
                  value={biddingCheckedList}
                  onChange={checkedList => handleCheckGroup(checkedList, 'bidding')}
                />
              </WrapperChekbox>
            </Row>
          </Card>
        </Col>
      )
    }
  }

  return (
    <Modal
      title={titleModal}
      visible={checklistModal}
      width={1240}
      onCancel={handleChecklistModal}
      footer={null}
    >
      <Form layout="inline">
        <Row gutter={[16, 16]}>
          {isLoading ? (
            <Col span={24} style={{ textAlign: 'center' }}>
              <Spin />
            </Col>
          ) : (
            renderChecklistForm()
          )}
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button onClick={onSubmitChecklist} htmlType="submit" type="primary">
              参加する
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

ListingModal.propTypes = objType

export default ListingModal
