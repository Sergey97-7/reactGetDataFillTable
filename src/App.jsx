import React, { Component } from 'react';
import UsersTable from './components/UsersTable';
import SelectedUser from './components/SelectedUser';
import SearchUser from './components/SearchUser';

/* Ссылки на информацию с сервера */
const bigData = 'https://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
const smallData = 'https://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';

class App extends Component {

  state = {
    data: null,
    activeUser: null, 
    isFetching: false
  }

  /**** Запрос к серверу ****/
  getData = url => {
    this.setState({
      isFetching: true,
      activeUser: null
    });
    const status = response => {
      if (response.status !== 200) {
        return Promise.reject(new Error(response.statusText))
      }
      return Promise.resolve(response)
  }
    const json = response => {
      return response.json()
    }
    fetch(url)
    .then(status)
    .then(json)
    .then(data => {
      this.rawData = data;
        this.setState({
          data: data,
          isFetching: false
        })
    })
    .catch(function (error) {
        console.log('error', error)
    })
  }
  
  /**** Метод обновления состояний, чтобы другие компоненты могли обновлять состояние этого компонента ****/
  updateData = states => {
    this.setState(states);
  }

    render() {
      return (
        <div>
          <div className="container__header">
            <div className="btns-getData">
              <button className='btn' onClick = {this.getData.bind(this, smallData)}>smallData</button>
              <button className='btn' onClick = {this.getData.bind(this, bigData)}>bigData</button>
            </div>
            <SearchUser data={this.rawData} updateData={this.updateData.bind(this)}/>
          </div>
          <UsersTable data={this.state.data} updateData={this.updateData.bind(this)} isFetching={this.state.isFetching} />
          <SelectedUser data={this.state.data} activeUser={this.state.activeUser}/>
        </div>
        
      );
    }
}

export default App;
