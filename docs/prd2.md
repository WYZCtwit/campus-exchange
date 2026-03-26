<!-- Design System -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Message Center | Academic Atelier</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&amp;family=Manrope:wght@200..800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "error-dim": "#9f0519",
              "primary": "#0053ca",
              "on-tertiary-fixed": "#433700",
              "primary-fixed-dim": "#5f8fff",
              "surface-variant": "#d8daff",
              "on-tertiary": "#fff2ce",
              "secondary-fixed": "#5cfd80",
              "tertiary": "#6d5a00",
              "background": "#f7f5ff",
              "inverse-primary": "#5a8cff",
              "outline": "#6f749e",
              "on-secondary": "#cfffce",
              "tertiary-dim": "#5f4e00",
              "tertiary-container": "#fdd400",
              "primary-container": "#769dff",
              "surface-container-lowest": "#ffffff",
              "on-error-container": "#570008",
              "tertiary-fixed-dim": "#edc600",
              "on-error": "#ffefee",
              "error-container": "#fb5151",
              "on-primary-container": "#001f56",
              "secondary-fixed-dim": "#4bee74",
              "on-surface-variant": "#545981",
              "on-primary-fixed-variant": "#002869",
              "secondary": "#006a28",
              "surface-container-high": "#dfe0ff",
              "surface-tint": "#0053ca",
              "on-secondary-fixed": "#004819",
              "secondary-dim": "#005d22",
              "secondary-container": "#5cfd80",
              "on-tertiary-fixed-variant": "#645300",
              "on-primary-fixed": "#000000",
              "primary-fixed": "#769dff",
              "outline-variant": "#a5aad7",
              "error": "#b31b25",
              "inverse-on-surface": "#959ac6",
              "on-secondary-container": "#005d22",
              "on-surface": "#262c51",
              "on-background": "#262c51",
              "surface-dim": "#cdd1ff",
              "surface": "#f7f5ff",
              "surface-bright": "#f7f5ff",
              "on-primary": "#f1f2ff",
              "on-tertiary-container": "#594a00",
              "inverse-surface": "#05092f",
              "surface-container-low": "#f0efff",
              "surface-container-highest": "#d8daff",
              "primary-dim": "#0049b2",
              "tertiary-fixed": "#fdd400",
              "surface-container": "#e6e6ff",
              "on-secondary-fixed-variant": "#006827"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Manrope"],
              "label": ["Manrope"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
        }
        body {
            background-color: #f7f5ff;
            color: #262c51;
            font-family: 'Manrope', sans-serif;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface selection:bg-primary-container selection:text-on-primary-container">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-none">
<div class="flex items-center justify-between px-6 h-20 w-full max-w-none">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-surface">
<img alt="User Profile" class="w-full h-full object-cover" data-alt="Close up portrait of a smiling young student in a campus library setting, soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYokKjFhaDMMEcl8z2RVD4JfZ1ZJyr5lfifN-ENSNMm9C7B8-LUjbU7q0x2WnemBppxI_K7GcSG3eMlD4ZNJakViZwl---9r0r1PxrexQjqlNAwtmDU9n4fjSN8u1HrBENaMfR6fFeOa9W6AmdfC-zbA9wuIw-B1H_A-FVFNTrNHdjmr5I-3kM7zjHqefZWpl5XAmCIPJZIAMIU2tvEYt9PxJtAZ-ExMRezwco4zzsWFoX9eVx2PhzYwcuGtwRdPD1lyj6dvuJ4gSV"/>
</div>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-slate-900 dark:text-slate-50 text-xl">Messages</h1>
</div>
<div class="flex items-center gap-2">
<button class="p-2 rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined text-blue-700 dark:text-blue-400">search</span>
</button>
<button class="p-2 rounded-full hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined text-blue-700 dark:text-blue-400">more_vert</span>
</button>
</div>
</div>
</header>
<main class="pt-24 pb-32 px-6 max-w-3xl mx-auto min-h-screen">
<!-- Search & Filter Area -->
<section class="mb-8">
<div class="relative group">
<div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline">search</span>
</div>
<input class="w-full bg-surface-container-lowest border-none h-14 pl-12 pr-4 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/20 transition-all text-body-lg placeholder:text-on-surface-variant/50" placeholder="Search chats, skills, or textbooks..." type="text"/>
</div>
<div class="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
<button class="px-5 py-2 rounded-full bg-primary text-on-primary font-semibold text-sm whitespace-nowrap">All Chats</button>
<button class="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">Unread</button>
<button class="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">Skill Swap</button>
<button class="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant font-semibold text-sm whitespace-nowrap hover:bg-surface-container-high transition-colors">Marketplace</button>
</div>
</section>
<!-- Conversation List -->
<section class="space-y-4">
<!-- Conversation Item: Python Tutor -->
<div class="group relative bg-surface-container-lowest p-5 rounded-lg flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)] transition-all cursor-pointer">
<div class="relative flex-shrink-0">
<img alt="Python Tutor" class="w-14 h-14 rounded-full object-cover" data-alt="Professional headshot of a young male teaching assistant, wearing glasses, studio lighting, clean background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAuDbTjJu8m3M4Q0JdDO4w-JQ3hrCr4yXXFGelMzr58d4hKIqy_ASR0XUeHwqUWSHKvMPfUml78J5yrRS_1wo3Pb8IhOKZBJ4dTNMGiSJRkVFQxv0p4kgPxoAV_dVQjSbWtEHuuBpux2Essb5HOSXL6l2UgEhwFb4_Gh6_SYnUoqSHQ2EVBG34wy-gXTjGZutRFbnXCzZnE5oR-cbS9gySomox6qmsI0CyW34vtLSU7BLlwq8pgt8b-S49iELMb8G5eJk_8SWIhkpxp"/>
<div class="absolute bottom-0 right-0 w-4 h-4 bg-secondary border-2 border-white rounded-full"></div>
</div>
<div class="flex-grow min-w-0">
<div class="flex justify-between items-baseline mb-1">
<h3 class="font-headline font-bold text-on-surface truncate">Alex Chen (Python Tutor)</h3>
<span class="text-xs font-semibold text-primary">2m ago</span>
</div>
<p class="text-on-surface-variant text-sm truncate pr-8">Sure! I can help you with the Flask integration tomorrow at 4 PM.</p>
</div>
<div class="flex-shrink-0 flex flex-col items-end gap-2">
<div class="w-2.5 h-2.5 bg-primary rounded-full"></div>
</div>
</div>
<!-- Conversation Item: Design Help -->
<div class="group relative bg-surface-container-lowest p-5 rounded-lg flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)] transition-all cursor-pointer">
<div class="relative flex-shrink-0">
<img alt="Design Help" class="w-14 h-14 rounded-full object-cover" data-alt="Profile photo of a creative young woman with artistic accessories, colorful vibrant background, soft focus" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1EChanpEugAiMZAHNAUQ41NI5gXoRXph4xN0dGHtVo-Kckm9-w9zaeahM37qyQm1Lw153KyiqJbppcmCO9AtQtFowC7U3OXSeggyeKHqcqqH4IJKmJN5ch84ukJuf-cQUH6I0LL7gJxHGTPoWgBo3trM3ktkd5UPcMljuBccyvYQvmbcDTs4uKW8bVIreLDgC3cc044i4pwmgXfAnHGJJ3iyw3chXhzVmKr7BpoUHs1cyoCLnqJTOtZ6U2V1eaC5e0rr9JQ8u8vT1"/>
</div>
<div class="flex-grow min-w-0">
<div class="flex justify-between items-baseline mb-1">
<h3 class="font-headline font-bold text-on-surface truncate">Sarah Miller (UI/UX)</h3>
<span class="text-xs font-medium text-on-surface-variant">1h ago</span>
</div>
<p class="text-on-surface-variant text-sm truncate">The portfolio critique is done. Check the shared Figma link!</p>
</div>
</div>
<!-- Conversation Item: Textbook Trade -->
<div class="group relative bg-surface-container-lowest p-5 rounded-lg flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)] transition-all cursor-pointer">
<div class="relative flex-shrink-0">
<div class="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-secondary-container text-2xl">menu_book</span>
</div>
</div>
<div class="flex-grow min-w-0">
<div class="flex justify-between items-baseline mb-1">
<h3 class="font-headline font-bold text-on-surface truncate">Used Textbook Trade</h3>
<span class="text-xs font-medium text-on-surface-variant">Yesterday</span>
</div>
<p class="font-bold text-on-surface text-sm truncate pr-8">Is the Organic Chemistry 2nd Ed still available?</p>
</div>
<div class="flex-shrink-0 flex flex-col items-end gap-2">
<div class="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">3</div>
</div>
</div>
<!-- Conversation Item: Project Partner -->
<div class="group relative bg-surface-container-lowest p-5 rounded-lg flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)] transition-all cursor-pointer">
<div class="relative flex-shrink-0">
<img alt="Project Partner" class="w-14 h-14 rounded-full object-cover" data-alt="Portrait of a male student wearing a hoodie, campus courtyard background, bright daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdpNG3wIOa83IAetl098t-QgmelZ3cbawn2ME8XZjgRA-JmF_NTV72TV_3QEbCRjZOQ-CWmnsBMiVSNA39N9NmOhnz9Wsetfi1IvhHr6Nda_UPcys_711BYfJJ6MokCUrioQQ7iXuOF_fzm8g36NjQyR1gle9bGBMSgAxtriLwCXP4EBXXrexkhEwlQXgBavp1zL8i21GBiVew5Cy58s2IHALsP2FnUFKpckpq50cTK1bUGGemRfREnqGxNM3sX-KASBVsrpwtEO99"/>
</div>
<div class="flex-grow min-w-0">
<div class="flex justify-between items-baseline mb-1">
<h3 class="font-headline font-bold text-on-surface truncate">Jordan Lee</h3>
<span class="text-xs font-medium text-on-surface-variant">Feb 24</span>
</div>
<p class="text-on-surface-variant text-sm truncate">I've uploaded the draft to the shared drive.</p>
</div>
</div>
<!-- Conversation Item: Achievement -->
<div class="group relative bg-surface-container-low/50 p-5 rounded-lg flex items-center gap-4 hover:shadow-[0_10px_30px_rgba(38,44,81,0.04)] transition-all cursor-pointer overflow-hidden">
<!-- Academic Atelier Style Accent -->
<div class="absolute top-0 right-0 w-24 h-24 bg-tertiary-container/10 -mr-8 -mt-8 rounded-full blur-2xl"></div>
<div class="relative flex-shrink-0">
<div class="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center">
<span class="material-symbols-outlined text-on-tertiary-container text-2xl" style="font-variation-settings: 'FILL' 1;">stars</span>
</div>
</div>
<div class="flex-grow min-w-0">
<div class="flex justify-between items-baseline mb-1">
<h3 class="font-headline font-bold text-on-surface truncate">Campus Rewards</h3>
<span class="text-xs font-medium text-on-surface-variant">Feb 22</span>
</div>
<p class="text-on-surface-variant text-sm truncate">You've earned 50 credits for helping a peer!</p>
</div>
</div>
</section>
<!-- Empty State / Footer Suggestion -->
<div class="mt-12 text-center">
<p class="text-on-surface-variant text-sm italic">"Collaboration is the core of campus life."</p>
</div>
</main>
<!-- FAB for New Message -->
<button class="fixed bottom-32 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40">
<span class="material-symbols-outlined text-2xl">edit_square</span>
</button>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 w-full z-50 rounded-t-[2rem] bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-[0_-10px_40px_rgba(38,44,81,0.06)]">
<div class="flex justify-around items-center w-full px-4 pt-3 pb-6">
<!-- 首页 Tab -->
<a class="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined">school</span>
<span class="font-['Manrope'] text-xs font-semibold mt-1">首页</span>
</a>
<!-- 交换 Tab -->
<a class="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined">swap_horiz</span>
<span class="font-['Manrope'] text-xs font-semibold mt-1">交换</span>
</a>
<!-- 消息 Tab (ACTIVE) -->
<a class="flex flex-col items-center justify-center bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 rounded-2xl px-5 py-2 active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">forum</span>
<span class="font-['Manrope'] text-xs font-semibold mt-1">消息</span>
</a>
<!-- 我的 Tab -->
<a class="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 px-5 py-2 hover:opacity-80 transition-opacity active:scale-90 duration-200" href="#">
<span class="material-symbols-outlined">person</span>
<span class="font-['Manrope'] text-xs font-semibold mt-1">我的</span>
</a>
</div>
</nav>
</body></html>

<!-- 消息中心 - 极简电商风 -->
<!DOCTYPE html>

<html lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>二手书转让模板 - 学术工坊</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary-fixed": "#769dff",
                        "on-secondary-container": "#005d22",
                        "on-tertiary": "#fff2ce",
                        "surface": "#f7f5ff",
                        "on-background": "#262c51",
                        "secondary": "#006a28",
                        "surface-container-low": "#f0efff",
                        "on-error": "#ffefee",
                        "tertiary": "#6d5a00",
                        "primary": "#0053ca",
                        "on-primary-fixed": "#000000",
                        "outline-variant": "#a5aad7",
                        "error-container": "#fb5151",
                        "secondary-fixed-dim": "#4bee74",
                        "secondary-fixed": "#5cfd80",
                        "surface-container-lowest": "#ffffff",
                        "outline": "#6f749e",
                        "surface-bright": "#f7f5ff",
                        "on-primary": "#f1f2ff",
                        "primary-dim": "#0049b2",
                        "surface-container-high": "#dfe0ff",
                        "error-dim": "#9f0519",
                        "primary-container": "#769dff",
                        "on-secondary": "#cfffce",
                        "on-tertiary-fixed": "#433700",
                        "surface-variant": "#d8daff",
                        "on-primary-fixed-variant": "#002869",
                        "on-surface-variant": "#545981",
                        "on-secondary-fixed": "#004819",
                        "inverse-surface": "#05092f",
                        "on-primary-container": "#001f56",
                        "tertiary-fixed-dim": "#edc600",
                        "primary-fixed-dim": "#5f8fff",
                        "background": "#f7f5ff",
                        "tertiary-fixed": "#fdd400",
                        "surface-dim": "#cdd1ff",
                        "surface-container": "#e6e6ff",
                        "inverse-primary": "#5a8cff",
                        "secondary-dim": "#005d22",
                        "error": "#b31b25",
                        "on-tertiary-fixed-variant": "#645300",
                        "on-tertiary-container": "#594a00",
                        "on-error-container": "#570008",
                        "tertiary-dim": "#5f4e00",
                        "on-secondary-fixed-variant": "#006827",
                        "on-surface": "#262c51",
                        "tertiary-container": "#fdd400",
                        "secondary-container": "#5cfd80",
                        "surface-container-highest": "#d8daff",
                        "inverse-on-surface": "#959ac6",
                        "surface-tint": "#0053ca"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Manrope', sans-serif; }
        h1, h2, h3 { font-family: 'Plus Jakarta Sans', sans-serif; }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="w-full top-0 sticky z-50 bg-[#f7f5ff] dark:bg-slate-950 flex items-center justify-between px-6 py-4 w-full">
<div class="flex items-center gap-4">
<button class="text-[#0053ca] dark:text-[#769dff] active:scale-95 duration-200">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="text-xl font-bold text-[#262c51] dark:text-[#f0efff] font-['Plus_Jakarta_Sans'] tracking-tight">Sell Textbook</h1>
</div>
<button class="text-[#545981] dark:text-slate-400 hover:bg-[#dfe0ff] dark:hover:bg-slate-800 transition-colors p-2 rounded-full active:scale-95 duration-200">
<span class="material-symbols-outlined">more_vert</span>
</button>
</header>
<main class="max-w-2xl mx-auto px-6 py-8 space-y-8">
<!-- Book Cover Section: Organic Editorialism Asymmetry -->
<section class="relative group">
<div class="bg-surface-container-low rounded-xl overflow-hidden aspect-[3/4] max-w-xs mx-auto shadow-sm relative z-10">
<img class="w-full h-full object-cover" data-alt="thick professional calculus textbook titled Early Transcendentals on a clean minimalist library desk with soft overhead studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlXUb1aaRv3docLkr_fC234FbvM7MNgFsKplMOvAzIuiQXNw4Y4YAc5pDKjsItYqNGAXS7ojkUOrv1YS4pvveWqRMLYKAeRejpAOx5RfIbEPnMgKB03KpQsXK9S5HgbxYmXkWJK_QTxBtNjtpvW1BRXz2ndXdBvtlI3BJ-0oCBu1ytnrrqU4e1vcjKLRS3pUFabmmp9WwodeMCPIlYyefOmi2OhhrrSoDikSJm4FQga-w1Re_ARJrmrhHwmxsOPQgS1Hy6EgJO52I_"/>
<div class="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
</div>
<!-- Decorative Accent Elements -->
<div class="absolute -top-4 -right-4 w-32 h-32 bg-secondary-container/20 rounded-full blur-2xl -z-10"></div>
<div class="absolute -bottom-8 -left-8 w-48 h-48 bg-primary-container/10 rounded-full blur-3xl -z-10"></div>
<button class="absolute bottom-4 right-1/2 translate-x-1/2 flex items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg text-primary text-sm font-bold border border-outline-variant/15 active:scale-95 transition-transform">
<span class="material-symbols-outlined text-sm">photo_camera</span>
                更换封面
            </button>
</section>
<!-- Book Information Cards: Layered Surface Architecture -->
<div class="space-y-6">
<section class="bg-surface-container-lowest rounded-lg p-6 shadow-[0_20px_40px_rgba(38,44,81,0.06)] border border-outline-variant/10">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-primary">book_5</span>
<h2 class="text-lg font-extrabold tracking-tight">书籍信息</h2>
</div>
<div class="space-y-5">
<div class="group">
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1.5 ml-1">书名 Title</label>
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface font-semibold focus:ring-2 focus:ring-primary/30 transition-shadow outline-none" type="text" value="Calculus: Early Transcendentals"/>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="group">
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1.5 ml-1">作者 Author</label>
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface font-medium focus:ring-2 focus:ring-primary/30 transition-shadow outline-none" type="text" value="James Stewart"/>
</div>
<div class="group">
<label class="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1.5 ml-1">ISBN</label>
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface font-medium focus:ring-2 focus:ring-primary/30 transition-shadow outline-none" type="text" value="978-1337275347"/>
</div>
</div>
</div>
</section>
<!-- Condition Section: Interactive Chips -->
<section class="bg-surface-container-lowest rounded-lg p-6 shadow-[0_20px_40px_rgba(38,44,81,0.06)] border border-outline-variant/10">
<div class="flex items-center gap-3 mb-6">
<span class="material-symbols-outlined text-secondary">verified</span>
<h2 class="text-lg font-extrabold tracking-tight">品相状况</h2>
</div>
<div class="flex flex-wrap gap-3">
<button class="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-5 py-2.5 rounded-full font-bold shadow-md active:scale-95 transition-all">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                        全新 (Like New)
                    </button>
<button class="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2.5 rounded-full font-semibold transition-colors">
                        良好 (Good)
                    </button>
<button class="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2.5 rounded-full font-semibold transition-colors">
                        一般 (Fair)
                    </button>
<button class="bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high px-5 py-2.5 rounded-full font-semibold transition-colors">
                        较差 (Poor)
                    </button>
</div>
</section>
<!-- Price and Location: Bento Style Row -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
<!-- Price Section -->
<section class="bg-surface-container-lowest rounded-lg p-6 shadow-[0_20px_40px_rgba(38,44,81,0.06)] border border-outline-variant/10">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-tertiary">payments</span>
<h2 class="text-lg font-extrabold tracking-tight">转让价格</h2>
</div>
<div class="flex items-baseline gap-2 bg-surface-container-low rounded-sm px-4 py-3 group-focus-within:ring-2 ring-primary/30 transition-all">
<span class="text-xl font-bold text-on-surface">¥</span>
<input class="bg-transparent border-none p-0 text-2xl font-black text-on-surface w-full focus:ring-0" type="text" value="45.00"/>
</div>
</section>
<!-- Location Section -->
<section class="bg-surface-container-lowest rounded-lg p-6 shadow-[0_20px_40px_rgba(38,44,81,0.06)] border border-outline-variant/10">
<div class="flex items-center gap-3 mb-4">
<span class="material-symbols-outlined text-error">location_on</span>
<h2 class="text-lg font-extrabold tracking-tight">自提地点</h2>
</div>
<button class="w-full flex items-center justify-between bg-surface-container-low rounded-sm px-4 py-3 text-on-surface font-semibold hover:bg-surface-container-high transition-colors text-left group">
<span class="truncate">图书馆主馆一楼咖啡厅</span>
<span class="material-symbols-outlined text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
</button>
</section>
</div>
</div>
</main>
<!-- BottomNavBar (The Shell) -->
<nav class="fixed bottom-0 left-0 w-full p-6 flex justify-around items-center bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 rounded-t-[2rem] shadow-[0_-20px_40px_rgba(38,44,81,0.06)]">
<button class="flex flex-row items-center justify-center gap-2 text-[#545981] dark:text-slate-400 px-6 py-3 hover:opacity-90 active:scale-[0.98] transition-transform">
<span class="material-symbols-outlined">visibility</span>
<span class="font-['Manrope'] text-sm font-semibold">Preview</span>
</button>
<button class="flex flex-row items-center justify-center gap-2 bg-gradient-to-br from-[#0053ca] to-[#769dff] text-white rounded-full px-8 py-3 shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-transform">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
<span class="font-['Manrope'] text-sm font-semibold">Use Template</span>
</button>
</nav>
<!-- Decorative Canvas Elements -->
<div class="fixed top-20 right-[-5%] w-[40vw] h-[40vw] rounded-full bg-primary/5 blur-[100px] -z-20"></div>
<div class="fixed bottom-40 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-secondary/5 blur-[120px] -z-20"></div>
</body></html>

<!-- 二手书模板详情 (Used Book Template) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Post - Campus Atelier</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#b31b25",
                        "outline-variant": "#a5aad7",
                        "inverse-on-surface": "#959ac6",
                        "secondary-container": "#5cfd80",
                        "on-tertiary-fixed-variant": "#645300",
                        "on-primary-fixed": "#000000",
                        "primary-fixed": "#769dff",
                        "surface-container-high": "#dfe0ff",
                        "surface-tint": "#0053ca",
                        "secondary-dim": "#005d22",
                        "on-secondary-fixed": "#004819",
                        "secondary": "#006a28",
                        "primary-dim": "#0049b2",
                        "tertiary-fixed": "#fdd400",
                        "surface-container": "#e6e6ff",
                        "on-secondary-fixed-variant": "#006827",
                        "surface-container-low": "#f0efff",
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-container": "#594a00",
                        "inverse-surface": "#05092f",
                        "on-primary": "#f1f2ff",
                        "on-secondary-container": "#005d22",
                        "on-surface": "#262c51",
                        "on-background": "#262c51",
                        "secondary-fixed": "#5cfd80",
                        "tertiary": "#6d5a00",
                        "background": "#f7f5ff",
                        "outline": "#6f749e",
                        "on-secondary": "#cfffce",
                        "inverse-primary": "#5a8cff",
                        "surface-variant": "#d8daff",
                        "on-tertiary": "#fff2ce",
                        "primary-fixed-dim": "#5f8fff",
                        "on-tertiary-fixed": "#433700",
                        "error-dim": "#9f0519",
                        "primary": "#0053ca",
                        "secondary-fixed-dim": "#4bee74",
                        "on-surface-variant": "#545981",
                        "on-primary-fixed-variant": "#002869",
                        "on-primary-container": "#001f56",
                        "on-error-container": "#570008",
                        "tertiary-fixed-dim": "#edc600",
                        "on-error": "#ffefee",
                        "error-container": "#fb5151",
                        "primary-container": "#769dff",
                        "tertiary-dim": "#5f4e00",
                        "tertiary-container": "#fdd400"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .glass-effect {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-surface font-body text-on-surface selection:bg-primary-container">
<!-- Top Navigation Anchor (Shared Component) -->
<nav class="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm shadow-blue-900/5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">person</span>
</div>
<span class="font-headline text-2xl font-bold tracking-tight text-blue-700">Campus Atelier</span>
</div>
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50/50 transition-all active:scale-95 duration-200">
<span class="material-symbols-outlined text-slate-500">notifications</span>
</button>
</div>
</nav>
<main class="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-10">
<!-- Header Section -->
<header class="space-y-2">
<h1 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface">发布中心</h1>
<p class="text-on-surface-variant font-medium">与校园社区分享你的技能或物品。</p>
</header>
<!-- Post Type Toggle -->
<section class="bg-surface-container-low p-1.5 rounded-lg flex items-center">
<button class="flex-1 py-3 px-4 rounded-DEFAULT bg-surface-container-lowest shadow-sm text-primary font-bold transition-all duration-300">
                技能互换
            </button>
<button class="flex-1 py-3 px-4 rounded-DEFAULT text-on-surface-variant font-semibold hover:text-on-surface transition-all">
                校园集市
            </button>
</section>
<!-- Quick Templates -->
<section class="space-y-4">
<div class="flex items-center justify-between">
<h3 class="font-headline font-bold text-on-surface">常用模板</h3>
<span class="text-xs font-bold text-primary uppercase tracking-wider">快速开始</span>
</div>
<div class="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
<button class="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group">
<div class="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-secondary">description</span>
</div>
<span class="block font-bold text-sm text-on-surface leading-tight">期末笔记</span>
</button>
<button class="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group">
<div class="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary">terminal</span>
</div>
<span class="block font-bold text-sm text-on-surface leading-tight">代码Debug</span>
</button>
<button class="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group">
<div class="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-tertiary">photo_camera</span>
</div>
<span class="block font-bold text-sm text-on-surface leading-tight">人像摄影</span>
</button>
</div>
</section>
<!-- Form Fields -->
<form class="space-y-8">
<!-- Media Upload Area (Asymmetric Layout) -->
<div class="grid grid-cols-4 gap-3">
<div class="col-span-2 row-span-2 aspect-square bg-surface-container-lowest rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary transition-colors">add_a_photo</span>
<span class="text-xs font-bold text-on-surface-variant">添加封面</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container hover:shadow-inner transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
</div>
<div class="space-y-6">
<!-- Title -->
<div class="space-y-2">
<label class="text-sm font-bold text-on-surface-variant ml-1">标题</label>
<input class="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all font-semibold" placeholder="你想提供什么？" type="text"/>
</div>
<!-- Description -->
<div class="space-y-2">
<label class="text-sm font-bold text-on-surface-variant ml-1">详情</label>
<textarea class="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all" placeholder="请详细描述你的服务或物品..." rows="4"></textarea>
</div>
<!-- Trade Preference Section (Specific for Skill Exchange) -->
<div class="bg-surface-container-low rounded-lg p-6 space-y-6">
<div class="flex items-center gap-2">
<div class="w-1.5 h-6 bg-secondary rounded-full"></div>
<h3 class="font-headline font-bold text-on-surface">交易偏好</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="space-y-2">
<label class="text-xs font-extrabold text-secondary uppercase tracking-widest ml-1">我能提供</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm">volunteer_activism</span>
<input class="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-secondary/30" placeholder="例如：Python 辅导" type="text"/>
</div>
</div>
<div class="space-y-2">
<label class="text-xs font-extrabold text-primary uppercase tracking-widest ml-1">我想要</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm">search_check</span>
<input class="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/30" placeholder="例如：UI 设计帮助" type="text"/>
</div>
</div>
</div>
</div>
</div>
<!-- Post Button Container -->
<div class="pt-4">
<button class="w-full bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold py-5 rounded-DEFAULT shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">立即发布</button>
</div>
</form>
</main>
<!-- Bottom Navigation Shell (Shared Component) -->
<div class="fixed bottom-0 left-0 w-full h-20 flex justify-around items-center px-4 pb-safe bg-white/70 backdrop-blur-xl z-50">
<a class="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-blue-600 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined">home</span>
<span class="font-manrope text-[10px] font-semibold mt-1">首页</span>
</a>
<a class="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-blue-600 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined">swap_horizontal_circle</span>
<span class="font-manrope text-[10px] font-semibold mt-1">交换</span>
</a>
<!-- Active State for Post Page (Assuming Market/Add Context) -->
<a class="flex flex-col items-center justify-center bg-blue-100 text-blue-800 rounded-2xl px-5 py-2 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined">add_circle</span>
<span class="font-manrope text-[10px] font-semibold mt-1">发布</span>
</a>
<a class="flex flex-col items-center justify-center text-slate-500 px-5 py-2 hover:text-blue-600 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined">person</span>
<span class="font-manrope text-[10px] font-semibold mt-1">我的</span>
</a>
</div>
<!-- Background Decorative Elements -->
<div class="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
<div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[120px] rounded-full"></div>
<div class="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary-container/10 blur-[100px] rounded-full"></div>
</div>
</body></html>

<!-- 发布页 - 模板与功能 (中文版) -->
<!DOCTYPE html>

<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Post - Campus Atelier</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#b31b25",
                        "outline-variant": "#a5aad7",
                        "inverse-on-surface": "#959ac6",
                        "secondary-container": "#5cfd80",
                        "on-tertiary-fixed-variant": "#645300",
                        "on-primary-fixed": "#000000",
                        "primary-fixed": "#769dff",
                        "surface-container-high": "#dfe0ff",
                        "surface-tint": "#0053ca",
                        "secondary-dim": "#005d22",
                        "on-secondary-fixed": "#004819",
                        "secondary": "#006a28",
                        "primary-dim": "#0049b2",
                        "tertiary-fixed": "#fdd400",
                        "surface-container": "#e6e6ff",
                        "on-secondary-fixed-variant": "#006827",
                        "surface-container-low": "#f0efff",
                        "surface-container-lowest": "#ffffff",
                        "on-tertiary-container": "#594a00",
                        "inverse-surface": "#05092f",
                        "on-primary": "#f1f2ff",
                        "on-secondary-container": "#005d22",
                        "on-surface": "#262c51",
                        "on-background": "#262c51",
                        "secondary-fixed": "#5cfd80",
                        "tertiary": "#6d5a00",
                        "background": "#f7f5ff",
                        "outline": "#6f749e",
                        "on-secondary": "#cfffce",
                        "inverse-primary": "#5a8cff",
                        "surface-variant": "#d8daff",
                        "on-tertiary": "#fff2ce",
                        "primary-fixed-dim": "#5f8fff",
                        "on-tertiary-fixed": "#433700",
                        "error-dim": "#9f0519",
                        "primary": "#0053ca",
                        "secondary-fixed-dim": "#4bee74",
                        "on-surface-variant": "#545981",
                        "on-primary-fixed-variant": "#002869",
                        "on-primary-container": "#001f56",
                        "on-error-container": "#570008",
                        "tertiary-fixed-dim": "#edc600",
                        "on-error": "#ffefee",
                        "error-container": "#fb5151",
                        "primary-container": "#769dff",
                        "tertiary-dim": "#5f4e00",
                        "tertiary-container": "#fdd400"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        .glass-effect {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-surface font-body text-on-surface selection:bg-primary-container">
<!-- Top Navigation Anchor (Shared Component) -->
<nav class="fixed top-0 w-full z-50 flex items-center justify-between px-6 h-16 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm shadow-blue-900/5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">person</span>
</div>
<span class="font-headline text-2xl font-bold tracking-tight text-blue-700">Campus Atelier</span>
</div>
<div class="flex items-center gap-4">
<button class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-blue-50/50 transition-all active:scale-95 duration-200">
<span class="material-symbols-outlined text-slate-500">notifications</span>
</button>
</div>
</nav>
<main class="pt-24 pb-32 px-6 max-w-2xl mx-auto space-y-10">
<!-- Header Section -->
<header class="space-y-2">
<h1 class="font-headline text-3xl font-extrabold tracking-tight text-on-surface">发布中心</h1>
<p class="text-on-surface-variant font-medium">与校园社区分享你的技能或物品。</p>
</header>
<!-- Post Type Toggle -->
<section class="bg-surface-container-low p-1.5 rounded-lg flex items-center">
<button class="flex-1 py-3 px-4 rounded-DEFAULT bg-surface-container-lowest shadow-sm text-primary font-bold transition-all duration-300">
                技能互换
            </button>
<button class="flex-1 py-3 px-4 rounded-DEFAULT text-on-surface-variant font-semibold hover:text-on-surface transition-all">
                校园集市
            </button>
</section>
<!-- Quick Templates -->
<section class="space-y-4">
<div class="flex items-center justify-between">
<h3 class="font-headline font-bold text-on-surface">常用模板</h3>
<span class="text-xs font-bold text-primary uppercase tracking-wider">快速开始</span>
</div>
<div class="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
<button class="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group">
<div class="w-10 h-10 rounded-full bg-secondary-container/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-secondary">description</span>
</div>
<span class="block font-bold text-sm text-on-surface leading-tight">期末笔记</span>
</button>
<button class="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group">
<div class="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-primary">terminal</span>
</div>
<span class="block font-bold text-sm text-on-surface leading-tight">代码Debug</span>
</button>
<button class="flex-none bg-surface-container-lowest p-4 rounded-lg shadow-sm border border-outline-variant/10 hover:shadow-md transition-shadow text-left w-40 group">
<div class="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-tertiary">photo_camera</span>
</div>
<span class="block font-bold text-sm text-on-surface leading-tight">人像摄影</span>
</button>
</div>
</section>
<!-- Form Fields -->
<form class="space-y-8">
<!-- Media Upload Area (Asymmetric Layout) -->
<div class="grid grid-cols-4 gap-3">
<div class="col-span-2 row-span-2 aspect-square bg-surface-container-lowest rounded-lg flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors cursor-pointer group">
<span class="material-symbols-outlined text-4xl text-outline mb-2 group-hover:text-primary transition-colors">add_a_photo</span>
<span class="text-xs font-bold text-on-surface-variant">添加封面</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container hover:shadow-inner transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-all">
<span class="material-symbols-outlined text-outline">add</span>
</div>
</div>
<div class="space-y-6">
<!-- Title -->
<div class="space-y-2">
<label class="text-sm font-bold text-on-surface-variant ml-1">标题</label>
<input class="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all font-semibold" placeholder="你想提供什么？" type="text"/>
</div>
<!-- Description -->
<div class="space-y-2">
<label class="text-sm font-bold text-on-surface-variant ml-1">详情</label>
<textarea class="w-full bg-surface-container-lowest border-none rounded-sm px-5 py-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-primary/30 transition-all" placeholder="请详细描述你的服务或物品..." rows="4"></textarea>
</div>
<!-- Trade Preference Section (Specific for Skill Exchange) -->
<div class="bg-surface-container-low rounded-lg p-6 space-y-6">
<div class="flex items-center gap-2">
<div class="w-1.5 h-6 bg-secondary rounded-full"></div>
<h3 class="font-headline font-bold text-on-surface">交易偏好</h3>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
<div class="space-y-2">
<label class="text-xs font-extrabold text-secondary uppercase tracking-widest ml-1">我能提供</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary text-sm">volunteer_activism</span>
<input class="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-secondary/30" placeholder="例如：Python 辅导" type="text"/>
</div>
</div>
<div class="space-y-2">
<label class="text-xs font-extrabold text-primary uppercase tracking-widest ml-1">我想要</label>
<div class="relative">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-sm">search_check</span>
<input class="w-full bg-surface-container-lowest border-none rounded-sm pl-11 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/30" placeholder="例如：UI 设计帮助" type="text"/>
</div>
</div>
</div>
</div>
</div>
<!-- Post Button Container -->
<div class="pt-4">
<button class="w-full bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold py-5 rounded-DEFAULT shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">立即发布</button>
</div>
</form>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full h-20 bg-[#ffffff]/70 backdrop-blur-xl flex justify-around items-center px-6 pb-2 z-50 rounded-t-lg shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Explore</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 scale-110 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Post</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Profile</span>
</a>
</nav>
<!-- Background Decorative Elements -->
<div class="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
<div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary-container/10 blur-[120px] rounded-full"></div>
<div class="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-secondary-container/10 blur-[100px] rounded-full"></div>
</div>
</body></html>

<!-- 发布页 - 模板与功能 (中文版) -->
<!DOCTYPE html>

<html class="light" lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "outline-variant": "#a5aad7",
              "on-secondary": "#cfffce",
              "background": "#f7f5ff",
              "on-secondary-fixed": "#004819",
              "on-primary-fixed-variant": "#002869",
              "inverse-on-surface": "#959ac6",
              "on-error": "#ffefee",
              "tertiary-fixed-dim": "#edc600",
              "tertiary": "#6d5a00",
              "surface-tint": "#0053ca",
              "on-surface": "#262c51",
              "secondary": "#006a28",
              "surface-container-highest": "#d8daff",
              "secondary-fixed": "#5cfd80",
              "error": "#b31b25",
              "on-tertiary-fixed-variant": "#645300",
              "secondary-dim": "#005d22",
              "on-secondary-container": "#005d22",
              "primary-fixed": "#769dff",
              "secondary-container": "#5cfd80",
              "surface-container-low": "#f0efff",
              "primary": "#0053ca",
              "on-primary": "#f1f2ff",
              "on-primary-fixed": "#000000",
              "error-container": "#fb5151",
              "on-surface-variant": "#545981",
              "secondary-fixed-dim": "#4bee74",
              "primary-container": "#769dff",
              "tertiary-fixed": "#fdd400",
              "surface-variant": "#d8daff",
              "primary-dim": "#0049b2",
              "inverse-primary": "#5a8cff",
              "on-background": "#262c51",
              "surface-container": "#e6e6ff",
              "surface-bright": "#f7f5ff",
              "outline": "#6f749e",
              "error-dim": "#9f0519",
              "on-primary-container": "#001f56",
              "on-error-container": "#570008",
              "primary-fixed-dim": "#5f8fff",
              "tertiary-container": "#fdd400",
              "surface": "#f7f5ff",
              "on-secondary-fixed-variant": "#006827",
              "on-tertiary": "#fff2ce",
              "surface-dim": "#cdd1ff",
              "on-tertiary-container": "#594a00",
              "on-tertiary-fixed": "#433700",
              "tertiary-dim": "#5f4e00",
              "surface-container-high": "#dfe0ff",
              "surface-container-lowest": "#ffffff",
              "inverse-surface": "#05092f"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Manrope"],
              "label": ["Manrope"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #f7f5ff;
            font-family: 'Manrope', sans-serif;
            color: #262c51;
        }
        .editorial-shadow {
            box-shadow: 0 20px 40px rgba(38, 44, 81, 0.06);
        }
    </style>
<style>
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-background min-h-screen pb-32">
<!-- TopAppBar -->
<nav class="fixed top-0 w-full z-50 bg-[#ffffff]/70 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-[0_20px_40px_rgba(38,44,81,0.06)]">
<div class="flex items-center gap-4">
<button class="text-[#0053ca] active:scale-95 duration-200">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#262c51] text-xl">个人资料</h1>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-[#f0efff] transition-colors text-[#545981]">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
<div class="absolute bottom-0 left-0 w-full bg-[#f0efff] h-[1px] opacity-15"></div>
</nav>
<main class="pt-24 px-6 max-w-5xl mx-auto space-y-10">
<!-- Profile Header Section -->
<section class="relative">
<div class="bg-surface-container-low rounded-lg p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center md:items-end gap-8">
<!-- Large Avatar -->
<div class="relative z-10">
<div class="w-32 h-32 md:w-44 md:h-44 rounded-xl overflow-hidden editorial-shadow border-4 border-surface-container-lowest rotate-2">
<img alt="Captain Chen Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBOYcCBF98Y2F1MqSAXIS4fsAHnHlKv05DRAbbpKiRK7o4ieU7zRUKnFCdV2dXNq9P0NWxZDjjYId5x73YBjyzWWOx_HKey6Vo_mCVRD_uIXX2Lpr4cs3NVErXMt6Ff3bch9SYHsw41Vc-ECgsoGsO_SHVLjYPydvXATYfK8MPjl3UpMsSY7UW0M3k6n5-lEykJGLZx54S9kpYw3I8itljQ9QN7g79QJRmAbJmA1kscviZ2A-b8tx0TEM-GIeA0H1GOl4J8ZJ0b0l_"/>
</div>
</div>
<div class="flex-1 text-center md:text-left space-y-2">
<h2 class="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">Captain Chen</h2>
<p class="text-on-surface-variant text-lg font-body max-w-xl">一名热爱全栈开发和竞赛的程序员。</p>
</div>
</div>
<!-- Decorative Accent -->
<div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl"></div>
</section>
<!-- Bento Grid: Stats & Info -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="md:col-span-2 bg-surface-container-lowest p-8 rounded-lg editorial-shadow flex flex-col justify-between group">
<div class="space-y-4">
<span class="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">学术路径</span>
<h3 class="font-headline font-bold text-3xl text-on-surface">计算机科学</h3>
</div>
<div class="flex items-center gap-4 mt-8">
<div class="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined">school</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">主修方向</p>
<p class="font-bold text-on-surface">系统架构</p>
</div>
</div>
</div>
<div class="bg-primary p-8 rounded-lg editorial-shadow text-on-primary flex flex-col justify-between relative overflow-hidden">
<div class="relative z-10">
<p class="text-sm font-bold opacity-80 uppercase tracking-widest">毕业年份</p>
<h3 class="text-6xl font-headline font-black mt-2">2025</h3>
</div>
<div class="relative z-10 flex items-center gap-2 mt-4">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
<span class="font-bold">大四</span>
</div>
<!-- Abstract Gradient Swirl -->
<div class="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container rounded-full opacity-30 blur-2xl"></div>
</div>
</section>
<!-- Stats Overview Row -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-4">
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">12</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">项目</p>
</div>
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">450+</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">LeetCode</p>
</div>
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">3</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">实习</p>
</div>
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">18</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">奖项</p>
</div>
</section>
<!-- Skills Section -->
<section class="space-y-6">
<div class="flex items-baseline justify-between">
<h4 class="font-headline font-bold text-2xl text-on-surface">专业技能与特长</h4>
<span class="text-primary font-bold text-sm cursor-pointer hover:underline">查看证书</span>
</div>
<div class="flex flex-wrap gap-3">
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-primary"></div>
                    C++ 专家
                </div>
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
                    算法策略
                </div>
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-tertiary"></div>
                    前端开发
                </div>
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-error"></div>
                    后端工程师
                </div>
</div>
</section>
<!-- Participations Section -->
<section class="space-y-8">
<h4 class="font-headline font-bold text-2xl text-on-surface">正在参与的项目</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
<!-- Project Card 1 -->
<div class="flex flex-col gap-4">
<div class="h-64 rounded-lg overflow-hidden editorial-shadow bg-surface-container-low group">
<img alt="ACM Contest" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyKg1pVPFbqOQVVADpsfWg9JYDZX0RO_idNR0QJfvefRrQppJNfcSaKPqACvSgYzQpsHswOsiSfPWcIU9X3YwJT-v7yuByF43ZMn7FE5cDQoUaVIafsx7OfvGltL-_A-29bYS8Ig7fH-qUA5Jk7b5wKjbyZ2R4XAyOMl63mcheDWFaCprZNQZgUNcDiLR1cMVU3vgwYPLc_2eLKBXW3igMK6ainfI48h0sxjtW_1TBFy-Nf9782nlHbQB8AM8Z2X8OGQEMJGuf5P1"/>
</div>
<div class="px-2 space-y-2">
<p class="text-primary font-black text-xs uppercase tracking-widest">比赛</p>
<h5 class="font-headline font-bold text-xl leading-tight">ACM 国际大学生程序设计竞赛</h5>
<div class="flex items-center gap-4 text-sm text-on-surface-variant pt-2">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">group</span> 队长</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> 区域赛</span>
</div>
</div>
</div>
<!-- Project Card 2 -->
<div class="flex flex-col gap-4 md:mt-12">
<div class="h-64 rounded-lg overflow-hidden editorial-shadow bg-surface-container-low group">
<img alt="Global Strategy Challenge" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmJGAzMMHLZNczwqSeCK1z2GV_hj1ZZLoEfGM93iYKCPkl3wFiNZY7Rfii9stPMsvuGltVS2WOgW4EOGbXFtte0eFpohIxS6VvVw1f3dvESrvC0XWkzmuu7niTyiAb-HIOY2Bt8GZDD9698DhWTDpmKfqeOfZxgPHPQW473muHzhaBfLx2kXk9FVki3JTnFnvSvDmzOiyKU4B0Ezlww7GFKbMFLIgjvSlYAAB2PIDSldDie-SbBcbu9Cees16Jgc6xCJivKDLhKyox"/>
</div>
<div class="px-2 space-y-2">
<p class="text-secondary font-black text-xs uppercase tracking-widest">案例研究</p>
<h5 class="font-headline font-bold text-xl leading-tight">全球商业战略挑战赛</h5>
<div class="flex items-center gap-4 text-sm text-on-surface-variant pt-2">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">group</span> 技术顾问</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">public</span> 国际</span>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full h-20 z-50 rounded-t-[2rem] bg-[#ffffff]/70 backdrop-blur-xl shadow-[0_-10px_30px_rgba(38,44,81,0.04)] flex justify-around items-center px-6 pb-safe">
<!-- Inactive Tab: Home -->
<div class="flex flex-col items-center justify-center text-[#545981] p-2 hover:text-[#0053ca] active:scale-90 transition-all duration-300 cursor-pointer">
<span class="material-symbols-outlined text-2xl">home</span>
<span class="font-['Manrope'] text-[11px] font-bold uppercase tracking-wider mt-1">主页</span>
</div>
<!-- Inactive Tab: Explore -->
<div class="flex flex-col items-center justify-center text-[#545981] p-2 hover:text-[#0053ca] active:scale-90 transition-all duration-300 cursor-pointer">
<span class="material-symbols-outlined text-2xl">explore</span>
<span class="font-['Manrope'] text-[11px] font-bold uppercase tracking-wider mt-1">探索</span>
</div>
<!-- Inactive Tab: Post -->
<div class="flex flex-col items-center justify-center text-[#545981] p-2 hover:text-[#0053ca] active:scale-90 transition-all duration-300 cursor-pointer">
<span class="material-symbols-outlined text-2xl">add_circle</span>
<span class="font-['Manrope'] text-[11px] font-bold uppercase tracking-wider mt-1">发布</span>
</div>
<!-- Active Tab: Profile -->
<div class="flex flex-col items-center justify-center bg-[#0053ca] text-white rounded-full p-3 mb-4 scale-110 active:scale-95 transition-all duration-300 shadow-lg cursor-pointer">
<span class="material-symbols-outlined text-2xl" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-['Manrope'] text-[10px] font-bold uppercase tracking-wider">我的</span>
</div>
</nav>
</body></html>

<!-- 个人中心 - 中文优化版 -->
<!DOCTYPE html>

<html class="light" lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary-dim": "#0049b2",
              "inverse-on-surface": "#959ac6",
              "on-tertiary": "#fff2ce",
              "surface-tint": "#0053ca",
              "on-surface": "#262c51",
              "tertiary-fixed": "#fdd400",
              "tertiary-container": "#fdd400",
              "on-secondary-container": "#005d22",
              "on-primary-container": "#001f56",
              "on-secondary-fixed": "#004819",
              "primary-fixed": "#769dff",
              "surface-container-high": "#dfe0ff",
              "surface-container-low": "#f0efff",
              "secondary": "#006a28",
              "inverse-primary": "#5a8cff",
              "outline-variant": "#a5aad7",
              "on-error-container": "#570008",
              "secondary-fixed-dim": "#4bee74",
              "on-primary-fixed": "#000000",
              "surface-dim": "#cdd1ff",
              "on-primary": "#f1f2ff",
              "tertiary-fixed-dim": "#edc600",
              "surface": "#f7f5ff",
              "background": "#f7f5ff",
              "on-error": "#ffefee",
              "secondary-fixed": "#5cfd80",
              "secondary-container": "#5cfd80",
              "surface-container-lowest": "#ffffff",
              "on-secondary": "#cfffce",
              "error": "#b31b25",
              "surface-container-highest": "#d8daff",
              "on-surface-variant": "#545981",
              "surface-variant": "#d8daff",
              "error-container": "#fb5151",
              "primary-container": "#769dff",
              "tertiary-dim": "#5f4e00",
              "secondary-dim": "#005d22",
              "on-secondary-fixed-variant": "#006827",
              "surface-bright": "#f7f5ff",
              "on-tertiary-fixed-variant": "#645300",
              "tertiary": "#6d5a00",
              "primary": "#0053ca",
              "on-primary-fixed-variant": "#002869",
              "on-background": "#262c51",
              "primary-fixed-dim": "#5f8fff",
              "inverse-surface": "#05092f",
              "surface-container": "#e6e6ff",
              "outline": "#6f749e",
              "on-tertiary-container": "#594a00",
              "on-tertiary-fixed": "#433700",
              "error-dim": "#9f0519"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Manrope"],
              "label": ["Manrope"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .bg-primary-gradient {
            background: linear-gradient(135deg, #0053ca 0%, #769dff 100%);
        }
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #f7f5ff;
            color: #262c51;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="bg-surface min-h-screen pb-24">
<!-- TopAppBar -->
<header class="bg-[#ffffff]/70 dark:bg-[#262c51]/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(38,44,81,0.06)] docked full-width top-0 sticky z-50">
<div class="flex flex-col w-full pt-4 px-6">
<div class="flex items-center justify-between mb-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img alt="Student Profile Photo" data-alt="close-up portrait of a smiling university student with glasses in a bright sunlit library setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe8q7indkartYk1Aei5QTqf-d02UX0w2iY2U0jav2xoncDxROyB71srgi2S03kD0XNYaIbV9dBX-EMPEQYL0bnuiMg31WnB3aCTpKshi7TEAhCg4W-lQPHGS4FtkoWSWmb6hgJ4LsWGjLI-2hQXyu23mybbT_cBeg3FhtXRb-HNTmzi9FD25zaol3bwBwVU0nCzl2f8TH-ZZSnlA_8N8eZZ6ItGAiXeeDPRKJNl8lkQvMythitzBHHIW3-dfAR-FZ281I3BujGGtKf"/>
</div>
<span class="text-2xl font-black text-[#0053ca] dark:text-[#769dff] font-headline tracking-tight">Scholar Pulse</span>
</div>
<button class="active:scale-95 transition-transform text-[#0053ca] dark:text-[#769dff]">
<span class="material-symbols-outlined text-2xl">notifications</span>
</button>
</div>
<!-- Navigation Tabs (Integrated into TopAppBar based on predicted components) -->
<nav class="flex gap-8 border-b border-[#f0efff] dark:border-[#545981]/20">
<a class="text-[#545981] dark:text-[#a5aad7] pb-2 font-['Manrope'] font-semibold text-base hover:text-[#0053ca] transition-colors duration-300" href="#">Skill Exchange</a>
<a class="text-[#0053ca] border-b-4 border-[#0053ca] pb-2 font-['Manrope'] font-semibold text-base" href="#">Campus Market</a>
</nav>
</div>
</header>
<main class="max-w-4xl mx-auto px-6 py-8 space-y-8">
<!-- Hero Search Section (Custom high-end component) -->
<section class="relative bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_40px_rgba(38,44,81,0.04)] overflow-hidden">
<div class="relative z-10 space-y-4">
<h2 class="text-3xl font-headline font-extrabold text-on-surface tracking-tight">发现校园好物</h2>
<div class="flex items-center bg-surface-container-low rounded-full px-5 py-3 gap-3 w-full md:max-w-md focus-within:ring-2 ring-primary/30 transition-all">
<span class="material-symbols-outlined text-on-surface-variant">search</span>
<input class="bg-transparent border-none focus:ring-0 w-full text-on-surface font-medium placeholder:text-on-surface-variant/60" placeholder="搜索商品或服务..." type="text"/>
</div>
</div>
<!-- Organic Abstract Background Element -->
<div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
<div class="absolute right-10 bottom-0 opacity-10">
<span class="material-symbols-outlined text-9xl">shopping_bag</span>
</div>
</section>
<!-- Horizontal Market List -->
<div class="space-y-6">
<!-- Item 1: iPad Pro -->
<article class="flex flex-col md:flex-row bg-surface-container-lowest rounded-lg overflow-hidden transition-all hover:translate-y-[-4px] hover:shadow-lg group">
<div class="md:w-1/3 h-52 md:h-auto relative overflow-hidden">
<img alt="iPad Pro" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="sleek modern silver tablet with stylus on a minimalist wooden desk with soft cinematic shadows" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5o922PU_ojSPhMgn2EpfJ_9thk6ymc_m_77pzlFfF6UYOqWSntgHgZ-NP5tzR4FodaeEmvmvKNV_28OnyGqHqhgzfUSgv7nyVDGRdCVhXmbrv83dHDyGNqpt1nPZADcI3Ed_s9qYTH91RIcqwOyNqZq_kaw0XtK_FduLx1zz7ddsXcMvvzX4dZiPtiHf9JvbW_KPBiZeVWVJqz3UYzHj81OOMBrAB0kXG9DaPyqQD_fOF-FlbafNmo8sy35YcOe-vsxck2wy9otit"/>
<div class="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">99新</div>
</div>
<div class="md:w-2/3 p-6 flex flex-col justify-between">
<div>
<div class="flex justify-between items-start mb-2">
<h3 class="text-xl font-headline font-bold text-on-surface">二手 iPad Pro 11寸 (M2)</h3>
<span class="text-2xl font-black text-primary font-headline">¥4,500</span>
</div>
<p class="text-on-surface-variant text-sm leading-relaxed line-clamp-2">自用极品，无划痕，带原装Apple Pencil二代。主要用于考研刷题，现已上岸转让给需要的学弟学妹。</p>
</div>
<div class="flex items-center justify-between mt-6">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">person</span>
</div>
<span class="text-on-surface font-semibold text-sm">李同学 · 计算机系</span>
</div>
<button class="bg-primary-gradient text-on-primary px-6 py-2 rounded-full font-bold text-sm active:scale-95 transition-all">立即联系</button>
</div>
</div>
</article>
<!-- Item 2: Notes -->
<article class="flex flex-col md:flex-row bg-surface-container-lowest rounded-lg overflow-hidden transition-all hover:translate-y-[-4px] hover:shadow-lg group">
<div class="md:w-1/3 h-52 md:h-auto relative overflow-hidden">
<img alt="Math Notes" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="close-up of neatly organized handwritten mathematical equations in a notebook with highlighter marks and pencils" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnAu8JhD-ld9uJasSUhL4v6rQtZHdPUV0RBgHhJe-miovJNFPjMrgGujhw8P6p0HKpIOoegq4vNMh9zKB4kd9jt1PqoP9Th6fzMlU90MP6uN54XKXAgxexk_wyR3bskbxIXI9LRQ-9laC59jx4uFcfqS2wVz-ERfcJch1KJqnfyO9QByMqFoz_tOmXI4Fi-nq3ljLf3XvKf7pBv62a74A3Me_urR8TiA-R7NLVWOzMaU_HMsYuqKmVFhpuWnY9dBK7g6B1Dj25Q1Vm"/>
<div class="absolute top-4 left-4 bg-secondary/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">学霸推荐</div>
</div>
<div class="md:w-2/3 p-6 flex flex-col justify-between">
<div>
<div class="flex justify-between items-start mb-2">
<h3 class="text-xl font-headline font-bold text-on-surface">考研数学一真题手写笔记</h3>
<span class="text-2xl font-black text-primary font-headline">¥120</span>
</div>
<p class="text-on-surface-variant text-sm leading-relaxed line-clamp-2">涵盖2010-2023年所有真题解析，包含独家解题思路和易错点整理。电子版/纸质版均可提供。</p>
</div>
<div class="flex items-center justify-between mt-6">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">verified</span>
</div>
<span class="text-on-surface font-semibold text-sm">王学姐 · 数学系</span>
</div>
<button class="bg-primary-gradient text-on-primary px-6 py-2 rounded-full font-bold text-sm active:scale-95 transition-all">购买笔记</button>
</div>
</div>
</article>
<!-- Item 3: Computer Repair -->
<article class="flex flex-col md:flex-row bg-surface-container-lowest rounded-lg overflow-hidden transition-all hover:translate-y-[-4px] hover:shadow-lg group border-l-4 border-secondary">
<div class="md:w-1/3 h-52 md:h-auto relative overflow-hidden">
<img alt="PC Repair" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="technician hands carefully repairing a laptop motherboard with precision tools and focused lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCciudyPnO98LNywTk48B7j1RNkKFvZ5XaddFJTQ_PrjKd75ki2JDGh11b8ZrpRgBer_5E-M77Vq1YPjpDBJn7rUwDBHWGmK_A3F7EMmiIANJVwbOfKIQeY5KGvXZK6LMJBIfawNSUy9JtiyYdEut8MSHQDY9U5pXHAxaDKBz_oXJSXr9Z1Y6eRj6WjeHRurqLnVsUeAumUdRw7bs4ra6p7fwON8cA6SA60jw1Ljn7qUdr2-Wp_unSGw5WZLNxQtut1041i-sL06YfK"/>
<div class="absolute top-4 left-4 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">专业服务</div>
</div>
<div class="md:w-2/3 p-6 flex flex-col justify-between">
<div>
<div class="flex justify-between items-start mb-2">
<h3 class="text-xl font-headline font-bold text-on-surface">上门代修电脑 / 清灰安装系统</h3>
<span class="text-2xl font-black text-primary font-headline">¥50</span>
</div>
<p class="text-on-surface-variant text-sm leading-relaxed line-clamp-2">承接各类笔记本清灰、系统重装、软件安装。宿舍上门服务，修不好不收钱，童叟无欺。</p>
</div>
<div class="flex items-center justify-between mt-6">
<div class="flex items-center gap-2">
<div class="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-sm">build</span>
</div>
<span class="text-on-surface font-semibold text-sm">张同学 · 自动化</span>
</div>
<div class="flex gap-2">
<button class="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-bold text-sm active:scale-95 transition-all">咨询服务</button>
</div>
</div>
</div>
</article>
</div>
<!-- Featured Categories Grid -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
<div class="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center space-y-2 hover:bg-primary-container/20 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl">laptop_mac</span>
<span class="font-bold text-on-surface text-sm">数码产品</span>
</div>
<div class="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center space-y-2 hover:bg-primary-container/20 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl">menu_book</span>
<span class="font-bold text-on-surface text-sm">二手书籍</span>
</div>
<div class="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center space-y-2 hover:bg-primary-container/20 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl">styler</span>
<span class="font-bold text-on-surface text-sm">生活用品</span>
</div>
<div class="bg-surface-container-high p-6 rounded-lg flex flex-col items-center justify-center text-center space-y-2 hover:bg-primary-container/20 transition-colors cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl">construction</span>
<span class="font-bold text-on-surface text-sm">校园服务</span>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full h-20 bg-[#ffffff]/70 backdrop-blur-xl flex justify-around items-center px-6 pb-2 z-50 rounded-t-lg shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 scale-110 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Explore</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Post</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Profile</span>
</a>
</nav>
</body></html>

<!-- 首页 - 校园集市 (金钱结算) -->
<!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Skill Detail | Campus Atelier</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error": "#b31b25",
                        "outline-variant": "#a5aad7",
                        "inverse-on-surface": "#959ac6",
                        "secondary-container": "#5cfd80",
                        "on-tertiary-fixed-variant": "#645300",
                        "on-primary-fixed": "#000000",
                        "primary-fixed": "#769dff",
                        "surface-container-high": "#dfe0ff",
                        "surface-tint": "#0053ca",
                        "secondary-dim": "#005d22",
                        "on-secondary-fixed": "#004819",
                        "secondary": "#006a28",
                        "primary-dim": "#0049b2",
                        "tertiary-fixed": "#fdd400",
                        "surface-container": "#e6e6ff",
                        "on-secondary-fixed-variant": "#006827",
                        "surface-container-low": "#f0efff",
                        "surface-container-highest": "#d8daff",
                        "surface-dim": "#cdd1ff",
                        "surface": "#f7f5ff",
                        "surface-bright": "#f7f5ff",
                        "on-tertiary-container": "#594a00",
                        "inverse-surface": "#05092f",
                        "on-primary": "#f1f2ff",
                        "on-secondary-container": "#005d22",
                        "on-surface": "#262c51",
                        "on-background": "#262c51",
                        "secondary-fixed": "#5cfd80",
                        "tertiary": "#6d5a00",
                        "background": "#f7f5ff",
                        "outline": "#6f749e",
                        "on-secondary": "#cfffce",
                        "inverse-primary": "#5a8cff",
                        "surface-variant": "#d8daff",
                        "on-tertiary": "#fff2ce",
                        "primary-fixed-dim": "#5f8fff",
                        "on-tertiary-fixed": "#433700",
                        "error-dim": "#9f0519",
                        "primary": "#0053ca",
                        "secondary-fixed-dim": "#4bee74",
                        "on-surface-variant": "#545981",
                        "on-primary-fixed-variant": "#002869",
                        "on-primary-container": "#001f56",
                        "surface-container-lowest": "#ffffff",
                        "on-error-container": "#570008",
                        "tertiary-fixed-dim": "#edc600",
                        "on-error": "#ffefee",
                        "error-container": "#fb5151",
                        "primary-container": "#769dff",
                        "tertiary-dim": "#5f4e00",
                        "tertiary-container": "#fdd400"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-nav {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
        }
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #f7f5ff;
            color: #262c51;
        }
        h1, h2, h3 {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
</head>
<body class="antialiased text-on-surface">
<!-- Top Navigation Bar -->
<header class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-blue-900/5 flex items-center justify-between px-6 h-16">
<div class="flex items-center gap-4">
<button class="flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-50/50 transition-all active:scale-95 duration-200">
<span class="material-symbols-outlined text-blue-700">arrow_back</span>
</button>
<span class="font-plus-jakarta text-2xl font-bold tracking-tight text-blue-700">校园工坊</span>
</div>
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
<img class="w-full h-full object-cover" data-alt="professional portrait of a male student with a friendly expression and soft natural lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfTpAWNpSWeWfDeFEnb2Eh3tSOfcGkm5Alv6I3d4jbIUfos2YzMQssdekuXKtY9USowURw_4hEBCWCE2c9TMJmCNA1cRAsxqxQwZDgV7lqHUQbwhEFpb-2M4_bgW34z8AksuTp9T6Rjix_HFfL-cSqrigcEtAXByV0HrWH4x1vU3Az6cHPdXaE4XFp6xnuM8I0sqD2F8dJiUjwI5zp8TQetheEPmnTPrU4fGp_7rltYRZK1kVbxfytX0X_GV9WAycreNkS7Q8XIlqm"/>
</div>
<span class="material-symbols-outlined text-blue-700">notifications</span>
</div>
</header>
<main class="pt-16 pb-32 max-w-4xl mx-auto px-4 sm:px-6">
<!-- Hero Image Section -->
<section class="mt-6 mb-8 relative group">
<div class="w-full aspect-[16/9] rounded-lg overflow-hidden shadow-[0_20px_40px_rgba(38,44,81,0.06)] bg-surface-container-low">
<img class="w-full h-full object-cover" data-alt="close-up of a laptop screen displaying elegant python code with soft blue and purple desk lighting in the background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9yIyGImOd1Dh5_cFtls66e6bAkeA27cXQ7VxRoX4-Gi8DQS4ERcIIHPRwpejIS5V8cDpq_09tMYQatMgBVsQ_VJpqDaxxbyn8YA2luLnsqUMsZ0oFP2ikL0S9UyY1vJYtCVidyoJ0sLRiPPF75BIEz590OOLvLDSkqMYYnwcJBQkfjZs_nSVCQimgQE5b_m0U17urf3giPVedjuaiKfCjiYnCA994Lo2wbgrVkDF4Z0HGtLFYHfDZqH2c5mSdqQgKcTyv95F1DGW-"/>
</div>
<div class="absolute top-4 left-4 flex gap-2">
<span class="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-primary uppercase tracking-wider shadow-sm">编程</span>
<span class="px-4 py-1.5 bg-secondary-container/90 backdrop-blur-md rounded-full text-xs font-bold text-on-secondary-container uppercase tracking-wider shadow-sm">高评价</span>
</div>
</section>
<!-- Provider Profile Section -->
<section class="mb-10 p-6 rounded-lg bg-surface-container-lowest shadow-[0_4px_20px_rgba(38,44,81,0.02)] border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
<div class="flex items-center gap-4">
<div class="relative">
<div class="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container">
<img class="w-full h-full object-cover" data-alt="close-up of a creative female professional smiling with warm natural outdoor light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD300-yufjEpbgboYEjy6IW_hHV8EAMgd2Cjt0j2U0KAfAwiLGulrNjBCIIjknl5gs0DnPDblOYKVIT5ja0oYOZCE9A1dIlg3f6s4gzjn8ASExPOaO89VOsQW1k1k6EuyYYQiniq9M_5O6B_4JZp8jyKDolh08NhFvf7vYmNSpFCq-gz-tNwJkBPi-k52r334_VH73K-Ia8H7DbGHBh6nQ11qlGDoypdF8lkWf8LnBOFnDPG8QwtpGPDsaD6c3lpwCBh3OzfdCjCkSx"/>
</div>
<div class="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full border-2 border-white">
<span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
</div>
</div>
<div>
<h2 class="text-xl font-bold text-on-surface">Alex Rivera</h2>
<p class="text-on-surface-variant text-sm flex items-center gap-1"><span class="material-symbols-outlined text-sm text-tertiary" style="font-variation-settings: 'FILL' 1;">star</span> 4.9 (42次交换) • 计算机科学 大四</p>
</div>
</div>
<div class="flex gap-4">
<div class="text-center px-4 border-r border-outline-variant/20 last:border-0">
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">效率</p>
<p class="text-lg font-bold text-secondary">~2h</p>
</div>
<div class="text-center px-4 border-r border-outline-variant/20 last:border-0">
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">等级</p>
<p class="text-lg font-bold text-primary">资深</p>
</div>
</div>
</section>
<!-- The Exchange Core: Comparison Block -->
<section class="mb-12 grid grid-cols-1 md:grid-cols-2 gap-6 relative">
<!-- Connector Icon (Desktop) -->
<div class="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg border border-primary-container z-10 items-center justify-center">
<span class="material-symbols-outlined text-primary">swap_horiz</span>
</div>
<!-- Provider Offer -->
<div class="p-8 rounded-lg bg-primary-container/10 border border-primary/10 flex flex-col items-center text-center">
<div class="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mb-6 shadow-md">
<span class="material-symbols-outlined text-3xl">terminal</span>
</div>
<h3 class="text-xs font-extrabold text-primary uppercase tracking-[0.2em] mb-3">我能提供</h3>
<h4 class="text-2xl font-bold text-on-primary-container mb-4">Python Tutoring</h4>
<p class="text-on-surface-variant leading-relaxed">
                    Personalized 1-on-1 sessions covering data structures, automation scripts, and Django web frameworks. Perfect for projects or interview prep.
                </p>
</div>
<!-- Provider Request -->
<div class="p-8 rounded-lg bg-secondary-container/10 border border-secondary/10 flex flex-col items-center text-center">
<div class="w-14 h-14 rounded-2xl bg-secondary text-white flex items-center justify-center mb-6 shadow-md">
<span class="material-symbols-outlined text-3xl">brush</span>
</div>
<h3 class="text-xs font-extrabold text-secondary uppercase tracking-[0.2em] mb-3">我想获得</h3>
<h4 class="text-2xl font-bold text-on-secondary-container mb-4">UI/UX Design guidance</h4>
<p class="text-on-surface-variant leading-relaxed">
                    Looking for someone to review my portfolio, explain Figma auto-layouts, and provide critique on visual hierarchy for mobile apps.
                </p>
</div>
</section>
<!-- Details & Description -->
<section class="space-y-8">
<div class="p-8 rounded-lg bg-surface-container-lowest border border-outline-variant/5">
<h3 class="text-xl font-bold mb-6 flex items-center gap-2"><span class="w-1 h-6 bg-primary rounded-full"></span> 交换详情</h3>
<div class="space-y-4 text-on-surface-variant">
<p>I've been working with Python for over 4 years and have TA-ed for CS101. I'm looking to transition my technical skills into a more product-focused role, which is why I'm eager to learn about design principles.</p>
<ul class="space-y-3">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
<span>周末及工作日晚上有空。</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
<span>可以在主图书馆进行或通过 Zoom 连线。</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-secondary mt-0.5">check_circle</span>
<span>乐意提供代码审查和指导。</span>
</li>
</ul>
</div>
</div>
<!-- Growth Track / Stats -->
<div class="p-8 rounded-lg bg-surface-container-low">
<h3 class="text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">用户信用分</h3>
<div class="space-y-6">
<div>
<div class="flex justify-between mb-2">
<span class="text-sm font-bold">可靠度</span>
<span class="text-sm font-bold text-secondary">98%</span>
</div>
<div class="w-full h-2 bg-secondary-container/30 rounded-full">
<div class="h-full bg-secondary rounded-full" style="width: 98%;"></div>
</div>
</div>
<div>
<div class="flex justify-between mb-2">
<span class="text-sm font-bold">响应率</span>
<span class="text-sm font-bold text-primary">85%</span>
</div>
<div class="w-full h-2 bg-primary-container/30 rounded-full">
<div class="h-full bg-primary rounded-full" style="width: 85%;"></div>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- Sticky Bottom Action Bar -->
<!-- Bottom Navigation Bar (Mobile Only Filtered) -->
<!-- Suppressed for detailed sub-page view to prioritize primary content and action bar -->
<nav class="fixed bottom-0 left-0 w-full h-20 bg-[#ffffff]/70 backdrop-blur-xl flex justify-around items-center px-6 pb-2 z-50 rounded-t-lg shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 scale-110 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Explore</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Post</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Profile</span>
</a>
</nav></body></html>

<!-- 详情页 - 技能互换 (中文版) -->
<!DOCTYPE html><html lang="en"><head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Chat with Alex Chen</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet">
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              colors: {
                "surface-variant": "#d8daff",
                "surface-container-high": "#dfe0ff",
                "on-surface": "#262c51",
                "primary-fixed": "#769dff",
                "error-dim": "#9f0519",
                "on-primary-fixed-variant": "#002869",
                "surface-tint": "#0053ca",
                "on-tertiary-fixed-variant": "#645300",
                "on-primary": "#f1f2ff",
                "inverse-primary": "#5a8cff",
                "surface-dim": "#cdd1ff",
                "inverse-surface": "#05092f",
                "tertiary-container": "#fdd400",
                "surface-bright": "#f7f5ff",
                "tertiary-dim": "#5f4e00",
                "on-tertiary-fixed": "#433700",
                "secondary-dim": "#005d22",
                "tertiary": "#6d5a00",
                "primary-dim": "#0049b2",
                "secondary-container": "#5cfd80",
                "primary-container": "#769dff",
                "outline": "#6f749e",
                "tertiary-fixed": "#fdd400",
                "on-error": "#ffefee",
                "on-primary-container": "#001f56",
                "background": "#f7f5ff",
                "surface-container-highest": "#d8daff",
                "on-error-container": "#570008",
                "on-secondary": "#cfffce",
                "on-tertiary": "#fff2ce",
                "on-tertiary-container": "#594a00",
                "on-secondary-fixed": "#004819",
                "error-container": "#fb5151",
                "secondary-fixed-dim": "#4bee74",
                "on-secondary-container": "#005d22",
                "error": "#b31b25",
                "secondary-fixed": "#5cfd80",
                "on-secondary-fixed-variant": "#006827",
                "on-background": "#262c51",
                "tertiary-fixed-dim": "#edc600",
                "surface-container": "#e6e6ff",
                "on-primary-fixed": "#000000",
                "outline-variant": "#a5aad7",
                "inverse-on-surface": "#959ac6",
                "surface-container-lowest": "#ffffff",
                "on-surface-variant": "#545981",
                "primary": "#0053ca",
                "primary-fixed-dim": "#5f8fff",
                "surface-container-low": "#f0efff",
                "secondary": "#006a28",
                "surface": "#f7f5ff"
              },
              fontFamily: {
                "headline": ["Plus Jakarta Sans"],
                "body": ["Manrope"],
                "label": ["Manrope"]
              },
              borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
            },
          },
        }
      </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .chat-scrollbar::-webkit-scrollbar {
            width: 4px;
        }
        .chat-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .chat-scrollbar::-webkit-scrollbar-thumb {
            background: #dfe0ff;
            border-radius: 10px;
        }
      </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  <style>*, ::before, ::after{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgb(59 130 246 / 0.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }/* ! tailwindcss v3.4.17 | MIT License | https://tailwindcss.com */*,::after,::before{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}::after,::before{--tw-content:''}:host,html{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;tab-size:4;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}menu,ol,ul{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}[type='text'],input:where(:not([type])),[type='email'],[type='url'],[type='password'],[type='number'],[type='date'],[type='datetime-local'],[type='month'],[type='search'],[type='tel'],[type='time'],[type='week'],[multiple],textarea,select{-webkit-appearance:none;appearance:none;background-color:#fff;border-color:#6b7280;border-width:1px;border-radius:0px;padding-top:0.5rem;padding-right:0.75rem;padding-bottom:0.5rem;padding-left:0.75rem;font-size:1rem;line-height:1.5rem;--tw-shadow:0 0 #0000;}[type='text']:focus, input:where(:not([type])):focus, [type='email']:focus, [type='url']:focus, [type='password']:focus, [type='number']:focus, [type='date']:focus, [type='datetime-local']:focus, [type='month']:focus, [type='search']:focus, [type='tel']:focus, [type='time']:focus, [type='week']:focus, [multiple]:focus, textarea:focus, select:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);border-color:#2563eb}input::placeholder,textarea::placeholder{color:#6b7280;opacity:1}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-date-and-time-value{min-height:1.5em;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit,::-webkit-datetime-edit-year-field,::-webkit-datetime-edit-month-field,::-webkit-datetime-edit-day-field,::-webkit-datetime-edit-hour-field,::-webkit-datetime-edit-minute-field,::-webkit-datetime-edit-second-field,::-webkit-datetime-edit-millisecond-field,::-webkit-datetime-edit-meridiem-field{padding-top:0;padding-bottom:0}select{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");background-position:right 0.5rem center;background-repeat:no-repeat;background-size:1.5em 1.5em;padding-right:2.5rem;print-color-adjust:exact}[multiple],[size]:where(select:not([size="1"])){background-image:initial;background-position:initial;background-repeat:unset;background-size:initial;padding-right:0.75rem;print-color-adjust:unset}[type='checkbox'],[type='radio']{-webkit-appearance:none;appearance:none;padding:0;print-color-adjust:exact;display:inline-block;vertical-align:middle;background-origin:border-box;-webkit-user-select:none;user-select:none;flex-shrink:0;height:1rem;width:1rem;color:#2563eb;background-color:#fff;border-color:#6b7280;border-width:1px;--tw-shadow:0 0 #0000}[type='checkbox']{border-radius:0px}[type='radio']{border-radius:100%}[type='checkbox']:focus,[type='radio']:focus{outline:2px solid transparent;outline-offset:2px;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:2px;--tw-ring-offset-color:#fff;--tw-ring-color:#2563eb;--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}[type='checkbox']:checked,[type='radio']:checked{border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat}[type='checkbox']:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");}@media (forced-colors: active) {[type='checkbox']:checked{-webkit-appearance:auto;appearance:auto}}[type='radio']:checked{background-image:url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");}@media (forced-colors: active) {[type='radio']:checked{-webkit-appearance:auto;appearance:auto}}[type='checkbox']:checked:hover,[type='checkbox']:checked:focus,[type='radio']:checked:hover,[type='radio']:checked:focus{border-color:transparent;background-color:currentColor}[type='checkbox']:indeterminate{background-image:url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");border-color:transparent;background-color:currentColor;background-size:100% 100%;background-position:center;background-repeat:no-repeat;}@media (forced-colors: active) {[type='checkbox']:indeterminate{-webkit-appearance:auto;appearance:auto}}[type='checkbox']:indeterminate:hover,[type='checkbox']:indeterminate:focus{border-color:transparent;background-color:currentColor}[type='file']{background:unset;border-color:inherit;border-width:0;border-radius:0;padding:0;font-size:unset;line-height:inherit}[type='file']:focus{outline:1px solid ButtonText;outline:1px auto -webkit-focus-ring-color}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.bottom-0{bottom:0px}.left-0{left:0px}.right-0{right:0px}.right-2{right:0.5rem}.top-0{top:0px}.top-1\/2{top:50%}.z-50{z-index:50}.mx-auto{margin-left:auto;margin-right:auto}.my-4{margin-top:1rem;margin-bottom:1rem}.mb-20{margin-bottom:5rem}.ml-auto{margin-left:auto}.mt-16{margin-top:4rem}.flex{display:flex}.h-1\.5{height:0.375rem}.h-10{height:2.5rem}.h-12{height:3rem}.h-16{height:4rem}.h-3{height:0.75rem}.h-8{height:2rem}.min-h-screen{min-height:100vh}.w-1\.5{width:0.375rem}.w-10{width:2.5rem}.w-12{width:3rem}.w-3{width:0.75rem}.w-8{width:2rem}.w-full{width:100%}.min-w-0{min-width:0px}.max-w-4xl{max-width:56rem}.max-w-\[85\%\]{max-width:85%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-translate-y-1\/2{--tw-translate-y:-50%;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes bounce{0%, 100%{transform:translateY(-25%);animation-timing-function:cubic-bezier(0.8,0,1,1)}50%{transform:none;animation-timing-function:cubic-bezier(0,0,0.2,1)}}.animate-bounce{animation:bounce 1s infinite}.cursor-pointer{cursor:pointer}.flex-col{flex-direction:column}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:0.25rem}.gap-2{gap:0.5rem}.gap-3{gap:0.75rem}.gap-4{gap:1rem}.space-y-1 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.25rem * var(--tw-space-y-reverse))}.space-y-3 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(0.75rem * var(--tw-space-y-reverse))}.space-y-8 > :not([hidden]) ~ :not([hidden]){--tw-space-y-reverse:0;margin-top:calc(2rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(2rem * var(--tw-space-y-reverse))}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:2rem}.rounded-xl{border-radius:3rem}.rounded-t-2xl{border-top-left-radius:1rem;border-top-right-radius:1rem}.rounded-bl-2xl{border-bottom-left-radius:1rem}.rounded-bl-sm{border-bottom-left-radius:0.125rem}.rounded-br-2xl{border-bottom-right-radius:1rem}.rounded-br-sm{border-bottom-right-radius:0.125rem}.border{border-width:1px}.border-2{border-width:2px}.border-none{border-style:none}.border-outline-variant\/20{border-color:rgb(165 170 215 / 0.2)}.border-primary-container{--tw-border-opacity:1;border-color:rgb(118 157 255 / var(--tw-border-opacity, 1))}.border-white{--tw-border-opacity:1;border-color:rgb(255 255 255 / var(--tw-border-opacity, 1))}.bg-on-surface-variant{--tw-bg-opacity:1;background-color:rgb(84 89 129 / var(--tw-bg-opacity, 1))}.bg-primary{--tw-bg-opacity:1;background-color:rgb(0 83 202 / var(--tw-bg-opacity, 1))}.bg-secondary{--tw-bg-opacity:1;background-color:rgb(0 106 40 / var(--tw-bg-opacity, 1))}.bg-surface-container-high{--tw-bg-opacity:1;background-color:rgb(223 224 255 / var(--tw-bg-opacity, 1))}.bg-surface-container-low{--tw-bg-opacity:1;background-color:rgb(240 239 255 / var(--tw-bg-opacity, 1))}.bg-surface-container-lowest{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-tertiary-container{--tw-bg-opacity:1;background-color:rgb(253 212 0 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-white\/70{background-color:rgb(255 255 255 / 0.7)}.bg-white\/80{background-color:rgb(255 255 255 / 0.8)}.object-cover{object-fit:cover}.p-3{padding:0.75rem}.p-4{padding:1rem}.px-1{padding-left:0.25rem;padding-right:0.25rem}.px-11{padding-left:2.75rem;padding-right:2.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-1{padding-top:0.25rem;padding-bottom:0.25rem}.py-3{padding-top:0.75rem;padding-bottom:0.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.font-body{font-family:Manrope}.font-headline{font-family:Plus Jakarta Sans}.text-\[10px\]{font-size:10px}.text-\[12px\]{font-size:12px}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:0.875rem;line-height:1.25rem}.text-xs{font-size:0.75rem;line-height:1rem}.font-bold{font-weight:700}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-relaxed{line-height:1.625}.leading-tight{line-height:1.25}.tracking-tight{letter-spacing:-0.025em}.tracking-widest{letter-spacing:0.1em}.text-blue-700{--tw-text-opacity:1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-on-primary{--tw-text-opacity:1;color:rgb(241 242 255 / var(--tw-text-opacity, 1))}.text-on-surface{--tw-text-opacity:1;color:rgb(38 44 81 / var(--tw-text-opacity, 1))}.text-on-surface-variant{--tw-text-opacity:1;color:rgb(84 89 129 / var(--tw-text-opacity, 1))}.text-on-tertiary-container{--tw-text-opacity:1;color:rgb(89 74 0 / var(--tw-text-opacity, 1))}.text-primary{--tw-text-opacity:1;color:rgb(0 83 202 / var(--tw-text-opacity, 1))}.text-secondary{--tw-text-opacity:1;color:rgb(0 106 40 / var(--tw-text-opacity, 1))}.opacity-60{opacity:0.6}.shadow-lg{--tw-shadow:0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-md{--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgb(0 0 0 / 0.05);--tw-shadow-colored:0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.backdrop-blur-xl{--tw-backdrop-blur:blur(24px);-webkit-backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia);backdrop-filter:var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-colors{transition-property:color, background-color, border-color, fill, stroke, -webkit-text-decoration-color;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke;transition-property:color, background-color, border-color, text-decoration-color, fill, stroke, -webkit-text-decoration-color;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.transition-shadow{transition-property:box-shadow;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms}.duration-200{transition-duration:200ms}.\[animation-delay\:0\.2s\]{animation-delay:0.2s}.\[animation-delay\:0\.4s\]{animation-delay:0.4s}.placeholder\:text-on-surface-variant::placeholder{--tw-text-opacity:1;color:rgb(84 89 129 / var(--tw-text-opacity, 1))}.hover\:bg-primary\/10:hover{background-color:rgb(0 83 202 / 0.1)}.hover\:bg-surface-container:hover{--tw-bg-opacity:1;background-color:rgb(230 230 255 / var(--tw-bg-opacity, 1))}.hover\:text-primary:hover{--tw-text-opacity:1;color:rgb(0 83 202 / var(--tw-text-opacity, 1))}.hover\:shadow-md:hover{--tw-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.hover\:shadow-primary\/30:hover{--tw-shadow-color:rgb(0 83 202 / 0.3);--tw-shadow:var(--tw-shadow-colored)}.focus\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)}.focus\:ring-primary\/20:focus{--tw-ring-color:rgb(0 83 202 / 0.2)}.active\:scale-90:active{--tw-scale-x:.9;--tw-scale-y:.9;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.dark\:bg-slate-900\/70:is(.dark *){background-color:rgb(15 23 42 / 0.7)}.dark\:shadow-none:is(.dark *){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}@media (min-width: 768px){.md\:px-8{padding-left:2rem;padding-right:2rem}.md\:text-base{font-size:1rem;line-height:1.5rem}}</style></head>
<body class="bg-surface-container-lowest font-body text-on-surface min-h-screen flex flex-col overflow-hidden" data-mode="connect">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-sm dark:shadow-none flex items-center justify-between px-6 h-16">
<div class="flex items-center gap-3">
<div class="relative">
<img alt="Alex Chen" class="w-10 h-10 rounded-full object-cover border-2 border-primary-container" data-alt="Close-up portrait of a young professional male academic with short dark hair and a friendly expression in a soft-lit indoor setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfCIrgqPihrPgLVWJCy6y2rb0Mv9hWOZ5-B1LvrGARL4TePRvidYs_d7Wu3ObpBOaQNIjyZ2Tt3fbmknozQobbq90Adt8w63uQUh7Gn-_F4mkozxFcP8gXRJRvc6H-OeB985wo9kvE6XtqSDwPWyAxP5LSMrBIWrnBMsxlNNiaXFAVhdrsbv1noar57dfAMQVHkIH9qNlambx_F33Mx7_oqLKyDvvksgDVv96-S8UhOSkuidrQMN7oym29syQRFdXp549eJupTP85C">
<div class="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-white"></div>
</div>
<div class="flex flex-col">
<h1 class="font-headline font-bold tracking-tight text-on-surface text-lg leading-tight">Alex Chen</h1>
<span class="text-[10px] font-semibold text-secondary uppercase tracking-widest">Online</span>
</div>
</div>
<div class="flex items-center gap-2">
<button class="w-10 h-10 flex items-center justify-center rounded-full text-blue-700 hover:bg-primary/10 transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="videocam">videocam</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-full text-blue-700 hover:bg-primary/10 transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="call">call</span>
</button>
<button class="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-primary/10 transition-colors active:scale-95 duration-200">
<span class="material-symbols-outlined" data-icon="more_vert">more_vert</span>
</button>
</div>
</header>
<!-- Chat Canvas -->
<main class="flex-1 mt-16 mb-20 overflow-y-auto chat-scrollbar px-4 md:px-8 py-6 max-w-4xl mx-auto w-full space-y-8">
<!-- Date Divider -->
<div class="flex justify-center my-4">
<span class="px-4 py-1 bg-surface-container-low text-on-surface-variant text-xs font-bold rounded-full uppercase tracking-widest">Today</span>
</div>
<!-- Alex Message -->
<div class="flex items-end gap-3 max-w-[85%]">
<img class="w-8 h-8 rounded-full" data-alt="Portrait of Alex Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBv5d8dLfjYnyRrlGzjwNAzaM_apzR5gefhf0BiDwM1W4fXR6XxUNxLsK6LKwdtVkEIlbPJdYqU72fga6nojRIqMDEdI9R1_rIFjUlDsiK4xyaEQhdzXedvq5W-hFuVHwsCY0Prgjo1LPmXSzHN5q48-7aNTU0bf6e-FIxslvFiZONDEHWpzHFoRI8ytRJz3y-eAEE61_8FeKPnQ9JuPEQclLXYLlXg-0KmMCMcPrvKuJ41IUVCe8yOT6eRFHf5R4PEfxmIKOKUjYeS">
<div class="space-y-1">
<div class="bg-surface-container-high text-on-surface p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
<p class="text-sm md:text-base leading-relaxed">Hey! I've just finished reviewing the draft for the research paper. The methodology section looks incredibly solid.</p>
</div>
<span class="text-[10px] text-on-surface-variant px-1">10:24 AM</span>
</div>
</div>
<!-- User Message -->
<div class="flex flex-col items-end gap-1 ml-auto max-w-[85%]">
<div class="bg-primary text-on-primary p-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-md">
<p class="text-sm md:text-base leading-relaxed">That's great to hear! Do you think we should expand more on the data collection phase or is it concise enough?</p>
</div>
<div class="flex items-center gap-1 px-1">
<span class="text-[10px] text-on-surface-variant">10:26 AM</span>
<span class="material-symbols-outlined text-[12px] text-primary" style="font-variation-settings: 'FILL' 1;">done_all</span>
</div>
</div>
<!-- Alex Message with Shared Resource -->
<div class="flex items-end gap-3 max-w-[85%]">
<img class="w-8 h-8 rounded-full" data-alt="Portrait of Alex Chen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOrnIC6Yva4pqyI-Dpq5d-_CdVjW2GzMWd65e_KJFhylUfVXw_-yf_M3WWGHNq6fhI2VLZgklRMXdSzRtOrAmFKRL0PVSUdVuJzGGtuQ48W85WE1YDfRSiArQNuCwZYAU-gs4rJXoH0eOksVo7avG7t7pgEFAIYJiRPOw0NaSPmZTaAYOIYoxMWwx24SbyYjYhXm-nxcaHDoxFFiflgeJolnoWyt8kC0tYSWhgynWnQyAuE30gFuNpFR8EDJLevcj0ION6-iBBFOg5">
<div class="space-y-3">
<div class="bg-surface-container-high text-on-surface p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm shadow-sm">
<p class="text-sm md:text-base leading-relaxed">I think we could add a bit more on the sampling criteria. By the way, check out this reference I found, it might help strengthen our argument.</p>
</div>
<!-- Resource Card -->
<div class="bg-white border border-outline-variant/20 rounded-xl p-3 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
<div class="w-12 h-12 bg-tertiary-container rounded-lg flex items-center justify-center text-on-tertiary-container">
<span class="material-symbols-outlined">description</span>
</div>
<div class="flex-1 min-w-0">
<p class="font-bold text-sm truncate">Academic_Reference_V2.pdf</p>
<p class="text-xs text-on-surface-variant">2.4 MB • PDF Document</p>
</div>
<span class="material-symbols-outlined text-on-surface-variant">download</span>
</div>
<span class="text-[10px] text-on-surface-variant px-1">10:28 AM</span>
</div>
</div>
<!-- Typing Indicator -->
<div class="flex items-center gap-2 px-11 opacity-60">
<div class="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce"></div>
<div class="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.2s]"></div>
<div class="w-1.5 h-1.5 bg-on-surface-variant rounded-full animate-bounce [animation-delay:0.4s]"></div>
</div>
</main>
<!-- Bottom Input Area -->
<div class="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl px-4 py-4 md:px-8 flex items-center gap-3">
<button class="w-10 h-10 flex-shrink-0 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-full transition-colors">
<span class="material-symbols-outlined">add_circle</span>
</button>
<div class="flex-1 relative">
<input class="w-full bg-surface-container-low border-none rounded-full py-3 px-6 text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant" placeholder="Type a message..." type="text">
<div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
<button class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span class="material-symbols-outlined">sentiment_satisfied</span>
</button>
</div>
</div>
<button class="w-12 h-12 flex-shrink-0 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-primary/30 transition-all active:scale-90">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">send</span>
</button>
</div>
<!-- Persistent Bottom Nav (Suppressing standard shell for chat focus as per guidelines) -->
<!-- However, providing a minimal access to settings if needed, but per rule: suppress shell for task-focused sub-pages -->
<!-- Mobile FAB Suppression: FAB is only for primary home/dashboard actions -->
</body></html>

<!-- 聊天详情 - Alex Chen -->
<!DOCTYPE html>

<html lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Manrope', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        h1, h2, h3 {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "surface-container-low": "#f0efff",
                        "outline-variant": "#a5aad7",
                        "error-dim": "#9f0519",
                        "primary": "#0053ca",
                        "on-primary": "#f1f2ff",
                        "on-error-container": "#570008",
                        "primary-container": "#769dff",
                        "on-secondary-container": "#005d22",
                        "on-surface-variant": "#545981",
                        "tertiary": "#6d5a00",
                        "primary-dim": "#0049b2",
                        "secondary-fixed": "#5cfd80",
                        "on-tertiary-container": "#594a00",
                        "inverse-on-surface": "#959ac6",
                        "on-surface": "#262c51",
                        "on-secondary-fixed-variant": "#006827",
                        "tertiary-fixed": "#fdd400",
                        "surface-container-highest": "#d8daff",
                        "inverse-surface": "#05092f",
                        "on-primary-container": "#001f56",
                        "on-tertiary-fixed": "#433700",
                        "on-background": "#262c51",
                        "tertiary-dim": "#5f4e00",
                        "primary-fixed-dim": "#5f8fff",
                        "secondary-fixed-dim": "#4bee74",
                        "inverse-primary": "#5a8cff",
                        "on-tertiary": "#fff2ce",
                        "tertiary-fixed-dim": "#edc600",
                        "on-secondary": "#cfffce",
                        "secondary-dim": "#005d22",
                        "outline": "#6f749e",
                        "error-container": "#fb5151",
                        "surface-tint": "#0053ca",
                        "primary-fixed": "#769dff",
                        "on-tertiary-fixed-variant": "#645300",
                        "on-primary-fixed-variant": "#002869",
                        "surface": "#f7f5ff",
                        "surface-container": "#e6e6ff",
                        "secondary-container": "#5cfd80",
                        "surface-container-high": "#dfe0ff",
                        "surface-bright": "#f7f5ff",
                        "error": "#b31b25",
                        "on-primary-fixed": "#000000",
                        "on-secondary-fixed": "#004819",
                        "secondary": "#006a28",
                        "on-error": "#ffefee",
                        "tertiary-container": "#fdd400",
                        "surface-variant": "#d8daff",
                        "surface-dim": "#cdd1ff",
                        "surface-container-lowest": "#ffffff",
                        "background": "#f7f5ff"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface min-h-screen pb-32">
<!-- TopAppBar -->
<header class="w-full top-0 sticky z-50 bg-[#f7f5ff] dark:bg-slate-950 flex items-center px-6 py-4 w-full">
<div class="flex items-center gap-4 w-full">
<button class="text-[#0053ca] dark:text-[#769dff] hover:bg-[#dfe0ff]/50 dark:hover:bg-slate-800 transition-colors active:scale-95 duration-200 p-2 rounded-full">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#262c51] dark:text-[#f0efff]">编辑资料</h1>
</div>
</header>
<main class="max-w-md mx-auto px-6 pt-8 space-y-10">
<!-- Profile Picture Section -->
<section class="flex flex-col items-center">
<div class="relative group">
<div class="w-32 h-32 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-lg bg-surface-container">
<img alt="User profile" class="w-full h-full object-cover" data-alt="Close-up portrait of a young college student with a friendly expression in a bright, modern campus library setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1hKGM_6lVHVji_LmkuBloFaVuTFIu7ZU2s-pPa8pZh7fH-CeLzNEHr6l1DbW6epdNjnqcpKfEUezt3FpNQCt54IRveIFkw5Mj_QR8wH3vRKxnIwLY1RXeqRA4m-WLq4gCCndSWmPbvZ7Ey-Ey4gQMFp2uva2iVWPmhDTkDA6bystwCtKue40TUEhtUG9CEL6ui6KZkD57stGILKmt2K7DPBrcAeL-zhxLYMK7B-1zY8EhYlUK6IlMiUwMBLh8CI1whu3lMpLHlyx2"/>
</div>
<button class="absolute bottom-0 right-0 bg-primary text-on-primary p-2.5 rounded-full shadow-md active:scale-90 transition-transform duration-150">
<span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">photo_camera</span>
</button>
</div>
<p class="mt-4 text-on-surface-variant text-sm font-medium">点击图标更换头像</p>
</section>
<!-- Form Section -->
<div class="space-y-8">
<!-- Bento Card for Basic Info -->
<div class="bg-surface-container-lowest p-6 rounded-lg space-y-6">
<!-- Name Field -->
<div class="space-y-2">
<label class="block text-sm font-bold text-on-surface ml-1">姓名</label>
<div class="relative">
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium" type="text" value="陈学术"/>
</div>
</div>
<!-- Major & Grade (Row) -->
<div class="grid grid-cols-2 gap-4">
<div class="space-y-2">
<label class="block text-sm font-bold text-on-surface ml-1">专业</label>
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium" type="text" value="计算机科学"/>
</div>
<div class="space-y-2">
<label class="block text-sm font-bold text-on-surface ml-1">年级</label>
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium" type="text" value="大三"/>
</div>
</div>
</div>
<!-- Bio Section -->
<div class="bg-surface-container-lowest p-6 rounded-lg space-y-3">
<label class="block text-sm font-bold text-on-surface ml-1">个人简介</label>
<textarea class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/30 transition-shadow font-medium resize-none leading-relaxed" rows="4">热爱算法研究与产品设计，正在寻找志同道合的小伙伴一起参加下个学期的开发者大赛。平时喜欢在校园咖啡厅写代码。</textarea>
<div class="flex justify-end">
<span class="text-xs text-on-surface-variant">84 / 200</span>
</div>
</div>
<!-- Tags Section (Editorial Touch) -->
<div class="space-y-3">
<h3 class="text-sm font-bold text-on-surface ml-1 px-6">校园标签</h3>
<div class="flex flex-wrap gap-2 px-6">
<span class="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">技术达人</span>
<span class="bg-surface-container-high text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">图书馆常客</span>
<span class="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">羽毛球爱好者</span>
<button class="border-2 border-dashed border-outline-variant/30 text-on-surface-variant px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-sm">add</span> 添加
                    </button>
</div>
</div>
</div>
<!-- Growth Track Decorative Element -->
<div class="px-6 py-4">
<div class="bg-surface-container-low p-5 rounded-lg border-l-4 border-secondary">
<div class="flex justify-between items-center mb-2">
<span class="text-xs font-bold text-secondary uppercase tracking-widest">资料完整度</span>
<span class="text-xs font-bold text-on-surface">85%</span>
</div>
<div class="w-full bg-secondary-container/30 h-2 rounded-full overflow-hidden">
<div class="bg-secondary h-full rounded-full w-[85%]"></div>
</div>
<p class="text-[10px] text-on-surface-variant mt-3 italic">完善社交账号链接可获得“社交达人”勋章</p>
</div>
</div>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-8 py-6 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl z-50 rounded-t-[2rem] shadow-[0_-20px_40px_rgba(38,44,81,0.06)]">
<!-- Cancel Action -->
<button class="flex flex-col items-center justify-center text-[#545981] dark:text-[#a5aad7] px-6 py-3 hover:opacity-90 transition-opacity active:scale-98 duration-150">
<span class="material-symbols-outlined mb-1">close</span>
<span class="font-['Manrope'] font-semibold text-sm">取消</span>
</button>
<!-- Save Action (Active State) -->
<button class="flex flex-col items-center justify-center bg-gradient-to-br from-[#0053ca] to-[#769dff] text-white rounded-full px-8 py-3 hover:opacity-90 transition-opacity active:scale-98 duration-150">
<span class="material-symbols-outlined mb-1" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span class="font-['Manrope'] font-semibold text-sm">保存</span>
</button>
</nav>
</body></html>

<!-- 编辑资料 (Edit Profile) -->
<html lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "error": "#b31b25",
              "outline-variant": "#a5aad7",
              "inverse-on-surface": "#959ac6",
              "secondary-container": "#5cfd80",
              "on-tertiary-fixed-variant": "#645300",
              "on-primary-fixed": "#000000",
              "primary-fixed": "#769dff",
              "surface-container-high": "#dfe0ff",
              "surface-tint": "#0053ca",
              "secondary-dim": "#005d22",
              "on-secondary-fixed": "#004819",
              "secondary": "#006a28",
              "primary-dim": "#0049b2",
              "tertiary-fixed": "#fdd400",
              "surface-container": "#e6e6ff",
              "on-secondary-fixed-variant": "#006827",
              "surface-container-low": "#f0efff",
              "surface-container-highest": "#d8daff",
              "surface-dim": "#cdd1ff",
              "surface": "#f7f5ff",
              "surface-bright": "#f7f5ff",
              "on-tertiary-container": "#594a00",
              "inverse-surface": "#05092f",
              "on-primary": "#f1f2ff",
              "on-secondary-container": "#005d22",
              "on-surface": "#262c51",
              "on-background": "#262c51",
              "secondary-fixed": "#5cfd80",
              "tertiary": "#6d5a00",
              "background": "#f7f5ff",
              "outline": "#6f749e",
              "on-secondary": "#cfffce",
              "inverse-primary": "#5a8cff",
              "surface-variant": "#d8daff",
              "on-tertiary": "#fff2ce",
              "primary-fixed-dim": "#5f8fff",
              "on-tertiary-fixed": "#433700",
              "error-dim": "#9f0519",
              "primary": "#0053ca",
              "secondary-fixed-dim": "#4bee74",
              "on-surface-variant": "#545981",
              "on-primary-fixed-variant": "#002869",
              "on-primary-container": "#001f56",
              "surface-container-lowest": "#ffffff",
              "on-error-container": "#570008",
              "tertiary-fixed-dim": "#edc600",
              "on-error": "#ffefee",
              "error-container": "#fb5151",
              "primary-container": "#769dff",
              "tertiary-dim": "#5f4e00",
              "tertiary-container": "#fdd400"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Manrope"],
              "label": ["Manrope"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            vertical-align: middle;
        }
        body { font-family: 'Manrope', sans-serif; }
        h1, h2, h3 { font-family: 'Plus Jakarta Sans', sans-serif; }
        .card-shadow {
            box-shadow: 0 10px 40px -10px rgba(0, 83, 202, 0.08);
        }
        .card-hover:hover {
            box-shadow: 0 20px 50px -12px rgba(0, 83, 202, 0.12);
            transform: translateY(-2px);
        }
        .inner-glow {
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
    </style>
</head>
<body class="bg-surface text-on-surface min-h-screen pb-24">
<!-- TopAppBar Navigation Shell -->
<nav class="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm shadow-blue-900/5 flex items-center justify-between px-6 h-16">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container overflow-hidden">
<img alt="Student Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjPpA8dmvMiFAC4EGKRNNSIlbg-ErDyd4NBuAwBYynPtGFeHUa51TQ0uLX5nEXekgKzsuGtiOLB1WrssoW7N394XpkmydErb2lEn3DZoXTAtR8OAsPQnt1ME9Qb-uitgQPBz6Z0Qu5BR5ifx3G0X2cIH1mYm6H425LRiGEaPmxHn76SmYgsjgU_zO3O9F2awVKHQ_l7YqQn63PMahxNbrFZTV0DEKF4_tCwXZx9OKiHK-i1amoLMqOFgTNjG1aUUlkmrpg0ss_en1U"/>
</div>
<span class="font-headline text-2xl font-bold tracking-tight text-blue-700">Campus Atelier</span>
</div>
<!-- Desktop Nav Items -->
<div class="hidden md:flex items-center gap-8">
<a class="text-slate-500 font-medium hover:bg-blue-50/50 transition-all px-3 py-2 rounded-lg" href="#">首页</a>
<a class="text-blue-700 border-b-2 border-blue-600 font-medium px-3 py-2" href="#">组队广场</a>
<a class="text-slate-500 font-medium hover:bg-blue-50/50 transition-all px-3 py-2 rounded-lg" href="#">校园集市</a>
<a class="text-slate-500 font-medium hover:bg-blue-50/50 transition-all px-3 py-2 rounded-lg" href="#">个人中心</a>
</div>
<div class="flex items-center">
<button class="p-2 rounded-full text-blue-700 hover:bg-blue-50/50 active:scale-95 duration-200">
<span class="material-symbols-outlined">notifications</span>
</button>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="pt-24 px-6 max-w-5xl mx-auto">
<!-- Page Header -->
<header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 class="text-4xl font-extrabold tracking-tighter text-on-surface mb-2">组队广场</h1>
<p class="text-on-surface-variant font-medium">寻找志同道合的队友，共赴学术、竞赛与活动之约</p>
</div>
<div class="flex gap-2">
<div class="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2 text-on-surface-variant text-sm font-semibold cursor-pointer hover:bg-white transition-colors">
<span class="material-symbols-outlined text-sm">filter_list</span>
                    筛选
                </div>
<div class="bg-surface-container-low px-4 py-2 rounded-full flex items-center gap-2 text-on-surface-variant text-sm font-semibold cursor-pointer hover:bg-white transition-colors">
<span class="material-symbols-outlined text-sm">sort</span>
                    最新发布
                </div>
</div>
</header>
<!-- Horizontal Competition/Activity Feed -->
<section class="space-y-6">
<!-- Card 1: ACM -->
<article class="group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row card-shadow card-hover transition-all duration-500 border border-slate-100/50">
<div class="md:w-[40%] relative overflow-hidden">
<img class="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdTU28qBBHmkhxiCFAY7JyPeF6BboRUkCiMeH6M5vuPKEDvOJQ9g0Yb-jME8t9GUvwsJfp8ho8zGpwZhtfj7lsBD9SQk4fomuPRLlOZzmDyn522eK2qJcsOIXiHuSu97w4rrPOUu4wnMoE0D5mi3tws6dsqa20n73OmanP_bk6lmwQqBXFLfP-dDlRSGJZ5ccvemngbbJRilKLrZbJ23SVOMueC4iDoi6CE2XiUp_-V6mPZeF5Dbr24Jw4V0Q58TKRLnkxZlO9hyVy"/>
<div class="absolute inset-0 inner-glow pointer-events-none"></div>
<div class="absolute top-4 left-4 bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">工科</div>
</div>
<div class="p-8 flex flex-col justify-between flex-1">
<div>
<div class="flex items-center mb-3">
<span class="text-secondary font-bold text-xs flex items-center gap-1.5 bg-secondary/5 px-2.5 py-1 rounded-full">
<span class="material-symbols-outlined text-[16px]">event_available</span>
                                报名截止：2024.11.15
                            </span>
</div>
<h2 class="text-2xl font-extrabold text-on-surface mb-5 leading-tight group-hover:text-primary transition-colors">ACM 国际大学生程序设计竞赛</h2>
<div class="mb-6">
<h3 class="text-[10px] font-extrabold text-on-surface-variant/60 uppercase tracking-[0.2em] mb-3">寻找队友 (LOOKING FOR)</h3>
<div class="flex flex-wrap gap-2.5">
<span class="bg-primary/10 px-4 py-1.5 rounded-lg text-xs font-bold text-primary border border-primary/10">C++ 高手</span>
<span class="bg-primary/10 px-4 py-1.5 rounded-lg text-xs font-bold text-primary border border-primary/10">算法策略师</span>
<span class="bg-primary/10 px-4 py-1.5 rounded-lg text-xs font-bold text-primary border border-primary/10">前端开发</span>
</div>
</div>
</div>
<div class="flex items-center justify-between pt-6 mt-auto border-t border-slate-50">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full ring-2 ring-primary/5 bg-slate-200 overflow-hidden shadow-sm">
<img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpGHuMr8T-ZQSav-MLzFCYD4I0uT0ZVS7Rnbq2nQum2FX6WIL3FrFU_nilnmNw-FrBJ7NEsAT9RhwHN1DxLhS8kc7Evfll3p4KVtOn75_AWOEwzcoiIqaXwZQaM_WpqhBg-cEmg7VStJWfbC2ccs7m3JpBb_ko4xWqvd4kdLPxYg45SnHp1nq6fclZNgwFyqLsYz97640DxVCUjXZCd53Oknu7-volEvAnJGO5wJ9d3boNrpsF-6ezotn18_KvPBNrDXkGX14PYPxC"/>
</div>
<div class="text-xs">
<p class="font-bold text-on-surface">Captain Chen</p>
<p class="text-on-surface-variant/80 font-medium">计算机科学 '25</p>
</div>
</div>
<button class="px-6 py-3 rounded-lg bg-primary text-on-primary font-bold text-sm shadow-[0_8px_20px_-6px_rgba(0,83,202,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,83,202,0.5)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all">
                            立即加入
                        </button>
</div>
</div>
</article>
<!-- New Activity Card: Campus Singer Contest -->
<article class="group bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row card-shadow card-hover transition-all duration-500 border border-slate-100/50">
<div class="md:w-[40%] relative overflow-hidden">
<img class="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJOHHaqEhYz8dD7PBdXU834UXQLah5gwfsBOnP2RwnfyFxvreGWyJCFm_LTPW_G6yalmTZ8t8li6M7plx4-6BDlBQug_0L2W9wP6jWNaBSdLUDTiddEklrRteGIaf5VlYSILp7Ppfywbm2db5VYMjp5H5vAoQOsBPGa3kCJhlYoB1TCInOiKo47-TIF4Z1AoxdXbn9Buhqu18S3Bt7GEoDfnKgx73M15THOooGQvEP8ed2eHc9npi5ASVBxj--uf8JOU3kPjZDB0bX"/>
<div class="absolute inset-0 inner-glow pointer-events-none"></div>
<div class="absolute top-4 left-4 bg-error/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">艺术</div>
</div>
<div class="p-8 flex flex-col justify-between flex-1">
<div>
<div class="flex items-center mb-3">
<span class="text-secondary font-bold text-xs flex items-center gap-1.5 bg-secondary/5 px-2.5 py-1 rounded-full">
<span class="material-symbols-outlined text-[16px]">event_available</span>
                                报名截止：2024.11.28
                            </span>
</div>
<h2 class="text-2xl font-extrabold text-on-surface mb-5 leading-tight group-hover:text-error transition-colors">校园十佳歌手大赛 - 组合组队</h2>
<div class="mb-6">
<h3 class="text-[10px] font-extrabold text-on-surface-variant/60 uppercase tracking-[0.2em] mb-3">寻找队友 (LOOKING FOR)</h3>
<div class="flex flex-wrap gap-2.5">
<span class="bg-error/10 px-4 py-1.5 rounded-lg text-xs font-bold text-error border border-error/10">键盘手/钢琴</span>
<span class="bg-error/10 px-4 py-1.5 rounded-lg text-xs font-bold text-error border border-error/10">伴唱/和声</span>
<span class="bg-error/10 px-4 py-1.5 rounded-lg text-xs font-bold text-error border border-error/10">编曲指导</span>
</div>
</div>
</div>
<div class="flex items-center justify-between pt-6 mt-auto border-t border-slate-50">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full ring-2 ring-error/5 bg-slate-200 overflow-hidden shadow-sm flex items-center justify-center">
<span class="material-symbols-outlined text-slate-400">account_circle</span>
</div>
<div class="text-xs">
<p class="font-bold text-on-surface">MusicLover_Xiao</p>
<p class="text-on-surface-variant/80 font-medium">艺术学院 '26</p>
</div>
</div>
<button class="px-6 py-3 rounded-lg bg-error text-on-primary font-bold text-sm shadow-[0_8px_20px_-6px_rgba(179,27,37,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(179,27,37,0.5)] hover:-translate-y-0.5 active:scale-95 active:translate-y-0 transition-all">
                            立即加入
                        </button>
</div>
</div>
</article>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full h-20 bg-[#ffffff]/70 backdrop-blur-xl flex justify-around items-center px-6 pb-2 z-50 rounded-t-lg shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Home</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 scale-110 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Explore</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Post</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Profile</span>
</a>
</nav><!-- Floating Action Button -->
<button class="fixed right-6 bottom-24 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all duration-300 z-50">
<span class="material-symbols-outlined text-3xl">add</span>
</button></body></html>

<!-- 组队广场 - 视觉美化版 -->
<!DOCTYPE html>

<html class="light" lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "outline-variant": "#a5aad7",
              "on-secondary": "#cfffce",
              "background": "#f7f5ff",
              "on-secondary-fixed": "#004819",
              "on-primary-fixed-variant": "#002869",
              "inverse-on-surface": "#959ac6",
              "on-error": "#ffefee",
              "tertiary-fixed-dim": "#edc600",
              "tertiary": "#6d5a00",
              "surface-tint": "#0053ca",
              "on-surface": "#262c51",
              "secondary": "#006a28",
              "surface-container-highest": "#d8daff",
              "secondary-fixed": "#5cfd80",
              "error": "#b31b25",
              "on-tertiary-fixed-variant": "#645300",
              "secondary-dim": "#005d22",
              "on-secondary-container": "#005d22",
              "primary-fixed": "#769dff",
              "secondary-container": "#5cfd80",
              "surface-container-low": "#f0efff",
              "primary": "#0053ca",
              "on-primary": "#f1f2ff",
              "on-primary-fixed": "#000000",
              "error-container": "#fb5151",
              "on-surface-variant": "#545981",
              "secondary-fixed-dim": "#4bee74",
              "primary-container": "#769dff",
              "tertiary-fixed": "#fdd400",
              "surface-variant": "#d8daff",
              "primary-dim": "#0049b2",
              "inverse-primary": "#5a8cff",
              "on-background": "#262c51",
              "surface-container": "#e6e6ff",
              "surface-bright": "#f7f5ff",
              "outline": "#6f749e",
              "error-dim": "#9f0519",
              "on-primary-container": "#001f56",
              "on-error-container": "#570008",
              "primary-fixed-dim": "#5f8fff",
              "tertiary-container": "#fdd400",
              "surface": "#f7f5ff",
              "on-secondary-fixed-variant": "#006827",
              "on-tertiary": "#fff2ce",
              "surface-dim": "#cdd1ff",
              "on-tertiary-container": "#594a00",
              "on-tertiary-fixed": "#433700",
              "tertiary-dim": "#5f4e00",
              "surface-container-high": "#dfe0ff",
              "surface-container-lowest": "#ffffff",
              "inverse-surface": "#05092f"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Manrope"],
              "label": ["Manrope"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #f7f5ff;
            font-family: 'Manrope', sans-serif;
            color: #262c51;
        }
        .editorial-shadow {
            box-shadow: 0 20px 40px rgba(38, 44, 81, 0.06);
        }
    </style>
<style>
        body {
            min-height: max(884px, 100dvh);
        }
    </style>
</head>
<body class="bg-background min-h-screen pb-32">
<!-- TopAppBar -->
<nav class="fixed top-0 w-full z-50 bg-[#ffffff]/70 backdrop-blur-xl flex items-center justify-between px-6 h-16 shadow-[0_20px_40px_rgba(38,44,81,0.06)]">
<div class="flex items-center gap-4">
<button class="text-[#0053ca] active:scale-95 duration-200">
<span class="material-symbols-outlined">arrow_back</span>
</button>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold tracking-tight text-[#262c51] text-xl">个人资料</h1>
</div>
<div class="flex items-center gap-4">
<button class="p-2 rounded-full hover:bg-[#f0efff] transition-colors text-[#545981]">
<span class="material-symbols-outlined">settings</span>
</button>
</div>
<div class="absolute bottom-0 left-0 w-full bg-[#f0efff] h-[1px] opacity-15"></div>
</nav>
<main class="pt-24 px-6 max-w-5xl mx-auto space-y-10">
<!-- Profile Header Section -->
<section class="relative">
<div class="bg-surface-container-low rounded-lg p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center md:items-end gap-8">
<!-- Large Avatar -->
<div class="relative z-10">
<div class="w-32 h-32 md:w-44 md:h-44 rounded-xl overflow-hidden editorial-shadow border-4 border-surface-container-lowest rotate-2">
<img alt="Captain Chen Profile" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBOYcCBF98Y2F1MqSAXIS4fsAHnHlKv05DRAbbpKiRK7o4ieU7zRUKnFCdV2dXNq9P0NWxZDjjYId5x73YBjyzWWOx_HKey6Vo_mCVRD_uIXX2Lpr4cs3NVErXMt6Ff3bch9SYHsw41Vc-ECgsoGsO_SHVLjYPydvXATYfK8MPjl3UpMsSY7UW0M3k6n5-lEykJGLZx54S9kpYw3I8itljQ9QN7g79QJRmAbJmA1kscviZ2A-b8tx0TEM-GIeA0H1GOl4J8ZJ0b0l_"/>
</div>
</div>
<div class="flex-1 text-center md:text-left space-y-2">
<h2 class="font-headline font-extrabold text-4xl md:text-5xl text-on-surface tracking-tight">Captain Chen</h2>
<p class="text-on-surface-variant text-lg font-body max-w-xl">一名热爱全栈开发和竞赛的程序员。</p>
</div>
</div>
<!-- Decorative Accent -->
<div class="absolute -top-10 -right-10 w-40 h-40 bg-primary-container/20 rounded-full blur-3xl"></div>
</section>
<!-- Bento Grid: Stats & Info -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-6">
<div class="md:col-span-2 bg-surface-container-lowest p-8 rounded-lg editorial-shadow flex flex-col justify-between group">
<div class="space-y-4">
<span class="inline-block px-3 py-1 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-full">学术路径</span>
<h3 class="font-headline font-bold text-3xl text-on-surface">计算机科学</h3>
</div>
<div class="flex items-center gap-4 mt-8">
<div class="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
<span class="material-symbols-outlined">school</span>
</div>
<div>
<p class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">主修方向</p>
<p class="font-bold text-on-surface">系统架构</p>
</div>
</div>
</div>
<div class="bg-primary p-8 rounded-lg editorial-shadow text-on-primary flex flex-col justify-between relative overflow-hidden">
<div class="relative z-10">
<p class="text-sm font-bold opacity-80 uppercase tracking-widest">毕业年份</p>
<h3 class="text-6xl font-headline font-black mt-2">2025</h3>
</div>
<div class="relative z-10 flex items-center gap-2 mt-4">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">calendar_today</span>
<span class="font-bold">大四</span>
</div>
<!-- Abstract Gradient Swirl -->
<div class="absolute -bottom-10 -right-10 w-32 h-32 bg-primary-container rounded-full opacity-30 blur-2xl"></div>
</div>
</section>
<!-- Stats Overview Row -->
<section class="grid grid-cols-2 md:grid-cols-4 gap-4">
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">12</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">项目</p>
</div>
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">450+</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">LeetCode</p>
</div>
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">3</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">实习</p>
</div>
<div class="text-center p-6 bg-surface-container-lowest rounded-lg editorial-shadow">
<p class="text-3xl font-black text-primary">18</p>
<p class="text-sm font-bold text-on-surface-variant uppercase tracking-tight">奖项</p>
</div>
</section>
<!-- Skills Section -->
<section class="space-y-6">
<div class="flex items-baseline justify-between">
<h4 class="font-headline font-bold text-2xl text-on-surface">专业技能与特长</h4>
<span class="text-primary font-bold text-sm cursor-pointer hover:underline">查看证书</span>
</div>
<div class="flex flex-wrap gap-3">
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-primary"></div>
                    C++ 专家
                </div>
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-secondary"></div>
                    算法策略
                </div>
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-tertiary"></div>
                    前端开发
                </div>
<div class="bg-surface-container-lowest px-6 py-3 rounded-full editorial-shadow font-bold text-on-surface flex items-center gap-2 border border-outline-variant/15 transition-all hover:scale-105">
<div class="w-2 h-2 rounded-full bg-error"></div>
                    后端工程师
                </div>
</div>
</section>
<!-- Participations Section -->
<section class="space-y-8">
<h4 class="font-headline font-bold text-2xl text-on-surface">正在参与的项目</h4>
<div class="grid grid-cols-1 md:grid-cols-2 gap-10">
<!-- Project Card 1 -->
<div class="flex flex-col gap-4">
<div class="h-64 rounded-lg overflow-hidden editorial-shadow bg-surface-container-low group">
<img alt="ACM Contest" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCyKg1pVPFbqOQVVADpsfWg9JYDZX0RO_idNR0QJfvefRrQppJNfcSaKPqACvSgYzQpsHswOsiSfPWcIU9X3YwJT-v7yuByF43ZMn7FE5cDQoUaVIafsx7OfvGltL-_A-29bYS8Ig7fH-qUA5Jk7b5wKjbyZ2R4XAyOMl63mcheDWFaCprZNQZgUNcDiLR1cMVU3vgwYPLc_2eLKBXW3igMK6ainfI48h0sxjtW_1TBFy-Nf9782nlHbQB8AM8Z2X8OGQEMJGuf5P1"/>
</div>
<div class="px-2 space-y-2">
<p class="text-primary font-black text-xs uppercase tracking-widest">比赛</p>
<h5 class="font-headline font-bold text-xl leading-tight">ACM 国际大学生程序设计竞赛</h5>
<div class="flex items-center gap-4 text-sm text-on-surface-variant pt-2">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">group</span> 队长</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">location_on</span> 区域赛</span>
</div>
</div>
</div>
<!-- Project Card 2 -->
<div class="flex flex-col gap-4 md:mt-12">
<div class="h-64 rounded-lg overflow-hidden editorial-shadow bg-surface-container-low group">
<img alt="Global Strategy Challenge" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmJGAzMMHLZNczwqSeCK1z2GV_hj1ZZLoEfGM93iYKCPkl3wFiNZY7Rfii9stPMsvuGltVS2WOgW4EOGbXFtte0eFpohIxS6VvVw1f3dvESrvC0XWkzmuu7niTyiAb-HIOY2Bt8GZDD9698DhWTDpmKfqeOfZxgPHPQW473muHzhaBfLx2kXk9FVki3JTnFnvSvDmzOiyKU4B0Ezlww7GFKbMFLIgjvSlYAAB2PIDSldDie-SbBcbu9Cees16Jgc6xCJivKDLhKyox"/>
</div>
<div class="px-2 space-y-2">
<p class="text-secondary font-black text-xs uppercase tracking-widest">案例研究</p>
<h5 class="font-headline font-bold text-xl leading-tight">全球商业战略挑战赛</h5>
<div class="flex items-center gap-4 text-sm text-on-surface-variant pt-2">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">group</span> 技术顾问</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">public</span> 国际</span>
</div>
</div>
</div>
</div>
</section>
</main>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full h-20 bg-[#ffffff]/70 backdrop-blur-xl flex justify-around items-center px-6 pb-2 z-50 rounded-t-lg shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Explore</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Post</span>
</a>
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 scale-110 active:scale-90 transition-all duration-300 shadow-lg" href="#">
<span class="material-symbols-outlined" data-icon="person" style="font-variation-settings: 'FILL' 1;">person</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Profile</span>
</a>
</nav>
</body></html>

<!-- 个人中心 - 中文优化版 -->
<!DOCTYPE html>

<html lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>发布商品 - 校园集市</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&amp;family=Manrope:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "error-dim": "#9f0519",
                        "inverse-primary": "#5a8cff",
                        "outline": "#6f749e",
                        "tertiary": "#6d5a00",
                        "secondary": "#006a28",
                        "on-tertiary": "#fff2ce",
                        "surface-container-lowest": "#ffffff",
                        "on-error": "#ffefee",
                        "surface-tint": "#0053ca",
                        "surface-container-low": "#f0efff",
                        "surface-dim": "#cdd1ff",
                        "secondary-fixed-dim": "#4bee74",
                        "primary": "#0053ca",
                        "tertiary-fixed": "#fdd400",
                        "error-container": "#fb5151",
                        "primary-fixed": "#769dff",
                        "on-error-container": "#570008",
                        "tertiary-dim": "#5f4e00",
                        "tertiary-container": "#fdd400",
                        "error": "#b31b25",
                        "outline-variant": "#a5aad7",
                        "background": "#f7f5ff",
                        "on-primary-container": "#001f56",
                        "on-primary-fixed-variant": "#002869",
                        "on-primary": "#f1f2ff",
                        "on-secondary-fixed-variant": "#006827",
                        "on-secondary-container": "#005d22",
                        "surface-container": "#e6e6ff",
                        "secondary-fixed": "#5cfd80",
                        "on-tertiary-fixed": "#433700",
                        "on-secondary-fixed": "#004819",
                        "secondary-dim": "#005d22",
                        "on-primary-fixed": "#000000",
                        "tertiary-fixed-dim": "#edc600",
                        "on-surface-variant": "#545981",
                        "on-tertiary-fixed-variant": "#645300",
                        "surface-container-high": "#dfe0ff",
                        "surface": "#f7f5ff",
                        "on-tertiary-container": "#594a00",
                        "on-surface": "#262c51",
                        "surface-container-highest": "#d8daff",
                        "on-secondary": "#cfffce",
                        "surface-bright": "#f7f5ff",
                        "secondary-container": "#5cfd80",
                        "primary-container": "#769dff",
                        "inverse-surface": "#05092f",
                        "primary-dim": "#0049b2",
                        "surface-variant": "#d8daff",
                        "primary-fixed-dim": "#5f8fff",
                        "inverse-on-surface": "#959ac6",
                        "on-background": "#262c51"
                    },
                    fontFamily: {
                        "headline": ["Plus Jakarta Sans"],
                        "body": ["Manrope"],
                        "label": ["Manrope"]
                    },
                    borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Manrope', sans-serif;
            background-color: #f7f5ff;
            color: #262c51;
        }
        .editorial-shadow {
            box-shadow: 0 20px 40px rgba(38, 44, 81, 0.06);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="min-h-screen pb-32">
<!-- TopAppBar -->
<header class="w-full sticky top-0 z-50 bg-[#ffffff] dark:bg-slate-900 flex items-center justify-between px-6 py-4 w-full">
<div class="flex items-center gap-4">
<button class="active:scale-95 duration-200 hover:opacity-80 transition-opacity">
<span class="material-symbols-outlined text-[#545981] dark:text-slate-400" data-icon="arrow_back">arrow_back</span>
</button>
<h1 class="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#262c51] dark:text-white">发布商品</h1>
</div>
<button class="font-['Plus_Jakarta_Sans'] font-bold text-lg tracking-tight text-[#0053ca] dark:text-[#769dff] active:scale-95 duration-200 hover:opacity-80 transition-opacity">
            发布
        </button>
</header>
<main class="max-w-2xl mx-auto px-6 pt-8 space-y-10">
<!-- Tab Switcher -->
<section class="flex justify-center">
<div class="bg-surface-container-low p-1.5 rounded-full flex gap-1 items-center">
<button class="px-8 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 text-on-surface-variant hover:bg-surface-container">技能互换</button>
<button class="px-8 py-2.5 rounded-full font-bold text-sm bg-surface-container-lowest text-primary shadow-sm">校园集市</button>
</div>
</section>
<!-- Template Shortcuts -->
<section class="space-y-4">
<h3 class="text-on-surface-variant text-sm font-semibold px-2">常用模版</h3>
<div class="grid grid-cols-3 gap-3">
<button class="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center gap-2 editorial-shadow active:scale-95 transition-transform">
<div class="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="auto_stories">auto_stories</span>
</div>
<span class="text-xs font-bold">二手书籍</span>
</button>
<button class="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center gap-2 editorial-shadow active:scale-95 transition-transform">
<div class="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary" data-icon="devices">devices</span>
</div>
<span class="text-xs font-bold">数码产品</span>
</button>
<button class="bg-surface-container-lowest p-4 rounded-lg flex flex-col items-center gap-2 editorial-shadow active:scale-95 transition-transform">
<div class="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary" data-icon="shopping_basket">shopping_basket</span>
</div>
<span class="text-xs font-bold">生活用品</span>
</button>
</div>
</section>
<!-- Image Upload Area -->
<section class="space-y-4">
<div class="grid grid-cols-2 gap-4">
<div class="aspect-square bg-surface-container-lowest rounded-lg editorial-shadow border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-3 group hover:border-primary/50 transition-colors cursor-pointer relative overflow-hidden">
<div class="bg-surface-container-low p-3 rounded-full group-hover:bg-primary-container/20 transition-colors">
<span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="add_a_photo">add_a_photo</span>
</div>
<span class="text-sm font-semibold text-on-surface-variant group-hover:text-primary">添加封面</span>
<p class="text-[10px] text-outline">第一张图将作为主图展示</p>
</div>
<div class="grid grid-cols-2 gap-4">
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-outline-variant" data-icon="add">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center relative overflow-hidden">
<img class="w-full h-full object-cover" data-alt="stack of academic textbooks on a clean desk with soft natural window light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGWnO9F5H3Cbo3lf92OHutLR9Nv3Ou0MvrzveBEPYm2bHR5jdYxkqJqC6KJeDb1sn7sAkKMFX1Em8qmRr63RET6cPCoslaYI2BY6fDXSxHJS8y5uF9ed2DPoQWjFibrIc8hPetY47yuIRfrgHA6SYvGcViJtAvB3KEYNd40t_TZCLGAAA0D5eBz6f1LnkACuF36eZTyfqCjN3DoEtWtHmftyz-rPhdzAkLkya9uNubk9ItbAQKhG1_SfNxpR6e18UeY5ACLZ-cSCyw"/>
<div class="absolute top-1 right-1 bg-black/40 rounded-full p-1 cursor-pointer">
<span class="material-symbols-outlined text-white text-xs" data-icon="close">close</span>
</div>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-outline-variant" data-icon="add">add</span>
</div>
<div class="aspect-square bg-surface-container-low rounded-lg flex items-center justify-center cursor-pointer hover:bg-surface-container transition-colors">
<span class="material-symbols-outlined text-outline-variant" data-icon="add">add</span>
</div>
</div>
</div>
</section>
<!-- Title & Description -->
<section class="bg-surface-container-lowest rounded-lg p-6 editorial-shadow space-y-6">
<div class="space-y-2">
<label class="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">商品标题</label>
<input class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary/30 transition-all text-on-surface placeholder:text-outline/50 font-medium" placeholder="宝贝名称，如：考研数学真题解析" type="text"/>
</div>
<div class="space-y-2">
<label class="text-[11px] font-bold text-primary uppercase tracking-widest ml-1">详细描述</label>
<textarea class="w-full bg-surface-container-low border-none rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary/30 transition-all text-on-surface placeholder:text-outline/50 font-medium resize-none" placeholder="描述一下宝贝的品牌、规格、购买渠道、转手原因等..." rows="4"></textarea>
</div>
</section>
<!-- Price & Condition -->
<section class="bg-surface-container-lowest rounded-lg p-6 editorial-shadow space-y-8">
<div class="flex items-center justify-between">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-primary" data-icon="payments">payments</span>
</div>
<span class="font-bold text-on-surface">价格设定</span>
</div>
<div class="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full">
<span class="text-primary font-bold">¥</span>
<input class="w-20 bg-transparent border-none p-0 focus:ring-0 text-right font-bold text-primary placeholder:text-primary/30" placeholder="0.00" type="number"/>
</div>
</div>
<div class="space-y-4">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-secondary" data-icon="diamond">diamond</span>
</div>
<span class="font-bold text-on-surface">成色</span>
</div>
<div class="flex flex-wrap gap-2">
<button class="px-5 py-2 rounded-full bg-secondary text-on-secondary text-sm font-semibold">全新</button>
<button class="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-medium hover:bg-secondary-container/20 transition-colors">九成新</button>
<button class="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-medium hover:bg-secondary-container/20 transition-colors">八成新</button>
<button class="px-5 py-2 rounded-full bg-surface-container-low text-on-surface-variant text-sm font-medium hover:bg-secondary-container/20 transition-colors">一般</button>
</div>
</div>
<div class="flex items-center justify-between border-t border-surface-container pt-6">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center">
<span class="material-symbols-outlined text-tertiary" data-icon="grid_view">grid_view</span>
</div>
<span class="font-bold text-on-surface">分类选择</span>
</div>
<button class="flex items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
<span class="text-sm font-medium">去选择</span>
<span class="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</section>
</main>
<!-- Bottom Action Bar -->
<div class="fixed bottom-0 left-0 right-0 bg-white/70 backdrop-blur-xl px-6 pt-4 pb-10 z-50 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<button class="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-lg rounded-full editorial-shadow active:scale-95 transition-all flex items-center justify-center gap-2">
<span class="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
            立即发布
        </button>
</div>
</body></html>

<!-- 发布商品 - 校园集市 -->
<!DOCTYPE html>

<html class="light" lang="zh-CN"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Scholar Pulse - 技能互换</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary-dim": "#0049b2",
              "inverse-on-surface": "#959ac6",
              "on-tertiary": "#fff2ce",
              "surface-tint": "#0053ca",
              "on-surface": "#262c51",
              "tertiary-fixed": "#fdd400",
              "tertiary-container": "#fdd400",
              "on-secondary-container": "#005d22",
              "on-primary-container": "#001f56",
              "on-secondary-fixed": "#004819",
              "primary-fixed": "#769dff",
              "surface-container-high": "#dfe0ff",
              "surface-container-low": "#f0efff",
              "secondary": "#006a28",
              "inverse-primary": "#5a8cff",
              "outline-variant": "#a5aad7",
              "on-error-container": "#570008",
              "secondary-fixed-dim": "#4bee74",
              "on-primary-fixed": "#000000",
              "surface-dim": "#cdd1ff",
              "on-primary": "#f1f2ff",
              "tertiary-fixed-dim": "#edc600",
              "surface": "#f7f5ff",
              "background": "#f7f5ff",
              "on-error": "#ffefee",
              "secondary-fixed": "#5cfd80",
              "secondary-container": "#5cfd80",
              "surface-container-lowest": "#ffffff",
              "on-secondary": "#cfffce",
              "error": "#b31b25",
              "surface-container-highest": "#d8daff",
              "on-surface-variant": "#545981",
              "surface-variant": "#d8daff",
              "error-container": "#fb5151",
              "primary-container": "#769dff",
              "tertiary-dim": "#5f4e00",
              "secondary-dim": "#005d22",
              "on-secondary-fixed-variant": "#006827",
              "surface-bright": "#f7f5ff",
              "on-tertiary-fixed-variant": "#645300",
              "tertiary": "#6d5a00",
              "primary": "#0053ca",
              "on-primary-fixed-variant": "#002869",
              "on-background": "#262c51",
              "primary-fixed-dim": "#5f8fff",
              "inverse-surface": "#05092f",
              "surface-container": "#e6e6ff",
              "outline": "#6f749e",
              "on-tertiary-container": "#594a00",
              "on-tertiary-fixed": "#433700",
              "error-dim": "#9f0519"
            },
            fontFamily: {
              "headline": ["Plus Jakarta Sans"],
              "body": ["Manrope"],
              "label": ["Manrope"]
            },
            borderRadius: {"DEFAULT": "1rem", "lg": "2rem", "xl": "3rem", "full": "9999px"},
          },
        },
      }
    </script>
<style>
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      body {
        background-color: #f7f5ff;
        color: #262c51;
        font-family: 'Manrope', sans-serif;
      }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-surface text-on-surface min-h-screen pb-24">
<!-- TopAppBar -->
<header class="fixed top-0 w-full z-50 bg-[#ffffff]/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(38,44,81,0.06)] flex flex-col pt-4 px-6">
<div class="flex items-center justify-between w-full mb-4">
<div class="w-10 h-10 rounded-full bg-surface-container overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Portrait of a smiling college student in a sunlit modern campus library setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOrY7wZNSO25mqr7xx4lH4pYi7pGhpO538r6bWvPMYrkqh1mUEtR7-bpOLLHLcW6jN_k1fK7FcF1c8k2fjJW8ET4wp2Y_Cp1TzzaFZVlMMD8ZIa3MbLVm4yrC5FpldJpmpeOr8T8oFhhnkCyQPGkCqNyl2aX5PaRA_oiIpt-2a0mfsymDo8teSiOfJ--EUhO2LbCl0w3AcqLbcQTffeRG99Q7FXCj9N6MAVUY5Bix1xR8glaeOd44Tv-RgpAs4Wubgnumkf8K9VBKa"/>
</div>
<h1 class="text-2xl font-black text-primary tracking-tight font-headline">Scholar Pulse</h1>
<div class="p-2 text-primary active:scale-95 transition-transform">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</div>
</div>
<!-- Navigation Tabs (Integrated into Header per request) -->
<nav class="flex gap-8 px-2 overflow-x-auto no-scrollbar">
<a class="text-primary border-b-4 border-primary pb-2 font-headline font-bold tracking-tight transition-colors duration-300" href="#">Skill Exchange</a>
<a class="text-on-surface-variant pb-2 font-headline font-bold tracking-tight hover:text-primary transition-colors duration-300" href="#">Campus Market</a>
</nav>
</header>
<main class="mt-32 px-6 space-y-8 max-w-2xl mx-auto">
<!-- Hero Section / Context -->
<section class="space-y-2">
<h2 class="text-3xl font-headline font-extrabold text-on-surface tracking-tight">发现身边的宝藏技能</h2>
<p class="text-on-surface-variant font-body">在校园里，每个人都是彼此的老师。</p>
</section>
<!-- Skill Exchange Feed -->
<div class="space-y-6">
<!-- Skill Card 1 -->
<div class="group flex bg-surface-container-lowest rounded-lg p-4 gap-4 shadow-[0_20px_40px_rgba(38,44,81,0.04)] hover:shadow-[0_20px_40px_rgba(38,44,81,0.08)] transition-all duration-300 overflow-hidden relative">
<div class="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Close-up of a high-end laptop showing clean Python code with colorful syntax highlighting in a dark room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPlel69wmZoae5kOP3rda5q5ikArFmG_0gfznm3n1VN7MwtnNu88kT7xrzIie6ZfB6_ZkWhA-3vOuD0Fj1tNCx2cofVMy9rWLI3hIU1ZVF3bP-p1nsV5tH-WpjFdVKUJfYmFEI-fDXPCKNWQEZ87YFUmTkBVN1zwYuoqKnYWv8Gndx4IxAvBNwV-Ni0CV7thR92HT2JmjxuhiZ8y935tF7ExL3m3oaQLhKBBYc7lCkAm_qW6pnLDIeuqXQa_QO5Cp3XVvJ3wuv3Vpa"/>
</div>
<div class="flex-grow flex flex-col justify-between py-1">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="text-[10px] font-bold uppercase tracking-widest bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">Coding</span>
<span class="text-[10px] font-bold uppercase tracking-widest bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">Design</span>
</div>
<h3 class="text-lg font-headline font-bold text-on-surface leading-tight mb-3">Python编程 换 UI设计指导</h3>
<div class="space-y-1.5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-sm" data-icon="auto_awesome">auto_awesome</span>
<span class="text-xs font-semibold text-on-surface-variant">我能提供: <span class="text-on-surface">爬虫实战、数据分析</span></span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="swap_horiz">swap_horiz</span>
<span class="text-xs font-semibold text-on-surface-variant">我想换取: <span class="text-on-surface">Figma基础、组件库搭建</span></span>
</div>
</div>
</div>
<div class="flex items-center justify-between mt-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-surface-container-high border-2 border-white shadow-sm overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Student avatar photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhPBgJr3yttgvuvUcSCyzjYRSs2-5qR5GJ9pJZz5kiX19rajaCI7RHd1jlF2IQW7_CNYgWF2zQsAdi_TRTmX_BjOrpVj9C7rmjeDnHraCZbwtL4w6JTQgt97U9psRcuEo0B_h0gcg8kPazF2zmLEa-sIHJuAlGQNuZOqOYWM8xzX9OyVOVpnaFlllOKjcGHDVQ6h7kC35nzgf6R7i-iPg3kMjLJ0cf2PZRKzyPs7O7lL1ZvVjaSABvMKJ38sgi6xrExm9WW6Oq6LNm"/>
</div>
<span class="text-xs font-medium text-on-surface-variant">Zhang.Dev</span>
</div>
<span class="text-[10px] text-outline">2小时前</span>
</div>
</div>
</div>
<!-- Skill Card 2 -->
<div class="group flex bg-surface-container-lowest rounded-lg p-4 gap-4 shadow-[0_20px_40px_rgba(38,44,81,0.04)] hover:shadow-[0_20px_40px_rgba(38,44,81,0.08)] transition-all duration-300 overflow-hidden relative">
<div class="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Close-up of organized handwritten academic notes with colorful highlights and a cup of fresh coffee on a wooden table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLPRnsTBvOnplI90r3RopPXkZvRLAk5aFEoZbOJfn2sQOeS2louXD8UIUKgs1uh6heiYLedj8EVza1mXeuDJKcWroTjL5s3Ci4qgOCd87pzjY_QErAi679df72ftQcRQACROzIPG9QsLWxWuoO3BWzKlyPaDxrKOhnetg8m4ma3Z9nGlzKnBHp14aC8sYQRVIn54wB0np8HgdurbdOpU7cAtUrjio_QeIz3VY0HR8cZ6tod9Fq0Rmgka0pZhEcA0jawa7CzoSczw-G"/>
</div>
<div class="flex-grow flex flex-col justify-between py-1">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="text-[10px] font-bold uppercase tracking-widest bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full">Academic</span>
<span class="text-[10px] font-bold uppercase tracking-widest bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">Life</span>
</div>
<h3 class="text-lg font-headline font-bold text-on-surface leading-tight mb-3">期末笔记 换 冰美式咖啡</h3>
<div class="space-y-1.5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-sm" data-icon="auto_awesome">auto_awesome</span>
<span class="text-xs font-semibold text-on-surface-variant">我能提供: <span class="text-on-surface">微积分/线性代数精编笔记</span></span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="swap_horiz">swap_horiz</span>
<span class="text-xs font-semibold text-on-surface-variant">我想换取: <span class="text-on-surface">任意咖啡店大杯冰美式</span></span>
</div>
</div>
</div>
<div class="flex items-center justify-between mt-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-surface-container-high border-2 border-white shadow-sm overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Student avatar photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWhWypK4EFR10fsUzyFPPTHiVL2KngtrWJaQEzyrjDsygG8xkm3bO6KTa0v9ouzEDEpmk4bvFLtbw5arSBs4BL6EEbMLu8gVnjSyO-evTvROmeDC_ZtM-54ckxNlomD0IoLTCBtRYPQT7cNzwkezhshEsSVIMBgbqwaMB3oSfaZpwsm7ip987eQoBo3_QABdaGGzamJ4qiGXQu84r_KlMPSKInHt1UG1t0j_DkvFWOEt2GNHIt3x5EfTyvnzC_KCJ3oyoXMImxV2nx"/>
</div>
<span class="text-xs font-medium text-on-surface-variant">Elena_Studying</span>
</div>
<span class="text-[10px] text-outline">5分钟前</span>
</div>
</div>
</div>
<!-- Skill Card 3 -->
<div class="group flex bg-surface-container-lowest rounded-lg p-4 gap-4 shadow-[0_20px_40px_rgba(38,44,81,0.04)] hover:shadow-[0_20px_40px_rgba(38,44,81,0.08)] transition-all duration-300 overflow-hidden relative">
<div class="w-32 h-32 flex-shrink-0 rounded-md overflow-hidden">
<img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="Acoustic guitar neck with shallow depth of field in a warm cozy bedroom studio" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcAtRdkeXaEdUghQYXWDvOIqaHtiUlJYaQcMlv36Ffc1lwE4R5jq_3MYu3CZYv96ZHHA9MBmBGk7bEuuK2o_px_sUHPlLx5O3TXol9YREqFkQkTc-6svazC361HEg4yWMuZh4PZXEKHZTWpOyjjubdZm1TortPa4mzglZfLfZwvmqeLEW2WGpSPjVEqTiFRyjZnxSQM7GtJ1YMmKTiUSzfp2VeLTZwPkQ4pw2q9JlDI2NHG76lMtcWas_I4TVVOTgBVdQSSczP-fDC"/>
</div>
<div class="flex-grow flex flex-col justify-between py-1">
<div>
<div class="flex items-center gap-2 mb-2">
<span class="text-[10px] font-bold uppercase tracking-widest bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">Art</span>
<span class="text-[10px] font-bold uppercase tracking-widest bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full">Media</span>
</div>
<h3 class="text-lg font-headline font-bold text-on-surface leading-tight mb-3">吉他弹唱 换 摄影后期</h3>
<div class="space-y-1.5">
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-primary text-sm" data-icon="auto_awesome">auto_awesome</span>
<span class="text-xs font-semibold text-on-surface-variant">我能提供: <span class="text-on-surface">流行吉他弹唱、和弦入门</span></span>
</div>
<div class="flex items-center gap-2">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="swap_horiz">swap_horiz</span>
<span class="text-xs font-semibold text-on-surface-variant">我想换取: <span class="text-on-surface">Lightroom/PS调色教程</span></span>
</div>
</div>
</div>
<div class="flex items-center justify-between mt-2">
<div class="flex items-center gap-2">
<div class="w-6 h-6 rounded-full bg-surface-container-high border-2 border-white shadow-sm overflow-hidden">
<img class="w-full h-full object-cover" data-alt="Student avatar photo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2RUIy8datXE58gG5Ls8TxqSsX53JpVIyhoCr1HHaDvcCHoEGBRQwzI4BS2pv-OWisuw5OXK7BzL5jZNTL9LLOynOJspWTeH7S5mGpO9grlGrwYJ_6JY11M8DP9H0T8HwZAIkGvsNQX3jVm7TIEMQ9N4odVIEe20j2KIbl9QQ3UbBRN2Jcvglqieuy8SolClIXKav7eaHY8ex_aU7Dx28SbPrlJKQXPGtl_v1a7TrBvl8wpaNblLeRhRFO0pKEBSYKwb8nS2WtpU9C"/>
</div>
<span class="text-xs font-medium text-on-surface-variant">Leo_Vibes</span>
</div>
<span class="text-[10px] text-outline">12:30</span>
</div>
</div>
</div>
</div>
</main>
<!-- Floating Action Button -->
<button class="fixed right-6 bottom-24 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all duration-300 z-50">
<span class="material-symbols-outlined text-3xl">add</span>
</button>
<!-- BottomNavBar -->
<nav class="fixed bottom-0 left-0 w-full h-20 bg-[#ffffff]/70 backdrop-blur-xl flex justify-around items-center px-6 pb-2 z-50 rounded-t-lg shadow-[0_-10px_30px_rgba(38,44,81,0.04)]">
<a class="flex flex-col items-center justify-center bg-primary text-white rounded-full p-3 mb-2 scale-110 active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="home">home</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Home</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="explore">explore</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Explore</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Post</span>
</a>
<a class="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary active:scale-90 transition-all duration-300" href="#">
<span class="material-symbols-outlined" data-icon="person">person</span>
<span class="font-label text-[11px] font-bold uppercase tracking-wider hidden">Profile</span>
</a>
</nav>
</body></html>

<!-- 首页 - 技能互换 (交换中心) -->
# Campus Skill Exchange Platform (Campus "Xianyu") - PRD

## Project Overview
A peer-to-peer skill trading platform designed specifically for university students. Users showcase their talents (coding, design, writing, etc.) to trade for other skills or items, fostering a community of collaboration beyond just monetary transactions.

## Core Features
- **Skill Showcasing**: Profiles focused on specific skills with portfolio integration.
- **Barter System**: "Wishlist" feature where providers specify what they want in exchange (e.g., "I'll design your logo for 2 hours of Python tutoring").
- **Collaboration/Team Building**: A dedicated section for finding teammates for competitions or projects.
- **Campus Verified**: Integration with university identity for trust.

## Target Audience
- University students looking to build their portfolios.
- Students needing specific help but with limited budgets.
- Student entrepreneurs looking for co-founders or teammates.

## Design Direction
- **Vibrant & Energetic**: Reflecting campus life.
- **Trustworthy**: Clear profiles and ratings.
- **Easy Navigation**: Categorized skills and clear calls to action.

<!-- Product Requirements Document - Campus Skill Exchange -->
Okay, I can definitely create a project PRD (Product Requirements Document) or a brief for you.

Since I don't have the specific context yet, I will provide you with a *comprehensive template* that covers all the essential sections of a good PRD/Brief. You can then fill this out with your project's details.

**How to Use This Template:**

1.  **Copy and paste** this entire structure into your document.
2.  **Fill in the bracketed `[ ]` sections** with your specific project information.
3.  **Delete the instructional text** (like "Describe the project's purpose...") once you've written your content.
4.  **Adjust the level of detail** based on whether you need a quick brief (focus on sections I, II, III, IV, V) or a full PRD (fill in everything comprehensively).

---

## Project PRD / Brief Template: [Your Project Name Here]

---

### **I. Project Overview & Executive Summary (The "Brief" Part)**

*   **Project Title:** [Concise, descriptive title for the project, e.g., "Customer Onboarding Flow Redesign"]
*   **Version:** [e.g., 1.0]
*   **Date:** [e.g., October 26, 2023]
*   **Product Manager/Owner:** [Your Name/Team]
*   **Stakeholders:** [List key stakeholders, e.g., Engineering Lead, Design Lead, Marketing Lead, Sales Lead, VP Product]
*   **Status:** [e.g., Draft, Review, Approved, In Progress]

**1.1 Executive Summary:**
[A high-level overview of the project. Briefly state what the project is, why it's important, the main problem it solves, the key solution, and the expected impact. This should be readable and understandable by anyone, including executives.]

*   *Example:* "This project aims to redesign our existing customer onboarding flow to improve first-time user activation and reduce churn within the initial 7 days. Our current flow is complex and leads to high drop-off rates. By simplifying the steps, providing clearer guidance, and personalizing the experience, we expect to increase activation by 15% and decrease early churn by 10% within the next quarter."

---

### **II. Problem Statement & Opportunity**

**2.1 The Problem:**
[Clearly articulate the specific problem(s) this project is designed to solve. Who is experiencing this problem? What are the symptoms? Quantify the problem if possible.]

*   *Example:* "Our existing customer onboarding flow has a 45% drop-off rate at Step 3 (Account Verification) and a 30% churn rate within the first week for activated users. Users report confusion regarding required information and a lack of perceived value early on. This directly impacts our user acquisition ROI and growth targets."

**2.2 The Opportunity:**
[Describe the business opportunity or value created by solving this problem. What are the potential gains (revenue, engagement, efficiency, customer satisfaction, market share, etc.)?]

*   *Example:* "By optimizing the onboarding experience, we can significantly increase user activation and retention. A 15% increase in activation translates to an estimated $X increase in monthly recurring revenue (MRR) and improved customer lifetime value (CLTV). It also strengthens our brand reputation and reduces customer support overhead related to onboarding issues."

---

### **III. Goals & Success Metrics**

**3.1 Project Goals (SMART Objectives):**
[What specific, measurable, achievable, relevant, and time-bound outcomes do you expect from this project?]

*   **Goal 1:** [e.g., Increase user completion rate of the onboarding flow from 55% to 70% within 3 months post-launch.]
*   **Goal 2:** [e.g., Reduce 7-day churn rate for new users from 30% to 20% within 3 months post-launch.]
*   **Goal 3:** [e.g., Improve first-time user "aha moment" engagement (e.g., creating first report) by 25% within 1 month post-launch.]

**3.2 Key Performance Indicators (KPIs) / Metrics:**
[How will you measure the achievement of your goals? What data points will you track?]

*   [Onboarding completion rate]
*   [7-day churn rate for new users]
*   [Time to first key action (e.g., creating first report)]
*   [Customer support tickets related to onboarding (reduction)]
*   [User feedback/NPS score for new users]

---

### **IV. Target Audience & Personas**

**4.1 Who are we building this for?**
[Describe the primary users/customers who will benefit from or use this feature/product. Include relevant demographics, behaviors, and pain points.]

*   *Example:* "Our target audience includes new small business owners (SMBs) in the e-commerce sector who are unfamiliar with digital marketing tools. They are often busy, price-sensitive, and need clear, quick wins to see value. They value simplicity and clear instructions."

**4.2 User Personas (Optional, but recommended):**
[If available, reference specific user personas. If not, briefly outline key user types.]

*   [Link to Persona 1: "Busy Ben - The E-commerce Newbie"]
*   [Link to Persona 2: "Growing Grace - The Scaling Entrepreneur"]

---

### **V. Solution Overview & Scope**

**5.1 High-Level Solution Description:**
[Describe the proposed solution at a high level. What will it look like? What core functionality will it provide? How does it address the problem?]

*   *Example:* "The solution involves a multi-step, guided onboarding wizard that incorporates progress indicators, contextual help tips, and a personalized 'welcome project' based on user input. It will integrate with existing authentication services and lead users directly into their dashboard with clear next steps."

**5.2 In-Scope:**
[Clearly list what *is* included in this project. Be specific.]

*   [Redesign of the initial sign-up flow (steps 1-5)]
*   [Integration of a new "Welcome Tour" for post-onboarding]
*   [Implementation of a progress bar and contextual tooltips]
*   [A/B testing framework for onboarding variations]
*   [Analytics tracking for all onboarding steps]

**5.3 Out-of-Scope:**
[Equally important: Clearly list what *is NOT* included in this project. This helps manage expectations and prevent scope creep.]

*   [Migration of existing user data to a new database structure]
*   [New payment gateway integrations]
*   [Full redesign of the user dashboard (beyond integrating the welcome project)]
*   [Internationalization/localization for non-English languages in this phase]

---

### **VI. Functional Requirements / User Stories**

[Detailed breakdown of *what* the system must do from the user's perspective. Use user stories (As a [type of user], I want [some goal] so that [some reason/benefit]) or traditional functional requirements.]

*   **6.1 Onboarding Flow:**
    *   **User Story 1:** As a *new user*, I want to *easily create an account with my email or Google SSO* so that I can *start using the product quickly*.
    *   **User Story 2:** As a *new user*, I want to *see my progress through the onboarding steps* so that I *know how much more I have to complete*.
    *   **User Story 3:** As a *new user*, I want to *receive contextual help tips for complex fields* so that I *don't get stuck or confused*.
    *   ... (add more as needed)

*   **6.2 Personalization:**
    *   **User Story X:** As a *new user*, I want to *select my industry and primary goal* so that the *product can tailor my initial experience*.

*   **6.3 Analytics:**
    *   **User Story Y:** As a *product manager*, I want to *track drop-off rates at each step of the onboarding flow* so that I can *identify areas for further optimization*.

---

### **VII. Non-Functional Requirements (Technical, Performance, Security, etc.)**

[These define *how* the system should perform, rather than *what* it does.]

*   **7.1 Performance:** [e.g., Each step of the onboarding flow must load within 2 seconds for 95% of users.]
*   **7.2 Security:** [e.g., All user data submitted during onboarding must be encrypted both in transit and at rest.]
*   **7.3 Scalability:** [e.g., The onboarding service must be able to handle up to 10,000 concurrent new user registrations.]
*   **7.4 Browser Compatibility:** [e.g., Fully functional and responsive on the latest versions of Chrome, Firefox, Safari, and Edge.]
*   **7.5 Accessibility:** [e.g., Adhere to WCAG 2.1 AA standards.]

---

### **VIII. Design & User Experience (UX)**

**8.1 User Flow & Wireframes (Link to):**
[Link to Miro boards, Figma files, or other design artifacts.]
*   [Link to Onboarding User Flow Diagram]
*   [Link to Low-Fidelity Wireframes]

**8.2 Mockups & Prototypes (Link to):**
[Link to high-fidelity designs.]
*   [Link to High-Fidelity Mockups & Interactive Prototype]

**8.3 UI Style Guide:**
[Ensure consistency with existing brand guidelines.]
*   [Adherence to existing UI Component Library / Design System]

---

### **IX. Analytics & Tracking Plan**

[How will we instrument the product to collect the data needed for our KPIs?]

*   **9.1 Event Tracking:** [Specify key events to track, e.g., "onboarding_step_1_started", "onboarding_step_2_completed", "profile_setup_skipped".]
*   **9.2 User Properties:** [Identify user properties to capture, e.g., "industry", "goal", "source_channel".]
*   **9.3 Dashboard/Reporting:** [How will the data be visualized and monitored? e.g., "Create a dedicated onboarding dashboard in Amplitude/Mixpanel."]

---

### **X. High-Level Timeline & Milestones**

[Provide a rough estimate of the project phases and key dates. This will be refined during sprint planning.]

*   **Phase 1: Discovery & Design:** [e.g., Oct 26 - Nov 15]
    *   [User Research Complete]
    *   [Wireframes & Mockups Approved]
*   **Phase 2: Development Sprints:** [e.g., Nov 15 - Dec 20]
    *   [Backend Services Complete]
    *   [Frontend UI Complete]
*   **Phase 3: QA & UAT:** [e.g., Dec 20 - Jan 5]
    *   [Internal QA Complete]
    *   [User Acceptance Testing Complete]
*   **Phase 4: Launch:** [e.g., Jan 10]
*   **Phase 5: Monitoring & Iteration:** [e.g., Jan 10 onwards]

---

### **XI. Dependencies & Risks**

**11.1 Dependencies:**
[What other projects, teams, or external factors must be completed or available before this project can proceed?]

*   [Availability of API endpoints from the User Management team.]
*   [Approval from Legal for new T&Cs.]
*   [Marketing campaign timing for new user acquisition.]

**11.2 Risks:**
[What potential challenges or roadblocks could impact the project, and what are the mitigation strategies?]

*   **Risk 1:** [e.g., High design iteration cycles causing delays.]
    *   **Mitigation:** [e.g., Involve engineering early, set clear design review cadences.]
*   **Risk 2:** [e.g., Unexpected technical debt in existing authentication service.]
    *   **Mitigation:** [e.g., Conduct a technical spike upfront to assess current state.]

---

### **XII. Open Questions & Assumptions**

**12.1 Open Questions:**
[List any unanswered questions that need to be resolved before or during development.]

*   [Do we need to support legacy browsers for this flow?]
*   [What is the strategy for abandoned onboarding flows?]

**12.2 Assumptions:**
[List any assumptions being made that, if proven false, could impact the project.]

*   [We assume existing authentication services can handle increased load without modification.]
*   [We assume user research insights from Q2 are still valid for this target audience.]

---

### **XIII. Future Considerations / Phase 2 (Optional)**

[What could come next after this project is successfully launched? Ideas for future iterations.]

*   [Personalized email drip campaigns triggered by onboarding progress.]
*   [A/B testing different onboarding paths based on user segments.]
*   [Integration with CRM for sales hand-off on specific user types.]

---

### **XIV. Approvals / Sign-off**

[Who needs to formally approve this document before work can begin?]

*   **Product Lead:** __________________________ Date: _________
*   **Engineering Lead:** __________________________ Date: _________
*   **Design Lead:** __________________________ Date: _________
*   **Marketing Lead:** __________________________ Date: _________
*   **[Other Key Stakeholder]:** __________________________ Date: _________

---

**Please provide me with your project's context, and I can help you fill out these sections more specifically!**