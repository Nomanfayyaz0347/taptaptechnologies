export default function Loader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh', flexDirection: 'column'
    }}>
      <div style={{position: 'relative', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="spinner"></div>
        <img
          src="/img/logo.png"
          alt="TapTap Technologies Logo"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 36,
            height: 36,
            transform: 'translate(-50%, -50%)',
            zIndex: 2
          }}
        />
      </div>
      <style jsx>{`
        .spinner {
          width: 60px;
          height: 60px;
          border: 5px solid #d800ff;
          border-top: 5px solid #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
