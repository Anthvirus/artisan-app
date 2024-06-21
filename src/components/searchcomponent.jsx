import { useState } from 'react';
import Button from './Button';

export default function SearchBar(){
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(query)
  };

  return (
    <form className="flex items-center p-4 space-x-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        placeholder="Search..."
      />
      <Button
        type="submit"
        onClick={handleSubmit}
        text="Search"
      />
    </form>
  );
};