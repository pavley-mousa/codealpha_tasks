const root=document.documentElement;
const navbar=document.getElementById("navbar");
const navToggle=document.getElementById("nav-toggle");
const navMenu=document.getElementById("nav-menu");
const navLinks=Array.from(document.querySelectorAll(".nav-link"));
const sections=Array.from(document.querySelectorAll("[data-observe-section]"));
const revealItems=Array.from(document.querySelectorAll(".reveal"));
const progressBar=document.getElementById("scroll-progress");
const backToTop=document.getElementById("back-to-top");
const themeToggle=document.getElementById("theme-toggle");
const languageToggle=document.getElementById("language-toggle");
const settingsToggle=document.getElementById("settings-toggle");
const settingsModal=document.getElementById("settings-modal");
const copyEmailButton=document.getElementById("copy-email");
const copyFeedback=document.getElementById("copy-feedback");
const currentYear=document.getElementById("stat-year");
const prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
const SETTINGS_KEY="pavley-portfolio-settings-v3";

const DEFAULT_SETTINGS={"language":"en","theme":"dark","siteEn":"Pavley Mousa","siteAr":"بافلي موسى","subtitleEn":"Developer Portfolio","subtitleAr":"بورتفوليو مطور برمجيات","logoUrl":"","accent":"#38bdf8","heroBadgeEn":"Computer Science & AI Student","heroBadgeAr":"طالب علوم حاسب وذكاء اصطناعي","heroTitleEn":"I build useful software with","heroTitleAr":"ببني برامج مفيدة باستخدام","heroHighlightEn":"code, curiosity, and consistency.","heroHighlightAr":"الكود، الفضول، والاستمرارية.","heroDescriptionEn":"I’m Pavley Mousa, a Computer Science and Artificial Intelligence student focused on frontend development, C++, software engineering, and web security fundamentals.","heroDescriptionAr":"أنا بافلي موسى، طالب علوم حاسب وذكاء اصطناعي، وبركز على تطوير الواجهات وC++ وهندسة البرمجيات وأساسيات أمان الويب.","aboutTitleEn":"Learning by building real things.","aboutTitleAr":"بتعلم من خلال بناء حاجات حقيقية.","aboutLeadEn":"I use projects to turn programming concepts into working interfaces, tools, and experiments.","aboutLeadAr":"بستخدم المشاريع عشان أحول مفاهيم البرمجة لواجهات وأدوات وتجارب شغالة.","aboutTextEn":"I study Computer Science and Artificial Intelligence and build projects while I learn. My priorities are readable code, responsive design, practical problem solving, and steady improvement.","aboutTextAr":"بدرس علوم الحاسب والذكاء الاصطناعي وببني مشاريع وأنا بتعلم. أهم حاجة عندي كود واضح، تصميم متجاوب، حل عملي للمشاكل، وتطور مستمر.","contactTitleEn":"Let’s build something useful.","contactTitleAr":"يلا نبني حاجة مفيدة.","contactTextEn":"Open to software development opportunities, freelance projects, and technical conversations.","contactTextAr":"متاح لفرص تطوير البرمجيات، المشاريع الحرة، والنقاشات التقنية.","email":"bavlymosa29@gmail.com","locationEn":"Egypt","locationAr":"مصر","linkedin":"https://www.linkedin.com/in/pavley-mousa-715533341","github":"https://github.com/pavley-mousa","whatsapp":"https://wa.me/201556126686","facebook":"https://www.facebook.com/pavley.mousa","instagram":"https://www.instagram.com/pavley.mousa","footerEn":"© 2026 Pavley Mousa","footerAr":"© 2026 بافلي موسى"};
const TRANSLATIONS={"en":{"skip":"Skip to content","navAbout":"About","navSkills":"Skills","navProjects":"Projects","navTraining":"Training","navContact":"Contact","viewProjects":"View projects","getInTouch":"Get in touch","webDevelopment":"Web development","securityFundamentals":"Security fundamentals","scrollExplore":"Scroll to explore","aboutKicker":"01 / ABOUT","aboutCardTitle":"Who I am","statSkills":"Practical skill areas","statProjects":"Featured projects","statJourney":"Current learning journey","skillsKicker":"02 / SKILLS","skillsTitle":"My current toolkit.","skillsLead":"A practical foundation across web development, programming, data, and security.","frontend":"Frontend","programming":"Programming","backend":"Backend","data":"Data","webSecurity":"Web Security","security":"Security","skillHtmlText":"Semantic HTML, responsive layouts, accessibility, and modern CSS patterns.","skillJsText":"DOM manipulation, browser APIs, events, state, and interactive UI logic.","skillCppText":"Programming fundamentals, functions, problem solving, and algorithm practice.","skillNodeText":"JavaScript runtime concepts and backend foundations for web applications.","skillSqlText":"Relational models, schemas, queries, and application data fundamentals.","skillSecurityText":"Security fundamentals, safer browser practices, and common web risks.","projectsKicker":"03 / PROJECTS","projectsTitle":"Selected work and practice.","projectsLead":"Projects that reflect what I’m learning and the way I approach building.","featured":"Featured","frontendPractice":"Frontend Practice","practice":"Practice","viewSource":"View source","bevoText":"A custom sticker shopping experience centered on product browsing, cart flow, media handling, and practical deployment.","musicText":"A browser-based player experiment with playlists, playback controls, local settings, and multiple audio source types.","galleryText":"A responsive image gallery focused on search, filters, responsive cards, local demo assets, and full-screen viewing.","calculatorText":"A compact browser calculator focused on arithmetic operations, input handling, keyboard support, and clean UI behavior.","calculatorNote":"Source link will be added when a dedicated repository is available.","trainingKicker":"04 / TRAINING","trainingTitle":"Courses and communities.","trainingLead":"Selected learning milestones from university, technical courses, and developer communities.","certified":"CERTIFIED","training":"TRAINING","community":"COMMUNITY","programmingFundamentals":"Programming fundamentals","academicTraining":"Academic training","developerCommunity":"Developer community","googleText":"Developer community participation and DevFest attendance","contactKicker":"05 / CONTACT","sendEmail":"Send an email","copyEmail":"Copy email","backToTop":"Back to top ","settingsKicker":"USER SETTINGS","settingsTitle":"Full Site Control","settingsLead":"Edit the portfolio identity and visible content. Changes are saved in this browser.","identitySection":"Identity","siteNameEn":"Site name — English","siteNameAr":"Site name — العربية","subtitleEn":"Subtitle — English","subtitleAr":"Subtitle — العربية","logoUrl":"Logo URL","accent":"Accent color","heroSection":"Hero","heroBadgeEn":"Badge — English","heroBadgeAr":"Badge — العربية","heroTitleEn":"Hero title — English","heroTitleAr":"Hero title — العربية","heroHighlightEn":"Highlight — English","heroHighlightAr":"Highlight — العربية","heroDescriptionEn":"Hero description — English","heroDescriptionAr":"Hero description — العربية","aboutSection":"About","aboutTitleEn":"About title — English","aboutTitleAr":"About title — العربية","aboutLeadEn":"About lead — English","aboutLeadAr":"About lead — العربية","aboutTextEn":"About text — English","aboutTextAr":"About text — العربية","contactSection":"Contact","contactTitleEn":"Contact title — English","contactTitleAr":"Contact title — العربية","contactTextEn":"Contact text — English","contactTextAr":"Contact text — العربية","email":"Email","locationEn":"Location — English","locationAr":"Location — العربية","socialSection":"Social links","appearanceSection":"Appearance","language":"Language","theme":"Theme","footerEn":"Footer — English","footerAr":"Footer — العربية","reset":"Reset defaults","cancel":"Cancel","saveChanges":"Save changes","noscript":"JavaScript is disabled. The portfolio content is still available, but interactive features are unavailable."},"ar":{"skip":"اذهب للمحتوى","navAbout":"عنّي","navSkills":"المهارات","navProjects":"المشاريع","navTraining":"التدريب","navContact":"تواصل","viewProjects":"شوف المشاريع","getInTouch":"تواصل معايا","webDevelopment":"تطوير الويب","securityFundamentals":"أساسيات الأمان","scrollExplore":"انزل واستكشف","aboutKicker":"01 / عنّي","aboutCardTitle":"مين أنا","statSkills":"مجالات عملية","statProjects":"مشاريع مميزة","statJourney":"رحلة التعلم الحالية","skillsKicker":"02 / المهارات","skillsTitle":"الأدوات اللي بستخدمها.","skillsLead":"أساس عملي في تطوير الويب والبرمجة والبيانات وأساسيات الأمان.","frontend":"فرونت إند","programming":"برمجة","backend":"باك إند","data":"بيانات","webSecurity":"أمان الويب","security":"أمان","skillHtmlText":"HTML دلالي، تصميم متجاوب، وصولية، وأنماط CSS حديثة.","skillJsText":"التعامل مع DOM وواجهات المتصفح والأحداث والحالة والمنطق التفاعلي.","skillCppText":"أساسيات البرمجة والدوال وحل المشكلات والتدريب على الخوارزميات.","skillNodeText":"مفاهيم تشغيل JavaScript وأساسيات الباك إند لتطبيقات الويب.","skillSqlText":"النماذج العلائقية والـSchemas والاستعلامات وأساسيات بيانات التطبيقات.","skillSecurityText":"أساسيات الأمان وممارسات متصفح أكثر أمانًا ومخاطر الويب الشائعة.","projectsKicker":"03 / المشاريع","projectsTitle":"أهم الشغل والتطبيقات.","projectsLead":"مشاريع بتوضح اللي بتعلمه وطريقة تعاملي مع البناء والتنفيذ.","featured":"مميز","frontendPractice":"تطبيق فرونت إند","practice":"تطبيق","viewSource":"شوف المصدر","bevoText":"تجربة تسوق مخصصة للستيكرات، بتركز على عرض المنتجات وسلة الشراء والتعامل مع الوسائط والنشر العملي.","musicText":"مشغل موسيقى على المتصفح فيه Playlists وتحكم في التشغيل وإعدادات محلية ومصادر صوت متعددة.","galleryText":"جاليري صور متجاوب فيه بحث وفلترة وكروت مرنة وعرض الصور بحجم كامل.","calculatorText":"آلة حاسبة على المتصفح تركز على العمليات الحسابية والتعامل مع الإدخال ودعم الكيبورد.","calculatorNote":"رابط المصدر هيتضاف لما يبقى للمشروع Repository مستقل.","trainingKicker":"04 / التدريب","trainingTitle":"الكورسات والمجتمعات.","trainingLead":"محطات تعليمية مختارة من الجامعة والكورسات التقنية والمجتمعات البرمجية.","certified":"حاصل على شهادة","training":"تدريب","community":"مجتمع","programmingFundamentals":"أساسيات البرمجة","academicTraining":"تدريب أكاديمي","developerCommunity":"مجتمع المطورين","googleText":"مشاركة في مجتمع المطورين وحضور DevFest","contactKicker":"05 / التواصل","sendEmail":"ابعت إيميل","copyEmail":"انسخ الإيميل","backToTop":"الرجوع لفوق ","settingsKicker":"إعدادات المستخدم","settingsTitle":"تحكم كامل في الموقع","settingsLead":"عدّل هوية البورتفوليو والمحتوى الظاهر، والتغييرات هتفضل محفوظة على المتصفح.","identitySection":"الهوية","siteNameEn":"اسم الموقع — English","siteNameAr":"اسم الموقع — العربية","subtitleEn":"الوصف — English","subtitleAr":"الوصف — العربية","logoUrl":"رابط اللوجو","accent":"اللون الأساسي","heroSection":"الواجهة الرئيسية","heroBadgeEn":"الشارة — English","heroBadgeAr":"الشارة — العربية","heroTitleEn":"عنوان الـHero — English","heroTitleAr":"عنوان الـHero — العربية","heroHighlightEn":"النص المميز — English","heroHighlightAr":"النص المميز — العربية","heroDescriptionEn":"وصف الـHero — English","heroDescriptionAr":"وصف الـHero — العربية","aboutSection":"عنّي","aboutTitleEn":"عنوان About — English","aboutTitleAr":"عنوان About — العربية","aboutLeadEn":"المقدمة — English","aboutLeadAr":"المقدمة — العربية","aboutTextEn":"النص — English","aboutTextAr":"النص — العربية","contactSection":"التواصل","contactTitleEn":"عنوان التواصل — English","contactTitleAr":"عنوان التواصل — العربية","contactTextEn":"نص التواصل — English","contactTextAr":"نص التواصل — العربية","email":"الإيميل","locationEn":"المكان — English","locationAr":"المكان — العربية","socialSection":"روابط السوشيال","appearanceSection":"المظهر","language":"اللغة","theme":"الثيم","footerEn":"الفوتر — English","footerAr":"الفوتر — العربية","reset":"إرجاع الافتراضي","cancel":"إلغاء","saveChanges":"حفظ التغييرات","noscript":"JavaScript متوقف. محتوى البورتفوليو موجود، لكن المزايا التفاعلية غير متاحة."}};

function clone(value){return JSON.parse(JSON.stringify(value));}
function readSettings(){
  try{const raw=localStorage.getItem(SETTINGS_KEY);return raw?{...clone(DEFAULT_SETTINGS),...JSON.parse(raw)}:clone(DEFAULT_SETTINGS);}
  catch{return clone(DEFAULT_SETTINGS);}
}
let settings=readSettings();
function saveSettings(){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}catch{}}
function t(key){return (TRANSLATIONS[settings.language]||TRANSLATIONS.en)[key]??TRANSLATIONS.en[key]??key;}
function safeUrl(value,allowed=["http:","https:"]){
  const raw=String(value||"").trim();if(!raw)return "";
  try{const url=new URL(raw,window.location.href);return allowed.includes(url.protocol)?raw:"";}catch{return "";}
}
function setMenu(open){
  navMenu.classList.toggle("active",open);
  navToggle.setAttribute("aria-expanded",String(open));
  navToggle.setAttribute("aria-label",open?(settings.language==="ar"?"قفل القائمة":"Close navigation menu"):(settings.language==="ar"?"فتح القائمة":"Open navigation menu"));
  navToggle.innerHTML=open?'<i class="fa-solid fa-xmark" aria-hidden="true"></i>':'<i class="fa-solid fa-bars" aria-hidden="true"></i>';
}
function setSocial(id,url){
  const el=document.getElementById(id);if(!el)return;
  const valid=safeUrl(url);el.href=valid||"#";el.style.display=valid?"grid":"none";
}
function applyLogo(){
  const brand=document.getElementById("site-brand"),name=document.getElementById("brand-name");
  const logo=safeUrl(settings.logoUrl);
  let img=document.getElementById("custom-brand-logo");
  if(logo){
    if(!img){img=document.createElement("img");img.id="custom-brand-logo";img.className="custom-brand-logo";img.alt="";brand.insertBefore(img,name);}
    img.src=logo;img.style.display="inline-block";name.style.display="none";
  }else{
    if(img)img.style.display="none";
    name.style.display="inline";
  }
}
function applyContent(){
  const ar=settings.language==="ar";
  document.documentElement.lang=settings.language;
  document.documentElement.dir=ar?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(el=>{el.textContent=t(el.dataset.i18n);});
  const v=ar?{
    site:settings.siteAr,subtitle:settings.subtitleAr,badge:settings.heroBadgeAr,title:settings.heroTitleAr,highlight:settings.heroHighlightAr,
    description:settings.heroDescriptionAr,aboutTitle:settings.aboutTitleAr,aboutLead:settings.aboutLeadAr,aboutText:settings.aboutTextAr,
    contactTitle:settings.contactTitleAr,contactText:settings.contactTextAr,location:settings.locationAr,footer:settings.footerAr
  }:{
    site:settings.siteEn,subtitle:settings.subtitleEn,badge:settings.heroBadgeEn,title:settings.heroTitleEn,highlight:settings.heroHighlightEn,
    description:settings.heroDescriptionEn,aboutTitle:settings.aboutTitleEn,aboutLead:settings.aboutLeadEn,aboutText:settings.aboutTextEn,
    contactTitle:settings.contactTitleEn,contactText:settings.contactTextEn,location:settings.locationEn,footer:settings.footerEn
  };
  document.title=v.site+" | "+(ar?"بورتفوليو مطور":"Developer Portfolio");
  document.getElementById("page-title").textContent=document.title;
  document.getElementById("meta-description").content=v.description;
  document.getElementById("og-title").content=document.title;
  document.getElementById("og-description").content=v.description;
  document.getElementById("brand-name").textContent=v.site;
  document.getElementById("site-subtitle").textContent=v.subtitle;
  document.getElementById("hero-badge").textContent=v.badge;
  document.getElementById("hero-title").textContent=v.title;
  document.getElementById("hero-highlight").textContent=v.highlight;
  document.getElementById("hero-description").textContent=v.description;
  document.getElementById("hero-location").textContent=v.location;
  document.getElementById("about-title").textContent=v.aboutTitle;
  document.getElementById("about-lead").textContent=v.aboutLead;
  document.getElementById("about-text").textContent=v.aboutText;
  document.getElementById("contact-title").textContent=v.contactTitle;
  document.getElementById("contact-description").textContent=v.contactText;
  document.getElementById("footer-text").textContent=v.footer;
  document.getElementById("footer-text").setAttribute("title",v.subtitle);
  languageToggle.textContent=ar?"English":"العربية";
  languageToggle.setAttribute("aria-label",ar?"Switch to English":"التبديل للعربية");
  document.getElementById("email-link").href=settings.email?"mailto:"+settings.email:"#";
  copyEmailButton.dataset.email=settings.email;
  ["linkedin","github","whatsapp","facebook","instagram"].forEach(name=>setSocial(name+"-link",settings[name]));
  applyLogo();
  updateTheme();
}
function updateTheme(){
  root.dataset.theme=settings.theme;
  root.style.setProperty("--primary",settings.accent);
  root.style.setProperty("--primary-strong",settings.accent);
  const light=settings.theme==="light";
  themeToggle.innerHTML=light?'<i class="fa-solid fa-sun" aria-hidden="true"></i>':'<i class="fa-solid fa-moon" aria-hidden="true"></i>';
  themeToggle.setAttribute("aria-pressed",String(light));
  themeToggle.setAttribute("aria-label",settings.language==="ar"?(light?"التبديل للوضع الداكن":"التبديل للوضع الفاتح"):(light?"Switch to dark theme":"Switch to light theme"));
}
function populateSettingsForm(){
  const fields={
    "setting-site-en":settings.siteEn,"setting-site-ar":settings.siteAr,"setting-subtitle-en":settings.subtitleEn,"setting-subtitle-ar":settings.subtitleAr,
    "setting-logo":settings.logoUrl,"setting-accent":settings.accent,
    "setting-hero-badge-en":settings.heroBadgeEn,"setting-hero-badge-ar":settings.heroBadgeAr,
    "setting-hero-title-en":settings.heroTitleEn,"setting-hero-title-ar":settings.heroTitleAr,
    "setting-hero-highlight-en":settings.heroHighlightEn,"setting-hero-highlight-ar":settings.heroHighlightAr,
    "setting-hero-description-en":settings.heroDescriptionEn,"setting-hero-description-ar":settings.heroDescriptionAr,
    "setting-about-title-en":settings.aboutTitleEn,"setting-about-title-ar":settings.aboutTitleAr,
    "setting-about-lead-en":settings.aboutLeadEn,"setting-about-lead-ar":settings.aboutLeadAr,
    "setting-about-text-en":settings.aboutTextEn,"setting-about-text-ar":settings.aboutTextAr,
    "setting-contact-title-en":settings.contactTitleEn,"setting-contact-title-ar":settings.contactTitleAr,
    "setting-contact-text-en":settings.contactTextEn,"setting-contact-text-ar":settings.contactTextAr,
    "setting-email":settings.email,"setting-location-en":settings.locationEn,"setting-location-ar":settings.locationAr,
    "setting-linkedin":settings.linkedin,"setting-github":settings.github,"setting-whatsapp":settings.whatsapp,"setting-facebook":settings.facebook,"setting-instagram":settings.instagram,
    "setting-language":settings.language,"setting-theme":settings.theme,"setting-footer-en":settings.footerEn,"setting-footer-ar":settings.footerAr
  };
  Object.entries(fields).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.value=value??"";});
}
function readSettingsForm(){
  const get=id=>document.getElementById(id)?.value.trim()??"";
  settings={
    ...settings,
    siteEn:get("setting-site-en")||DEFAULT_SETTINGS.siteEn,siteAr:get("setting-site-ar")||DEFAULT_SETTINGS.siteAr,
    subtitleEn:get("setting-subtitle-en")||DEFAULT_SETTINGS.subtitleEn,subtitleAr:get("setting-subtitle-ar")||DEFAULT_SETTINGS.subtitleAr,
    logoUrl:safeUrl(get("setting-logo")),accent:/^#[0-9a-f]{6}$/i.test(get("setting-accent"))?get("setting-accent"):DEFAULT_SETTINGS.accent,
    heroBadgeEn:get("setting-hero-badge-en")||DEFAULT_SETTINGS.heroBadgeEn,heroBadgeAr:get("setting-hero-badge-ar")||DEFAULT_SETTINGS.heroBadgeAr,
    heroTitleEn:get("setting-hero-title-en")||DEFAULT_SETTINGS.heroTitleEn,heroTitleAr:get("setting-hero-title-ar")||DEFAULT_SETTINGS.heroTitleAr,
    heroHighlightEn:get("setting-hero-highlight-en")||DEFAULT_SETTINGS.heroHighlightEn,heroHighlightAr:get("setting-hero-highlight-ar")||DEFAULT_SETTINGS.heroHighlightAr,
    heroDescriptionEn:get("setting-hero-description-en")||DEFAULT_SETTINGS.heroDescriptionEn,heroDescriptionAr:get("setting-hero-description-ar")||DEFAULT_SETTINGS.heroDescriptionAr,
    aboutTitleEn:get("setting-about-title-en")||DEFAULT_SETTINGS.aboutTitleEn,aboutTitleAr:get("setting-about-title-ar")||DEFAULT_SETTINGS.aboutTitleAr,
    aboutLeadEn:get("setting-about-lead-en")||DEFAULT_SETTINGS.aboutLeadEn,aboutLeadAr:get("setting-about-lead-ar")||DEFAULT_SETTINGS.aboutLeadAr,
    aboutTextEn:get("setting-about-text-en")||DEFAULT_SETTINGS.aboutTextEn,aboutTextAr:get("setting-about-text-ar")||DEFAULT_SETTINGS.aboutTextAr,
    contactTitleEn:get("setting-contact-title-en")||DEFAULT_SETTINGS.contactTitleEn,contactTitleAr:get("setting-contact-title-ar")||DEFAULT_SETTINGS.contactTitleAr,
    contactTextEn:get("setting-contact-text-en")||DEFAULT_SETTINGS.contactTextEn,contactTextAr:get("setting-contact-text-ar")||DEFAULT_SETTINGS.contactTextAr,
    email:get("setting-email")||DEFAULT_SETTINGS.email,locationEn:get("setting-location-en")||DEFAULT_SETTINGS.locationEn,locationAr:get("setting-location-ar")||DEFAULT_SETTINGS.locationAr,
    linkedin:safeUrl(get("setting-linkedin")),github:safeUrl(get("setting-github")),whatsapp:safeUrl(get("setting-whatsapp")),facebook:safeUrl(get("setting-facebook")),instagram:safeUrl(get("setting-instagram")),
    language:document.getElementById("setting-language").value==="ar"?"ar":"en",
    theme:document.getElementById("setting-theme").value==="light"?"light":"dark",
    footerEn:get("setting-footer-en")||DEFAULT_SETTINGS.footerEn,footerAr:get("setting-footer-ar")||DEFAULT_SETTINGS.footerAr
  };
  saveSettings();applyContent();populateSettingsForm();closeSettings();
}
function openSettings(){populateSettingsForm();settingsModal.classList.remove("hidden");document.body.classList.add("settings-open");}
function closeSettings(){settingsModal.classList.add("hidden");document.body.classList.remove("settings-open");}
function updateScrollUI(){
  const top=window.scrollY,max=document.documentElement.scrollHeight-window.innerHeight;
  progressBar.style.width=Math.min(100,Math.max(0,max>0?top/max*100:0))+"%";
  navbar.classList.toggle("scrolled",top>20);
  backToTop.classList.toggle("visible",top>520);
}
async function copyText(value){
  if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(value);return;}
  const box=document.createElement("textarea");box.value=value;box.setAttribute("readonly","");box.style.position="fixed";box.style.opacity="0";document.body.appendChild(box);box.select();
  const ok=document.execCommand("copy");box.remove();if(!ok)throw new Error("copy failed");
}
function showCopy(message,success){
  copyFeedback.textContent=message;copyFeedback.classList.toggle("success",success);clearTimeout(showCopy.timer);
  showCopy.timer=setTimeout(()=>{copyFeedback.textContent="";copyFeedback.classList.remove("success");},2600);
}
navToggle.addEventListener("click",()=>setMenu(!navMenu.classList.contains("active")));
navLinks.forEach(link=>link.addEventListener("click",()=>setMenu(false)));
document.addEventListener("click",event=>{if(navMenu.classList.contains("active")&&!navMenu.contains(event.target)&&!navToggle.contains(event.target))setMenu(false);});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){setMenu(false);closeSettings();}});
settingsToggle.addEventListener("click",openSettings);
document.querySelectorAll("[data-close-settings]").forEach(el=>el.addEventListener("click",closeSettings));
languageToggle.addEventListener("click",()=>{settings.language=settings.language==="en"?"ar":"en";saveSettings();applyContent();populateSettingsForm();});
themeToggle.addEventListener("click",()=>{settings.theme=settings.theme==="dark"?"light":"dark";saveSettings();updateTheme();});
document.getElementById("save-settings").addEventListener("click",readSettingsForm);
document.getElementById("reset-settings").addEventListener("click",()=>{settings=clone(DEFAULT_SETTINGS);saveSettings();applyContent();populateSettingsForm();});
copyEmailButton.addEventListener("click",async()=>{if(!settings.email)return;try{await copyText(settings.email);showCopy(settings.language==="ar"?"تم نسخ الإيميل":"Email copied to clipboard.",true);}catch{showCopy(settings.language==="ar"?"فشل النسخ، استخدم زر الإيميل":"Copy failed. Use the email button instead.",false);}});
backToTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:prefersReducedMotion.matches?"auto":"smooth"}));
window.addEventListener("scroll",updateScrollUI,{passive:true});window.addEventListener("resize",updateScrollUI);

function setupReveal(){
  if(prefersReducedMotion.matches||!("IntersectionObserver" in window)){revealItems.forEach(el=>el.classList.add("is-visible"));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12});
  revealItems.forEach(el=>observer.observe(el));
}
function setupActiveSection(){
  if(!("IntersectionObserver" in window))return;
  const map=new Map(navLinks.map(link=>[link.getAttribute("href").slice(1),link]));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;navLinks.forEach(link=>{link.classList.remove("active");link.removeAttribute("aria-current");});const active=map.get(entry.target.id);if(active){active.classList.add("active");active.setAttribute("aria-current","page");}}),{rootMargin:"-22% 0px -62% 0px",threshold:0});
  sections.forEach(section=>observer.observe(section));
}
if(prefersReducedMotion.addEventListener)prefersReducedMotion.addEventListener("change",()=>{if(prefersReducedMotion.matches)revealItems.forEach(el=>el.classList.add("is-visible"));});
document.getElementById("stat-year").textContent=String(new Date().getFullYear());
setMenu(false);applyContent();populateSettingsForm();setupReveal();setupActiveSection();updateScrollUI();