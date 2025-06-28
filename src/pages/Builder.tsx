
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Download, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import TemplateSelector from "@/components/TemplateSelector";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    website: string;
  };
  summary: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  skills: string[];
}

const Builder = () => {
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [selectedTemplate, setSelectedTemplate] = useState<'classic' | 'modern' | 'creative'>('modern');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    skills: [],
  });

  const handleDownload = () => {
    // This would trigger the PDF generation in a real implementation
    alert("PDF download functionality would be implemented with backend integration!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={activeTab === 'form' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('form')}
                  className="px-4"
                >
                  Edit
                </Button>
                <Button
                  variant={activeTab === 'preview' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab('preview')}
                  className="px-4"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
              </div>
              
              <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className={`${activeTab === 'form' ? 'lg:col-span-5' : 'hidden lg:block lg:col-span-5'}`}>
            <div className="space-y-6">
              <TemplateSelector 
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
              <ResumeForm 
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${activeTab === 'preview' ? 'lg:col-span-7' : 'hidden lg:block lg:col-span-7'}`}>
            <div className="sticky top-8">
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Resume Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResumePreview 
                    data={resumeData}
                    template={selectedTemplate}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
