import { TOGGLE_MENU } from "./slideMenuTypes";

const initialState = { isMenuOpen: true };

const slideMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        default:
            return state;
    }
};

export default slideMenuReducer;