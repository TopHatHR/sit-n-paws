import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import jwt from 'jsonwebtoken';
import masterUrl from '../utils/masterUrl.js';

export default class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      name: props.listing.name,
      hostEmail: props.listing.email,
      zipcode: props.listing.zipcode,
      dogSizePreference: props.listing.dogSizePreference,
      dogBreedPreference: props.listing.dogBreedPreference,
      dogActivityPreference: props.listing.dogActivityPreference,
      homeAttributes: props.listing.homeAttributes,
      hostPictures: props.listing.hostPictures,
      homePictures: props.listing.homePictures,
      cost: props.listing.cost,
      date: null, //TODO, import date handling functionality
      open: false
    }

    //handle 'contact me'


    this.handleOpen = () => {
      this.setState({open: true});
    }

    // Closes the modal upon clicking contact me
    this.handleClose = () => {
      this.setState({open: false});
    }

    this.handleChangeDate = (e, date) => {
      this.setState({date: date});
      console.log(date);
    }

    this.handleSendEmail = () => {
      this.setState({open: false});
      const url = `/contacthost`;
      request
        .post(url)
        .send({
          ownerEmail: this.state.userEmail,
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



  componentDidMount() {
    let token = localStorage.getItem('jwt');
    let decoded = jwt.decode(token);
    //this.setState({name: decoded.name});
    this.setState({userEmail: decoded.email})
  }

  render() {
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

      return (
        <div>
          <Card>
            <CardHeader
            title={this.state.name}
            subtitle={"Puppy Lover in: " + this.state.zipcode}
            avatar={this.state.hostPictures}
          />
          <CardMedia
            overlay={<CardTitle title={`$${this.state.cost} Per Night!`} subtitle={this.state.homeAttributes} />}
          >
            <img src={this.state.homePictures} alt="Home Picture" width="360" height="270" />
          </CardMedia>
          <CardTitle title="5 Stars"
           subtitle={`Max Dog Size:${this.state.dogSizePreference}`} />
          <CardText>
            <div className = "listing">
              {`Preferred Dog Breed: ${this.state.dogBreedPreference}. `}
              {`Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.`}
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Contact Me" onClick={this.handleOpen}/>
            <Dialog
              title= {`Send ${this.state.name} a message`}
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
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
      );

  };
}