import React, { Component } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import { removeColumn, addImage } from '../actions/questionActions'


class TColumns extends Component {

    onRemoveColumnClicked = (id, val) => {
        this.props.removeColumn(id, val)
    }

    onAddImageClicked = (e, imgId, imgColOrRow) => { 
        if(e.target.files && e.target.files[0]) {
            const image = e.target.files[0]
            const fd = new FormData()
            fd.append('img', image)
            const imgData = { imgId, imgColOrRow, fd }
            this.props.addImage(imgData)
        }
    }

    render() {
        const { columns, openEditModal } = this.props

        return (
            <TransitionGroup component={null}>
                {columns.map(({_id, img, label, val}) => (
                    <CSSTransition key={_id} appear={true} timeout={500} classNames="fade">
                        <th>
                            <input
                                style={{display: 'none'}} 
                                type="file" 
                                onChange={(e) => this.onAddImageClicked(e, this.currentId, 'columns')} 
                                accept="image/*"
                                ref={imageInput => this.colImageInput =  imageInput}
                            />

                            <img src={img} 
                                alt="" 
                                onClick={() => {
                                    this.currentId = _id
                                    this.colImageInput.click()}} 
                                className="thead-image"
                            />
                            
                            <p  className="labels"
                                onClick={() => openEditModal(label, _id, 'columns')}>
                                {label}
                            </p>

                            <FontAwesomeIcon 
                                icon="times" 
                                color="#fd7e14"
                                size="sm"
                                style={{cursor: "pointer"}}
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
    { removeColumn, addImage }
)(TColumns)