import './about.scss';
import InVisionImage from '../../../assets/bg.webp';
import { NavLink } from 'react-router-dom';
export default function About() {
    return (
      <div>
         <div className='who-we-are-banner'>
            <div className='w-full'>
                <div className='container'>
                    <h1>
                        About Us
                    </h1>
                    <p>
                    Welcome to IMAGE LIGHT, where we specialize in crafting premium aluminum clip-on lighting photo frames, exclusive home decor aluminum frames, and high-quality electrical products. Our mission is to combine innovation and style, creating products that not only illuminate but also enhance the beauty of your spaces.
                          </p>
                        <p>
                        At IMAGE LIGHT, we are committed to delivering solutions that reflect your unique taste and meet your functional needs. From our stylish , modern photo frames to our reliable electrical products, every item in our collection is designed with precision and care.
                        </p>
                        <p>
                        Discover the perfect blend of style and functionality with IMAGE LIGHT—your destination for exceptional lighting, decor, and electrical solutions.
                        </p>
                    <div className='button-outline'>
                        <NavLink to={"/contact"}>Contact Us</NavLink>
                    </div>
                </div>
            </div>
        </div>
        <div className='invision-story-alignment'>
      <div className='container'>
        <div className='grid'>
            <div className='grid-items'>
                <h2>InVision Story</h2>
                <p>
                Here's a concise version of the InVision story for IMAGE LIGHT:

                <p>
                <b> IMAGE LIGHT</b> is dedicated to crafting innovative aluminum clip-on lighting photo frames, exclusive home decor aluminum photo frames, and electrical products. We bridge the gap between dealers and our company, ensuring seamless collaboration and growth in the electrical products market. Our focus on quality and customer satisfaction drives us to continually improve and expand our offerings. Through our unique designs and reliable products, we aim to illuminate every home with style and efficiency.     </p>

                </p>
              
            </div>
            <div className='grid-items'>
                <div className='img'>
                    <img src={InVisionImage} alt='InVisionImage'/>
                </div>
            </div>
        </div>
      </div>
    </div>
        <div className='who-weare-section-design-alignment'>
      <div className='container'>
        <div className='grid'>
            <div className='grid-items'>
                <h2>
                Who we are?
                </h2>
                <p>
                We are a company that specializes in creating unique lighting products, including electrical products and photo frames. Our frames are designed to light up your favorite pictures, making them perfect for advertising or decorating your home. We combine beautiful designs with practical lighting solutions to enhance any space.
                        </p>
                <p>
                We are the company that also provides the platform for the business between the dealers and our company to emphasize an improvement of the dealers and company both
                </p>
              
            </div>
           
        </div>
      </div>
    </div>
      </div>
    );
  }
  