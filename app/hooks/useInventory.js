import { useState, useEffect, useCallback, useMemo } from 'react';
import { firestore } from '@/firebase';
import {
  collection,
  query,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

export function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemSupplier, setItemSupplier] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  useEffect(() => {
    const q = query(collection(firestore, 'inventory'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inventoryList = [];
      snapshot.forEach((doc) => {
        inventoryList.push({ id: doc.id, ...doc.data() });
      });
      setInventory(inventoryList);
    });

    return () => unsubscribe();
  }, []);

  const addItem = useCallback(async () => {
    const newItem = {
      name: itemName,
      category: itemCategory,
      description: itemDescription,
      price: parseFloat(itemPrice),
      supplier: itemSupplier,
      quantity: 1,
    };

    try {
      await addDoc(collection(firestore, 'inventory'), newItem);
      handleClose();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }, [itemName, itemCategory, itemDescription, itemPrice, itemSupplier]);

  const updateItem = useCallback(async (itemId, quantityChange) => {
    try {
      const itemRef = doc(firestore, 'inventory', itemId);
      const itemSnap = await getDoc(itemRef);

      if (itemSnap.exists()) {
        const itemData = itemSnap.data();
        const newQuantity = (itemData.quantity || 0) + quantityChange;

        if (newQuantity <= 0) {
          await deleteDoc(itemRef);
        } else {
          await updateDoc(itemRef, { quantity: newQuantity });
        }
      } else {
        console.error('Item does not exist');
      }
    } catch (error) {
      console.error('Error updating item:', error);
    }
  }, []);

  const filteredInventory = useMemo(
    () =>
      inventory.filter(({ name, category }) => {
        const nameLower = name?.toLowerCase() || '';
        const searchTermLower = searchTerm?.toLowerCase() || '';

        return (
          nameLower.includes(searchTermLower) &&
          (filterCategory === 'All' || category === filterCategory)
        );
      }),
    [inventory, filterCategory, searchTerm]
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemName('');
    setItemCategory('');
    setItemDescription('');
    setItemPrice('');
    setItemSupplier('');
  };

  return {
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
  };
}
