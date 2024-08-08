import { createContext, useLayoutEffect, useReducer, useState } from "react";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../utils/axios";

const MainSiteContext = createContext();

const userAuthReducer = (state = [], action) => {
  switch (action.type) {
    case MAIN_SITE_ACTIONS.USER_LOGIN:
      return action.payload;

    case MAIN_SITE_ACTIONS.USER_SIGNUP:
      return action.payload;

    case MAIN_SITE_ACTIONS.USER_LOGOUT:
      return {
        name: "",
        id: "",
        isLogin: false,
      };

    default:
      return state;
  }
};
const ProfileReducer = (state = [], action) => {
  // console.log(action.payload)
  switch (action.type) {
    case MAIN_SITE_ACTIONS.GET_PROFILE:
      return action.payload;

    default:
      return state;
  }
};
const UnisProfileFilter = (state = [], action) => {
  switch (action.type) {
    case MAIN_SITE_ACTIONS.SET_UNISFILTERS:
      return action.payload;

    default:
      return state;
  }
};
const ContentBySearch = (state = "", action) => {
  switch (action.type) {
    case MAIN_SITE_ACTIONS.GET_CONTENT_BY_SEARCH:
      return action.payload;

    default:
      return state;
  }
};

const MAIN_SITE_ACTIONS = {
  USER_LOGIN: "user-login",
  USER_SIGNUP: "user-signup",
  USER_LOGOUT: "user-logout",
  GET_PROFILE: "get-profile",
  SET_UNISFILTERS: "set-unisfilters",
  GET_CONTENT_BY_SEARCH: "get-uni-by-search",
};
const combinedReducer = (state, action) => ({
  user: userAuthReducer(state.user, action),
  profile: ProfileReducer(state.profile, action),
  unisFilter: UnisProfileFilter(state.unisFilter, action),
  contentBySearch: ContentBySearch(state.data, action),
});
const MainSiteProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["tokenU"]);
  const [authStatus, setAuthStatus] = useState(true);

  const [state, dispatch] = useReducer(combinedReducer, {
    user: {
      name: "",
      id: "",
      isLogin: false,
    },
    profile: {
      fName: "",
      lName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    unisFilter: {
      fees: {
        min: 100000,
        max: 9000000,
      },
      countries: [],
      degree: undefined,
      majors: [],
      category: undefined,
      course: undefined,
      duration: undefined,
      city: undefined,
      englishExam: undefined,
      englishExamScore: undefined,
      academicExam: undefined,
      academicExamScore: undefined,
      scholarship: undefined,
    },
  });

  const validateUserToken = async () => {
    try {
      const response = await axiosInstance.post("auth/validateUserToken");
      if (response.data.valid) {
        const { user, valid } = response.data;
        const activeUser = {
          name: user.fName,
          id: user._id,
          isLogin: valid,
        };
        console.log(activeUser);
        dispatch({
          type: MAIN_SITE_ACTIONS.USER_LOGIN,
          payload: activeUser,
        });
        setAuthStatus(true);
      }
    } catch (error) {
      const activeUser = {
        name: "",
        id: "",
        isLogin: false,
      };
      console.log(error);
      dispatch({
        type: MAIN_SITE_ACTIONS.USER_LOGOUT,
        payload: activeUser,
      });
      setAuthStatus(false);
    }
  };

  useLayoutEffect(() => {
    validateUserToken();
  }, [cookies, dispatch]);

  return (
    <MainSiteContext.Provider
      value={{ state, dispatch, authStatus, setAuthStatus }}
    >
      {children}
    </MainSiteContext.Provider>
  );
};

export { MainSiteProvider, MainSiteContext, MAIN_SITE_ACTIONS };
