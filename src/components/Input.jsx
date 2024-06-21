function InputBox(props){
    return( 
      <div>
        <label htmlFor={props.for} className="block text-xl font-medium leading-6 text-gray-900">
          {props.Label}
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type={props.type}
            name={props.name}
            id={props.id}
            className="block w-full py-4 pl-2 pr-2 text-gray-900 border-0 rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-lg sm:leading-6"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
          />
        </div>
      </div>  
    )
}
export default InputBox;