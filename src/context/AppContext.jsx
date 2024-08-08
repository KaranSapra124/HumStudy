import { createContext, useReducer } from 'react';
import {
  createDummyAccomodations,
  createDummyApplications,
  createDummyBlogs,
  createDummyCourses,
  createDummyFlights,
  createDummyLoans,
  createDummyPayments,
  createDummySupport,
  createDummyUnis,
  createDummyUsers,
} from '../utils/createDummyData';

const AppContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_USER:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_USER:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_USER:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const uniReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_UNI:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_UNI:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_UNI:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const accomodationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ACCOMODATION:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_ACCOMODATION:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_ACCOMODATION:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const courseReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_COURSE:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_COURSE:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_COURSE:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const supportReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_SUPPORT:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_SUPPORT:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_SUPPORT:
      return state.filter((item) => item._id !== action.payload._id);
    case ACTIONS.ADD_SUPPORT_REPLY:
      return state.map((item) =>
        item._id !== action.payload._id
          ? item
          : { ...item, replies: [...item.replies, action.payload.reply] }
      );
    default:
      return state;
  }
};
const paymentReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_PAYMENT:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_PAYMENT:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_PAYMENT:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const loanReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_LOAN:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_LOAN:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_LOAN:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const applicationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_APPLICATION:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_APPLICATION:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_APPLICATION:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const flightReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_FLIGHT:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_FLIGHT:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_FLIGHT:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};
const blogReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_BLOG:
      return [
        ...state,
        { ...action.payload, _id: state[state.length - 1]._id + 1 },
      ];
    case ACTIONS.EDIT_BLOG:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case ACTIONS.DELETE_BLOG:
      return state.filter((item) => item._id !== action.payload._id);
    default:
      return state;
  }
};

const ACTIONS = {
  // userReducer Action Types
  ADD_USER: 'add-user',
  EDIT_USER: 'edit-user',
  DELETE_USER: 'delete-user',

  // uniReducer Action Types
  ADD_UNI: 'add-uni',
  EDIT_UNI: 'edit-uni',
  DELETE_UNI: 'delete-uni',

  // accomodationReducer Action Types
  ADD_ACCOMODATION: 'add-accomodation',
  EDIT_ACCOMODATION: 'edit-accomodation',
  DELETE_ACCOMODATION: 'delete-accomodation',

  // courseReducer Action Types
  ADD_COURSE: 'add-course',
  EDIT_COURSE: 'edit-course',
  DELETE_COURSE: 'delete-course',

  // supportReducer Action Types
  ADD_SUPPORT: 'add-support',
  EDIT_SUPPORT: 'edit-support',
  DELETE_SUPPORT: 'delete-support',
  ADD_SUPPORT_REPLY: 'add-support-reply',

  // flightReducer Action Types
  ADD_FLIGHT: 'add-flight',
  EDIT_FLIGHT: 'edit-flight',
  DELETE_FLIGHT: 'delete-flight',

  // loanReducer Action Types
  ADD_LOAN: 'add-loan',
  EDIT_LOAN: 'edit-loan',
  DELETE_LOAN: 'delete-loan',

  // applicationReducer Action Types
  ADD_APPLICATION: 'add-application',
  EDIT_APPLICATION: 'edit-application',
  DELETE_APPLICATION: 'delete-application',

  // paymentReducer Action Types
  ADD_PAYMENT: 'add-payment',
  EDIT_PAYMENT: 'edit-payment',
  DELETE_PAYMENT: 'delete-payment',

  // paymentReducer Action Types
  ADD_BLOG: 'add-blog',
  EDIT_BLOG: 'edit-blog',
  DELETE_BLOG: 'delete-blog',
};

const combinedReducer = (state, action) => ({
  users: userReducer(state.users, action),
  unis: uniReducer(state.unis, action),
  courses: courseReducer(state.courses, action),
  support: supportReducer(state.support, action),
  accomodations: accomodationReducer(state.accomodations, action),
  flights: flightReducer(state.flights, action),
  loans: loanReducer(state.loans, action),
  applications: applicationReducer(state.applications, action),
  payments: paymentReducer(state.payments, action),
  blogs: blogReducer(state.blogs, action),
});

const MainContext = ({ children }) => {
  const [state, dispatch] = useReducer(combinedReducer, {
    users: createDummyUsers(9),
    unis: createDummyUnis(9),
    courses: createDummyCourses(20),
    support: createDummySupport(9),
    accomodations: createDummyAccomodations(9),
    flights: createDummyFlights(9),
    loans: createDummyLoans(9),
    applications: createDummyApplications(9),
    payments: createDummyPayments(9),
    blogs: createDummyBlogs(9),
  });

  const value = {
    state,
    dispatch,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, MainContext, ACTIONS };
