import React from 'react';
import ListingView from './listingView';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FontIcon from 'material-ui/FontIcon';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import jwt from 'jsonwebtoken';

import {
  blue300,
  indigo900,
  orange200,
  deepOrange300,
  pink400,
  purple500,
} from 'material-ui/styles/colors';

// Shows the profile in the drawer
export default class ShowProfile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      Name: null,
    }

    this.styles = {
      width: 140,
      height: 140
    }

  }
  componentWillMount() {
    var token = localStorage.jwt;
    var decoded = jwt.decode(token);
    this.setState({Name: decoded.username});
  }

  render() {
    return (
      <div className='profileBox'>
        <h1>{this.state.Name}</h1>
        <Avatar style={this.styles}
        backgroundColor='rgba(0,0,0,0)'
        alt="User Picture"
        src="https://i.imgur.com/katTIZJ.png"
        />
      </div>
    );
  };
}
