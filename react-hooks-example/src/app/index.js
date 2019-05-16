import React, { useEffect, useState } from 'react';
import Favorite from './componets/Favorite';

function App() {

  // é necessário definir qual o tipo de dado que será retornado pelo useState
  // neste caso é um Array
  const [repositories, setRepositories] = useState([]);

  // executa apenas no primeiro carregamento
  useEffect(() => {
    fetch('https://api.github.com/users/ericlau1/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
    .catch(error => console.log(error))
  }, []);

  // executa todas as vezes que a variável repositories for atualizada/modificada
  useEffect(() => {
    var favorites = repositories.filter(repo => repo.favorite === true).length
    document.title = `Favoritos: ${favorites}`;
  }, [repositories]);

  function handleFavorite(id) {
    const upRepositories = repositories.map(repo => {
      return repo.id === id? { ...repo, favorite: !repo.favorite }: repo;
    });

    setRepositories(upRepositories);
  }

  return (
    <div className="App">
      <ul> 
        {repositories.map(repo => {
          return <li key={repo.id}>
              {repo.name}
              <Favorite repo={repo} callbackHandleFavorite={handleFavorite} />
            </li>
        })}
      </ul>
     
    </div>
  );
}

export default App;
