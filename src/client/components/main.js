import React from 'react';
import ListingsContainer from './listingsContainer.js';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import exampleListingData from '../../public/MOCK_DATA.js';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listings: exampleListingData,
      openDrawer: false,
    }

    this.touchTap = () => {
      this.setState({openDrawer: !this.state.openDrawer});
    }

  }



  render() {
    return (
      <div>
        <AppBar showMenuIconButton={false} iconElementRight={<IconButton><NavigationMenu/></IconButton>} onRightIconButtonTouchTap={this.touchTap} />
        <h1>MAIN COMPONENT</h1>

        // drawer

        // partial profile

        <ListingsContainer listings={this.state.listings} />
        <Drawer width={200} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="My Profile" onLeftIconButtonTouchTap={this.touchTap}/>
          <h1>You are currently logged in as: </h1>
        </Drawer>


      </div>
    )
  }
}
