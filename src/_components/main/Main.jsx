import './main.css';

const Main = () => {
  return (
    <main className='flex' style={{ direction:'rtl'}}>
     <div className="hero-container">
  <div className="hero-text">
    <h1 className="hero-title primary">   🔥 مع المــارد 🔥</h1>
    <h1 className="hero-title">مستقبلك في إيدك... هتحس بالتغيير  في مستواك!</h1>
    <h2 className="hero-subtitle">
      <span className="bold">منهج منظم، شرح بسيط، ومتابعة مستمرة لحد ما تحقق هدفك</span><br />
      لأعلى الدرجات في الثانوية العامة – مادة الكيمياء
    </h2>
    <h2 className='hero-subtitle' style={{direction:'rtl' , color:"#64E2B7" , fontSize:"25px"}}>60 / 60   بين ايديك  يلا مستني اي  .... !!</h2>
    <div>
      <a href="/register" className="hero-button">انشئ حسابك الآن</a>
    </div>
  </div>
  

  <div className="hero-gradient"></div>

  <div className="hero-about">
   
  </div>
</div>
    </main>
  );
};

export default Main;
