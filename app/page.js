'use client';
import {
  Box,
  Modal,
  Typography,
  Stack,
  TextField,
  Button,
  Container,
  Paper,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useInventory } from './hooks/useInventory';
import InventoryCard from './components/InventoryCard';

// Create a custom theme with light purple
const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#ba68c8',
    },
    background: {
      default: '#f3e5f5',
    },
  },
});

export default function Home() {
  const {
    inventory,
    open,
    itemName,
    itemCategory,
    itemDescription,
    itemPrice,
    itemSupplier,
    searchTerm,
    filterCategory,
    addItem,
    updateItem,
    filteredInventory,
    handleOpen,
    handleClose,
    setItemName,
    setItemCategory,
    setItemDescription,
    setItemPrice,
    setItemSupplier,
    setSearchTerm,
    setFilterCategory,
  } = useInventory();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper
          elevation={3}
          sx={{ p: 4, borderRadius: 2, backgroundColor: 'background.paper' }}
        >
          <Typography variant="h3" color="primary" gutterBottom align="center">
            Inventory Management
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            mb={4}
            justifyContent="space-between"
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpen}
            >
              Add New Item
            </Button>
            <TextField
              variant="outlined"
              placeholder="Search by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ flexGrow: 1, minWidth: 150 }}
            />
            <FormControl variant="outlined" sx={{ flexGrow: 1, minWidth: 150 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Fruits">Fruits</MenuItem>
                <MenuItem value="Vegetables">Vegetables</MenuItem>
                <MenuItem value="Dairy">Dairy</MenuItem>
                <MenuItem value="Grains">Grains</MenuItem>
                <MenuItem value="Proteins">Proteins</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: 3,
            }}
          >
            {filteredInventory.map((item) => (
              <InventoryCard
                key={item.id}
                item={item}
                updateItem={updateItem}
              />
            ))}
          </Box>
        </Paper>

        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h5" mb={2}>
              Add New Item
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Item Name"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={itemCategory}
                  onChange={(e) => setItemCategory(e.target.value)}
                  label="Category"
                >
                  <MenuItem value="Fruits">Fruits</MenuItem>
                  <MenuItem value="Vegetables">Vegetables</MenuItem>
                  <MenuItem value="Dairy">Dairy</MenuItem>
                  <MenuItem value="Grains">Grains</MenuItem>
                  <MenuItem value="Proteins">Proteins</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={2}
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                type="number"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
              />
              <TextField
                label="Supplier"
                variant="outlined"
                fullWidth
                value={itemSupplier}
                onChange={(e) => setItemSupplier(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={addItem}
                startIcon={<AddIcon />}
              >
                Add Item
              </Button>
            </Stack>
          </Box>
        </Modal>
      </Container>
    </ThemeProvider>
  );
}
