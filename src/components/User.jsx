import React from 'react';

/**** Каждая строчка таблицы - user ****/
const Users = ({data, updateData, index}) => (
    <tr onClick={ () => updateData({ activeUser: index }) }>
        <td>{data.id}</td>
        <td>{data.firstName}</td>
        <td>{data.lastName}</td>
        <td>{data.email}</td>
        <td>{data.phone}</td>
    </tr>
)
export default Users;