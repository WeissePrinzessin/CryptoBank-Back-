import React from "react";
import OfferComp from "@/components/MyOffer"; // Убедитесь, что Offer импортируется корректно
import { Offer } from "@/types/Offer"; // Убедитесь, что Offer импортируется корректно

interface OfferSectionProps {
  pubOffers: Offer[];
  unpubOffers: Offer[];
  giveOffers: Offer[];
  onUpdate: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const OfferSection: React.FC<OfferSectionProps> = ({
  pubOffers,
  unpubOffers,
  giveOffers,
  onUpdate,
  loading,
  error,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Мои предложения
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Колонка с открытыми предложениями */}
        <div className="space-y-6">
          {!loading && !error && pubOffers.length > 0 ? (
            pubOffers.map((offer) => (
              <OfferComp
                offer={offer}
                key={offer.id}
                onUpdate={onUpdate}
              />
            ))
          ) : (
            !loading && !error && (
              <p className="text-center text-gray-600">Нет опубликованных предложений.</p>
            )
          )}
        </div>

        {/* Колонка с закрытыми предложениями */}
        <div className="space-y-6">
          {!loading && !error && unpubOffers.length > 0 ? (
            unpubOffers.map((offer) => (
              <OfferComp
                offer={offer}
                key={offer.id}
                onUpdate={onUpdate}
              />
            ))
          ) : (
            !loading && !error && (
              <p className="text-center text-gray-600">Нет скрытых предложений.</p>
            )
          )}
        </div>
      </div>
      <hr className="my-8 border-t-2 border-gray-950 max-w-4xl mx-auto" />
      <div className="space-y-6">
          {!loading && !error && giveOffers.length > 0 ? (
            giveOffers.map((offer) => (
              <OfferComp
                offer={offer}
                key={offer.id}
                onUpdate={onUpdate}
              />
            ))
          ) : (
            !loading && !error && (
              <p className="text-center text-gray-600">Нет выданых предложений.</p>
            )
          )}
        </div>
    </div>
  );
};

export default OfferSection;
