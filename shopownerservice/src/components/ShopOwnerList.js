import React from 'react'
import './ShopOwnerList.css';

const ShopOwnerList = ({shopOwners, fetchShopOwner, setEditingShopOwner}) => {
    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/shopownerservice/${id}`,{method : 'DELETE'});
            fetchShopOwner();
        } catch (error) {
            console.log('Error deleting shop detail:', error);
        }
    };

  return (
    <div className='shop-list-container'>
        <h2>Shop Records</h2>
        {shopOwners.length === 0 ? (
            <p className='no-data'>No shops available.</p>
        ) : (
            <div className='shop-grid'>
                {shopOwners.map((shop) => (
                    <div key={shop.shopId} className='shop-card'>
                        <div className='shop-details'>
                            <h3>{shop.shopName}</h3>
                            <p><strong>ID : </strong>{shop.shopId}</p>
                            <p><strong>Shop Name : </strong>{shop.shopName}</p>
                            <p><strong>Owner Name : </strong>{shop.ownerName}</p>
                            <p><strong>Email Id: </strong>{shop.emailId}</p>
                            <p><strong>Phone number : </strong>{shop.phoneNumber}</p>
                        </div>

                        <div className='card-buttons'>
                            <button className='edit-btn' onClick={() => setEditingShopOwner(shop)}>
                                Edit
                            </button>

                            <button className='delete-btn' onClick={() => handleDelete(shop.shopId)}>
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

            </div>
        )}

    </div>
  );

};
export default ShopOwnerList;