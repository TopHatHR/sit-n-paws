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

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: exampleListingData,
      openDrawer: false,
      openPostListing: false,
    }

    this.touchTap = () => {
      this.setState({openDrawer: !this.state.openDrawer});
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

        // drawer

        // partial profile

        <ListingsContainer listings={this.state.listings} />
        <Drawer width={200} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="My Profile" onLeftIconButtonTouchTap={this.touchTap}/>
          <h1>You are currently logged in as: </h1>
        </Drawer>
        <Dialog
          modal={false}
          open={this.state.openPostListing}
          onRequestClose={this.postListing}
        >
          <PostListing open={this.state.openPostListing} handleClose={this.PostListing} />
        </Dialog>


      </div>
      </MuiThemeProvider>
    )
  }
}
