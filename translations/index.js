const translations = {
  en: {
    // App
    app: {
      name: 'Agrosarthi'
    },
    
    // Navigation
    nav: {
      home: 'Home',
      weather: 'Weather',
      cropCalendar: 'Crop Calendar',
      cropAI: 'Crop AI',
      calculators: 'Calculators',
      equipment: 'Equipment',
      guides: 'Guides',
      dashboard: 'Dashboard'
    },
    
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
      retry: 'Retry'
    },
    
    // Home Page
    home: {
      hero: {
        welcomeMessage: "Welcome to Agrosarthi",
        heroDescription: "Make data-driven decisions for your farm with our comprehensive suite of tools providing weather updates, market prices, farming calculators, and AI-powered advice.",
        getStarted: "Get Started",
        exploreTools: "Explore Tools"
      },
      everythingYouNeed: 'Your Complete Farming Companion',
      comprehensiveTools: 'Access powerful tools and insights to optimize every aspect of your farming operations, from crop planning to market sales',
      quickActions: 'Smart Farming Tools',
      getInstantInsights: 'Leverage our AI-powered tools to make informed decisions and boost your farm\'s productivity',
      
      // Features
      features: {
        weatherForecast: {
          title: 'Precision Weather Insights',
          description: 'Hyper-local weather forecasts and real-time alerts to optimize your farming schedule and protect your crops'
        },
        cropHealth: {
          title: 'Crop Health Monitoring',
          description: 'AI-powered disease detection and health analysis for over 50+ crops with actionable recommendations'
        },
        irrigation: {
          title: 'Smart Irrigation Planning',
          description: 'Data-driven water management solutions to maximize yield while conserving water resources'
        },
        marketPrices: {
          title: 'Market Intelligence',
          description: 'Real-time crop prices, demand forecasts, and market trends across major mandis in India'
        }
      },
      
      hero: {
        todaysOverview: "Today's Overview",
        welcomeMessage: "Welcome to ",
        heroDescription: "Make data-driven decisions for your farm with our comprehensive suite of tools providing weather updates, market prices, farming calculators, and AI-powered advice.",
        getStarted: "Get Started",
        exploreTools: "Explore Tools"
      },
      
      // Testimonials
      testimonials: {
        title: 'Trusted by Farmers Across India',
        subtitle: 'Join thousands of successful farmers who have transformed their agricultural practices with our innovative solutions',
        rajesh: {
          name: 'Rajesh Kumar',
          role: 'Organic Farmer, Punjab',
          content: 'Agrosarthi has transformed how I manage my crops. The disease detection feature saved my entire tomato harvest last season!'
        },
        priya: {
          name: 'Priya Sharma',
          role: 'Dairy & Crop Farmer, Maharashtra',
          content: 'The weather alerts and crop planning tools have helped me increase my yield by 30% this year.'
        }
      },
      // Smart Assistant
      smartAssistant: {
        title: 'Your AI Farming Assistant',
        subtitle: 'Get instant answers to all your farming questions - from crop care to market trends',
        
        openFull: 'Open Full Assistant Panel',
        
        features: [
          {
            title: 'Crop Health Diagnosis',
            description: 'Upload photos of your crops to identify diseases, pests, and nutrient deficiencies with 95% accuracy'
          },
          {
            title: 'Personalized Farming Advice',
            description: 'Get customized recommendations based on your location, soil type, and crop variety'
          },
          {
            title: 'Market Price Predictions',
            description: 'Access 7-day price forecasts for your crops in nearby mandis to optimize selling time'
          }
        ],
        
        disclaimer: 'Note: Responses may occasionally contain inaccuracies. Always verify critical farming decisions with local agricultural experts.',
        
        welcomeMessage: 'Hello! I\'m KisanMitra, your AI farming assistant. How can I help you today?',
        
        exampleQuestion: 'What\'s the best time to plant wheat in Rajasthan?',
        exampleAnswer: 'The optimal time for wheat planting in Rajasthan is between November 1-15. Prepare your field with 2-3 ploughings and ensure soil moisture is adequate for germination.',
        
        input: {
          placeholder: 'Ask me anything about farming... (e.g., pest control, irrigation, fertilizers)',
          sendButton: 'Send',
          microphoneTooltip: 'Ask by voice'
        },
        
        tryAsking: [
          'How to control stem borer in rice?',
          'Best organic fertilizers for tomato plants',
          'When to harvest sugarcane in Uttar Pradesh?',
          'Current onion prices in Nashik market'
        ],
        
        tips: [
          'Be specific with your questions for better answers',
          'Include your location for localized advice',
          'Upload clear photos for disease diagnosis'
        ],
        
        errorMessages: {
          noResponse: 'Sorry, I\'m having trouble answering. Please try again later.',
          offline: 'Connection lost. Working in limited mode - some features may not be available.'
        }
      },
      
      // Newsletter
      newsletter: {
        title: 'Stay Ahead with Agrosarthi',
        description: 'Subscribe to our newsletter for the latest farming insights, weather updates, and exclusive tips to maximize your harvest',
        emailPlaceholder: 'Enter your email address',
        subscribeButton: 'Subscribe Now',
        thankYou: 'Thank you for subscribing!'
      },
      card: {
        weather: {
          label: 'Weather', // English
          clearSky: 'Clear Sky',
          alert: 'Weather Alert',
          lightRain: 'Light Rain'
        },
        market: {
          trend: 'Market Trend',
          weeklyAvg: 'Weekly Average'
        },
        planting: {
          season: 'Planting Season',
          kharif: 'Kharif Crops'
        }
      }
    }
  },
  
  // Hindi translations
  hi: {
    app: {
      name: 'एग्रोसार्थी'
    },
    nav: {
      home: 'होम',
      weather: 'मौसम',
      cropCalendar: 'फसल कैलेंडर',
      cropAI: 'फसल एआई',
      calculators: 'कैलकुलेटर',
      equipment: 'उपकरण',
      guides: 'मार्गदर्शिकाएँ',
      dashboard: 'डैशबोर्ड'
    },
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
      retry: 'पुनः प्रयास करें'
    },
    home: {
      hero: {
        welcomeMessage: "अग्रोसार्थी में आपका स्वागत है",
        heroDescription: "मौसम अपडेट, बाजार मूल्य, कृषि कैलकुलेटर और एआई-सक्षम सलाह प्रदान करने वाले हमारे व्यापक उपकरणों के साथ अपने खेत के लिए डेटा-संचालित निर्णय लें।",
        getStarted: "शुरू करें",
        exploreTools: "उपकरण एक्सप्लोर करें"
      },
      everythingYouNeed: 'आपका संपूर्ण कृषि सहयोगी',
      comprehensiveTools: 'फसल योजना से लेकर बाजार बिक्री तक, अपने कृषि संचालन के हर पहलू को अनुकूलित करने के लिए शक्तिशाली उपकरण और अंतर्दृष्टि प्राप्त करें',
      quickActions: 'स्मार्ट खेती उपकरण',
      getInstantInsights: 'सूचित निर्णय लेने और अपने खेत की उत्पादकता बढ़ाने के लिए हमारे एआई-संचालित उपकरणों का लाभ उठाएं',
      features: {
        weatherForecast: {
          title: 'सटीक मौसम जानकारी',
          description: 'हाइपर-लोकल मौसम पूर्वानुमान और रीयल-टाइम अलर्ट जो आपके खेती के कार्यक्रम को अनुकूलित करने और आपकी फसलों की सुरक्षा करने में मदद करते हैं'
        },
        cropHealth: {
          title: 'फसल स्वास्थ्य निगरानी',
          description: '50+ फसलों के लिए एआई-संचालित रोग पहचान और स्वास्थ्य विश्लेषण जिसमें कार्रवाई योग्य सिफारिशें शामिल हैं'
        },
        irrigation: {
          title: 'स्मार्ट सिंचाई योजना',
          description: 'पानी के संसाधनों को संरक्षित करते हुए उपज को अधिकतम करने के लिए डेटा-संचालित जल प्रबंधन समाधान'
        },
        marketPrices: {
          title: 'बाजार बुद्धिमत्ता',
          description: 'भारत के प्रमुख मंडियों में रीयल-टाइम फसल मूल्य, मांग पूर्वानुमान और बाजार रुझान'
        },
        hero: {
          welcomeMessage: "अग्रोसार्थी में आपका स्वागत है",
          heroDescription: "हमारे व्यापक उपकरणों के साथ अपने खेत के लिए डेटा-संचालित निर्णय लें जो मौसम अपडेट, बाजार मूल्य, कृषि कैलकुलेटर और एआई-संचालित सलाह प्रदान करते हैं।",
          getStarted: "शुरू हो जाओ",
          exploreTools: "उपकरणों का अन्वेषण करें"
        }    
      },
      testimonials: {
        title: 'पूरे भारत के किसानों द्वारा विश्वसनीय',
        subtitle: 'हमारे नवीन समाधानों के साथ अपने कृषि अभ्यास को बदलने वाले हजारों सफल किसानों में शामिल हों',
        rajesh: {
          name: 'राजेश कुमार',
          role: 'जैविक किसान, पंजाब',
          content: 'एग्रोसार्थी ने मेरी फसलों के प्रबंधन के तरीके को बदल दिया है। रोग पहचान सुविधा ने पिछले सीजन में मेरी पूरी टमाटर की फसल बचा ली!'
        },
        priya: {
          name: 'प्रिया शर्मा',
          role: 'डेयरी और फसल किसान, महाराष्ट्र',
          content: 'मौसम अलर्ट और फसल योजना उपकरणों ने मुझे इस साल अपनी उपज 30% बढ़ाने में मदद की है।'
        }
      },
      newsletter: {
        title: 'एग्रोसार्थी के साथ आगे रहें',
        description: 'नवीनतम कृषि अंतर्दृष्टि, मौसम अपडेट और अपनी फसल को अधिकतम करने के विशेष सुझावों के लिए हमारे न्यूजलेटर की सदस्यता लें',
        emailPlaceholder: 'अपना ईमेल पता दर्ज करें',
        subscribeButton: 'अभी सदस्यता लें',
        thankYou: 'सदस्यता लेने के लिए धन्यवाद!'
      },
      card: {
        weather: {
          label: 'मौसम',
          clearSky: 'साफ आसमान',
          alert: 'मौसम चेतावनी',
          lightRain: 'हल्की बारिश'
        },
        market: {
          trend: 'बाजार प्रवृत्ति',
          weeklyAvg: 'साप्ताहिक औसत'
        },
        planting: {
          season: 'रोपण का मौसम',
          kharif: 'खरीफ फसलें'
        }
      }
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
      high: 'উচ্চ',
      low: 'নিম্ন',
      feelsLike: 'অনুভূত হচ্ছে',
      lastUpdated: 'সর্বশেষ আপডেট',
      error: 'ত্রুটি',
      retry: 'পুনরায় চেষ্টা করুন'
    },
    home: {
      hero: {
        welcomeMessage: "অগ্রোসার্থীতে স্বাগতম",
        heroDescription: "আবহাওয়া আপডেট, বাজার মূল্য, কৃষি ক্যালকুলেটর এবং এআই-সক্ষম পরামর্শ প্রদানকারী আমাদের ব্যাপক সরঞ্জামগুলির সাথে আপনার খামারের জন্য ডেটা-চালিত সিদ্ধান্ত নিন।",
        getStarted: "শুরু করুন",
        exploreTools: "সরঞ্জামগুলি অন্বেষণ করুন"
      },
      everythingYouNeed: 'আপনার সম্পূর্ণ কৃষি সঙ্গী',
      comprehensiveTools: 'ফসল পরিকল্পনা থেকে বাজার বিক্রয় পর্যন্ত, আপনার কৃষি কার্যক্রমের প্রতিটি দিক অপ্টিমাইজ করার জন্য শক্তিশালী সরঞ্জাম এবং অন্তর্দৃষ্টি অ্যাক্সেস করুন',
      quickActions: 'স্মার্ট ফার্মিং টুলস',
      getInstantInsights: 'সচেতন সিদ্ধান্ত নিতে এবং আপনার খামারের উত্পাদনশীলতা বৃদ্ধি করতে আমাদের এআই-চালিত সরঞ্জামগুলির সুবিধা নিন',
      features: {
        weatherForecast: {
          title: 'সুনির্দিষ্ট আবহাওয়ার তথ্য',
          description: 'হাইপার-লোকাল আবহাওয়ার পূর্বাভাস এবং রিয়েল-টাইম অ্যালার্ট যা আপনার কৃষি সময়সূচী অপ্টিমাইজ করতে এবং আপনার ফসল রক্ষা করতে সাহায্য করে'
        },
        cropHealth: {
          title: 'ফসল স্বাস্থ্য পর্যবেক্ষণ',
          description: '50+ ফসলের জন্য এআই-চালিত রোগ সনাক্তকরণ এবং স্বাস্থ্য বিশ্লেষণ যার মধ্যে কার্যকরী সুপারিশ রয়েছে'
        },
        irrigation: {
          title: 'স্মার্ট সেচ পরিকল্পনা',
          description: 'জল সম্পদ সংরক্ষণ করার সময় ফলন সর্বাধিক করার জন্য ডেটা-চালিত জল ব্যবস্থাপনা সমাধান'
        },
        marketPrices: {
          title: 'বাজার বুদ্ধিমত্তা',
          description: 'ভারতের প্রধান মন্ডিগুলিতে রিয়েল-টাইম ফসলের দাম, চাহিদার পূর্বাভাস এবং বাজার প্রবণতা'
        },
        hero: {
          welcomeMessage: "অগ্রোসার্থীতে স্বাগতম",
          heroDescription: "আমাদের ব্যাপক সরঞ্জামগুলির সাথে আপনার খামারের জন্য ডেটা-চালিত সিদ্ধান্ত নিন যা আবহাওয়া আপডেট, বাজার মূল্য, কৃষি ক্যালকুলেটর এবং AI-চালিত পরামর্শ প্রদান করে।",
          getStarted: "শুরু করুন",
          exploreTools: "সরঞ্জাম অন্বেষণ করুন"
        }
      },
      testimonials: {
        title: 'সারা ভারতের কৃষকদের দ্বারা বিশ্বস্ত',
        subtitle: 'আমাদের উদ্ভাবনী সমাধান দিয়ে তাদের কৃষি অনুশীলন রূপান্তরিত করেছে এমন হাজার হাজার সফল কৃষকের সাথে যোগ দিন',
        rajesh: {
          name: 'রাজেশ কুমার',
          role: 'জৈব কৃষক, পাঞ্জাব',
          content: 'অগ্রোসার্থী আমার ফসল পরিচালনার উপায় বদলে দিয়েছে। রোগ সনাক্তকরণ বৈশিষ্ট্যটি গত মৌসুমে আমার সম্পূর্ণ টমেটো ফসল বাঁচিয়েছে!'
        },
        priya: {
          name: 'প্রিয়া শর্মা',
          role: 'ডেইরি ও ফসল কৃষক, মহারাষ্ট্র',
          content: 'আবহাওয়া সতর্কতা এবং ফসল পরিকল্পনা সরঞ্জামগুলি আমাকে এই বছর আমার ফলন 30% বৃদ্ধি করতে সাহায্য করেছে।'
        }
      },
      newsletter: {
        title: 'অগ্রোসার্থীর সাথে এগিয়ে থাকুন',
        description: 'সর্বশেষ কৃষি অন্তর্দৃষ্টি, আবহাওয়া আপডেট এবং আপনার ফসল সর্বাধিক করার জন্য একচেটিয়া টিপস জন্য আমাদের নিউজলেটার সাবস্ক্রাইব করুন',
        emailPlaceholder: 'আপনার ইমেল ঠিকানা লিখুন',
        subscribeButton: 'এখনই সাবস্ক্রাইব করুন',
        thankYou: 'সাবস্ক্রাইব করার জন্য ধন্যবাদ!'
      },
      card: {
        weather: {
          label: 'আবহাওয়া',
          clearSky: 'পরিষ্কার আকাশ',
          alert: 'আবহাওয়া সতর্কতা',
          lightRain: 'হালকা বৃষ্টি'
        },
        market: {
          trend: 'বাজার প্রবণতা',
          weeklyAvg: 'সাপ্তাহিক গড়'
        },
        planting: {
          season: 'রোপণের মৌসুম',
          kharif: 'খরিফ ফসল'
        }
      }
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
      high: 'ఎక్కువ',
      low: 'తక్కువ',
      feelsLike: 'అనుభూతి',
      lastUpdated: 'చివరిగా నవీకరించబడింది',
      error: 'లోపం',
      retry: 'మళ్లీ ప్రయత్నించండి'
    },
    home: {
      hero: {
        welcomeMessage: "అగ్రోసార్థికి స్వాగతం",
        heroDescription: "వాతావరణ నవీకరణలు, మార్కెట్ ధరలు, వ్యవసాయ కాలిక్యులేటర్లు మరియు AI-ఆధారిత సలహాలను అందించే మా సమగ్ర సాధనాలతో మీ వ్యవసాయ భూమికి డేటా-ఆధారిత నిర్ణయాలు తీసుకోండి.",
        getStarted: "ప్రారంభించండి",
        exploreTools: "సాధనాలు అన్వేషించండి"
      },
      everythingYouNeed: 'మీ సంపూర్ణ వ్యవసాయ సహచరుడు',
      comprehensiveTools: 'పంట ప్రణాళిక నుండి మార్కెట్ విక్రయాల వరకు, మీ వ్యవసాయ కార్యకలాపాల యొక్క ప్రతి అంశాన్ని ఆప్టిమైజ్ చేయడానికి శక్తివంతమైన సాధనాలు మరియు అంతర్దృష్టులను యాక్సెస్ చేయండి',
      quickActions: 'స్మార్ట్ ఫార్మింగ్ టూల్స్',
      getInstantInsights: 'సమాచారం పూర్వక నిర్ణయాలు తీసుకోవడానికి మరియు మీ పొలం ఉత్పాదకతను పెంచడానికి మా AI-ఆధారిత సాధనాలను ఉపయోగించుకోండి',
      features: {
        weatherForecast: {
          title: 'ఖచ్చితమైన వాతావరణ సమాచారం',
          description: 'మీ వ్యవసాయ షెడ్యూల్ను ఆప్టిమైజ్ చేయడానికి మరియు మీ పంటలను రక్షించడానికి హైపర్-లోకల్ వాతావరణ అంచనాలు మరియు రియల్-టైమ్ అలర్ట్లు'
        },
        cropHealth: {
          title: 'పంట ఆరోగ్య పర్యవేక్షణ',
          description: '50+ పంటలకు AI-ఆధారిత వ్యాధి గుర్తింపు మరియు ఆరోగ్య విశ్లేషణ, చర్య తీసుకోగల సిఫార్సులతో'
        },
        irrigation: {
          title: 'స్మార్ట్ నీటిపారుదల ప్రణాళిక',
          description: 'నీటి వనరులను సంరక్షించుకోవడంతో పంట దిగుబడిని గరిష్టంగా చేయడానికి డేటా-ఆధారిత నీటి నిర్వహణ పరిష్కారాలు'
        },
        marketPrices: {
          title: 'మార్కెట్ ఇంటెలిజెన్స్',
          description: 'భారతదేశంలోని ప్రధాన మండీలలో రియల్-టైమ్ పంట ధరలు, డిమాండ్ అంచనాలు మరియు మార్కెట్ ట్రెండ్స్'
        }
      },
      testimonials: {
        title: 'భారతదేశం అంతటా రైతులచే విశ్వసించబడింది',
        subtitle: 'మా నూతన పరిష్కారాలతో తమ వ్యవసాయ పద్ధతులను మార్చుకున్న వేలాది విజయవంతమైన రైతులలో చేరండి',
        rajesh: {
          name: 'రాజేష్ కుమార్',
          role: 'సేంద్రీయ రైతు, పంజాబ్',
          content: 'అగ్రోసార్థి నా పంటలను ఎలా నిర్వహిస్తున్నానో మార్చివేసింది. వ్యాధి గుర్తింపు ఫీచర్ గత సీజన్లో నా మొత్తం టమోటా పంటను కాపాడింది!'
        },
        priya: {
          name: 'ప్రియ శర్మ',
          role: 'డెయిరీ & పంట రైతు, మహారాష్ట్ర',
          content: 'వాతావరణ హెచ్చరికలు మరియు పంట ప్రణాళిక సాధనాలు ఈ సంవత్సరం నా దిగుబడిని 30% పెంచడంలో సహాయపడ్డాయి.'
        }
      },
      newsletter: {
        title: 'అగ్రోసార్థితో ముందుండండి',
        description: 'తాజా వ్యవసాయ అంతర్దృష్టులు, వాతావరణ నవీకరణలు మరియు మీ పంటను గరిష్టంగా చేయడానికి ప్రత్యేక చిట్కాల కోసం మా న్యూజ్లెటర్కు సభ్యత్వాన్ని పొందండి',
        emailPlaceholder: 'మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి',
        subscribeButton: 'ఇప్పుడే సభ్యత్వాన్ని పొందండి',
        thankYou: 'చందాదారయ్యినందుకు ధన్యవాదాలు!'
      },
      card: {
        weather: {
          label: 'వాతావరణం',
          clearSky: 'స్పష్టమైన ఆకాశం',
          alert: 'వాతావరణ హెచ్చరిక',
          lightRain: 'తేలికపాటి వర్షం'
        },
        market: {
          trend: 'మార్కెట్ ట్రెండ్',
          weeklyAvg: 'వారం సగటు'
        },
        planting: {
          season: 'నాటే సీజన్',
          kharif: 'ఖరీఫ్ పంటలు'
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
      retry: 'மீண்டும் முயற்சிக்கவும்'
    },
    home: {
      hero: {
        welcomeMessage: "அக்ரோசார்த்திக்கு வரவேற்கிறோம்",
        heroDescription: "வானிலை புதுப்பிப்புகள், சந்தை விலைகள், விவசாய கால்குலேட்டர்கள் மற்றும் AI-இயக்கப்பட்ட ஆலோசனைகளை வழங்கும் எங்கள் விரிவான கருவிகளுடன் உங்கள் பண்ணைக்கான தரவு-ஆதரவுடன் முடிவுகளை எடுக்கவும்.",
        getStarted: "தொடங்கவும்",
        exploreTools: "கருவிகளை ஆராயவும்"
      },
      everythingYouNeed: 'உங்கள் முழுமையான விவசாய துணை',
      comprehensiveTools: 'பயிர் திட்டமிடல் முதல் சந்தை விற்பனை வரை, உங்கள் விவசாய செயல்பாடுகளின் ஒவ்வொரு அம்சத்தையும் மேம்படுத்த சக்திவாய்ந்த கருவிகள் மற்றும் நுண்ணறிவுகளை அணுகவும்',
      quickActions: 'ஸ்மார்ட் பண்ணை கருவிகள்',
      getInstantInsights: 'தகவலறிந்த முடிவுகளை எடுக்கவும், உங்கள் பண்ணையின் உற்பத்தித்திறனை அதிகரிக்கவும் எங்கள் AI-இயக்கி கருவிகளைப் பயன்படுத்தவும்',
      features: {
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
        },
        marketPrices: {
          title: 'சந்தை நுண்ணறிவு',
          description: 'இந்தியாவின் முக்கிய மண்டிகளில் நிகழ்நேர பயிர் விலைகள், தேவை முன்னறிவிப்புகள் மற்றும் சந்தை போக்குகள்'
        }
      },
      testimonials: {
        title: 'இந்தியா முழுவதும் உள்ள விவசாயிகளால் நம்பப்படுகிறது',
        subtitle: 'எங்கள் புதுமையான தீர்வுகளால் தங்கள் விவசாய முறைகளை மாற்றிய ஆயிரக்கணக்கான வெற்றிகரமான விவசாயிகளுடன் சேருங்கள்',
        rajesh: {
          name: 'ராஜேஷ் குமார்',
          role: 'கரிம விவசாயி, பஞ்சாப்',
          content: 'அக்ரோசார்த்தி என் பயிர்களை நிர்வகிக்கும் விதத்தை மாற்றியுள்ளது. நோய் கண்டறிதல் அம்சம் கடந்த பருவத்தில் என் முழு தக்காளி பயிரையும் காப்பாற்றியது!'
        },
        priya: {
          name: 'பிரியா ஷர்மா',
          role: 'பால் மற்றும் பயிர் விவசாயி, மகாராஷ்டிரா',
          content: 'வானிலை எச்சரிக்கைகள் மற்றும் பயிர் திட்டமிடல் கருவிகள் இந்த ஆண்டு எனது மகசூலை 30% அதிகரிக்க உதவியுள்ளது.'
        }
      },
      newsletter: {
        title: 'அக்ரோசார்த்தியுடன் முன்னேறுங்கள்',
        description: 'சமீபத்திய விவசாய நுண்ணறிவுகள், வானிலை புதுப்பிப்புகள் மற்றும் உங்கள் அறுவடையை அதிகரிக்க பிரத்தியேக உதவிக்குறிப்புகளுக்கு எங்கள் செய்திமடலுக்கு குழுசேரவும்',
        emailPlaceholder: 'உங்கள் மின்னஞ்சல் முகவரியை உள்ளிடவும்',
        subscribeButton: 'இப்போதே குழுசேரவும்',
        thankYou: 'குழுசேர்ந்ததற்கு நன்றி!'
      },
      card: {
        weather: {
          label: 'வானிலை',
          clearSky: 'தெளிவான வானம்',
          alert: 'வானிலை எச்சரிக்கை',
          lightRain: 'இலேசான மழை'
        },
        market: {
          trend: 'சந்தை போக்கு',
          weeklyAvg: 'வாராந்திர சராசரி'
        },
        planting: {
          season: 'நடவு காலம்',
          kharif: 'கரிப்பு பயிர்கள்'
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
      everythingYouNeed: 'तुमचा संपूर्ण शेती सहकारी',
      comprehensiveTools: 'पीक नियोजनापासून बाजार विक्रीपर्यंत, तुमच्या शेतीच्या सर्व पैलूंना ऑप्टिमाइझ करण्यासाठी शक्तिशाली साधने आणि अंतर्दृष्टी मिळवा',
      quickActions: 'स्मार्ट शेती साधने',
      getInstantInsights: 'माहितीपूर्ण निर्णय घेण्यासाठी आणि तुमच्या शेताची उत्पादकता वाढवण्यासाठी आमच्या एआय-चालित साधनांचा फायदा घ्या',
      features: {
        weatherForecast: {
          title: 'अचूक हवामान माहिती',
          description: 'हायपर-लोकल हवामान अंदाज आणि रिअल-टाइम सतर्कता जे तुमच्या शेतीचे वेळापत्रक ऑप्टिमाइझ करण्यास आणि तुमच्या पिकांचे संरक्षण करण्यास मदत करतात'
        },
        cropHealth: {
          title: 'पीक आरोग्य मॉनिटरिंग',
          description: '50+ पिकांसाठी एआय-चालित रोग शोध आणि आरोग्य विश्लेषण ज्यामध्ये कृती करण्यायोग्य शिफारसी समाविष्ट आहेत'
        },
        irrigation: {
          title: 'स्मार्ट सिंचन योजना',
          description: 'पाण्याचे स्रोत जतन करताना उत्पादन वाढवण्यासाठी डेटा-चालित पाणी व्यवस्थापन उपाय'
        },
        marketPrices: {
          title: 'बाजार बुद्धिमत्ता',
          description: 'भारतातील प्रमुख मंड्यांमधील रिअल-टाइम पीक किंमती, मागणी अंदाज आणि बाजारातील ट्रेंड'
        }
      },
      testimonials: {
        title: 'संपूर्ण भारतातील शेतकऱ्यांचा विश्वास',
        subtitle: 'आमच्या नाविन्यपूर्ण उपायांसह त्यांचे कृषी पद्धती बदललेल्या हजारो यशस्वी शेतकऱ्यांमध्ये सामील व्हा',
        rajesh: {
          name: 'राजेश कुमार',
          role: 'ऑर्गॅनिक शेतकरी, पंजाब',
          content: 'अॅग्रोसार्थीने माझ्या पिकांचे व्यवस्थापन कसे केले जाते हे बदलले. रोग शोध सुविधेने गेल्या हंगामात माझे संपूर्ण टोमॅटो पीक वाचवले!'
        },
        priya: {
          name: 'प्रिया शर्मा',
          role: 'डेअरी आणि पीक शेतकरी, महाराष्ट्र',
          content: 'हवामान सतर्कता आणि पीक नियोजन साधनांमुळे या वर्षी माझे उत्पादन 30% वाढविण्यात मदत झाली.'
        }
      },
      newsletter: {
        title: 'अॅग्रोसार्थीसोबत अग्रेसर रहा',
        description: 'नवीनतम शेती अंतर्दृष्टी, हवामान अद्यतने आणि तुमचे पीक वाढवण्यासाठी विशेष टिप्ससाठी आमच्या न्यूजलेटरची सदस्यता घ्या',
        emailPlaceholder: 'तुमचा ईमेल पत्ता प्रविष्ट करा',
        subscribeButton: 'आता सदस्यता घ्या',
        thankYou: 'सदस्यता घेतल्याबद्दल धन्यवाद!'
      },
      card: {
        weather: {
          label: 'हवामान',
          clearSky: 'स्वच्छ आकाश',
          alert: 'हवामान सतर्कता',
          lightRain: 'हलका पाऊस'
        },
        market: {
          trend: 'बाजाराची प्रवृत्ती',
          weeklyAvg: 'साप्ताहिक सरासरी'
        },
        planting: {
          season: 'लागवडीचा हंगाम',
          kharif: 'खरीप पिके'
        }
      }
    }
  }
};

// Get translation for a given key and language
// Supports nested keys using dot notation (e.g., 'nav.home')
function t(key, lang = 'en') {
  try {
    const keys = key.split('.');
    let result = translations[lang] || translations.en;
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        // Fallback to English if translation not found
        let enResult = translations.en;
        for (const enKey of keys) {
          if (enResult && enResult[enKey] !== undefined) {
            enResult = enResult[enKey];
          } else {
            console.warn(`Missing translation for key: ${key}`);
            return key.split('.').pop();
          }
        }
        return enResult;
      }
    }
    
    return result || key.split('.').pop();
  } catch (error) {
    console.error(`Translation error for key "${key}":`, error);
    return key.split('.').pop();
  }
}

// Export the translations object as default
export default translations;

// Named export for the t function
export { t };