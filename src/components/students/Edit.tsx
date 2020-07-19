import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';

export interface IValues {
  [key: string]: any;
}
export interface IFormState {
  id: number,
  student: any;
  values: IValues[];
  submitSuccess: boolean;
  loading: boolean;
}


class EditStudent extends React.Component<RouteComponentProps<any>, IFormState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      student: {},
      values: [],
      loading: false,
      submitSuccess: false,
    }
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:8090/api/students/${this.state.id}`).then(data => {
      this.setState({ student: data.data });
    })
  }

  private processFormSubmission = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    this.setState({ loading: true });
    axios.put(`http://localhost:8090/api/students/${this.state.id}`, this.state.values).then(data => {
      this.setState({ submitSuccess: true, loading: false })
      setTimeout(() => {
        this.props.history.push('/');
      }, 1500)
    })
  }

  private setValues = (values: IValues) => {
    this.setState({ values: { ...this.state.values, ...values } });
  }
  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setValues({ [e.currentTarget.id]: e.currentTarget.value })
  }

  public render() {
    const { submitSuccess, loading } = this.state;
    return (
      <div className="App">
        {this.state.student &&
          <div>
            < h1 > Student List Management App</h1>
            <p> Built with React.js and TypeScript </p>

            <div>
              <div className={"col-md-12 form-wrapper"}>
                <h2> Edit Student </h2>
                {submitSuccess && (
                  <div className="alert alert-info" role="alert">
                    Student's details has been edited successfully
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
                      defaultValue={this.state.student.firstname}
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
                      defaultValue={this.state.student.lastname}
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
                      defaultValue={this.state.student.progressId}
                      onChange={(e) => this.handleInputChanges(e)}
                      className="form-control"
                      placeholder="Enter student's progressId " />
                  </div>

                  <div className="form-group col-md-4 pull-right">
                    <button className="btn btn-success" type="submit">
                      Edit Student </button>
                    {loading &&
                      <span className="fa fa-circle-o-notch fa-spin" />
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}


export default withRouter(EditStudent)
