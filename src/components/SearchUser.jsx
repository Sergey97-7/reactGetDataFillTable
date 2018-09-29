import React from 'react';

/**** Поиск подстроки в 5 полях пользователей, который сейчас в таблице  ****/

const SearchUser = ({data, updateData}) => {
    const input = document.getElementById('user-search-input');
    const search = () => {
        const value = input.value.toLowerCase();

        /* Поиск подстроки во всех колонках */
        const filter = data.filter( user => {
            console.log(user);
            return (user.id.toString().includes(value) || user.firstName.toLowerCase().includes(value) || user.lastName.toLowerCase().includes(value) || user.email.toString().includes(value) || user.phone.toString().includes(value))
        });

        /* Обновляем объект с данными отфильтрованными данными и сбрасываем состояние активного пользователя(меню сбоку) */

        updateData({
            data: filter,
            active: null
          });
    };

    return (
        <div className="container__search-input">
            <input className="user-search-input" id="user-search-input" type="text" placeholder="Поиск"/>
            <button className="btn" onClick={search}>Найти</button>
        </div>
    );
}

export default SearchUser;
