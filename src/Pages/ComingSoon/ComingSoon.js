import "./coming.scss";
import logo from "../../assets/img/Logo.png";

export default function ComingSoon() {
  return (
    <>
      <div className="coming-soon">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Coming Soon</h1>
        <p>We will be celebrating the launch of our new site very soon!</p>
     
      </div>
    </>
  );
}
