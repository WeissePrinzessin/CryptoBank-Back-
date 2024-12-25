import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SERVER_URL from '@/conf';
import { Offer } from '@/types/Offer';

interface OfferProps {
  offer: Offer | null;
  onUpdate: () => Promise<void>; 
}

const OfferComponent: React.FC<OfferProps> = ({ offer, onUpdate }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number>(0);

  
  const handleTakeOffer = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("token");
      if (!token) {
        setError("No JWT token found in cookies");
        setLoading(false);
        return;
      }

      const endpoint = offer?.is_pub
        ? "/protected/unpubOffer"
        : "/protected/pubOffer";
      const response = await axios.post(`${SERVER_URL}${endpoint}`, 
        { 
          'id': offer?.id 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        console.log('Offer pub unpub successfully');
      }
    } catch (error) {
      setError('Error taking offer');
    } finally {
      setLoading(false);
    }

    await onUpdate();
  };

  if (!offer) {
    return <p>Offer not found</p>;
  }

  return (
    <div className={`relative ${offer.is_give ? 'bg-gray-500' : offer.is_pub ? 'bg-deepMossGreen' : 'bg-gray-600'} shadow-lg rounded-lg p-6 w-full mx-auto flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4`}>
      
      {/* ID */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">ID:</p>
        <p className="text-lg font-semibold text-lightGray">{offer.id}</p>
      </div>

      {/* Количество криптовалюты */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <p className="text-2xl font-semibold text-darkGold">ETH</p>
        <p className="text-2xl font-semibold text-lightGray">{offer.ammount}</p>
      </div> 

      {/* Процент */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Процент:</p>
        <p className="text-lg font-semibold text-lightGray">{offer.percent}%</p>
      </div>

      {/* Срок выдачи кредита */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Срок выдачи:</p>
        <p className="text-lg font-semibold text-lightGray">{offer.loan} дней</p>
      </div>


      {/* Кнопка принятия предложения */}
      <button
        className={`${
          offer.is_give
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-charcoalGreen hover:bg-charcoalBlue"
        } absolute top-4 right-4 font-semibold text-lightGray py-2 px-4 rounded-md`}
        disabled={offer.is_give}
        onClick={handleTakeOffer}
      >
        { offer.is_give ?  'Выдано' : offer.is_pub ? 'Снять' : 'Опубликовать'}
      </button>
    </div>
  );
};

export default OfferComponent;
