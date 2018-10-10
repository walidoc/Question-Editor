import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faTrashAlt,
    faPlus,
    faTimes,
    faPen,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import QuestionEditor from './components/QuestionEditor'
import Legend from './components/Legend'

library.add(faTrashAlt, faPlus, faTimes, faPen, faSpinner);

const App = () => (
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
)

export default App;
