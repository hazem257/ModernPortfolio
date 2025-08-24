import React from "react";
import './testimons.css'; // تنسيق خارجي مخصص

const TestimonialsSection = () => {
  const hasTestimonials = true; // ✅ غيّره إلى true لعرض الآراء

  return (
    <section className="testimonials-container">
      <h2 className="testimonials-title">طلابنا قالوا إيه عن الكيمياء مع المارد؟</h2>

      {hasTestimonials ? (
        <div className="testimonials-grid">
          <div className="testimonial-card fade-in">
            <p className="quote">"كنت فاكر الكيمياء صعبة، بس المنصة خلتها أبسط من ما توقعت!"</p>
            <p className="name">- يوسف من القاهرة</p>
          </div>

          <div className="testimonial-card fade-in">
            <p className="quote">"المعادلات والروابط الكيميائية بقت سهلة وبتفهمها كأنك في تجربة عملية!"</p>
            <p className="name">- سما من المنوفية</p>
          </div>

          <div className="testimonial-card fade-in">
            <p className="quote">"المنصة ساعدتني أذاكر الكيمياء بأسلوب ممتع ومنظم."</p>
            <p className="name">- أحمد من القاهرة</p>
          </div>

          <div className="testimonial-card fade-in hidden-on-mobile">
            <p className="quote">"الشرح بالفيديوهات والتطبيقات خلا الكيمياء محبوبة فعلاً."</p>
            <p className="name">- عبد الحميد من المنوفية</p>
          </div>

          <div className="testimonial-card fade-in hidden-on-mobile">
            <p className="quote">"كنت بتهرب من المادة، دلوقتي ببدأ بيها كل يوم."</p>
            <p className="name">- علي من السويس</p>
          </div>

          <div className="testimonial-card fade-in hidden-on-mobile">
            <p className="quote">"فهمت الاتزان والتفاعلات أخيرًا، شرح مبسط وأمثلة واقعية."</p>
            <p className="name">- ملك من الإسكندرية</p>
          </div>
        </div>
      ) : (
         <div className="no-testimonials-wrapper fade-in">
    <img src="/empty.svg" alt="لا توجد آراء" className="no-testimonials-img" />
    <p className="no-testimonials-message">لم يتم إضافة آراء بعد. كن أول من يشارك تجربته!</p>
  </div>
      )}
      <div className="attack viber" style={{ width: '100%', height: "2rem", backgroundColor: "#77bef023" , marginTop:"2rem", marginBottom:"2rem" }}></div>
       <section className="cta-container">
      <div className="cta-content">
        <div className="cta-text">
          <h2>
            انضم لأوائل الكيمياء <br />
            وابدأ مرحلة <span className="highlight">جديدة </span> في حياتك الكميائيه
          </h2>
          <a href="/register" className="cta-btn">
            أنشئ حسابك الآن
          </a>
        </div>
        <div className="cta-image">
          <img src="./chemistry.svg" alt="سجل حسابك" />
        </div>
      </div>
    </section>
    </section>
    
  );
};

export default TestimonialsSection;
