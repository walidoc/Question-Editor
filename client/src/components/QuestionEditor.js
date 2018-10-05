import React, { Component } from 'react'
import { Table } from 'reactstrap'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getQuestion, removeColumn, removeRow, addColumn, addRow, addImage, selectValue } from '../actions/questionActions'
import EditModal from './EditModal'
import Summary from './Summary'
import TColumns from './TColumns'


class QuestionEditor extends Component {

    componentDidMount() {
        this.props.getQuestion()
    }

    genNewColOrRow = (colOrRow) => {
        const { question } = this.props
        let newIdx = 0
        const length = question[colOrRow].length
        if(length) { 
            newIdx = question[colOrRow][length - 1].idx
        }
        newIdx ++
        if(colOrRow === 'columns') {
            const labelAndVal = 'col' + newIdx.toString()
            return {label: labelAndVal, val: labelAndVal, idx: newIdx}
        } else if(colOrRow === 'rows') {
            const label = 'row' + newIdx.toString()
            return {label, idx: newIdx}
        }
    }

    onAddColumnClicked = () => {
        const column = this.genNewColOrRow('columns')
        this.props.addColumn(column)
    }

    onAddRowClicked = () => {
        const row = this.genNewColOrRow('rows')
        this.props.addRow(row)
    }

    onRemoveRowClicked = id => {
        this.props.removeRow(id)
    }

    onRemoveColumnClicked = (id, val) => {
        this.props.removeColumn(id, val)
    }

    openEditModal = (label, id, colOrRow) => {
        const modalData = {label, id, colOrRow} 
        this.refs.editModal.getWrappedInstance().initModal(modalData)
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

    onRadioButtonClicked = (e, id) => {
        const val = e.currentTarget.value
        this.props.selectValue({id, val})
    }

    render() {
        const { columns, rows } = this.props.question
        return (
            <div className="question-container">
                <div className="question-table">
                    <Table responsive size="sm" borderless>
                        <thead>
                            <tr>
                                <th></th>
                                <TColumns 
                                    columns={columns}
                                    openEditModal={this.openEditModal}
                                />
                                <th>
                                    <FontAwesomeIcon 
                                        icon="plus"
                                        color="#28A745"
                                        style={{cursor: "pointer", marginBottom: "70px"}}
                                        onClick={this.onAddColumnClicked}
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <TransitionGroup component={null}>
                            {
                                rows.map(row => 
                                    <CSSTransition key={row._id} appear={true} timeout={500} classNames="fade">
                                        <tr>
                                            <th>
                                                <input
                                                    style={{display: 'none'}} 
                                                    type="file" 
                                                    onChange={(e) => this.onAddImageClicked(e, this.currentId, 'rows')} 
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
                                                    onClick={() => this.openEditModal(row.label, row._id, 'rows')}>
                                                    {row.label}
                                                </p>

                                            </th>
                                            <TransitionGroup component={null}>
                                            {
                                                columns.map(col =>  
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
                                                )
                                            }
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
                                )
                            }
                            </TransitionGroup>
                            <tr>
                                <th scope="row">
                                    <FontAwesomeIcon 
                                        icon="plus"
                                        color="#28A745"
                                        style={{cursor: "pointer", marginLeft: "12px", marginTop: "20px"}}
                                        onClick={this.onAddRowClicked}
                                    />
                                </th>
                            </tr>
                        </tbody>
                    </Table>
                    <EditModal ref="editModal" buttonLabel="Edit Label"/>
                </div>
                <Summary columns={columns} rows={rows} />
            </div>
        );
      }
}

QuestionEditor.prototypes = {
    getQuestion: PropTypes.func.isRequired,
    question: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    question: state.question
})

export default connect(
    mapStateToProps,
    { getQuestion, addColumn, addRow , removeColumn, removeRow, addImage, selectValue }
)(QuestionEditor)