import React from "react";
import Offer from "@/components/offerTaken"; // Убедитесь, что Offer импортируется корректно
import { OfferTaken } from "@/types/Offer";

interface DealsSectionProps {
  openOffers: OfferTaken[];
  closedOffers: OfferTaken[];
  onUpdate: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const DealsSection: React.FC<DealsSectionProps> = ({
  openOffers,
  closedOffers,
  onUpdate,
  loading,
  error,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-3">
        Мои сделки
      </h1>

      <div className="grid grid-cols-2 grid-rows-1">
        <div className="row-start-1 col-start-1 gap-6 max-w-7xl mx-auto px-4">
          {/* Отображение открытых предложений */}
          {!loading && !error && openOffers.length > 0 && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 px-4 mt-8">
              {openOffers.map((offer) => (
                <Offer
                  offerTaken={offer}
                  key={offer.id}
                  onUpdate={onUpdate} // Передача функции обновления
                />
              ))}
            </div>
          )}

          {/* Пустой список открытых предложений */}
          {!loading && !error && openOffers.length === 0 && (
            <p className="text-center text-gray-600">Нет открытых предложений.</p>
          )}
        </div>

        <div className="row-start-1 col-start-2 gap-6 max-w-7xl mx-auto px-4">
          {/* Отображение закрытых предложений */}
          {!loading && !error && closedOffers.length > 0 && (
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-6 px-4 mt-8">
              {closedOffers.map((offer) => (
                <Offer
                  offerTaken={offer}
                  key={offer.id}
                  onUpdate={onUpdate} // Передача функции обновления
                />
              ))}
            </div>
          )}

          {/* Пустой список закрытых предложений */}
          {!loading && !error && closedOffers.length === 0 && (
            <p className="text-center text-gray-600">Нет закрытых предложений.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealsSection;
