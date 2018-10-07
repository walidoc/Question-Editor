import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { selectValue, removeRow } from '../actions/questionActions'


class TRows extends Component {

    onRadioButtonClicked = (e, id) => {
        const val = e.currentTarget.value
        this.props.selectValue({id, val})
    }

    onRemoveRowClicked = id => {
        this.props.removeRow(id)
    }

    render() {
        const { rows, columns, openEditModal, onAddImageClicked } = this.props

        return (
            <TransitionGroup component={null}>
                {rows.map(row => 
                    <CSSTransition key={row._id} appear={true} timeout={500} classNames="fade">
                        <tr>
                            <th>
                                <input
                                    style={{display: 'none'}} 
                                    type="file" 
                                    onChange={(e) => onAddImageClicked(e, this.currentId, 'rows')} 
                                    accept="image/*"
                                    ref={imageInput => this.rowImageInput =  imageInput}
                                />

                                <img src={row.img} 
                                    alt="" 
                                    onClick={() => {
                                        this.currentId = row._id
                                        this.rowImageInput.click()}} 
                                    className="tbody-image"
                                />

                                <p style={{fontStyle: "italic", cursor: "pointer"}} 
                                    onClick={() => openEditModal(row.label, row._id, 'rows')}>
                                    {row.label}
                                </p>

                            </th>
                            <TransitionGroup component={null}>
                                {columns.map(col =>  
                                    <CSSTransition key={col._id} appear={true} timeout={500} classNames="fade">
                                        <td>
                                            <input 
                                                type="radio" 
                                                value={col.val} 
                                                checked={col.val === row.val}
                                                onChange={(e) => this.onRadioButtonClicked(e, row._id)} 
                                            />
                                        </td>   
                                    </CSSTransition>
                                )}
                            </TransitionGroup>
                            <td>
                                <FontAwesomeIcon 
                                    icon="times"
                                    color="#fd7e14"
                                    style={{cursor: "pointer"}}
                                    onClick={() => this.onRemoveRowClicked(row._id)}
                                />
                            </td>
                        </tr>
                    </CSSTransition>
                )}
            </TransitionGroup>
        )
    }
}

export default connect(
    null,
    { removeRow, selectValue }
)(TRows)