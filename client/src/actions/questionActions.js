import axios from 'axios'
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
} from './types'

export const getQuestion = () => dispatch => {
    dispatch(setQuestionLoading())
    axios.get('/api/columns').then(colRes => {
        axios.get('/api/rows').then(rowRes => {
            const data = {
                columns: colRes.data,
                rows: rowRes.data
            }
            return dispatch({
                type: GET_QUESTION,
                payload: data
            })
        })
    })
}

export const addColumn = column => dispatch => {
    axios
        .post('/api/columns', column)
        .then(res => 
            dispatch({
                type: ADD_COLUMN,
                payload: res.data
            })
        )
}

export const addRow = row => dispatch => {
    axios
        .post('/api/rows', row)
        .then(res => 
            dispatch({
                type: ADD_ROW,
                payload: res.data
            })
        )
}

export const removeRow = id => dispatch => {
    axios.delete(`/api/rows/${id}`)
        .then(res => 
            dispatch({
                type: REMOVE_ROW,
                payload: id
            })    
        )
}

export const removeColumn = (id, val) => dispatch => {
    axios.put('/api/rows', { val })
        .then(rowsRes => {
            axios.delete(`/api/columns/${id}`)
                .then(colRes => 
                    dispatch({
                        type: REMOVE_COLUMN,
                        payload: {id, val}
                    })
                )
        })
}

export const editLabel = labelChanges => dispatch => {
    const { id, label, colOrRow } = labelChanges
    axios.post(`/api/${colOrRow}/${id}`, { label })
        .then(res => 
            dispatch({
                type: EDIT_LABEL,
                payload: labelChanges
            })
        )
}

export const addImage = imgData => dispatch => {
    const { imgId, imgColOrRow, fd } = imgData
    axios.post(`/api/${imgColOrRow}/img/${imgId}`, fd)
        .then(res => {
            const imgUrl = res.data.img
            dispatch({
                type: ADD_IMAGE,
                payload: { imgId, imgColOrRow, imgUrl}
            })
        })
}

export const selectValue = ({id, val}) => dispatch => {
    axios.post(`/api/rows/${id}`, { val })
        .then(res => 
            dispatch({
                type: SELECT_VALUE,
                payload: {id, val} 
            })
        )
}

export const setQuestionLoading = () => {
    return {
        type: QUESTION_LOADING
    }
}
