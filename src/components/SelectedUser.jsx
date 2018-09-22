import React from 'react';

/**** Выбранный пользователь (менюшка сбоку) ****/
const SelectedUser = ({data, activeUser}) => {
    if (!data || !data[activeUser]) return null;
    const user = data[activeUser];
    return (
        <div className="selected-user">
            <p>Выбран пользователь: <span>{user.firstName} {user.lastName}</span></p>
            <p>Описание:</p> 
            <textarea readOnly defaultValue= {user.description} /> 
            <p>Адрес проживания: <span>{user.address.streetAddress}</span></p>
            <p>Город: <span>{user.address.city}</span></p>
            <p>Провинция/штат: <span>{user.address.state}</span></p>
            <p>Индекс: <span>{user.address.zip}</span></p>
        </div>
    )
}

export default SelectedUser;