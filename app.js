// PhishGuard - Interactive Cybersecurity Awareness Simulator
// Designed for Campus Outreach & Rural Student Education

let currentLang = 'en';
let currentQuestionIndex = 0;
let userScore = 0;
let answered = false;

const scenarios = [
  {
    id: 1,
    sender: {
      name: "DHBVN Electricity Dept",
      handle: "VD-POWR-INF",
      avatar: "⚡"
    },
    messageEn: "URGENT: Dear consumer, your electricity power connection will be DISCONNECTED tonight at 9:30 PM because your previous month bill was not updated. Please call our power officer immediately at 98765-43210 or update bill: <span class='fake-link'>http://bijli-bill-update-online.xyz/pay</span>",
    messageHi: "अति आवश्यक: प्रिय उपभोक्ता, आपकी बिजली का कनेक्शन आज रात 9:30 बजे काट दिया जाएगा क्योंकि आपका पिछला बिल अपडेट नहीं हुआ है। तुरंत हमारे बिजली अधिकारी से 98765-43210 पर संपर्क करें या बिल अपडेट करें: <span class='fake-link'>http://bijli-bill-update-online.xyz/pay</span>",
    isScam: true,
    categoryEn: "Utility / Power Scam",
    categoryHi: "बिजली बिल फ्रॉड",
    redFlagsEn: [
      "Artificial Urgency ('will be DISCONNECTED tonight at 9:30 PM')",
      "Unofficial 10-digit mobile number given as 'official support'",
      "Suspicious unverified domain (.xyz) instead of state electricity board portal (.gov.in or .in)",
      "Official electricity boards NEVER threaten sudden power cuts via SMS without formal physical notice."
    ],
    redFlagsHi: [
      "कृत्रिम जल्दबाज़ी ('आज रात 9:30 बजे बिजली काट दी जाएगी')",
      "आधिकारिक हेल्पलाइन के बजाय 10 अंकों का निजी मोबाइल नंबर",
      "सरकारी पोर्टल (.gov.in) के बजाय फर्जी (.xyz) वेबसाइट लिंक",
      "बिजली विभाग कभी भी अचानक SMS भेजकर तुरंत लाइन काटने की धमकी नहीं देता।"
    ]
  },
  {
    id: 2,
    sender: {
      name: "State Bank of India (YONO)",
      handle: "BZ-SBIINB",
      avatar: "🏦"
    },
    messageEn: "Dear Customer, Your SBI YONO account has been BLOCKED today due to expired PAN & KYC documents. Please click here to immediately update your PAN details and unblock account: <span class='fake-link'>http://sbi-kyc-verify-portal.in/login</span>",
    messageHi: "प्रिय ग्राहक, आपका SBI YONO खाता PAN और KYC दस्तावेज समाप्त होने के कारण ब्लॉक कर दिया गया है। अपना PAN तुरंत अपडेट करने और खाता चालू करने के लिए यहाँ क्लिक करें: <span class='fake-link'>http://sbi-kyc-verify-portal.in/login</span>",
    isScam: true,
    categoryEn: "Banking KYC Scam",
    categoryHi: "बैंक केवाईसी फ्रॉड",
    redFlagsEn: [
      "Banks NEVER send clickable links to update PAN or Aadhaar card.",
      "The domain 'sbi-kyc-verify-portal.in' is fake (Official SBI domain is onlinesbi.sbi).",
      "Fear-inducing message threatening account blockage.",
      "RBI guidelines strictly state that banks will never ask you to update KYC via third-party web forms."
    ],
    redFlagsHi: [
      "बैंक कभी भी PAN या आधार कार्ड अपडेट करने के लिए लिंक SMS में नहीं भेजते।",
      "वेबसाइट 'sbi-kyc-verify-portal.in' फर्जी है (SBI का असली पता onlinesbi.sbi है)।",
      "खाता ब्लॉक होने का डर दिखाकर लोगों को फंसाया जाता है।",
      "RBI के निर्देशानुसार बैंक किसी भी लिंक के जरिए KYC नहीं करवाते।"
    ]
  },
  {
    id: 3,
    sender: {
      name: "Govt Scheme / Viral Group",
      handle: "+91 91234 56789",
      avatar: "📱"
    },
    messageEn: "PM Free Smartphone Yojana 2026: Under the new digital education scheme, all school & college students will get a FREE 5G Smartphone and 1 year free internet! Claim yours before seats run out: <span class='fake-link'>http://pm-free-yojana-claim.online/register</span>",
    messageHi: "प्रधानमंत्री फ्री स्मार्टफोन योजना 2026: नई डिजिटल शिक्षा योजना के तहत सभी स्कूल व कॉलेज छात्रों को फ्री 5G स्मार्टफोन और 1 साल का फ्री इंटरनेट दिया जा रहा है! तुरंत अपना फॉर्म भरें: <span class='fake-link'>http://pm-free-yojana-claim.online/register</span>",
    isScam: true,
    categoryEn: "Fake Govt Welfare Scam",
    categoryHi: "फर्जी सरकारी योजना फ्रॉड",
    redFlagsEn: [
      "All genuine government welfare schemes are hosted ONLY on domains ending in '.gov.in' or '.nic.in'.",
      "This is a phishing lure used to steal Aadhaar numbers, phone numbers, and bank details.",
      "Requires forwarding to 10 WhatsApp groups before claiming (classic viral malware tactic)."
    ],
    redFlagsHi: [
      "सभी असली सरकारी योजनाएं केवल '.gov.in' या '.nic.in' वेबसाइटों पर होती हैं।",
      "यह आधार नंबर, फोन नंबर और बैंक डेटा चुराने के लिए बिछाया गया जाल है।",
      "10 ग्रुप में शेयर करने की शर्त लगाना वायरस और फर्जी वेबसाइटों का आम तरीका है।"
    ]
  },
  {
    id: 4,
    sender: {
      name: "HDFC Bank Alert",
      handle: "AD-HDFCBK",
      avatar: "🛡️"
    },
    messageEn: "₹1,250.00 debited from HDFC Bank A/c xx4582 on 18-Oct-26 at 20:15:32 to Indian Oil Corp via UPI ref 429188219. Bal: ₹14,320. If not done by you, forward this SMS to 1930 immediately or call 1800-202-6161.",
    messageHi: "₹1,250.00 HDFC बैंक खाता xx4582 से 18-Oct-26 20:15:32 को इंडियन ऑयल कॉर्प को UPI द्वारा डेबिट किए गए। शेष: ₹14,320। यदि यह आपने नहीं किया, तो तुरंत 1930 पर SMS भेजें या 1800-202-6161 पर कॉल करें।",
    isScam: false,
    categoryEn: "Legitimate Bank Alert",
    categoryHi: "असली बैंक अलर्ट",
    redFlagsEn: [
      "Legitimate transaction SMS: Contains no suspicious clickable links.",
      "Displays masked account number (xx4582) rather than asking for full account number.",
      "Mentions official national cybercrime helpline (1930) and verified bank toll-free number."
    ],
    redFlagsHi: [
      "यह असली बैंक मैसेज है: इसमें कोई भी संदिग्ध क्लिक करने वाला लिंक नहीं है।",
      "सुरक्षा के लिए केवल खाते के आखिरी अंक (xx4582) दिखाए गए हैं।",
      "राष्ट्रीय साइबर हेल्पलाइन (1930) और बैंक का आधिकारिक टोल-फ्री नंबर दिया गया है।"
    ]
  },
  {
    id: 5,
    sender: {
      name: "HR Priya (Global Careers)",
      handle: "+1 (832) 991-3821",
      avatar: "💼"
    },
    messageEn: "Hello! We have part-time work-from-home vacancies for students. Work only 30 minutes daily on your mobile by liking YouTube videos and rating hotels. Earn ₹2,500 - ₹5,000 daily payout to UPI. Reply 'YES' on WhatsApp or join Telegram: <span class='fake-link'>https://t.me/task_income_official</span>",
    messageHi: "नमस्ते! हमारे पास छात्रों के लिए घर बैठे पार्ट-टाइम काम के अवसर हैं। यूट्यूब वीडियो लाइक करके रोज ₹2,500 से ₹5,000 कमाएं। सीधे आपके बैंक खाते में पैसे। काम शुरू करने के लिए टेलीग्राम पर जुड़ें: <span class='fake-link'>https://t.me/task_income_official</span>",
    isScam: true,
    categoryEn: "Task-Based Part-Time Scam",
    categoryHi: "पार्ट-टाइम टास्क फ्रॉड",
    redFlagsEn: [
      "International caller code (+1 USA) posing as an Indian company recruiter.",
      "Unrealistic income promise (₹5,000/day for liking videos) designed to trap college students.",
      "Shifts the conversation to Telegram where victims are asked for 'prepaid investment tasks' before receiving funds."
    ],
    redFlagsHi: [
      "विदेशी नंबर (+1 अमेरिका) से भारतीय कंपनी का कर्मचारी बनकर संदेश भेजना।",
      "छात्रों को लुभाने के लिए यूट्यूब वीडियो लाइक करने के ₹5,000/दिन देने का असंभव दावा।",
      "बातचीत को टेलीग्राम पर ले जाकर बाद में 'टास्क अनलॉक' करने के नाम पर पैसे ऐंठना।"
    ]
  },
  {
    id: 6,
    sender: {
      name: "Axis Bank OTP Service",
      handle: "VM-AXISBK",
      avatar: "🔒"
    },
    messageEn: "839201 is your One Time Password (OTP) for online payment of ₹399.00 at Flipkart. Valid for 5 minutes. DO NOT share this OTP with anyone, even if caller claims to be from Axis Bank.",
    messageHi: "839201 फ्लिपकार्ट पर ₹399.00 के भुगतान के लिए आपका OTP है। 5 मिनट के लिए वैध। यह OTP किसी के साथ भी साझा न करें, चाहे कॉल करने वाला बैंक का कर्मचारी ही क्यों न कहे।",
    isScam: false,
    categoryEn: "Legitimate Security OTP",
    categoryHi: "असली सुरक्षा OTP",
    redFlagsEn: [
      "Contains a direct security warning explicitly instructing the user NEVER to share the OTP.",
      "Clear merchant name (Flipkart) and exact transaction amount (₹399.00).",
      "No external hyperlink asking you to re-enter your password."
    ],
    redFlagsHi: [
      "साफ चेतावनी दी गई है कि OTP किसी को भी न बताएं।",
      "मर्चेंट का नाम (Flipkart) और भुगतान की सही राशि (₹399.00) स्पष्ट है।",
      "इसमें पासवर्ड या कार्ड विवरण मांगने वाला कोई बाहरी लिंक नहीं है।"
    ]
  }
];

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
  setupTabs();
  renderScenario();
  setupUrlInspector();
  setupLanguageToggle();
});

// Tab Switching
function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      tab.classList.add('active');
      const targetId = tab.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });
}

// Render Scenario
function renderScenario() {
  answered = false;
  const current = scenarios[currentQuestionIndex];
  
  document.getElementById('current-question-num').innerText = currentQuestionIndex + 1;
  document.getElementById('total-questions-num').innerText = scenarios.length;
  document.getElementById('score-display').innerText = userScore;
  
  // Category & Sender
  document.getElementById('scenario-category').innerText = currentLang === 'hi' ? current.categoryHi : current.categoryEn;
  document.getElementById('sender-avatar').innerText = current.sender.avatar;
  document.getElementById('sender-name').innerText = current.sender.name;
  document.getElementById('sender-handle').innerText = current.sender.handle;
  
  // Message content
  document.getElementById('message-content').innerHTML = currentLang === 'hi' ? current.messageHi : current.messageEn;
  
  // Reset Feedback & Buttons
  const feedbackBox = document.getElementById('feedback-box');
  feedbackBox.className = 'feedback-box';
  feedbackBox.style.display = 'none';
  
  document.getElementById('btn-legit').style.display = 'inline-flex';
  document.getElementById('btn-scam').style.display = 'inline-flex';
  document.getElementById('btn-next').style.display = 'none';
}

// Handle Answer
function handleAnswer(userChoiceIsScam) {
  if (answered) return;
  answered = true;
  
  const current = scenarios[currentQuestionIndex];
  const isCorrect = userChoiceIsScam === current.isScam;
  
  if (isCorrect) {
    userScore += 10;
    document.getElementById('score-display').innerText = userScore;
  }
  
  const feedbackBox = document.getElementById('feedback-box');
  const feedbackTitle = document.getElementById('feedback-title');
  const feedbackDesc = document.getElementById('feedback-desc');
  const redFlagsList = document.getElementById('red-flags-list');
  
  redFlagsList.innerHTML = '';
  
  if (isCorrect) {
    feedbackBox.className = 'feedback-box correct';
    feedbackTitle.innerHTML = currentLang === 'hi' ? '✅ बिल्कुल सही पहचान!' : '✅ Correct Assessment!';
    feedbackDesc.innerHTML = currentLang === 'hi' 
      ? `आपने सही निर्णय लिया। यह संदेश <strong>${current.isScam ? 'धोखाधड़ी (SCAM)' : 'असली (LEGITIMATE)'}</strong> है।`
      : `Great job! You correctly identified this message as <strong>${current.isScam ? 'A SCAM / PHISHING ATTEMPT' : 'LEGITIMATE'}</strong>.`;
  } else {
    feedbackBox.className = 'feedback-box incorrect';
    feedbackTitle.innerHTML = currentLang === 'hi' ? '⚠️ गलत जवाब! ध्यान से देखें' : '⚠️ Incorrect! Watch Out';
    feedbackDesc.innerHTML = currentLang === 'hi'
      ? `यह संदेश वास्तव में <strong>${current.isScam ? 'धोखाधड़ी (SCAM)' : 'असली (LEGITIMATE)'}</strong> था।`
      : `Be careful! This message was actually <strong>${current.isScam ? 'A DANGEROUS SCAM' : 'A LEGITIMATE TRANSACTION'}</strong>.`;
  }
  
  // Red Flags
  const flags = currentLang === 'hi' ? current.redFlagsHi : current.redFlagsEn;
  flags.forEach(flag => {
    const li = document.createElement('li');
    li.textContent = flag;
    redFlagsList.appendChild(li);
  });
  
  feedbackBox.style.display = 'block';
  document.getElementById('btn-legit').style.display = 'none';
  document.getElementById('btn-scam').style.display = 'none';
  document.getElementById('btn-next').style.display = 'inline-flex';
}

function nextQuestion() {
  if (currentQuestionIndex < scenarios.length - 1) {
    currentQuestionIndex++;
    renderScenario();
  } else {
    showQuizCompletion();
  }
}

function showQuizCompletion() {
  const quizWrapper = document.getElementById('quiz-container');
  quizWrapper.innerHTML = `
    <div style="text-align: center; padding: 3rem 1.5rem;">
      <div style="font-size: 3.5rem; margin-bottom: 1rem;">🏆</div>
      <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem; color: var(--accent-emerald);">
        ${currentLang === 'hi' ? 'अभियान पूर्ण हुआ!' : 'Training Challenge Completed!'}
      </h2>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; font-size: 1.1rem;">
        ${currentLang === 'hi' 
          ? `आपका कुल स्कोर: <strong>${userScore} / ${scenarios.length * 10}</strong> अंक` 
          : `Your Final Cybersecurity Readiness Score: <strong>${userScore} / ${scenarios.length * 10}</strong> points`}
      </p>
      <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid var(--accent-emerald); border-radius: 12px; padding: 1.5rem; max-width: 500px; margin: 0 auto 2rem;">
        <h4 style="color: var(--accent-emerald); margin-bottom: 0.5rem;">
          ${currentLang === 'hi' ? 'ग्रामीण साइबर सुरक्षा प्रतिज्ञा' : 'Campus Outreach Security Pledge'}
        </h4>
        <p style="font-size: 0.9rem; color: #cbd5e1;">
          ${currentLang === 'hi'
            ? '1. कभी भी अनजान लिंक पर क्लिक नहीं करेंगे。<br>2. अपना OTP या UPI PIN किसी को नहीं बताएंगे。<br>3. संदिग्ध कॉल पर 1930 पर तुरंत सूचना देंगे।'
            : '1. Never click on unverified SMS or WhatsApp links.<br>2. Never share OTP or enter UPI PIN to receive money.<br>3. Report scams immediately to national cyber helpline 1930.'}
        </p>
      </div>
      <button class="btn btn-next" onclick="resetQuiz()" style="margin: 0 auto;">
        ${currentLang === 'hi' ? 'दोबारा खेलें' : 'Restart Challenge'}
      </button>
    </div>
  `;
}

function resetQuiz() {
  currentQuestionIndex = 0;
  userScore = 0;
  location.reload();
}

// URL Inspector Logic
function setupUrlInspector() {
  const checkBtn = document.getElementById('inspect-url-btn');
  const urlInput = document.getElementById('url-input-field');
  const samplePills = document.querySelectorAll('.sample-url-pill');
  
  samplePills.forEach(pill => {
    pill.addEventListener('click', () => {
      urlInput.value = pill.getAttribute('data-url');
      inspectUrl(urlInput.value);
    });
  });
  
  checkBtn.addEventListener('click', () => {
    inspectUrl(urlInput.value);
  });
  
  urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      inspectUrl(urlInput.value);
    }
  });
}

function inspectUrl(input) {
  if (!input || input.trim() === '') {
    alert(currentLang === 'hi' ? 'कृपया जांचने के लिए एक लिंक दर्ज करें।' : 'Please enter a URL to inspect.');
    return;
  }
  
  let raw = input.trim();
  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    raw = 'http://' + raw;
  }
  
  let parsed;
  try {
    parsed = new URL(raw);
  } catch (err) {
    alert(currentLang === 'hi' ? 'अमान्य URL प्रारूप।' : 'Invalid URL format.');
    return;
  }
  
  const hostname = parsed.hostname.toLowerCase();
  const protocol = parsed.protocol;
  const path = parsed.pathname.toLowerCase();
  
  const suspiciousTlds = ['.xyz', '.top', '.tk', '.ml', '.cf', '.gq', '.buzz', '.work', '.click', '.club', '.online', '.site', '.link'];
  const bankingKeywords = ['sbi', 'hdfc', 'icici', 'axis', 'pnb', 'bank', 'yono', 'paytm', 'phonepe', 'gpay'];
  const scamKeywords = ['free', 'yojana', 'bonus', 'kyc', 'pan', 'blocked', 'gift', 'lucky', 'claim', 'winner', 'apk'];
  
  const redFlags = [];
  let riskScore = 0; // 0: safe, 1: warning, 2: danger
  
  // 1. Protocol Check
  if (protocol === 'http:') {
    redFlags.push(currentLang === 'hi' ? "असुरक्षित कनेक्शन (HTTP): डेटा एन्क्रिप्टेड नहीं है।" : "Insecure Protocol (HTTP): Connection is not encrypted.");
    riskScore += 1;
  }
  
  // 2. IP Address check
  const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIp) {
    redFlags.push(currentLang === 'hi' ? "IP पता होस्टनेम: असली वेबसाइट्स डोमेन नाम का प्रयोग करती हैं।" : "Direct IP Address Hostname: Legitimate companies use official domain names.");
    riskScore += 2;
  }
  
  // 3. Suspicious TLD check
  const matchedTld = suspiciousTlds.find(tld => hostname.endsWith(tld));
  if (matchedTld) {
    redFlags.push(currentLang === 'hi' ? `संदिग्ध फ्री/सस्ता TLD एक्सटेंशन: ${matchedTld}` : `Suspicious/High-Risk TLD detected: ${matchedTld}`);
    riskScore += 1;
  }
  
  // 4. Target Brand Spoofing
  bankingKeywords.forEach(brand => {
    if (hostname.includes(brand) && !hostname.endsWith('.sbi') && !hostname.endsWith('hdfcbank.com') && !hostname.endsWith('icicibank.com') && !hostname.endsWith('axisbank.com') && !hostname.endsWith('pnbindia.in')) {
      redFlags.push(currentLang === 'hi' ? `फर्जी बैंक नाम का उपयोग: '${brand}' डोमेन में पाया गया।` : `Brand Spoofing: Suspiciously uses bank name '${brand}' in unverified domain.`);
      riskScore += 2;
    }
  });
  
  // 5. Scam Keywords in Path or Subdomain
  scamKeywords.forEach(kw => {
    if (hostname.includes(kw) || path.includes(kw)) {
      redFlags.push(currentLang === 'hi' ? `संदिग्ध चारा कीवर्ड: '${kw}' पाया गया।` : `High-risk lure keyword detected: '${kw}'.`);
      riskScore += 1;
    }
  });
  
  // 6. Excessive subdomains / Hyphens
  const parts = hostname.split('.');
  if (parts.length > 3) {
    redFlags.push(currentLang === 'hi' ? "अत्यधिक सबडोमेन: असली पहचान छुपाने की कोशिश।" : "Excessive subdomains: Common technique used to mask real destination.");
    riskScore += 1;
  }
  
  const resultCard = document.getElementById('analysis-result');
  const verdictBanner = document.getElementById('verdict-banner');
  const verdictText = document.getElementById('verdict-text');
  
  document.getElementById('res-domain').innerText = hostname;
  document.getElementById('res-protocol').innerText = protocol.replace(':', '').toUpperCase();
  document.getElementById('res-flags-count').innerText = redFlags.length;
  
  const flagsContainer = document.getElementById('res-details-list');
  flagsContainer.innerHTML = '';
  
  if (riskScore >= 2 || redFlags.length >= 2) {
    verdictBanner.className = 'verdict-banner verdict-danger';
    verdictText.innerHTML = currentLang === 'hi' ? '🚨 चेतावनी: यह लिंक खतरनाक/फिशिंग हो सकता है!' : '🚨 DANGER: Highly Suspicious / Potential Phishing Link!';
  } else if (riskScore === 1 || redFlags.length === 1) {
    verdictBanner.className = 'verdict-banner verdict-warning';
    verdictText.innerHTML = currentLang === 'hi' ? '⚠️ सावधानी: इस लिंक में कुछ असामान्य तत्व हैं।' : '⚠️ CAUTION: Unverified or Potential Risk Elements Found.';
  } else {
    verdictBanner.className = 'verdict-banner verdict-safe';
    verdictText.innerHTML = currentLang === 'hi' ? '✅ सुरक्षित प्रतीत होता है (सामान्य डोमेन संरचना)' : '✅ Appears Clean (Standard Domain Architecture)';
  }
  
  if (redFlags.length === 0) {
    const li = document.createElement('li');
    li.textContent = currentLang === 'hi' ? 'कोई ज्ञात जोखिम पैटर्न नहीं मिला। फिर भी संवेदनशील जानकारी कभी अनजान साइटों पर न डालें।' : 'No obvious phishing indicators found. Always verify site certificates manually.';
    flagsContainer.appendChild(li);
  } else {
    redFlags.forEach(flag => {
      const li = document.createElement('li');
      li.textContent = flag;
      flagsContainer.appendChild(li);
    });
  }
  
  resultCard.style.display = 'block';
}

// Bilingual Toggle
function setupLanguageToggle() {
  const langBtn = document.getElementById('lang-toggle-btn');
  langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    langBtn.innerHTML = currentLang === 'en' ? '🌐 Language: <strong>English</strong>' : '🌐 भाषा: <strong>हिंदी</strong>';
    
    // Update texts
    updateLanguageTexts();
    renderScenario();
  });
}

function updateLanguageTexts() {
  const isHi = currentLang === 'hi';
  document.getElementById('hero-title').innerText = isHi 
    ? 'ग्रामीण एवं छात्र साइबर जागरूकता सिम्युलेटर' 
    : 'Interactive Phishing & Rural Scam Awareness Simulator';
  
  document.getElementById('hero-desc').innerText = isHi
    ? 'नकली संदेश, बैंक फ्रॉड, बिजली बिल घोटाले और फर्जी सरकारी योजनाओं को पहचानने की व्यावहारिक ट्रेनिंग।'
    : 'Empowering students and rural communities to spot digital traps, fake bank KYC messages, and social engineering attacks.';
    
  document.getElementById('tab-label-sim').innerText = isHi ? 'चैलेंज सिम्युलेटर' : 'Scam Simulator';
  document.getElementById('tab-label-url').innerText = isHi ? 'लिंक / URL चेकर' : 'URL Inspector';
  document.getElementById('tab-label-guide').innerText = isHi ? 'रेड फ्लैग गाइड' : 'Red Flags Guide';
  document.getElementById('tab-label-help').innerText = isHi ? 'आपातकालीन हेल्पलाइन' : 'Emergency Help';
}
