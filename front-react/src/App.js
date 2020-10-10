import React, { Component }  from 'react';
import axios from 'axios';

class App extends Component{
  state = {
    tables: [],
  }
  async componentDidMount() {
    try {
      // const response = await fetch('http://localhost:3333/QV40X10DLFULOPQN',myInit);
      const options ={
            headers : {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjgsImlhdCI6MTYwMTMxODAyNn0.J_SJdCihjQZKAC6e5DeEP5ITGoMDYeHafb8kKQFRmlM',
                'content-type': 'application/json'
            }
        }
      // const dataJson = await response.json();
      await axios.get('http://localhost:3333/manager/table', options)
      .then(res => {
        //const tables = res.tables;
        this.setState({ tables:res.data.tables });
        //console.log(res.data.tables)
      })

      //this.setState({ menu: dataJson.menu });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { tables } = this.state;

    return (
      <div className="App">
        {
          tables.map(table => {
            return (
              <div key={table.id}>
                Mesa{table.number} - Code: {table.hashcode}

              </div>
            )
          })
        }
      </div>
    );
  }

}

export default App;
