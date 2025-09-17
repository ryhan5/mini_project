'use client';

import { useState, useEffect } from 'react';
import { Search, BookOpen, BookMarked, BookCheck, BookX, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const KnowledgeHubClient = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - in a real app, this would be fetched from an API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const mockArticles = [
          // Government Schemes
          {
            id: 1,
            title: 'PM KISAN Scheme',
            description: 'Income support of ₹6,000 per year to all farmer families across the country in three equal installments.',
            category: 'government',
            readTime: '4 min read',
            saved: false,
            completed: false,
            details: 'The Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) provides income support of ₹6,000 per year to all farmer families across the country in three equal installments of ₹2,000 every four months. The scheme defines family as husband, wife, and minor children. The amount is transferred directly to the bank accounts of the beneficiaries through DBT mode.'
          },
          {
            id: 2,
            title: 'Pradhan Mantri Fasal Bima Yojana',
            description: 'Crop insurance scheme providing comprehensive coverage against crop failure, helping farmers cope with agricultural risks.',
            category: 'government',
            readTime: '5 min read',
            saved: false,
            completed: false,
            details: 'PMFBY provides comprehensive insurance coverage against crop failure, helping farmers cope with agricultural risks. The premium rates are 2% of the sum insured for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticultural crops. The scheme covers yield losses due to non-preventable risks like natural fire and lightning, storm, flood, cyclone, etc.'
          },
          {
            id: 3,
            title: 'Kisan Credit Card (KCC) Scheme',
            description: 'Provides farmers with timely access to credit for agricultural and allied activities at subsidized interest rates.',
            category: 'government',
            readTime: '6 min read',
            saved: false,
            completed: false,
            details: 'The Kisan Credit Card scheme provides farmers with timely access to credit for agricultural and allied activities at subsidized interest rates. Farmers can get loans up to ₹3 lakh at 4% interest rate per annum. The scheme covers post-harvest expenses, consumption needs, and investment credit requirements.'
          },
          {
            id: 4,
            title: 'Soil Health Card Scheme',
            description: 'Provides soil testing reports and recommendations on appropriate dosage of nutrients to improve soil health.',
            category: 'government',
            readTime: '4 min read',
            saved: false,
            completed: false,
            details: 'The Soil Health Card Scheme provides farmers with soil testing reports and recommendations on appropriate dosage of nutrients to improve soil health. The card contains crop-wise recommendations of nutrients and fertilizers required for individual farms.'
          },
          // Existing articles
          {
            id: 5,
            title: 'Sustainable Farming Practices',
            description: 'Learn about eco-friendly farming methods that increase yield while preserving the environment.',
            category: 'sustainable',
            readTime: '5 min read',
            saved: false,
            completed: false
          },
          {
            id: 6,
            title: 'Crop Rotation Guide',
            description: 'Understand the benefits of crop rotation and how to implement it effectively on your farm.',
            category: 'techniques',
            readTime: '8 min read',
            saved: true,
            completed: true
          },
          {
            id: 7,
            title: 'Organic Pest Control',
            description: 'Natural methods to control pests without using harmful chemicals.',
            category: 'pest-control',
            readTime: '6 min read',
            saved: false,
            completed: false
          },
          {
            id: 8,
            title: 'Soil Health Management',
            description: 'Improve your soil quality with these proven techniques for better crop production.',
            category: 'soil',
            readTime: '7 min read',
            saved: true,
            completed: false
          },
          {
            id: 9,
            title: 'Water Conservation Methods',
            description: 'Effective irrigation techniques to conserve water while maintaining healthy crops.',
            category: 'irrigation',
            readTime: '4 min read',
            saved: false,
            completed: true
          },
          {
            id: 10,
            title: 'Climate-Smart Agriculture',
            description: 'Adapting farming practices to changing climate conditions for sustainable production.',
            category: 'sustainable',
            readTime: '9 min read',
            saved: false,
            completed: false
          }
        ];
        
        setArticles(mockArticles);
      } catch (err) {
        setError('Failed to load articles. Please try again later.');
        console.error('Error fetching articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const toggleArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(id);
    }
  };

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setArticles(articles.map(article => 
      article.id === id ? { ...article, saved: !article.saved } : article
    ));
  };

  const markAsRead = (id, e) => {
    e.stopPropagation();
    setArticles(articles.map(article => 
      article.id === id ? { ...article, completed: !article.completed } : article
    ));
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'government' && article.category === 'government') ||
                      (activeTab === 'saved' && article.saved) ||
                      (activeTab === 'completed' && article.completed) ||
                      (activeTab === 'unread' && !article.completed);
    
    return matchesSearch && matchesTab;
  });

  const getCategoryColor = (category) => {
    const colors = {
      sustainable: 'bg-green-100 text-green-800',
      techniques: 'bg-blue-100 text-blue-800',
      'pest-control': 'bg-yellow-100 text-yellow-800',
      soil: 'bg-amber-100 text-amber-800',
      irrigation: 'bg-cyan-100 text-cyan-800',
      government: 'bg-purple-100 text-purple-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <BookX className="h-12 w-12 mx-auto text-red-500 mb-4" />
          <p className="text-red-600">{error}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Knowledge Hub</h1>
            <p className="text-green-100 max-w-2xl mx-auto">
              Access expert agricultural knowledge, guides, and resources to enhance your farming practices.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles, guides, and resources..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 whitespace-nowrap">Filter by:</span>
              <select 
                className="text-sm border rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="all">All Articles</option>
                <option value="government">Government Schemes</option>
                <option value="saved">Saved</option>
                <option value="completed">Completed</option>
                <option value="unread">Unread</option>
              </select>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => toggleArticle(article.id)}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(article.category)}`}>
                      {article.category.replace('-', ' ')}
                    </span>
                    <div className="flex space-x-1">
                      <button 
                        onClick={(e) => toggleSave(article.id, e)}
                        className={`p-1.5 rounded-full ${article.saved ? 'text-yellow-500 hover:bg-yellow-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        aria-label={article.saved ? 'Remove from saved' : 'Save article'}
                      >
                        <BookMarked className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => markAsRead(article.id, e)}
                        className={`p-1.5 rounded-full ${article.completed ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                        aria-label={article.completed ? 'Mark as unread' : 'Mark as read'}
                      >
                        <BookCheck className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <CardTitle className="mt-2 text-lg font-semibold line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <BookOpen className="h-3.5 w-3.5 mr-1" />
                    <span>{article.readTime}</span>
                    {article.completed && (
                      <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                        Completed
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 flex justify-between items-center">
                  <Button variant="outline" size="sm" className="text-xs">
                    Read More
                  </Button>
                  <button 
                    className="text-xs text-gray-500 hover:text-gray-700 flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleArticle(article.id);
                    }}
                  >
                    {expandedArticle === article.id ? 'Show less' : 'Show more'}
                    <ChevronDown className={`h-3.5 w-3.5 ml-0.5 transition-transform ${expandedArticle === article.id ? 'transform rotate-180' : ''}`} />
                  </button>
                </CardFooter>
                {expandedArticle === article.id && (
                  <div className="px-6 pb-4 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-sm font-medium mb-2">
                        {article.category === 'government' ? 'Scheme Details' : 'Article Details'}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {article.details || 'This is additional content that would be loaded or expanded when the user clicks "Show more". In a real application, this would contain the full article content, related resources, or more detailed information about the topic.'}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          {article.category === 'government' ? 'Apply Now' : 'View Full Article'}
                        </Button>
                        {article.category === 'government' && (
                          <Button variant="outline" size="sm" className="text-xs">
                            Eligibility Criteria
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-xs">
                          {article.category === 'government' ? 'Official Website' : 'Download PDF'}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookX className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No articles found</h3>
            <p className="mt-1 text-gray-500">
              {searchQuery 
                ? 'Try adjusting your search or filter to find what you\'re looking for.'
                : 'There are no articles available in this category.'}
            </p>
            {searchQuery && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeHubClient;
