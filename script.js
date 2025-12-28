/* ========================================
   Love Sri Lanka - Travel Website
   JavaScript
   ======================================== */

// ==========================================
// DATA - Destinations
// ==========================================
const DESTINATIONS = [
  {
    id: '1',
    title: 'Sigiriya Rock Fortress',
    location: 'Central Province',
    description: 'An ancient rock fortress located in the northern Matale District near the town of Dambulla.',
    imageUrl: 'https://images.unsplash.com/photo-1620619767323-b95a89183081?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Heritage'
  },
  {
    id: '2',
    title: 'Nine Arch Bridge',
    location: 'Ella',
    description: 'The Nine Arch Bridge in Ella is on the Demodara loop and spans 91 meters at a height of 24m.',
    imageUrl: 'https://images.unsplash.com/photo-1599929285038-f860e334df7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Scenic'
  },
  {
    id: '3',
    title: 'Mirissa Beach',
    location: 'Southern Province',
    description: 'Mirissa is one of the main beach destinations in southern Sri Lanka, famous for surfing and whales.',
    imageUrl: 'https://images.unsplash.com/photo-1533758488827-16d7a4cb2d9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Beaches'
  },
  {
    id: '4',
    title: 'Temple of the Tooth',
    location: 'Kandy',
    description: 'Sri Dalada Maligawa or the Temple of the Sacred Tooth Relic is a Buddhist temple in Kandy.',
    imageUrl: 'https://images.unsplash.com/photo-1625816960840-3d3a12365e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Culture'
  },
  {
    id: '5',
    title: 'Yala National Park',
    location: 'Yala',
    description: 'Yala National Park is the most visited and second largest national park in Sri Lanka.',
    imageUrl: 'https://images.unsplash.com/photo-1520626388433-8c88610d484b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Wildlife'
  },
  {
    id: '6',
    title: 'Galle Fort',
    location: 'Galle',
    description: 'Galle Fort, in the Bay of Galle on the southwest coast of Sri Lanka, was built first in 1588 by the Portuguese.',
    imageUrl: 'https://images.unsplash.com/photo-1558902507-6c2e3646545c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Heritage'
  }
];

// ==========================================
// ICONS (SVG strings)
// ==========================================
const ICONS = {
  globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
  x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
  search: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
  mapPin: `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
  arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
  camera: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>`,
  coffee: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>`,
  waves: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
  mountain: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/><path d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"/></svg>`,
  facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
  instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>`,
  twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`,
  youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>`,
  sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`,
  loader: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="m16.2 7.8 2.9-2.9"/><path d="M18 12h4"/><path d="m16.2 16.2 2.9 2.9"/><path d="M12 18v4"/><path d="m4.9 19.1 2.9-2.9"/><path d="M2 12h4"/><path d="m4.9 4.9 2.9 2.9"/></svg>`
};

// ==========================================
// DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  renderDestinations();
  initMobileMenu();
  initChat();
  updateCopyrightYear();
});

// ==========================================
// LOADER
// ==========================================
function initLoader() {
  const loader = document.getElementById('loader');

  if (loader) {
    // Hide loader after a delay to show the animation
    setTimeout(() => {
      loader.classList.add('hidden');

      // Remove from DOM after transition completes to prevent blocking interaction
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500); // Match CSS transition duration
    }, 2500); // 2.5 seconds loading time
  }
}

// ==========================================
// NAVBAR - Scroll Effect
// ==========================================
function initNavbar() {
  const navbar = document.getElementById('navbar');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on load
}

// ==========================================
// MOBILE MENU
// ==========================================
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  toggleBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    toggleBtn.innerHTML = isOpen ? ICONS.x : ICONS.menu;
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggleBtn.innerHTML = ICONS.menu;
    });
  });
}

// ==========================================
// RENDER DESTINATIONS
// ==========================================
function renderDestinations() {
  const grid = document.getElementById('destinations-grid');

  DESTINATIONS.forEach(dest => {
    const card = document.createElement('div');
    card.className = 'destination-card';
    card.innerHTML = `
      <img src="${dest.imageUrl}" alt="${dest.title}" referrerpolicy="no-referrer">
      <div class="destination-card-overlay"></div>
      <div class="destination-card-content">
        <span class="destination-badge">${dest.category}</span>
        <h3 class="destination-title">${dest.title}</h3>
        <div class="destination-location">
          ${ICONS.mapPin}
          ${dest.location}
        </div>
        <p class="destination-desc">${dest.description}</p>
        <div class="destination-cta">
          Discover ${ICONS.arrowRight}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ==========================================
// CHAT ASSISTANT
// ==========================================
let chatMessages = [
  {
    id: 'welcome',
    text: "Ayubowan! 🙏 Welcome to C & K Tours! I'm your virtual Sri Lanka guide. Ask me about itineraries, visa rules, or the best places to eat kottu!",
    sender: 'ai'
  }
];
let isChatOpen = false;
let isLoading = false;

function initChat() {
  const toggleBtn = document.getElementById('chat-toggle');
  const chatWindow = document.getElementById('chat-window');
  const closeBtn = document.getElementById('chat-close');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');

  // Toggle chat
  toggleBtn.addEventListener('click', () => {
    isChatOpen = true;
    chatWindow.classList.add('open');
    toggleBtn.classList.add('hidden');
    chatInput.focus();
    scrollChatToBottom();
  });

  // Close chat
  closeBtn.addEventListener('click', () => {
    isChatOpen = false;
    chatWindow.classList.remove('open');
    toggleBtn.classList.remove('hidden');
  });

  // Send message
  sendBtn.addEventListener('click', handleSendMessage);

  // Enter key
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Render initial messages
  renderChatMessages();
}

function handleSendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();

  if (!text || isLoading) return;

  // Add user message
  const userMsg = {
    id: Date.now().toString(),
    text: text,
    sender: 'user'
  };
  chatMessages.push(userMsg);
  input.value = '';

  renderChatMessages();
  scrollChatToBottom();

  // Show loading & get AI response
  isLoading = true;
  updateSendButtonState();
  showLoading();

  getTravelAdvice(text).then(response => {
    hideLoading();
    const aiMsg = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'ai'
    };
    chatMessages.push(aiMsg);
    isLoading = false;
    updateSendButtonState();
    renderChatMessages();
    scrollChatToBottom();
  });
}

function renderChatMessages() {
  const container = document.getElementById('chat-messages');
  container.innerHTML = chatMessages.map(msg => `
    <div class="chat-message ${msg.sender}">
      <div class="chat-bubble">
        ${formatMessage(msg.text)}
      </div>
    </div>
  `).join('');
}

function formatMessage(text) {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function showLoading() {
  const container = document.getElementById('chat-messages');
  const loadingEl = document.createElement('div');
  loadingEl.id = 'chat-loading';
  loadingEl.className = 'chat-message ai';
  loadingEl.innerHTML = `
    <div class="chat-bubble chat-loading">
      ${ICONS.loader}
      Thinking...
    </div>
  `;
  container.appendChild(loadingEl);
  scrollChatToBottom();
}

function hideLoading() {
  const loadingEl = document.getElementById('chat-loading');
  if (loadingEl) {
    loadingEl.remove();
  }
}

function scrollChatToBottom() {
  const container = document.getElementById('chat-messages');
  container.scrollTop = container.scrollHeight;
}

function updateSendButtonState() {
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  sendBtn.disabled = isLoading || !input.value.trim();
}

// ==========================================
// AI SERVICE (Simulated Responses)
// ==========================================
async function getTravelAdvice(query) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const lowerQuery = query.toLowerCase();

  // Pre-defined responses based on keywords
  if (lowerQuery.includes('sigiriya') || lowerQuery.includes('rock')) {
    return "🏔️ **Sigiriya Rock Fortress** is an absolute must-visit!\n\nThis 5th-century citadel rises 200 meters above the surrounding jungle. You'll see:\n\n• Ancient frescoes of the 'Cloud Maidens'\n• The famous Lion's Paw entrance\n• Stunning panoramic views\n\n**Best time to visit:** Early morning (6:30 AM) to avoid crowds and heat. Bring water and wear comfortable shoes! 🌴";
  }

  if (lowerQuery.includes('visa') || lowerQuery.includes('entry')) {
    return "🛂 **Visa Information for Sri Lanka:**\n\nMost visitors need an ETA (Electronic Travel Authorization):\n\n• Apply online at www.eta.gov.lk\n• Tourist visa: 30 days (extendable to 6 months)\n• Cost: ~$35 USD\n• Processing: Usually instant to 24 hours\n\n**Tip:** Apply at least 48 hours before travel. Your passport should be valid for 6+ months! ✈️";
  }

  if (lowerQuery.includes('kottu') || lowerQuery.includes('food') || lowerQuery.includes('eat')) {
    return "🍽️ **Sri Lankan Food is AMAZING!**\n\nMust-try dishes:\n\n• **Kottu Roti** - Chopped flatbread stir-fried with vegetables & meat\n• **Hoppers** - Bowl-shaped crispy pancakes (try egg hoppers!)\n• **Rice & Curry** - The national dish with 5-7 different curries\n• **String Hoppers** - Steamed rice noodle nests\n\n**Best street food:** Head to Galle Face Green in Colombo at sunset! 🌅";
  }

  if (lowerQuery.includes('beach') || lowerQuery.includes('mirissa') || lowerQuery.includes('surf')) {
    return "🏖️ **Sri Lanka's Beaches are Paradise!**\n\n**Top picks:**\n\n• **Mirissa** - Whale watching + beach bars\n• **Unawatuna** - Calm waters, great for families\n• **Arugam Bay** - World-class surfing\n• **Tangalle** - Secluded and pristine\n\n**Best season:** December to April for the South/West coast, April to September for the East coast! 🌊";
  }

  if (lowerQuery.includes('ella') || lowerQuery.includes('train') || lowerQuery.includes('hill')) {
    return "🚂 **The Ella Train Journey is MAGICAL!**\n\nThe Kandy to Ella train ride is one of the most scenic in the world:\n\n• **Duration:** ~7 hours\n• **Cost:** ~$2-5 USD\n• **Book:** 2nd class reserved seats in advance\n\n**In Ella:**\n• Hike to Little Adam's Peak (sunrise!)\n• Nine Arch Bridge\n• Tea factory visits\n\n**Tip:** Sit on the right side for the best views! 🫖";
  }

  if (lowerQuery.includes('elephant') || lowerQuery.includes('safari') || lowerQuery.includes('wildlife')) {
    return "🐘 **Wildlife Safari Adventures!**\n\n**Best national parks:**\n\n• **Yala** - Highest leopard density in the world!\n• **Udawalawe** - Guaranteed elephant sightings\n• **Minneriya** - 'The Gathering' (Aug-Oct) with 300+ elephants\n• **Wilpattu** - Least crowded, beautiful lakes\n\n**Tip:** Book ethical jeep safaris and go during early morning or late afternoon! 🐆";
  }

  if (lowerQuery.includes('weather') || lowerQuery.includes('when') || lowerQuery.includes('best time')) {
    return "☀️ **Best Time to Visit Sri Lanka:**\n\nSri Lanka has two monsoon seasons:\n\n**West/South Coast & Hill Country:**\n• Best: December - April\n\n**East Coast:**\n• Best: April - September\n\n**Year-round:** Cultural Triangle (Sigiriya, Polonnaruwa)\n\n**Pro tip:** Sri Lanka is beautiful year-round - there's always a sunny coast somewhere! 🌴";
  }

  // Default response
  return "🌴 That's a great question about Sri Lanka!\n\nThe island offers incredible diversity - from ancient temples and tea plantations to pristine beaches and wildlife safaris.\n\nFeel free to ask me about:\n• 🏔️ Destinations (Sigiriya, Ella, Mirissa...)\n• 🍽️ Food & Cuisine\n• 🛂 Visa & Travel Tips\n• 🐘 Wildlife Safaris\n• 🚂 Scenic Train Journeys\n\nWhat would you like to explore? 🙏";
}

// ==========================================
// UTILITY
// ==========================================
function updateCopyrightYear() {
  const yearEl = document.getElementById('copyright-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
