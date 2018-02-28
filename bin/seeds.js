/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Place = require('../models/Place');

mongoose.connect('mongodb://localhost/partyhooper');


const places = [
  { name: "IronHack CDMX",
  location: { type: "Point", coordinates: [-99.1716711, 19.3978821] },
  description: "It's IroHack's Mexico City campus!",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Bootcamp",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/ironhack.jpeg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Pata Negra",
  location: { type: "Point", coordinates: [-99.2421496, 19.4132875] },
  description: "It's a bar",
  reviews:[{rating: 5, crowded: 1, music: 1, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/patanegra.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Articbar",
  location: { type: "Point", coordinates: [ -99.171981, 19.412736] },
  description: "It's an antro",
  reviews:[{rating: 3.4, crowded: 2, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/articbar.png",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Mama Rumba",
  location: { type: "Point", coordinates: [ -99.164944, 19.413961] },
  description: "It's an antro",
  reviews:[{rating: 3.5, crowded: 3, music: 3, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/MamaRumba.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Bulldog Cafe",
  location: { type: "Point", coordinates: [  -99.186903, 19.378694] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/Bulldogcafe.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Don Quintin Condesa",
  location: { type: "Point", coordinates: [  -99.173606, 19.412089] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/donquintin.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Presley club",
  location: { type: "Point", coordinates: [  -99.180159, 19.384047] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 2, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/Presley.jpeg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "AM Local",
  location: { type: "Point", coordinates: [  -99.171796, 19.413124] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 1, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/AMLocal.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Eve Condesa",
  location: { type: "Point", coordinates: [ -99.165655, 19.411821] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/eve-condesa.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "La Santa",
  location: { type: "Point", coordinates: [ -99.195362, 19.431365] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/LaSanta.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Beyork",
  location: { type: "Point", coordinates: [  -99.193821, 19.339205] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/Beyork.jpeg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Hyde",
  location: { type: "Point", coordinates: [  -99.252337, 19.386668] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/Hyde.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Sens",
  location: { type: "Point", coordinates: [ -99.251588, 19.387322] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/Sens.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Asha Bar",
  location: { type: "Point", coordinates: [ -99.189611, 19.338789] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Salon",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/asha.png",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Kinky Bar",
  location: { type: "Point", coordinates: [ -99.166202, 19.427113] },
  description: "It's an antro",
  reviews:[{rating: 5, crowded: 1, music: 2, creatorId: 10155234846446892, creatorName: "Raul", creatorPicPath: "https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16729552_10154232393841892_8053440320250131528_n.jpg?oh=dec3889784b3c97d143f143d3da0cd2f&oe=5B4CED1A"}],
  type: "Gay Club",
  pricing:{cover: 0},
  participants: [],
  picPath: "/images/Kinky.jpg",
  schedule:{
    Thursday: {opening: 21, closing: 4},
    Friday: {opening: 21, closing: 4},
    Saturday: {opening: 21, closing: 4}
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
