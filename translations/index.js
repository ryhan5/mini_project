const translations = {
  en: {
    // App
    app: {
      name: 'Agrosarthi'
    },
    
    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      weather: 'Weather',
      crops: 'Crops',
      market: 'Market',
      community: 'Community',
      profile: 'Profile'
    },
    
    // Page navigation
    dashboard: 'Dashboard',
    'crop-calendar': 'Crop Calendar',
    'crop-disease': 'Crop AI',
    weather: 'Weather',
    'equipment-exchange': 'Equipment Exchange',
    'knowledge-hub': 'Knowledge Hub',
    selectLanguage: 'Select Language',
    
    // Common
    common: {
      current: 'Current',
      search: 'Search',
      location: 'Location',
      temperature: 'Temperature',
      humidity: 'Humidity',
      wind: 'Wind',
      precipitation: 'Precipitation',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      high: 'High',
      low: 'Low',
      feelsLike: 'Feels like',
      lastUpdated: 'Last updated',
      error: 'Error',
      retry: 'Retry',
      changeLocation: 'Change Location'
    },
    
    // Home Page
    home: {
      hero: {
        welcomeMessage: "Welcome to AgroSarthi",
        heroDescription: "Make data-driven decisions for your farm with our comprehensive tools providing weather updates, market prices, agricultural calculators, and AI-powered advisory.",
        getStarted: "Get Started",
        exploreTools: "Explore Tools",
        todaysOverview: "Today's Overview"
      },
      
      dashboard: {
        title: "Dashboard",
        description: "Your farming command center",
        subtitle: "Real-time insights for your farm",
        viewFull: "View Full Dashboard",
        weatherFor: "Weather for",
        marketPrices: "Market Prices",
        viewAll: "View All",
        upcomingTasks: "Upcoming Tasks",
        viewCalendar: "View Calendar",
        tasks: {
          fertilizer: {
            title: "Apply Fertilizer",
            due: "Due Tomorrow"
          },
          irrigation: {
            title: "Check Irrigation",
            due: "Due in 2 days"
          },
          pest: {
            title: "Pest Control",
            due: "Due in 5 days"
          }
        }
      },
      
      tools: {
        title: "AI-Powered Tools",
        description: "Advanced farming solutions at your fingertips"
      },
      
      diseaseDetection: {
        title: "Disease Detection",
        description: "AI-powered crop disease identification",
        tryNow: "Try Now",
        supports: "Supports",
        cropsCount: "50+ crops",
        cropsList: "Rice, Wheat, Maize, Cotton, Tomato, Potato and more",
        detects: "Detects",
        diseasesCount: "100+ diseases",
        treatmentPlans: "Get instant treatment plans"
      },
      
      testimonials: {
        title: "Success Stories",
        subtitle: "Real farmers, real results",
        description: "See how AgroSarthi has transformed farming operations across India",
        rajesh: {
          content: "AgroSarthi's AI recommendations helped me optimize my irrigation schedule and choose the right fertilizers. The weather alerts saved my crops from unexpected storms.",
          name: "Rajesh Kumar",
          role: "Rice Farmer"
        },
        priya: {
          content: "The disease detection feature identified early blight in my tomatoes before I could see it. Quick treatment saved my entire crop and increased my profits significantly.",
          name: "Priya Sharma",
          role: "Vegetable Farmer"
        },
        arun: {
          content: "Market price insights helped me time my cotton sales perfectly. The crop calendar feature keeps me organized throughout the farming season.",
          name: "Arun Patel",
          role: "Cotton Farmer"
        }
      },
      
      newsletter: {
        title: "Stay Updated",
        highlight: "Get Weekly Insights",
        description: "Subscribe to receive the latest farming tips, weather updates, and market trends directly in your inbox"
      },
      
      cta: {
        title: "Ready to Transform Your Farm?",
        highlight: "Join Thousands of Smart Farmers",
        description: "Start your journey towards data-driven farming with AgroSarthi's comprehensive suite of AI-powered tools",
        button: "Get Started Today"
      },
      
      featuredTools: {
        title: "Featured Tools",
        description: "Discover our most popular farming solutions"
      },
      card: {
        weather: {
          label: "Weather",
          clearSky: "Clear Sky",
          alert: "Weather Alert",
          lightRain: "Light Rain Expected"
        },
        market: {
          trend: "Market Trend",
          weeklyAvg: "Weekly Average"
        },
        planting: {
          season: "Planting Season",
          kharif: "Kharif Crops"
        }
      },
      everythingYouNeed: 'Your Complete Farming Companion',
      comprehensiveTools: 'From crop planning to market sales, get powerful tools and insights to optimize every aspect of your farming operation',
      quickActions: 'Smart Farming Tools',
      getInstantInsights: 'Leverage our AI-powered tools to make informed decisions and boost your farm productivity',
      
      features: {
        title: 'Your Complete Farming Ecosystem',
        description: 'Harness the power of artificial intelligence, satellite imagery, and IoT sensors to transform every aspect of your agricultural operations',
        weatherForecast: {
          title: 'Precise Weather Insights',
          description: 'Hyper-local weather forecasts and real-time alerts to optimize your farming schedule and protect your crops'
        },
        cropHealth: {
          title: 'Crop Health Monitoring',
          description: 'AI-powered disease detection and health analysis for 50+ crops with actionable recommendations'
        },
        irrigation: {
          title: 'Smart Irrigation Planning',
          description: 'Data-driven water management solutions to maximize yield while conserving water resources'
        }
      }
    },
    
    smartAssistant: {
      title: "Smart Assistant",
      subtitle: "Your AI farming companion",
      openFull: "Open Full Assistant",
      features: {
        cropPlanning: {
          title: "Crop Planning",
          description: "Get personalized crop recommendations based on your location and soil conditions"
        },
        pestDisease: {
          title: "Pest & Disease Management",
          description: "Identify and treat crop diseases with AI-powered solutions"
        },
        smartTips: {
          title: "Smart Farming Tips",
          description: "Receive timely advice on irrigation, fertilization, and harvesting"
        }
      },
      disclaimer: "AI-generated advice. Always consult with agricultural experts for critical decisions.",
      exampleQuestion: "What's the best time to plant rice in Punjab?",
      exampleAnswer: "For Punjab, the optimal rice planting time is mid-May to mid-June during the Kharif season. Ensure soil temperature is above 20°C and monsoon has begun.",
      sendButton: "Send",
      tryAsking: "Try asking:",
      exampleQueries: [
        "When should I harvest my wheat crop?",
        "How to control aphids in mustard?",
        "Best fertilizer for tomato plants?"
      ]
    }
  },

  // Hindi translations
  hi: {
    app: {
      name: 'अग्रोसार्थी'
    },
    nav: {
      home: 'होम',
      weather: 'मौसम',
      cropCalendar: 'फसल कैलेंडर',
      cropAI: 'फसल एआई',
      calculators: 'कैलकुलेटर',
      equipment: 'उपकरण',
      guides: 'गाइड',
      dashboard: 'डैशबोर्ड'
    },
    
    // Page navigation
    dashboard: 'डैशबोर्ड',
    'crop-calendar': 'फसल कैलेंडर',
    'crop-disease': 'फसल एआई',
    weather: 'मौसम',
    'equipment-exchange': 'उपकरण एक्सचेंज',
    'knowledge-hub': 'ज्ञान केंद्र',
    selectLanguage: 'भाषा चुनें',
    
    common: {
      current: 'वर्तमान',
      search: 'खोजें',
      location: 'स्थान',
      temperature: 'तापमान',
      humidity: 'नमी',
      wind: 'हवा',
      precipitation: 'वर्षा',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      high: 'उच्च',
      low: 'निम्न',
      feelsLike: 'महसूस हो रहा है',
      lastUpdated: 'अंतिम अपडेट',
      error: 'त्रुटि',
      retry: 'पुनः प्रयास करें',
      changeLocation: 'स्थान बदलें'
    },
    
    home: {
      hero: {
        welcomeMessage: "अग्रोसार्थी में आपका स्वागत है",
        heroDescription: "मौसम अपडेट, बाजार की कीमतें, कृषि कैलकुलेटर और AI-संचालित सलाह प्रदान करने वाले हमारे व्यापक उपकरणों के साथ अपने खेत के लिए डेटा-संचालित निर्णय लें।",
        getStarted: "शुरू करें",
        exploreTools: "उपकरण देखें",
        todaysOverview: "आज का अवलोकन"
      },
      
      dashboard: {
        title: "डैशबोर्ड",
        description: "आपका कृषि नियंत्रण केंद्र",
        subtitle: "आपके खेत के लिए रियल-टाइम जानकारी",
        viewFull: "पूरा डैशबोर्ड देखें",
        weatherFor: "मौसम के लिए",
        marketPrices: "बाजार की कीमतें",
        viewAll: "सभी देखें",
        upcomingTasks: "आगामी कार्य",
        viewCalendar: "कैलेंडर देखें",
        tasks: {
          fertilizer: {
            title: "उर्वरक डालें",
            due: "कल तक"
          },
          irrigation: {
            title: "सिंचाई जांचें",
            due: "2 दिन में"
          },
          pest: {
            title: "कीट नियंत्रण",
            due: "5 दिन में"
          }
        }
      },
      
      tools: {
        title: "AI-संचालित उपकरण",
        description: "आपकी उंगलियों पर उन्नत कृषि समाधान"
      },
      
      diseaseDetection: {
        title: "रोग पहचान",
        description: "AI-संचालित फसल रोग पहचान",
        tryNow: "अभी आज़माएं",
        supports: "समर्थन करता है",
        cropsCount: "50+ फसलें",
        cropsList: "चावल, गेहूं, मक्का, कपास, टमाटर, आलू और अधिक",
        detects: "पहचानता है",
        diseasesCount: "100+ रोग",
        treatmentPlans: "तुरंत उपचार योजना प्राप्त करें"
      },
      
      testimonials: {
        title: "सफलता की कहानियां",
        subtitle: "वास्तविक किसान, वास्तविक परिणाम",
        description: "देखें कि कैसे अग्रोसार्थी ने भारत भर में कृषि संचालन को बदल दिया है",
        rajesh: {
          content: "अग्रोसार्थी की AI सिफारिशों ने मुझे अपनी सिंचाई अनुसूची को अनुकूलित करने और सही उर्वरक चुनने में मदद की। मौसम अलर्ट ने मेरी फसलों को अप्रत्याशित तूफानों से बचाया।",
          name: "राजेश कुमार",
          role: "धान किसान"
        },
        priya: {
          content: "रोग पहचान सुविधा ने मेरे टमाटरों में अर्ली ब्लाइट की पहचान की इससे पहले कि मैं इसे देख पाता। त्वरित उपचार ने मेरी पूरी फसल बचाई और मेरे मुनाफे में काफी वृद्धि हुई।",
          name: "प्रिया शर्मा",
          role: "सब्जी किसान"
        },
        arun: {
          content: "बाजार मूल्य अंतर्दृष्टि ने मुझे अपनी कपास की बिक्री का समय सही तरीके से निर्धारित करने में मदद की। फसल कैलेंडर सुविधा मुझे पूरे कृषि मौसम में व्यवस्थित रखती है।",
          name: "अरुण पटेल",
          role: "कपास किसान"
        }
      },
      
      newsletter: {
        title: "अपडेट रहें",
        highlight: "साप्ताहिक जानकारी प्राप्त करें",
        description: "नवीनतम कृषि सुझाव, मौसम अपडेट और बाजार रुझान सीधे अपने इनबॉक्स में प्राप्त करने के लिए सब्सक्राइब करें"
      },
      
      cta: {
        title: "अपने खेत को बदलने के लिए तैयार हैं?",
        highlight: "हजारों स्मार्ट किसानों से जुड़ें",
        description: "अग्रोसार्थी के AI-संचालित उपकरणों के व्यापक सूट के साथ डेटा-संचालित कृषि की दिशा में अपनी यात्रा शुरू करें",
        button: "आज ही शुरू करें"
      },
      
      featuredTools: {
        title: "फीचर्ड टूल्स",
        description: "हमारे सबसे लोकप्रिय कृषि समाधान खोजें"
      },
      card: {
        weather: {
          label: "मौसम",
          clearSky: "साफ आसमान",
          alert: "मौसम चेतावनी",
          lightRain: "हल्की बारिश की संभावना"
        },
        market: {
          trend: "बाजार रुझान",
          weeklyAvg: "साप्ताहिक औसत"
        },
        planting: {
          season: "बुआई का मौसम",
          kharif: "खरीफ फसलें"
        }
      },
      
      features: {
        title: 'आपका संपूर्ण कृषि पारिस्थितिकी तंत्र',
        description: 'कृत्रिम बुद्धिमत्ता, उपग्रह इमेजरी और IoT सेंसर की शक्ति का उपयोग करके अपने कृषि संचालन के हर पहलू को बदलें',
        weatherForecast: {
          title: 'सटीक मौसम जानकारी',
          description: 'हाइपर-लोकल मौसम पूर्वानुमान और वास्तविक समय अलर्ट आपके खेती के कार्यक्रम को अनुकूलित करने और अपनी फसलों की सुरक्षा के लिए'
        },
        cropHealth: {
          title: 'फसल स्वास्थ्य निगरानी',
          description: '50+ फसलों के लिए AI-संचालित रोग का पता लगाना और स्वास्थ्य विश्लेषण कार्यक्षम सिफारिशों के साथ'
        },
        irrigation: {
          title: 'स्मार्ट सिंचाई योजना',
          description: 'जल संसाधनों का संरक्षण करते हुए उत्पादन को अधिकतम करने के लिए डेटा-संचालित जल प्रबंधन समाधान'
        }
      }
    },
    
    smartAssistant: {
      title: "स्मार्ट सहायक",
      subtitle: "आपका AI कृषि साथी",
      openFull: "पूरा सहायक खोलें",
      features: {
        cropPlanning: {
          title: "फसल योजना",
          description: "अपने स्थान और मिट्टी की स्थिति के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें"
        },
        pestDisease: {
          title: "कीट और रोग प्रबंधन",
          description: "AI-संचालित समाधानों के साथ फसल रोगों की पहचान और उपचार करें"
        },
        smartTips: {
          title: "स्मार्ट कृषि सुझाव",
          description: "सिंचाई, उर्वरीकरण और कटाई पर समय पर सलाह प्राप्त करें"
        }
      },
      disclaimer: "AI-जनित सलाह। महत्वपूर्ण निर्णयों के लिए हमेशा कृषि विशेषज्ञों से सलाह लें।",
      exampleQuestion: "पंजाब में चावल बोने का सबसे अच्छा समय क्या है?",
      exampleAnswer: "पंजाब के लिए, चावल बोने का इष्टतम समय खरीफ सीजन के दौरान मध्य मई से मध्य जून तक है। सुनिश्चित करें कि मिट्टी का तापमान 20°C से ऊपर है और मानसून शुरू हो गया है।",
      sendButton: "भेजें",
      tryAsking: "पूछने की कोशिश करें:",
      exampleQueries: [
        "मुझे अपनी गेहूं की फसल कब काटनी चाहिए?",
        "सरसों में एफिड्स को कैसे नियंत्रित करें?",
        "टमाटर के पौधों के लिए सबसे अच्छा उर्वरक?"
      ]
    }
  },

  // Bengali translations
  bn: {
    app: {
      name: 'অগ্রোসার্থী'
    },
    nav: {
      home: 'হোম',
      weather: 'আবহাওয়া',
      cropCalendar: 'ফসল ক্যালেন্ডার',
      cropAI: 'ফসল এআই',
      calculators: 'ক্যালকুলেটর',
      equipment: 'সরঞ্জাম',
      guides: 'গাইড',
      dashboard: 'ড্যাশবোর্ড'
    },
    
    // Page navigation
    dashboard: 'ড্যাশবোর্ড',
    'crop-calendar': 'ফসল ক্যালেন্ডার',
    'crop-disease': 'ফসল এআই',
    weather: 'আবহাওয়া',
    'equipment-exchange': 'সরঞ্জাম বিনিময়',
    'knowledge-hub': 'জ্ঞান কেন্দ্র',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    
    common: {
      current: 'বর্তমান',
      search: 'খুঁজুন',
      location: 'অবস্থান',
      temperature: 'তাপমাত্রা',
      humidity: 'আর্দ্রতা',
      wind: 'বাতাস',
      precipitation: 'বৃষ্টিপাত',
      sunrise: 'সূর্যোদয়',
      sunset: 'সূর্যাস্ত',
      high: 'বেশি',
      low: 'কম',
      feelsLike: 'অনুভূত হচ্ছে',
      lastUpdated: 'সর্বশেষ আপডেট',
      error: 'ত্রুটি',
      retry: 'পুনরায় চেষ্টা করুন',
      changeLocation: 'অবস্থান পরিবর্তন করুন'
    },
    
    home: {
      hero: {
        welcomeMessage: "অগ্রোসার্থীতে স্বাগতম",
        heroDescription: "আবহাওয়া আপডেট, বাজারের দাম, কৃষি ক্যালকুলেটর এবং AI-চালিত পরামর্শ প্রদানকারী আমাদের ব্যাপক সরঞ্জামগুলির সাথে আপনার খামারের জন্য ডেটা-চালিত সিদ্ধান্ত নিন।",
        getStarted: "শুরু করুন",
        exploreTools: "সরঞ্জাম অন্বেষণ করুন",
        todaysOverview: "আজকের সংক্ষিপ্তসার"
      },
      
      dashboard: {
        title: "ড্যাশবোর্ড",
        description: "আপনার কৃষি নিয়ন্ত্রণ কেন্দ্র",
        subtitle: "আপনার খামারের জন্য রিয়েল-টাইম অন্তর্দৃষ্টি",
        viewFull: "সম্পূর্ণ ড্যাশবোর্ড দেখুন",
        weatherFor: "আবহাওয়ার জন্য",
        marketPrices: "বাজারের দাম",
        viewAll: "সব দেখুন",
        upcomingTasks: "আসন্ন কাজ",
        viewCalendar: "ক্যালেন্ডার দেখুন",
        tasks: {
          fertilizer: {
            title: "সার প্রয়োগ করুন",
            due: "আগামীকাল পর্যন্ত"
          },
          irrigation: {
            title: "সেচ পরীক্ষা করুন",
            due: "২ দিনের মধ্যে"
          },
          pest: {
            title: "কীটপতঙ্গ নিয়ন্ত্রণ",
            due: "৫ দিনের মধ্যে"
          }
        }
      },
      
      tools: {
        title: "AI-চালিত সরঞ্জাম",
        description: "আপনার হাতের মুঠোয় উন্নত কৃষি সমাধান"
      },
      
      diseaseDetection: {
        title: "রোগ সনাক্তকরণ",
        description: "AI-চালিত ফসলের রোগ সনাক্তকরণ",
        tryNow: "এখনই চেষ্টা করুন",
        supports: "সমর্থন করে",
        cropsCount: "৫০+ ফসল",
        cropsList: "ধান, গম, ভুট্টা, তুলা, টমেটো, আলু এবং আরও",
        detects: "সনাক্ত করে",
        diseasesCount: "১০০+ রোগ",
        treatmentPlans: "তাৎক্ষণিক চিকিৎসা পরিকল্পনা পান"
      },
      
      testimonials: {
        title: "সফলতার গল্প",
        subtitle: "প্রকৃত কৃষক, প্রকৃত ফলাফল",
        description: "দেখুন কিভাবে অগ্রোসার্থী ভারত জুড়ে কৃষি কার্যক্রম রূপান্তরিত করেছে",
        rajesh: {
          content: "অগ্রোসার্থীর AI সুপারিশ আমাকে আমার সেচের সময়সূচী অনুকূল করতে এবং সঠিক সার বেছে নিতে সাহায্য করেছে। আবহাওয়া সতর্কতা আমার ফসলকে অপ্রত্যাশিত ঝড় থেকে রক্ষা করেছে।",
          name: "রাজেশ কুমার",
          role: "ধান চাষি"
        },
        priya: {
          content: "রোগ সনাক্তকরণ বৈশিষ্ট্য আমার টমেটোতে আর্লি ব্লাইট চিহ্নিত করেছে আমি এটি দেখার আগেই। দ্রুত চিকিৎসা আমার সম্পূর্ণ ফসল বাঁচিয়েছে এবং আমার লাভ উল্লেখযোগ্যভাবে বৃদ্ধি করেছে।",
          name: "প্রিয়া শর্মা",
          role: "সবজি চাষি"
        },
        arun: {
          content: "বাজারের দামের অন্তর্দৃষ্টি আমাকে আমার তুলা বিক্রয়ের সময় নিখুঁতভাবে নির্ধারণ করতে সাহায্য করেছে। ফসল ক্যালেন্ডার বৈশিষ্ট্য আমাকে পুরো কৃষি মৌসুম জুড়ে সংগঠিত রাখে।",
          name: "অরুণ পাটেল",
          role: "তুলা চাষি"
        }
      },
      
      newsletter: {
        title: "আপডেট থাকুন",
        highlight: "সাপ্তাহিক অন্তর্দৃষ্টি পান",
        description: "সর্বশেষ কৃষি টিপস, আবহাওয়া আপডেট এবং বাজারের প্রবণতা সরাসরি আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন"
      },
      
      cta: {
        title: "আপনার খামার রূপান্তরিত করতে প্রস্তুত?",
        highlight: "হাজারো স্মার্ট কৃষকদের সাথে যোগ দিন",
        description: "অগ্রোসার্থীর AI-চালিত সরঞ্জামের ব্যাপক স্যুট দিয়ে ডেটা-চালিত কৃষির দিকে আপনার যাত্রা শুরু করুন",
        button: "আজই শুরু করুন"
      },
      
      featuredTools: {
        title: "ফিচার্ড টুলস",
        description: "আমাদের সবচেয়ে জনপ্রিয় কৃষি সমাধান আবিষ্কার করুন"
      },
      card: {
        weather: {
          label: "আবহাওয়া",
          clearSky: "পরিষ্কার আকাশ",
          alert: "আবহাওয়া সতর্কতা",
          lightRain: "হালকা বৃষ্টির সম্ভাবনা"
        },
        market: {
          trend: "বাজারের প্রবণতা",
          weeklyAvg: "সাপ্তাহিক গড়"
        },
        planting: {
          season: "রোপণের মৌসুম",
          kharif: "খরিফ ফসল"
        }
      },
      
      features: {
        title: 'আপনার সম্পূর্ণ কৃষি বাস্তুতন্ত্র',
        description: 'কৃত্রিম বুদ্ধিমত্তা, স্যাটেলাইট ইমেজারি এবং IoT সেন্সরের শক্তি ব্যবহার করে আপনার কৃষি কার্যক্রমের প্রতিটি দিক রূপান্তরিত করুন',
        weatherForecast: {
          title: 'নির্ভুল আবহাওয়া অন্তর্দৃষ্টি',
          description: 'হাইপার-লোকাল আবহাওয়া পূর্বাভাস এবং রিয়েল-টাইম সতর্কতা আপনার কৃষি সময়সূচী অপ্টিমাইজ করতে এবং আপনার ফসল রক্ষা করতে'
        },
        cropHealth: {
          title: 'ফসলের স্বাস্থ্য নিরীক্ষণ',
          description: '৫০+ ফসলের জন্য AI-চালিত রোগ সনাক্তকরণ এবং স্বাস্থ্য বিশ্লেষণ কার্যকর সুপারিশ সহ'
        },
        irrigation: {
          title: 'স্মার্ট সেচ পরিকল্পনা',
          description: 'জল সম্পদ সংরক্ষণ করার সময় ফলন সর্বাধিক করার জন্য ডেটা-চালিত জল ব্যবস্থাপনা সমাধান'
        }
      }
    },
    
    smartAssistant: {
      title: "স্মার্ট সহায়ক",
      subtitle: "আপনার AI কৃষি সঙ্গী",
      openFull: "সম্পূর্ণ সহায়ক খুলুন",
      features: {
        cropPlanning: {
          title: "ফসল পরিকল্পনা",
          description: "আপনার অবস্থান এবং মাটির অবস্থার উপর ভিত্তি করে ব্যক্তিগত ফসলের সুপারিশ পান"
        },
        pestDisease: {
          title: "কীটপতঙ্গ ও রোগ ব্যবস্থাপনা",
          description: "AI-চালিত সমাধানের সাথে ফসলের রোগ সনাক্ত এবং চিকিৎসা করুন"
        },
        smartTips: {
          title: "স্মার্ট কৃষি টিপস",
          description: "সেচ, সারপ্রয়োগ এবং ফসল কাটার বিষয়ে সময়মতো পরামর্শ পান"
        }
      },
      disclaimer: "AI-উৎপন্ন পরামর্শ। গুরুত্বপূর্ণ সিদ্ধান্তের জন্য সর্বদা কৃষি বিশেষজ্ঞদের সাথে পরামর্শ করুন।",
      exampleQuestion: "পাঞ্জাবে ধান রোপণের সেরা সময় কখন?",
      exampleAnswer: "পাঞ্জাবের জন্য, খরিফ মৌসুমে মধ্য মে থেকে মধ্য জুন পর্যন্ত ধান রোপণের সর্বোত্তম সময়। নিশ্চিত করুন যে মাটির তাপমাত্রা ২০°সে এর উপরে এবং বর্ষা শুরু হয়েছে।",
      sendButton: "পাঠান",
      tryAsking: "জিজ্ঞাসা করার চেষ্টা করুন:",
      exampleQueries: [
        "আমার গমের ফসল কখন কাটব?",
        "সরিষায় এফিড নিয়ন্ত্রণ কীভাবে করব?",
        "টমেটো গাছের জন্য সেরা সার কোনটি?"
      ]
    }
  },

  // Telugu translations
  te: {
    app: {
      name: 'అగ్రోసార్థి'
    },
    nav: {
      home: 'హోమ్',
      weather: 'వాతావరణం',
      cropCalendar: 'పంట క్యాలెండర్',
      cropAI: 'పంట ఎఐ',
      calculators: 'కాలిక్యులేటర్లు',
      equipment: 'పరికరాలు',
      guides: 'గైడ్లు',
      dashboard: 'డాష్బోర్డ్'
    },
    
    // Page navigation
    dashboard: 'డాష్బోర్డ్',
    'crop-calendar': 'పంట క్యాలెండర్',
    'crop-disease': 'పంట ఎఐ',
    weather: 'వాతావరణం',
    'equipment-exchange': 'పరికరాల మార్పిడి',
    'knowledge-hub': 'జ్ఞాన కేంద్రం',
    selectLanguage: 'భాష ఎంచుకోండి',
    
    common: {
      current: 'ప్రస్తుత',
      search: 'వెతకండి',
      location: 'స్థానం',
      temperature: 'ఉష్ణోగ్రత',
      humidity: 'తేమ',
      wind: 'గాలి',
      precipitation: 'వర్షపాతం',
      sunrise: 'సూర్యోదయం',
      sunset: 'సూర్యాస్తమయం',
      high: 'అధిక',
      low: 'తక్కువ',
      feelsLike: 'అనుభూతి',
      lastUpdated: 'చివరిగా నవీకరించబడింది',
      error: 'లోపం',
      retry: 'మళ్లీ ప్రయత్నించండి'
    },
    
    home: {
      hero: {
        welcomeMessage: "అగ్రోసార్థికి స్వాగతం",
        heroDescription: "వాతావరణ అప్డేట్లు, మార్కెట్ ధరలు, వ్యవసాయ కాలిక్యులేటర్లు మరియు AI-శక్తితో కూడిన సలహాలను అందించే మా సమగ్ర సాధనాలతో మీ వ్యవసాయం కోసం డేటా-ఆధారిత నిర్ణయాలు తీసుకోండి.",
        getStarted: "ప్రారంభించండి",
        exploreTools: "సాధనాలను అన్వేషించండి"
      },
      card: {
        weather: {
          label: "వాతావరణం",
          clearSky: "స్పష్టమైన ఆకాశం",
          alert: "వాతావరణ హెచ్చరిక",
          lightRain: "తేలికపాటి వర్షం అవకాశం"
        },
        market: {
          trend: "మార్కెట్ ట్రెండ్",
          weeklyAvg: "వారపు సగటు"
        },
        planting: {
          season: "నాట్య సీజన్",
          kharif: "ఖరీఫ్ పంటలు"
        }
      },
      
      features: {
        title: 'మీ సంపూర్ణ వ్యవసాయ పర్యావరణ వ్యవస్థ',
        description: 'కృత్రిమ మేధస్సు, ఉపగ్రహ చిత్రణ మరియు IoT సెన్సార్ల శక్తిని ఉపయోగించి మీ వ్యవసాయ కార్యకలాపాల ప్రతి అంశాన్ని మార్చండి',
        weatherForecast: {
          title: 'ఖచ్చితమైన వాతావరణ అంతర్దృష్టులు',
          description: 'మీ వ్యవసాయ షెడ్యూల్‌ను అనుకూలీకరించడానికి మరియు మీ పంటలను రక్షించడానికి హైపర్-లోకల్ వాతావరణ అంచనాలు మరియు రియల్-టైమ్ హెచ్చరికలు'
        },
        cropHealth: {
          title: 'పంట ఆరోగ్య పర్యవేక్షణ',
          description: '50+ పంటలకు AI-శక్తితో కూడిన వ్యాధి గుర్తింపు మరియు ఆరోగ్య విశ్లేషణ చర్యాత్మక సిఫార్సులతో'
        },
        irrigation: {
          title: 'స్మార్ట్ నీటిపారుదల ప్రణాళిక',
          description: 'నీటి వనరులను సంరక్షిస్తూ దిగుబడిని గరిష్టీకరించడానికి డేటా-ఆధారిత నీటి నిర్వహణ పరిష్కారాలు'
        }
      }
    }
  },

  // Tamil translations
  ta: {
    app: {
      name: 'அக்ரோசார்த்தி'
    },
    nav: {
      home: 'முகப்பு',
      weather: 'வானிலை',
      cropCalendar: 'பயிர் நாட்காட்டி',
      cropAI: 'பயிர் AI',
      calculators: 'கால்குலேட்டர்கள்',
      equipment: 'உபகரணங்கள்',
      guides: 'வழிகாட்டிகள்',
      dashboard: 'டாஷ்போர்டு'
    },
    
    // Page navigation
    dashboard: 'டாஷ்போர்டு',
    'crop-calendar': 'பயிர் நாட்காட்டி',
    'crop-disease': 'பயிர் AI',
    weather: 'வானிலை',
    'equipment-exchange': 'உபகரண பரிமாற்றம்',
    'knowledge-hub': 'அறிவு மையம்',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    
    common: {
      current: 'தற்போதைய',
      search: 'தேடு',
      location: 'இடம்',
      temperature: 'வெப்பநிலை',
      humidity: 'ஈரப்பதம்',
      wind: 'காற்று',
      precipitation: 'மழைப்பொழிவு',
      sunrise: 'சூரிய உதயம்',
      sunset: 'சூரிய அஸ்தமனம்',
      high: 'அதிகம்',
      low: 'குறைவு',
      feelsLike: 'உணரப்படுகிறது',
      lastUpdated: 'கடைசியாக புதுப்பிக்கப்பட்டது',
      error: 'பிழை',
      retry: 'மீண்டும் முயற்சிக்கவும்',
      changeLocation: 'இடத்தை மாற்றவும்'
    },
    
    home: {
      hero: {
        welcomeMessage: "அக்ரோசார்த்திக்கு வரவேற்கிறோம்",
        heroDescription: "வானிலை புதுப்பிப்புகள், சந்தை விலைகள், விவசாய கால்குலேட்டர்கள் மற்றும் AI-இயக்கப்பட்ட ஆலோசனைகளை வழங்கும் எங்கள் விரிவான கருவிகளுடன் உங்கள் பண்ணைக்கான தரவு-ஆதரவுடன் முடிவுகளை எடுக்கவும்.",
        getStarted: "தொடங்கவும்",
        exploreTools: "கருவிகளை ஆராயவும்",
        todaysOverview: "இன்றைய மேலோட்டம்"
      },
      
      dashboard: {
        title: "டாஷ்போர்டு",
        description: "உங்கள் விவசாய கட்டுப்பாட்டு மையம்",
        subtitle: "உங்கள் பண்ணைக்கான நிகழ்நேர நுண்ணறிவுகள்",
        viewFull: "முழு டாஷ்போர்டைப் பார்க்கவும்",
        weatherFor: "வானிலைக்காக",
        marketPrices: "சந்தை விலைகள்",
        viewAll: "அனைத்தையும் பார்க்கவும்",
        upcomingTasks: "வரவிருக்கும் பணிகள்",
        viewCalendar: "நாட்காட்டியைப் பார்க்கவும்",
        tasks: {
          fertilizer: {
            title: "உரம் போடவும்",
            due: "நாளை வரை"
          },
          irrigation: {
            title: "நீர்ப்பாசனத்தைச் சரிபார்க்கவும்",
            due: "2 நாட்களில்"
          },
          pest: {
            title: "பூச்சி கட்டுப்பாடு",
            due: "5 நாட்களில்"
          }
        }
      },
      
      tools: {
        title: "AI-இயக்கப்பட்ட கருவிகள்",
        description: "உங்கள் விரல் நுனியில் மேம்பட்ட விவசாய தீர்வுகள்"
      },
      
      diseaseDetection: {
        title: "நோய் கண்டறிதல்",
        description: "AI-இயக்கப்பட்ட பயிர் நோய் அடையாளம்",
        tryNow: "இப்போது முயற்சிக்கவும்",
        supports: "ஆதரிக்கிறது",
        cropsCount: "50+ பயிர்கள்",
        cropsList: "அரிசி, கோதுமை, சோளம், பருத்தி, தக்காளி, உருளைக்கிழங்கு மற்றும் பலவும்",
        detects: "கண்டறிகிறது",
        diseasesCount: "100+ நோய்கள்",
        treatmentPlans: "உடனடி சிகிச்சை திட்டங்களைப் பெறுங்கள்"
      },
      
      testimonials: {
        title: "வெற்றிக் கதைகள்",
        subtitle: "உண்மையான விவசாயிகள், உண்மையான முடிவுகள்",
        description: "அக்ரோசார்த்தி இந்தியா முழுவதும் விவசாய நடவடிக்கைகளை எவ்வாறு மாற்றியுள்ளது என்பதைப் பாருங்கள்",
        rajesh: {
          content: "அக்ரோசார்த்தியின் AI பரிந்துரைகள் எனது நீர்ப்பாசன அட்டவணையை மேம்படுத்தவும் சரியான உரங்களைத் தேர்ந்தெடுக்கவும் உதவியது. வானிலை எச்சரிக்கைகள் எனது பயிர்களை எதிர்பாராத புயல்களிலிருந்து காப்பாற்றியது.",
          name: "ராஜேஷ் குமார்",
          role: "நெல் விவசாயி"
        },
        priya: {
          content: "நோய் கண்டறிதல் அம்சம் எனது தக்காளியில் ஆரம்ப கருகலை நான் பார்ப்பதற்கு முன்பே கண்டறிந்தது. விரைவான சிகிச்சை எனது முழு பயிரையும் காப்பாற்றியது மற்றும் எனது லாபத்தை கணிசமாக அதிகரித்தது.",
          name: "பிரியா சர்மா",
          role: "காய்கறி விவசாயி"
        },
        arun: {
          content: "சந்தை விலை நுண்ணறிவுகள் எனது பருத்தி விற்பனையின் நேரத்தை சரியாக நிர்ணயிக்க உதவியது. பயிர் நாட்காட்டி அம்சம் முழு விவசாய பருவத்திலும் என்னை ஒழுங்கமைத்து வைக்கிறது.",
          name: "அருண் பட்டேல்",
          role: "பருத்தி விவசாயி"
        }
      },
      
      newsletter: {
        title: "புதுப்பித்த நிலையில் இருங்கள்",
        highlight: "வாராந்திர நுண்ணறிவுகளைப் பெறுங்கள்",
        description: "சமீபத்திய விவசாய குறிப்புகள், வானிலை புதுப்பிப்புகள் மற்றும் சந்தை போக்குகளை நேரடியாக உங்கள் இன்பாக்ஸில் பெற சந்தா செலுத்துங்கள்"
      },
      
      cta: {
        title: "உங்கள் பண்ணையை மாற்ற தயாரா?",
        highlight: "ஆயிரக்கணக்கான ஸ்மார்ட் விவசாயிகளுடன் சேருங்கள்",
        description: "அக்ரோசார்த்தியின் AI-இயக்கப்பட்ட கருவிகளின் விரிவான தொகுப்புடன் தரவு-இயக்கப்பட்ட விவசாயத்தை நோக்கிய உங்கள் பயணத்தைத் தொடங்குங்கள்",
        button: "இன்றே தொடங்குங்கள்"
      },
      
      featuredTools: {
        title: "சிறப்பு கருவிகள்",
        description: "எங்கள் மிகவும் பிரபலமான விவசாய தீர்வுகளைக் கண்டறியுங்கள்"
      },
      card: {
        weather: {
          label: "வானிலை",
          clearSky: "தெளிவான வானம்",
          alert: "வானிலை எச்சரிக்கை",
          lightRain: "லேசான மழை எதிர்பார்க்கப்படுகிறது"
        },
        market: {
          trend: "சந்தை போக்கு",
          weeklyAvg: "வாராந்திர சராசரி"
        },
        planting: {
          season: "நடவு பருவம்",
          kharif: "கரீப் பயிர்கள்"
        }
      },
      
      features: {
        title: 'உங்கள் முழுமையான விவசாய சுற்றுச்சூழல் அமைப்பு',
        description: 'செயற்கை நுண்ணறிவு, செயற்கைக்கோள் படங்கள் மற்றும் IoT சென்சார்களின் சக்தியைப் பயன்படுத்தி உங்கள் விவசாய செயல்பாடுகளின் ஒவ்வொரு அம்சத்தையும் மாற்றவும்',
        weatherForecast: {
          title: 'துல்லியமான வானிலை நுண்ணறிவு',
          description: 'உங்கள் விவசாய அட்டவணையை மேம்படுத்தவும், உங்கள் பயிர்களைப் பாதுகாக்கவும் ஹைப்பர்-லோக்கல் வானிலை முன்னறிவிப்புகள் மற்றும் நிகழ்நேர அறிவிப்புகள்'
        },
        cropHealth: {
          title: 'பயிர் ஆரோக்கிய மானிட்டரிங்',
          description: '50+ பயிர்களுக்கான AI-இயக்கி நோய் கண்டறிதல் மற்றும் ஆரோக்கிய பகுப்பாய்வு, நடவடிக்கை எடுக்கக்கூடிய பரிந்துரைகளுடன்'
        },
        irrigation: {
          title: 'ஸ்மார்ட் நீர்ப்பாசன திட்டமிடல்',
          description: 'நீர் வளங்களைப் பாதுகாக்கும் போது மகசூலை அதிகரிக்க தரவு-இயக்கி நீர் மேலாண்மை தீர்வுகள்'
        }
      }
    }
  },

  // Malayalam translations
  ml: {
    app: {
      name: 'അഗ്രോസാർത്തി'
    },
    nav: {
      home: 'ഹോം',
      weather: 'കാലാവസ്ഥ',
      cropCalendar: 'വിള കലണ്ടർ',
      cropAI: 'വിള AI',
      calculators: 'കാൽക്കുലേറ്ററുകൾ',
      equipment: 'ഉപകരണങ്ങൾ',
      guides: 'ഗൈഡുകൾ',
      dashboard: 'ഡാഷ്ബോർഡ്'
    },
    
    // Page navigation
    dashboard: 'ഡാഷ്ബോർഡ്',
    'crop-calendar': 'വിള കലണ്ടർ',
    'crop-disease': 'വിള AI',
    weather: 'കാലാവസ്ഥ',
    'equipment-exchange': 'ഉപകരണ കൈമാറ്റം',
    'knowledge-hub': 'അറിവ് കേന്ദ്രം',
    selectLanguage: 'ഭാഷ തിരഞ്ഞെടുക്കുക',
    
    common: {
      current: 'നിലവിലുള്ള',
      search: 'തിരയുക',
      location: 'സ്ഥലം',
      temperature: 'താപനില',
      humidity: 'ആർദ്രത',
      wind: 'കാറ്റ്',
      precipitation: 'മഴ',
      sunrise: 'സൂര്യോദയം',
      sunset: 'സൂര്യാസ്തമയം',
      high: 'ഉയർന്ന',
      low: 'താഴ്ന്ന',
      feelsLike: 'അനുഭവപ്പെടുന്നത്',
      lastUpdated: 'അവസാനം അപ്ഡേറ്റ് ചെയ്തത്',
      error: 'പിശക്',
      retry: 'വീണ്ടും ശ്രമിക്കുക'
    },
    
    home: {
      hero: {
        welcomeMessage: "അഗ്രോസാർത്തിയിലേക്ക് സ്വാഗതം",
        heroDescription: "കാലാവസ്ഥാ അപ്ഡേറ്റുകൾ, മാർക്കറ്റ് വിലകൾ, കാർഷിക കാൽക്കുലേറ്ററുകൾ, AI-പവർഡ് ഉപദേശം എന്നിവ നൽകുന്ന ഞങ്ങളുടെ സമഗ്ര ഉപകരണങ്ങൾ ഉപയോഗിച്ച് നിങ്ങളുടെ കൃഷിയിടത്തിനായി ഡാറ്റാ-അധിഷ്ഠിത തീരുമാനങ്ങൾ എടുക്കുക.",
        getStarted: "ആരംഭിക്കുക",
        exploreTools: "ഉപകരണങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക"
      },
      card: {
        weather: {
          label: "കാലാവസ്ഥ",
          clearSky: "തെളിഞ്ഞ ആകാശം",
          alert: "കാലാവസ്ഥാ മുന്നറിയിപ്പ്",
          lightRain: "നേരിയ മഴയ്ക്ക് സാധ്യത"
        },
        market: {
          trend: "മാർക്കറ്റ് ട്രെൻഡ്",
          weeklyAvg: "പ്രതിവാര ശരാശരി"
        },
        planting: {
          season: "നടീൽ സീസൺ",
          kharif: "ഖരീഫ് വിളകൾ"
        }
      },
      
      features: {
        title: 'നിങ്ങളുടെ സമ്പൂർണ്ണ കാർഷിക ഇക്കോസിസ്റ്റം',
        description: 'ആർട്ടിഫിഷ്യൽ ഇന്റലിജൻസ്, സാറ്റലൈറ്റ് ഇമേജറി, IoT സെൻസറുകൾ എന്നിവയുടെ ശക്തി ഉപയോഗിച്ച് നിങ്ങളുടെ കാർഷിക പ്രവർത്തനങ്ങളുടെ എല്ലാ വശങ്ങളും രൂപാന്തരപ്പെടുത്തുക',
        weatherForecast: {
          title: 'കൃത്യമായ കാലാവസ്ഥാ ഉൾക്കാഴ്ചകൾ',
          description: 'നിങ്ങളുടെ കാർഷിക ഷെഡ്യൂൾ ഒപ്റ്റിമൈസ് ചെയ്യാനും നിങ്ങളുടെ വിളകളെ സംരക്ഷിക്കാനും ഹൈപ്പർ-ലോക്കൽ കാലാവസ്ഥാ പ്രവചനങ്ങളും തത്സമയ അലേർട്ടുകളും'
        },
        cropHealth: {
          title: 'വിള ആരോഗ്യ നിരീക്ഷണം',
          description: '50+ വിളകൾക്കായി AI-പവർഡ് രോഗ കണ്ടെത്തലും ആരോഗ്യ വിശകലനവും, പ്രവർത്തനക്ഷമമായ ശുപാർശകളോടെ'
        },
        irrigation: {
          title: 'സ്മാർട്ട് ജലസേചന ആസൂത്രണം',
          description: 'ജല വിഭവങ്ങൾ സംരക്ഷിക്കുന്നതിനൊപ്പം വിളവ് പരമാവധിയാക്കുന്നതിനുള്ള ഡാറ്റാ-അധിഷ്ഠിത ജല മാനേജ്മെന്റ് പരിഹാരങ്ങൾ'
        }
      }
    }
  },

  // Marathi translations
  mr: {
    app: {
      name: 'अॅग्रोसार्थी'
    },
    nav: {
      home: 'होम',
      weather: 'हवामान',
      cropCalendar: 'पीक कॅलेंडर',
      cropAI: 'पीक एआय',
      calculators: 'कॅल्क्युलेटर्स',
      equipment: 'साधने',
      guides: 'मार्गदर्शक',
      dashboard: 'डॅशबोर्ड'
    },
    
    // Page navigation
    dashboard: 'डॅशबोर्ड',
    'crop-calendar': 'पीक कॅलेंडर',
    'crop-disease': 'पीक एआय',
    weather: 'हवामान',
    'equipment-exchange': 'साधन देवाणघेवाण',
    'knowledge-hub': 'ज्ञान केंद्र',
    selectLanguage: 'भाषा निवडा',
    
    common: {
      current: 'सध्याचे',
      search: 'शोधा',
      location: 'स्थान',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      wind: 'वारा',
      precipitation: 'पाऊस',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      high: 'जास्त',
      low: 'कमी',
      feelsLike: 'जाणवते',
      lastUpdated: 'शेवटी अद्यतनित',
      error: 'त्रुटी',
      retry: 'पुन्हा प्रयत्न करा'
    },
    
    home: {
      hero: {
        welcomeMessage: "अॅग्रोसार्थी मध्ये आपले स्वागत आहे",
        heroDescription: 'हवामान अद्यतने, बाजारभाव, शेती कॅल्क्युलेटर आणि कृत्रिम बुद्धीमत्तेने सक्षम केलेल्या सल्ल्यांसह आमच्या सर्वसमावेशक साधनांसह तुमच्या शेतासाठी डेटा-चालित निर्णय घ्या.',
        getStarted: "सुरू करा",
        exploreTools: "साधने एक्सप्लोर करा"
      },
      card: {
        weather: {
          label: "हवामान",
          clearSky: "स्वच्छ आकाश",
          alert: "हवामान सतर्कता",
          lightRain: "हलका पाऊस अपेक्षित"
        },
        market: {
          trend: "बाजार प्रवृत्ती",
          weeklyAvg: "साप्ताहिक सरासरी"
        },
        planting: {
          season: "लागवड हंगाम",
          kharif: "खरीप पिके"
        }
      },
      
      features: {
        title: 'तुमची संपूर्ण शेती पारिस्थितिकी तंत्र',
        description: 'कृत्रिम बुद्धिमत्ता, उपग्रह प्रतिमा आणि IoT सेन्सरची शक्ती वापरून तुमच्या कृषी कार्यांच्या प्रत्येक पैलूचे रूपांतर करा',
        weatherForecast: {
          title: 'अचूक हवामान अंतर्दृष्टी',
          description: 'तुमचे शेती वेळापत्रक अनुकूल करण्यासाठी आणि तुमच्या पिकांचे संरक्षण करण्यासाठी हायपर-लोकल हवामान अंदाज आणि रिअल-टाइम सतर्कता'
        },
        cropHealth: {
          title: 'पीक आरोग्य निरीक्षण',
          description: '50+ पिकांसाठी AI-चालित रोग शोध आणि आरोग्य विश्लेषण कार्यक्षम शिफारशींसह'
        },
        irrigation: {
          title: 'स्मार्ट सिंचन योजना',
          description: 'पाण्याचे स्रोत जतन करताना उत्पादन वाढवण्यासाठी डेटा-चालित पाणी व्यवस्थापन उपाय'
        }
      }
    }
  }
};

// Translation function
export function t(key, lang = 'en') {
  if (!key || typeof key !== 'string') {
    console.warn('Translation key must be a non-empty string');
    return '';
  }

  const keys = key.split('.');
  let result = translations[lang] || translations.en;

  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      // Fallback to English
      let enResult = translations.en;
      for (const enK of keys) {
        enResult = enResult?.[enK];
        if (!enResult) break;
      }
      const fallback = enResult || key;
      return typeof fallback === 'string' ? fallback : key;
    }
  }
  
  // Ensure we always return a string
  if (typeof result === 'object' && result !== null) {
    console.warn(`Translation key '${key}' returns an object. Use a more specific key.`);
    return key;
  }
  
  const finalResult = result || key;
  return typeof finalResult === 'string' ? finalResult : String(finalResult);
}

export default translations;
