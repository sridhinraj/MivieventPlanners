/**
 * Mivi Events — AI Guide (Rule-Based, Zero Cost, No API)
 * A smart chatbot that knows everything about Mivi Events
 * and guides visitors through the website.
 */

(function () {
  'use strict';

  // ─── Knowledge Base ───────────────────────────────────────────────────────
  const KNOWLEDGE = {
    greeting: [
      "Welcome to Mivi Events! ✨ I'm your personal guide. How can I help you plan something unforgettable today?",
      "Hello! I'm Mivi's AI guide. Whether you're planning a dream wedding, a corporate event, or an intimate celebration — I'm here to help!",
      "Welcome! I'm here to help you explore everything Mivi Events offers. What brings you here today?"
    ],
    services: {
      weddings: {
        title: "Weddings & Celebrations",
        desc: "We create meaningful celebrations with a distinctive visual identity — from traditional Kerala wedding rituals to destination beach ceremonies in Kovalam and royal ballroom receptions in Kochi.",
        inclusions: ["Complete Wedding & Reception Stage Design", "Bride & Groom Grand Entrance Concept", "Haldi, Mehendi & Sangeet Thematic Setups", "Floral Architecture & Ambient Lighting", "Guest Hospitality & Flow Coordination"],
        link: "services.html#weddings",
        cta: "contact.html?service=weddings"
      },
      planning: {
        title: "Event Planning & Management",
        desc: "From initial concept to event-day coordination, we curate a cohesive experience. Our project managers oversee schedules, vendor alignments, logistics, and timing so you experience zero stress.",
        inclusions: ["Master Timeline & Event Run-Sheet Creation", "Venue Selection & Layout Planning", "Catering & Banquet Styling Management", "Third-Party Vendor Sourcing & Supervision", "Dedicated On-Ground Directors & Team"],
        link: "services.html#planning",
        cta: "contact.html?service=planning"
      },
      production: {
        title: "Stage & Event Production",
        desc: "Build an awe-inspiring event environment through coordinated visual production. We supply custom staging, architectural trussing, high-definition LED displays, and specialized lighting.",
        inclusions: ["Custom 3D Stage Modeling & Fabrication", "Intelligent Moving-Head & Mood Lighting", "Professional Line-Array Audio Engineering", "Curved & High-Resolution LED Screen Setups", "Cold Pyro, Fog & Special Effects Coordination"],
        link: "services.html#production",
        cta: "contact.html?service=production"
      },
      soirees: {
        title: "Intimate Soirées & Private Celebrations",
        desc: "Celebrate life's milestones with style — boutique experiences for birthdays, anniversaries, engagement dinners, and luxury garden gatherings.",
        inclusions: ["Thematic Table & Lounge Styling", "Personalized Neon & Acrylic Monogram Signs", "Artisan Floral & Balloon Installations", "Acoustic Artist & Entertainment Sourcing", "Specialized Cake & Dessert Presentation Staging"],
        link: "services.html#soirees",
        cta: "contact.html?service=soiree"
      },
      corporate: {
        title: "Corporate & Inaugural Events",
        desc: "Represent your brand with authority. We manage retail showroom inaugurations, corporate meetings, product debuts, and executive conferences with flawless protocol.",
        inclusions: ["Ceremonial Ribbon-Cutting & Lamp Lighting Protocol", "VIP Stage, Podium & Media Backdrop Walls", "Audio-Visual & Keynote Presentation Setups", "Crowd Control & Executive Hospitality", "Corporate Brand Activation Zones"],
        link: "services.html#corporate",
        cta: "contact.html?service=corporate"
      },
      media: {
        title: "Photography & Media Coverage",
        desc: "Preserve the true atmosphere, emotions, and intricate decor of your event through cinematic photography and film. We coordinate with elite cinematographers.",
        inclusions: ["High-Resolution Candid & Traditional Photography", "Cinematic 4K Event Films & Highlights", "Drone Aerial Photography (Where Permitted)", "Same-Day Teaser Reels for Social Sharing", "Heirloom Leather Photobook Coordination"],
        link: "services.html#media",
        cta: "contact.html?service=media"
      }
    },
    contact: {
      address: "1st Floor, Ezra Building, 3Star Nagar, Pavaratty, Thrissur, Kerala — 680507",
      phone: "+91 88772 29985",
      whatsapp: "https://wa.me/918877229985",
      instagram: "https://www.instagram.com/mivi_events/",
      maps: "https://maps.app.goo.gl/RhcYst6ELiK3JzxS9",
      google_biz: "https://share.google/CDROy0aCBa5HQ1tiP",
      rating: "5.0 Google Business Rating"
    },
    about: "Mivi Events is a boutique event and media brand based in Thrissur, Kerala. Founded with a desire to elevate celebrations into deeply immersive visual stories, we believe true luxury is found in the harmony of light, space, floral artistry, sound, and hospitality."
  };

  // ─── Intent Patterns ─────────────────────────────────────────────────────
  const INTENTS = [
    {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings', 'start'],
      handler: () => randomFrom(KNOWLEDGE.greeting)
    },
    {
      patterns: ['wedding', 'bride', 'groom', 'reception', 'marriage', 'nuptial', 'haldi', 'mehendi', 'sangeet', 'mandap'],
      handler: () => serviceReply('weddings')
    },
    {
      patterns: ['planning', 'management', 'coordinator', 'vendor', 'timeline', 'schedule', 'organize', 'organise', 'logistics'],
      handler: () => serviceReply('planning')
    },
    {
      patterns: ['stage', 'production', 'lighting', 'led', 'audio', 'sound', 'pyro', 'effect', 'truss', 'screen'],
      handler: () => serviceReply('production')
    },
    {
      patterns: ['birthday', 'anniversary', 'intimate', 'soiree', 'private', 'party', 'gathering', 'engagement', 'garden', 'balloon', 'neon'],
      handler: () => serviceReply('soirees')
    },
    {
      patterns: ['corporate', 'inauguration', 'ribbon', 'launch', 'product', 'conference', 'seminar', 'brand', 'business event', 'opening'],
      handler: () => serviceReply('corporate')
    },
    {
      patterns: ['photo', 'photography', 'video', 'film', 'cinematic', 'drone', 'reel', 'media', 'coverage', 'camera'],
      handler: () => serviceReply('media')
    },
    {
      patterns: ['contact', 'reach', 'call', 'phone', 'number', 'email', 'talk', 'speak', 'connect', 'get in touch', 'message'],
      handler: () => contactReply()
    },
    {
      patterns: ['whatsapp', 'wa'],
      handler: () => `You can WhatsApp us directly at <strong>+91 88772 29985</strong> for quick consultation.<br><br><a href="${KNOWLEDGE.contact.whatsapp}" target="_blank" class="mivi-ai-link">💬 Open WhatsApp Chat →</a>`
    },
    {
      patterns: ['address', 'location', 'studio', 'where', 'directions', 'map', 'visit', 'pavaratty', 'thrissur'],
      handler: () => locationReply()
    },
    {
      patterns: ['instagram', 'social', '@mivi', 'insta', 'follow'],
      handler: () => `Follow us on Instagram at <a href="${KNOWLEDGE.contact.instagram}" target="_blank" class="mivi-ai-link">@mivi_events</a> to see our latest setups, behind-the-scenes, and real event stories! 📸`
    },
    {
      patterns: ['portfolio', 'work', 'example', 'showcase', 'gallery', 'past event', 'previous'],
      handler: () => `Explore our curated event portfolio to see real projects across weddings, productions, and soirées.<br><br><a href="portfolio.html" class="mivi-ai-link">🖼️ View Portfolio →</a>`
    },
    {
      patterns: ['about', 'who are you', 'who is mivi', 'story', 'history', 'origin', 'founded', 'team'],
      handler: () => `${KNOWLEDGE.about}<br><br><a href="about.html" class="mivi-ai-link">Learn more about us →</a>`
    },
    {
      patterns: ['services', 'what do you do', 'offerings', 'what you offer', 'what can you do'],
      handler: () => allServicesReply()
    },
    {
      patterns: ['price', 'cost', 'rate', 'quote', 'package', 'budget', 'how much', 'fee', 'pricing'],
      handler: () => `Pricing at Mivi Events is bespoke — every event is uniquely scoped based on your vision, guest count, venue, and requirements. We'll craft a custom proposal just for you after a brief consultation.<br><br><a href="contact.html" class="mivi-ai-link">📋 Book Free Consultation →</a>`
    },
    {
      patterns: ['faq', 'question', 'doubt', 'query', 'help', 'support'],
      handler: () => `I'm happy to help! You can also visit our FAQ page for common questions, or ask me anything directly.<br><br><a href="faq.html" class="mivi-ai-link">📄 Visit FAQ Page →</a>`
    },
    {
      patterns: ['book', 'booking', 'appointment', 'consultation', 'enquiry', 'inquiry', 'hire', 'available'],
      handler: () => `To book a consultation or make an enquiry, fill out our quick form — our team responds within 24 hours!<br><br><a href="contact.html" class="mivi-ai-link">📋 Book Consultation →</a><br><a href="${KNOWLEDGE.contact.whatsapp}" target="_blank" class="mivi-ai-link">💬 WhatsApp Us Directly →</a>`
    },
    {
      patterns: ['rating', 'review', 'google', 'reputation'],
      handler: () => `Mivi Events holds a proud <strong>⭐ 5.0 rating on Google Business</strong>! You can read our client reviews here:<br><br><a href="${KNOWLEDGE.contact.google_biz}" target="_blank" class="mivi-ai-link">🌟 View Google Reviews →</a>`
    },
    {
      patterns: ['kerala', 'kochi', 'guruvayoor', 'kovalam', 'destination', 'travel', 'location we serve', 'area'],
      handler: () => `We serve events across all of Kerala and beyond — from traditional Guruvayoor celebrations to destination beach ceremonies in Kovalam and grand receptions in Kochi. We also travel for destination weddings!`
    },
    {
      patterns: ['thank', 'thanks', 'great', 'perfect', 'amazing', 'wonderful', 'awesome'],
      handler: () => `You're very welcome! ✨ It's our pleasure to help. Is there anything else you'd like to know about Mivi Events?`
    },
    {
      patterns: ['bye', 'goodbye', 'see you', 'exit', 'close'],
      handler: () => `Thank you for visiting Mivi Events! We look forward to creating something truly unforgettable with you. 🌟 Feel free to chat anytime!`
    }
  ];

  // ─── Reply Helpers ────────────────────────────────────────────────────────
  function randomFrom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function serviceReply(key) {
    const s = KNOWLEDGE.services[key];
    return `<strong>${s.title}</strong><br><br>${s.desc}<br><br>
<em>What's included:</em><br>
${s.inclusions.map(i => `✦ ${i}`).join('<br>')}
<br><br>
<a href="${s.link}" class="mivi-ai-link">Explore This Service →</a>&nbsp;&nbsp;
<a href="${s.cta}" class="mivi-ai-link">Make an Enquiry →</a>`;
  }

  function allServicesReply() {
    return `Here's what we offer at Mivi Events:<br><br>
🌸 <strong>Weddings & Celebrations</strong><br>
📋 <strong>Event Planning & Management</strong><br>
🎭 <strong>Stage & Event Production</strong><br>
🥂 <strong>Intimate Soirées & Socials</strong><br>
🏢 <strong>Corporate & Inaugural Events</strong><br>
📸 <strong>Photography & Media Coverage</strong><br><br>
Which one interests you? Or <a href="services.html" class="mivi-ai-link">view all services →</a>`;
  }

  function contactReply() {
    const c = KNOWLEDGE.contact;
    return `Here's how to reach us:<br><br>
📍 <strong>Studio:</strong> ${c.address}<br>
📞 <strong>Phone:</strong> <a href="tel:+918877229985" class="mivi-ai-link">${c.phone}</a><br>
💬 <strong>WhatsApp:</strong> <a href="${c.whatsapp}" target="_blank" class="mivi-ai-link">Message us on WhatsApp →</a><br>
📸 <strong>Instagram:</strong> <a href="${c.instagram}" target="_blank" class="mivi-ai-link">@mivi_events</a><br><br>
<a href="contact.html" class="mivi-ai-link">📋 Or fill out our consultation form →</a>`;
  }

  function locationReply() {
    const c = KNOWLEDGE.contact;
    return `Our studio is located at:<br><br>
<strong>${c.address}</strong><br><br>
Come experience our physical portfolio, floral swatches, fabrics, and 3D stage maquettes in person!<br><br>
<a href="${c.maps}" target="_blank" class="mivi-ai-link">📍 Open in Google Maps →</a>`;
  }

  function processMessage(text) {
    const lower = text.toLowerCase().trim();
    if (!lower) return null;

    for (const intent of INTENTS) {
      if (intent.patterns.some(p => lower.includes(p))) {
        return intent.handler();
      }
    }

    // Fallback
    return `I didn't quite catch that, but I'm here to help! You can ask me about:<br><br>
🌸 Our <strong>wedding & event services</strong><br>
📍 Our <strong>studio location</strong><br>
📋 How to <strong>book a consultation</strong><br>
📸 Our <strong>portfolio</strong> and reviews<br><br>
Or <a href="contact.html" class="mivi-ai-link">contact our team directly →</a>`;
  }

  // ─── Suggested Questions ──────────────────────────────────────────────────
  const SUGGESTIONS = [
    "What services do you offer?",
    "Tell me about weddings",
    "How can I contact you?",
    "What's your studio location?",
    "Tell me about stage production",
    "Do you do corporate events?",
    "Show me your portfolio",
    "How much does it cost?"
  ];

  // ─── UI Builder ───────────────────────────────────────────────────────────
  function buildUI() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      /* Mivi AI Guide Styles */
      #mivi-ai-btn {
        position: fixed;
        bottom: 28px;
        right: 28px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f7ecb5 0%, #d4af37 50%, #997510 100%);
        border: none;
        cursor: pointer;
        z-index: 9999;
        box-shadow: 0 4px 24px rgba(212,175,55,0.5), 0 2px 8px rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s cubic-bezier(.22,.61,.36,1), box-shadow 0.3s;
        font-size: 26px;
        line-height: 1;
        outline: none;
      }
      #mivi-ai-btn:hover {
        transform: scale(1.12);
        box-shadow: 0 6px 32px rgba(212,175,55,0.7), 0 2px 12px rgba(0,0,0,0.7);
      }
      #mivi-ai-btn .mivi-ai-btn-icon { transition: opacity 0.2s; }
      #mivi-ai-btn .mivi-ai-close { display: none; font-size: 22px; }
      #mivi-ai-btn.open .mivi-ai-btn-icon { display: none; }
      #mivi-ai-btn.open .mivi-ai-close { display: block; }

      #mivi-ai-pulse {
        position: fixed;
        bottom: 78px;
        right: 36px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #d4af37;
        z-index: 9999;
        animation: mivi-pulse 2s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes mivi-pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.6); opacity: 0.5; }
      }

      #mivi-ai-panel {
        position: fixed;
        bottom: 102px;
        right: 28px;
        width: 360px;
        max-width: calc(100vw - 40px);
        height: 540px;
        max-height: calc(100vh - 130px);
        background: #0d0506;
        border: 1px solid rgba(212,175,55,0.35);
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.9), 0 0 0 1px rgba(212,175,55,0.1);
        z-index: 9998;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: scale(0.85) translateY(20px);
        transform-origin: bottom right;
        opacity: 0;
        pointer-events: none;
        transition: transform 0.35s cubic-bezier(.22,.61,.36,1), opacity 0.3s;
      }
      #mivi-ai-panel.open {
        transform: scale(1) translateY(0);
        opacity: 1;
        pointer-events: all;
      }

      .mivi-ai-header {
        background: linear-gradient(135deg, rgba(26,8,16,1) 0%, rgba(46,9,21,1) 100%);
        border-bottom: 1px solid rgba(212,175,55,0.25);
        padding: 16px 18px;
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }
      .mivi-ai-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f7ecb5 0%, #d4af37 50%, #997510 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        flex-shrink: 0;
      }
      .mivi-ai-header-info { flex: 1; min-width: 0; }
      .mivi-ai-header-name {
        font-family: 'Gilroy', 'Inter', sans-serif;
        font-weight: 700;
        font-size: 15px;
        color: #f4f2ef;
        letter-spacing: 0.03em;
      }
      .mivi-ai-header-status {
        font-size: 11px;
        color: #d4af37;
        display: flex;
        align-items: center;
        gap: 5px;
        margin-top: 2px;
      }
      .mivi-ai-status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #4ade80;
        display: inline-block;
        animation: mivi-blink 2s ease-in-out infinite;
      }
      @keyframes mivi-blink {
        0%, 100% { opacity: 1; } 50% { opacity: 0.4; }
      }

      .mivi-ai-messages {
        flex: 1;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scrollbar-width: thin;
        scrollbar-color: rgba(212,175,55,0.3) transparent;
      }
      .mivi-ai-messages::-webkit-scrollbar { width: 4px; }
      .mivi-ai-messages::-webkit-scrollbar-track { background: transparent; }
      .mivi-ai-messages::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 4px; }

      .mivi-ai-bubble {
        max-width: 88%;
        padding: 10px 14px;
        border-radius: 14px;
        font-size: 13.5px;
        line-height: 1.6;
        animation: mivi-bubble-in 0.3s cubic-bezier(.22,.61,.36,1);
        word-break: break-word;
      }
      @keyframes mivi-bubble-in {
        from { opacity: 0; transform: translateY(8px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      .mivi-ai-bubble.bot {
        background: rgba(212,175,55,0.1);
        border: 1px solid rgba(212,175,55,0.2);
        color: rgba(244,242,239,0.92);
        align-self: flex-start;
        border-bottom-left-radius: 4px;
      }
      .mivi-ai-bubble.user {
        background: linear-gradient(135deg, #2e0915 0%, #3d0c1c 100%);
        border: 1px solid rgba(212,175,55,0.3);
        color: #f4f2ef;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
        text-align: right;
      }
      .mivi-ai-link {
        color: #d4af37 !important;
        text-decoration: none;
        border-bottom: 1px solid rgba(212,175,55,0.4);
        transition: color 0.2s, border-color 0.2s;
        font-size: 13px;
      }
      .mivi-ai-link:hover {
        color: #f7ecb5 !important;
        border-color: #f7ecb5;
      }

      .mivi-ai-typing {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 10px 14px;
        background: rgba(212,175,55,0.08);
        border: 1px solid rgba(212,175,55,0.15);
        border-radius: 14px;
        border-bottom-left-radius: 4px;
        align-self: flex-start;
        animation: mivi-bubble-in 0.3s ease;
      }
      .mivi-ai-typing span {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: #d4af37;
        animation: mivi-dot 1.4s ease-in-out infinite;
        display: inline-block;
      }
      .mivi-ai-typing span:nth-child(2) { animation-delay: 0.2s; }
      .mivi-ai-typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes mivi-dot {
        0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
        40% { transform: scale(1); opacity: 1; }
      }

      .mivi-ai-suggestions {
        padding: 8px 14px;
        display: flex;
        gap: 7px;
        overflow-x: auto;
        flex-shrink: 0;
        border-top: 1px solid rgba(212,175,55,0.1);
        scrollbar-width: none;
      }
      .mivi-ai-suggestions::-webkit-scrollbar { display: none; }
      .mivi-ai-suggestion-btn {
        background: rgba(212,175,55,0.1);
        border: 1px solid rgba(212,175,55,0.3);
        color: rgba(244,242,239,0.85);
        border-radius: 20px;
        padding: 5px 12px;
        font-size: 11.5px;
        white-space: nowrap;
        cursor: pointer;
        transition: background 0.2s, color 0.2s;
        font-family: 'Gilroy', 'Inter', sans-serif;
        outline: none;
      }
      .mivi-ai-suggestion-btn:hover {
        background: rgba(212,175,55,0.25);
        color: #f7ecb5;
      }

      .mivi-ai-input-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 14px;
        border-top: 1px solid rgba(212,175,55,0.2);
        background: rgba(13,5,6,0.95);
        flex-shrink: 0;
      }
      .mivi-ai-input {
        flex: 1;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(212,175,55,0.25);
        border-radius: 24px;
        padding: 9px 15px;
        color: #f4f2ef;
        font-size: 13.5px;
        outline: none;
        font-family: 'Gilroy', 'Inter', sans-serif;
        transition: border-color 0.2s;
      }
      .mivi-ai-input:focus { border-color: rgba(212,175,55,0.6); }
      .mivi-ai-input::placeholder { color: rgba(244,242,239,0.35); }
      .mivi-ai-send-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37 0%, #997510 100%);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: transform 0.2s, box-shadow 0.2s;
        outline: none;
      }
      .mivi-ai-send-btn:hover {
        transform: scale(1.08);
        box-shadow: 0 2px 12px rgba(212,175,55,0.5);
      }
      .mivi-ai-send-btn svg { width: 16px; height: 16px; fill: #000; }

      /* Floating WhatsApp Button */
      #mivi-wa-float {
        position: fixed;
        bottom: 28px;
        left: 28px;
        height: 50px;
        padding: 0 18px 0 14px;
        border-radius: 999px;
        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: #fff;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Gilroy', 'Inter', sans-serif;
        font-weight: 700;
        font-size: 13.5px;
        z-index: 9999;
        box-shadow: 0 6px 24px rgba(37, 211, 102, 0.4), 0 2px 8px rgba(0,0,0,0.6);
        transition: transform 0.3s cubic-bezier(.22,.61,.36,1), box-shadow 0.3s;
      }
      #mivi-wa-float:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 10px 30px rgba(37, 211, 102, 0.6), 0 4px 12px rgba(0,0,0,0.7);
        color: #fff;
      }
      #mivi-wa-float svg {
        width: 24px;
        height: 24px;
        fill: #fff;
        flex-shrink: 0;
      }

      @media (max-width: 480px) {
        #mivi-ai-panel {
          bottom: 90px;
          right: 12px;
          left: 12px;
          width: auto;
          border-radius: 16px;
        }
        #mivi-ai-btn { bottom: 20px; right: 20px; }
        #mivi-ai-pulse { bottom: 70px; right: 28px; }
        #mivi-wa-float { bottom: 20px; left: 16px; padding: 0 14px; font-size: 12.5px; }
      }
    `;
    document.head.appendChild(style);

    // Pulse dot
    const pulse = document.createElement('div');
    pulse.id = 'mivi-ai-pulse';
    document.body.appendChild(pulse);

    // Toggle button
    const btn = document.createElement('button');
    btn.id = 'mivi-ai-btn';
    btn.setAttribute('aria-label', 'Open Mivi AI Guide');
    btn.innerHTML = `<span class="mivi-ai-btn-icon">✨</span><span class="mivi-ai-close">✕</span>`;
    document.body.appendChild(btn);

    // Floating WhatsApp Quick Connect Button
    const waFloat = document.createElement('a');
    waFloat.id = 'mivi-wa-float';
    waFloat.href = 'https://wa.me/918877229985?text=' + encodeURIComponent('*Hi Mivi Events* — I would like to inquire about wedding/event planning.');
    waFloat.target = '_blank';
    waFloat.rel = 'noopener';
    waFloat.setAttribute('aria-label', 'Chat on WhatsApp');
    waFloat.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
      <span>WhatsApp</span>
    `;
    document.body.appendChild(waFloat);

    // Panel
    const panel = document.createElement('div');
    panel.id = 'mivi-ai-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Mivi Events AI Guide');
    panel.innerHTML = `
      <div class="mivi-ai-header">
        <div class="mivi-ai-avatar">✨</div>
        <div class="mivi-ai-header-info">
          <div class="mivi-ai-header-name">Mivi AI Guide</div>
          <div class="mivi-ai-header-status">
            <span class="mivi-ai-status-dot"></span> Online — always here to help
          </div>
        </div>
      </div>
      <div class="mivi-ai-messages" id="mivi-ai-messages"></div>
      <div class="mivi-ai-suggestions" id="mivi-ai-suggestions"></div>
      <div class="mivi-ai-input-row">
        <input class="mivi-ai-input" id="mivi-ai-input" type="text" placeholder="Ask me anything…" autocomplete="off" maxlength="300" />
        <button class="mivi-ai-send-btn" id="mivi-ai-send" aria-label="Send">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(panel);

    return { btn, panel };
  }

  // ─── Chat Logic ───────────────────────────────────────────────────────────
  function appendMessage(type, html) {
    const container = document.getElementById('mivi-ai-messages');
    const bubble = document.createElement('div');
    bubble.className = `mivi-ai-bubble ${type}`;
    bubble.innerHTML = html;
    container.appendChild(bubble);
    container.scrollTop = container.scrollHeight;
    return bubble;
  }

  function showTyping() {
    const container = document.getElementById('mivi-ai-messages');
    const typing = document.createElement('div');
    typing.className = 'mivi-ai-typing';
    typing.innerHTML = '<span></span><span></span><span></span>';
    typing.id = 'mivi-ai-typing-indicator';
    container.appendChild(typing);
    container.scrollTop = container.scrollHeight;
    return typing;
  }

  function botReply(html, delay = 700) {
    const typing = showTyping();
    setTimeout(() => {
      typing.remove();
      appendMessage('bot', html);
    }, delay);
  }

  function sendMessage(text) {
    if (!text.trim()) return;
    appendMessage('user', text);
    document.getElementById('mivi-ai-input').value = '';
    const response = processMessage(text);
    botReply(response || "Let me connect you with our team for this. <a href='contact.html' class='mivi-ai-link'>Contact Us →</a>");
    updateSuggestions();
  }

  function updateSuggestions() {
    const container = document.getElementById('mivi-ai-suggestions');
    // Show 4 random suggestions
    const shuffled = [...SUGGESTIONS].sort(() => Math.random() - 0.5).slice(0, 4);
    container.innerHTML = shuffled.map(s =>
      `<button class="mivi-ai-suggestion-btn">${s}</button>`
    ).join('');
    container.querySelectorAll('.mivi-ai-suggestion-btn').forEach(b => {
      b.addEventListener('click', () => sendMessage(b.textContent));
    });
  }

  // ─── Init ─────────────────────────────────────────────────────────────────
  function init() {
    const { btn, panel } = buildUI();
    let isOpen = false;

    btn.addEventListener('click', () => {
      isOpen = !isOpen;
      btn.classList.toggle('open', isOpen);
      panel.classList.toggle('open', isOpen);
      btn.setAttribute('aria-label', isOpen ? 'Close Mivi AI Guide' : 'Open Mivi AI Guide');

      // Hide pulse after first open
      const pulse = document.getElementById('mivi-ai-pulse');
      if (isOpen && pulse) pulse.style.display = 'none';

      if (isOpen && document.getElementById('mivi-ai-messages').children.length === 0) {
        // Welcome message
        setTimeout(() => {
          botReply(randomFrom(KNOWLEDGE.greeting), 400);
          updateSuggestions();
        }, 100);
      }

      if (isOpen) {
        setTimeout(() => document.getElementById('mivi-ai-input').focus(), 350);
      }
    });

    document.getElementById('mivi-ai-send').addEventListener('click', () => {
      sendMessage(document.getElementById('mivi-ai-input').value);
    });

    document.getElementById('mivi-ai-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(e.target.value);
      }
    });

    updateSuggestions();
  }


  // --- Brand Asset Protection & Right-Click Disabler ---
  document.addEventListener('contextmenu', function(e) {
    // Disable default browser context menu
    e.preventDefault();
  }, false);

  // Disable common inspect shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S)
  document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+I or Cmd+Opt+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+J or Cmd+Opt+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+Shift+C (Element Inspector)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }
    // Ctrl+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
  }, false);

    if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

