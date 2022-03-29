import React, {Component} from "react";

class App extends Component {

  constructor() {
    super();
    this.state = {
      identificacion: '',
      nombre: '',
      cargo: '',
      _id: '',
      users: []
      
    };
    this.addUser = this.addUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  addUser(e) {
    e.preventDefault();
   if(this.state._id) {
    fetch(`/api/users/${this.state._id}` , {
        method: 'PUT',
        body: JSON.stringify({
          identificacion: this.state.identificacion,
          nombre: this.state.nombre,
          cargo: this.state.cargo
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => { 
        console.log(data);
        M.toast({html: 'usuario actualizado'});
        this.setState({identificacion: '',nombre: '', cargo: '', _id: ''});
        this.fetchUsers();
      });

   } else {
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      M.toast({html: 'Usuario guardado'});
      this.setState({identificacion: '',nombre: '', cargo: ''});
      this.fetchUsers();
  })
      .catch(err => console.error(err));
} 
  
  }

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        this.setState({users: data});
        console.log(this.state.users);
      });
  }

  deleteUser(id){
    if (confirm('¿Esta seguro de querer eliminar el usuario?')) {
      fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

      .then(res => res.json())
      .then(data => {
      console.log(data);
      M.toast({html: 'Usuario eliminado'});
      this.fetchUsers();
    });
  }

  }

  editUser(id) {
    fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => {
    console.log(data);
    this.setState({
      identificacion: data.identificacion,
      nombre: data.nombre,
      cargo: data.cargo,
      _id: data._id
    });
  });
  }
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render(){
    return (
      <div>
        { /* NAVEGACION */}
        <nav className="black">
        <div className="container">
          <a className="brand-logo" href="/">INGRESO DE USUARIOS</a>
        </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addUser}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="identificacion"  onChange={this.handleChange} type="number" placeholder="Numero de identificación" value={this.state.identificacion}></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="nombre" onChange={this.handleChange} type="text" placeholder="Nombre" value={this.state.nombre}></input>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="cargo" onChange={this.handleChange} type="text" placeholder="Cargo" value={this.state.cargo}></input>
                      </div>
                    </div>
                    <button type="submit" className="btn amber accent-4">
                      GUARDAR
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                <tr>
                  <th>Identificación</th>
                  <th>Nombre</th>
                  <th>Cargo</th>
                </tr>
                </thead>
                <tbody>
                  {
                    this.state.users.map(user => {
                      return (
                        <tr key={user._id}>
                          <td>{user.identificacion}</td>
                          <td>{user.nombre}</td>
                          <td>{user.cargo}</td>
                          <td>
                            <button onClick={() => this.editUser(user._id)} className="btn amber accent-4" style={{margin: '4px'}} >
                              <i className="material-icons">edit</i>
                            </button>
                            <button className="btn amber accent-4" onClick={() => this.deleteUser(user._id)}>
                              <i className="material-icons">delete</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;