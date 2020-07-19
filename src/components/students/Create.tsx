import * as React from 'react';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';

export interface IValues {
  firstname: string,
  lastname: string,
  progressId: number | null,
}
export interface IFormState {
  [key: string]: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}


class Create extends React.Component<RouteComponentProps, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      progressId: null,
      values: [],
      loading: false,
      submitSuccess: false,
    }
  }

  private processFormSubmission = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ loading: true });
    const formData = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      progressId: this.state.progressId,
    }
    this.setState({
      submitSuccess: true,
      values: [...this.state.values, formData],
      loading: false
    });
    axios.post(`http://localhost:8090/api/students`, formData).then(data => [
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500)
    ]);
  }

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }


  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div>
        <div className={"col-md-12 form-wrapper"}>
          <h2> Create Post </h2>
          {!submitSuccess && (
            <div className="alert alert-info" role="alert">
              Fill the form below to create a new post
            </div>
          )}
          {submitSuccess && (
            <div className="alert alert-info" role="alert">
              The form was successfully submitted!
            </div>
          )}
          <form
            id={"create-post-form"}
            onSubmit={this.processFormSubmission}
            noValidate={true}>
            <div className="form-group col-md-12">
              <label htmlFor="firstname"> First Name </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                onChange={(e) => this.handleInputChanges(e)}
                className="form-control"
                placeholder="Enter student's first name" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="lastname"> Last Name </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={(e) => this.handleInputChanges(e)}
                className="form-control"
                placeholder="Enter student's last name" />
            </div>

            <div className="form-group col-md-12">
              <label htmlFor="progressId"> Progress ID </label>
              <input
                type="number"
                id="progressId"
                name="progressId"
                min={1} max={4}
                onChange={(e) => this.handleInputChanges(e)}
                className="form-control"
                placeholder="Enter student's progressId " />
            </div>

            <div className="form-group col-md-4 pull-right">
              <button className="btn btn-success" type="submit">
                Create Student
              </button>
              {loading &&
                <span className="fa fa-circle-o-notch fa-spin" />
              }
            </div>
          </form>
        </div>
      </div>
    )
  }
}




export default withRouter(Create)
