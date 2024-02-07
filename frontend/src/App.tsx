import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUserName, setNewUserName] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Erro ao obter usuários');
      }
      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    try {
      const response = await fetch('/api/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: newUserName })
      });
      if (!response.ok) {
        throw new Error('Erro ao adicionar usuário');
      }
      const newUser: User = await response.json();
      setUsers([...users, newUser]);
      setNewUserName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Lista de Usuários</h1>
      <div>
        <input
          type="text"
          placeholder="Nome do novo usuário"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={addUser}>Adicionar Usuário</button>
      </div>
      <button onClick={fetchUsers}>Obter Usuários</button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
