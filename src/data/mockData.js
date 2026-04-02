// Mock data for all admin dashboard screens

// ─── Dashboard KPIs ──────────────────────────────────────────────────────────
export const kpiData = [
  { id: 1, label: 'Total Users', value: '24,562', change: '+8.2%', trend: 'up', icon: 'users', color: 'blue' },
  { id: 2, label: 'Active Subscribers', value: '3,841', change: '+5.1%', trend: 'up', icon: 'star', color: 'amber' },
  { id: 3, label: 'Properties Listed', value: '18,290', change: '+12.4%', trend: 'up', icon: 'building', color: 'green' },
  { id: 4, label: 'Monthly Revenue', value: '₹9,42,500', change: '+3.7%', trend: 'up', icon: 'rupee', color: 'purple' },
];

// ─── Revenue Chart ────────────────────────────────────────────────────────────
export const revenueData = [
  { month: 'Oct', revenue: 520000, subscriptions: 280 },
  { month: 'Nov', revenue: 610000, subscriptions: 320 },
  { month: 'Dec', revenue: 740000, subscriptions: 380 },
  { month: 'Jan', revenue: 680000, subscriptions: 350 },
  { month: 'Feb', revenue: 820000, subscriptions: 410 },
  { month: 'Mar', revenue: 942500, subscriptions: 480 },
];

// ─── User Growth ──────────────────────────────────────────────────────────────
export const userGrowthData = [
  { month: 'Oct', users: 18200, newUsers: 980 },
  { month: 'Nov', users: 19400, newUsers: 1200 },
  { month: 'Dec', users: 20800, newUsers: 1400 },
  { month: 'Jan', users: 21900, newUsers: 1100 },
  { month: 'Feb', users: 23100, newUsers: 1200 },
  { month: 'Mar', users: 24562, newUsers: 1462 },
];

// ─── Subscription Breakdown ───────────────────────────────────────────────────
export const subscriptionPieData = [
  { name: 'Agent Basic', value: 840, color: '#94A3B8' },
  { name: 'Agent Standard', value: 680, color: '#F59E0B' },
  { name: 'Agent Premium', value: 321, color: '#2E353A' },
  { name: 'Seller Basic', value: 1000, color: '#CBD5E1' },
  { name: 'Seller Standard', value: 600, color: '#FCD34D' },
  { name: 'Seller Premium', value: 400, color: '#475569' },
];

// ─── Recent Activity ──────────────────────────────────────────────────────────
export const recentActivity = [
  { id: 1, type: 'new_user', message: 'Rahul Sharma registered as a new user', time: '2 min ago', avatar: 'RS' },
  { id: 2, type: 'subscription', message: 'Priya Mehta upgraded to Premium plan', time: '8 min ago', avatar: 'PM' },
  { id: 3, type: 'property', message: 'New 3BHK property listed in Bangalore', time: '15 min ago', avatar: 'SK' },
  { id: 4, type: 'subscription', message: 'Amit Verma subscribed to Standard plan', time: '32 min ago', avatar: 'AV' },
  { id: 5, type: 'property', message: 'Commercial space in Hyderabad approved', time: '1 hr ago', avatar: 'NR' },
  { id: 6, type: 'new_user', message: 'Sneha Patel registered as a new user', time: '2 hr ago', avatar: 'SP' },
];

// ─── Top Cities ───────────────────────────────────────────────────────────────
export const topCities = [
  { city: 'Mumbai', listings: 4820, revenue: '₹2,14,000', growth: '+11.2%' },
  { city: 'Bangalore', listings: 3950, revenue: '₹1,89,500', growth: '+14.6%' },
  { city: 'Delhi NCR', listings: 3640, revenue: '₹1,72,000', growth: '+8.8%' },
  { city: 'Hyderabad', listings: 2810, revenue: '₹1,24,000', growth: '+16.1%' },
  { city: 'Chennai', listings: 2180, revenue: '₹98,500', growth: '+9.3%' },
];

// ─── Subscription Plans (Agent) ───────────────────────────────────────────────
export const agentPlans = [
  {
    id: 'a1',
    name: 'Basic Agent',
    monthlyPrice: 1499,
    annualPrice: 14999,
    color: 'slate',
    subscribers: 840,
    features: [
      '20 Property Listings',
      'Basic Agent Profile',
      'Email Support',
      'Standard Visibility',
      '1 Agent Account',
    ],
    notIncluded: ['Featured Listings', 'Priority Support', 'API Access', 'Lead Management'],
  },
  {
    id: 'a2',
    name: 'Standard Agent',
    monthlyPrice: 3499,
    annualPrice: 34999,
    color: 'amber',
    subscribers: 680,
    popular: true,
    features: [
      '100 Property Listings',
      'Verified Agent Badge',
      'Priority Email & Chat Support',
      'Enhanced Visibility',
      '5 Agent Accounts',
      'Featured Listings (10/month)',
      'Basic Lead Management',
    ],
    notIncluded: ['API Access', 'Dedicated Account Manager'],
  },
  {
    id: 'a3',
    name: 'Premium Agent',
    monthlyPrice: 6999,
    annualPrice: 69999,
    color: 'dark',
    subscribers: 321,
    features: [
      'Unlimited Property Listings',
      'Premium Agent Branding',
      '24/7 Dedicated Support',
      'Top Visibility & Priority Placement',
      'Unlimited Agent Accounts',
      'Featured Listings (Unlimited)',
      'Full API Access',
      'Advanced Lead Management',
      'Dedicated Account Manager',
    ],
    notIncluded: [],
  },
];

// ─── Subscription Plans (Seller) ──────────────────────────────────────────────
export const sellerPlans = [
  {
    id: 's1',
    name: 'Basic Seller',
    monthlyPrice: 999,
    annualPrice: 9999,
    color: 'slate',
    subscribers: 1000,
    features: [
      '5 Property Listings',
      'Standard Seller Profile',
      'Email Support',
      'Standard Visibility',
    ],
    notIncluded: ['Featured Listings', 'Priority Support', 'Urgent Tag'],
  },
  {
    id: 's2',
    name: 'Standard Seller',
    monthlyPrice: 2499,
    annualPrice: 24999,
    color: 'amber',
    subscribers: 600,
    popular: true,
    features: [
      '25 Property Listings',
      'Verified Seller Badge',
      'Priority Email & Chat Support',
      'Enhanced Visibility',
      'Featured Listings (3/month)',
      'Urgent Tag on Listings',
    ],
    notIncluded: ['Top Placement', 'Dedicated Support'],
  },
  {
    id: 's3',
    name: 'Premium Seller',
    monthlyPrice: 4999,
    annualPrice: 49999,
    color: 'dark',
    subscribers: 400,
    features: [
      '50 Property Listings',
      'Premium Seller Branding',
      '24/7 Dedicated Support',
      'Top Visibility & Priority Placement',
      'Featured Listings (Unlimited)',
      'Social Media Promotion',
    ],
    notIncluded: [],
  },
];

// ─── Users ────────────────────────────────────────────────────────────────────
export const usersData = [
  { id: '10001', name: 'Rahul Sharma', email: 'rahul.sharma@email.com', phone: '+91 98765 43210', altPhone: '+91 91234 56780', landline: '022-26543210', role: 'Buyer', status: 'Active', joined: '2024-08-12', avatar: 'RS', city: 'Mumbai', properties: 0, subscription: 'Free', address: { city: 'Mumbai', location: 'Andheri East', fullAddress: 'Flat 402, Sunshine Apts, Andheri East, Mumbai, Maharashtra 400069' }, activity: [{ action: 'Logged into dashboard', time: '2 hours ago' }, { action: 'Viewed a property listing', time: '1 day ago' }, { action: 'Updated profile information', time: '1 week ago' }], reports: [{ id: 'REP-101', reporter: 'System', reason: 'Security check flag', date: '25 Mar, 2025', status: 'Resolved' }, { id: 'REP-102', reporter: 'Admin', reason: 'Identity verification pending', date: '28 Mar, 2025', status: 'Active' }], chats: [{ name: 'Amit Verma', role: 'Agent', msg: "Sent property documents for approval...", time: '12 mins ago', unread: true }, { name: 'Rahul Sharma', role: 'Buyer', msg: "Is the price negotiable for the Powai villa?", time: '2 hours ago', unread: false }], transactions: [{ id: 'TXN-9021', type: 'Subscription Move', amount: '₹49,999', date: '22 Mar, 2025', status: 'Completed', color: 'emerald' }, { id: 'TXN-8842', type: 'Featured Listing', amount: '₹2,499', date: '18 Mar, 2025', status: 'Completed', color: 'emerald' }] },

  { id: '10002', name: 'Priya Mehta', email: 'priya.mehta@email.com', phone: '+91 87654 32109', role: 'Seller', status: 'Active', joined: '2024-07-22', avatar: 'PM', city: 'Bangalore', properties: 4, subscription: 'Premium', address: { city: 'Bangalore', location: 'Koramangala', fullAddress: 'Villa 12, Palm Meadows, Koramangala, Bangalore, Karnataka 560034' }, activity: [{ action: 'Posted new property', time: '1 hour ago' }, { action: 'Logged into dashboard', time: '1 day ago' }], reports: [], chats: [{ name: 'Sneha Patel', role: 'Buyer', msg: "Wanted to schedule a site visit for Sunday.", time: '1 day ago', unread: false }], transactions: [{ id: 'TXN-9501', type: 'Premium Upgrade', amount: '₹49,999', date: '20 Mar, 2025', status: 'Completed', color: 'emerald' }] },

  { id: '10003', name: 'Amit Verma', email: 'amit.verma@email.com', phone: '+91 76543 21098', landline: '011-23456789', role: 'Agent', status: 'Active', joined: '2024-06-05', avatar: 'AV', city: 'Delhi', properties: 12, subscription: 'Standard', address: { city: 'Delhi', location: 'Connaught Place', fullAddress: 'Office 301, Tower B, Connaught Place, New Delhi 110001' }, activity: [{ action: 'Responded to client inquiry', time: '30 mins ago' }, { action: 'Logged into dashboard', time: '5 hours ago' }] },

  { id: '10004', name: 'Sneha Patel', email: 'sneha.patel@email.com', phone: '+91 65432 10987', role: 'Buyer', status: 'Inactive', joined: '2024-09-18', avatar: 'SP', city: 'Ahmedabad', properties: 0, subscription: 'None', address: { city: 'Ahmedabad', location: 'Vastrapur', fullAddress: 'B-12, Surya Flats, Vastrapur, Ahmedabad, Gujarat 380015' }, activity: [{ action: 'Account marked inactive', time: '1 month ago' }, { action: 'Last login', time: '2 months ago' }] },

  { id: '10005', name: 'Kiran Rao', email: 'kiran.rao@email.com', phone: '+91 54321 09876', altPhone: '+91 99887 76655', role: 'Seller', status: 'Active', joined: '2024-05-30', avatar: 'KR', city: 'Hyderabad', properties: 7, subscription: 'Standard', address: { city: 'Hyderabad', location: 'Jubilee Hills', fullAddress: 'Plot 45, Road No 10, Jubilee Hills, Hyderabad, Telangana 500033' }, activity: [{ action: 'Edited property listing', time: '3 days ago' }, { action: 'Logged into dashboard', time: '3 days ago' }] },

  { id: '10006', name: 'Vikram Singh', email: 'vikram.singh@email.com', phone: '+91 43210 98765', role: 'Agent', status: 'Active', joined: '2024-04-14', avatar: 'VS', city: 'Jaipur', properties: 21, subscription: 'Premium', address: { city: 'Jaipur', location: 'Malviya Nagar', fullAddress: 'C-Scheme, Shop No 5, Malviya Nagar, Jaipur, Rajasthan 302017' }, activity: [{ action: 'Logged into dashboard', time: 'Just now' }, { action: 'Upgraded subscription plan', time: '1 week ago' }] },

  { id: '10007', name: 'Ananya Krishnan', email: 'ananya.k@email.com', phone: '+91 32109 87654', landline: '044-24567890', role: 'Buyer', status: 'Active', joined: '2024-10-02', avatar: 'AK', city: 'Chennai', properties: 0, subscription: 'Premium', address: { city: 'Chennai', location: 'Adyar', fullAddress: 'No. 8, Gandhi Nagar 1st Main Rd, Adyar, Chennai, Tamil Nadu 600020' }, activity: [{ action: 'Saved a property to favorites', time: '12 hours ago' }, { action: 'Logged into dashboard', time: '12 hours ago' }] },

  { id: '10008', name: 'Rohit Gupta', email: 'rohit.gupta@email.com', phone: '+91 21098 76543', altPhone: '+91 88776 65544', role: 'Seller', status: 'Suspended', joined: '2024-03-08', avatar: 'RG', city: 'Pune', properties: 2, subscription: 'Basic', address: { city: 'Pune', location: 'Koregaon Park', fullAddress: 'Lane 5, Koregaon Park, Pune, Maharashtra 411001' }, activity: [{ action: 'Account suspended by admin', time: '2 weeks ago' }, { action: 'Multiple policy violations detected', time: '2 weeks ago' }] },

  { id: '10009', name: 'Meena Iyer', email: 'meena.iyer@email.com', phone: '+91 10987 65432', role: 'Buyer', status: 'Active', joined: '2024-11-15', avatar: 'MI', city: 'Kochi', properties: 0, subscription: 'Standard', address: { city: 'Kochi', location: 'Marine Drive', fullAddress: 'Apt 8B, Skyline Marine, Marine Drive, Kochi, Kerala 682031' }, activity: [{ action: 'Contacted Agent Amit Verma', time: '1 day ago' }] },

  { id: '10010', name: 'Suresh Nair', email: 'suresh.nair@email.com', phone: '+91 09876 54321', landline: '080-23456789', role: 'Agent', status: 'Active', joined: '2024-02-20', avatar: 'SN', city: 'Bangalore', properties: 18, subscription: 'Basic', address: { city: 'Bangalore', location: 'Indiranagar', fullAddress: '100 Ft Road, HAL 2nd Stage, Indiranagar, Bangalore, Karnataka 560038' }, activity: [{ action: 'Posted 3 new properties', time: '4 days ago' }, { action: 'Logged into dashboard', time: '4 days ago' }] },

  { id: '10011', name: 'Divya Reddy', email: 'divya.reddy@email.com', phone: '+91 98123 45678', altPhone: '+91 91234 56781', landline: '040-23456789', role: 'Seller', status: 'Active', joined: '2024-12-01', avatar: 'DR', city: 'Hyderabad', properties: 3, subscription: 'Basic', address: { city: 'Hyderabad', location: 'Banjara Hills', fullAddress: 'Road No 12, Banjara Hills, Hyderabad, Telangana 500034' }, activity: [{ action: 'Verified identity document', time: '1 month ago' }, { action: 'Logged into dashboard', time: '5 days ago' }] },

  { id: '10012', name: 'Manoj Kumar', email: 'manoj.kumar@email.com', phone: '+91 87234 56789', role: 'Agent', status: 'Inactive', joined: '2024-01-10', avatar: 'MK', city: 'Lucknow', properties: 8, subscription: 'Standard', address: { city: 'Lucknow', location: 'Gomti Nagar', fullAddress: 'Vipin Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010' }, activity: [{ action: 'Subscription automatically expired', time: '3 months ago' }, { action: 'Account marked inactive', time: '3 months ago' }] }
];

// ─── Subscribers ──────────────────────────────────────────────────────────────
export const subscribersData = [
  { id: 10, name: 'Meena Iyer', email: 'meena.iyer@email.com', plan: 'Standard', startDate: '2024-11-15', expiry: '2025-11-15', status: 'Active', amount: '₹24,999', autoRenew: false },
];

// ─── Properties / Products ────────────────────────────────────────────────────
export const propertiesData = [
  {
    id: 1,
    title: 'Luxury 4BHK Villa in Palm Springs',
    propertyType: 'villas',
    purpose: 'selling',
    propertyLength: '4500 sqft',
    areaValue: 4500,
    location: {
      city: 'Mumbai',
      locality: 'Powai',
      projectName: 'Palm Springs',
      fullAddress: 'Villa 12, Palm Springs, Powai, Mumbai - 400076',
      landmark: 'Near Hiranandani Hospital'
    },
    city: 'Mumbai',
    uploader: {
      name: 'Priya Mehta',
      role: 'owner',
      avatar: 'PM',
      verification: 'Adhaar Verified',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    uploadedBy: 'Priya Mehta',
    userId: 'b2e4d1f3-2c3e-5b7a-9d02-002',
    pricing: {
      expectedPrice: 120000000,
      pricePerSqft: 26666,
      maintenanceCharges: 15000,
      negotiable: true
    },
    price: '₹12 Cr',
    status: 'Active',
    date: '2025-03-20',
    furnishingStatus: 'Fully Furnished',
    amenities: ['water supply', 'washrooms', 'bedrooms', 'kitchen', 'livving room', 'balcony', 'parking', 'garden', 'terrace', 'tv', 'sofa'],
    direction: 'north-east',
    locationAdvantages: ['close metro station', 'close to highway', 'close to market'],
    availabilityStatus: 'ready to move',
    availableFrom: '2025-04-01',
    smartAlbum: {
      'Livving Room': ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
      'Kitchen': ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80'],
      'Bedrooms': ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80'],
      'Washrooms': ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80'],
      'Balcony': ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80'],
      'Parking': ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
      'Garden': ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80'],
      'Terrace': ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80']
    },
    coverPhoto: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80', 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80'],
    video: 'https://sample-videos.com/video123.mp4',
    ownerVerification: {
      type: 'Adhaar',
      status: 'Verified',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    ownershipProofs: {
      saleDeed: 'sale_deed_123.pdf',
      encumbranceCert: 'ec_123.pdf',
      propertyTaxReceipt: 'tax_receipt_2024.pdf',
      legalOpinion: 'legal_op.pdf',
      lawyerCert: 'lawyer_cert_123.pdf'
    }
  },
  {
    id: 2,
    title: 'Modern 3BHK Flat near Tech Park',
    propertyType: 'flats',
    purpose: 'selling',
    propertyLength: '1800 sqft',
    areaValue: 1800,
    location: {
      city: 'Bangalore',
      locality: 'Whitefield',
      projectName: 'Prestige Lakeside',
      fullAddress: 'A-402, Prestige Lakeside, Whitefield, Bangalore - 560066',
      landmark: 'Opposite Forum Mall'
    },
    city: 'Bangalore',
    uploader: {
      name: 'Amit Verma',
      role: 'agent',
      avatar: 'AV',
      verification: 'PAN Verified',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    },
    uploadedBy: 'Amit Verma',
    userId: 'c3f5e2a4-3d4f-6c8b-0e13-003',
    pricing: {
      expectedPrice: 18500000,
      pricePerSqft: 10277,
      maintenanceCharges: 5000,
      negotiable: true
    },
    price: '₹1.85 Cr',
    status: 'Pending',
    date: '2025-03-22',
    furnishingStatus: 'Semi Furnished',
    amenities: ['water supply', 'washrooms', 'bedrooms', 'kitchen', 'livving room', 'parking', 'tv'],
    direction: 'east side',
    locationAdvantages: ['close metro station', 'close to airport'],
    availabilityStatus: 'under construction',
    availableFrom: '2026-06-15',
    smartAlbum: {
      'Livving Room': ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
      'Kitchen': ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80'],
      'Bedrooms': ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80'],
      'Washrooms': ['https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80'],
      'Balcony': ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80']
    },
    coverPhoto: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80'],
    video: null,
    ownerVerification: {
      type: 'PAN',
      status: 'Verified',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    },
    ownershipProofs: {
      saleDeed: 'deed_456.pdf',
      encumbranceCert: 'ec_456.pdf',
      propertyTaxReceipt: 'tax_456.pdf'
    }
  },
  {
    id: 3,
    title: 'Commercial Retail Space in Mall',
    propertyType: 'commercial',
    purpose: 'selling',
    propertyLength: '2200 sqft',
    areaValue: 2200,
    location: {
      city: 'Delhi NCR',
      locality: 'Saket',
      projectName: 'Select Citywalk',
      fullAddress: 'Shop 45, Ground Floor, Select Citywalk, Saket, Delhi - 110017',
      landmark: 'Near Main Entrance'
    },
    city: 'Delhi NCR',
    uploader: {
      name: 'Vikram Singh',
      role: 'broker',
      avatar: 'VS',
      verification: 'Passport Verified',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    uploadedBy: 'Vikram Singh',
    userId: 'f6c8b5d7-6a7c-9f1e-3b46-006',
    pricing: {
      expectedPrice: 55000000,
      pricePerSqft: 25000,
      maintenanceCharges: 25000,
      negotiable: false
    },
    price: '₹5.5 Cr',
    status: 'Active',
    date: '2025-03-15',
    furnishingStatus: 'Unfurnished',
    amenities: ['water supply', 'washrooms', 'parking'],
    direction: 'north-west',
    locationAdvantages: ['close metro station', 'close to market'],
    availabilityStatus: 'ready to move',
    availableFrom: '2025-03-01',
    smartAlbum: {
      'Main Hall': ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
      'Parking': ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80']
    },
    coverPhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'],
    video: null,
    ownerVerification: {
      type: 'Passport',
      status: 'Verified',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    ownershipProofs: {
      saleDeed: 'comm_deed.pdf',
      encumbranceCert: 'comm_ec.pdf',
      propertyTaxReceipt: 'comm_tax.pdf'
    }
  },
  {
    id: 4,
    title: 'Residential Plot in Green Acres',
    propertyType: 'plots',
    purpose: 'selling',
    propertyLength: '2400 sqft',
    areaValue: 2400,
    location: {
      city: 'Hyderabad',
      locality: 'Gachibowli',
      projectName: 'Green Acres',
      fullAddress: 'Plot 88, Green Acres Phase 2, Gachibowli, Hyderabad - 500032',
      landmark: 'Next to Botanical Garden'
    },
    city: 'Hyderabad',
    uploader: {
      name: 'Kiran Rao',
      role: 'owner',
      avatar: 'KR',
      verification: 'Adhaar Verified',
      photo: null
    },
    uploadedBy: 'Kiran Rao',
    userId: 'e5b7a4c6-5f6b-8e0d-2a35-005',
    pricing: {
      expectedPrice: 4200000,
      pricePerSqft: 1750,
      maintenanceCharges: 0,
      negotiable: true
    },
    price: '₹42 L',
    status: 'Active',
    date: '2025-03-18',
    furnishingStatus: 'Unfurnished',
    amenities: ['water supply'],
    direction: 'south side',
    locationAdvantages: ['close to highway'],
    availabilityStatus: 'ready to move',
    availableFrom: '2025-01-01',
    smartAlbum: {
      'Plot View': ['https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=800&q=80']
    },
    coverPhoto: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1500382017468-9049fee74a62?w=800&q=80'],
    video: null,
    ownerVerification: {
      type: 'Adhaar',
      status: 'Verified',
      photo: null
    },
    ownershipProofs: {
      saleDeed: 'plot_deed.pdf',
      encumbranceCert: 'plot_ec.pdf',
      propertyTaxReceipt: 'plot_tax.pdf'
    }
  },
  {
    id: 5,
    title: 'Penthouse with Terrace Garden',
    propertyType: 'Appartments',
    purpose: 'selling',
    propertyLength: '3600 sqft',
    areaValue: 3600,
    location: {
      city: 'Mumbai',
      locality: 'Andheri West',
      projectName: 'Ocean View Heights',
      fullAddress: 'P-1, 24th Floor, Ocean View Heights, Andheri West, Mumbai',
      landmark: 'Near Versova Beach'
    },
    city: 'Mumbai',
    uploader: {
      name: 'Divya Reddy',
      role: 'owner',
      avatar: 'DR',
      verification: 'PAN Verified',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    uploadedBy: 'Divya Reddy',
    userId: '4b13a0c2-bf21-4e6d-8g9b-011',
    pricing: {
      expectedPrice: 85000000,
      pricePerSqft: 23611,
      maintenanceCharges: 12000,
      negotiable: true
    },
    price: '₹8.5 Cr',
    status: 'Pending',
    date: '2025-03-24',
    furnishingStatus: 'Fully Furnished',
    amenities: ['water supply', 'washrooms', 'bedrooms', 'kitchen', 'livving room', 'balcony', 'parking', 'garden', 'terrace'],
    direction: 'west side',
    locationAdvantages: ['close to airport', 'close to market'],
    availabilityStatus: 'ready to move',
    availableFrom: '2025-04-15',
    smartAlbum: {
      'Living Room': ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
      'Terrace': ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80']
    },
    coverPhoto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    video: null,
    ownerVerification: {
      type: 'PAN',
      status: 'Verified',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    ownershipProofs: {
      saleDeed: 'pent_deed.pdf',
      encumbranceCert: 'pent_ec.pdf',
      propertyTaxReceipt: 'pent_tax.pdf'
    }
  },
  {
    id: 6,
    title: 'Independent Villa in Jubilee Hills',
    propertyType: 'indipenedent house',
    purpose: 'selling',
    propertyLength: '6500 sqft',
    areaValue: 6500,
    location: {
      city: 'Hyderabad',
      locality: 'Jubilee Hills',
      projectName: 'Elite Enclave',
      fullAddress: 'Villa 5, Road No 36, Jubilee Hills, Hyderabad',
      landmark: 'Near Apollo Hospital'
    },
    city: 'Hyderabad',
    uploader: {
      name: 'Nikhil G',
      role: 'owner',
      avatar: 'NG',
      verification: 'Passport Verified',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    uploadedBy: 'Nikhil G',
    userId: 'e5b7a4c6-5f6b-8e0d-2a35-005',
    pricing: {
      expectedPrice: 250000000,
      pricePerSqft: 38461,
      maintenanceCharges: 20000,
      negotiable: true
    },
    price: '₹25 Cr',
    status: 'Active',
    date: '2025-03-25',
    furnishingStatus: 'Fully Furnished',
    amenities: ['water supply', 'washrooms', 'bedrooms', 'kitchen', 'livving room', 'balcony', 'parking', 'garden', 'pool', 'gym'],
    direction: 'north side',
    locationAdvantages: ['close to highway', 'close to hospital'],
    availabilityStatus: 'ready to move',
    availableFrom: '2025-05-01',
    smartAlbum: {
      'Exterior': ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
      'Living Room': ['https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80'],
      'Bedrooms': ['https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80']
    },
    coverPhoto: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80'],
    video: null,
    ownerVerification: {
      type: 'Passport',
      status: 'Verified',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    ownershipProofs: {
      saleDeed: 'villadeed_789.pdf',
      encumbranceCert: 'ec_789.pdf',
      propertyTaxReceipt: 'tax_789.pdf'
    }
  }
];

// ─── Reports ──────────────────────────────────────────────────────────────────
export const monthlyRevenueReport = [
  { month: 'Oct 24', basic: 82000, standard: 124000, premium: 142000 },
  { month: 'Nov 24', basic: 95000, standard: 148000, premium: 178000 },
  { month: 'Dec 24', basic: 108000, standard: 162000, premium: 198000 },
  { month: 'Jan 25', basic: 92000, standard: 155000, premium: 185000 },
  { month: 'Feb 25', basic: 115000, standard: 178000, premium: 224000 },
  { month: 'Mar 25', basic: 128000, standard: 196000, premium: 248000 },
];

export const propertyTypeData = [
  { name: 'Apartment', value: 8420, color: '#F59E0B' },
  { name: 'Villa', value: 3210, color: '#2E353A' },
  { name: 'Commercial', value: 4180, color: '#64748B' },
  { name: 'Plot', value: 2480, color: '#FCD34D' },
];

// ─── Admin Profile ─────────────────────────────────────────────────────────────
export const adminProfile = {
  name: 'Charan Kumar',
  email: 'charan.admin@99acres.com',
  phone: '+91 98765 00000',
  role: 'Super Admin',
  department: 'Platform Management',
  joinedDate: '2023-01-15',
  lastLogin: '2025-03-31 10:42 AM',
  avatar: 'CK',
  bio: 'Overseeing the 99Acres platform operations, user management, and subscription growth strategies.',
  notifications: {
    emailAlerts: true,
    smsAlerts: false,
    newUserSignup: true,
    newSubscription: true,
    propertyApproval: true,
    weeklyReport: true,
  },
};

export const activityLog = [
  { id: 1, action: 'Approved property listing', detail: '4BHK Penthouse Banjara Hills by Priya Mehta', time: '10:42 AM', date: 'Today' },
  { id: 2, action: 'Suspended user account', detail: 'Rohit Gupta — policy violation', time: '09:15 AM', date: 'Today' },
  { id: 3, action: 'Rejected property listing', detail: 'Warehouse Near ORR by Suresh Nair', time: '08:30 AM', date: 'Today' },
  { id: 4, action: 'Updated subscription plan', detail: 'Premium plan — price revision', time: '05:45 PM', date: 'Yesterday' },
  { id: 5, action: 'Generated monthly report', detail: 'February 2025 revenue report', time: '02:20 PM', date: 'Yesterday' },
  { id: 6, action: 'Added new admin user', detail: 'Nitesh Sharma joined as Moderator', time: '11:00 AM', date: '29 Mar' },
];



export const categoriesData = [
  { id: 1, name: 'Apartment', slug: 'apartment', status: 'Active', description: 'Residential apartments for sale and rent', image: 'https://images.unsplash.com/photo-1609731169878-93aecfda8779?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { id: 2, name: 'Villa', slug: 'villa', status: 'Active', description: 'Independent villas for sale and rent', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80' },

  { id: 3, name: 'Commercial', slug: 'commercial', status: 'Active', description: 'Commercial properties for sale and rent', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80' },

  { id: 4, name: 'Plot', slug: 'plot', status: 'Active', description: 'Plots of land for sale', image: 'https://images.unsplash.com/photo-1461175827210-5ceac3e39dd2?q=80&w=1033&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { id: 5, name: 'Home', slug: 'home', status: 'Active', description: 'Residential homes for living', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80' },

  { id: 6, name: 'Flat', slug: 'flat', status: 'Active', description: 'Flats for sale and rent', image: 'https://images.unsplash.com/photo-1649068453220-f7394ee150d1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },

  { id: 7, name: 'Independent House', slug: 'independent-house', status: 'Active', description: 'Standalone independent houses', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80' },

  { id: 8, name: 'Land', slug: 'land', status: 'Active', description: 'Open lands for sale', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80' }
];

// ─── Support Tickets ──────────────────────────────────────────────────────────
export const supportTickets = [
  {
    id: 'TKT-101',
    subject: 'Login issue',
    user: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    phone: '+91 98765 43210',
    priority: 'High',
    status: 'Open',
    category: 'Technical',
    date: '2024-03-28',
    description: "I am unable to login to my account even after resetting my password. It keeps saying 'Invalid credentials'.",
    messages: [
      { sender: 'Rahul Sharma', role: 'user', content: "I am unable to login to my account even after resetting my password. It keeps saying 'Invalid credentials'.", time: '2024-03-28 10:00 AM' },
    ]
  },
  {
    id: 'TKT-102',
    subject: 'Refund request',
    user: 'Priya Mehta',
    email: 'priya.mehta@email.com',
    phone: '+91 87654 32109',
    priority: 'Medium',
    status: 'In Progress',
    category: 'Billing',
    date: '2024-03-29',
    description: "I was charged twice for the Premium plan this month. Please refund the extra amount.",
    messages: [
      { sender: 'Priya Mehta', role: 'user', content: "I was charged twice for the Premium plan this month. Please refund the extra amount.", time: '2024-03-29 02:00 PM' },
      { sender: 'Admin', role: 'admin', content: "Hello Priya, we are looking into this with our billing partner. We will get back to you shortly.", time: '2024-03-29 03:30 PM' },
    ]
  },
  {
    id: 'TKT-103',
    subject: 'Property listing error',
    user: 'Amit Verma',
    email: 'amit.verma@email.com',
    phone: '+91 76543 21098',
    priority: 'Low',
    status: 'Closed',
    category: 'Content',
    date: '2024-03-25',
    description: "I am getting an error 'Image size too large' when uploading property photos even though they are under 2MB.",
    messages: [
      { sender: 'Amit Verma', role: 'user', content: "I am getting an error 'Image size too large' when uploading property photos even though they are under 2MB.", time: '2024-03-25 09:00 AM' },
      { sender: 'Admin', role: 'admin', content: "Hi Amit, we have increased the upload limit for your account. Please try again.", time: '2024-03-25 11:45 AM' },
      { sender: 'Amit Verma', role: 'user', content: "Thanks, it works now!", time: '2024-03-25 12:30 PM' },
    ]
  },
  {
    id: 'TKT-104',
    subject: 'Account verification',
    user: 'Sneha Patel',
    email: 'sneha.patel@email.com',
    phone: '+91 65432 10987',
    priority: 'High',
    status: 'Open',
    category: 'Account',
    date: '2024-03-30',
    description: "My Aadhaar verification has been pending for over 3 days. Can you please speed it up?",
    messages: [
      { sender: 'Sneha Patel', role: 'user', content: "My Aadhaar verification has been pending for over 3 days. Can you please speed it up?", time: '2024-03-30 11:00 AM' },
    ]
  },
  {
    id: 'TKT-105',
    subject: 'API access query',
    user: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    phone: '+91 43210 98765',
    priority: 'Medium',
    status: 'Open',
    category: 'Technical',
    date: '2024-03-31',
    description: "I want to integrate your property listings into my CRM via API. Can you provide the documentation?",
    messages: [
      { sender: 'Vikram Singh', role: 'user', content: "I want to integrate your property listings into my CRM via API. Can you provide the documentation?", time: '2024-03-31 04:00 PM' },
    ]
  },
];


// ─── Reviews ──────────────────────────────────────────────────────────────────
export const reviewsData = [
  { id: 1, propertyId: 1, property: 'Palm Springs Villa', user: 'Ananya K.', rating: 5, comment: 'Amazing property and very smooth process.', date: '2024-03-15', status: 'Approved' },
  { id: 2, propertyId: 2, property: 'Prestige Lakeside Flat', user: 'Rohit G.', rating: 4, comment: 'Great location, but the price is a bit high.', date: '2024-03-18', status: 'Pending' },
  { id: 3, propertyId: 3, property: 'Commercial Retail Space', user: 'Meena I.', rating: 3, comment: 'The area is good, but maintenance is lacking.', date: '2024-03-20', status: 'Approved' },
  { id: 4, propertyId: 4, property: 'Residential Plot Gachibowli', user: 'Suresh N.', rating: 5, comment: 'Excellent investment opportunity.', date: '2024-03-22', status: 'Approved' },
  { id: 5, propertyId: 5, property: 'Ocean View Penthouse', user: 'Divya R.', rating: 2, comment: 'Multiple issues with the plumbing.', date: '2024-03-25', status: 'Flagged' },
];

// ─── Staff ────────────────────────────────────────────────────────────────────
export const staffRoles = [
  { id: 1, name: 'Super Admin', members: 2, permissions: ['Full Access', 'User Management', 'Financials', 'System Settings'] },
  { id: 2, name: 'Moderator', members: 5, permissions: ['Content Approval', 'User Support', 'Review Moderation'] },
  { id: 3, name: 'Sales Manager', members: 3, permissions: ['Subscription Management', 'Lead Tracking', 'Reports Access'] },
  { id: 4, name: 'Support Agent', members: 8, permissions: ['Ticket Handling', 'User Communication'] },
];

export const staffMembers = [
  { id: 101, name: 'Nitesh Sharma', role: 'Moderator', email: 'nitesh.s@99acres.com', status: 'Active', joined: '2024-01-10', avatar: 'NS' },
  { id: 102, name: 'Sanjana Rao', role: 'Sales Manager', email: 'sanjana.r@99acres.com', status: 'Active', joined: '2023-11-22', avatar: 'SR' },
  { id: 103, name: 'Karthik M.', role: 'Support Agent', email: 'karthik.m@99acres.com', status: 'Inactive', joined: '2024-02-05', avatar: 'KM' },
  { id: 104, name: 'Aavriti Gupta', role: 'Super Admin', email: 'aavriti.g@99acres.com', status: 'Active', joined: '2023-05-18', avatar: 'AG' },
  { id: 105, name: 'Vikram Aditya', role: 'Moderator', email: 'vikram.a@99acres.com', status: 'Active', joined: '2024-03-01', avatar: 'VA' },
];