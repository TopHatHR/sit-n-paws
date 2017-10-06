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

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: [],
      query: '',
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
    };

    this.getListings = (query) => {
      this.get(query);
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
        <Drawer width={200} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="My Profile" onLeftIconButtonTouchTap={this.touchTap}/>
          <h1>You are currently logged in as: </h1>
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
