import React from 'react';
import ListingsContainer from './listingsContainer.js';
import PostListing from './PostListing.js';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';
import Search from './search.js'
import masterUrl from '../utils/masterUrl.js';
import request from 'superagent';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

// This component is the upper level component for all other components.
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


    // Drawer - Opens the side drawer for my profile
    this.touchTap = () => {
      this.setState({openDrawer: !this.state.openDrawer});
    }

    // Drawer - Styles for the side drawer buttons
    this.styles = {
      margin: 40,
    }

    // Drawer - Handles logout by removing jwt token and refreshing the page
    this.logoutOnClick = (event) => {
      localStorage.removeItem('jwt');
      window.location.reload();
    }

    // Drawer - Renders Edit Your Profile when Edit Profile button is clicked
    this.profileOnClick = (event) => {
      this.setState({renderProfile: !this.state.renderProfile});
    }

    // PostListing - Opens modal to post a listing
    this.postListing = () => {
      this.setState({openPostListing: !this.state.openPostListing});
    }

    // Search - live search by zipcode
    this.handleSearch = (term) => {
      const url = `/listings/${term}`;
      request.get(url, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          this.setState({ listings:res.body });
        }
      });
    }
  }

  // Populates listings on load
  componentDidMount() {
    this.handleSearch('');
  }

  // Renders AppBar, Search, Drawer, and PostListing
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
        style={{background: 'rgb(197, 186, 155)'}}
        >
        </AppBar>
        <br/>
        <Search onChange={this.handleSearch}/>
        <br/>
        <ListingsContainer listings={this.state.listings} />
        <Drawer width={400} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.touchTap} style={{background: 'rgb(197, 186, 155)'}}/>
          <ShowProfile/>
          <RaisedButton onClick={this.profileOnClick} label="Edit Profile" labelColor="white" style={this.styles} backgroundColor="rgb(197, 186, 155)" />
          <RaisedButton onClick={this.logoutOnClick} label="Log Out" labelColor="white" style={this.styles} backgroundColor="rgb(171, 94, 94)"/>
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
