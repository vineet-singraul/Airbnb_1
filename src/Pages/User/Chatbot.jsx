import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Grid,
  CircularProgress,
  Badge,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tooltip,
  Collapse,
  Fab,
  Alert,
  AlertTitle,
  Rating,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Menu,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  InputAdornment,
  Switch,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Popover,
  Snackbar,
} from '@mui/material';
import {
  // Basic Icons
  Send as SendIcon,
  SmartToy as BotIcon,
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Search as SearchIcon,
  
  // Property Features
  KingBed as BedIcon,
  Bathtub as BathIcon,
  Wifi as WifiIcon,
  AcUnit as AcIcon,
  LocalParking as ParkingIcon,
  Pool as PoolIcon,
  FitnessCenter as GymIcon,
  Restaurant as FoodIcon,
  Tv as TvIcon,
  Security as SecurityIcon,
  WaterDrop as WaterIcon,
  DirectionsCar as PickupIcon,
  NightsStay as StayLongIcon,
  
  // Status & Info
  Verified as VerifiedIcon,
  AttachMoney as PriceIcon,
  Groups as GuestIcon,
  Star as StarIcon,
  Whatshot as HotIcon,
  
  // Actions
  FilterAlt as FilterIcon,
  ClearAll as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  Description as DescriptionIcon,
  Sort as SortIcon,
  Tune as TuneIcon,
  Bookmark as BookmarkIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  
  // Additional Facilities
  Pets as PetsIcon,
  LocalLaundryService as LaundryIcon,
  Kitchen as KitchenIcon,
  SmokingRooms as SmokingIcon,
  BusinessCenter as BusinessIcon,
  ChildCare as ChildIcon,
  Accessibility as AccessibilityIcon,
  CoffeeMaker as CoffeeIcon,
  Microwave as MicrowaveIcon,
  LocalFireDepartment as OvenIcon,
  Wash as DishwasherIcon,
  Blender as BlenderIcon,
  BreakfastDining as ToasterIcon,
  
  // Filter & Navigation
  FilterList as FilterListIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Apartment as ApartmentIcon,
  Villa as VillaIcon,
  House as HouseIcon,
  MeetingRoom as StudioIcon,
  
  // Special Features
  BeachAccess as BeachIcon,
  Fireplace as FireplaceIcon,
  HotTub as HotTubIcon,
  SportsEsports as GamesIcon,
  ElectricCar as ElectricIcon,
  SolarPower as SolarIcon,
  Recycling as RecyclingIcon,
  Thermostat as ThermostatIcon,
  Balcony as BalconyIcon,
  Elevator as ElevatorIcon,
  
  // Simple replacements for missing icons
  Home as HomeIcon,
  Info as InfoIcon,
  Menu as MenuIcon,
  Photo as PhotoIcon,
  Share as ShareIcon,
  Reviews as ReviewsIcon,
  Cancel as CancelIcon,
  EventAvailable as AvailableIcon,
  Help as HelpIcon,
  Lightbulb as LightbulbIcon,
  CalendarToday as CalendarIcon,
  Favorite as FavoriteIcon,
  Chat as ChatIcon,
  Psychology as PsychologyIcon,
  Spa as SpaIcon,
  Celebration as CelebrationIcon,
  Explore as ExploreIcon,
  LocalOffer as OfferIcon,
  Map as MapIcon,
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  EmojiEmotions as EmojiIcon,
  TrendingUp as TrendingIcon,
  
  // Use existing icons for missing ones
  FlashOn as FlashIcon,
  BatteryChargingFull as BatteryIcon,
  Router as RouterIcon,
  NetworkWifi as NetworkIcon,
  Devices as DevicesIcon,
  Computer as DesktopIcon,
  Laptop as LaptopIcon,
  Tablet as TabletIcon,
  PhoneIphone as PhoneIcon,
  CameraAlt as CameraIcon,
  Videocam as VideoIcon,
  Gamepad as GamepadIcon,
  DirectionsBike as BikeIcon,
  DirectionsBoat as BoatIcon,
  DirectionsRun as RunningIcon,
  GolfCourse as GolfIcon,
  DownhillSkiing as SkiIcon,
  LocalCafe as CafeIcon,
  LocalBar as BarIcon,
  LocalMall as MallIcon,
  LocalHospital as HospitalIcon,
  LocalPharmacy as PharmacyIcon,
  LocalGroceryStore as GroceryIcon,
  Park as ParkIcon,
  Forest as ForestIcon,
  Cottage as CottageIcon,
  Castle as CastleIcon,
  Houseboat as HouseboatIcon,
  Cabin as CabinIcon,
  Flight as FlightIcon,
  DirectionsWalk as WalkIcon,
  AccessTime as TimeIcon,
  Event as EventIcon,
  Today as TodayIcon,
  Schedule as ScheduleIcon,
  Timer as TimerIcon,
  Power as PowerIcon,
  PowerOff as PowerOffIcon,
  Memory as MemoryIcon,
  Storage as StorageIcon,
  Headset as HeadsetIcon,
  Speaker as SpeakerIcon,
  Keyboard as KeyboardIcon,
  Mouse as MouseIcon,
  SportsTennis as TennisIcon,
  SportsBasketball as BasketballIcon,
  SportsSoccer as SoccerIcon,

  // Chat History Icons
  Delete as DeleteIcon,
  History as HistoryIcon,
  Save as SaveIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import axios from 'axios';
import { styled, keyframes } from '@mui/material/styles';

// Animations
const typingAnimation = keyframes`
  0%, 20% { transform: translateY(0px); }
  40% { transform: translateY(-5px); }
  60%, 100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

// Styled Components
const ChatContainer = styled(Box)(({ theme }) => ({
  height: '85vh',
  maxHeight: '800px',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  animation: `${fadeIn} 0.5s ease-out`,
  position: 'relative',
}));

const ChatHeader = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  borderTopLeftRadius: '20px',
  borderTopRightRadius: '20px',
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: theme.spacing(3),
  background: 'rgba(255, 255, 255, 0.98)',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(0,0,0,0.03)',
    borderRadius: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '6px',
  },
}));

const MessageBubble = styled(Box)(({ theme, isbot }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(2),
  flexDirection: isbot === 'true' ? 'row' : 'row-reverse',
  animation: `${fadeIn} 0.3s ease-out`,
}));

const BotMessage = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '80%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  borderRadius: '18px 18px 18px 4px',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.2)',
}));

const UserMessage = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '80%',
  background: '#f0f4ff',
  color: '#333',
  borderRadius: '18px 18px 4px 18px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
}));

const InputContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(10px)',
  borderTop: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  gap: theme.spacing(1.5),
  borderBottomLeftRadius: '20px',
  borderBottomRightRadius: '20px',
}));

const PropertyCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(2),
  transition: 'all 0.3s ease',
  border: `1px solid rgba(102, 126, 234, 0.1)`,
  borderRadius: '12px',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    borderColor: '#667eea',
  },
}));

const SuggestionChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontWeight: 500,
  '&:hover': {
    transform: 'translateY(-2px)',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
}));

const TypingDots = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  padding: theme.spacing(1.5),
  '& span': {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#fff',
    animation: `${typingAnimation} 1.4s infinite`,
    '&:nth-of-type(1)': { animationDelay: '0s' },
    '&:nth-of-type(2)': { animationDelay: '0.2s' },
    '&:nth-of-type(3)': { animationDelay: '0.4s' },
  },
}));

const RulesButton = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  top: 20,
  right: 20,
  zIndex: 1000,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    transform: 'scale(1.1)',
  },
}));

// Filter Panel Styles
const FilterPanel = styled(Paper)(({ theme, open }) => ({
  position: 'absolute',
  right: 0,
  top: 0,
  height: '100%',
  width: open ? '350px' : '0',
  overflow: 'hidden',
  transition: 'width 0.3s ease',
  background: 'white',
  boxShadow: '-5px 0 20px rgba(0,0,0,0.1)',
  zIndex: 100,
  display: 'flex',
  flexDirection: 'column',
}));

const FilterToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 20,
  top: 20,
  zIndex: 101,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
  },
}));

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FacilityChip = styled(Chip)(({ theme, active }) => ({
  margin: theme.spacing(0.5),
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  background: active ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'transparent',
  color: active ? 'white' : 'inherit',
  border: active ? 'none' : `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
}));

// Define initialMessage outside component
const initialMessage = { 
  id: 1, 
  text: "Hello! 👋 I'm your Property Assistant. I can help you find properties by city, price, facilities, or host name. How can I assist you today?", 
  isBot: true,
  type: 'text',
  timestamp: new Date().toISOString()
};

const Chatbot = () => {
  // State variables
  const [messages, setMessages] = useState(() => {
    // Load saved chat from sessionStorage
    const savedChat = sessionStorage.getItem('propertyChatHistory');
    if (savedChat) {
      try {
        const parsedChat = JSON.parse(savedChat);
        return parsedChat.length > 0 ? parsedChat : [initialMessage];
      } catch (e) {
        return [initialMessage];
      }
    }
    return [initialMessage];
  });
  
  const [savedChats, setSavedChats] = useState(() => {
    // Load saved chats history from localStorage
    const saved = localStorage.getItem('propertyChatSessions');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputText, setInputText] = useState('');
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMoreProperties, setShowMoreProperties] = useState(false);
  const [showRulesDialog, setShowRulesDialog] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // Chat History Menu States
  const [historyAnchorEl, setHistoryAnchorEl] = useState(null);
  const [chatMenuAnchorEl, setChatMenuAnchorEl] = useState(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [chatName, setChatName] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Active Filters State
  const [activeFilters, setActiveFilters] = useState({
    city: '',
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: 0,
    bathrooms: 0,
    guests: 0,
    facilities: [],
    propertyType: '',
    hostName: '',
    rating: 0,
    instantBook: false,
    superhost: false,
  });
  
  const [allHosts, setAllHosts] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const messagesEndRef = useRef(null);

  // Enhanced suggestions with more query types
  const suggestions = [
    { text: "🏖️ Show properties in Goa", icon: <LocationIcon />, query: "properties in goa" },
    { text: "💰 Under ₹1000 per night", icon: <PriceIcon />, query: "properties under 1000" },
    { text: "💰 ₹2000-3000 properties", icon: <PriceIcon />, query: "properties between 2000 and 3000" },
    { text: "👨‍💼 Hosted by Swati", icon: <PersonIcon />, query: "properties hosted by swati" },
    { text: "📺 TV + AC + Long Stay", icon: <TvIcon />, query: "properties with tv ac and long stay" },
    { text: "🔍 Find host properties", icon: <SearchIcon />, query: "show all hosts" },
    { text: "🏠 2 properties in Mumbai", icon: <HomeIcon />, query: "show 2 properties in mumbai" },
    { text: "🎯 Top 2 properties", icon: <StarIcon />, query: "top 2 properties in delhi" },
    { text: "💵 Budget properties", icon: <PriceIcon />, query: "cheap properties under 1500" },
    { text: "⭐ Luxury properties", icon: <StarIcon />, query: "luxury properties with all facilities" },
  ];

  // All facility icons mapping
  const facilityIcons = {
    wifi: <WifiIcon fontSize="small" />,
    ac: <AcIcon fontSize="small" />,
    pools: <PoolIcon fontSize="small" />,
    gym: <GymIcon fontSize="small" />,
    parking: <ParkingIcon fontSize="small" />,
    food: <FoodIcon fontSize="small" />,
    tv: <TvIcon fontSize="small" />,
    filterWater: <WaterIcon fontSize="small" />,
    pickupFacility: <PickupIcon fontSize="small" />,
    securityCam: <SecurityIcon fontSize="small" />,
    StayLongAllow: <StayLongIcon fontSize="small" />,
    smoking: <SmokingIcon fontSize="small" />,
    pets: <PetsIcon fontSize="small" />,
    laundry: <LaundryIcon fontSize="small" />,
    kitchen: <KitchenIcon fontSize="small" />,
    business: <BusinessIcon fontSize="small" />,
    childFriendly: <ChildIcon fontSize="small" />,
    accessible: <AccessibilityIcon fontSize="small" />,
    coffeeMaker: <CoffeeIcon fontSize="small" />,
    microwave: <MicrowaveIcon fontSize="small" />,
    oven: <OvenIcon fontSize="small" />,
    dishwasher: <DishwasherIcon fontSize="small" />,
    blender: <BlenderIcon fontSize="small" />,
    toaster: <ToasterIcon fontSize="small" />,
    beachAccess: <BeachIcon fontSize="small" />,
    fireplace: <FireplaceIcon fontSize="small" />,
    hotTub: <HotTubIcon fontSize="small" />,
    games: <GamesIcon fontSize="small" />,
    instantBook: <FlashIcon fontSize="small" />,
    superhost: <VerifiedIcon fontSize="small" />,
  };

  const facilityLabels = {
    wifi: 'WiFi',
    ac: 'Air Conditioning',
    pools: 'Swimming Pool',
    gym: 'Gym',
    parking: 'Parking',
    food: 'Food Service',
    tv: 'TV',
    filterWater: 'Water Filter',
    pickupFacility: 'Pickup Facility',
    securityCam: 'Security Camera',
    StayLongAllow: 'Long Stay',
    smoking: 'Smoking Allowed',
    pets: 'Pets Allowed',
    laundry: 'Laundry',
    kitchen: 'Kitchen',
    business: 'Business Center',
    childFriendly: 'Child Friendly',
    accessible: 'Accessible',
    coffeeMaker: 'Coffee Maker',
    microwave: 'Microwave',
    oven: 'Oven',
    dishwasher: 'Dishwasher',
    blender: 'Blender',
    toaster: 'Toaster',
    beachAccess: 'Beach Access',
    fireplace: 'Fireplace',
    hotTub: 'Hot Tub',
    games: 'Games Room',
    instantBook: 'Instant Book',
    superhost: 'Superhost',
  };

  // Property types
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: <ApartmentIcon /> },
    { value: 'villa', label: 'Villa', icon: <VillaIcon /> },
    { value: 'house', label: 'House', icon: <HouseIcon /> },
    { value: 'studio', label: 'Studio', icon: <StudioIcon /> },
    { value: 'cottage', label: 'Cottage', icon: <CottageIcon /> },
    { value: 'castle', label: 'Castle', icon: <CastleIcon /> },
    { value: 'houseboat', label: 'Houseboat', icon: <HouseboatIcon /> },
    { value: 'cabin', label: 'Cabin', icon: <CabinIcon /> },
  ];

  // All facilities for filtering
  const allFacilities = Object.keys(facilityLabels).map(key => ({
    id: key,
    label: facilityLabels[key],
    icon: facilityIcons[key]
  }));

  // Fetch properties and extract hosts and cities
  useEffect(() => {
    fetchAllProperties();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save chat to sessionStorage whenever messages change
  useEffect(() => {
    try {
      sessionStorage.setItem('propertyChatHistory', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat to sessionStorage:', e);
    }
  }, [messages]);

  // Save chats history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('propertyChatSessions', JSON.stringify(savedChats));
    } catch (e) {
      console.error('Failed to save chat sessions:', e);
    }
  }, [savedChats]);

  const fetchAllProperties = async () => {
    try {
      const API = "http://127.0.0.1:8000/airbnb/Users-allPropertyCards/";
      const response = await axios.get(API);
      const propertiesData = response.data || [];
      setProperties(propertiesData);
      
      // Extract unique hosts
      const hosts = [];
      const cities = new Set();
      
      propertiesData.forEach(property => {
        if (property.host?.host_name) {
          hosts.push({
            name: property.host.host_name,
            id: property.host.id,
            propertyCount: propertiesData.filter(p => p.host?.host_name === property.host.host_name).length
          });
        }
        if (property.city) {
          cities.add(property.city.toLowerCase());
        }
      });
      
      // Remove duplicate hosts
      const uniqueHosts = hosts.filter((host, index, self) =>
        index === self.findIndex(h => h.name === host.name)
      );
      
      setAllHosts(uniqueHosts);
      setAllCities(Array.from(cities));
      
    } catch (error) {
      console.error("Error fetching properties:", error);
      addBotMessage("Sorry, I couldn't fetch properties at the moment. Please try again.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addUserMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isBot: false,
      type: 'text',
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text, data = null, type = 'text') => {
    const newMessage = {
      id: messages.length + 1,
      text,
      isBot: true,
      data,
      type,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const showTypingIndicator = () => {
    addBotMessage("", null, 'typing');
    setIsProcessing(true);
  };

  const hideTypingIndicator = () => {
    setIsProcessing(false);
    setMessages(prev => prev.filter(msg => msg.type !== 'typing'));
  };

  // Apply filters to properties
  const applyFilters = () => {
    let filtered = [...properties];

    // City filter
    if (activeFilters.city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(activeFilters.city.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(p => {
      const price = parseFloat(p.price_per_night) || 0;
      return price >= activeFilters.minPrice && price <= activeFilters.maxPrice;
    });

    // Bedrooms filter
    if (activeFilters.bedrooms > 0) {
      filtered = filtered.filter(p => p.bedrooms >= activeFilters.bedrooms);
    }

    // Bathrooms filter
    if (activeFilters.bathrooms > 0) {
      filtered = filtered.filter(p => p.bathrooms >= activeFilters.bathrooms);
    }

    // Guests filter
    if (activeFilters.guests > 0) {
      filtered = filtered.filter(p => p.guests_allowed >= activeFilters.guests);
    }

    // Facilities filter
    if (activeFilters.facilities.length > 0) {
      filtered = filtered.filter(p => {
        return activeFilters.facilities.every(facility => p[facility] === true);
      });
    }

    // Property type filter
    if (activeFilters.propertyType) {
      filtered = filtered.filter(p => 
        p.type?.toLowerCase().includes(activeFilters.propertyType.toLowerCase()) ||
        p.title?.toLowerCase().includes(activeFilters.propertyType.toLowerCase())
      );
    }

    // Host name filter
    if (activeFilters.hostName) {
      filtered = filtered.filter(p => 
        p.host?.host_name?.toLowerCase().includes(activeFilters.hostName.toLowerCase())
      );
    }

    // Rating filter
    if (activeFilters.rating > 0) {
      filtered = filtered.filter(p => (p.rating || 0) >= activeFilters.rating);
    }

    // Instant book filter
    if (activeFilters.instantBook) {
      filtered = filtered.filter(p => p.instant_book === true);
    }

    // Superhost filter
    if (activeFilters.superhost) {
      filtered = filtered.filter(p => p.host?.superhost === true);
    }

    setFilteredProperties(filtered);
    
    if (filtered.length > 0) {
      addBotMessage(
        `Found ${filtered.length} properties with current filters:`, 
        { 
          properties: filtered.slice(0, 3), 
          total: filtered.length,
          showMore: filtered.length > 3
        }, 
        'properties'
      );
    } else {
      addBotMessage("No properties found with the current filters. Try adjusting your criteria.");
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterName, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleFacilityToggle = (facilityId) => {
    setActiveFilters(prev => {
      const facilities = prev.facilities.includes(facilityId)
        ? prev.facilities.filter(f => f !== facilityId)
        : [...prev.facilities, facilityId];
      return { ...prev, facilities };
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({
      city: '',
      minPrice: 0,
      maxPrice: 10000,
      bedrooms: 0,
      bathrooms: 0,
      guests: 0,
      facilities: [],
      propertyType: '',
      hostName: '',
      rating: 0,
      instantBook: false,
      superhost: false,
    });
    setFilteredProperties([]);
    addBotMessage("All filters have been cleared. Showing all properties.");
  };

  // ENHANCED QUERY PROCESSING
  const processQuery = (query) => {
    const lowerQuery = query.toLowerCase().trim();
    
    // Handle greetings
    if (/(hi|hello|hey|good morning|good afternoon|good evening)/i.test(lowerQuery)) {
      return { type: 'greeting', response: "Hello! 👋 How can I help you find properties today?" };
    }
    
    if (/(how are you|how you doing|how's it going)/i.test(lowerQuery)) {
      return { type: 'greeting', response: "I'm doing great! Ready to help you find the perfect property. What are you looking for?" };
    }
    
    // City + top properties
    if (lowerQuery.includes('top') && lowerQuery.includes('city')) {
      return handleCityTopProperties(lowerQuery);
    }
    
    // Under 1000
    if (lowerQuery.includes('under') && (lowerQuery.includes('1000') || lowerQuery.match(/under\s+₹?\s*\d+/))) {
      return handleUnderPrice(lowerQuery);
    }
    
    // Between price range
    if ((lowerQuery.includes('between') || lowerQuery.includes('-')) && (lowerQuery.includes('2000') || lowerQuery.includes('3000') || lowerQuery.match(/\d+\s*-\s*\d+/))) {
      return handleBetweenPrice(lowerQuery);
    }
    
    // Host name search
    if (lowerQuery.includes('host') || lowerQuery.includes('hosted by')) {
      return handleHostSearch(lowerQuery);
    }
    
    // AND functionality with facilities
    if (lowerQuery.includes('tv') && lowerQuery.includes('ac') && lowerQuery.includes('long')) {
      return handleANDfunctionality(lowerQuery);
    }
    
    // Show X properties in city
    if ((lowerQuery.includes('show') || lowerQuery.includes('property')) && lowerQuery.match(/\d+\s+property/)) {
      return handleShowXProperties(lowerQuery);
    }
    
    // Handle filter-related queries
    if (lowerQuery.includes('filter') || lowerQuery.includes('apply filter') || lowerQuery.includes('with filters')) {
      applyFilters();
      return { type: 'filter', response: "Applying current filters..." };
    }
    
    if (lowerQuery.includes('clear filter') || lowerQuery.includes('reset filter')) {
      clearAllFilters();
      return { type: 'filter', response: "Filters cleared!" };
    }
    
    // Default property search
    return handleDefaultPropertySearch(lowerQuery);
  };

  // HANDLER FUNCTIONS
  const handleCityTopProperties = (query) => {
    const cityMatch = query.match(/city\s+(\w+)/) || query.match(/in\s+(\w+)/);
    const numberMatch = query.match(/(\d+)\s+property/) || query.match(/top\s+(\d+)/);
    
    const city = cityMatch ? cityMatch[1] : null;
    const count = numberMatch ? parseInt(numberMatch[1]) : 2;
    
    let filtered = [...properties];
    
    if (city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    // Sort by rating or price
    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    
    const topProperties = filtered.slice(0, count);
    
    return {
      type: 'property',
      filters: { city, count },
      response: `Here are the top ${count} properties${city ? ` in ${city}` : ''}:`,
      properties: topProperties,
      total: filtered.length
    };
  };

  const handleUnderPrice = (query) => {
    const priceMatch = query.match(/under\s+₹?\s*(\d+)/) || query.match(/below\s+₹?\s*(\d+)/) || query.match(/<=\s*₹?\s*(\d+)/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 1000;
    
    handleFilterChange('maxPrice', price);
    handleFilterChange('minPrice', 0);
    
    return {
      type: 'filter',
      response: `Set price filter to under ₹${price}. Use "Apply Filters" to see results.`,
    };
  };

  const handleBetweenPrice = (query) => {
    const rangeMatch = query.match(/(\d+)\s*-\s*(\d+)/) || query.match(/between\s+₹?\s*(\d+)\s+and\s+₹?\s*(\d+)/);
    
    let minPrice = 2000;
    let maxPrice = 3000;
    
    if (rangeMatch) {
      minPrice = parseInt(rangeMatch[1]);
      maxPrice = parseInt(rangeMatch[2]);
    }
    
    handleFilterChange('minPrice', minPrice);
    handleFilterChange('maxPrice', maxPrice);
    
    return {
      type: 'filter',
      response: `Set price filter to ₹${minPrice} - ₹${maxPrice}. Use "Apply Filters" to see results.`,
    };
  };

  const handleHostSearch = (query) => {
    const hostMatch = query.match(/hosted by\s+(\w+)/i) || query.match(/host\s+(\w+)/i) || query.match(/swati|ramesh|john|priya|amit/i);
    
    if (hostMatch) {
      const hostName = hostMatch[1] || hostMatch[0];
      handleFilterChange('hostName', hostName);
      
      return {
        type: 'filter',
        response: `Set host filter to "${hostName}". Use "Apply Filters" to see results.`,
      };
    } else {
      // Show all hosts
      return {
        type: 'hosts',
        response: `Found ${allHosts.length} hosts:\n${allHosts.map(h => `• ${h.name} (${h.propertyCount} properties)`).join('\n')}`,
        hosts: allHosts
      };
    }
  };

  const handleANDfunctionality = (query) => {
    const facilities = [];
    
    if (query.includes('tv')) facilities.push('tv');
    if (query.includes('ac')) facilities.push('ac');
    if (query.includes('long')) facilities.push('StayLongAllow');
    
    handleFilterChange('facilities', facilities);
    
    const facilityNames = facilities.map(f => facilityLabels[f] || f).join(' + ');
    
    return {
      type: 'filter',
      response: `Set facilities filter to ${facilityNames}. Use "Apply Filters" to see results.`,
    };
  };

  const handleShowXProperties = (query) => {
    const numberMatch = query.match(/(\d+)\s+property/) || query.match(/show\s+(\d+)/);
    const cityMatch = query.match(/in\s+(\w+)/) || query.match(/city\s+(\w+)/);
    
    const count = numberMatch ? parseInt(numberMatch[1]) : 2;
    const city = cityMatch ? cityMatch[1] : null;
    
    if (city) handleFilterChange('city', city);
    
    let filtered = [...properties];
    if (city) {
      filtered = filtered.filter(p => 
        p.city.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    const resultProperties = filtered.slice(0, count);
    
    return {
      type: 'property',
      filters: { city, count },
      response: `Showing ${count} properties${city ? ` in ${city}` : ''}:`,
      properties: resultProperties,
      total: filtered.length
    };
  };

  const handleDefaultPropertySearch = (query) => {
    // Default simple search
    const filtered = properties.filter(p => 
      p.title?.toLowerCase().includes(query) ||
      p.city?.toLowerCase().includes(query) ||
      p.description?.toLowerCase().includes(query)
    );
    
    return {
      type: 'property',
      response: filtered.length > 0 ? 
        `Found ${filtered.length} properties matching "${query}":` :
        `No properties found for "${query}". Try a different search.`,
      properties: filtered.slice(0, 3),
      total: filtered.length
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    // Add user message
    addUserMessage(inputText);
    
    // Show typing indicator
    showTypingIndicator();

    // Process after delay
    setTimeout(() => {
      const result = processQuery(inputText);
      
      // Remove typing indicator
      hideTypingIndicator();
      
      // Handle different response types
      if (result.type === 'greeting') {
        addBotMessage(result.response);
      } else if (result.type === 'text') {
        addBotMessage(result.response);
      } else if (result.type === 'count') {
        addBotMessage(result.response);
      } else if (result.type === 'hosts') {
        addBotMessage(result.response, result.hosts, 'hosts');
      } else if (result.type === 'host') {
        addBotMessage(result.response, { host: result.host, properties: result.properties }, 'host');
      } else if (result.type === 'property') {
        addBotMessage(
          result.response, 
          { 
            properties: result.properties, 
            total: result.total,
            showMore: result.properties.length < result.total
          }, 
          'properties'
        );
        setFilteredProperties(result.properties);
      } else if (result.type === 'filter') {
        addBotMessage(result.response);
      }
      
      // Clear input
      setInputText('');
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion.query || suggestion.text);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleShowMore = () => {
    const lastMessage = messages.findLast(msg => msg.isBot && msg.type === 'properties');
    if (lastMessage && lastMessage.data) {
      const startIndex = lastMessage.data.properties.length;
      const moreProperties = properties.slice(startIndex, startIndex + 3);
      
      const updatedData = {
        ...lastMessage.data,
        properties: [...lastMessage.data.properties, ...moreProperties],
        showMore: (startIndex + 3) < lastMessage.data.total
      };
      
      const updatedMessages = messages.map(msg => 
        msg.id === lastMessage.id 
          ? { ...msg, data: updatedData }
          : msg
      );
      
      setMessages(updatedMessages);
    }
  };

  // Chat History Management Functions
  const handleChatMenuOpen = (event) => {
    setChatMenuAnchorEl(event.currentTarget);
  };

  const handleChatMenuClose = () => {
    setChatMenuAnchorEl(null);
  };

  const handleHistoryOpen = (event) => {
    setHistoryAnchorEl(event.currentTarget);
  };

  const handleHistoryClose = () => {
    setHistoryAnchorEl(null);
  };

  const saveCurrentChat = () => {
    if (messages.length <= 1) {
      showSnackbar('No chat history to save', 'warning');
      return;
    }

    setShowSaveDialog(true);
    handleChatMenuClose();
  };

  const confirmSaveChat = () => {
    if (!chatName.trim()) {
      showSnackbar('Please enter a name for this chat', 'error');
      return;
    }

    const newChat = {
      id: Date.now(),
      name: chatName,
      messages: [...messages],
      timestamp: new Date().toISOString(),
      messageCount: messages.length
    };

    // Add to saved chats (limit to last 10)
    setSavedChats(prev => {
      const updated = [newChat, ...prev.slice(0, 9)];
      return updated;
    });

    setChatName('');
    setShowSaveDialog(false);
    showSnackbar('Chat saved successfully!', 'success');
  };

  const loadChat = (chat) => {
    setMessages(chat.messages);
    setHistoryAnchorEl(null);
    showSnackbar(`Loaded chat: ${chat.name}`, 'info');
  };

  const deleteChat = (chatId, event) => {
    if (event) event.stopPropagation();
    setSavedChats(prev => prev.filter(chat => chat.id !== chatId));
    showSnackbar('Chat deleted', 'info');
  };

  const clearCurrentChat = () => {
    if (window.confirm('Are you sure you want to clear the current chat? This action cannot be undone.')) {
      setMessages([initialMessage]);
      showSnackbar('Chat cleared', 'success');
    }
    handleChatMenuClose();
  };

  const clearAllSavedChats = () => {
    if (window.confirm('Are you sure you want to delete all saved chats? This action cannot be undone.')) {
      setSavedChats([]);
      showSnackbar('All saved chats cleared', 'success');
    }
    handleHistoryClose();
  };

  const exportChat = () => {
    const chatData = {
      title: 'Property Assistant Chat Export',
      date: new Date().toISOString(),
      messages: messages.filter(msg => msg.type !== 'typing'),
      settings: activeFilters
    };

    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `property-chat-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showSnackbar('Chat exported successfully', 'success');
    handleChatMenuClose();
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const renderProperties = (data) => {
    const { properties: filteredProperties, total, showMore } = data || {};
    
    if (!filteredProperties || filteredProperties.length === 0) {
      return null;
    }

    return (
      <Box mt={2}>
        {filteredProperties.map((property, index) => (
          <PropertyCard key={index}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  {property.images && property.images.length > 0 ? (
                    <CardMedia
                      component="img"
                      height="140"
                      image={property.images[0]}
                      alt={property.title}
                      sx={{ borderRadius: 1 }}
                    />
                  ) : (
                    <Box sx={{ height: 140, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography color="text.secondary">No Image</Typography>
                    </Box>
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    {property.title}
                    {property.rating && (
                      <Box component="span" sx={{ ml: 1, display: 'inline-flex', alignItems: 'center' }}>
                        <StarIcon fontSize="small" sx={{ color: '#ffc107' }} />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>
                          {property.rating.toFixed(1)}
                        </Typography>
                      </Box>
                    )}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <LocationIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {property.city}, {property.country}
                    </Typography>
                    <Typography variant="body2" color="primary" sx={{ ml: 'auto', fontWeight: 'bold' }}>
                      ₹{property.price_per_night}/night
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1} mb={1} flexWrap="wrap">
                    <Chip icon={<BedIcon />} label={`${property.bedrooms} Bed`} size="small" />
                    <Chip icon={<BathIcon />} label={`${property.bathrooms} Bath`} size="small" />
                    <Chip icon={<GuestIcon />} label={`${property.guests_allowed} Guests`} size="small" />
                    {property.type && (
                      <Chip label={property.type} size="small" variant="outlined" />
                    )}
                  </Box>
                  <Box mb={1}>
                    {Object.entries(facilityLabels).map(([key, label]) => {
                      if (property[key] === true) {
                        return (
                          <Tooltip key={key} title={label}>
                            <Chip
                              icon={facilityIcons[key]}
                              size="small"
                              variant="outlined"
                              sx={{ m: 0.5 }}
                            />
                          </Tooltip>
                        );
                      }
                      return null;
                    })}
                  </Box>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center">
                      <Avatar src={property.host?.profile_photo} sx={{ width: 24, height: 24, mr: 1 }}>
                        {property.host?.host_name?.[0]}
                      </Avatar>
                      <Typography variant="caption">
                        Hosted by {property.host?.host_name}
                        {property.host?.verified_status && (
                          <VerifiedIcon fontSize="small" color="primary" sx={{ ml: 0.5, fontSize: 14 }} />
                        )}
                        {property.host?.superhost && (
                          <HotIcon fontSize="small" color="error" sx={{ ml: 0.5, fontSize: 14 }} />
                        )}
                      </Typography>
                    </Box>
                    {property.instant_book && (
                      <Chip label="Instant Book" size="small" color="success" />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </PropertyCard>
        ))}
        
        {showMore && (
          <Box textAlign="center" mt={2}>
            <Button
              variant="contained"
              onClick={handleShowMore}
              startIcon={<ExpandMoreIcon />}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
              }}
            >
              Show More Properties ({total - filteredProperties.length} remaining)
            </Button>
          </Box>
        )}
      </Box>
    );
  };

  const renderHosts = (hosts) => {
    return (
      <Box mt={2}>
        <Paper sx={{ p: 2, background: '#f8f9ff' }}>
          <Typography variant="h6" gutterBottom>
            All Hosts ({hosts.length})
          </Typography>
          <List>
            {hosts.slice(0, 10).map((host, index) => (
              <React.Fragment key={host.id || index}>
                <ListItem 
                  button
                  onClick={() => {
                    setInputText(`properties hosted by ${host.name}`);
                    setTimeout(() => handleSendMessage(), 100);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#667eea' }}>
                      {host.name[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={host.name}
                    secondary={`${host.propertyCount} properties`}
                  />
                </ListItem>
                {index < hosts.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
          {hosts.length > 10 && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
              ... and {hosts.length - 10} more hosts
            </Typography>
          )}
        </Paper>
      </Box>
    );
  };

  const renderMessageContent = (message) => {
    switch (message.type) {
      case 'typing':
        return (
          <BotMessage>
            <TypingDots>
              <span></span>
              <span></span>
              <span></span>
            </TypingDots>
          </BotMessage>
        );
      
      case 'properties':
        return (
          <BotMessage>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
              {message.text}
            </Typography>
            {renderProperties(message.data)}
          </BotMessage>
        );
      
      case 'hosts':
        return (
          <BotMessage>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
              {message.text}
            </Typography>
            {renderHosts(message.data)}
          </BotMessage>
        );
      
      case 'host':
        return (
          <BotMessage>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line', mb: 2 }}>
              {message.text}
            </Typography>
            {message.data?.properties && renderProperties({ properties: message.data.properties })}
          </BotMessage>
        );
      
      default:
        return message.isBot ? (
          <BotMessage>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {message.text}
            </Typography>
          </BotMessage>
        ) : (
          <UserMessage>
            <Typography variant="body1">{message.text}</Typography>
          </UserMessage>
        );
    }
  };

  // Render Filter Panel
  const renderFilterPanel = () => (
    <FilterPanel open={showFilters}>
      <Box sx={{ p: 2, borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterIcon /> Filters
        </Typography>
        <IconButton onClick={() => setShowFilters(false)} size="small">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {/* City Filter */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationIcon fontSize="small" /> City
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Select City</InputLabel>
            <Select
              value={activeFilters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              label="Select City"
            >
              <MenuItem value="">All Cities</MenuItem>
              {allCities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </FilterSection>

        {/* Price Range Filter */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PriceIcon fontSize="small" /> Price Range (₹)
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={[activeFilters.minPrice, activeFilters.maxPrice]}
              onChange={(e, newValue) => {
                handleFilterChange('minPrice', newValue[0]);
                handleFilterChange('maxPrice', newValue[1]);
              }}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">₹{activeFilters.minPrice}</Typography>
              <Typography variant="caption">₹{activeFilters.maxPrice}</Typography>
            </Box>
          </Box>
        </FilterSection>

        {/* Bedrooms, Bathrooms, Guests */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <BedIcon fontSize="small" /> Rooms & Guests
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Bedrooms"
                type="number"
                value={activeFilters.bedrooms}
                onChange={(e) => handleFilterChange('bedrooms', parseInt(e.target.value) || 0)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Bathrooms"
                type="number"
                value={activeFilters.bathrooms}
                onChange={(e) => handleFilterChange('bathrooms', parseInt(e.target.value) || 0)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                label="Guests"
                type="number"
                value={activeFilters.guests}
                onChange={(e) => handleFilterChange('guests', parseInt(e.target.value) || 0)}
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
          </Grid>
        </FilterSection>

        {/* Property Type */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HomeIcon fontSize="small" /> Property Type
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {propertyTypes.map((type) => (
              <FacilityChip
                key={type.value}
                icon={type.icon}
                label={type.label}
                size="small"
                active={activeFilters.propertyType === type.value}
                onClick={() => handleFilterChange('propertyType', 
                  activeFilters.propertyType === type.value ? '' : type.value
                )}
              />
            ))}
          </Box>
        </FilterSection>

        {/* Facilities */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TuneIcon fontSize="small" /> Facilities
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, maxHeight: '200px', overflowY: 'auto' }}>
            {allFacilities.slice(0, 20).map((facility) => (
              <FacilityChip
                key={facility.id}
                icon={facility.icon}
                label={facility.label}
                size="small"
                active={activeFilters.facilities.includes(facility.id)}
                onClick={() => handleFacilityToggle(facility.id)}
              />
            ))}
          </Box>
        </FilterSection>

        {/* Special Features */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon fontSize="small" /> Special Features
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={activeFilters.instantBook}
                  onChange={(e) => handleFilterChange('instantBook', e.target.checked)}
                />
              }
              label="Instant Book"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={activeFilters.superhost}
                  onChange={(e) => handleFilterChange('superhost', e.target.checked)}
                />
              }
              label="Superhost Only"
            />
          </FormGroup>
        </FilterSection>

        {/* Rating */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon fontSize="small" /> Minimum Rating
          </Typography>
          <Box sx={{ px: 2 }}>
            <Slider
              value={activeFilters.rating}
              onChange={(e, newValue) => handleFilterChange('rating', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={5}
              step={0.5}
              marks={[
                { value: 0, label: '0' },
                { value: 2.5, label: '2.5' },
                { value: 5, label: '5' },
              ]}
            />
          </Box>
        </FilterSection>

        {/* Host Name */}
        <FilterSection>
          <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonIcon fontSize="small" /> Host Name
          </Typography>
          <TextField
            fullWidth
            size="small"
            placeholder="Search host..."
            value={activeFilters.hostName}
            onChange={(e) => handleFilterChange('hostName', e.target.value)}
          />
        </FilterSection>
      </Box>

      {/* Filter Actions */}
      <Box sx={{ p: 2, borderTop: '1px solid #ddd', display: 'flex', gap: 2 }}>
        <Button
          fullWidth
          variant="outlined"
          onClick={clearAllFilters}
          startIcon={<ClearIcon />}
        >
          Clear All
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={applyFilters}
          startIcon={<CheckCircleIcon />}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Apply Filters
        </Button>
      </Box>
    </FilterPanel>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, position: 'relative' }}>
      {/* History Button */}
      <Fab
        color="primary"
        onClick={handleHistoryOpen}
        sx={{
          position: 'fixed',
          top: 80,
          right: 20,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #43A047 0%, #1B5E20 100%)',
            transform: 'scale(1.1)',
          },
        }}
      >
        <HistoryIcon />
      </Fab>

      {/* Rules Button */}
      <RulesButton
        color="primary"
        onClick={() => setShowRulesDialog(true)}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <DescriptionIcon />
      </RulesButton>

      {/* Chat Menu Button */}
      <Fab
        color="primary"
        onClick={handleChatMenuOpen}
        sx={{
          position: 'fixed',
          top: 140,
          right: 20,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #2196F3 0%, #0D47A1 100%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(135deg, #1E88E5 0%, #1565C0 100%)',
            transform: 'scale(1.1)',
          },
        }}
      >
        <MoreVertIcon />
      </Fab>

      
      <Box sx={{ position: 'relative' }}>
        {/* Filter Toggle Button */}
        <FilterToggleButton
          onClick={() => setShowFilters(!showFilters)}
          sx={{
            position: 'absolute',
            right: showFilters ? '350px' : 0,
            top: 0,
            zIndex: 101,
            transition: 'right 0.3s ease',
          }}
        >
          {showFilters ? <KeyboardArrowDownIcon /> : <FilterIcon />}
        </FilterToggleButton>

        {/* Chat Container */}
        <ChatContainer>
          <ChatHeader>
            <Avatar sx={{ bgcolor: '#764ba2' }}>
              <BotIcon />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h6" fontWeight="bold">
                Property Assistant
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Ask me about properties with all functionalities
              </Typography>
            </Box>
            <Badge badgeContent={properties.length} color="primary">
              <HomeIcon />
            </Badge>
          </ChatHeader>

          <MessagesContainer>
            {messages.map((message) => (
              <MessageBubble key={message.id} isbot={message.isBot.toString()}>
                {message.isBot && message.type !== 'typing' && (
                  <Avatar sx={{ bgcolor: '#764ba2', width: 32, height: 32 }}>
                    <BotIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
                
                {renderMessageContent(message)}
                
                {!message.isBot && (
                  <Avatar sx={{ bgcolor: '#667eea', width: 32, height: 32 }}>
                    <PersonIcon sx={{ fontSize: 18 }} />
                  </Avatar>
                )}
              </MessageBubble>
            ))}
            
            {/* Active Filters Display */}
            {(activeFilters.city || activeFilters.facilities.length > 0 || activeFilters.minPrice > 0 || activeFilters.maxPrice < 10000) && (
              <Box mt={2} mb={1}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Active Filters:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {activeFilters.city && (
                    <Chip label={`City: ${activeFilters.city}`} size="small" onDelete={() => handleFilterChange('city', '')} />
                  )}
                  {activeFilters.minPrice > 0 && (
                    <Chip label={`Min: ₹${activeFilters.minPrice}`} size="small" onDelete={() => handleFilterChange('minPrice', 0)} />
                  )}
                  {activeFilters.maxPrice < 10000 && (
                    <Chip label={`Max: ₹${activeFilters.maxPrice}`} size="small" onDelete={() => handleFilterChange('maxPrice', 10000)} />
                  )}
                  {activeFilters.facilities.map(facility => (
                    <Chip 
                      key={facility}
                      label={facilityLabels[facility] || facility}
                      size="small"
                      onDelete={() => handleFacilityToggle(facility)}
                    />
                  ))}
                </Box>
              </Box>
            )}
            
            {/* Enhanced Suggestions */}
            <Collapse in={!isProcessing}>
              <Box mt={2} mb={1}>
                <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                  Try these queries:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {suggestions.map((suggestion, index) => (
                    <SuggestionChip
                      key={index}
                      label={suggestion.text}
                      size="small"
                      variant="outlined"
                      icon={suggestion.icon}
                      onClick={() => handleSuggestionClick(suggestion)}
                    />
                  ))}
                </Box>
              </Box>
            </Collapse>
            
            <div ref={messagesEndRef} />
          </MessagesContainer>

          <InputContainer>
            <TextField
              fullWidth
              placeholder="Ask about properties... (e.g., 'Show 2 properties in Delhi', 'Under ₹1000', 'Host Swati properties', 'TV + AC + Long Stay')"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={3}
              variant="outlined"
              size="small"
              disabled={isProcessing}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isProcessing}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
                '&.Mui-disabled': {
                  background: '#e0e0e0',
                },
              }}
            >
              {isProcessing ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
            </IconButton>
          </InputContainer>
        </ChatContainer>

        {/* Filter Panel */}
        {renderFilterPanel()}
      </Box>

      {/* Chat Menu Popover */}
      <Popover
        open={Boolean(chatMenuAnchorEl)}
        anchorEl={chatMenuAnchorEl}
        onClose={handleChatMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            mt: 1,
            minWidth: '200px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }
        }}
      >
        <List dense>
          <ListItem 
            button 
            onClick={saveCurrentChat}
            sx={{ borderRadius: '8px', mx: 1, mt: 0.5 }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#4CAF50', width: 30, height: 30 }}>
                <SaveIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Save Chat" secondary="Save current conversation" />
          </ListItem>
          
          <Divider sx={{ my: 1 }} />
          
          <ListItem 
            button 
            onClick={exportChat}
            sx={{ borderRadius: '8px', mx: 1 }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#FF9800', width: 30, height: 30 }}>
                <HistoryIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Export Chat" secondary="Download as JSON" />
          </ListItem>
          
          <Divider sx={{ my: 1 }} />
          
          <ListItem 
            button 
            onClick={clearCurrentChat}
            sx={{ borderRadius: '8px', mx: 1, color: 'error.main' }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: '#f44336', width: 30, height: 30 }}>
                <DeleteIcon fontSize="small" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Clear Chat" secondary="Delete current conversation" />
          </ListItem>
        </List>
      </Popover>

      {/* Chat History Popover */}
      <Popover
        open={Boolean(historyAnchorEl)}
        anchorEl={historyAnchorEl}
        onClose={handleHistoryClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            borderRadius: '12px',
            mt: 1,
            width: '350px',
            maxHeight: '500px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
          }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <HistoryIcon /> Saved Chats
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {savedChats.length} saved conversation(s)
          </Typography>
        </Box>
        
        <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
          {savedChats.length === 0 ? (
            <Box sx={{ p: 4, textAlign: 'center' }}>
              <HistoryIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
              <Typography color="text.secondary">
                No saved chats yet
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Use "Save Chat" to save conversations
              </Typography>
            </Box>
          ) : (
            <List dense>
              {savedChats.map((chat) => (
                <ListItem 
                  key={chat.id}
                  button 
                  onClick={() => loadChat(chat)}
                  sx={{ 
                    borderRadius: '8px', 
                    mx: 1, 
                    my: 0.5,
                    border: '1px solid rgba(0,0,0,0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(102, 126, 234, 0.05)',
                      borderColor: 'rgba(102, 126, 234, 0.2)',
                    }
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: '#667eea', width: 36, height: 36 }}>
                      <HistoryIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText 
                    primary={
                      <Typography variant="subtitle2" noWrap>
                        {chat.name}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography variant="caption" display="block">
                          {new Date(chat.timestamp).toLocaleDateString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {chat.messageCount} messages
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => deleteChat(chat.id, e)}
                    sx={{ color: 'error.main' }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
        
        {savedChats.length > 0 && (
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={clearAllSavedChats}
              startIcon={<DeleteIcon />}
            >
              Clear All Saved Chats
            </Button>
          </Box>
        )}
      </Popover>

      {/* Save Chat Dialog */}
      <Dialog
        open={showSaveDialog}
        onClose={() => setShowSaveDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
            border: '2px solid #4CAF50',
            maxWidth: '500px',
            width: '90%',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          margin: '-20px -20px 20px -20px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <SaveIcon />
          <Typography variant="h6" fontWeight="bold">
            Save Chat Conversation
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Save your current chat session with {messages.length} messages.
          </Typography>
          
          <TextField
            fullWidth
            label="Chat Name"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
            placeholder="e.g., Goa Property Search"
            sx={{ mt: 2 }}
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Alert severity="info" sx={{ mt: 2, borderRadius: '8px' }}>
            <AlertTitle>Note</AlertTitle>
            Saved chats will be available until you clear your browser data.
          </Alert>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setShowSaveDialog(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={confirmSaveChat}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #43A047 0%, #1B5E20 100%)',
              },
            }}
            disabled={!chatName.trim()}
          >
            Save Chat
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Rules Dialog */}
      <Dialog
        open={showRulesDialog}
        onClose={() => setShowRulesDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
            border: '2px solid #667eea',
            maxWidth: '600px',
            width: '90%',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          margin: '-20px -20px 20px -20px',
          padding: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <DescriptionIcon />
          <Typography variant="h6" fontWeight="bold">
            All Supported Query Types
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ maxHeight: '500px', overflowY: 'auto', pr: 2 }}>
            <Typography variant="h6" gutterBottom color="primary">
              ✅ Fully Functional Queries:
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="1. City + Top Properties" 
                  secondary="'top 2 properties in delhi', 'city mumbai best properties'" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="2. Under ₹1000" 
                  secondary="'properties under 1000', 'cheap properties below ₹1000'" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="3. Between ₹2000-₹3000" 
                  secondary="'properties between 2000 and 3000', '₹2000-3000 properties'" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="4. Host Name Search" 
                  secondary="'properties hosted by swati', 'host ramesh properties', 'show all hosts'" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="5. AND Functionality" 
                  secondary="'TV AC long stay properties', 'properties with wifi and pool and gym'" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="6. Greetings" 
                  secondary="'Hi', 'Hello', 'How are you?'" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="7. Show X Properties" 
                  secondary="'show 2 properties in goa', '3 properties in mumbai', '7 luxury properties'" 
                />
              </ListItem>
            </List>
            
            <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 3 }}>
              🎯 Advanced Filters (Click Filter Icon):
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="• City Filter" 
                  secondary="Select from available cities" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Price Range" 
                  secondary="Set minimum and maximum price" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Bedrooms/Bathrooms/Guests" 
                  secondary="Filter by room count" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Property Type" 
                  secondary="Apartment, Villa, House, Studio, etc." 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Facilities" 
                  secondary="WiFi, AC, Pool, Gym, etc." 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Special Features" 
                  secondary="Instant Book, Superhost Only" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Rating Filter" 
                  secondary="Minimum star rating" 
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="• Host Name Search" 
                  secondary="Search by host name" 
                />
              </ListItem>
            </List>
            
            <Alert severity="info" sx={{ mt: 2, borderRadius: '8px' }}>
              <AlertTitle>Pro Tip</AlertTitle>
              Use the filter panel on the right to apply multiple filters at once!
            </Alert>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3, pt: 2 }}>
          <Button
            variant="contained"
            onClick={() => setShowRulesDialog(false)}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
              },
            }}
          >
            Got it! Start Searching
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Chatbot;