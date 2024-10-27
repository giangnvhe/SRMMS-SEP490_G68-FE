import { Image, CloudinaryContext } from "cloudinary-react";

const Grap2 = () => {
  const imagePublicIds = [
    "xpnlqxjz486achjhb26b",
    "vns2ee0ikhgfma5gzdox",
    "c3gxgobusywfhwke3pvt",
    "ravl26dziyculbmz82go",
  ];
  return (
    <CloudinaryContext cloudName="dt92oc9xc">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-center relative pb-3">
          Trải Nghiệm
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-400"></span>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {imagePublicIds.map((publicId, index) => (
            <div
              key={index}
              className="flex justify-center items-center overflow-hidden"
            >
              <Image
                publicId={publicId}
                width="300"
                height="300"
                className="object-cover w-full h-full border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </CloudinaryContext>
  );
};

export default Grap2;
