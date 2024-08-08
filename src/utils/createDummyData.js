import * as AmenityIcons from './AmenityIcons';
import { format } from 'date-fns';

export  const roomAmenities = [
  { _id: 1, text: 'Comfortable mattress(es)', icon: AmenityIcons.bedIcon },
  { _id: 2, text: 'Bedding and linens', icon: AmenityIcons.blanketIcon },
  { _id: 3, text: 'Towels', icon: AmenityIcons.towelIcon },
  { _id: 4, text: 'Wardrobe for storage', icon: AmenityIcons.wardrobeIcon },

  { _id: 5, text: 'Private bathroom', icon: AmenityIcons.showerIcon },
  { _id: 6, text: 'Bathtub', icon: AmenityIcons.bathtubIcon },
  { _id: 7, text: 'Toilet', icon: AmenityIcons.toiletIcon },
  { _id: 8, text: 'Sink', icon: AmenityIcons.sinkIcon },
  { _id: 9, text: 'Toiletries', icon: AmenityIcons.soapIcon },

  { _id: 10, text: 'Desk and chair', icon: AmenityIcons.deskChairIcon },
  { _id: 11, text: 'Nightstands with lamps', icon: AmenityIcons.lampIcon },
  { _id: 12, text: 'Seating area', icon: AmenityIcons.sofaIcon },

  { _id: 13, text: 'Free Wi-Fi', icon: AmenityIcons.wifiRouterIcon },
  { _id: 14, text: 'Television', icon: AmenityIcons.televisionIcon },
  { _id: 15, text: 'Air conditioning', icon: AmenityIcons.airConditionerIcon },
  { _id: 16, text: 'Power outlets', icon: AmenityIcons.powerOutletIcon },

  { _id: 17, text: 'Communal kitchen', icon: AmenityIcons.kitchenScaleIcon },
  { _id: 18, text: 'Fridge', icon: AmenityIcons.fridgeIcon },
  { _id: 19, text: 'Microwave', icon: AmenityIcons.microwaveOvenIcon },
  { _id: 20, text: 'Coffee maker', icon: AmenityIcons.coffeeCupIcon },

  { _id: 21, text: 'Lockable doors', icon: AmenityIcons.securityGateIcon },
  { _id: 22, text: 'Smoke detectors', icon: AmenityIcons.smokeBombIcon },
  {
    _id: 23,
    text: 'Fire extinguisher',
    icon: AmenityIcons.fireExtinguisherIcon,
  },

  { _id: 24, text: 'Air purifier', icon: AmenityIcons.airPurifierIcon },
  { _id: 25, text: 'Fan or ventilation', icon: AmenityIcons.windTurbineIcon },
  {
    _id: 26,
    text: 'Iron and ironing board',
    icon: AmenityIcons.ironingTableIcon,
  },

  { _id: 27, text: 'Balcony', icon: AmenityIcons.balconyIcon },
  { _id: 28, text: 'Garden', icon: AmenityIcons.gardenSprayIcon },

  { _id: 29, text: 'Books or magazines', icon: AmenityIcons.openBookIcon },
  { _id: 30, text: 'Board games', icon: AmenityIcons.boardGameIcon },

  { _id: 31, text: 'Regular cleaning service', icon: AmenityIcons.vaccumeIcon },
  { _id: 32, text: 'Laundry facilities', icon: AmenityIcons.laundryIcon },

  { _id: 33, text: 'Elevator', icon: AmenityIcons.elevatorIcon },
  { _id: 34, text: 'Handicap-accessible', icon: AmenityIcons.wheelchairIcon },

  { _id: 35, text: 'Scenic views', icon: AmenityIcons.mountainIcon },
  { _id: 36, text: 'Pet-friendly', icon: AmenityIcons.dogBowlIcon },
];



const nameList = [
  'Time',
  'Past',
  'Future',
  'Dev',
  'Fly',
  'Flying',
  'Soar',
  'Soaring',
  'Power',
  'Falling',
  'Fall',
  'Jump',
  'Cliff',
  'Mountain',
  'Rend',
  'Red',
  'Blue',
  'Green',
  'Yellow',
  'Gold',
  'Demon',
  'Demonic',
  'Panda',
  'Cat',
  'Kitty',
  'Kitten',
  'Zero',
  'Memory',
  'Trooper',
  'XX',
  'Bandit',
  'Fear',
  'Light',
  'Glow',
  'Tread',
  'Deep',
  'Deeper',
  'Deepest',
  'Mine',
  'Your',
  'Worst',
  'Enemy',
  'Hostile',
  'Force',
  'Video',
  'Game',
  'Donkey',
  'Mule',
  'Colt',
  'Cult',
  'Cultist',
  'Magnum',
  'Gun',
  'Assault',
  'Recon',
  'Trap',
  'Trapper',
  'Redeem',
  'Code',
  'Script',
  'Writer',
  'Near',
  'Close',
  'Open',
  'Cube',
  'Circle',
  'Geo',
  'Genome',
  'Germ',
  'Spaz',
  'Shot',
  'Echo',
  'Beta',
  'Alpha',
  'Gamma',
  'Omega',
  'Seal',
  'Squid',
  'Money',
  'Cash',
  'Lord',
  'King',
  'Duke',
  'Rest',
  'Fire',
  'Flame',
  'Morrow',
  'Break',
  'Breaker',
  'Numb',
  'Ice',
  'Cold',
  'Rotten',
  'Sick',
  'Sickly',
  'Janitor',
  'Camel',
  'Rooster',
  'Sand',
  'Desert',
  'Dessert',
  'Hurdle',
  'Racer',
  'Eraser',
  'Erase',
  'Big',
  'Small',
  'Short',
  'Tall',
  'Sith',
  'Bounty',
  'Hunter',
  'Cracked',
  'Broken',
  'Sad',
  'Happy',
  'Joy',
  'Joyful',
  'Crimson',
  'Destiny',
  'Deceit',
  'Lies',
  'Lie',
  'Honest',
  'Destined',
  'Bloxxer',
  'Hawk',
  'Eagle',
  'Hawker',
  'Walker',
  'Zombie',
  'Sarge',
  'Capt',
  'Captain',
  'Punch',
  'One',
  'Two',
  'Uno',
  'Slice',
  'Slash',
  'Melt',
  'Melted',
  'Melting',
  'Fell',
  'Wolf',
  'Hound',
  'Legacy',
  'Sharp',
  'Dead',
  'Mew',
  'Chuckle',
  'Bubba',
  'Bubble',
  'Sandwich',
  'Smasher',
  'Extreme',
  'Multi',
  'Universe',
  'Ultimate',
  'Death',
  'Ready',
  'Monkey',
  'Elevator',
  'Wrench',
  'Grease',
  'Head',
  'Theme',
  'Grand',
  'Cool',
  'Kid',
  'Boy',
  'Girl',
  'Vortex',
  'Paradox',
];
const dummyVideos = [
  'canVideo1.mp4',
  'Girlteam.mp4',
  'magic.mp4',
  'petsLover.mp4',
];

const randNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randFloatingNum = (min, max, dec) =>
  new Number(Math.random() * (max - min + 1) + min).toFixed(dec);

export const randFromArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const randArrOfLength = (arr, length) =>
  Array.from({ length }, () => randFromArr(arr));

export const randArrOfRandLength = (arr, min, max) =>
  Array.from({ length: randNum(min, max) }, () => randFromArr(arr));

export const arrOfRandLength = (item, min, max) =>
  Array.from({ length: randNum(min, max) }, () => item);

export const randFullName = () =>
  randFromArr(nameList) + ' ' + randFromArr(nameList);

export const randNumStringOfLength = (length, canFirstDigitBeZero = true) =>
  canFirstDigitBeZero
    ? Array.from({ length }, () => randNum(0, 9)).join('')
    : [randNum(1, 9), ...randNumStringOfLength(length - 1)].join('');

export const createDummyUsers = (length) =>
  Array.from({ length }).map((_, i) => ({
    _id: i + 1,
    img: `https://randomuser.me/api/portraits/${randFromArr([
      'men',
      'women',
    ])}/${i + 1}.jpg`,
    fName: randFromArr(nameList),
    lName: randFromArr(nameList),
    email: `${randFromArr(nameList)}@example.com`,
    phoneNumber: `+${Array.from({ length: 12 }, () => randNum(0, 9)).join('')}`,
    address: {
      houseAddress: 'H.No. ' + randNum(600, 800),
      apartment: randFromArr(nameList) + ' ap.',
      city: randFromArr(nameList) + ' city',
      district: randFromArr(nameList),
      country: randFromArr(nameList) + 'land',
      zipcode: randNumStringOfLength(5),
    },
  }));

export const createDummyCourses = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    name:
      randFromArr(nameList) +
      ' in ' +
      randFromArr(nameList) +
      ' ' +
      randFromArr(nameList),
    duration: randNum(1, 4),
    score: randFloatingNum(5, 9, 1),
    fee: randNum(10, 30) * 1000,
  }));

export const createDummyReviews = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    img: `https://randomuser.me/api/portraits/${randFromArr([
      'men',
      'women',
    ])}/${i + randNum(50, 90)}.jpg`,
    name: randFullName(),
    rating: 5,
    review:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti accusamus qui numquam. Voluptatum voluptatibus libero facilis itaque, ad amet reprehenderit ipsam nemo distinctio! Qui sapiente, et voluptatum at fuga sunt.',
    date: new Date(),
  }));

export const createDummySupport = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    userId: randNum(1, 9),
    subject: 'Lorem ipsum dolor sit amet.',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus aliquid aliquam, tempora molestiae omnis esse natus hic nesciunt perspiciatis repellat.',
    replies: [],
    createdAt: new Date(),
  }));

export const createDummyUnis = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    name: randFromArr(nameList) + ' University of ' + randFromArr(nameList),
    img: `https://picsum.photos/id/${randNum(200, 300)}/300/200`,
    address: randFromArr(nameList) + ' city, ' + randFromArr(nameList) + 'land',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum autem perspiciatis minima similique voluptatum odio in recusandae nesciunt ab sequi aliquam, ipsum ducimus, atque mollitia ullam, earum optio deleniti eligendi!',
    location:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequatur tempore ea? Excepturi, sed. Beatae sequi placeat delectus laborum nobis!',
    courses: [
      ...new Set(Array.from({ length: randNum(5, 15) }, () => randNum(1, 20))),
    ],
    galleryImgs: arrOfRandLength(
      `https://picsum.photos/id/${randNum(100, 200)}/300/200`,
      5,
      10
    ),
    reviews: createDummyReviews(randNum(2, 4)),
  }));

export const createDummyAccomodations = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    name: randFullName() + 'house',
    img: `https://picsum.photos/id/${randNum(200, 300)}/300/200`,
    price: randNum(5000, 20000),
    address: randFromArr(nameList) + ' city, ' + randFromArr(nameList) + 'land',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum autem perspiciatis minima similique voluptatum odio in recusandae nesciunt ab sequi aliquam, ipsum ducimus, atque mollitia ullam, earum optio deleniti eligendi!',
    location:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum consequatur tempore ea? Excepturi, sed. Beatae sequi placeat delectus laborum nobis!',
    WhatsNearby:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora repellat beatae reiciendis minus autem amet.',
    amenities: [
      ...new Set(
        Array.from({ length: randNum(5, 15) }, () =>
          randNum(1, roomAmenities.length)
        )
      ),
    ],
    policies: [
      'Only Indian residents are allowed',
      'Guests can check in using any local or outstation ID proof (PAN card not accepted).',
      'As a complimentary benefit, your stay is now insured by Acko.',
      'Couples are welcome',
    ],
    reviews: createDummyReviews(randNum(2, 4)),
  }));

export const createDummyFlights = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    flightId: 'FL' + randNumStringOfLength(3),
    airline: randFromArr(nameList) + ' Air',
    flightNumber: 'AR' + randNumStringOfLength(4),
    departure: {
      airport: randFullName() + ' International Airport',
      terminal: randNum(1, 5),
      city: randFromArr(nameList) + ' City',
      country: randFromArr(nameList) + 'land',
      dateTime: new Date(),
    },
    arrival: {
      airport: randFullName() + ' International Airport',
      terminal: randNum(1, 5),
      city: randFromArr(nameList) + ' City',
      country: randFromArr(nameList) + 'land',
      dateTime: new Date(),
    },
    duration: { hours: randNum(4, 20), minutes: randFromArr([15, 30, 45]) },
    flightClass: randFromArr(['Economy', 'Business']),
    price: randNum(1000, 3000),
    availableSeats: randNum(10, 50),
    totalSeats: randNum(100, 200),
    layovers: arrOfRandLength(
      {
        airport: randFromArr(nameList) + ' Airport',
        duration: { hours: randNum(0, 3), minutes: randFromArr([15, 30, 45]) },
      },
      0,
      2
    ),
    baggage: randFromArr(['Backpack', 'Adult', 'Children']),
    checkInCapacity: randNum(10, 30),
    cabinCapacity: randNum(10, 30),
  }));

export const createDummyLoans = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    loanId: 'LN' + randNumStringOfLength(3),
    amount: randNum(10, 100) * 1000,
    termMonths: randNum(12, 48),
    interestRate: randFloatingNum(3, 8, 1),
    monthlyPayment: randNum(10, 20) * 100,
    loanPurpose:
      randFromArr(['Education', 'Accomodation', 'Flight']) + ' Expenses',
  }));

export const createDummyApplications = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    applicationId: 'AP' + randNumStringOfLength(3),
    userId: randNum(1, 9),
    uniId: randNum(1, 9),
    courseId: randNum(1, 9),
    date: new Date(),
    status: randFromArr(['Pending', 'Approved', 'Rejected']),
  }));

export const createDummyPayments = (length) =>
  Array.from({ length }, (_, i) => ({
    _id: i + 1,
    paymentId: 'PAY' + randNumStringOfLength(4),
    payer: {
      _id: randNum(1, 9),
      name: randFullName(),
      email: randFromArr(nameList) + randNumStringOfLength(3) + '@gmail.com',
    },
    amount: randNum(5, 50) * 100,
    paidAt: new Date(),
    type: randFromArr(['Single', 'Installment']),
  }));

export const createDummyBlogs = (num) =>
  Array.from({ length: num }, (_, i) => ({
    _id: i + 1,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    img: `https://picsum.photos/id/${i + 10}/300/200`,
    author: `${randFromArr(nameList)} ${randFromArr(nameList)}`,
    createdAt: new Date(),
    content: `<p>One-on-one meetings are a valuable opportunity for managers and direct reports to connect, share feedback, and plan for the future. However, if these meetings are not well-structured and focused, they can easily become boring and unproductive status updates. So, to help you prepare for your 1:1 meetings, we&rsquo;ll guide you through 16 valuable questions to ask employees. With these questions, you&rsquo;ll be able to achieve various goals, such as giving and receiving feedback, coaching and mentoring, setting and reviewing goals as well as building trust and rapport.</p>
<h2>Why are 1:1s Important?</h2>
<p>Only 32% of employees in the U.S. are engaged at work. [1] One of the main reasons for this low engagement is the lack of feedback and recognition from their managers. If employees receive regular feedback from their managers, they are more likely to be engaged, loyal, and satisfied with their work. [2] These statistics show the importance of feedback and how it can go a long way in motivating your employees.</p>
<p>Holding 1:1s helps you to:</p>
<ul>
<li>Understand the needs, expectations, and motivations of your employees and provide them with personalized support and guidance.</li>
<li>Monitor the performance, progress, and impact of your employees and provide them with timely and constructive feedback and recognition.</li>
<li>Identify the strengths, weaknesses, and potential of your employees and help them develop their skills, competencies, and career paths.</li>
<li>Build trust, rapport, and loyalty with your employees and create a culture of openness, honesty, and collaboration.</li>
</ul>
<h2>How to Do 1:1s Effectively</h2>
<p>There is no one-size-fits-all approach to 1:1s, as employees may have different needs, preferences, and styles. However, some general guidelines can help you conduct effective 1:1s with your team:</p>
<h3>Setting the Stage</h3>
<p>Create a safe and open environment for discussion by choosing a suitable time, place, and format for the 1:1. To make sure that you have a successful meeting, you need to do the following.</p>
<ul>
<li>Schedule the 1:1 in advance, preferably at a regular interval (e.g., weekly or bi-weekly), and communicate the purpose and agenda of the meeting to the employee.</li>
<li>Choose a comfortable and private location for the meeting. If it is offline you can use a meeting or conference room. If it will be virtual choose a reliable online platform like Google Meet or Zoom depending on both of your preferences.</li>
<li>Gather relevant data like employee information, and current projects they are working on, before the meeting, review the previous notes, and set an agenda before the meeting so that you have an outline of how the meeting will go.</li>
</ul>
<h3>Building Rapport</h3>
<p>Rapport is the key to building a strong relationship between you and a team member. If your employee feels that you are interested in them as a person, not just as a worker, they will be more willing to work hard for you. So how do you build this rapport? You can do it by:</p>
<ul>
<li>Greeting the employee warmly and asking some casual questions about their personal or professional life. For example; How are you feeling today? How was your weekend? How is your project going?</li>
<li>Share some information about yourself to create a rapport with the employee. Like; What did you do during the weekend?</li>
<li>Listen attentively and empathetically to the employee&rsquo;s responses and show appreciation for their time and effort.</li>
</ul>
<h3>Exploring Topics</h3>
<p>This is where the real meeting begins as you start to explore different topics from goals, to performance assessment, to support and career growth and feedback. Here is how to set it up:</p>
<ul>
<li>Start by using the agenda that you created before the meeting as a guide to explore different topics with the employee (e.g., goals, performance, feedback, and support.)</li>
<li>Ask open-ended questions that encourage the employee to share their thoughts, feelings, opinions, or experiences. For instance; What are you most excited about in your current project? What are some of the challenges that you are facing or anticipate? How do you feel about the feedback that you received?</li>
<li>You should also provide feedback, insights, or suggestions to the employee in a constructive and balanced way. For example; I liked how you handled that situation with the client, I think you could improve your presentation skills by practicing more, and I have some ideas on how we can optimize our workflow.</li>
<li>Avoid interrupting or judging the employee&rsquo;s responses and instead seek to understand their perspective.</li>
</ul>
<h3>Taking Action</h3>
<p>This is the stage when you agree on specific actions, responsibilities, and deadlines for you and the employee to follow up on the discussed topics. Here are the things you need to do:</p>
<ul>
<li>You should summarize the key points of the discussion and confirm with the employee any actions that need to be taken. Such as; I will send you an email with more details on that project, You will complete that task by next week.</li>
<li>Assign clear responsibilities and deadlines for each action and document them for future reference (e.g., I will be responsible for reviewing your report and providing feedback by Friday. You will be responsible for implementing the feedback and submitting the final version by Monday. You should also ensure that the actions are realistic, achievable, and measurable.)</li>
</ul>
<h3>Closing the Loop/After Meeting</h3>
<p>This is where you end the meeting and schedule the next 1:1. There are things you need to do at this stage, which include:</p>
<ul>
<li>Express your appreciation and support for the employee&rsquo;s work and development, (e.g., I appreciate your hard work and dedication. I am here to support you in any way I can.)</li>
<li>You should also state when the next 1:1 with the employee will be and remind them of the actions that they agreed on.</li>
<li>Send a summary of the meeting notes and action items to the employee. Ask them to confirm or correct any details.</li>
</ul>`,
  }));
  export const createDummyBookings = (length, type) =>
    type === 'accomodation'
      ? Array.from({ length }, (_, i) => ({
          _id: i + 1,
          accomodationId: randNum(0, 9),
          userId: randNum(0, 9),
          checkinDate: format(new Date(), 'MMM dd'),
          checkinTime: format(new Date(), 'hh:mm a'),
          numOfGuests: randNum(1, 5),
          numOfRooms: randNum(1, 3),
        }))
      : Array.from({ length }, (_, i) => ({
          _id: i + 1,
          flightId: randNum(0, 9),
          travellerInfo: Array.from({ length: randNum(1, 4) }, () => ({
            name: randFullName(),
            govId: randNumStringOfLength(12, false),
            type: randFromArr(['Adult', 'Child']),
          })),
        }));
