import React, { Component }  from 'react';
import axios from 'axios';
import Ws from '@adonisjs/websocket-client';
import "regenerator-runtime/runtime";
class App extends Component{
  state = {
    tables: [],
  }
  async componentDidMount() {
    try {
      // const response = await fetch('http://localhost:3333/QV40X10DLFULOPQN',myInit);

      const ws = Ws('ws://localhost:3333')
      ws.withApiToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsImlhdCI6MTYwMjQyMDg0Mn0.ao_rA7LBuF3WBKeqrXj0X8lTtsvDOxhgjyOuTreujWM').connect()
      const chat = ws.subscribe('notifications')
      chat.on('new:order', ()=>{
        alert('Novo pedido  ')
        document.location.reload() 
      })

      const card = ws.subscribe('account')
      card.on('new:card', ()=>{
        //document.location.reload() 
        alert('Nova Conta')
      })
      const options ={
            headers : {
                'Accept': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjcsImlhdCI6MTYwMjM2NzU5NH0.XSeubzAQd4w21Pt2H9sodrZt0oSlNW7a3IghPaqjxdE',
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
