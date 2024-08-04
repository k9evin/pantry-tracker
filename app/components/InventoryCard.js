import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function InventoryCard({ item, updateItem }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {item.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Category: {item.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${item.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Supplier: {item.supplier}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Quantity: {item.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={() => updateItem(item.id, 1)}>
          <AddIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => updateItem(item.id, -1)}>
          <RemoveIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
