import {Link} from 'react-router-dom';
// import Artisan from './Artisans';

export default function ArtisanComponent(props){
    
    // const { name, rating, service, availability, image } = artisan;
    return(
        <>
        <Link className="flex h-40 max-w-full px-4 overflow-hidden bg-white shadow-lg rounded-xl hover:opacity-75 hover:cursor-pointer" to='/home'>
        <img className="object-cover h-full w-72" src={props.image} alt={`${props.name} profile`} />
        <div className="flex flex-col items-center justify-around w-full px-6 py-4">
        <div className="mb-2 text-xl font-normal">{props.name}</div>
          <div className="flex justify-around gap-x-8">
            <p className="text-xl font-extrabold text-gray-700">{props.rating}</p>
            <p className="font-bold text-gray-700 underline text-md">{props.service}</p>
            <div className="w-3 h-3 my-auto border rounded-full" style={{backgroundColor : props.availability ? 'red' : 'green'}}>
            </div>
          </div>
        </div>
        </Link>
    </>
    )
    
}

