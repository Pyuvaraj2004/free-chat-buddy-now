
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

const ResumePreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const resumeData = location.state?.resumeData;

  if (!resumeData) {
    navigate('/resume-builder');
    return null;
  }

  const handleDownload = () => {
    // In a real application, this would generate and download a PDF
    // Here we'll just simulate the download with a toast notification
    
    toast({
      title: "Resume Downloaded",
      description: "Your resume has been downloaded as a PDF.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 pt-20 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Resume Preview</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => navigate('/resume-builder')}>
              Edit Resume
            </Button>
            <Button onClick={handleDownload}>
              Download PDF
            </Button>
          </div>
        </div>

        <Card className="p-8 bg-white shadow-lg mb-8">
          {/* Header / Contact Info */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-center">{resumeData.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-4 mt-2 text-sm text-gray-600">
              {resumeData.email && <div>{resumeData.email}</div>}
              {resumeData.phone && <div>{resumeData.phone}</div>}
              {resumeData.location && <div>{resumeData.location}</div>}
            </div>
          </div>

          {/* Summary */}
          {resumeData.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Professional Summary</h2>
              <p className="text-sm">{resumeData.summary}</p>
            </div>
          )}

          {/* Experience */}
          {resumeData.experiences && resumeData.experiences.some(exp => exp.company || exp.position) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Experience</h2>
              {resumeData.experiences.map((exp, index) => (
                (exp.company || exp.position) && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{exp.position}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{exp.company}</div>
                    {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Education */}
          {resumeData.education && resumeData.education.some(edu => edu.institution || edu.degree) && (
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Education</h2>
              {resumeData.education.map((edu, index) => (
                (edu.institution || edu.degree) && (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">{edu.duration}</span>
                    </div>
                    <div className="text-sm font-medium text-gray-700">{edu.institution}</div>
                    {edu.gpa && <p className="text-sm mt-1">GPA: {edu.gpa}</p>}
                  </div>
                )
              ))}
            </div>
          )}

          {/* Skills */}
          {resumeData.skills && (
            <div>
              <h2 className="text-lg font-bold border-b pb-1 mb-2">Skills</h2>
              <p className="text-sm">{resumeData.skills}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResumePreview;
