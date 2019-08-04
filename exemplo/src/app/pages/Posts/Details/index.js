import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../../../components/Menu';
import Title from '../../../components/Title';
import { posts, users } from '../../../../utils/data';
import './styles.css';

class PostDetails extends Component {

    state = {
        post: undefined,
    };

    componentDidMount() {
        const { params } = this.props.match;
        const found = posts.filter(p => p.id === parseInt(params.id));
        if(found.length === 1) {

            const post = {
                ...found[0],
                author: users.filter(u => u.id === found[0].userId)[0],
            };
            
            this.setState({post});

        } else {
            this.setState({post: undefined});
        }
    }

    render() {
        const { post } = this.state;

        return (
            <section className="post-details">
                <Menu />
                <Title title={ !!post ? post.title : 'Post não existe' } />
                {
                    !!post && (
                        <div>
                            <small>Escrito por {post.author.name}</small>
                            <br />
                            <p>
                                {post.body}
                            </p>
                            <Link to="/posts">voltar</Link>
                        </div>
                    )
                }
            </section>
        )
    }

}

export default PostDetails;
