import React from 'react';
import {Field, reduxForm} from 'redux-form';
import axios from "axios";
import {parseApiErrors} from "../utils/apiUtils";
import {renderField} from "../form";
import {SUCCESS} from "../utils/responseMessage";

class Information extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            gender:true,
            success: '',
            error: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({gender :event.target.value});
    }

    handleSubmit(values) {
        const info = {
            name: values.name,
            age: parseInt(values.age),
            gender: this.state.gender
        };
        const conf =  {headers: {'Content-Type': 'application/json'}};

        const {reset} = this.props;
        axios.post(`${this.state.url}/information`, info,  conf)
            .then(response => {
                if (response.status === 200) {
                    this.setState({success:  SUCCESS});
                }
                this.setState({ error: {} });
                reset();
            })
            .catch(error => {
                this.setState({error: parseApiErrors(error)})
            });
    }

    render() {
        const {handleSubmit, submitting} = this.props;

        return (
            <div >
                <div >{this.state.success && this.state.success}</div>
                <div>Information settings</div>
                <form onSubmit={handleSubmit(this.handleSubmit)}>
                    <Field name="name" label="Nickname:" type="text" component={renderField}/>
                    {this.state.error && <small className="form-text text-danger">{this.state.error.name}</small>}
                    <Field name="age" label="Age:" type="text" component={renderField}/>
                    {this.state.error && <small className="form-text text-danger">{this.state.error.age}</small>}
                    <div>Gender</div>
                    <select name="gender" id="gender"  onChange={this.handleClick}>
                        <option value={true}>Male</option>
                        <option value={false}>Female</option>
                    </select>
                    <div>
                    <button type="submit" disabled={submitting}>
                        <span>Create</span>
                    </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'Information'
})(Information);