import UserSignUpForm from '../../components/clientsignup';
import Header from "../../components/Header";
import carpenter from "../../assets/images/carpenter.jpg";

function UserSignupPage(){
    return(
        <>
               <div className="box-border max-w-[100vw]">
               <Header/>
               <div className="flex">
                    <img src={carpenter} className="hidden w-1/3 h-2/5 lg:flex"/>
                    <UserSignUpForm/>
                </div>
            </div>
        </>
    )
}

export default UserSignupPage;