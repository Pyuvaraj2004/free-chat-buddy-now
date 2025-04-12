
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <h1 className="text-3xl font-bold mb-8">Welcome to EduReady</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/courses')}>
            <CardHeader>
              <CardTitle>Courses</CardTitle>
              <CardDescription>
                Explore our courses to boost your skills and knowledge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-blue-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </CardContent>
            <CardFooter>
              <p>Access roadmaps, podcasts and skill tests</p>
            </CardFooter>
          </Card>
          
          <Card className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate('/resume-builder')}>
            <CardHeader>
              <CardTitle>Resume Builder</CardTitle>
              <CardDescription>
                Create a professional resume in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-green-100 rounded-md flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </CardContent>
            <CardFooter>
              <p>Get a professionally formatted PDF resume</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
