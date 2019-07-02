import React, {Component} from 'react'
import axios from "../../../axios";
import Post from '../../../components/Post/Post'
import './Posts.css'
import {Link, Route, Switch} from 'react-router-dom'
import FullPost from "../FullPost/FullPost";


class Posts extends Component {

    state = {
        posts: [],
    };


    componentDidMount() {
        console.log(this.props);
        axios.get('/posts').then(res => {
            const posts = res.data.slice(0, 4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author: 'Max'
                }
            });
            this.setState({posts: updatedPosts});
            console.log(this.state.posts);
        }).catch(error => {
            console.log(error);
        })
    }


    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    };

    render() {
        let posts = <p style={{textAlign: 'center', color: 'red'}}>Something went wrong</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                    return (
                        <Link to={'/posts/' + post.id} key={post.id}>
                            <Post title={post.title}  author={post.author}
                                  clicked={() => this.postSelectedHandler(post.id)}/>
                        </Link>)
                }
            );
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>

        );
    }
}


export default Posts