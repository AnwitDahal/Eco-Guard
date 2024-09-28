import { keyfeatureimg1 } from "./Images";
import { LayoutDashboard, Monitor, Contact, Settings,Waves,Cloud,Wind,Thermometer,Droplet } from 'lucide-react';

export const KeyFeaturesPart=[
    {
        image:keyfeatureimg1,
        title:'Real-Time Monitoring',
        text:'Track air quality levels in your city with up-to-the-minute data.'
    },
    {
        image:keyfeatureimg1,
        title:"Health Alerts",
        text:'Receive instant alerts when air quality deteriorates in your area.'
    },
    {
        image:keyfeatureimg1,
        title:'Health Recommendations',
        text:'Get personalized advice on how to protect your health based on current air conditions.'
    }
]


export const footerLinks = [
    "Contact Us",
    "Privacy Policy",
    "Terms & Conditions"
  ];

export const iconsMap = {
    "layout-dashboard": LayoutDashboard,
    "monitor": Monitor,
    "contact": Contact,
    "settings": Settings,

};

export const userOptionsList = [
    {
        Icon: "layout-dashboard",
        title: "Dashboard",
        path: "/user"
    },
    {
        Icon: "monitor",
        title: "Air Monitor",
        path: "/user/air-monitor", 
    },
    {
        Icon: "contact",
        title: "Alert",
        path: "/user/alert",
    },
    {
        Icon: "settings",
        title: "Setting",
        path: "/user/setting",
    },
];

export const UserDashboardIcons = {
    "waves": Waves,
    "cloud": Cloud,
    "wind": Wind,
    "thermometer": Thermometer,
    "droplet": Droplet,
};

export const weatherData=[
    {
        icon:"waves",
        title:"Air Quality Index (AQI)",
        value:"29|Excellent",
        status:"The current air quality is good for outdoor exercise",
        width:"555px"
    },    
    {
        icon:"cloud",
        title:"PM2.5",
        value:"5.11μ/m3",
        status:"Good",
        width:"440px"
    },    
    {
        icon:"wind",
        title:"Wind",
        value:"3.4km/h",
        status:"lorem",
        width:"229px",
    },    
    {
        icon:"thermometer",
        title:"Temperature",
        value:"21",
        status:"ipsum",
        width:"229px",
    },    
    {
        icon:"droplet",
        title:"Humidity",
        value:"29%",
        status:"Wetter environment  ",
        width:"229px",
    },    
]

export const predictedData=[
    {
        day:'Friday',
        aqi:"20"
    },
    {
        day:'Friday',
        aqi:"20"
    },
    {
        day:'Friday',
        aqi:"20"
    },
    {
        day:'Friday',
        aqi:"20"
    },
    {
        day:'Friday',
        aqi:"20"
    },
    {
        day:'Friday',
        aqi:"20"
    },
    {
        day:'Friday',
        aqi:"20"
    },
]