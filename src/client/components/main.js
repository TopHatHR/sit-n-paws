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
import InboxContainer from './inbox.js';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      query: '',
      openDrawer: false,
      openPostListing: false,
      renderInbox: false,
      renderProfile: false,
    }

    this.touchTap = () => {
      this.setState({openDrawer: !this.state.openDrawer});
    }

    this.get = (query) => {
      var url = 'http://localhost:3000/listings';
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // if (data.zipcode === )
        this.setState({listings: data});
      })
      .catch((err) => {
        console.log(err);
      });
    }

    this.getListings = (query) => {
      this.get(query);
    }
    this.styles = {
    margin: 40,
    }

    this.inboxOnClick = (event) => {
      this.setState({renderInbox: !this.state.renderInbox});
    }

    this.profileOnClick = (event) => {
      this.setState({renderProfile: !this.state.renderProfile});
    }

    this.postListing = () => {
      this.setState({openPostListing: !this.state.openPostListing});
    }
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
        <h1>MAIN COMPONENT</h1>
        <Search onClick={this.getListings.bind(this)}/>
        // drawer

        // partial profile

        <ListingsContainer listings={this.state.listings} />
        <Drawer width={400} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.touchTap}/>
          <ShowProfile/>
          <RaisedButton onClick={this.profileOnClick} label="Edit Profile" primary={true} style={this.styles} />
          <RaisedButton onClick={this.inboxOnClick} label="Inbox" primary={true} style={this.styles}/>
          {this.state.renderInbox ? <InboxContainer/> : null}
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
