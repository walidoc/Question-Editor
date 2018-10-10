import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { removeColumn } from '../actions/questionActions'


class TColumns extends Component {
    onRemoveColumnClicked = (id, val) => {
        this.props.removeColumn(id, val)
    }

    render() {
        const { columns, openEditModal, onAddImageClicked } = this.props

        return (
            <TransitionGroup component={null}>
                {columns.map(({ _id, img, label, val }) => (
                    <CSSTransition key={_id} appear timeout={500} classNames="fade">
                        <th>
                            <input
                                style={{ display: 'none' }} 
                                type="file" 
                                onChange={(e) => onAddImageClicked(e, this.currentId, 'columns')} 
                                accept="image/*"
                                ref={imageInput => { this.colImageInput = imageInput }}
                            />

                            <img 
                                src={img} 
                                alt="" 
                                onClick={() => {
                                    this.currentId = _id
                                    this.colImageInput.click() 
                                }} 
                                className="thead-image"
                            />
                            
                            <p  
                                className="labels"
                                onClick={() => openEditModal(label, _id, 'columns')}
                            >
                                {label}
                            </p>

                            <FontAwesomeIcon 
                                icon="times" 
                                color="#fd7e14"
                                size="sm"
                                style={{ cursor: 'pointer', fontSize: '17px' }}
                                onClick={() => this.onRemoveColumnClicked(_id, val)}
                            />
                        </th>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        )
    }
}

export default connect(
    null,
    { removeColumn }
)(TColumns)
