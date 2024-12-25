"use client";

import React, { useState, useEffect } from "react";
import Offer from "@/components/offerTaken";
import SERVER_URL from "@/conf";
import Cookies from "js-cookie";
import axios from "axios";
import { FaUniversity, FaRandom, FaPlus } from "react-icons/fa";
import { OfferTaken } from "@/types/Offer";
import DealsSection from "@/components/DealSection";
import OfferSection from "@/components/OfferSection";
import {useRouter}  from 'next/navigation';

type User = {
  id: number;
  username: string;
  dev_wallet: number;
  rating: number;
  count_rating: number;
};

const Profile = () => {
  const router = useRouter();
  const [profile, setProfile] = useState<User | null>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [myOffers, setMyOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [myOfferTaken, setMyOfferTaken] = useState<OfferTaken[]>([]);
  const [showDeals, setShowDeals] = useState<boolean>(true); // Состояние для переключения компонентов

  const fetchProfileAndOffers = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = Cookies.get("token");

      if (!token) {
        setError("No JWT token found in cookies");
        setLoading(false);
        return;
      }

      const profileResponse = await axios.get(`${SERVER_URL}/protected/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const offersResponse = await axios.get(`${SERVER_URL}/protected/getMyCredits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const myOffersResponse = await axios.get(`${SERVER_URL}/protected/getMyOffers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(profileResponse.data);
      setOffers(offersResponse.data);
      setMyOffers(myOffersResponse.data);

      setMyOfferTaken(offersResponse.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchProfileAndOffers();
  }, []);

  const updateOffer = async () => {
    await fetchProfileAndOffers();
  };

  const openOffers = myOfferTaken.filter((offerTaken) => !offerTaken.is_close);
  const closedOffers = myOfferTaken.filter((offerTaken) => offerTaken.is_close);

  const giveOffers = myOffers.filter((offer) => offer.is_give);
  const pubOffers = myOffers.filter((offer) => offer.is_pub && !offer.is_give);
  const unPubOffers = myOffers.filter((offer) => !offer.is_pub && !offer.is_give);
 
  const toCreateOffer = async () => {
    router.push('/pages/CreateOffer'); // Переход на страницу профиля
  };

  return (
    <div className="min-h-screen bg-paleOlive py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Мой профиль
      </h1>

      {loading && <p className="text-center text-gray-600">Загрузка данных...</p>}
      {error && <p className="text-center text-red-500">Ошибка: {error}</p>}

      {!loading && !error && profile && (
        <div className="relative max-w-4xl mx-auto bg-charcoalGreen rounded-xl shadow-lg p-6">
          <div className="absolute top-2 right-1">
            <button
              onClick={() => setShowDeals((prev) => !prev)} // Переключаем состояние
              className="text-darkGold font-bold py-2 px-4 rounded"
            >
              <FaRandom size={24} />
            </button>
          </div>

          <div className="absolute top-2 left-1">
            <button 
              className="text-darkGold font-bold py-2 px-4 rounded"
              onClick={toCreateOffer}
            >
              <FaPlus size={24} />
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-darkGold rounded-full flex items-center justify-center text-6xl text-gray-950">
              <FaUniversity size={60} />
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-lightGray">
              {profile.username}#{profile.id}
            </h2>
            <hr className="w-1/2 mx-auto" />
            <h2 className="text-2xl font-semibold text-darkGold">
              ETH {profile.dev_wallet.toFixed(9)}
            </h2>
            <h2 className="text-xl font-semibold text-lightGray">
              {profile.rating.toFixed(1)}✬ | {profile.count_rating}웃
            </h2>
          </div>
        </div>
      )}

      <hr className="my-8 border-t-2 border-gray-950 max-w-4xl mx-auto" />

      {/* Отображение компонента в зависимости от состояния */}
      {showDeals ? (
        <DealsSection
          openOffers={openOffers}
          closedOffers={closedOffers}
          onUpdate={updateOffer}
          loading={loading}
          error={error}
        />
      ) : (
        <OfferSection
          pubOffers={pubOffers}
          unpubOffers={unPubOffers}
          giveOffers={giveOffers}
          onUpdate={updateOffer}
          loading={loading}
          error={error}
        />
        
      )
      }
      
    </div>
  );
};

export default Profile;
