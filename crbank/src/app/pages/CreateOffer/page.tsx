'use client';

import React, { useState } from "react";
import axios from "axios";
import SERVER_URL from "@/conf"; // Убедитесь, что этот файл настроен правильно
import Cookies from "js-cookie";

const CreateOffer: React.FC = () => {
  const [ammount, setAmmount] = useState<number | string>("");
  const [percent, setPercent] = useState<number | string>("");
  const [loan, setLoan] = useState<number | string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const token = Cookies.get("token");
    if (!token) {
      setError("Вы не авторизованы. Токен не найден.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${SERVER_URL}/protected/createOffer`,
        {
          ammount: parseFloat(ammount as string),
          percent: parseFloat(percent as string),
          loan: parseInt(loan as string),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setAmmount("");
        setPercent("");
        setLoan("");
      }
    } catch (err) {
      setError("Не удалось создать офер. Проверьте введённые данные.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-paleOlive">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Новое предложение
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-mutedSage shadow-md rounded-lg p-6 space-y-4"
      >
        {/* Поле Amount */}
        <div>
          <label
            htmlFor="ammount"
            className="block text-sm font-medium text-gray-700"
          >
            Количество (ETH)
          </label>
          <input
            type="number"
            id="ammount"
            value={ammount}
            onChange={(e) => setAmmount(e.target.value)}
            className="bg-paleOlive text-darkGray mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
            step="0.000000001"
          />
        </div>

        {/* Поле Percent */}
        <div>
          <label
            htmlFor="percent"
            className="block text-sm font-medium text-gray-700"
          >
            Процент (%)
          </label>
          <input
            type="number"
            id="percent"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
            className="bg-paleOlive text-darkGray mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
            step="0.1"
          />
        </div>

        {/* Поле Loan */}
        <div>
          <label
            htmlFor="loan"
            className="block text-sm font-medium text-gray-700"
          >
            Срок выдачи (в днях)
          </label>
          <input
            type="number"
            id="loan"
            value={loan}
            onChange={(e) => setLoan(e.target.value)}
            className="bg-paleOlive text-darkGray mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Ошибки и Успех */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm">Офер успешно создан!</p>
        )}

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? "bg-gray-400" : "bg-charcoalGreen hover:bg-charcoalBlue"
          }`}
        >
          {loading ? "Загрузка..." : "Создать офер"}
        </button>
      </form>
    </div>
  );
};

export default CreateOffer;
