import Home from '../pages/Dashboard/home';
import Income from '../pages/Dashboard/income';
import Expense from '../pages/Dashboard/expense';
import MinimalLayout from '../layout/MinimalLayout';
import Report from '../pages/Dashboard/report';
import UserInfo from '../pages/Dashboard/user';
import SearchResults from '../components/searchResult';
import Calendar from '../pages/Dashboard/calendar';

const MainRoutes = {
    path: '/',
    element: <MinimalLayout />,  // ✅ changed here
    children: [
        {
            path: 'pages/home',
            element: <Home />
        },
        {
            path: 'pages/income',
            element: <Income />
        },
        {
            path: 'pages/expense',
            element: <Expense />
        },
        {
            path: 'pages/userInfo',
            element: <UserInfo />
        },
        {
            path: 'pages/report',
            element: <Report />
        },
        {
            path: 'pages/calender',
            element: <Calendar />
        },
        {
            path: 'pages/:query',
            element: <SearchResults />
        },
    ]
};

export default MainRoutes;
