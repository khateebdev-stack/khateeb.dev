 {
            "id": "agrivision-platform",
            "slug": "agrivision-ai-precision-farming",
            "title": "AgriVision - AI Precision Farming",
            "category": "Enterprise",
            "solution": "An enterprise AgriTech platform using satellite imagery and AI to democratize precision farming. Reduces water usage by 30% and connects farmers directly to corporate buyers.",
            "tech_stack": [
                "Python",
                "TensorFlow",
                "Next.js",
                "Django",
                "SentinelHub API",
                "Blockchain"
            ],
            "links": {
                "demo": "#",
                "github": "#"
            },
            "featured_image": "/projects/agrivision-platform/thumbnail.png",
            "gallery": [
                "/projects/agrivision-platform/screenshot-1.png",
                "/projects/agrivision-platform/screenshot-2.png",
                "/projects/agrivision-platform/screenshot-3.png"
            ],
            "case_study": {
                "client": "National Agriculture Board",
                "year": "2024",
                "duration": "5 months",
                "role": "Lead Architect",
                "overview": "AgriVision democratizes precision agriculture by replacing expensive IoT sensors with 'Virtual Sensors' powered by satellite imagery. It also features a blockchain-backed marketplace to eliminate middlemen.",
                "challenge": {
                    "title": "The Problem",
                    "description": "Small farmers cannot afford expensive IoT sensors for precision farming, leading to water waste and lower yields. Additionally, middlemen take 60% of profits, leaving farmers in poverty.",
                    "pain_points": [
                        "High cost of traditional IoT sensors makes precision farming inaccessible",
                        "Over-irrigation due to lack of data causes 30% water waste",
                        "Middlemen exploit farmers by buying low and selling high",
                        "Crop diseases go undetected until it's too late"
                    ]
                },
                "solution": {
                    "title": "The Solution",
                    "description": "Built a hardware-free precision farming platform using Sentinel-2 satellite data and a direct B2B marketplace.",
                    "key_features": [
                        "Virtual Sensors: AI analysis of satellite imagery to estimate soil moisture and crop health",
                        "B2B Marketplace: Direct bidding platform for corporate buyers to purchase from farmers",
                        "AI Crop Doctor: Offline-first mobile app for instant disease diagnosis via phone camera",
                        "Supply Chain Traceability: Blockchain-backed QR codes for farm-to-fork transparency",
                        "Smart Irrigation Alerts: SMS notifications for optimal watering schedules"
                    ],
                    "technical_architecture": {
                        "frontend": [
                            "Next.js 14",
                            "Mapbox GL",
                            "React Native (Mobile)"
                        ],
                        "backend": [
                            "Django (Python)",
                            "Node.js"
                        ],
                        "ai_ml": [
                            "TensorFlow (Disease Detection)",
                            "Scikit-learn (Yield Prediction)",
                            "Rasterio (Satellite Processing)"
                        ],
                        "blockchain": [
                            "Hyperledger Fabric (Supply Chain)"
                        ],
                        "infrastructure": [
                            "AWS Lambda",
                            "SentinelHub API"
                        ]
                    }
                },
                "results": {
                    "title": "The Impact",
                    "description": "Empowered farmers with data-driven insights and fair market access.",
                    "metrics": [
                        {
                            "label": "Water Saved",
                            "value": "30%",
                            "description": "Reduction in irrigation costs via satellite guidance"
                        },
                        {
                            "label": "Farmer Profit",
                            "value": "+40%",
                            "description": "Higher margins by selling directly to retailers"
                        },
                        {
                            "label": "Disease Detection",
                            "value": "Instant",
                            "description": "Reduced from 7 days to seconds via AI app"
                        },
                        {
                            "label": "Hardware Cost",
                            "value": "$0",
                            "description": "No sensors required for farmers"
                        }
                    ]
                },
                "testimonial": {
                    "text": "AgriVision is a revolution. We used to guess when to water our crops, but now the satellite alerts tell us exactly which sector needs attention. The direct marketplace has also helped us get fair prices for our wheat harvest.",
                    "author": "Ch. Bashir Ahmed",
                    "role": "President",
                    "company": "Punjab Farmers Association",
                    "project_type": "AgriTech Platform"
                }
            }
        },