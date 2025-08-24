import React from "react";
import './features.css';

const FeaturesSection = () => {
  return (
    <div className="features-section">
      <h2 className="features-title">
        إيه اللي هتلاقيه على <span className="highlight">منصة المارد؟</span>
      </h2>

      <div className="features-grid">
        <div className="feature-box fade-up">
          <img src="/edu.svg" alt="شرح مبسط ومركز" />
          <h3>شرح مبسط ومركز</h3>
          <p>شرح النظريات والمفاهيم بطريقة حياتية بسيطة، بعيد عن التعقيد الأكاديمي.</p>
        </div>

        <div className="feature-box fade-up">
          <img src="/exam.svg
          " alt="نماذج امتحانات" />
          <h3>نماذج امتحانات بنفس النظام</h3>
          <p>امتحانات تفاعلية زي امتحانات الثانوية العامة عشان تتدرب بنفس الأجواء.</p>
        </div>

        <div className="feature-box fade-up">
          <img src="/fut1.svg" alt="متابعة وتقييم" />
          <h3>متابعة دورية وتقييم مستمر</h3>
          <p>مراجعة أسبوعية لتقدمك وتوصيات بناءً على مستواك.</p>
        </div>

        <div className="feature-box fade-up">
          <img src="/table.svg" alt="خطة مذاكرة" />
          <h3>خطة مذاكرة منظمة</h3>
          <p>جدول مذاكرة مخصص حسب وقتك لمذاكرة بكفاءة وراحة.</p>
        </div>

        <div className="feature-box fade-up">
          <img src="/phone.svg" alt="تفاعل مباشر مع المارد" />
          <h3>تفاعل مباشر مع المارد</h3>
          <p>اسأل أي سؤال في الكيمياء وهتلاقي الرد الفوري من فريق منصة المارد، عشان تطمن إنك مش لوحدك.</p>
        </div>

        <div className="feature-box fade-up">
          <img src="/brain.svg" alt="مراجعات ليالي الامتحان" />
          <h3>مراجعات ليالي الامتحان</h3>
          <p>فيديوهات مركزة على أهم النقاط قبل الامتحان مباشرة، من إعداد منصة المارد.</p>
        </div>
      </div>

      <div className="cta-button">
        <a href="/Register" className="cta1" style={{direction:"ltr"}}>
          <img src="/user.svg" className="icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          </img>
          ابدأ الآن
        </a>
      </div>
    </div>
  );
};

export default FeaturesSection;
