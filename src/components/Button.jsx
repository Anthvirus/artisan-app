
function Button(props){
    return(
        <button
        style={props.style}
        type={props.type}
        onClick={props.onClick}
        className="flex items-center justify-center w-auto h-12 p-4 text-lg font-semibold leading-6 text-white bg-green-800 rounded-md hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        {props.text}
      </button>
    )
}
export default Button;