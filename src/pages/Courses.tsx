
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Sample course data
const coursesData = [
  {
    id: 1,
    title: "Web Development",
    description: "Learn HTML, CSS, JavaScript and modern frameworks",
    image: "web-dev",
    color: "bg-blue-100",
    textColor: "text-blue-500",
  },
  {
    id: 2,
    title: "Data Science",
    description: "Master data analysis, visualization and machine learning",
    image: "data-science",
    color: "bg-purple-100",
    textColor: "text-purple-500",
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build cross-platform mobile apps with React Native",
    image: "mobile-dev",
    color: "bg-green-100",
    textColor: "text-green-500",
  },
  {
    id: 4,
    title: "Cloud Computing",
    description: "Learn AWS, Azure, and cloud architecture principles",
    image: "cloud",
    color: "bg-orange-100",
    textColor: "text-orange-500",
  },
  {
    id: 5,
    title: "DevOps",
    description: "Master CI/CD pipelines, Docker, and Kubernetes",
    image: "devops",
    color: "bg-red-100",
    textColor: "text-red-500",
  },
  {
    id: 6,
    title: "Cybersecurity",
    description: "Learn security principles, ethical hacking and defense",
    image: "security",
    color: "bg-slate-100",
    textColor: "text-slate-500",
  },
];

const getIconForCourse = (course: string) => {
  switch (course) {
    case 'web-dev':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    case 'data-science':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      );
    case 'mobile-dev':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      );
    case 'cloud':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      );
    case 'devops':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case 'security':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
  }
};

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-2">Courses</h1>
        <p className="text-gray-600 mb-8">Find the perfect course to boost your career</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesData.map((course) => (
            <Card 
              key={course.id}
              className="hover:shadow-lg transition-all cursor-pointer"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <CardHeader>
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>
                  {course.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`h-32 ${course.color} rounded-md flex items-center justify-center`}>
                  <div className={course.textColor}>
                    {getIconForCourse(course.image)}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">Click to explore roadmap, podcasts, and tests</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
