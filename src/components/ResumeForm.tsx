import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Star, StarIcon, StarsIcon, Trash2 } from "lucide-react";
import { ResumeData } from "@/pages/Builder";
import { Popover, PopoverContent } from "./ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import axios from "axios";
interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
}

const ResumeForm = ({ resumeData, setResumeData }: ResumeFormProps) => {
  const [aiSummary, setAiSummary] = useState("");
  const [generatedSummary, setGeneratedSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const generateSummary = async (input: string) => {
    setLoading(true);
    const response = await axios.post(
      "https://5736955a-4256-49d5-8849-e7233097d0e9.us-east-1.cloud.genez.io/response",
      {
        describe: input,
      }
    );
    setGeneratedSummary(response.data.summary);
    setLoading(false);
    setAiSummary("");
  };

  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      startDate: "",
      endDate: "",
      gpa: "",
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    setResumeData({
      ...resumeData,
      skills: [...resumeData.skills, ""],
    });
  };

  const updateSkill = (index: number, value: string) => {
    const newSkills = [...resumeData.skills];
    newSkills[index] = value;
    setResumeData({
      ...resumeData,
      skills: newSkills,
    });
  };

  const removeSkill = (index: number) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                value={resumeData.personalInfo.website}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                placeholder="https://johndoe.com"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={resumeData.personalInfo.address}
              onChange={(e) => updatePersonalInfo("address", e.target.value)}
              placeholder="City, State, Country"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.summary}
            onChange={(e) => {
              setResumeData({ ...resumeData, summary: e.target.value });
            }}
            placeholder="Write a brief summary of your professional background and key achievements..."
            rows={4}
          />

          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm" className="flex mt-4 items-center rounded-full">
                <StarsIcon className="mr-2" color="white" size={16} />
                Ask AI
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[90vw] max-w-xl max-h-[80vh] overflow-y-auto"
              side="top"
              align="center"
              sideOffset={10}
              alignOffset={0}
              avoidCollisions={true}
              sticky="always"
            >
              <div>
                <Label>Describe your experience</Label>
                <Textarea
                  placeholder="Describe your experience and skills for AI to generate a summary..."
                  rows={3}
                  className="mt-2"
                  value={aiSummary}
                  onChange={(e) => setAiSummary(e.target.value)}
                />
                <Button
                  disabled={loading || !aiSummary}
                  className="mt-2"
                  onClick={() => generateSummary(aiSummary)}
                >
                  {loading ? "Generating..." : "Generate Summary"}
                </Button>
                {generatedSummary && (
                  <div className="mt-4">
                    <Label>AI Generated Summary</Label>
                    <div className="bg-muted p-3 rounded text-sm mt-2 whitespace-pre-wrap">
                      {generatedSummary}
                    </div>
                    <Button
                      className="mt-2"
                      variant="outline"
                      onClick={() =>
                        setResumeData({
                          ...resumeData,
                          summary: generatedSummary,
                        })
                      }
                    >
                      Use this Summary
                    </Button>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-1">
                  This feature uses AI to generate a professional summary based
                  on your input.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Work Experience</CardTitle>
          <Button onClick={addExperience} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="border rounded-lg p-4 relative">
              <Button
                onClick={() => removeExperience(exp.id)}
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(exp.id, "company", e.target.value)
                    }
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) =>
                      updateExperience(exp.id, "position", e.target.value)
                    }
                    placeholder="Job Title"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "startDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) =>
                      updateExperience(exp.id, "endDate", e.target.value)
                    }
                    placeholder="Leave blank if current"
                  />
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) =>
                    updateExperience(exp.id, "description", e.target.value)
                  }
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Education</CardTitle>
          <Button onClick={addEducation} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 relative">
              <Button
                onClick={() => removeEducation(edu.id)}
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) =>
                      updateEducation(edu.id, "institution", e.target.value)
                    }
                    placeholder="University Name"
                  />
                </div>
                <div>
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(edu.id, "degree", e.target.value)
                    }
                    placeholder="Bachelor of Science in Computer Science"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "startDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) =>
                      updateEducation(edu.id, "endDate", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) =>
                      updateEducation(edu.id, "gpa", e.target.value)
                    }
                    placeholder="3.8"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Skills</CardTitle>
          <Button onClick={addSkill} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {resumeData.skills.map((skill, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={skill}
                  onChange={(e) => updateSkill(index, e.target.value)}
                  placeholder="e.g., JavaScript, React, Project Management"
                  className="flex-1"
                />
                <Button
                  onClick={() => removeSkill(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeForm;
