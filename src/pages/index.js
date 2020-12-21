import Loadable from 'react-loadable';
import { LazyLoading } from '_components';

const StartPage = Loadable({
    loader: () => import('./StartPage'),
    loading: LazyLoading
})

const AllContacts = Loadable({
    loader: () => import('./AllContacts'),
    loading: LazyLoading
})

const USContacts = Loadable({
    loader: () => import('./USContacts'),
    loading: LazyLoading
})

export const routes = [
    {
        path: "/",
        exact: true,
        component: StartPage
    },
    {
        path: "/all-contacts",
        exact: true,
        component: AllContacts
    },
    {
        path: "/us-contacts",
        exact: true,
        component: USContacts
    }
]