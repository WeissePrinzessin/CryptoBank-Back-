"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation"; // Получаем текущий путь
import { useRouter } from 'next/navigation';
import SearchFilter from "./searchFilter"; // Подключаем компонент фильтрации
import Link from "next/link"; // Для навигации между страницами
import { FaUniversity } from "react-icons/fa"; // Импортируем иконку университета
import { FaAddressCard, FaFilter} from 'react-icons/fa';

const Header: React.FC = () => {
  const router = useRouter();
  const [isFilterVisible, setIsFilterVisible] = useState(false); // Состояние для показа/скрытия фильтров
  const [filters, setFilters] = useState<any>({}); // Состояние для хранения выбранных фильтров
  const pathname = usePathname();  // Получаем текущий путь с помощью usePathname

  // Функция для применения фильтров
  const handleFilter = (newFilters: any) => {
    setFilters(newFilters); // Обновляем фильтры
    // Здесь можно добавить логику для фильтрации предложений, например, отправить запрос на сервер с фильтрами
    console.log("Применены фильтры:", newFilters);
  };

  // Функция для открытия/закрытия фильтра
  const toggleFilters = () => {
    setIsFilterVisible((prevState) => !prevState);
  };

  const toProfile = async () => {
    router.push('/pages/profile'); // Переход на страницу профиля
  };

  return (
    <header className="bg-charcoalBlue text-white py-4 sticky top-0 left-0 w-full z-50">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 text-darkGold">
        <Link href="/pages/offers" className="flex items-center space-x-3">
          <FaUniversity size={24} />
          <h1 className="text-darkGold text-xl font-semibold">CRYPTO BANK</h1>
        </Link>

        {/* Выпадающее окно с фильтрами */}
        {isFilterVisible && (
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-paleOlive p-6 rounded-lg w-80">
              <SearchFilter onFilter={handleFilter} />
              <button
                onClick={toggleFilters}
                className="mt-4 w-full bg-terracota text-lightGray p-2 rounded-md"
              >
                Закрыть
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">

          {/* Кнопка для открытия/закрытия фильтров, только для страницы офферов */}
          {pathname === "/pages/offers" && (
            <button
              className="text-darkGold"
              onClick={toggleFilters}
            >
              <FaFilter size={25} />
            </button>
          )}

            <button className="text-darkGold hover:text-LightIceBlue" onClick={toProfile}>
            <FaAddressCard size={40} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
