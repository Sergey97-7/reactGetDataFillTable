import React, { Component } from 'react';
import User from './User';

/**** Таблица, навигация по страницам, сортировка ****/ 
class UsersTable extends Component {
    state = {
        sortId: false,
        sortName: false,
        sortSurname: false,
        sortEmail: false,
        sortPhone: false,
        currentPage: 1,
        usersPerPage: 50
    }
    /**** Заполнение userов на странице *****/
    users = () => { 
        const {data, updateData} = this.props;
        const indexOfLastUserOnPage = this.state.currentPage * this.state.usersPerPage;
        const indexOfFirstUserOnPage = indexOfLastUserOnPage - this.state.usersPerPage;
        const currentData = data.slice(indexOfFirstUserOnPage, indexOfLastUserOnPage);
        
        return currentData.map((data, index) => {
            return (<User key = {index} data = {data} updateData = {updateData} index = {index}/>) 
        });
    }
    /**** Добавление навигации по страницам *****/
    pages = () => {
        const {data} = this.props;
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(data.length / this.state.usersPerPage); i++) {
          pageNumbers.push(i);
        }
        if (pageNumbers.length <= 1) return null;
        return pageNumbers.map(number => {
            return (
                <li key={number} id={number} onClick={this.changePage.bind(this)}>
                    {number}
                </li>
            )
        });

    }

    changePage(event) {
        this.setState({
          currentPage: event.target.id
        });
    }
    /**** Сортировка столбцов *****/
    sortInputs = event => {
        const sort = event.target.getAttribute('sort');
        const eventId = event.target.id;
        const {data, updateData} = this.props;
        if (this.state[eventId] === true) {
            this.setState ({
                sortId: false,
                sortName: false,
                sortSurname: false,
                sortEmail: false,
                sortPhone: false,
            });
        } else {
            this.setState ({
                sortId: false,
                sortName: false,
                sortSurname: false,
                sortEmail: false,
                sortPhone: false,
                [eventId]: true 
            });
        }
        let direction = this.state[eventId] ? -1 : 1;
        const sorted = data.slice().sort((a, b) => {
            if (a[sort] === b[sort])  return 0;
            return a[sort] > b[sort] ? direction : direction * -1;
        });
        updateData({
            data: sorted,
            activeUser: null
          });
    }
    render() {
        if (!this.props.data) return (<p className ="load-info">No Data</p>); 
        if(this.props.isFetching) return (<p className ="load-info">Loading...</p>) 
        else {
            return (
                <div>
                    <table align="center" cellspacing="4" border="1" cellpadding="11" width="1000" className="UsersTable" >
                        <thead>
                            <tr> 
                                <th>
                                    id
                                    <input type="checkbox" checked={this.state.sortId} id="sortId" className="stateInput" onChange={this.sortInputs} sort="id"/>
                                    <label htmlFor="sortId" className="table_arrows" />
                                </th>
                                <th>
                                    Имя
                                    <input type="checkbox" checked={this.state.sortName} id="sortName" className="stateInput" onChange={this.sortInputs} sort="firstName"/>
                                    <label htmlFor="sortName" className="table_arrows" />
                                </th>
                                <th>
                                    Фамилия
                                    <input type="checkbox" checked={this.state.sortSurname} id="sortSurname" className="stateInput" onChange={this.sortInputs} sort="lastName"/>
                                    <label htmlFor="sortSurname" className="table_arrows" />
                                </th>
                                <th>
                                    E-mail
                                    <input type="checkbox" checked={this.state.sortEmail} id="sortEmail" className="stateInput" onChange={this.sortInputs} sort="email"/>
                                    <label htmlFor="sortEmail" className="table_arrows" />
                                </th>
                                <th>
                                    Телефон
                                    <input type="checkbox" checked={this.state.sortPhone} id="sortPhone" className="stateInput" onChange={this.sortInputs} sort="phone"/>
                                    <label htmlFor="sortPhone" className="table_arrows" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.users()}
                        </tbody>
                    </table>
                    <ul className="table-pages">
                        {this.pages()}
                    </ul>
                </div>
            );
        }
       
    }   
}

export default UsersTable;