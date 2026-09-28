const root=document.documentElement;
const navbar=document.getElementById("navbar");
const navToggle=document.getElementById("nav-toggle");
const navMenu=document.getElementById("nav-menu");
const navLinks=Array.from(document.querySelectorAll(".nav-link"));
const sections=Array.from(document.querySelectorAll("[data-observe-section]"));
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
const CONTENT_KEY="pavley-portfolio-content-v1";
const VISUAL_STYLES=["generic-visual","bevo-visual","music-visual","gallery-visual","calculator-visual"];
const DEFAULT_SETTINGS={
  language:"en",theme:"dark",siteEn:"Pavley Mousa",siteAr:"بافلي موسى",subtitleEn:"Developer Portfolio",subtitleAr:"بورتفوليو مطور برمجيات",
  logoUrl:"",accent:"#38bdf8",heroBadgeEn:"Computer Science & AI Student",heroBadgeAr:"طالب علوم حاسب وذكاء اصطناعي",
  heroTitleEn:"I build useful software with",heroTitleAr:"ببني برامج مفيدة باستخدام",heroHighlightEn:"code, curiosity, and consistency.",heroHighlightAr:"الكود، الفضول، والاستمرارية.",
  heroDescriptionEn:"I’m Pavley Mousa, a Computer Science and Artificial Intelligence student focused on frontend development, C++, software engineering, and web security fundamentals.",
  heroDescriptionAr:"أنا بافلي موسى، طالب علوم حاسب وذكاء اصطناعي، وبركز على تطوير الواجهات وC++ وهندسة البرمجيات وأساسيات أمان الويب.",
  aboutTitleEn:"Learning by building real things.",aboutTitleAr:"بتعلم من خلال بناء حاجات حقيقية.",
  aboutLeadEn:"I use projects to turn programming concepts into working interfaces, tools, and experiments.",aboutLeadAr:"بستخدم المشاريع عشان أحول مفاهيم البرمجة لواجهات وأدوات وتجارب شغالة.",
  aboutTextEn:"I study Computer Science and Artificial Intelligence and build projects while I learn. My priorities are readable code, responsive design, practical problem solving, and steady improvement.",
  aboutTextAr:"بدرس علوم الحاسب والذكاء الاصطناعي وببني مشاريع وأنا بتعلم. أهم حاجة عندي كود واضح، تصميم متجاوب، حل عملي للمشاكل، وتطور مستمر.",
  contactTitleEn:"Let’s build something useful.",contactTitleAr:"يلا نبني حاجة مفيدة.",
  contactTextEn:"Open to software development opportunities, freelance projects, and technical conversations.",contactTextAr:"متاح لفرص تطوير البرمجيات، المشاريع الحرة، والنقاشات التقنية.",
  email:"bavlymosa29@gmail.com",locationEn:"Egypt",locationAr:"مصر",
  linkedin:"https://www.linkedin.com/in/pavley-mousa-715533341",github:"https://github.com/pavley-mousa",whatsapp:"https://wa.me/201556126686",
  facebook:"https://www.facebook.com/pavley.mousa",instagram:"https://www.instagram.com/pavley.mousa",
  footerEn:"© 2026 Pavley Mousa",footerAr:"© 2026 بافلي موسى"
};

const DEFAULT_CONTENT={
  skills:[
    {id:"skill-html-css",nameEn:"HTML & CSS",nameAr:"HTML و CSS",descEn:"Semantic HTML, responsive layouts, accessibility, and modern CSS patterns.",descAr:"HTML دلالي، تصميم متجاوب، وصولية، وأنماط CSS حديثة.",catEn:"Frontend",catAr:"فرونت إند",icon:"fa-brands fa-html5"},
    {id:"skill-js",nameEn:"JavaScript",nameAr:"JavaScript",descEn:"DOM manipulation, browser APIs, events, state, and interactive UI logic.",descAr:"التعامل مع DOM وواجهات المتصفح والأحداث والحالة والمنطق التفاعلي.",catEn:"Frontend",catAr:"فرونت إند",icon:"fa-brands fa-js"},
    {id:"skill-cpp",nameEn:"C++",nameAr:"C++",descEn:"Programming fundamentals, functions, problem solving, and algorithm practice.",descAr:"أساسيات البرمجة والدوال وحل المشكلات والتدريب على الخوارزميات.",catEn:"Programming",catAr:"برمجة",icon:"fa-solid fa-code"},
    {id:"skill-node",nameEn:"Node.js",nameAr:"Node.js",descEn:"JavaScript runtime concepts and backend foundations for web applications.",descAr:"مفاهيم تشغيل JavaScript وأساسيات الباك إند لتطبيقات الويب.",catEn:"Backend",catAr:"باك إند",icon:"fa-brands fa-node-js"},
    {id:"skill-sql",nameEn:"SQL",nameAr:"SQL",descEn:"Relational models, schemas, queries, and application data fundamentals.",descAr:"النماذج العلائقية والـSchemas والاستعلامات وأساسيات بيانات التطبيقات.",catEn:"Data",catAr:"بيانات",icon:"fa-solid fa-database"},
    {id:"skill-security",nameEn:"Web Security",nameAr:"أمان الويب",descEn:"Security fundamentals, safer browser practices, and common web risks.",descAr:"أساسيات الأمان وممارسات متصفح أكثر أمانًا ومخاطر الويب الشائعة.",catEn:"Security",catAr:"أمان",icon:"fa-solid fa-shield-halved"}
  ],
  projects:[
    {id:"project-bevo",titleEn:"Bevo Stickers",titleAr:"Bevo Stickers",descEn:"A custom sticker shopping experience centered on product browsing, cart flow, media handling, and practical deployment.",descAr:"تجربة تسوق مخصصة للستيكرات، بتركز على عرض المنتجات وسلة الشراء والتعامل مع الوسائط والنشر العملي.",tagEn:"Featured",tagAr:"مميز",labelEn:"E-COMMERCE",labelAr:"تجارة إلكترونية",tech:["JavaScript","Cloudinary","Turso","Vercel"],link:"https://github.com/pavley-mousa/Bevo-stickers",icon:"fa-solid fa-store",visual:"bevo-visual",featured:true,noteEn:"",noteAr:""},
    {id:"project-music",titleEn:"Music Player",titleAr:"مشغل موسيقى",descEn:"A browser-based player experiment with playlists, playback controls, local settings, and multiple audio source types.",descAr:"مشغل موسيقى على المتصفح فيه Playlists وتحكم في التشغيل وإعدادات محلية ومصادر صوت متعددة.",tagEn:"Frontend Practice",tagAr:"تطبيق فرونت إند",labelEn:"CODEALPHA TASK",labelAr:"مهمة CodeAlpha",tech:["HTML5","CSS","JavaScript","localStorage"],link:"https://github.com/pavley-mousa/codealpha_tasks_Music_Player",icon:"fa-solid fa-music",visual:"music-visual",featured:false,noteEn:"",noteAr:""},
    {id:"project-gallery",titleEn:"Responsive Image Gallery",titleAr:"جاليري صور متجاوب",descEn:"A responsive image gallery focused on search, filters, responsive cards, local demo assets, and full-screen viewing.",descAr:"جاليري صور متجاوب فيه بحث وفلترة وكروت مرنة وعرض الصور بحجم كامل.",tagEn:"Frontend Practice",tagAr:"تطبيق فرونت إند",labelEn:"CODEALPHA TASK",labelAr:"مهمة CodeAlpha",tech:["HTML5","CSS","DOM","localStorage"],link:"https://github.com/pavley-mousa/codealpha_tasks_image_gallery",icon:"fa-solid fa-images",visual:"gallery-visual",featured:false,noteEn:"",noteAr:""},
    {id:"project-calculator",titleEn:"Interactive Calculator",titleAr:"آلة حاسبة تفاعلية",descEn:"A compact browser calculator focused on arithmetic operations, input handling, keyboard support, and clean UI behavior.",descAr:"آلة حاسبة على المتصفح تركز على العمليات الحسابية والتعامل مع الإدخال ودعم الكيبورد.",tagEn:"Practice",tagAr:"تطبيق",labelEn:"CODEALPHA TASK",labelAr:"مهمة CodeAlpha",tech:["HTML5","CSS Grid","JavaScript"],link:"",icon:"fa-solid fa-calculator",visual:"calculator-visual",featured:false,noteEn:"Source link will be added when a dedicated repository is available.",noteAr:"رابط المصدر هيتضاف لما يبقى للمشروع Repository مستقل."}
  ],
  training:[
    {id:"training-cpp",titleEn:"C++ Essentials 1",titleAr:"C++ Essentials 1",orgEn:"Cisco Networking Academy",orgAr:"Cisco Networking Academy",labelEn:"CERTIFIED",labelAr:"حاصل على شهادة",metaEn:"Programming fundamentals",metaAr:"أساسيات البرمجة",icon:"fa-solid fa-code"},
    {id:"training-security",titleEn:"Introduction to Cybersecurity",titleAr:"مقدمة في الأمن السيبراني",orgEn:"Cisco Networking Academy",orgAr:"Cisco Networking Academy",labelEn:"CERTIFIED",labelAr:"حاصل على شهادة",metaEn:"Security fundamentals",metaAr:"أساسيات الأمان",icon:"fa-solid fa-shield-halved"},
    {id:"training-huawei",titleEn:"Huawei ICT Academic Training",titleAr:"تدريب Huawei ICT الأكاديمي",orgEn:"Sphinx University & FCAI collaboration",orgAr:"تعاون جامعة سفنكس مع كلية الحاسبات والذكاء الاصطناعي",labelEn:"TRAINING",labelAr:"تدريب",metaEn:"Academic training",metaAr:"تدريب أكاديمي",icon:"fa-solid fa-network-wired"},
    {id:"training-google",titleEn:"Google Developer Program",titleAr:"Google Developer Program",orgEn:"Developer community participation and DevFest attendance",orgAr:"مشاركة في مجتمع المطورين وحضور DevFest",labelEn:"COMMUNITY",labelAr:"مجتمع",metaEn:"Developer community",metaAr:"مجتمع المطورين",icon:"fa-brands fa-google"}
  ]
};

const TRANSLATIONS={
  en:{
    skip:"Skip to content",navAbout:"About",navSkills:"Skills",navProjects:"Projects",navTraining:"Training",navContact:"Contact",
    viewProjects:"View projects",getInTouch:"Get in touch",webDevelopment:"Web development",securityFundamentals:"Security fundamentals",scrollExplore:"Scroll to explore",
    aboutKicker:"01 / ABOUT",aboutCardTitle:"Who I am",statSkills:"Practical skill areas",statProjects:"Featured projects",statJourney:"Current learning journey",
    skillsKicker:"02 / SKILLS",skillsTitle:"My current toolkit.",skillsLead:"A practical foundation across web development, programming, data, and security.",
    projectsKicker:"03 / PROJECTS",projectsTitle:"Selected work and practice.",projectsLead:"Projects that reflect what I’m learning and the way I approach building.",
    featured:"Featured",frontendPractice:"Frontend Practice",practice:"Practice",viewSource:"View source",
    trainingKicker:"04 / TRAINING",trainingTitle:"Courses and communities.",trainingLead:"Selected learning milestones from university, technical courses, and developer communities.",
    certified:"CERTIFIED",training:"TRAINING",community:"COMMUNITY",nameRequired:"Enter a name in at least one language.",programmingFundamentals:"Programming fundamentals",academicTraining:"Academic training",developerCommunity:"Developer community",
    googleText:"Developer community participation and DevFest attendance",contactKicker:"05 / CONTACT",sendEmail:"Send an email",copyEmail:"Copy email",backToTop:"Back to top",
    settingsKicker:"USER SETTINGS",settingsTitle:"Full Site Control",settingsLead:"Edit site-wide settings and manage every skill, project, and training item. Changes are saved in this browser.",
    identitySection:"Identity",siteNameEn:"Site name — English",siteNameAr:"Site name — العربية",subtitleEn:"Subtitle — English",subtitleAr:"Subtitle — العربية",logoUrl:"Logo URL",accent:"Accent color",
    heroSection:"Hero",heroBadgeEn:"Badge — English",heroBadgeAr:"Badge — العربية",heroTitleEn:"Hero title — English",heroTitleAr:"Hero title — العربية",heroHighlightEn:"Highlight — English",heroHighlightAr:"Highlight — العربية",heroDescriptionEn:"Hero description — English",heroDescriptionAr:"Hero description — العربية",
    aboutSection:"About",aboutTitleEn:"About title — English",aboutTitleAr:"About title — العربية",aboutLeadEn:"About lead — English",aboutLeadAr:"About lead — العربية",aboutTextEn:"About text — English",aboutTextAr:"About text — العربية",
    contactSection:"Contact",contactTitleEn:"Contact title — English",contactTitleAr:"Contact title — العربية",contactTextEn:"Contact text — English",contactTextAr:"Contact text — العربية",email:"Email",locationEn:"Location — English",locationAr:"Location — العربية",
    socialSection:"Social links",appearanceSection:"Appearance",language:"Language",theme:"Theme",footerEn:"Footer — English",footerAr:"Footer — العربية",reset:"Reset defaults",cancel:"Cancel",saveChanges:"Save changes",
    contentKicker:"CONTENT MANAGER",contentSection:"Content management",contentLead:"Add, edit, delete, and reorder the cards shown on the site. Changes apply after Save changes.",
    skillsManager:"Skills",projectsManager:"Projects",trainingManager:"Training",skillEditor:"Skill editor",projectEditor:"Project editor",trainingEditor:"Training editor",
    nameEn:"Name — English",nameAr:"Name — العربية",descriptionEn:"Description — English",descriptionAr:"Description — العربية",categoryEn:"Category — English",categoryAr:"Category — العربية",
    tagEn:"Tag — English",tagAr:"Tag — العربية",labelEn:"Status / label — English",labelAr:"Status / label — العربية",techStack:"Tech stack (comma separated)",projectLink:"Project/source URL",iconClass:"Font Awesome icon class",visualStyle:"Visual style",featuredProject:"Featured project",
    noteEn:"Note — English",noteAr:"Note — العربية",organizationEn:"Organization — English",organizationAr:"Organization — العربية",metaEn:"Category — English",metaAr:"Category — العربية",
    saveItem:"Save item",clearEditor:"Clear",addNew:"Add new",editItem:"Edit",deleteItem:"Delete",moveUp:"Move up",moveDown:"Move down",noItems:"No items yet.",editingNew:"New item",editingExisting:"Editing item",generic:"Generic",
    emailInvalid:"Enter a valid email address.",urlInvalid:"Use a full http:// or https:// URL.",confirmDelete:"Delete this item?",contentSaved:"Content changes are ready. Click Save changes to publish them.",noscript:"JavaScript is disabled. The portfolio content is still available, but interactive features are unavailable."
  },
  ar:{
    skip:"اذهب للمحتوى",navAbout:"عنّي",navSkills:"المهارات",navProjects:"المشاريع",navTraining:"التدريب",navContact:"تواصل",
    viewProjects:"شوف المشاريع",getInTouch:"تواصل معايا",webDevelopment:"تطوير الويب",securityFundamentals:"أساسيات الأمان",scrollExplore:"انزل واستكشف",
    aboutKicker:"01 / عنّي",aboutCardTitle:"مين أنا",statSkills:"مجالات عملية",statProjects:"مشاريع مميزة",statJourney:"رحلة التعلم الحالية",
    skillsKicker:"02 / المهارات",skillsTitle:"الأدوات اللي بستخدمها.",skillsLead:"أساس عملي في تطوير الويب والبرمجة والبيانات وأساسيات الأمان.",
    projectsKicker:"03 / المشاريع",projectsTitle:"أهم الشغل والتطبيقات.",projectsLead:"مشاريع بتوضح اللي بتعلمه وطريقة تعاملي مع البناء والتنفيذ.",
    featured:"مميز",frontendPractice:"تطبيق فرونت إند",practice:"تطبيق",viewSource:"شوف المصدر",
    trainingKicker:"04 / التدريب",trainingTitle:"الكورسات والمجتمعات.",trainingLead:"محطات تعليمية مختارة من الجامعة والكورسات التقنية والمجتمعات البرمجية.",
    certified:"حاصل على شهادة",training:"تدريب",community:"مجتمع",nameRequired:"اكتب اسم العنصر بلغة واحدة على الأقل.",programmingFundamentals:"أساسيات البرمجة",academicTraining:"تدريب أكاديمي",developerCommunity:"مجتمع المطورين",
    googleText:"مشاركة في مجتمع المطورين وحضور DevFest",contactKicker:"05 / التواصل",sendEmail:"ابعت إيميل",copyEmail:"انسخ الإيميل",backToTop:"الرجوع لفوق",
    settingsKicker:"إعدادات المستخدم",settingsTitle:"تحكم كامل في الموقع",settingsLead:"عدّل إعدادات الموقع وأضف وعدّل واحذف ورتّب كل مهارة ومشروع وتدريب. التغييرات محفوظة على المتصفح.",
    identitySection:"الهوية",siteNameEn:"اسم الموقع — English",siteNameAr:"اسم الموقع — العربية",subtitleEn:"الوصف — English",subtitleAr:"الوصف — العربية",logoUrl:"رابط اللوجو",accent:"اللون الأساسي",
    heroSection:"الواجهة الرئيسية",heroBadgeEn:"الشارة — English",heroBadgeAr:"الشارة — العربية",heroTitleEn:"عنوان الـHero — English",heroTitleAr:"عنوان الـHero — العربية",heroHighlightEn:"النص المميز — English",heroHighlightAr:"النص المميز — العربية",heroDescriptionEn:"وصف الـHero — English",heroDescriptionAr:"وصف الـHero — العربية",
    aboutSection:"عنّي",aboutTitleEn:"عنوان About — English",aboutTitleAr:"عنوان About — العربية",aboutLeadEn:"المقدمة — English",aboutLeadAr:"المقدمة — العربية",aboutTextEn:"النص — English",aboutTextAr:"النص — العربية",
    contactSection:"التواصل",contactTitleEn:"عنوان التواصل — English",contactTitleAr:"عنوان التواصل — العربية",contactTextEn:"نص التواصل — English",contactTextAr:"نص التواصل — العربية",email:"الإيميل",locationEn:"المكان — English",locationAr:"المكان — العربية",
    socialSection:"روابط السوشيال",appearanceSection:"المظهر",language:"اللغة",theme:"الثيم",footerEn:"الفوتر — English",footerAr:"الفوتر — العربية",reset:"إرجاع الافتراضي",cancel:"إلغاء",saveChanges:"حفظ التغييرات",
    contentKicker:"إدارة المحتوى",contentSection:"إدارة محتوى الموقع",contentLead:"أضف وعدّل واحذف ورتّب الكروت اللي بتظهر في الموقع. التغييرات بتتطبق بعد حفظ التغييرات.",
    skillsManager:"المهارات",projectsManager:"المشاريع",trainingManager:"التدريب",skillEditor:"محرر المهارات",projectEditor:"محرر المشاريع",trainingEditor:"محرر التدريب",
    nameEn:"الاسم — English",nameAr:"الاسم — العربية",descriptionEn:"الوصف — English",descriptionAr:"الوصف — العربية",categoryEn:"التصنيف — English",categoryAr:"التصنيف — العربية",
    tagEn:"الوسم — English",tagAr:"الوسم — العربية",labelEn:"الحالة / الليبل — English",labelAr:"الحالة / الليبل — العربية",techStack:"التقنيات (افصل بينهم بفاصلة)",projectLink:"رابط المشروع/المصدر",iconClass:"كلاس أيقونة Font Awesome",visualStyle:"الشكل البصري",featuredProject:"مشروع مميز",
    noteEn:"ملاحظة — English",noteAr:"ملاحظة — العربية",organizationEn:"الجهة — English",organizationAr:"الجهة — العربية",metaEn:"التصنيف — English",metaAr:"التصنيف — العربية",
    saveItem:"حفظ العنصر",clearEditor:"مسح المحرر",addNew:"إضافة جديد",editItem:"تعديل",deleteItem:"حذف",moveUp:"لفوق",moveDown:"لتحت",noItems:"مفيش عناصر لسه.",editingNew:"عنصر جديد",editingExisting:"تعديل عنصر",generic:"عام",
    emailInvalid:"اكتب إيميل صحيح.",urlInvalid:"استخدم رابط كامل يبدأ بـ http:// أو https://.",confirmDelete:"تحذف العنصر ده؟",contentSaved:"التغييرات جاهزة. اضغط حفظ التغييرات عشان تتطبق.",noscript:"JavaScript متوقف. محتوى البورتفوليو موجود، لكن المزايا التفاعلية غير متاحة."
  }
};

function clone(value){return JSON.parse(JSON.stringify(value));}
function readObject(key,defaults){
  try{
    const raw=localStorage.getItem(key);
    if(!raw)return clone(defaults);
    const parsed=JSON.parse(raw);
    return parsed&&typeof parsed==="object"?{...clone(defaults),...parsed}:clone(defaults);
  }catch{return clone(defaults);}
}
function readContent(){
  try{
    const raw=localStorage.getItem(CONTENT_KEY);
    if(!raw)return clone(DEFAULT_CONTENT);
    const parsed=JSON.parse(raw);
    return {
      skills:Array.isArray(parsed.skills)?parsed.skills:clone(DEFAULT_CONTENT.skills),
      projects:Array.isArray(parsed.projects)?parsed.projects:clone(DEFAULT_CONTENT.projects),
      training:Array.isArray(parsed.training)?parsed.training:clone(DEFAULT_CONTENT.training)
    };
  }catch{return clone(DEFAULT_CONTENT);}
}
let settings=readObject(SETTINGS_KEY,DEFAULT_SETTINGS);
let content=readContent();
let draftSettings=clone(settings);
let draftContent=clone(content);
let editorState={skills:-1,projects:-1,training:-1};
let activeManager="skills";

function saveSettings(){try{localStorage.setItem(SETTINGS_KEY,JSON.stringify(settings));}catch{}}
function saveContent(){try{localStorage.setItem(CONTENT_KEY,JSON.stringify(content));}catch{}}
function t(key){return (TRANSLATIONS[settings.language]||TRANSLATIONS.en)[key]??TRANSLATIONS.en[key]??key;}
function safeUrl(value,allowed=["http:","https:"]){
  const raw=String(value||"").trim();if(!raw)return "";
  if(!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw))return "";
  try{const url=new URL(raw,window.location.href);return allowed.includes(url.protocol)?raw:"";}catch{return "";}
}
function safeEmail(value){
  const raw=String(value||"").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)?raw:"";
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
function iconClass(value,fallback){
  const safe=String(value||"").trim().replace(/[^a-zA-Z0-9 _-]/g,"");
  return safe||fallback;
}
function textFor(item,prefix){
  const ar=settings.language==="ar";
  return item[prefix+(ar?"Ar":"En")]||item[prefix+"En"]||item[prefix+"Ar"]||"";
}
function createIcon(className){
  const i=document.createElement("i");
  i.className=iconClass(className,"fa-solid fa-code");
  i.setAttribute("aria-hidden","true");
  return i;
}
function renderSkills(){
  const box=document.getElementById("skills-list");box.textContent="";
  draftRender(content.skills,"skill").forEach((item)=>{
    const card=document.createElement("article");card.className="skill-card glass-card reveal is-visible";
    const iconBox=document.createElement("div");iconBox.className="skill-icon";iconBox.appendChild(createIcon(item.icon,"fa-solid fa-code"));
    const h3=document.createElement("h3");h3.textContent=textFor(item,"name");
    const p=document.createElement("p");p.textContent=textFor(item,"desc");
    const badge=document.createElement("span");badge.className="skill-level";badge.textContent=textFor(item,"cat");
    card.append(iconBox,h3,p,badge);box.appendChild(card);
  });
  document.querySelector('[data-i18n="statSkills"]')?.parentElement?.querySelector("strong")?.replaceChildren(document.createTextNode(String(content.skills.length).padStart(2,"0")));
}
function renderProjects(){
  const box=document.getElementById("projects-list");box.textContent="";
  draftRender(content.projects,"project").forEach((item,index)=>{
    const card=document.createElement("article");card.className="project-card glass-card reveal is-visible"+(item.featured?" project-featured":"");
    const visual=document.createElement("div");visual.className="project-visual "+(VISUAL_STYLES.includes(item.visual)?item.visual:"generic-visual");
    const number=document.createElement("span");number.className="project-number";number.textContent=String(index+1).padStart(2,"0");
    const icon=createIcon(item.icon,"fa-solid fa-code");
    const label=document.createElement("span");label.className="visual-label";label.textContent=textFor(item,"label");
    visual.append(number,icon,label);
    const body=document.createElement("div");body.className="project-content";
    const tag=document.createElement("span");tag.className="project-tag";tag.textContent=textFor(item,"tag");
    const h3=document.createElement("h3");h3.textContent=textFor(item,"title");
    const p=document.createElement("p");p.textContent=textFor(item,"desc");
    const tech=document.createElement("div");tech.className="tech-list";
    (Array.isArray(item.tech)?item.tech:[]).forEach(value=>{const span=document.createElement("span");span.textContent=value;tech.appendChild(span);});
    body.append(tag,h3,p,tech);
    const link=safeUrl(item.link);
    if(link){
      const a=document.createElement("a");a.className="text-link";a.href=link;a.target="_blank";a.rel="noopener noreferrer";
      const s=document.createElement("span");s.textContent=t("viewSource");a.append(s,createIcon("fa-solid fa-arrow-up-right-from-square","fa-solid fa-arrow-up-right-from-square"));body.appendChild(a);
    }
    const note=textFor(item,"note");
    if(note){
      const noteEl=document.createElement("span");noteEl.className="project-note";noteEl.append(createIcon("fa-solid fa-circle-info","fa-solid fa-circle-info"));
      const span=document.createElement("span");span.textContent=note;noteEl.appendChild(span);body.appendChild(noteEl);
    }
    card.append(visual,body);box.appendChild(card);
  });
  const stat=document.querySelector('[data-i18n="statProjects"]')?.parentElement?.querySelector("strong");
  if(stat)stat.textContent=String(content.projects.length).padStart(2,"0");
}
function renderTraining(){
  const box=document.getElementById("training-list");box.textContent="";
  draftRender(content.training,"training").forEach((item)=>{
    const row=document.createElement("article");row.className="timeline-item reveal is-visible";
    const marker=document.createElement("div");marker.className="timeline-marker";marker.appendChild(createIcon(item.icon,"fa-solid fa-certificate"));
    const body=document.createElement("div");body.className="timeline-card glass-card";
    const label=document.createElement("span");label.className="timeline-label";label.textContent=textFor(item,"label");
    const h3=document.createElement("h3");h3.textContent=textFor(item,"title");
    const org=document.createElement("p");org.textContent=textFor(item,"org");
    const meta=document.createElement("span");meta.className="timeline-year";meta.textContent=textFor(item,"meta");
    body.append(label,h3,org,meta);row.append(marker,body);box.appendChild(row);
  });
}
function draftRender(items){return items;}
function renderContent(){renderSkills();renderProjects();renderTraining();}

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
  document.getElementById("email-link").href=safeEmail(settings.email)?"mailto:"+settings.email:"#";
  copyEmailButton.dataset.email=settings.email;
  ["linkedin","github","whatsapp","facebook","instagram"].forEach(name=>setSocial(name+"-link",settings[name]));
  currentYear.textContent=String(new Date().getFullYear());
  applyLogo();
  updateTheme();
  renderContent();
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
function fillFields(map){
  Object.entries(map).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.value=value??"";});
}
function populateSettingsForm(){
  fillFields({
    "setting-site-en":draftSettings.siteEn,"setting-site-ar":draftSettings.siteAr,"setting-subtitle-en":draftSettings.subtitleEn,"setting-subtitle-ar":draftSettings.subtitleAr,
    "setting-logo":draftSettings.logoUrl,"setting-accent":draftSettings.accent,
    "setting-hero-badge-en":draftSettings.heroBadgeEn,"setting-hero-badge-ar":draftSettings.heroBadgeAr,"setting-hero-title-en":draftSettings.heroTitleEn,"setting-hero-title-ar":draftSettings.heroTitleAr,
    "setting-hero-highlight-en":draftSettings.heroHighlightEn,"setting-hero-highlight-ar":draftSettings.heroHighlightAr,"setting-hero-description-en":draftSettings.heroDescriptionEn,"setting-hero-description-ar":draftSettings.heroDescriptionAr,
    "setting-about-title-en":draftSettings.aboutTitleEn,"setting-about-title-ar":draftSettings.aboutTitleAr,"setting-about-lead-en":draftSettings.aboutLeadEn,"setting-about-lead-ar":draftSettings.aboutLeadAr,
    "setting-about-text-en":draftSettings.aboutTextEn,"setting-about-text-ar":draftSettings.aboutTextAr,"setting-contact-title-en":draftSettings.contactTitleEn,"setting-contact-title-ar":draftSettings.contactTitleAr,
    "setting-contact-text-en":draftSettings.contactTextEn,"setting-contact-text-ar":draftSettings.contactTextAr,"setting-email":draftSettings.email,"setting-location-en":draftSettings.locationEn,"setting-location-ar":draftSettings.locationAr,
    "setting-linkedin":draftSettings.linkedin,"setting-github":draftSettings.github,"setting-whatsapp":draftSettings.whatsapp,"setting-facebook":draftSettings.facebook,"setting-instagram":draftSettings.instagram,
    "setting-language":draftSettings.language,"setting-theme":draftSettings.theme,"setting-footer-en":draftSettings.footerEn,"setting-footer-ar":draftSettings.footerAr
  });
}
function readSettingsForm(){
  const get=id=>document.getElementById(id)?.value.trim()??"";
  const email=get("setting-email");
  if(email&&!safeEmail(email)){showManagerFeedback(t("emailInvalid"),false);return null;}
  draftSettings={
    ...draftSettings,
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
    email:email||DEFAULT_SETTINGS.email,locationEn:get("setting-location-en")||DEFAULT_SETTINGS.locationEn,locationAr:get("setting-location-ar")||DEFAULT_SETTINGS.locationAr,
    linkedin:safeUrl(get("setting-linkedin")),github:safeUrl(get("setting-github")),whatsapp:safeUrl(get("setting-whatsapp")),facebook:safeUrl(get("setting-facebook")),instagram:safeUrl(get("setting-instagram")),
    language:document.getElementById("setting-language").value==="ar"?"ar":"en",theme:document.getElementById("setting-theme").value==="light"?"light":"dark",
    footerEn:get("setting-footer-en")||DEFAULT_SETTINGS.footerEn,footerAr:get("setting-footer-ar")||DEFAULT_SETTINGS.footerAr
  };
  return draftSettings;
}
function openSettings(){
  draftSettings=clone(settings);draftContent=clone(content);editorState={skills:-1,projects:-1,training:-1};
  populateSettingsForm();renderManagerLists();clearAllEditors();setManagerTab(activeManager);
  settingsModal.classList.remove("hidden");document.body.classList.add("settings-open");
}
function closeSettings(){settingsModal.classList.add("hidden");document.body.classList.remove("settings-open");}
function showManagerFeedback(message,success=true){
  const el=document.getElementById("manager-feedback");if(!el)return;
  el.textContent=message;el.classList.toggle("success",success);clearTimeout(showManagerFeedback.timer);
  showManagerFeedback.timer=setTimeout(()=>{el.textContent="";el.classList.remove("success");},2600);
}
function setManagerTab(type){
  activeManager=type;
  document.querySelectorAll(".manager-tab").forEach(btn=>{const active=btn.dataset.managerTab===type;btn.classList.toggle("active",active);btn.setAttribute("aria-selected",String(active));});
  document.querySelectorAll("[data-manager-panel]").forEach(panel=>panel.classList.toggle("active",panel.dataset.managerPanel===type));
  renderManagerList(type);fillEditor(type,editorState[type]);
}
function renderManagerLists(){
  ["skills","projects","training"].forEach(renderManagerList);
}
function renderManagerList(type){
  const box=document.getElementById(type+"-manager-list");if(!box)return;box.textContent="";
  const items=draftContent[type]||[];
  if(!items.length){const empty=document.createElement("div");empty.className="manager-empty";empty.textContent=t("noItems");box.appendChild(empty);}
  items.forEach((item,index)=>{
    const row=document.createElement("div");row.className="manager-row";
    const info=document.createElement("div");info.className="manager-row-info";
    const title=document.createElement("strong");title.textContent=textFor(item,type==="skills"?"name":type==="projects"?"title":"title");info.appendChild(title);
    const sub=document.createElement("span");sub.textContent=type==="skills"?textFor(item,"cat"):type==="projects"?textFor(item,"tag"):textFor(item,"org");info.appendChild(sub);
    const actions=document.createElement("div");actions.className="manager-row-actions";
    [["up","↑",index===0],["down","↓",index===items.length-1]].forEach(([action,label,disabled])=>{const b=document.createElement("button");b.type="button";b.className="mini-button";b.dataset.managerAction=action;b.dataset.managerType=type;b.dataset.managerIndex=String(index);b.disabled=disabled;b.textContent=label;b.title=t(action==="up"?"moveUp":"moveDown");actions.appendChild(b);});
    const edit=document.createElement("button");edit.type="button";edit.className="mini-button";edit.dataset.managerAction="edit";edit.dataset.managerType=type;edit.dataset.managerIndex=String(index);edit.textContent="✎";edit.title=t("editItem");actions.appendChild(edit);
    const del=document.createElement("button");del.type="button";del.className="mini-button danger";del.dataset.managerAction="delete";del.dataset.managerType=type;del.dataset.managerIndex=String(index);del.textContent="×";del.title=t("deleteItem");actions.appendChild(del);
    row.append(info,actions);box.appendChild(row);
  });
  const add=document.createElement("button");add.type="button";add.className="btn btn-secondary manager-add";add.dataset.editorClear=type;add.innerHTML='<i class="fa-solid fa-plus" aria-hidden="true"></i> <span>'+t("addNew")+"</span>";box.appendChild(add);
}
function clearEditor(type){
  editorState[type]=-1;
  const selectors={
    skills:["skill-name-en","skill-name-ar","skill-desc-en","skill-desc-ar","skill-cat-en","skill-cat-ar","skill-icon"],
    projects:["project-title-en","project-title-ar","project-desc-en","project-desc-ar","project-tag-en","project-tag-ar","project-label-en","project-label-ar","project-tech","project-link","project-icon","project-note-en","project-note-ar"],
    training:["training-title-en","training-title-ar","training-org-en","training-org-ar","training-label-en","training-label-ar","training-meta-en","training-meta-ar","training-icon"]
  };
  selectors[type].forEach(id=>{const el=document.getElementById(id);if(el)el.value="";});
  if(type==="projects"){document.getElementById("project-visual").value="generic-visual";document.getElementById("project-featured").checked=false;}
  const mode=document.getElementById(({skills:"skill",projects:"project",training:"training"})[type]+"-editor-mode");
  if(mode)mode.textContent=t("editingNew");
}
function fillEditor(type,index){
  if(index<0){clearEditor(type);return;}
  const item=(draftContent[type]||[])[index];if(!item)return clearEditor(type);
  editorState[type]=index;
  const values=type==="skills"?{
    "skill-name-en":item.nameEn,"skill-name-ar":item.nameAr,"skill-desc-en":item.descEn,"skill-desc-ar":item.descAr,"skill-cat-en":item.catEn,"skill-cat-ar":item.catAr,"skill-icon":item.icon
  }:type==="projects"?{
    "project-title-en":item.titleEn,"project-title-ar":item.titleAr,"project-desc-en":item.descEn,"project-desc-ar":item.descAr,"project-tag-en":item.tagEn,"project-tag-ar":item.tagAr,"project-label-en":item.labelEn,"project-label-ar":item.labelAr,
    "project-tech":(item.tech||[]).join(", "),"project-link":item.link||"","project-icon":item.icon,"project-visual":item.visual||"generic-visual","project-featured":item.featured?"__CHECKED__":0,
    "project-note-en":item.noteEn||"","project-note-ar":item.noteAr||""
  }:{"training-title-en":item.titleEn,"training-title-ar":item.titleAr,"training-org-en":item.orgEn,"training-org-ar":item.orgAr,"training-label-en":item.labelEn,"training-label-ar":item.labelAr,"training-meta-en":item.metaEn,"training-meta-ar":item.metaAr,"training-icon":item.icon};
  Object.entries(values).forEach(([id,value])=>{const el=document.getElementById(id);if(!el)return;if(value==="__CHECKED__")el.checked=true;else el.value=value??"";});
  const mode=document.getElementById(({skills:"skill",projects:"project",training:"training"})[type]+"-editor-mode");
  if(mode)mode.textContent=t("editingExisting");
}
function readEditor(type){
  const get=id=>document.getElementById(id)?.value.trim()??"";
  if(type==="skills"){
    const en=get("skill-name-en"),ar=get("skill-name-ar");if(!en&&!ar){showManagerFeedback(t("nameRequired"),false);return null;}
    return {nameEn:en||ar,nameAr:ar||en,descEn:get("skill-desc-en"),descAr:get("skill-desc-ar")||get("skill-desc-en"),catEn:get("skill-cat-en"),catAr:get("skill-cat-ar")||get("skill-cat-en"),icon:iconClass(get("skill-icon"),"fa-solid fa-code")};
  }
  if(type==="projects"){
    const en=get("project-title-en"),ar=get("project-title-ar");if(!en&&!ar){showManagerFeedback(t("nameRequired"),false);return null;}
    const rawLink=get("project-link"),link=rawLink?safeUrl(rawLink):"";
    if(rawLink&&!link){showManagerFeedback(t("urlInvalid"),false);return null;}
    return {titleEn:en||ar,titleAr:ar||en,descEn:get("project-desc-en"),descAr:get("project-desc-ar")||get("project-desc-en"),tagEn:get("project-tag-en"),tagAr:get("project-tag-ar")||get("project-tag-en"),labelEn:get("project-label-en"),labelAr:get("project-label-ar")||get("project-label-en"),tech:get("project-tech").split(",").map(v=>v.trim()).filter(Boolean).slice(0,12),link,icon:iconClass(get("project-icon"),"fa-solid fa-code"),visual:VISUAL_STYLES.includes(document.getElementById("project-visual").value)?document.getElementById("project-visual").value:"generic-visual",featured:document.getElementById("project-featured").checked,noteEn:get("project-note-en"),noteAr:get("project-note-ar")||get("project-note-en")};
  }
  const en=get("training-title-en"),ar=get("training-title-ar");if(!en&&!ar){showManagerFeedback(t("nameRequired"),false);return null;}
  return {titleEn:en||ar,titleAr:ar||en,orgEn:get("training-org-en"),orgAr:get("training-org-ar")||get("training-org-en"),labelEn:get("training-label-en"),labelAr:get("training-label-ar")||get("training-label-en"),metaEn:get("training-meta-en"),metaAr:get("training-meta-ar")||get("training-meta-en"),icon:iconClass(get("training-icon"),"fa-solid fa-certificate")};
}
function persistEditor(type){
  const value=readEditor(type);if(!value)return;
  const index=editorState[type];const list=draftContent[type];
  if(index>=0&&index<list.length){list[index]={...list[index],...value};}
  else{list.push({id:type+"-"+Date.now(),...value});}
  renderManagerList(type);clearEditor(type);showManagerFeedback(t("contentSaved"),true);
}
function managerAction(event){
  const button=event.target.closest("[data-manager-action]");if(!button)return;
  const type=button.dataset.managerType,index=Number(button.dataset.managerIndex),list=draftContent[type];if(!list?.[index])return;
  const action=button.dataset.managerAction;
  if(action==="edit"){fillEditor(type,index);return;}
  if(action==="delete"){if(!window.confirm(t("confirmDelete")))return;list.splice(index,1);clearEditor(type);renderManagerList(type);return;}
  if(action==="up"&&index>0)[list[index-1],list[index]]=[list[index],list[index-1]];
  if(action==="down"&&index<list.length-1)[list[index+1],list[index]]=[list[index],list[index+1]];
  renderManagerList(type);if(editorState[type]===index)clearEditor(type);
}
function saveAll(){
  const nextSettings=readSettingsForm();if(!nextSettings)return;
  settings=nextSettings;content=clone(draftContent);saveSettings();saveContent();applyContent();closeSettings();
}
function resetAll(){
  draftSettings=clone(DEFAULT_SETTINGS);draftContent=clone(DEFAULT_CONTENT);editorState={skills:-1,projects:-1,training:-1};
  populateSettingsForm();renderManagerLists();clearAllEditors();showManagerFeedback(t("contentSaved"),true);
}
function clearAllEditors(){["skills","projects","training"].forEach(clearEditor);}
function setScrollUI(){
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
document.addEventListener("click",event=>{
  if(navMenu.classList.contains("active")&&!navMenu.contains(event.target)&&!navToggle.contains(event.target))setMenu(false);
  const clear=event.target.closest("[data-editor-clear]");if(clear&&clear.dataset.editorClear){clearEditor(clear.dataset.editorClear);if(clear.classList.contains("manager-add"))document.getElementById(clear.dataset.editorClear+"-editor")?.scrollIntoView({block:"nearest"});}
});
document.addEventListener("keydown",event=>{if(event.key==="Escape"){setMenu(false);closeSettings();}});
settingsToggle.addEventListener("click",openSettings);
document.querySelectorAll("[data-close-settings]").forEach(el=>el.addEventListener("click",closeSettings));
languageToggle.addEventListener("click",()=>{
  settings.language=settings.language==="en"?"ar":"en";saveSettings();applyContent();
  if(!settingsModal.classList.contains("hidden")){populateSettingsForm();renderManagerLists();setManagerTab(activeManager);}
});
themeToggle.addEventListener("click",()=>{settings.theme=settings.theme==="dark"?"light":"dark";saveSettings();updateTheme();});
document.getElementById("save-settings").addEventListener("click",saveAll);
document.getElementById("reset-settings").addEventListener("click",resetAll);
document.querySelectorAll(".manager-tab").forEach(btn=>btn.addEventListener("click",()=>setManagerTab(btn.dataset.managerTab)));
document.getElementById("skill-editor").addEventListener("submit",event=>{event.preventDefault();persistEditor("skills");});
document.getElementById("project-editor").addEventListener("submit",event=>{event.preventDefault();persistEditor("projects");});
document.getElementById("training-editor").addEventListener("submit",event=>{event.preventDefault();persistEditor("training");});
["skills","projects","training"].forEach(type=>document.getElementById(type+"-manager-list").addEventListener("click",managerAction));
copyEmailButton.addEventListener("click",async()=>{
  if(!settings.email)return;
  try{await copyText(settings.email);showCopy(settings.language==="ar"?"تم نسخ الإيميل":"Email copied to clipboard.",true);}
  catch{showCopy(settings.language==="ar"?"فشل النسخ، استخدم زر الإيميل":"Copy failed. Use the email button instead.",false);}
});
backToTop.addEventListener("click",()=>window.scrollTo({top:0,behavior:prefersReducedMotion.matches?"auto":"smooth"}));
window.addEventListener("scroll",setScrollUI,{passive:true});window.addEventListener("resize",setScrollUI);
function setupReveal(){
  if(prefersReducedMotion.matches||!("IntersectionObserver" in window)){document.querySelectorAll(".reveal").forEach(el=>el.classList.add("is-visible"));return;}
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target);}}),{threshold:.12});
  document.querySelectorAll(".reveal:not(.is-visible)").forEach(el=>observer.observe(el));
}
function setupActiveSection(){
  if(!("IntersectionObserver" in window))return;
  const map=new Map(navLinks.map(link=>[link.getAttribute("href").slice(1),link]));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    navLinks.forEach(link=>{link.classList.remove("active");link.removeAttribute("aria-current");});
    const active=map.get(entry.target.id);
    if(active){active.classList.add("active");active.setAttribute("aria-current","page");}
  }),{rootMargin:"-22% 0px -62% 0px",threshold:0});
  sections.forEach(section=>observer.observe(section));
}
currentYear.textContent=String(new Date().getFullYear());
setMenu(false);applyContent();populateSettingsForm();clearAllEditors();setupReveal();setupActiveSection();setScrollUI();