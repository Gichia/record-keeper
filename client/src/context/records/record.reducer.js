import { 
    ADD_RECORD,
    UPDATE_RECORD,
    DELETE_RECORD,
    SET_CURRENT,
    FILTER_RECORDS,
    CLEAR_CURRENT,
    CLEAR_FILTER,
} from './record.types';


export default (state, action) => {
    switch (action.type) {
        case ADD_RECORD:
            return {
                ...state,
                records: [...state.records, action.payload],
            };
        case UPDATE_RECORD:
            return {
                ...state,
                records: state.records.map(record => record.id === action.payload.id ? action.payload : record),
            };
        case DELETE_RECORD:
            return {
                ...state,
                records: state.records.filter(record => record.id !== action.payload),
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload,
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null,
            };
        case FILTER_RECORDS:
            return {
                ...state,
                filtered: state.records.filter(record => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return record.title.match(regex) || record.description.match(regex) || record.type.match(regex);
                }),
            };
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null,
            };
        default:
            return state;
    }
}
