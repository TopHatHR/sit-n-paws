import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import jwt from 'jsonwebtoken';
import request from 'superagent';

export default class ListingView extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      hostEmail: props.listing.email,
      ownerEmail: null,
      open: false,
      date: null,
    }

    this.handleOpen = () => {
      this.setState({open: true});
    }

    this.handleClose = () => {
      this.setState({open: false});
    }

    this.handleChangeDate = (e, date) => {
      this.setState({date: date});
      console.log(date);
    }

    this.handleSendEmail = () => {
      this.setState({open: false});
      const url = `http://localhost:3000/contacthost`;
      request
        .post(url)
        .send({
          ownerEmail: this.state.ownerEmail,
          hostEmail: this.state.hostEmail,
          date: JSON.stringify(this.state.date)
        })
        .end((err, res) => {
          if (err) {
            console.log(err)
          } else {
            console.log(res);
          }
        });
    }
  }

  componentDidMount() {
    var token = localStorage.jwt;
    var decoded = jwt.decode(token);
    this.setState({ownerEmail: decoded.email});
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
            title={this.props.listing.name}
            subtitle={"Puppy Lover in: " + this.props.listing.zipcode}
            avatar={this.props.listing.hostPictures}
          />
          <CardMedia
            overlay={<CardTitle title={this.props.listing.cost + " Per Night!"} subtitle="Premium Kibble Included." />}
          >
            <img src={this.props.listing.homePictures} alt="" />
          </CardMedia>
          <CardTitle title={`Preferred Dog Breed: ${this.props.listing.dogBreedPreference}`}
           subtitle={`Max Dog Size:${this.props.listing.dogSizePreference}`} />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
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
