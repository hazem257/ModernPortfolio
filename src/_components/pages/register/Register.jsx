import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './register.css';

const API_BASE = 'https://dragonelmared-production.up.railway.app';
const API_URL = `${API_BASE}/api/register`;

const PersonalDataStep = ({ formData, onChange }) => (
  <div className="form-step">
    <input type="text" placeholder="الاسم الأول" value={formData.firstName} onChange={e => onChange('firstName', e.target.value)} required />
    <input type="text" placeholder="الاسم الأوسط" value={formData.middleName} onChange={e => onChange('middleName', e.target.value)} required />
    <input type="text" placeholder="الاسم الأخير" value={formData.lastName} onChange={e => onChange('lastName', e.target.value)} required />
    <input type="text" placeholder="رقم الهاتف" value={formData.phone} onChange={e => onChange('phone', e.target.value)} required />
    <input type="text" placeholder="رقم ولي الأمر" value={formData.fatherPhone} onChange={e => onChange('fatherPhone', e.target.value)} required />

    <div className="file-upload-wrapper" data-text={formData.nationalIdCopy?.name || "قم برفع صورة البطاقة او شهادة الميلاد الخاصة بك"}>
      <input type="file" accept="image/*,.pdf" required onChange={(e) => onChange("nationalIdCopy", e.target.files[0])}/>
    </div>
  </div>
);

export const egyptGovernments = [
  "القاهرة","الجيزة","الأسكندرية","الدقهلية","البحر الأحمر","البحيرة","الفيوم","الغربية",
  "الإسماعيلية","المنوفية","المنيا","القليوبية","الوادي الجديد","السويس","أسوان","أسيوط",
  "بني سويف","بورسعيد","دمياط","الشرقية","جنوب سيناء","كفر الشيخ","مطروح","الأقصر","قنا",
  "شمال سيناء","سوهاج"
];

const SchoolStep = ({ formData, onChange }) => (
  <div className="form-step">
    <select value={formData.gender} onChange={e => onChange('gender', e.target.value)} required>
      <option value="">النوع</option>
      <option value="ذكر">ذكر</option>
      <option value="أنثى">أنثى</option>
    </select>
    <select value={formData.government} onChange={e => onChange('government', e.target.value)} required>
      <option value="">المحافظة</option>
      {egyptGovernments.map((gov, i) => (
        <option key={i} value={gov}>{gov}</option>
      ))}
    </select>
    <select value={formData.grade} onChange={e => onChange('grade', e.target.value)} required>
      <option value="">الصف الدراسي</option>
      <option value="أولى اعدادي">أولى اعدادي</option>
      <option value="ثانية اعدادي">ثانية اعدادي</option>
      <option value="ثالثة اعدادي">ثالثة اعدادي</option>
      <option value="أولى ثانوي">أولى ثانوي</option>
      <option value="ثانية ثانوي">ثانية ثانوي</option>
      <option value="ثالثة ثانوي">ثالثة ثانوي</option>
    </select>
  </div>
);

const PasswordStep = ({ formData, onChange }) => (
  <div className="form-step">
    <input type="email" placeholder="البريد الإلكتروني (اختياري)" value={formData.email} onChange={e => onChange('email', e.target.value)} />
    <input type="password" placeholder="كلمة السر" value={formData.password} onChange={e => onChange('password', e.target.value)} required />
    <input type="password" placeholder="تأكيد كلمة السر" value={formData.confirmPassword} onChange={e => onChange('confirmPassword', e.target.value)} required />

    <div className="file-upload-wrapper" data-text={formData.userLogo?.name || "قم برفع صورة الملف الشخصي الخاص بك"}>
      <input type="file" accept="image/*,.pdf" required onChange={(e) => onChange("userLogo", e.target.files[0])}/>
    </div>
  </div>
);

const Register = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
    fatherPhone: '',
    gender: '',
    government: '',
    grade: '',
    email: '',
    password: '',
    confirmPassword: '',
    nationalIdCopy: null,
    userLogo: null,
  });

  function handleChange(field, value) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({ icon: 'error', title: 'خطأ', text: 'كلمة السر غير متطابقة!' });
      return;
    }

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) fd.append(key, val);
      });

      const res = await fetch(API_URL, { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({ icon: 'error', title: 'فشل التسجيل', text: data.msg || "حصل خطأ أثناء التسجيل" });
        return;
      }

      Swal.fire({
        icon: 'success',
        title: '🎉 تم إنشاء الحساب بنجاح!',
        showConfirmButton: false,
        timer: 2000
      });

      setStep(0);
      setFormData({
        firstName: '', middleName: '', lastName: '', phone: '', fatherPhone: '',
        gender: '', government: '', grade: '', email: '', password: '', confirmPassword: '',
        nationalIdCopy: null, userLogo: null
      });

    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'تعذر الاتصال بالسيرفر' });
    }
  }

  const steps = [
    { label: 'الخطوة 1', component: <PersonalDataStep formData={formData} onChange={handleChange} /> },
    { label: 'الخطوة 2', component: <SchoolStep formData={formData} onChange={handleChange} /> },
    { label: 'الخطوة 3', component: <PasswordStep formData={formData} onChange={handleChange} /> },
  ];

  return (
    <div className="register-container" dir="rtl">
      <h2 className="title">إنشاء حساب جديد</h2>
      <div className="logo-register flex">
        <img className="login-logo" src="./E1.png" alt="" />
      </div>

      <div className="progress-bar">
        <div className="fill" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
      </div>

      <form onSubmit={handleSubmit}>
        {steps[step].component}
        <div className="buttons">
          {step > 0 && <button type="button" onClick={() => setStep(step - 1)}>السابق</button>}
          {step < steps.length - 1 ? (
            <button type="button" onClick={() => setStep(step + 1)}>التالي</button>
          ) : (
            <button className='btn-re' type="submit">إنشاء الحساب</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Register;
