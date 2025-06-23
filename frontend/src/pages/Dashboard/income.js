// IncomePage.js

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip
} from '@mui/material';
import { Add as AddIcon, Close as CloseIcon, Image as ImageIcon, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import API from '../../utilis/api';
import { showToast } from '../../utilis/toast-Components';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function IncomePage() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    method: '',
    date: null
  })
  const [income, setIncome] = useState([]);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    getAllIncome();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({ icon: null, category: '', amount: '', method: '', date: '' });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const getAllIncome = async () => {
    try {
      const response = await API.get('/income/getAllIncomeDetails');
      setIncome(response.data);
      setCurrentPage(1);
    } catch (error) {
      console.error('Failed to fetch Income:', error);
      showToast('error', 'Failed to load Income!');
    }
  };

  const getIncomeById = async (id) => {
    try {
      const response = await API.get(`/income/getIncomeDetailsById/${id}`);
      const income = response.data;

      const formattedDate = new Date(income.date).toISOString().split('T')[0];

      setEditUserId(income._id);
      setFormData({
        category: income.category,
        amount: income.amount,
        method: income.method,
        date: formattedDate,
      });

      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch income by ID:', error);
      showToast('error', 'Failed to load income data!');
    }
  };

  const handleSubmit = async () => {
    const payload = {
      category: formData.category,
      amount: formData.amount,
      method: formData.method,
      date: formData.date
    }
    try {
      const response = await API.put('/income/createOrUpdateIncome', payload)
      const incomeDetails = response.data
      console.log('Income Saved Sucessfull', incomeDetails)
      showToast('success', 'Income Saved!');
      handleClose();
      getAllIncome();
    } catch (error) {
      console.log('Error Save Income', error);
      showToast('error', 'Income Create failed!');
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(income.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedIncome = income.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 } }}>
      {/* Header with button */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 2, sm: 0 }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'center' }}
        mb={4}
      >
        <Typography variant="h5" textAlign={{ xs: 'center', sm: 'left' }}>
          Income Details
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ alignSelf: { xs: 'center', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}
        >
          Add Income
        </Button>
      </Stack>

      {/* Add Expense Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            width: {
              xs: '95%',     // Mobile view width
              sm: '90%',
              md: '60%'      // Desktop view width
            },
            height: {
              xs: 'auto',     // Mobile adjusts height to content
              md: '70%'       // Desktop fixed height
            },
            position: {
              xs: 'fixed',
              md: 'absolute'
            },
            top: {
              xs: '10%',
              md: '15%'
            },
            left: {
              xs: '2.5%',
              md: '30%'
            },
            m: { xs: 'auto', md: 0 },
            borderRadius: 2,
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add Income
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={6}>

            {/* Category */}
            <TextField
              label="Category"
              name="category"
              placeholder="Rent, Groceries, etc"
              size='small'
              fullWidth
              value={formData.category}
              onChange={handleChange}
            />

            {/* Amount */}
            <TextField
              label="Amount"
              name="amount"
              type="number"
              size='small'
              placeholder="0.00"
              fullWidth
              value={formData.amount}
              onChange={handleChange}
            />

            {/* Method */}
            <FormControl fullWidth>
              <InputLabel id="method-label">Method</InputLabel>
              <Select
                labelId="method-label"
                name="method"
                size='small'
                value={formData.method}
                label="Method"
                onChange={handleChange}
              >
                <MenuItem value="Cash">Cash</MenuItem>
                <MenuItem value="Online">Online</MenuItem>
              </Select>
            </FormControl>

            {/* Date */}
            <TextField
              label="Date"
              name="date"
              type="date"
              size='small'
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={formData.date}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Add Income
          </Button>
        </DialogActions>
      </Dialog>

      {/* income List */}
      <Paper
        elevation={2}
        sx={{
          borderRadius: 3,
          p: 2,
          bgcolor: '#f9fafb',
          marginTop: '-20px',
          marginLeft: { xs: 0, md: '-30px' },
          overflowX: 'hidden',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {income.length === 0 ? (
          <Typography align="center" color="text.secondary" py={6}>
            No income added yet.
          </Typography>
        ) : (
          <>
            <List sx={{ px: 0 }}>
              {paginatedIncome.map((exp, i) => (
                <ListItem
                  key={i}
                  divider
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    px: { xs: 1, md: 2 },
                    bgcolor: '#ffffff',
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
                    '&:hover': { bgcolor: '#f0f4f8' },
                    flexWrap: { xs: 'wrap', md: 'nowrap' },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#1976d2' }}>
                      {exp.icon ? <exp.icon /> : <ImageIcon />}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Typography fontWeight="bold" fontSize="1rem" noWrap={false}>
                        {exp.category}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap={false}>
                        {new Date(exp.date).toLocaleDateString()}
                      </Typography>
                    }
                    sx={{ minWidth: 0 }}
                  />

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      ml: { xs: 0, md: 2 },
                      mt: { xs: 1, md: 0 },
                      width: { xs: '100%', md: 'auto' },
                      justifyContent: { xs: 'space-between', md: 'flex-start' },
                      flexWrap: 'nowrap',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Typography
                      color="green"
                      fontWeight="bold"
                      fontSize="1rem"
                      whiteSpace="nowrap"
                      flexShrink={0}
                    >
                      + ${parseFloat(exp.amount).toFixed(2)}
                    </Typography>

                    <Tooltip title="Edit">
                      <IconButton
                        edge="end"
                        color="primary"
                        size="small"
                        onClick={() => getIncomeById(exp._id)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        color="error"
                        size="small"
                      // onClick={() => handleDelete(exp._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </ListItem>
              ))}
            </List>

            {/* Pagination Controls */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 2,
                gap: 2,
                alignItems: 'center',
              }}
            >
              <IconButton
                color="primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                sx={{
                  bgcolor: '#e3f2fd',
                  border: '1px solid #90caf9',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#bbdefb',
                  },
                  '&:disabled': {
                    bgcolor: '#f5f5f5',
                    color: '#ccc',
                    borderColor: '#ddd',
                  },
                }}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>

              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ px: 1.5, py: 0.5, bgcolor: '#f0f4f8', borderRadius: 2 }}
              >
                Page {currentPage} of {totalPages}
              </Typography>

              <IconButton
                color="primary"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                sx={{
                  bgcolor: '#e3f2fd',
                  border: '1px solid #90caf9',
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#bbdefb',
                  },
                  '&:disabled': {
                    bgcolor: '#f5f5f5',
                    color: '#ccc',
                    borderColor: '#ddd',
                  },
                }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
