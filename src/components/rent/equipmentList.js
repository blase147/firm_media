import React, { useState, useEffect } from 'react';
import PaymentButton from '../payment/PaymentButton';
import Receipt from '../Receipt/Receipt';
import './equipmentList.scss'; // Import your SCSS file
import { getEquipments } from '../../services/equipmentAPI';

const EquipmentList = () => {
  const [equipmentList, setEquipmentList] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [paymentReference, setPaymentReference] = useState('');

  useEffect(() => {
    // Fetch equipment data from the API
    const fetchEquipments = async () => {
      try {
        const data = await getEquipments();
        setEquipmentList(data);
      } catch (error) {
        console.error('Error fetching equipment data:', error);
      }
    };

    fetchEquipments();
  }, []);

  const handleRentClick = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handlePaymentSuccess = (reference) => {
    setPaymentReference(reference);
    alert(`Payment successful! Reference ID: ${reference}`);
    // Additional logic to handle post-payment processes
  };

  return (
    <div className="equipment-list">
      {equipmentList && equipmentList.map((equipment) => (
        <div className="equipment-item" key={equipment.id}>
          <img src={equipment.image_url} alt={equipment.name} />
          <h3>{equipment.name}</h3>
          <p>
            Type:
            {equipment.type}
          </p>
          <p>
            Price per hour:
            {equipment.price_per_hour}
            {' '}
            Naira
          </p>
          <p>{equipment.description}</p>
          <button type="button" onClick={() => handleRentClick(equipment)}>Rent</button>
        </div>
      ))}
      {selectedEquipment && !paymentReference && (
        <PaymentButton
          amount={selectedEquipment.price_per_hour * 100}
          email="user@example.com" // Replace with user's email
          onSuccess={handlePaymentSuccess}
        />
      )}
      {selectedEquipment && paymentReference && (
        <Receipt
          equipment={selectedEquipment}
          paymentReference={paymentReference}
        />
      )}
    </div>
  );
};

export default EquipmentList;
