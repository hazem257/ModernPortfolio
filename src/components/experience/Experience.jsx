import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPhp, FaDatabase, FaLinux, FaGitAlt, FaShieldAlt } from "react-icons/fa";
import { SiTailwindcss, SiMongodb, SiMysql, SiLaravel, SiNestjs,SiExpress } from "react-icons/si";
import "./experience.css";
{/*ICON => https://react-icons.github.io/react-icons/icons/si/ */}
const Experience = () => {
  const skills = [
    {
      category: "Frontend",
      items: [
        { name: "HTML", icon: <FaHtml5 className="html" /> },
        { name: "CSS", icon: <FaCss3Alt className="css" /> },
        { name: "JavaScript", icon: <FaJs className="js" /> },
        { name: "React", icon: <FaReact className="react" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="tailwind" /> },
      ],
    },
    {
      category: "Backend",
      items: [
        { name: "Node.js", icon: <FaNodeJs className="node" /> },
        { name: "Express", icon: <SiExpress className="express" /> },
        { name: "PHP", icon: <FaPhp className="php" /> },
       /*{ { name: "Laravel", icon: <SiLaravel className="laravel" /> },}*/
        {name:"NestJs" , icon:<SiNestjs />}
      ],
    },
    {
      category: "Databases",
      items: [
        { name: "MySQL", icon: <SiMysql className="mysql" /> },
        { name: "MongoDB", icon: <SiMongodb className="mongodb" /> },
        { name: "Database Design", icon: <FaDatabase className="database" /> },
        
      ],
    },
    {
      category: "Other",
      items: [
        { name: "Git/GitHub", icon: <FaGitAlt className="git" /> },
        { name: "Linux", icon: <FaLinux className="linux" /> },
        { name: "Cyber Security", icon: <FaShieldAlt className="security" /> },
      ],
    },
  ];

  return (
    <section className="experience" id="experience">
      <h1>💻 Experience & Skills</h1>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <h2 className="category">{skill.category}</h2>
            <ul>
              {skill.items.map((item, i) => (
                <li key={i}>
                  <span className="icon">{item.icon}</span>
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
