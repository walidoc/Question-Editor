import { 
    GET_QUESTION, 
    ADD_COLUMN, 
    ADD_ROW, 
    REMOVE_COLUMN, 
    REMOVE_ROW, 
    EDIT_LABEL, 
    ADD_IMAGE,
    SELECT_VALUE,
    QUESTION_LOADING 
} from '../actions/types'


const initialState = {
    columns: [],
    rows: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTION:
            return {
                ...state,
                columns: action.payload.columns,
                rows: action.payload.rows,
                loading: false
            }

        case ADD_COLUMN:
            return {
                ...state,
                columns: [...state.columns, action.payload]
            }

        case ADD_ROW:
            return {
                ...state,
                rows: [...state.rows, action.payload]
            }

        case REMOVE_ROW:
            return {
                ...state,
                rows: state.rows.filter(row => row._id !== action.payload)
            }
        
        case REMOVE_COLUMN:
            return {
                ...state,
                rows: state.rows.map(row => {
                    if(row.val === action.payload.val) row.val = ''
                    return row
                }),
                columns: state.columns.filter(col => col._id !== action.payload.id)
            }
        
        case EDIT_LABEL:
            const { id, label, colOrRow } = action.payload
            return {
                ...state,
                [colOrRow]: state[colOrRow].map(cOr => {
                    if(cOr._id === id) { cOr.label = label }
                    return cOr
                })
            }
        
        case ADD_IMAGE:
            const { imgId, imgColOrRow, imgUrl } = action.payload
            return {
                ...state,
                [imgColOrRow]: state[imgColOrRow].map(cOr => {
                    if(cOr._id === imgId) { cOr.img = imgUrl }
                    return cOr
                })
            }
        
        case SELECT_VALUE:  
            return {
                ...state,
                rows: state.rows.map(row => {
                    if(row._id === action.payload.id) { row.val = action.payload.val }
                    return row
                })
            }
        
        case QUESTION_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state
    }
}
