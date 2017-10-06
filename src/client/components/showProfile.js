import React from 'react';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

export default class ShowProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Name: null,
      Phone: null,
      Address: null
    }

    this.styles = {
      width: 120,
      height: 120
    }


    this.inboxOnClick = (event) => {
    this.setState({renderInbox: !this.state.renderInbox});
    }
  }

  render() {
    return (
      <div className='profileBox'>
        <h1>Name</h1>
        <Avatar style={this.styles}
        alt="Adelle Charles"
        src="https://pbs.twimg.com/profile_images/810142191851016192/Ju6Wj29n_400x400.jpg"
        />
      </div>
    );
  };
}