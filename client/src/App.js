import React, { Component } from 'react'
import QuestionEditor from './components/QuestionEditor'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt, faPlus, faTimes, faPen, faSpinner } from '@fortawesome/free-solid-svg-icons'
import Legend from './components/Legend'

library.add(faTrashAlt, faPlus, faTimes, faPen, faSpinner);

class App extends Component {
    render() {
        return (
            <div>
                <div className="titles-container">
                    <h4 className="edition-title">Question Edition View</h4>
                    <h4 className="summary-title">Question Summary View</h4>
                </div>
                <div>
                    <QuestionEditor />
                    <Legend />
                </div>
            </div>
        );
    }
}

export default App;
