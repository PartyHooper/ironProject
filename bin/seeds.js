/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Place = require('../models/Place');

mongoose.connect('mongodb://fixter:fixter@ds129146.mlab.com:29146/togomx');


const places = [
  { name: "IronHack CDMX",
  location: { type: "Point", coordinates: [-99.1716711, 19.3978821] },
  description: "It's IroHack's Mexico City campus!",
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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
  reviews:[],
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

  { name: "Mambocafe",
  location: { type: "Point", coordinates: [  -99.171552, 19.395405] },
  description: "It's an antro",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/mambo.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Patrick Miller",
  location: { type: "Point", coordinates: [ -99.158964, 19.423929] },
  description: "It's an antro",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Patrick.jpg",
  schedule:{
    thursday: {opening: 21, closing: 4},
    friday: {opening: 21, closing: 4},
    saturday: {opening: 21, closing: 4}
  }
  },

  { name: "Limantour",
  location: { type: "Point", coordinates: [ -99.197007, 19.430340] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/limantourbar.png",
  schedule:{
    monday:{opening: 17, closing: 23},
    tusday:{opening: 17, closing: 2},
    wednesday:{opening: 17, closing: 2},
    thursday: {opening: 16.30, closing: 2},
    friday: {opening: 16.30, closing: 2}
  }
  },

  { name: "Sixtie's",
  location: { type: "Point", coordinates: [-99.166559, 19.412978] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/sixties.jpg",
  schedule:{
    monday:{opening: 13, closing: 2},
    tusday:{opening: 13, closing: 2},
    wednesday:{opening: 13, closing: 2},
    thursday: {opening: 13, closing: 2},
    friday: {opening: 13, closing: 2},
    saturday:{opening: 13, closing: 2}
  }
  },

  { name: "Kings Pub Condesa",
  location: { type: "Point", coordinates: [-99.171952, 19.411840] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/kingspub.jpg",
  schedule:{
    monday:{opening: 13, closing: 2},
    tusday:{opening: 13, closing: 2},
    wednesday:{opening: 13, closing: 2},
    thursday: {opening: 13, closing: 2},
    friday: {opening: 13, closing: 2},
    saturday:{opening: 13, closing: 2}
  }
  },

  { name: "Irish Pub Polanco",
  location: { type: "Point", coordinates: [-99.183637, 19.431614] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/irish.jpg",
  schedule:{
    monday:{opening: 13, closing: 3},
    tusday:{opening: 13, closing: 3},
    wednesday:{opening: 13, closing: 3},
    thursday: {opening: 13, closing: 3},
    friday: {opening: 13, closing: 3},
    saturday:{opening: 13, closing: 3}
  }
  },

  { name: "La Chilanguita Insurgentes",
  location: { type: "Point", coordinates: [-99.174924, 19.387228] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/chilanguita.jpg",
  schedule:{
    monday:{opening: 13, closing: 2},
    tusday:{opening: 13, closing: 2},
    wednesday:{opening: 13, closing: 2},
    thursday: {opening: 13, closing: 2},
    friday: {opening: 13, closing: 2},
    saturday:{opening: 13, closing: 2}
  }
  },

  { name: "El Jaibol Pericoapa",
  location: { type: "Point", coordinates: [-99.125269, 19.303126] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/Jaibol.jpg",
  schedule:{
    monday:{opening: 12, closing: 1},
    tusday:{opening: 12, closing: 1},
    wednesday:{opening: 12, closing: 1},
    thursday: {opening: 12, closing: 1},
    friday: {opening: 12, closing: 1},
    saturday:{opening: 12, closing: 1}
  }
  },

  { name: "Fe de ciegos",
  location: { type: "Point", coordinates: [ -99.108174, 19.310622] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/fedeciegos.jpeg",
  schedule:{
    monday:{opening: 13, closing: 2},
    tusday:{opening: 13, closing: 2},
    wednesday:{opening: 13, closing: 2},
    thursday: {opening: 13, closing: 2},
    friday: {opening: 13, closing: 2},
    saturday:{opening: 13, closing: 2}
  }
  },

  { name: "Beer Factory",
  location: { type: "Point", coordinates: [ -99.181913, 19.298521] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/beerfactoryC.jpg",
  schedule:{
    monday:{opening: 12, closing: 24},
    tusday:{opening: 12, closing: 24},
    wednesday:{opening: 12, closing: 24},
    thursday: {opening: 12, closing: 24},
    friday: {opening: 12, closing: 2},
    saturday:{opening: 12, closing: 2},
    sunday:{opening: 12, closing: 22}
  }
  },

  { name: "Terraza Madero",
  location: { type: "Point", coordinates: [ -99.138852, 19.433961] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/terrazamadero.jpg",
  schedule:{
    monday:{opening: 13, closing: 21.30},
    tusday:{opening: 11, closing: 1.30},
    wednesday:{opening: 11, closing: 1.30},
    thursday: {opening: 11, closing: 1.30},
    friday: {opening: 11, closing: 1.30},
    saturday:{opening: 11, closing: 1.30}
  }
  },

  { name: "El depósito",
  location: { type: "Point", coordinates: [ -99.187768, 19.346115] },
  description: "It's a bar",
  reviews:[],
  type: "Salon",
  pricing:[{cover: 0}],
  participants: [],
  picPath: "/images/deposito.jpg",
  schedule:{
    monday:{opening: 12, closing: 24},
    tusday:{opening: 12, closing: 24},
    wednesday:{opening: 12, closing: 24},
    thursday: {opening: 12, closing: 2},
    friday: {opening: 12, closing: 2},
    saturday:{opening: 12, closing: 2},
    sunday:{opening: 12, closing: 22}
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
