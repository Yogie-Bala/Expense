import React from 'react';
import { Box, Grid, Paper, Typography, Avatar, IconButton, Button, DialogContent, Dialog, DialogTitle, } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer, LabelList } from 'recharts';
import { blue, green, pink, cyan, yellow } from '@mui/material/colors';
import { useState } from 'react';
import API from '../../utilis/api';
import { useEffect } from 'react';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const StatCard = ({ icon, label, value, subtitle, color }) => (
    <Paper
        elevation={3}
        sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 3,
            height: {
                xs: 80, // mobile = stacked
                sm: 100,    // laptop = side-by-side
            },
            boxSizing: 'border-box',
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            color: '#fff',
        }}
    >
        <Avatar
            sx={{
                bgcolor: color,
                mr: 2,
                color: '#fff',
                width: 48,
                height: 48,
                boxShadow: `0 3px 6px ${color}55`,
            }}
        >
            {icon}
        </Avatar>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: { xs: 'center', sm: 'flex-start' },
                mt: { xs: 1, sm: 0 },
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {value}
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff' }}>
                {label}
            </Typography>
            <Typography variant="caption" sx={{ color: 'success.main' }}>
                {subtitle}
            </Typography>
        </Box>
    </Paper >
);

const ChartCard = ({ title, subtitle, children, gradient }) => (
    <Paper
        elevation={6}
        sx={{
            p: 2,
            borderRadius: 4,
            height: '100%',
            background: gradient,
            color: '#1e1e1e',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        }}
    >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
            {subtitle}
        </Typography>
        <Box sx={{ width: '100%', height: 230 }}>{children}</Box>
    </Paper>
);

const TransactionCard = ({ name, date, amount, color, type, icon }) => (
    <Paper
        elevation={2}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 1.5,
            borderRadius: 3,
            mb: 1.5,
            backgroundColor: '#fff',
        }}
    >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: color, mr: 2 }}>{icon}</Avatar>
            <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>{name}</Typography>
                <Typography variant="caption" sx={{ color: 'gray' }}>{date}</Typography>
            </Box>
        </Box>
        <Typography
            variant="body2"
            sx={{
                fontWeight: 600,
                color: type === 'income' ? 'green' : 'red',
            }}
        >
            {type === 'income' ? '+' : '-'}₹{Math.abs(amount)}
        </Typography>
    </Paper>
);

const TransactionList = ({ transactions }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Box
                sx={{
                    p: 2,
                    borderRadius: 4,
                    backgroundColor: 'white',
                    width: {
                        xs: '90%',  // Full width on mobile
                        md: '210%',  // Keep stretched layout on laptop
                    },
                    marginLeft: {
                        xs: 0,
                        md: '-30px',
                    },
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        My Transactions
                    </Typography>
                    <Button size="small" onClick={handleOpen}>
                        View All
                    </Button>
                </Box>

                {transactions?.slice(0, 6).map((t, i) => (
                    <TransactionCard
                        key={t._id || i}
                        name={t.category}
                        date={new Date(t.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                        amount={t.amount}
                        color={t.type === 'Income' ? green[100] : pink[100]}
                        type={t.type.toLowerCase()}
                        icon={t.category?.[0] || 'T'}
                    />
                ))}
            </Box>

            {/* Pop-up Dialog */}
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    sx: {
                        borderRadius: 4,
                        boxShadow: 10,
                        backgroundColor: '#fdfdfd',
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #ede7f6, #d1c4e9)',
                        color: '#4a148c',
                        fontWeight: 'bold',
                        py: 2,
                        px: 3,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16
                    }}
                >
                    All Transactions
                    <IconButton onClick={handleClose} sx={{ color: '#4a148c' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent
                    dividers
                    sx={{
                        maxHeight: 500,
                        overflowY: 'auto',
                        px: 3,
                        py: 2,
                        backgroundColor: '#fafafa',
                    }}
                >
                    {transactions?.map((t, i) => (
                        <TransactionCard
                            key={t._id || i}
                            name={t.category}
                            date={new Date(t.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                            amount={t.amount}
                            color={t.type === 'Income' ? green[100] : pink[100]}
                            type={t.type.toLowerCase()}
                            icon={t.category?.[0] || 'T'}
                        />
                    ))}
                </DialogContent>
            </Dialog>
        </>
    );
};

const Home = () => {
    const [expenseStackCardValue, setExpenseStackCardValue] = useState([]);
    const [incomeStackCardValue, setIncomeStackCardValue] = useState([]);
    const [balanceStackCardValue, setBalanceStackCardValue] = useState([]);
    const [transactionDetails, setTransactionDetails] = useState([]);
    const [topExpense, setTopExpense] = useState([]);
    const [topIncome, setTopIncome] = useState([]);

    const stats = [
        {
            label: incomeStackCardValue?.screenName,
            value: incomeStackCardValue?.totalAmount,
            icon: <AttachMoneyIcon />,
            color: blue[400],
            subtitle: '+3% than last month',
        },
        {
            label: expenseStackCardValue?.screenName || "Total Expense",
            value: expenseStackCardValue?.totalAmount || 0,
            icon: <MoneyOffIcon />,
            color: blue[500],
            subtitle: '+55% than last week',
        },
        {
            label: balanceStackCardValue?.screenName,
            value: balanceStackCardValue?.balance,
            icon: <AttachMoneyIcon />,
            color: blue[400],
            subtitle: '+3% than last month',
        },
    ];

    useEffect(() => {
        getExpenseStackCardDetails();
        getIncomeStackCardDetails();
        getBalanceStackCardDetails();
        getAllTransactionDetails();
        getTopExpenseDetails();
        getTopIncomeDetails();
    }, []);

    const getExpenseStackCardDetails = async () => {
        try {
            const response = await API.get('/dashboard/getAllExpenseAmount');
            setExpenseStackCardValue(response.data);
        } catch (error) {
            console.log('Error getting the stackcard Value', error)
        }
    };

    const getIncomeStackCardDetails = async () => {
        try {
            const response = await API.get('/dashboard/getAllIncomeAmount');
            setIncomeStackCardValue(response.data);
        } catch (error) {
            console.log('Error getting the stackcard Value', error)
        }
    };

    const getBalanceStackCardDetails = async () => {
        try {
            const response = await API.get('/dashboard/getAllBalanceAmount');
            setBalanceStackCardValue(response.data);
        } catch (error) {
            console.log('Error getting the stackcard Value', error)
        }
    };

    const getAllTransactionDetails = async () => {
        try {
            const response = await API.get('/dashboard/getAllTransactionDetails');
            if (response.data?.transactions) {
                setTransactionDetails(response.data.transactions);
            }
        } catch (error) {
            console.log('Error getting the transaction details', error);
        }
    };

    const getTopExpenseDetails = async () => {
        try {
            const response = await API.get('/dashboard/getTopExpenses');
            setTopExpense(response.data.topExpenses);
        } catch (error) {
            console.log('Error getting the transaction details', error);
        }
    };

    const getTopIncomeDetails = async () => {
        try {
            const response = await API.get('/dashboard/getTopIncome');
            setTopIncome(response.data.topIncome);
        } catch (error) {
            console.log('Error getting the transaction details', error);
        }
    };

    return (
        <Box sx={{ background: 'rgb(238, 242, 246)', minHeight: '100vh' }}>
            <Grid container spacing={3} sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        width: '100%',
                        flexDirection: {
                            xs: 'column', // mobile = stacked
                            sm: 'row',    // laptop = side-by-side
                        },
                    }}
                >
                    {stats.map((stat, i) => (
                        <Box sx={{ flex: 1 }} key={i}>
                            <StatCard {...stat} />
                        </Box>
                    ))}
                </Box>

                {/* Charts */}
                {/* Top 5 Incomes */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        width: {
                            xs: '100%', // mobile full width
                            md: '50%',  // desktop 50%
                        },
                        mt: -1,
                        maxHeight: {
                            xs: '300px',
                            md: '250px',
                        },
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <ChartCard
                            title="Top 5 Income"
                            subtitle="Your Top Performing Income Categories"
                            gradient="linear-gradient(135deg, #ede7f6, #5e35b1)"
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', height: 200 }}>
                                <ResponsiveContainer width="95%" height="100%">
                                    <BarChart
                                        data={topIncome}
                                        margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
                                        <XAxis dataKey="category" stroke="#4a148c" />
                                        <YAxis stroke="#4a148c" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#f3e5f5',
                                                border: '1px solid #ce93d8',
                                                color: '#4a148c',
                                            }}
                                            cursor={{ fill: 'rgba(126, 87, 194, 0.1)' }}
                                        />
                                        <Bar
                                            dataKey="amount"
                                            fill="#7e57c2"
                                            radius={[8, 8, 0, 0]}
                                            barSize={70}
                                        >
                                            <LabelList
                                                dataKey="amount"
                                                position="top"
                                                fill="#4a148c"
                                                fontSize={12}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </ChartCard>
                    </Box>
                </Box>

                {/* Top 5 Expenses */}
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        width: {
                            xs: '100%',
                            md: '50%',
                        },
                        mt: 3,
                        maxHeight: {
                            xs: '300px',
                            md: '250px',
                        },
                    }}
                >
                    <Box sx={{ flex: 1 }}>
                        <ChartCard
                            title="Top 5 Expenses"
                            subtitle="This Month's Highest Spending Categories"
                            gradient="linear-gradient(135deg, #eceff1, #455a64)"
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', height: 200 }}>
                                <ResponsiveContainer width="95%" height="100%">
                                    <BarChart
                                        data={topExpense}
                                        margin={{ top: 10, right: 10, left: -12, bottom: 0 }} // 👈 KEY CHANGE
                                    >
                                        <XAxis dataKey="category" stroke="#263238" />
                                        <YAxis stroke="#263238" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#f5f5f5',
                                                border: '1px solid #cfd8dc',
                                                color: '#263238',
                                            }}
                                            cursor={{ fill: 'rgba(96, 125, 139, 0.1)' }}
                                        />
                                        <Bar
                                            dataKey="amount"
                                            fill="#607d8b"
                                            radius={[8, 8, 0, 0]}
                                            barSize={70}
                                        >
                                            <LabelList
                                                dataKey="amount"
                                                position="top"
                                                fill="#263238"
                                                fontSize={12}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </ChartCard>
                    </Box>
                </Box>

                {/* Transaction */}
                <Grid container spacing={3} sx={{ marginTop: { xs: 2, md: '-270px' } }}>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TransactionList transactions={transactionDetails} />
                    </Grid>
                </Grid>
            </Grid>


        </Box>

    );
};

export default Home;
