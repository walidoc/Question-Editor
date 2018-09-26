import React, { Component} from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { connect } from 'react-redux'
import { editLabel } from '../actions/questionActions'

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            label: '',
            id: '',
            colOrRow: ''
        };

    }

    initModal = ({label, id, colOrRow}) => {
        this.setState({
            modal: true,
            label,
            id,
            colOrRow
        })
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleLabelChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSave = () => { 
        const labelChanges = {
            id: this.state.id,
            label: this.state.label,
            colOrRow: this.state.colOrRow
        }

        this.props.editLabel(labelChanges)
        this.toggle()
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.props.buttonLabel}</ModalHeader>
                    <ModalBody>
                        <Input value={this.state.label} name="label" onChange={this.handleLabelChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSave}>Save</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    question: state.question
})

export default connect(mapStateToProps, { editLabel }, null, { withRef: true })(EditModal)
