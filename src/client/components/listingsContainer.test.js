import React from 'react';
import ListingsContainer from './listingsContainer.js';
import renderer from 'react-test-renderer';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


const listings = [
  {"name":"Chris Pfaff","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"Corgi","email":"chrispfaff10@gmail.com","dogActivityPreference":"rutrum","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/44.jpg","homePictures":"https://farm7.staticflickr.com/6076/6080657644_19cfe82456.jpg","cost":35},
  {"name":"Niels Larson","zipcode":94110,"dogSizePreference":"super extra large","dogBreedPreference":"Chihuahua","email":"nlarson94@gmail.com","dogActivityPreference":"dapibus","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/45.jpg","homePictures":"https://farm1.staticflickr.com/68/187943195_05de9fe99b.jpg","cost":55},
  {"name":"Thomasina Luscombe","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"Dachshund","email":"hi1@gmail.com","dogActivityPreference":"lacus","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/46.jpg","homePictures":"https://farm6.staticflickr.com/5510/14490433662_2745930345.jpg","cost":30},
  {"name":"Shelley Philpot","zipcode":94106,"dogSizePreference":"teeny weeny","dogBreedPreference":"German Shepherd","email":"hi2@gmail.com","dogActivityPreference":"amet","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/47.jpg","homePictures":"https://farm4.staticflickr.com/3062/3046570389_f960000e36.jpg","cost":65},
  {"name":"Isidora Hemms","zipcode":94110,"dogSizePreference":"large","dogBreedPreference":"Pitbull","email":"hi3@gmail.com","dogActivityPreference":"ipsum","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/women/48.jpg","homePictures":"https://farm1.staticflickr.com/229/516113751_e2222a5a64.jpg","cost":30},
  {"name":"Say Swinglehurst","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"ROSIE","email":"hi4@gmail.com","dogActivityPreference":"fusce","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/men/55.jpg","homePictures":"https://farm1.staticflickr.com/48/111317752_7934d93e8a.jpg","cost":57},
  {"name":"Angus Bafford","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"CHUNKY","email":"hi5@gmail.com","dogActivityPreference":"lorem","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/men/56.jpg","homePictures":"https://scontent.fsjc1-3.fna.fbcdn.net/v/t31.0-8/14500780_151623151960598_8947738040944491792_o.jpg?oh=c2362b13fe7e7e25c1b1c0cfc5319147&oe=5A7FDE71","cost":60},
  {"name":"Breanne Carnoghan","zipcode":94110,"dogSizePreference":"medium","dogBreedPreference":"Bloodhound","email":"hi@gmail.com","dogActivityPreference":"erat","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/men/57.jpg","homePictures":"https://farm4.staticflickr.com/3586/3468872496_d62d4580b9.jpg","cost":32},
  {"name":"Fabio Handaside","zipcode":94123,"dogSizePreference":"small","dogBreedPreference":"Mix","email":"hi6@gmail.com","dogActivityPreference":"proin","homeAttributes":"Great home with lots of space", "hostPictures":"https://randomuser.me/api/portraits/men/58.jpg","homePictures":"https://farm4.staticflickr.com/3193/2683030380_8ac4712010.jpg","cost":25},
  {"name":"Lily Feake","zipcode":94106,"dogSizePreference":"medium","dogBreedPreference":"All","email":"hi7@gmail.com","dogActivityPreference":"vel","homeAttributes":"Great home with lots of space","hostPictures":"https://randomuser.me/api/portraits/men/59.jpg","homePictures":"https://farm4.staticflickr.com/3163/2780745441_a39b974e55.jpg","cost":55}
];

describe('ListingsContainer component', () => {
  const wrapper = shallow(<ListingsContainer listings={listings}/>);

  it('should match its empty snapshot', () => {
    const tree = renderer.create(
      <ListingsContainer listings={listings}/>
    ).toJSON;

    expect(tree).toMatchSnapshot;
  });

  it('should render an Item to the page for each item in props', () => {
    expect((tree).find('ListingView').length).toBe(testProps.listings.length);
  });
});