import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'


class QueryService extends Component {

  constructor(props) {
    super(props);
    this.state = {month: 1, year: 2018, payday: 'no results', bank_payment: 'no results'}

    this.handleChangeMonth = this.handleChangeMonth.bind(this)
    this.handleChangeYear = this.handleChangeYear.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    axios.get('http://localhost:8081/payday/'+this.state.month+'/'+this.state.year)
    .then(response => {
      
      if(response.data.success) {
        this.setState({payday: response.data.payday, bank_payment: response.data.bank_payment_day})
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  handleChangeMonth(e) {
    this.setState({month: e.target.value})
  }

  handleChangeYear(e) {
    this.setState({year: e.target.value})
  }

  render() {

      return(
        <div className='query'>

          <select id="month" value={this.state.month} onChange={this.handleChangeMonth}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
         </select> 

         <select name="year" value={this.state.year} onChange={this.handleChangeYear}>
            <option value="2018">2018</option>
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>

          <button onClick={this.handleClick}>Query</button>

          <table> 
            <tr>
              <td><strong>Payday:</strong> {this.state.payday}</td>
            </tr>
            <tr>
              <td><strong>Send to bank:</strong> {this.state.bank_payment}</td>
            </tr>
          </table>
        </div>
      )
    }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Simple Payday Calculator</h1>
        </header>
        <h2>Query the Webservice</h2>
        <QueryService />
      </div>
    );
  }
}

export default App;
