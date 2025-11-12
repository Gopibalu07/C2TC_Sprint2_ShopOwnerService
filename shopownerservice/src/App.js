import './App.css';
import { useEffect, useState } from 'react';
import ShopOwnerForm from './components/ShopOwnerForm';
import ShopOwnerList from './components/ShopOwnerList';

const App = () => {
  const [shopOwner, setShopOwner] = useState([]);
  const [editingShopOwner, setEditingShopOwner] = useState(null);

  useEffect(() => {
    fetchShopOwner();
  }, []);

  const fetchShopOwner = async () => {
    try {
      const response = await fetch('http://localhost:8080/shopownerservice');
      const data = await response.json();
      setShopOwner(data);
    } catch (error) {
      console.log('Error fetching ShopOwners details:', error);
    }
  };

  return (
    <div className="App">
      <h1>Shop Owner Management System</h1>

  
      <div className="main-content">
       
        <div className="left-section">
          <ShopOwnerForm
            fetchShopOwner={fetchShopOwner}
            editingShopOwner={editingShopOwner}
            setEditingShopOwner={setEditingShopOwner}
          />
        </div>

        
        <div className="right-section">
          <ShopOwnerList
            shopOwners={shopOwner}
            fetchShopOwner={fetchShopOwner}
            setEditingShopOwner={setEditingShopOwner}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
