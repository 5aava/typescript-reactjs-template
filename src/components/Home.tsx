import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';

interface IState {
  students: any[];
}

export default class Home extends React.Component<RouteComponentProps, IState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = { students: [] }
  }

  public componentDidMount(): void {
    axios.get(`http://localhost:8090/api/students`).then(data => {
      this.setState({ students: data.data })
    })
  }

  public deleteStudent(id: number) {
    axios.delete(`http://localhost:8090/api/students/${id}`).then(data => {
      const index = this.state.students.findIndex(student => student.id === id);
      this.state.students.splice(index, 1);
      this.props.history.push('/');
    })
  }

  public render() {
    const students = this.state.students;
    return (
      <div>
        {students.length === 0 && (
          <div className="text-center">
            <h2>No Students found at the moment</h2>
          </div>
        )}
        <div className="container">
          <div className="row">
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Progress</th>
                  <th scope="col">Updated</th>
                  <th scope="col">Created</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students && students.map(student =>
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.progressId}</td>
                    <td>{student.updatedAt}</td>
                    <td>{student.createdAt}</td>
                    <td>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group" style={{ marginBottom: "20px" }}>
                          <Link
                            to={`edit/${student.id}`}
                            className="btn btn-sm btn-outline-secondary">Edit Student </Link>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => this.deleteStudent(student.id)}>
                            Delete Student
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

}
