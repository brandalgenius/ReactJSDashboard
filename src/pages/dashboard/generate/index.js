import React from 'react'
import { connect } from 'react-redux'
import {CopyToClipboard} from 'react-copy-to-clipboard'



@connect(({ user }) => ({ user }))
class Generate extends React.Component {

  onChange = ({target: {value}}) => {
    this.setState({value, copied: false});
  };

  onClick = ({target: {innerHTML}}) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  onCopy = () => {
    this.setState({copied: true});
  };

  render() {
    const { user } = this.props
    const  state = {value: `https://ads.jalan.ninja/x.php?id=${user.fullName}`, copied: false};
    return (
      <div>
      <div className="cui__utils__heading">
        <strong>Your Affiliate Link</strong>
        </div>
        <h3>https://ads.jalan.ninja/x.php?id={user.fullName}</h3>
        <CopyToClipboard
            onCopy={this.onCopy}
            text={state.value}>
            <button onClick={this.onClick}>Copy Affiliate Link</button>
          </CopyToClipboard>

      </div>

    )
  }
}

export default Generate;
