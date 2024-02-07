import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  return (
    <div>
      <h1>Lista de Usuários</h1>
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
