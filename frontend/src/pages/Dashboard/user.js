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
  Stack,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Grid,
  FormLabel,
  RadioGroup,
  Radio,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Add as AddIcon, Close as CloseIcon, Image as ImageIcon } from '@mui/icons-material';
import API from '../../utilis/api';
import { showToast } from '../../utilis/toast-Components';

export default function ExpensePage() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: null,
    type: '',
    number: '',
    location: '',
    gender: '',
    address: ''
  })

  useEffect(() => {
    getAllUser();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setFormData({
      name: '',
      dob: '',
      email: '',
      number: '',
      address: '',
      type: '',
      gender: '',
      location: ''
    })
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getAllUser = async () => {
    try {
      const response = await API.get('/user/getAllUserDetails');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      showToast('error', 'Failed to load users!');
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await API.get(`/user/getUserById/${id}`);
      const user = response.data;

      setEditUserId(user._id); // Save ID for future PUT if needed
      setFormData({
        name: user.name,
        dob: user.dob?.split('T')[0],
        email: user.email,
        number: user.mobileNo,
        location: user.location,
        address: user.address,
        gender: user.gender,
        type: user.type
      });
      setOpen(true); // Open dialog
    } catch (error) {
      console.error('Failed to fetch user by ID:', error);
      showToast('error', 'Failed to load user data!');
    }
  };

  const handleSubmit = async () => {
    const payload = {
      name: formData.name,
      dob: formData.dob,
      email: formData.email,
      type: formData.type,
      mobileNo: parseInt(formData.number),
      location: formData.location,
      address: formData.address,
      gender: formData.gender
    }
    try {
      const response = await API.put('/user/createUser', payload)
      const userDetails = response.data
      console.log('User Details Saved Sucessfull', userDetails)
      showToast('success', 'User Details Saved!');
      handleClose();
      getAllUser();
    } catch (error) {
      console.log('Error Save User', error);
      showToast('error', 'User Data Create failed!');
    }
  };

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
          User Details
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ alignSelf: { xs: 'center', sm: 'auto' }, width: { xs: '100%', sm: 'auto' } }}
        >
          Add User
        </Button>
      </Stack>

      {/* Add Expense Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        sx={{
          '& .MuiDialog-paper': {
            width: {
              xs: '95%',     // Mobile view width
              sm: '90%',
              md: '60%'      // Desktop view width
            },
            height: {
              xs: 'auto',     // Mobile adjusts height to content
              md: '90%'       // Desktop fixed height
            },
            position: {
              xs: 'fixed',
              md: 'absolute'
            },
            top: {
              xs: '5%',
              md: '5%'
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
          Add User
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 4,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2}>
            <TextField
              label="Name"
              name="name"
              placeholder="Name"
              fullWidth
              value={formData.name}
              size="small"
              onChange={handleChange}
            />

            <TextField
              label="DOB"
              name="dob"
              type="date"
              fullWidth
              size="small"
              value={formData.dob}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Email"
              name="email"
              placeholder="Email"
              fullWidth
              size="small"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Number"
              name="number"
              type="number"
              fullWidth
              size="small"
              value={formData.number}
              onChange={handleChange}
            />

            <TextField
              label="Location"
              name="location"
              placeholder="Location"
              fullWidth
              size="small"
              value={formData.location}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="type-label">Type</InputLabel>
              <Select
                labelId="type-label"
                name="type"
                value={formData.type}
                label="Type"
                onChange={handleChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Guest">Guest</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Address"
              name="address"
              placeholder="Address"
              fullWidth
              size="small"
              value={formData.address}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Expenses List */}
      <Paper elevation={3} sx={{ mt: 3 }}>
        {users.length === 0 ? (
          <Typography align="center" color="text.secondary" p={4}>
            No users added yet.
          </Typography>
        ) : (
          <>
            {/* Desktop View */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Table sx={{ minWidth: 750 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Mobile</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>DOB</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Gender</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(even)': { backgroundColor: '#fafafa' },
                        '&:hover': { backgroundColor: '#e3f2fd' },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.type}</TableCell>
                      <TableCell>{user.mobileNo}</TableCell>
                      <TableCell>{user.dob?.split('T')[0]}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => getUserById(user._id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            {/* Mobile View */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              {users.map((user, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, backgroundColor: '#fafafa' }}>
                  <Typography variant="subtitle2">#{index + 1}</Typography>
                  <Typography><strong>Name:</strong> {user.name}</Typography>
                  <Typography><strong>Email:</strong> {user.email}</Typography>
                  <Typography><strong>Type:</strong> {user.type}</Typography>
                  <Typography><strong>Mobile:</strong> {user.mobileNo}</Typography>
                  <Typography><strong>DOB:</strong> {user.dob?.split('T')[0]}</Typography>
                  <Typography><strong>Location:</strong> {user.location}</Typography>
                  <Typography><strong>Gender:</strong> {user.gender}</Typography>
                  <Stack direction="row" spacing={1} mt={1}>
                    <IconButton color="primary" onClick={() => getUserById(user._id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Box>
          </>
        )}
      </Paper>
    </Box>
  );
}
