import { useState } from "react";
import './SpinnerCom.scss';

function SpinnerCom() {
  const [spinnerWorking, setSpinnerWorking] = useState(true);

  return (
    <>
      {spinnerWorking && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default SpinnerCom;
