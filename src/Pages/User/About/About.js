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
                        Who We Are
                    </h1>
                    <p>
                        In Vision provides recruitment, staffing, and placement services to clients throughout Canada. Utilizing our team’s combined expertise and resources, we seek out and identify qualified candidates. We analyze their strengths, conduct cultural fit assessments, and match them with the right employers.
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
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                    desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 
                    'Content here,
                </p>
                <p>
                    Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and 
                    the like).
                </p>
                <p>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 
                    'Content here,
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
                    InVision is 100% Canadian owned. We have over 40 years combined recruiting experience, with success in sectors such as Engineering, Industrial/Skilled Trades, Information Technology and Professional Services within Canada and the U.S. We have a successful track record working on both small and large recruitment projects, across North America in sectors such as Mass Transit, Automotive/Aerospace, Utilities/Power and Automation. We have an excellent reputation of being professional, honest, and 
                    caring while developing long term relationships with clients, candidates, and employees.
                </p>
                <p>
                    We provide full recruitment services, including permanent placement, contract/temporary placement and payroll services, while 
                    always following our candidate process and client process.
                </p>
                <p>
                    Our commitment as we continue to grow and evolve is to provide the highest level of service while continuing to foster and development strong relationships and partnerships with both our clients and Candidates. InVision will also look to grow into new verticals, geographies, and stay on top of 
                    emerging technologies for the benefit of our customers.
                </p>
            </div>
            <div className='grid-items'>
                <h2>What Sets Us Apart
                </h2>
                <p>
                With over 40 years of combined recruitment expertise in Engineering/Manufacturing, Skilled Trades, IT and Office/Professional Services, the Managing Partners at InVision are actively involved in the entire recruitment process for all of our clients. Our clients can expect us to be engaged from the time that a job order is taken, throughout the entire recruitment process. This hands on approach ensures that InVision’s recruitment search methodologies, candidate qualification processes and overall service quality is an “industry leader”.
                </p>
                <p>
                    InVision provides strategic and focused search techniques to enhance the overall recruitment experience of our customers. We strive to provide our recruitment service at a higher level than our competition, resulting in more accurately sourced and suitable candidates for each opening. This means that our clients are receiving resumes that are vetted and qualified for their specific roles based on a candidate’s technical expertise, and Company “fit”. We place a very high standard on the services we provide, and it is our 
                    commitment to provide our best effort until a role is filled.
                </p>
            </div>
        </div>
      </div>
    </div>
      </div>
    );
  }
  