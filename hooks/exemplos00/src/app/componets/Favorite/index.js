import React from 'react'; 

const Favorite = ({ repo, callbackHandleFavorite}) => {
    return (
        <>
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => callbackHandleFavorite(repo.id)}>
                {repo.favorite? 'Cancelar': 'Favoritar'}
            </button>
        </>
    );
}
export default Favorite;