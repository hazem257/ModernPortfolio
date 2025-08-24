import React, { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn, FaEdit, FaTrash } from "react-icons/fa";
import "./dashboard.css";

const API_BASE = "https://dragonelmared-production.up.railway.app"; 

const DashboardTable = () => {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null);
  const [theme, setTheme] = useState("light");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    fatherPhone: "",
    email: "",
    nationalIdPath: "",
    userLogo: "",
  });
  const [files, setFiles] = useState({ nationalId: null, userLogo: null });

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 19 || hour <= 6 ? "dark" : "light");
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/students`);
      const data = await res.json();
      if (data.ok) setStudents(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_BASE}/api/students/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      const data = await res.json();
      if (data.ok) {
        setStudents((prev) =>
          prev.map((s) => (s._id === id ? { ...s, isActive: !currentStatus } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      const res = await fetch(`${API_BASE}/api/students/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.ok) {
        setStudents((prev) => prev.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (student) => {
    setEditStudent(student);
    setFormData({
      firstName: student.firstName,
      middleName: student.middleName,
      lastName: student.lastName,
      phone: student.phone,
      fatherPhone: student.fatherPhone || "",
      email: student.email || "",
      nationalIdPath: student.nationalIdPath || "",
      userLogo: student.userLogo || "",
    });
    setFiles({ nationalId: null, userLogo: null });
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, file) => {
    setFiles((prev) => ({ ...prev, [field]: file }));
  };

  const saveEdit = async () => {
    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      if (files.nationalId) form.append("nationalId", files.nationalId);
      if (files.userLogo) form.append("userLogo", files.userLogo);

      const res = await fetch(`${API_BASE}/api/students/${editStudent._id}`, {
        method: "PUT",
        body: form,
      });
      const data = await res.json();
      if (data.ok) {
        setStudents((prev) =>
          prev.map((s) =>
            s._id === editStudent._id ? { ...s, ...data.student } : s
          )
        );
        setEditStudent(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`table-dashboard ${theme}-theme`} dir="rtl">
      <h1 className="std">Student Dashboard</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>الاسم الأول</th>
              <th>الاسم الأوسط</th>
              <th>الاسم الأخير</th>
              <th>الهاتف</th>
              <th>هاتف ولي الأمر</th>
              <th>البريد الإلكتروني</th>
              <th>صورة البطاقة</th>
              <th>صورة المستخدم</th>
              <th>الحالة</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.firstName}</td>
                <td>{s.middleName}</td>
                <td>{s.lastName}</td>
                <td>{s.phone}</td>
                <td>{s.fatherPhone}</td>
                <td>{s.email || "-"}</td>
                <td>
  {s.nationalIdPath ? (
    <img
      src={`${API_BASE}${s.nationalIdPath.replace(/^\/?uploads\/(nationalIdPath|userLogo)\//, "/uploads/")}`}
      alt="بطاقة"
      className="thumb"
    />
  ) : (
    "لا توجد"
  )}
</td>
                <td>
  {s.userLogo ? (
    <img
      src={`${API_BASE}${s.userLogo.replace(/^\/?uploads\/(nationalIdPath|userLogo)\//, "/uploads/")}`}
      alt="صورة"
      className="thumb"
    />
  ) : (
    "لا توجد"
  )}
</td>
                <td>
                  <span className={`status ${s.isActive ? "active" : "inactive"}`}>
                    {s.isActive ? "مفعل" : "غير مفعل"}
                  </span>
                </td>
                <td className="actions">
                  <button title="تغيير الحالة" onClick={() => toggleActive(s._id, s.isActive)}>
                    {s.isActive ? <FaToggleOff /> : <FaToggleOn />}
                  </button>
                  <button title="تعديل" onClick={() => openEditModal(s)}><FaEdit /></button>
                  <button title="حذف" onClick={() => deleteStudent(s._id)}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editStudent && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>تعديل بيانات الطالب</h2>
            {["firstName", "middleName", "lastName", "phone", "fatherPhone", "email"].map((field) => (
              <div className="form-group" key={field}>
                <label>{field}</label>
                <input
                  value={formData[field]}
                  onChange={(e) => handleFormChange(field, e.target.value)}
                />
              </div>
            ))}

            <div className="form-group">
              <label>صورة البطاقة</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("nationalId", e.target.files[0])}
              />
              {formData.nationalIdPath && (
                <img
                  src={`${API_BASE}/${formData.nationalIdPath}`}
                  alt="بطاقة"
                  className="thumb"
                />
              )}
            </div>

            <div className="form-group">
              <label>صورة المستخدم</label>
              <input
                type="file"
                onChange={(e) => handleFileChange("userLogo", e.target.files[0])}
              />
              {formData.userLogo && (
                <img
                  src={`${API_BASE}/${formData.userLogo}`}
                  alt="بروفايل"
                  className="thumb"
                />
              )}
            </div>

            <div className="edit-actions">
              <button className="btn save" onClick={saveEdit}>حفظ</button>
              <button className="btn cancel" onClick={() => setEditStudent(null)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTable;
