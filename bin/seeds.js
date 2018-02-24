/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Place = require('../models/Place');

mongoose.connect('mongodb://localhost/partyhooper');


const places = [
  { name: "Pata Negra",
  location: { type: "Point", coordinates: [-99.2421496, 19.4132875] },
  description: "It's a bar",
  reviews:[{rating: 5, crowded: 1, music: 1, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{regular: 0}],
  participants: []
  }
];



Place.create(places, (err, docs)=>{
  if (err) { throw err };
    docs.forEach( (place) => {
      console.log(place.name)
    })
    mongoose.connection.close();
});
