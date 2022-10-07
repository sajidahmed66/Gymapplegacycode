import { TRAINER_TOGGLE_MENU } from "./trainerSlideMenuTypes";

const initialState = { isMenuOpen: true };

const trainerSlideMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TRAINER_TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        default:
            return state;
    }
};

export default trainerSlideMenuReducer;