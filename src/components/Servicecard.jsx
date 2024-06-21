import { useState } from "react";
import Popup from "./popup";
import SearchBar from "./searchcomponent";
import Artisans from "./Artisans";
import ArtisanComponent from "./artisansearch-component.jsx";

export default function ServiceCard(service){
    const [showFinder, setFinder] = useState(false);

  const toggleFinder = () => {
    setFinder(!showFinder);
  }
    return (
        <div>
              <div key={service.id} className="relative cursor-pointer group" onClick={toggleFinder}>
                <div className="w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1 lg:aspect-none group-hover:opacity-75 lg:h-64">
                  <img
                    src={service.imageSrc}
                    alt={service.imageAlt}
                    className="object-cover object-center w-full h-48 lg:h-full lg:w-full"
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {service.name}
                    </h3>
                  </div>
                </div>
                <Popup show={showFinder} onClose={toggleFinder} HeaderText={service.HeaderText}>
                  <SearchBar/>
                  <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <ArtisanComponent name={Artisans.name} rating={Artisans.rating} availabilty={Artisans.availabilty} service={Artisans.service} image={Artisans.image}/>
                    <ArtisanComponent name={Artisans.name} rating={Artisans.rating} availabilty={Artisans.availabilty} service={Artisans.service} image={Artisans.image}/>
                    <ArtisanComponent name={Artisans.name} rating={Artisans.rating} availabilty={Artisans.availabilty} service={Artisans.service} image={Artisans.image}/>
                  </div>
                  <div className='flex'>
                    <h2 className='mx-auto mt-10 text-xl'>Suggestions</h2>
                  </div>
                </Popup>
              </div>

          </div>
    )
}