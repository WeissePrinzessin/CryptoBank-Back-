import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import SERVER_URL from '@/conf';
import { OfferTaken } from '@/types/Offer';

interface OfferProps {
  offerTaken: OfferTaken | null;
  onUpdate: () => Promise<void>; 
}

const OfferTakenComponent: React.FC<OfferProps> = ({ offerTaken, onUpdate}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  
  const handleCloseOffer = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("token");
      if (!token) {
        setError("No JWT token found in cookies");
        setLoading(false);
        return;
      }
      const response = await axios.post(`${SERVER_URL}/protected/closeOffer`, 
        { 
          'id': offerTaken?.offer.id 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (response.status === 200) {
        console.log('Offer close successfully');
      }
    } catch (error) {
      setError('Error closing offer');
    } finally {
      setLoading(false);
    }

    await onUpdate();
  };
  

  

  if (!offerTaken) {
    return <p>Offer not found</p>;
  }

  return (
    <div className={`relative shadow-lg rounded-lg p-6 w-full max-w-4xl mx-auto grid grid-cols-9 grid-rows-2 gap-4 ${offerTaken.is_close ? 'bg-gray-600' : 'bg-deepMossGreen'}`}>
      
      {/* ID */}
      <div className="row-span-2 col-start-1 flex flex-col items-center md:items-start space-y-2 justify-center">
        <p className="text-lg font-semibold text-darkGold">ID:</p>
        <p className="text-lg font-semibold text-lightGray">{offerTaken.offer.id}</p>
      </div>

      {/* Количество криптовалюты */}
      <div className="row-start-1 col-start-2 col-span-2 flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Получено:</p>
        <p className="text-lg font-semibold text-lightGray">ETH {offerTaken.offer.ammount.toFixed(9)}</p>
      </div>
      <div className="row-start-2 col-start-2 col-span-2 flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Долг на сегодня:</p>
        <p className="text-lg font-semibold text-lightGray">ETH {offerTaken.new_ammount.toFixed(9)}</p>
      </div> 

      {/* Срок выдачи кредита */}
      <div className="row-start-1 col-start-4 col-span-2 flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Срок выдачи:</p>
        <p className="text-lg font-semibold text-lightGray">{offerTaken.offer.loan} дней</p>
      </div>

      {/* осталось */}
      <div className="row-start-2 col-start-4 col-span-2 flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Дней осталось:</p>
        <p className="text-lg font-semibold text-lightGray">{offerTaken.offer.loan - offerTaken.day_pass} дней</p>
      </div>

      {/* Процент */}
      <div className="row-start-1 col-start-6 flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Процент:</p>
        <p className="text-lg font-semibold text-lightGray">{offerTaken.offer.percent}%</p>
      </div>

      

      {/* Информация о кредиторе */}
      <div className="row-start-2 col-start-6  flex flex-col items-center md:items-start space-y-2">
        <p className="text-lg font-semibold text-darkGold">Кредитор:</p>
        <p className="text-lg font-semibold text-lightGray">{offerTaken.offer.creditor.username}#{offerTaken.offer.creditor.id}</p>
        <p className="text-sm text-lightGray">Рейтинг:<br />{offerTaken.offer.creditor.rating.toFixed(1)}✬ | {offerTaken.offer.creditor.count_rating}웃</p>
      </div>

      {/* Кнопка принятия предложения */}
      <div className="col-span-9 flex justify-end">
        <button
          onClick={handleCloseOffer} // Добавляем обработчик клика
          className={`${
            offerTaken.is_close
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-charcoalGreen hover:bg-charcoalBlue"
          } font-semibold text-lightGray py-2 px-4 rounded-md`}
          disabled={offerTaken.is_close}
          >

          {offerTaken.is_close ? "Закрыто" : "Закрыть сделку досрочно"}
        </button>
      </div>
      
    </div>
  );
};

export default OfferTakenComponent;