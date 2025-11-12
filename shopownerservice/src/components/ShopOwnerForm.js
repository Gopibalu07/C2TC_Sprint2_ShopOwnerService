import React, { useEffect, useState } from 'react'
import './ShopOwnerForm.css';

const ShopOwnerForm = ({ fetchShopOwner, editingShopOwner, setEditingShopOwner }) => {

    const [shopId, setShopId] = useState('');
    const [shopName, setShopName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [emailId, setEmailId] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        if(editingShopOwner){
            setShopId(editingShopOwner.shopId);
            setShopName(editingShopOwner.shopName);
            setOwnerName(editingShopOwner.ownerName);
            setEmailId(editingShopOwner.emailId);
            setPhoneNumber(editingShopOwner.phoneNumber);
            setUserName(editingShopOwner.userName);
            setPassword(editingShopOwner.password);
        }else{
            setShopId('');
            setShopName('');
            setOwnerName('');
            setEmailId('');
            setPhoneNumber('');
            setUserName('');
            setPassword('');
        }
    },[editingShopOwner]);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const s_owner = {
            shopId,
            shopName,
            ownerName,
            emailId,
            phoneNumber,
            userName,
            password
        };

        try {
            if(editingShopOwner){
                await fetch(`http://localhost:8080/shopownerservice/${shopId}`,{
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(s_owner),
                });
            }else{
                   await fetch('http://localhost:8080/shopownerservice',{
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(s_owner),
                });
            }

            fetchShopOwner();
            setEditingShopOwner(null);
            setShopId('');
            setShopName('');
            setOwnerName('');
            setEmailId('');
            setPhoneNumber('');
            setUserName('');
            setPassword('');

        } catch (error) {
            console.log("Error fetching ShopOwners details :", error);
        }
    };

  return (
    <div className='form-container'>
        <h2>{editingShopOwner ? 'Edit Shop Detail' : 'Add Shop'}</h2>
        <form onSubmit={handleSubmit}>

            <input type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            placeholder='Enter Shop Name' 
            required
            className='input-field'
            />

            <input type="text"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder='Enter Shop Owner Name' 
            required
            className='input-field'
            />

            <input type="mail"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            placeholder='Enter Email Id' 
            required
            className='input-field'
            />

            <input type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder='Enter Phone Number' 
            required
            className='input-field'
            />

            <input type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='Enter Username' 
            required
            className='input-field'
            />

            <input type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter Password' 
            required
            className='input-field'
            />

            <div>
                <button type='submit' className='input-field'>{editingShopOwner ? 'Update Shop detail' : 'Add Shop'}</button>    
            </div>    
        </form>
    </div>
  )
}

export default ShopOwnerForm