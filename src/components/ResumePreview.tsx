
import { ResumeData } from "@/pages/Builder";

interface ResumePreviewProps {
  data: ResumeData;
  template: 'classic' | 'modern' | 'creative';
}

const ResumePreview = ({ data, template }: ResumePreviewProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const getTemplateStyles = () => {
    switch (template) {
      case 'classic':
        return {
          headerBg: 'bg-gray-800',
          accentColor: 'text-gray-700',
          sectionBorder: 'border-gray-300'
        };
      case 'modern':
        return {
          headerBg: 'bg-blue-600',
          accentColor: 'text-blue-600',
          sectionBorder: 'border-blue-200'
        };
      case 'creative':
        return {
          headerBg: 'bg-purple-600',
          accentColor: 'text-purple-600',
          sectionBorder: 'border-purple-200'
        };
      default:
        return {
          headerBg: 'bg-blue-600',
          accentColor: 'text-blue-600',
          sectionBorder: 'border-blue-200'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className="bg-white shadow-lg max-w-2xl mx-auto" style={{ minHeight: '800px' }}>
      {/* Header */}
      <div className={`${styles.headerBg} text-white p-8`}>
        <h1 className="text-3xl font-bold mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm opacity-90">
          {data.personalInfo.email && (
            <span>{data.personalInfo.email}</span>
          )}
          {data.personalInfo.phone && (
            <span>{data.personalInfo.phone}</span>
          )}
          {data.personalInfo.address && (
            <span>{data.personalInfo.address}</span>
          )}
          {data.personalInfo.website && (
            <span>{data.personalInfo.website}</span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Professional Summary */}
        {data.summary && (
          <section>
            <h2 className={`text-xl font-bold ${styles.accentColor} mb-3 pb-2 border-b ${styles.sectionBorder}`}>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section>
            <h2 className={`text-xl font-bold ${styles.accentColor} mb-4 pb-2 border-b ${styles.sectionBorder}`}>
              Work Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className={`${styles.accentColor} font-medium`}>{exp.company}</p>
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className={`text-xl font-bold ${styles.accentColor} mb-4 pb-2 border-b ${styles.sectionBorder}`}>
              Education
            </h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className={`${styles.accentColor} text-sm`}>{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && data.skills.some(skill => skill.trim()) && (
          <section>
            <h2 className={`text-xl font-bold ${styles.accentColor} mb-4 pb-2 border-b ${styles.sectionBorder}`}>
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.filter(skill => skill.trim()).map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
