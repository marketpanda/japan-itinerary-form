import { colors } from '@atlaskit/theme';
import type { Author, Itinerary, Quote, QuoteMap } from './types';
import finnImg from './static/media/finn-min.png';
import bmoImg from './static/media/bmo-min.png';
import princessImg from './static/media/princess-min.png';
import jakeImg from './static/media/jake-min.png'; 

const jake: Author = {
  id: '1',
  name: 'Jake',
  url: 'http://adventuretime.wikia.com/wiki/Jake',
  avatarUrl: jakeImg.src,
  colors: {
    soft: colors.Y50,
    hard: colors.N400A,
  },
};

const BMO: Author = {
  id: '2',
  name: 'BMO',
  url: 'http://adventuretime.wikia.com/wiki/BMO',
  avatarUrl: bmoImg.src,
  colors: {
    soft: colors.G50,
    hard: colors.N400A,
  },
};

const finn: Author = {
  id: '3',
  name: 'Finn',
  url: 'http://adventuretime.wikia.com/wiki/Finn',
  avatarUrl: finnImg.src,
  colors: {
    soft: colors.B50,
    hard: colors.N400A,
  },
};

const princess: Author = {
  id: '4',
  name: 'Princess bubblegum',
  url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
  avatarUrl: princessImg.src,
  colors: {
    soft: colors.P50,
    hard: colors.N400A,
  },
};

export const authors: Author[] = [jake, BMO, finn, princess];

export const quotes: Quote[] = [
  {
    id: '1',
    content: 'Sometimes life is scary and dark',
    author: BMO,
  },
  {
    id: '2',
    content:
      'Sucking at something is the first step towards being sorta good at something.',
    author: jake,
  },
  {
    id: '3',
    content: "You got to focus on what's real, man",
    author: jake,
  },
  {
    id: '4',
    content: 'Is that where creativity comes from? From sad biz?',
    author: finn,
  },
  {
    id: '5',
    content: 'Homies help homies. Always',
    author: finn,
  },
  {
    id: '6',
    content: 'Responsibility demands sacrifice',
    author: princess,
  },
  {
    id: '7',
    content: "That's it! The answer was so simple, I was too smart to see it!",
    author: princess,
  },
  {
    id: '8',
    content:
      "People make mistakes. It's all a part of growing up and you never really stop growing",
    author: finn,
  },
  {
    id: '9',
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    author: finn,
  },
  {
    id: '10',
    content: 'I should not have drunk that much tea!',
    author: princess,
  },
  {
    id: '11',
    content: 'Please! I need the real you!',
    author: princess,
  },
  {
    id: '12',
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    author: princess,
  },
];
export const itineraries: Itinerary[] = [
  {
    id: '1',
    date: new Date(),
    activityPlan: 'Shrines',
    contact: '888',
    accommodation: 'Apa Hotel',
    author: BMO,
  },
  {
    id: '2',
    date: new Date(),
    activityPlan: 'Amusement Parks',
    contact: '888',
    accommodation: 'Apa Hotel',
    author: BMO,
  },
  {
    id: '3',
    date: new Date(),
    activityPlan: 'Museums',
    contact: '888',
    accommodation: 'Apa Hotel',
    author: BMO,
  },
  {
    id: '4',
    date: new Date(),
    activityPlan: 'Food Trip',
    contact: '888',
    accommodation: 'Apa Hotel',
    author: BMO,
  },
  {
    id: '5',
    date: new Date(),
    activityPlan: 'Souvenirs',
    contact: '888',
    accommodation: 'Apa Hotel',
    author: BMO,
  },
   
];

// So we do not have any clashes with our hardcoded ones
let idCount: number;
let predictableMathRandom: () => number;

// Simple seeded RNG replacement (Mulberry32 algorithm)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}


// FIXME: This doesn't work well with StrictMode
export const resetData = (seed: string) => {
  idCount = 1;
  // convert string seed into a number
  const numSeed = Array.from(seed).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  predictableMathRandom = mulberry32(numSeed);
};

resetData('base');

export const getQuotes = (count: number = quotes.length): Quote[] =>
  // eslint-disable-next-line no-restricted-syntax
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Quote =
      quotes[Math.floor(predictableMathRandom() * quotes.length)];

    const custom: Quote = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getItineraries = (count: number = itineraries.length): Itinerary[] =>
  // eslint-disable-next-line no-restricted-syntax
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random: Itinerary =
      itineraries[Math.floor(predictableMathRandom() * itineraries.length)];

    const custom: Itinerary = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });



const getByAuthor = (author: Author, items: Quote[]): Quote[] =>
  items.filter((quote: Quote) => quote.author === author);

export const authorQuoteMap: QuoteMap = authors.reduce(
  (previous: QuoteMap, author: Author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {},
);

export const generateQuoteMap = (quoteCount: number): QuoteMap =>
  authors.reduce(
    (previous: QuoteMap, author: Author) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / authors.length),
    }),
    {},
  );