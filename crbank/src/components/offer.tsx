import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SERVER_URL from '@/conf';
import { Offer } from '@/types/Offer';

interface OfferProps {
  offer: Offer | null;
  onUpdate: () => Promise<void>; 
}

const OfferComponent: React.FC<OfferProps> = ({ offer, onUpdate}) => {
  const [loading, setLoading] = useState<boolean>(true);
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
      const response = await axios.post(`${SERVER_URL}/protected/takeOffer`, 
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
        console.log('Offer taken successfully');
      }
    } catch (error) {
      setError('Error taking offer');
    } finally {
      setLoading(false);
    }

    await onUpdate();
  };

  const handleRateOffer = async (rating: number) => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("token");
      if (!token) {
        setError("No JWT token found in cookies");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${SERVER_URL}/protected/rateOffer`, 
        { 
          'id': offer?.id,
          'rating': rating
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        console.log('Offer rated successfully');
      }
    } catch (error) {
      setError('Error rating offer');
    } finally {
      setLoading(false);
    }
    await onUpdate();
  };

  if (!offer) {
    return <p>Offer not found</p>;
  }

  return (
    <div className="relative bg-deepMossGreen shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-4">
      
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

      {/* Информация о кредиторе */}
      <div className="flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Кредитор:</p>
        <p className="text-lg font-semibold text-lightGray">{offer.creditor.username}</p>
        <p className="text-sm text-lightGray">Рейтинг:<br />{offer.creditor.rating.toFixed(1)}✬ | {offer.creditor.count_rating}웃</p>
      </div>

      {/* Кнопка принятия предложения */}
      <button
        onClick={handleTakeOffer} // Добавляем обработчик клика
        className="absolute top-4 right-4 bg-charcoalGreen hover:bg-charcoalBlue font-semibold text-lightGray py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
      >
        Принять предложение
      </button>
      {/* Оценка оффера */}
      {/* Оценка оффера */}
      <div className="flex flex-col items-center md:items-start space-y-2 mt-4">
        <p className="text-lg font-semibold text-darkGold">Оценить:</p>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                handleRateOffer(star);
              }}
              className={`text-lg font-semibold ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              ✬
            </button>
          ))}
        </div>
        <div className="flex space-x-2 mt-1">
          {[6, 7, 8, 9, 10].map((star) => (
            <button
              key={star}
              onClick={() => {
                setRating(star);
                handleRateOffer(star);
              }}
              className={`text-lg font-semibold ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              ✬
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferComponent;