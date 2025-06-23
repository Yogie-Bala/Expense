import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import dayjs from 'dayjs';
import API from '../../utilis/api';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [data, setData] = useState({});
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

  const year = currentDate.year();
  const month = currentDate.month();
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf('month').day();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, incomeRes] = await Promise.all([
          API.get('/calender/getAllExpenseCalender'),
          API.get('/calender/getAllIncomeCalender'),
        ]);

        const rawExpenses = expenseRes.data.expenses || [];
        const rawIncomes = incomeRes.data.income || [];

        const combined = {};

        const formatKey = (dateStr) => {
          const date = new Date(dateStr);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        };

        rawExpenses.forEach(({ amount, date }) => {
          const key = formatKey(date);
          if (!combined[key]) combined[key] = { income: 0, expense: 0 };
          combined[key].expense += amount;
        });

        rawIncomes.forEach(({ amount, date }) => {
          const key = formatKey(date);
          if (!combined[key]) combined[key] = { income: 0, expense: 0 };
          combined[key].income += amount;
        });

        setData(combined);
      } catch (error) {
        console.error('Error fetching calendar data:', error);
      }
    };

    fetchData();
  }, []);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let date = 1; date <= daysInMonth; date++) {
    const key = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    calendarDays.push({ date, ...data[key] });
  }

  const handlePrevMonth = () => setCurrentDate(prev => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate(prev => prev.add(1, 'month'));
  const handleMobileTap = (event, index) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setSelectedIdx(selectedIdx === index ? null : index);
    setTooltipPos({ top: rect.top + window.scrollY + 50, left: rect.left + rect.width / 2 });
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3, maxWidth: '100%', overflowX: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2,
          gap: isMobile ? 1 : 0
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton size="small" onClick={handlePrevMonth}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight="bold">
            {currentDate.format('MMMM YYYY')}
          </Typography>
          <IconButton size="small" onClick={handleNextMonth}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      {/* Weekdays */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          mb: 1,
          backgroundColor: '#333',
          borderRadius: 1,
        }}
      >
        {weekdays.map(day => (
          <Box
            key={day}
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'white',
              py: 1,
              fontSize: isMobile ? '0.75rem' : '1rem'
            }}
          >
            {day}
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 1
        }}
      >
        {calendarDays.map((item, idx) => (
          <Paper
            key={idx}
            elevation={1}
            sx={{
              minHeight: isMobile ? 60 : 90,
              p: 1,
              backgroundColor: '#fff',
              textAlign: 'left',
              fontSize: isMobile ? '0.7rem' : '0.9rem',
              overflow: 'hidden',
              wordWrap: 'break-word',
              boxSizing: 'border-box',
              cursor: isMobile && item ? 'pointer' : 'default',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: isMobile ? '#fff' : '#f1f1f1'
              }
            }}
            onClick={(e) => isMobile && item && handleMobileTap(e, idx)}
          >
            {item && (
              <>
                <Typography variant="body2" fontWeight="bold">
                  {item.date}
                </Typography>
                {(!isMobile) && (
                  <>
                    <Typography variant="caption" color="green">
                      Income: ₹{item.income || 0}
                    </Typography>
                    <br />
                    <Typography variant="caption" color="red">
                      Expense: ₹{item.expense || 0}
                    </Typography>
                  </>
                )}
              </>
            )}
          </Paper>
        ))}
      </Box>

      {isMobile && selectedIdx !== null && calendarDays[selectedIdx] && (
        <Box
          sx={{
            position: 'absolute',
            top: tooltipPos.top,
            left: tooltipPos.left,
            transform: 'translateX(-50%)',
            backgroundColor: '#f0e6ff',
            color: '#3a3a3a',
            p: 2,
            borderRadius: 2,
            boxShadow: 4,
            zIndex: 9999,
            minWidth: 140,
            textAlign: 'left',
          }}
        >
          <Typography variant="subtitle2" fontWeight="bold">
            {dayjs(`${year}-${month + 1}-${calendarDays[selectedIdx].date}`).format('MMM D')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'green' }}>
            Income: ₹{calendarDays[selectedIdx].income || 0}
          </Typography>
          <Typography variant="body2" sx={{ color: 'red' }}>
            Expense: ₹{calendarDays[selectedIdx].expense || 0}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Calendar;
