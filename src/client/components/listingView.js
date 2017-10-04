import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ListingView = (props) => (
  <div>
    <Card>
      <CardHeader
        title={props.listing.name}
        subtitle={"Puppy Lover in: " + props.listing.zipcode}
        avatar={props.listing.hostPictures}
      />
      <CardMedia
        overlay={<CardTitle title={props.listing.cost + " Per Night!"} subtitle="Premium Kibble Included." />}
      >
        <img src={props.listing.homePictures} alt="" />
      </CardMedia>

      <CardTitle title={`Preferred Dog Breed: ${props.listing.dogBreedPreference}`}
       subtitle={`Max Dog Size:${props.listing.dogSizePreference} and Preferred Dog Temperament: ${props.listing.dogTemperatmentPreference}`} />
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
      </CardText>



      <CardActions>
        <FlatButton label="Contact Me" />
        <FlatButton label="Learn more about this host!" />
    </CardActions>
    </Card>
  </div>


)


ListingView.propTypes = {listing: PropTypes.object.isRequired};

export default ListingView;
