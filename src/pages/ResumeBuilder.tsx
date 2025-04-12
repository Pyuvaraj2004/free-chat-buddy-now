
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    phone: '',
    location: '',
    
    // Professional Summary
    summary: '',
    
    // Work Experience
    experiences: [{ company: '', position: '', duration: '', description: '' }],
    
    // Education
    education: [{ institution: '', degree: '', duration: '', gpa: '' }],
    
    // Skills
    skills: '',
  });
  
  const [activeSection, setActiveSection] = useState('personal');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleExperienceChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const experiences = [...formData.experiences];
    experiences[index] = { ...experiences[index], [name]: value };
    setFormData({
      ...formData,
      experiences,
    });
  };
  
  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...formData.experiences, { company: '', position: '', duration: '', description: '' }],
    });
  };
  
  const handleEducationChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const education = [...formData.education];
    education[index] = { ...education[index], [name]: value };
    setFormData({
      ...formData,
      education,
    });
  };
  
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', degree: '', duration: '', gpa: '' }],
    });
  };

  const handleGenerateResume = () => {
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would generate a PDF
    // For now, let's simulate it and show a preview
    toast({
      title: "Resume Generated",
      description: "Your PDF resume has been generated.",
    });
    
    navigate('/resume-preview', { state: { resumeData: formData } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Resume Builder</h1>
          
          <div className="grid grid-cols-12 gap-6">
            {/* Section Navigation */}
            <div className="col-span-12 md:col-span-3">
              <div className="space-y-2">
                <Button
                  variant={activeSection === 'personal' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveSection('personal')}
                >
                  Personal Info
                </Button>
                <Button
                  variant={activeSection === 'summary' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveSection('summary')}
                >
                  Summary
                </Button>
                <Button
                  variant={activeSection === 'experience' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveSection('experience')}
                >
                  Experience
                </Button>
                <Button
                  variant={activeSection === 'education' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveSection('education')}
                >
                  Education
                </Button>
                <Button
                  variant={activeSection === 'skills' ? 'default' : 'outline'}
                  className="w-full justify-start"
                  onClick={() => setActiveSection('skills')}
                >
                  Skills
                </Button>
              </div>
              
              <div className="mt-8">
                <Button 
                  onClick={handleGenerateResume}
                  className="w-full"
                >
                  Generate Resume PDF
                </Button>
              </div>
            </div>
            
            {/* Form Sections */}
            <div className="col-span-12 md:col-span-9">
              {/* Personal Information */}
              {activeSection === 'personal' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <Input 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="johndoe@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <Input 
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Professional Summary */}
              {activeSection === 'summary' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Professional Summary</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                    <Textarea 
                      name="summary"
                      value={formData.summary}
                      onChange={handleInputChange}
                      placeholder="Brief overview of your professional background and strengths..."
                      className="h-32"
                    />
                  </div>
                </div>
              )}
              
              {/* Work Experience */}
              {activeSection === 'experience' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Work Experience</h2>
                  
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-4">
                      <h3 className="font-medium">Experience {index + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                          <Input 
                            name="company"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                          <Input 
                            name="position"
                            value={exp.position}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Job Title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <Input 
                            name="duration"
                            value={exp.duration}
                            onChange={(e) => handleExperienceChange(index, e)}
                            placeholder="Jan 2020 - Present"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea 
                          name="description"
                          value={exp.description}
                          onChange={(e) => handleExperienceChange(index, e)}
                          placeholder="Describe your responsibilities and achievements..."
                          className="h-20"
                        />
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" onClick={addExperience}>
                    + Add Another Experience
                  </Button>
                </div>
              )}
              
              {/* Education */}
              {activeSection === 'education' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Education</h2>
                  
                  {formData.education.map((edu, index) => (
                    <div key={index} className="border p-4 rounded-md space-y-4">
                      <h3 className="font-medium">Education {index + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
                          <Input 
                            name="institution"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="University Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
                          <Input 
                            name="degree"
                            value={edu.degree}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="Bachelor of Science in Computer Science"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <Input 
                            name="duration"
                            value={edu.duration}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="2016 - 2020"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">GPA (optional)</label>
                          <Input 
                            name="gpa"
                            value={edu.gpa}
                            onChange={(e) => handleEducationChange(index, e)}
                            placeholder="3.8/4.0"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" onClick={addEducation}>
                    + Add Another Education
                  </Button>
                </div>
              )}
              
              {/* Skills */}
              {activeSection === 'skills' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Skills</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
                    <Textarea 
                      name="skills"
                      value={formData.skills}
                      onChange={handleInputChange}
                      placeholder="List your skills separated by commas (e.g. JavaScript, React, Node.js, Project Management)..."
                      className="h-32"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
