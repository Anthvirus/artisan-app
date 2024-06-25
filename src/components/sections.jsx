import { Link } from "react-router-dom";
import Plumber from "../assets/images/plumbing-repair-service.jpg"
import ForHire from "../assets/images/clem-onojeghuo.jpg"

const callouts = [
    {
      name: 'Jobs, Gigs and Employment',
      description: 'Are you looking for opportunities to offer artisanal services like carpentry, plumbing etc. to customers and get paid? ',
      imageSrc: ForHire,
      imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
      Link: '/artisansignin',
    },
    {
      name: 'Artisanal services',
      description: 'Are you looking for artisanal services, looking for people who can help you with household services like carpentry, cleaning, plumbing?',
      imageSrc: Plumber,
      imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
      Link: '/usersignin',
    }
  ]

export default function Landing(){
    return (
        <>
        <div className=" bg-gray-200 min-h-[70rem] py-20">
        <div className="flex justify-center align-center text-xl font-bold"> 
          A Marketplace for artisan is meant to bring artisans right to potential customers
        </div>
        <div className="px-4 mx-auto bg-white border max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:max-w-none lg:py-32">
            <h2 className="text-5xl font-bold text-gray-900 ">How can we help you?</h2>
  
            <div className="mt-20 space-y-12 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:space-y-0">
              {callouts.map((callout) => (
                <div key={callout.name} className="relative group">
                  <div className="relative w-full overflow-hidden bg-white rounded-lg h-80 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="object-cover object-center w-full h-full"
                    />
                  </div>
                  <h3 className="mt-6 text-3xl font-bold">
                    <Link to={callout.Link}>
                      <p className="absolute inset-0" />
                      {callout.name}
                    </Link>
                  </h3>
                  <p className="mt-3 text-lg font-light text-gray-500">{callout.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
        </>
    )
}