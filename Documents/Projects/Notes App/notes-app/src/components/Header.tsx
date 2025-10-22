

function Header(){
    return(
        <div className ="flex items-center w-full h-[60px] border-gray-500 border-b-2 shadow-lg">
            
            <img className="rounded-full ml-3 mr-[16px]" src="https://images.pexels.com/photos/1563647/pexels-photo-1563647.jpeg" alt="product_image1" height={26} width={26}/>
            
            <div className = "relative inline red text-black text-[20px]">Notes-App</div>
            
        </div>

    )
}
export default Header;