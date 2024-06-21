import services from "./services";
// import ArtisanComponent from "./artisansearch-component";
// import Artisans from './Artisans';
import ServiceCard from "./Servicecard";

function Services(){
  
    return (
      <div className="px-4 py-16 mx-auto mt-4 bg-white 2xl:w-1/2 rounded-2xl md:w-2/3 sm:w-5/6">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900">What service are you looking for?</h2>
          <div className="grid grid-cols-2 p-2 mt-6 rounded-2xl gap-x-8 gap-y-5 lg:grid-cols-3 xl:gap-x-4">
            {services.map((service, id) => (
              <ServiceCard name={service.name} key={id} imageSrc={service.imageSrc} imageAlt={service.imageAlt} HeaderText={service.artisanType+"s"}/>
            ))}
          </div>
      </div>
    )
  }
  
export default Services;