
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';

// Sample test data
const testsData = {
  '1-1': { // courseId-testId
    title: "HTML & CSS Basics Test",
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hypertext Markup Language",
          "Hypertext Markdown Language",
          "Hyperloop Machine Language",
          "Hydraulic Text Management Language"
        ],
        correctAnswer: 0
      },
      {
        id: 2,
        question: "Which CSS property is used to control the text size?",
        options: [
          "text-style",
          "font-size",
          "text-size",
          "font-style"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
          "<link>",
          "<href>",
          "<a>",
          "<url>"
        ],
        correctAnswer: 2
      }
    ]
  },
  '1-2': {
    title: "JavaScript Fundamentals Test",
    questions: [
      {
        id: 1,
        question: "Which symbol is used for comments in JavaScript?",
        options: [
          "//",
          "#",
          "/* */",
          "Both // and /* */"
        ],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "Which method is used to add elements to the end of an array?",
        options: [
          "push()",
          "append()",
          "addToEnd()",
          "insert()"
        ],
        correctAnswer: 0
      },
      {
        id: 3,
        question: "What is the correct way to check if 'x' is equal to 'y' in value and type?",
        options: [
          "x == y",
          "x = y",
          "x === y",
          "x.equals(y)"
        ],
        correctAnswer: 2
      }
    ]
  },
  // More tests
};

const TestPage = () => {
  const { courseId, testId } = useParams<{ courseId: string; testId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [test, setTest] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [weakAreas, setWeakAreas] = useState<string[]>([]);

  useEffect(() => {
    // Simulate API fetch
    const fetchTest = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const testKey = `${courseId}-${testId}`;
      if (testsData[testKey as keyof typeof testsData]) {
        const testData = testsData[testKey as keyof typeof testsData];
        setTest(testData);
        setSelectedAnswers(new Array(testData.questions.length).fill(-1));
      }
      setLoading(false);
    };

    fetchTest();
  }, [courseId, testId]);

  const handleAnswerSelect = (answerIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitTest = () => {
    // Calculate score
    let correctAnswers = 0;
    const wrongCategories: string[] = [];
    
    test.questions.forEach((question: any, index: number) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      } else {
        // Determine weak areas based on wrong answers
        if (courseId === '1') { // Web Development course
          if (question.id === 1) wrongCategories.push("HTML Basics");
          if (question.id === 2) wrongCategories.push("CSS Styling");
          if (question.id === 3) wrongCategories.push("HTML Links");
        } else if (courseId === '2') { // Data Science course
          if (question.id === 1) wrongCategories.push("JavaScript Syntax");
          if (question.id === 2) wrongCategories.push("Array Methods");
          if (question.id === 3) wrongCategories.push("Equality Operators");
        }
      }
    });
    
    const finalScore = Math.round((correctAnswers / test.questions.length) * 100);
    setScore(finalScore);
    setWeakAreas([...new Set(wrongCategories)]);
    setTestSubmitted(true);
    
    toast({
      title: "Test Submitted",
      description: `You scored ${finalScore}% on this test.`,
    });
  };

  const handleRetakeTest = () => {
    setTestSubmitted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(test.questions.length).fill(-1));
    setScore(0);
  };

  const goToChatbot = () => {
    // Store weak areas for the chatbot to use
    localStorage.setItem('weakAreas', JSON.stringify(weakAreas));
    navigate('/chatbot-assistance');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4 pt-20 text-center">
          <div className="animate-pulse">Loading test...</div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4 pt-20 text-center">
          <h2 className="text-2xl font-bold">Test not found</h2>
          <p className="mt-4">
            <Button onClick={() => navigate(`/course/${courseId}`)}>
              Return to Course
            </Button>
          </p>
        </div>
      </div>
    );
  }

  if (testSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4 pt-20">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>{test.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-blue-600">{score}%</div>
                <p className="text-gray-500 mt-2">
                  {score >= 70 ? "Great job! You passed the test." : "You need more practice in this area."}
                </p>
              </div>
              
              {weakAreas.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-medium text-lg mb-2">Areas to Improve:</h3>
                  <ul className="list-disc list-inside">
                    {weakAreas.map((area, index) => (
                      <li key={index} className="text-gray-700">{area}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button onClick={handleRetakeTest} variant="outline" className="w-full">
                Retake Test
              </Button>
              {score < 70 && weakAreas.length > 0 && (
                <Button onClick={goToChatbot} className="w-full">
                  Get Personalized Help
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-4 pt-20">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>{test.title}</CardTitle>
            <CardDescription>Question {currentQuestionIndex + 1} of {test.questions.length}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              <div className="space-y-2">
                {currentQuestion.options.map((option: string, index: number) => (
                  <div 
                    key={index} 
                    className={`p-3 border rounded-md cursor-pointer hover:bg-gray-50 ${
                      selectedAnswers[currentQuestionIndex] === index ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              onClick={handlePrevQuestion} 
              disabled={currentQuestionIndex === 0}
              variant="outline"
            >
              Previous
            </Button>
            <div>
              {currentQuestionIndex === test.questions.length - 1 ? (
                <Button 
                  onClick={handleSubmitTest}
                  disabled={selectedAnswers.some((answer) => answer === -1)}
                >
                  Submit Test
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestionIndex] === -1}
                >
                  Next
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TestPage;
