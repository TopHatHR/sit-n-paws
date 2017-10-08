import React from 'react';
import ListingsContainer from './listingsContainer.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostListing from './PostListing.js';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';
import exampleListingData from '../../public/MOCK_DATA.js';
import Dialog from 'material-ui/Dialog';
import Search from './search.js'
import RaisedButton from 'material-ui/RaisedButton';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';
import request from 'superagent';

let masterUrl = 'http://107.170.230.18:3000';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      query: '',
      openDrawer: false,
      openPostListing: false,
      renderProfile: false,
    }

    this.handleChange = this.handleChange.bind(this);

    this.touchTap = () => {
      this.setState({openDrawer: !this.state.openDrawer});
    }

    this.styles = {
    margin: 40,
    }

    this.logoutOnClick = (event) => {
      localStorage.removeItem('jwt');
      window.location.reload();
    }

    this.profileOnClick = (event) => {
      this.setState({renderProfile: !this.state.renderProfile});
    }

    this.postListing = () => {
      this.setState({openPostListing: !this.state.openPostListing});
    }
  }

  handleChange(term) {
    const url = masterUrl + `/listings/${term}`;
    request.get(url, (err, res) => {
      if (err) {
        console.log(err);
      } else {
      //console.log('my res body', res.body);
      this.setState({ listings:res.body })
      }
    })
  }

  componentDidMount() {
    this.handleChange('');
  }


  render() {
    return (
      <MuiThemeProvider>
      <div>
        <AppBar
        title="Become A Pet Host!"
        iconElementLeft={<IconButton><Pets/></IconButton>}
        iconElementRight={<IconButton><NavigationMenu/></IconButton>}
        onRightIconButtonTouchTap={this.touchTap}
        onLeftIconButtonTouchTap={this.postListing}
        >

        </AppBar>
        <h1>Search for a Host Here:</h1>

        <Search onChange={this.handleChange}/>
        <br/>

        <ListingsContainer listings={this.state.listings} />
        <Drawer width={400} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.touchTap}/>
          <ShowProfile/>
          <RaisedButton onClick={this.profileOnClick} label="Edit Profile" primary={true} style={this.styles} />
          <RaisedButton onClick={this.logoutOnClick} label="Log Out" primary={true} style={this.styles}/>
          {this.state.renderProfile ? <ProfileUpdate/> : null}
        </Drawer>
        <Dialog
          modal={false}
          open={this.state.openPostListing}
          onRequestClose={this.postListing}
        >
          <PostListing />
        </Dialog>


      </div>
      </MuiThemeProvider>
    )
  }
}
