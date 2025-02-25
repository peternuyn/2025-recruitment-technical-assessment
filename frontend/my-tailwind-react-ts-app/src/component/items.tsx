import { useEffect, useState } from "react";
import asgm from "../../../assets/agsm.webp";
import ainsworth from "../../../assets/ainsworth.webp";
import anitab from "../../../assets/anitab.webp";
import biologicalScience from "../../../assets/biologicalScience.webp";
import biologicalScienceWest from "../../../assets/biologicalScienceWest.webp";
import blockhouse from "../../../assets/blockhouse.webp";
import businessSchool from "../../../assets/businessSchool.webp";
import civilBuilding from "../../../assets/civilBuilding.webp";
import colombo from "../../../assets/colombo.webp";
import cseBuilding from "../../../assets/cseBuilding.webp";

const Items = () => {
  const [items, setItems] = useState([
    { src: asgm, name: "ASGM" },
    { src: ainsworth, name: "Ainsworth" },
    { src: anitab, name: "Anita B" },
    { src: biologicalScience, name: "Biological Science" },
    { src: biologicalScienceWest, name: "Biological Science West" },
    { src: blockhouse, name: "Blockhouse" },
    { src: businessSchool, name: "Business School" },
    { src: civilBuilding, name: "Civil Building" },
    { src: colombo, name: "Colombo" },
    { src: cseBuilding, name: "CSE Building" },
  ]);

  return (
    <div className="container mx-auto mb-10">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item, index) => (
          <li
            className="card bg-base-100 w-full h-auto shadow-xl relative"
            key={index}
          >
            <figure className="relative overflow-hidden flex justify-center items-center flex-col">
              <img
                src={item.src}
                alt={`Image ${index + 1}`}
                className="rounded-t-xl w-full h-80 object-cover"
              />

              {/* Banner at the bottom, overflowing upward */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-base-200 rounded-xl transform -translate-y-1/4 mx-5 bg-orange-500 hover:bg-orange-400">
                <h2 className="card-title text-white">{item.name}</h2>
              </div>

              {/* Small banner on the right side */}
              <div className="absolute top-0 right-0 p-2 bg-green-500 text-white transform translate-y-1/4 mx-4 rounded-xl bg-white flex items-center">
                <span className="indicator-start badge bg-green-500 size-0.5 w-2 h-5 mr-2"></span>
                <p className="text-xs text-black">Available Rooms: 10</p>{" "}
                {/* Replace 10 with dynamic value */}
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Items;
