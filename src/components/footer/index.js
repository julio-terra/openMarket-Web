import './styles.css';

const Footer = () =>{
  const year = new Date().getFullYear()
  return(
    <div className="footer bg-secondary m-0 text-dark text-center">
      <small>All rights reserved {year} &#xA9;</small>
    </div>
  )
};
export default Footer;