import { v4 as uuid } from 'uuid';
import Home from '../pages/Home';
import Users from '../pages/Users';
import UserDetails from '../pages/Users/Details';
import Posts from '../pages/Posts';
import PostDetails from '../pages/Posts/Details';

const routes = [
    {
        key: uuid(),
        path: '/',
        component: Home,
        exact: true
    },
    {
        key: uuid(),
        path: '/users',
        component: Users,
        exact: true
    },
    {
        key: uuid(),
        path: '/users/:username',
        component: UserDetails,
        exact: true
    },
    {
        key: uuid(),
        path: '/posts',
        component: Posts,
        exact: true
    },
    {
        key: uuid(),
        path: '/posts/:id',
        component: PostDetails,
        exact: true
    },
];

export default routes;