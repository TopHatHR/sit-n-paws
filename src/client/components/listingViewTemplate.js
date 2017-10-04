import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const ListingView = (props) => (
  <div>
    <Card>
      <CardHeader
        title="Joe"
        subtitle="Puppy Lover in 91524"
      />
      <CardMedia
        overlay={<CardTitle title="$30 Per Night!" subtitle="Premium Kibble Included." />}
      >
        <img src="http://diy.sndimg.com/content/dam/images/diy/fullset/2010/5/10/0/CI-Nathaniel-Riethmann_Doghouse_s4x3.jpg.rend.hgtvcom.966.725.suffix/1420697544779.jpeg" alt="" />
      </CardMedia>

      <CardTitle title="Friendly dog lover just looking to make some spare cash!" subtitle="Small or Medium dogs only!" />
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

export default ListingView;
