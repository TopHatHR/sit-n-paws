import React from 'react';
import ListingsContainer from './listingsContainer.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PostListing from './PostListing.js';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Pets from 'material-ui/svg-icons/action/pets';
import Dialog from 'material-ui/Dialog';
import Search from './search.js'
import RaisedButton from 'material-ui/RaisedButton';
import ProfileUpdate from './profileForm.js';
import ShowProfile from './showProfile.js';
import request from 'superagent';
import masterUrl from '../utils/masterUrl.js';


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
        style={{background: 'rgb(197, 186, 155)'}}
        >

        </AppBar>
        <br/>

        <Search onChange={this.handleChange}/>
        <br/>

        <ListingsContainer listings={this.state.listings} />
        <Drawer width={400} openSecondary={true} open={this.state.openDrawer} >
          <AppBar title="Sit-n-Paws Profile" onLeftIconButtonTouchTap={this.touchTap} style={{background: 'rgb(197, 186, 155)'}}/>
          <ShowProfile/>
          <RaisedButton onClick={this.profileOnClick} label="Edit Profile" labelColor="white" style={this.styles} backgroundColor="rgb(197, 186, 155)" />
          <RaisedButton onClick={this.logoutOnClick} label="Log Out" secondary={true} style={this.styles}/>
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
