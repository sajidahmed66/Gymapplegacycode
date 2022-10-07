import { TRAINEE_TOGGLE_MENU } from "./traineeSlideMenuTypes";

const initialState = { isMenuOpen: true };

const traineeSlideMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINEE_TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        default:
            return state;
    }
};

export default traineeSlideMenuReducer;