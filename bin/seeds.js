/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Place = require('../models/Place');

mongoose.connect('mongodb://localhost/partyhooper');


const places = [
  { name: "IronHack CDMX",
  location: { type: "Point", coordinates: [-99.1716711, 19.3978821] },
  description: "It's IroHack's Mexico City campus!",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892}],
  type: "Bootcamp",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/ironhack.jpeg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Pata Negra",
  location: { type: "Point", coordinates: [-99.2421496, 19.4132875] },
  description: "It's a bar",
  reviews:[{rating: 5, crowded: 1, music: 1, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/patanegra.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Articbar",
  location: { type: "Point", coordinates: [ -99.171981, 19.412736] },
  description: "It's an antro",
  reviews:[{rating: 4.7, crowded: 2, music: 1, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/articbar.png",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Mama Rumba",
  location: { type: "Point", coordinates: [ -99.164944, 19.413961] },
  description: "It's an antro",
  reviews:[{rating: 3.4, crowded: 3, music: 3, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/MamaRumba.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Bulldog Cafe",
  location: { type: "Point", coordinates: [  -99.186903, 19.378694] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Bulldogcafe.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Don Quintin Condesa",
  location: { type: "Point", coordinates: [  -99.173606, 19.412089] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/donquintin.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Presley club",
  location: { type: "Point", coordinates: [  -99.180159, 19.384047] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Presley.jpeg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "AM Local",
  location: { type: "Point", coordinates: [  -99.171796, 19.413124] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/AMLocal.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Eve Condesa",
  location: { type: "Point", coordinates: [ -99.165655, 19.411821] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/eve-condesa.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "La Santa",
  location: { type: "Point", coordinates: [ -99.195362, 19.431365] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/LaSanta.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Beyork",
  location: { type: "Point", coordinates: [  -99.193821, 19.339205] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Beyork.jpeg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Hyde",
  location: { type: "Point", coordinates: [  -99.252337, 19.386668] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Hyde.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Sens",
  location: { type: "Point", coordinates: [ -99.251588, 19.387322] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Sens.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Asha Bar",
  location: { type: "Point", coordinates: [ -99.189611, 19.338789] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/asha.png",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Kinky Bar",
  location: { type: "Point", coordinates: [ -99.166202, 19.427113] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 3, music: 2, creatorId: 10155234846446892}],
  type: "Gay Club",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/asha.png",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

];

Place.create(places, (err, docs)=>{
  if (err) { throw err };
    docs.forEach( (place) => {
      console.log(place.name)
    })
    mongoose.connection.close();
});
