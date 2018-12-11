import { LOGIN, CHANGE_NICKNAME } from "../actions/user";

const initalState = {
    platforName: "",
    socialId: "",
    nickName: "",
    photos: ""
};

export default (state = initalState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                platforName: action.profile.platforName,
                socialId: action.profile.socialId,
                nickName: action.profile.nickName,
                photos: action.profile.photos
            };
        case CHANGE_NICKNAME:
            return {
                ...state,
                nickName: action.nickName
            };
        default:
            return state;
    }
};
