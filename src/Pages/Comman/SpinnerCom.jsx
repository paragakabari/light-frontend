import './SpinnerCom.scss';

function SpinnerCom() {
  const spinnerWorking = true;

  return (
    <>
      {spinnerWorking && (
        <div className="spinner-overlay">
          <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>        </div>
      )}
    </>
  );
}

export default SpinnerCom;
