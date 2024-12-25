"use client";

import React, { useState, useEffect } from "react";
import Offer from "@/components/offer";
import SERVER_URL from "@/conf"; // Убедитесь, что этот модуль экспортирует правильный URL
import Cookies from "js-cookie"; // Импортируем библиотеку для работы с cookies
import axios from "axios";

const Offers = () => {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения данных с бэкенда
  const fetchOffers = async () => {
    const token = Cookies.get('token'); // Получаем токен из cookies

    if (!token) {
      setError('No JWT token found in cookies');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${SERVER_URL}/protected/getAllOffers`, {
        headers: {
          Authorization: `Bearer ${token}`, // Передаем токен в заголовке
        },
      });

      setOffers(response.data); // Получаем продукты из ответа
      console.log('Offers:', response.data);
    } catch (err) {
      setError('Error fetching Offers');
      console.error('Error fetching Offers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const updateOffer = async () => {
    await fetchOffers(); // Повторное получение товаров
  };

  return (
    <div className="min-h-screen bg-paleOlive py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Кредитные предложения
      </h1>

      {/* Отображение статуса загрузки */}
      {loading && <p className="text-center text-gray-600">Загрузка предложений...</p>}

      {/* Отображение ошибки */}
      {error && <p className="text-center text-red-500">Ошибка: {error}</p>}

      {/* Отображение предложений */}
      {!loading && !error && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 px-4">
          {offers.map((offer) => (
            <Offer offer={offer} key={offer.id} onUpdate={updateOffer} />
          ))}
        </div>
      )}

      {/* Пустой список */}
      {!loading && !error && offers.length === 0 && (
        <p className="text-center text-gray-600">Нет доступных предложений.</p>
      )}
    </div>
  );
};

export default Offers;
