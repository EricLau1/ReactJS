import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { posts, users } from '../../../../utils/data';

class PostsList extends Component {

    render() {
        return (
            <article>
                {
                    posts.map(p => {
                        return (
                            <div key={p.id}>
                                <hr />
                                <h2>{p.title}</h2>
                                <small>Escrito por {this.getAuthorById(p.userId)}</small>
                                <br /><br />
                                <Link to={`/posts/${p.id}`}>ver mais</Link>
                               
                            </div>
                        );
                    })
                }                
            </article>
        )
    }

    getAuthorById(id) {
        const index = users.findIndex(u => u.id === id)
        return users[index].name;
    }
}

export default PostsList;