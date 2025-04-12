
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';

// Sample course data
const coursesData = {
  1: {
    id: 1,
    title: "Web Development",
    description: "Comprehensive curriculum to master web development",
    color: "bg-blue-100",
    textColor: "text-blue-600",
    roadmap: [
      "HTML & CSS Basics",
      "JavaScript Fundamentals",
      "Responsive Web Design",
      "JavaScript Framework (React/Vue/Angular)",
      "Backend Development (Node.js)",
      "Database Integration",
      "API Development",
      "Authentication & Authorization",
      "Deployment & DevOps"
    ],
    podcasts: [
      { title: "Modern Web Development", author: "Tech Talk", duration: "45 min" },
      { title: "Frontend Frameworks Compared", author: "Code Cast", duration: "32 min" },
      { title: "Backend Technologies in 2023", author: "Server Side", duration: "56 min" }
    ],
    tests: [
      { id: 1, title: "HTML & CSS Basics Test" },
      { id: 2, title: "JavaScript Fundamentals Test" },
      { id: 3, title: "React Framework Test" }
    ]
  },
  2: {
    id: 2,
    title: "Data Science",
    description: "Master data analysis and machine learning",
    color: "bg-purple-100",
    textColor: "text-purple-600",
    roadmap: [
      "Python Programming",
      "Data Analysis with Pandas",
      "Data Visualization",
      "SQL & Database",
      "Statistical Analysis",
      "Machine Learning Fundamentals",
      "Deep Learning Basics",
      "Data Engineering Concepts",
      "ML Model Deployment"
    ],
    podcasts: [
      { title: "Data Science Career Paths", author: "Data Cast", duration: "38 min" },
      { title: "ML Models Explained", author: "AI Talks", duration: "47 min" },
      { title: "Ethics in Data Science", author: "Data Ethics", duration: "51 min" }
    ],
    tests: [
      { id: 1, title: "Python for Data Science Test" },
      { id: 2, title: "Data Analysis Fundamentals Test" },
      { id: 3, title: "Machine Learning Basics Test" }
    ]
  },
  // Additional courses would be added here
};

const CourseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const fetchCourse = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      if (id && coursesData[id as keyof typeof coursesData]) {
        setCourse(coursesData[id as keyof typeof coursesData]);
      }
      setLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4 pt-20 text-center">
          <div className="animate-pulse">Loading course details...</div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4 pt-20 text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="mt-4">
            <Link to="/courses" className="text-blue-600 hover:underline">
              Return to courses
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <div className={`${course.color} p-6 rounded-lg mb-6`}>
          <h1 className={`text-3xl font-bold ${course.textColor}`}>{course.title}</h1>
          <p className="text-gray-700 mt-2">{course.description}</p>
        </div>

        <Tabs defaultValue="roadmap" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
            <TabsTrigger value="tests">Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="roadmap" className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Learning Roadmap</h2>
            <ol className="space-y-4">
              {course.roadmap.map((step: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className={`${course.color} ${course.textColor} font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </TabsContent>
          
          <TabsContent value="podcasts" className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recommended Podcasts</h2>
            <ul className="space-y-4">
              {course.podcasts.map((podcast: any, index: number) => (
                <li key={index} className="border-b pb-3">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{podcast.title}</h3>
                    <span className="text-gray-500 text-sm">{podcast.duration}</span>
                  </div>
                  <p className="text-gray-600 text-sm">By {podcast.author}</p>
                </li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="tests" className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Skill Assessment Tests</h2>
            <div className="space-y-4">
              {course.tests.map((test: any) => (
                <div key={test.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <h3 className="font-medium">{test.title}</h3>
                  <div className="mt-3">
                    <Link 
                      to={`/course/${course.id}/test/${test.id}`} 
                      className={`${course.textColor} border border-current px-4 py-2 rounded hover:bg-opacity-10 hover:${course.color} inline-block transition-all`}
                    >
                      Take Test
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseDetail;
