import { MapPin, Calendar, GraduationCap, Shield, Code } from "lucide-react";
import "./About.css";

const About = () => {
  const info = [
    {
      id: 1,
      icon: <MapPin size={32} />,
      title: "Location",
      value: "Beni-Suef, Egypt",
      desc: "Open to remote opportunities & collaborations",
    },
    {
      id: 2,
      icon: <Calendar size={32} />,
      title: "Age",
      value: "22 Years Old",
      desc: "Always learning, energetic, and growth-oriented",
    },
    {
      id: 3,
      icon: <GraduationCap size={32} />,
      title: "Education",
      value: "B.Sc. Computer Science & Security",
      desc: "Beni-Suef National University (2023–2027)",
    },
    {
      id: 4,
      icon: <Shield size={32} />,
      title: "Current Role",
      value: "Cybersecurity Student",
      desc: "Exploring security fundamentals & defense",
    },
    {
      id: 5,
      icon: <Code size={32} />,
      title: "Passion",
      value: "Front-End Development",
      desc: "Designing secure and modern web experiences",
    },
  ];

  return (
    <section id="about" className="about-section">
      <h2 className="about-title">About Me</h2>
      <p className="about-subtitle">
        Front-End Developer | Cybersecurity Student
      </p>

      <div className="about-container">
        {info.map((item, index) => (
          <div
            className="about-box glass"
            key={item.id}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="about-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <h4>{item.value}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="about-bio glass">
        <h3 translate="yes">Who Am I ?</h3>
        <p>
          I’m Hazem, a passionate <strong>Front-End Developer</strong> and{" "}
          <strong>Cybersecurity Student</strong>. I love building modern &
          secure websites while diving deeper into information security. My goal
          is to combine <em>development</em> and <em>security</em> to create
          safe digital experiences.
        </p>
      </div>
    </section>
  );
};

export default About;
