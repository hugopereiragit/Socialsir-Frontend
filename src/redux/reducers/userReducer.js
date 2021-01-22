import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    MARK_NOTIFICATIONS_READ
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: []
  };


  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state, //devolve o estado
          authenticated: true //metemos como autenticado
        };
      case SET_UNAUTHENTICATED:
        return initialState; //estado inicial tem autenticado como false
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload //payload e o authenticated loading credential .. etc desta maneira ligamos os likes aos likes as notifications as notifications
        };
        case LOADING_USER:
          return {
              ...state,
              loading: true
          };
          
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId //para n alterar os outros apenas o que queremos
        )
      };
      case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true)); //mudar o atributo read de false para true
      return {
        ...state
      };
    default:
      return state;
  }
  }