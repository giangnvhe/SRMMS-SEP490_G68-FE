import React, { useState } from "react";
import { Image, CloudinaryContext } from "cloudinary-react";

const Grap3 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const imagePublicIds = [
    "pw0vnuvgdwhmdbunqy4m",
    "fumyzhapio6ikyrxvaks",
    "ravl26dziyculbmz82go",
    "tac7jcufmusdknru5smj",
    "vcpnxjqkt9lnd3jjz1bn",
    "nrhe73zlzwsl5xzjy5zp",
    "sfkchwklqgtiekwnzpl9",
    "udci5j1qbesk1s2vbfok",
  ];

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % imagePublicIds.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + imagePublicIds.length) % imagePublicIds.length
    );
  };

  return (
    <CloudinaryContext cloudName="dt92oc9xc">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center relative pb-3">
          Món Chính
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-400"></span>
        </h1>

        {/* Hiển thị các ảnh */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imagePublicIds.map((publicId, index) => (
            <div
              key={index}
              className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openModal(index)}
            >
              <Image
                publicId={publicId}
                width="100"
                height="100"
                gravity="auto"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="max-w-3xl w-full p-4">
              <button
                className="absolute top-4 right-4 text-white text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
              <div className="relative">
                <Image
                  publicId={imagePublicIds[currentImageIndex]}
                  width="800"
                  crop="scale"
                  className="w-full h-auto"
                />
                <button
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
                  onClick={prevImage}
                >
                  &lt;
                </button>
                <button
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2"
                  onClick={nextImage}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CloudinaryContext>
  );
};

export default Grap3;
