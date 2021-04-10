import React, { Fragment } from 'react'
import RelatedContainer from 'containers/ListingRelated'

function Related() {
  return (
    <Fragment>
      <span>
        <span class="style_arrow__CprVP"></span>
        <strong class="style_current__D-Pfn">関連情報</strong>
      </span>
      <RelatedContainer />
    </Fragment>
  )
}

export default Related
