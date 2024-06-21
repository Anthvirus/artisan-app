
import ArtisanSignUpForm from "../../components/artisan-signup";
import Header from "../../components/Header";
import painter from "../../assets/images/painter.jpg"

export default function ArtisanSignUpPage(){
    return (
        <>
                <div className="box-border max-w-[100vw]">
                <Header/>
               <div className="flex">
                    <img src={painter} className="hidden w-1/3 h-2/5 lg:flex"/>
                    <ArtisanSignUpForm/>
                </div>
            </div> 
        </>
    )
}