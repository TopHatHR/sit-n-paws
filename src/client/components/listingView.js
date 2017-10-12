import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import jwt from 'jsonwebtoken';
import request from 'superagent';
import masterUrl from '../utils/masterUrl.js';

// This is the component for each individual listing.
// It has its own state to manage the email information
// of each individual listing.
export default class ListingView extends React.Component {
  constructor(props) {
    super (props);

    this.state = {
      hostEmail: props.listing.email,
      ownerEmail: null,
      open: false,
      date: null,
    }

    // Opens the modal upon clicking contact me
    this.handleOpen = () => {
      this.setState({open: true});
    }

    // Closes the modal upon clicking contact me
    this.handleClose = () => {
      this.setState({open: false});
    }

    // Handles the date change in contact me
    this.handleChangeDate = (e, date) => {
      this.setState({date: date});
      console.log(date);
    }

    // Sends the email by posting to the /contacthost endpoint on the server
    this.handleSendEmail = () => {
      this.setState({open: false});
      const url = `${masterUrl}/contacthost`;
      request
        .post(url)
        .send({
          ownerEmail: this.state.ownerEmail,
          hostEmail: this.state.hostEmail,
          date: JSON.stringify(this.state.date)
        })
        .end((err, res) => {
          if (err) {
            console.log('There was an error sending email: ', err)
          } else {
            console.log(res);
          }
        });
    }
  }

  // When component loads, retrieves and decodes jwt and extracts user's email
  // from token.
  componentDidMount() {
    var token = localStorage.jwt;
    var decoded = jwt.decode(token);
    this.setState({ownerEmail: decoded.email});
  }

  render() {
    // These are the action buttons for the Dialog
    const actions = [
      <FlatButton
      label="Cancel"
      secondary={true}
      onClick={this.handleClose}
      />,
      <FlatButton
        label="Send Message"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSendEmail}
      />
    ];

    // Refer to material-ui cards for more info on changing card styles
    // Each props.listing is passed from Main to listingsContainer to listingView
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.listing.name}
            subtitle={"Puppy Lover in: " + this.props.listing.zipcode}
            avatar={this.props.listing.hostPictures}
          />
          <CardMedia
            overlay={<CardTitle title={`$${this.props.listing.cost} Per Night!`} subtitle={this.props.listing.homeAttributes} />}
          >
            <img src={this.props.listing.homePictures} alt="Home Picture" width="360" height="270" />
          </CardMedia>
          <CardTitle title="5 Stars"
           subtitle={`Max Dog Size:${this.props.listing.dogSizePreference}`} />
          <CardText>
            <div className = "listing">
              {`Preferred Dog Breed: ${this.props.listing.dogBreedPreference}. `}
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`}
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Contact Me" onClick={this.handleOpen}/>
            <Dialog
              title= {`Send ${this.props.listing.name} a message`}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
            One last thing...pick a date:
            <DatePicker
              hintText="Pick a Date"
              value={this.state.date}
              onChange={this.handleChangeDate}
            />
            </Dialog>
        </CardActions>
        </Card>
      </div>
    )
  }
}
// ListingView.propTypes = {listing: PropTypes.object.isRequired};
