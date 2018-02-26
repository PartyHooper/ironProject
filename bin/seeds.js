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
  participants: [],
  picPath: "/images/patanegra.jpg"
  },

  { name: "Articbar",
  location: { type: "Point", coordinates: [ -99.171981, 19.412736] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 2, music: 1, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{regular: 0}],
  participants: [],
  picPath: "/images/articbar.png"
  },

  { name: "Mama Rumba",
  location: { type: "Point", coordinates: [ -99.164944, 19.413961] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 4, music: 4, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{regular: 0}],
  participants: [],
  picPath: "/images/MamaRumba.jpg"
  },

  { name: "Bulldog Cafe",
  location: { type: "Point", coordinates: [  -99.186903, 19.378694] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 4, music: 4, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{regular: 0}],
  participants: [],
  picPath: "/images/Bulldog cafe.jpg"
  }
];

Place.create(places, (err, docs)=>{
  if (err) { throw err };
    docs.forEach( (place) => {
      console.log(place.name)
    })
    mongoose.connection.close();
});
