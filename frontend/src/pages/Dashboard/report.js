import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import API from '../../utilis/api';

const COLORS = ['#FFD54F', '#EF5350', '#FFA726', '#4DD0E1', '#7986CB'];

const Report = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReportMonthWiseData();
  }, []);

  const getReportMonthWiseData = async () => {
    try {
      const res = await API.get('/report/getMonthWiseValue');
      setChartData(res.data);
    } catch (err) {
      console.error('Failed to fetch report:', err);
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const total = chartData.reduce((acc, item) => acc + (item.expense || 0), 0);

  const pieData = chartData.map((item, index) => ({
    name: item.month,
    value: item.expense,
    percent: ((item.expense / total) * 100).toFixed(0),
  }));

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography
        variant={isMobile ? 'h5' : 'h4'}
        sx={{
          mb: isMobile ? 2 : 3,
          fontWeight: 700,
          textAlign: 'center',
          color: theme.palette.primary.main,
        }}
      >
        Monthly Financial Report
      </Typography>

      <Card
        elevation={5}
        sx={{
          borderRadius: 4,
          mb: 4,
          background: 'linear-gradient(135deg, #e3f2fd, #fce4ec)',
          color: theme.palette.mode === 'dark' ? '#fff' : '#333',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
          <Typography
            variant="h6"
            sx={{
              mb: isMobile ? 2 : 3,
              fontWeight: 600,
              textTransform: 'uppercase',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            Expense vs Income Report
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
              <CircularProgress />
            </Box>
          ) : isMobile ? (
            <>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={4}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <Box sx={{ textAlign: 'center', mt: -16, fontSize: 22, fontWeight: 'bold' }}>
                ${total}
              </Box>

              <Stack spacing={1} sx={{ mt: 8 }}>
                {pieData.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                      />
                      <Typography>{item.name}</Typography>
                    </Box>
                    <Typography>
                      - ${item.value} ({item.percent}%)
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </>
          ) : (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  stroke={theme.palette.text.primary}
                />
                <YAxis stroke={theme.palette.text.primary} />
                <Tooltip />
                <Legend verticalAlign="top" />
                <Bar
                  dataKey="expense"
                  fill={theme.palette.error.main}
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                  name="Expense"
                />
                <Bar
                  dataKey="income"
                  fill={theme.palette.success.main}
                  barSize={30}
                  radius={[4, 4, 0, 0]}
                  name="Income"
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Report;
