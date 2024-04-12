import './header.css'; 

const Header = () => {
    return (
        
      <nav className='navBar'>
        <div className='head flex justify-center items-center' >
            <img className="img-div" src="https://assets.kpmg.com/is/image/kpmg/kpmg-logo-1" alt ="kpmg logo"/>
            <h3 class="font-sans text-4xl font-black text-[#00338D] tracking-tighter">Resume Recommendation</h3>
        </div>
      </nav>
    );
  }
  
  export default Header;