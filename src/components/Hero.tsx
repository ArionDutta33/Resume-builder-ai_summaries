import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Build Your Perfect
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                Professional Resume
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Create stunning, ATS-friendly resumes in minutes with our
              AI-powered builder. Land your dream job with professionally
              designed templates.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/builder">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                <span>ATS-friendly templates</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 bg-blue-200 rounded w-full"></div>
                    <div className="h-3 bg-blue-100 rounded w-3/4"></div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-48"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                PDF Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
