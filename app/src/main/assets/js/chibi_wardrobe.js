// ==========================================
// [BLOCK 3: CHIBI AVATAR ENGINE & WARDROBE SHOP]
// ==========================================
const GITHUB_CHIBI_BASE_URL = 'https://raw.githubusercontent.com/junvu1707/app_chibi/main/';

function getChibiFallbackAsset(imgName) {
  if (!imgName) return 'app_logo.png';
  const trimmed = String(imgName).trim();
  if (window.AndroidBridge && window.AndroidBridge.getChibiFallbackAsset) {
    try {
      return window.AndroidBridge.getChibiFallbackAsset(trimmed);
    } catch (e) {}
  }
  const assetMap = {
    'chú bé dễ thương.png': 'chu_be_de_thuong.png',
    'cô bé nơ đỏ.png': 'co_be_no_do.png',
    'bé cute.png': 'be_cute.png',
    'bé thỏ.png': 'be_tho.png',
    'cô bé kem.png': 'co_be_kem.png',
    'cậu bé vui vẻ.png': 'cau_be_vui_ve.png',
    'cậu bé ấm áp.png': 'cau_be_am_ap.png',
    'cô bé xinh xắn.png': 'co_be_xinh_xan.png',
    'cô bé tóc dài.png': 'co_be_toc_dai.png',
    'cô bé áo dài.png': 'co_be_ao_dai.png',
    'cậu bé đáng yêu.png': 'cau_be_dang_yeu.png',
    'công chúa váy xanh.png': 'cong_chua_vay_xanh.png',
    'cô bé nhút nhát.png': 'co_be_nhut_nhat.png'
  };
  return assetMap[trimmed] || trimmed;
}

function getChibiUrl(imgName) {
  if (!imgName) return 'app_logo.png';
  const trimmed = String(imgName).trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  if (window.AndroidBridge && window.AndroidBridge.getChibiGithubUrl) {
    try {
      return window.AndroidBridge.getChibiGithubUrl(trimmed);
    } catch (e) {}
  }
  return GITHUB_CHIBI_BASE_URL + encodeURIComponent(trimmed);
}

let AVATAR_LOOKBOOKS = [
  {
    id: 'chibi_cong_chua_toc_may',
    name: 'Siêu Trạng Nhí',
    image: 'app_logo.png',
    sub: '',
    price: 0,
    trialPrice: 0,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_bom_hoa' }
  },
  {
    id: 'chibi_co_be_de_thuong',
    name: 'Cô bé dễ thương',
    image: 'chibi_trang_vui_tinh.png',
    sub: '',
    price: 0,
    trialPrice: 0,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_hoang_tu',
    name: 'Hoàng tử hào hoa',
    image: 'chibi_hoang_tu.png',
    sub: '',
    price: 0,
    trialPrice: 0,
    config: { hair: 'hair_lang_tu', outfit: 'outfit_hoc_sinh', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_chu_be_de_thuong',
    name: 'Chú bé dễ thương',
    image: 'chu_be_de_thuong.png',
    sub: '',
    price: 500,
    trialPrice: 100,
    config: { hair: 'hair_lang_tu', outfit: 'outfit_hoc_sinh', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_co_be_no_do',
    name: 'Cô bé nơ đỏ',
    image: 'co_be_no_do.png',
    sub: '',
    price: 500,
    trialPrice: 150,
    config: { hair: 'hair_bim_no', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_be_cute',
    name: 'Bé cute siêu cấp',
    image: 'be_cute.png',
    sub: '',
    price: 600,
    trialPrice: 150,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_kep_buom' }
  },
  {
    id: 'chibi_be_tho',
    name: 'Bé thỏ hồng xinh',
    image: 'be_tho.png',
    sub: '',
    price: 600,
    trialPrice: 200,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_tai_gau' }
  },
  {
    id: 'chibi_co_be_kem',
    name: 'Cô bé kem ngọt ngào',
    image: 'co_be_kem.png',
    sub: '',
    price: 700,
    trialPrice: 200,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_mu_sinh_nhat' }
  },
  {
    id: 'chibi_cau_be_vui_ve',
    name: 'Cậu bé vui vẻ',
    image: 'cau_be_vui_ve.png',
    sub: '',
    price: 700,
    trialPrice: 200,
    config: { hair: 'hair_lang_tu', outfit: 'outfit_hoc_sinh', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_cau_be_am_ap',
    name: 'Cậu bé ấm áp',
    image: 'cau_be_am_ap.png',
    sub: '',
    price: 800,
    trialPrice: 250,
    config: { hair: 'hair_lang_tu', outfit: 'outfit_hoc_sinh', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_co_be_xinh_xan',
    name: 'Cô bé xinh xắn',
    image: 'co_be_xinh_xan.png',
    sub: '',
    price: 800,
    trialPrice: 250,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_co_be_toc_dai',
    name: 'Cô bé tóc dài',
    image: 'co_be_toc_dai.png',
    sub: '',
    price: 800,
    trialPrice: 250,
    config: { hair: 'hair_bim_no', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_bom_hoa' }
  },
  {
    id: 'chibi_nu_sinh_ao_dai',
    name: 'Nữ sinh áo dài hồng',
    image: 'co_be_ao_dai.png',
    sub: '',
    price: 900,
    trialPrice: 300,
    config: { hair: 'hair_bim_no', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_bom_hoa' }
  },
  {
    id: 'chibi_cau_be_dang_yeu',
    name: 'Cậu bé đáng yêu',
    image: 'cau_be_dang_yeu.png',
    sub: '',
    price: 900,
    trialPrice: 300,
    config: { hair: 'hair_lang_tu', outfit: 'outfit_hoc_sinh', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  },
  {
    id: 'chibi_cong_chua_vay_xanh',
    name: 'Công chúa váy xanh',
    image: 'cong_chua_vay_xanh.png',
    sub: '',
    price: 1000,
    trialPrice: 300,
    config: { hair: 'hair_bim_no', outfit: 'outfit_da_hoi', glasses: 'glasses_none', accessory: 'acc_bom_hoa' }
  },
  {
    id: 'chibi_co_be_nhut_nhat',
    name: 'Cô bé e ấp',
    image: 'co_be_nhut_nhat.png',
    sub: '',
    price: 1000,
    trialPrice: 300,
    config: { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
  }
];

function loadDynamicChibis(jsonInput) {
  if (!jsonInput) return;
  try {
    let list = (typeof jsonInput === 'string') ? JSON.parse(jsonInput) : jsonInput;
    if (Array.isArray(list) && list.length > 0) {
      AVATAR_LOOKBOOKS = list.map(item => ({
        id: item.id || ('chibi_' + Math.random().toString(36).substring(2, 7)),
        name: item.name || 'Nhân vật Chibi',
        image: item.image || 'app_logo.png',
        sub: item.sub || '',
        price: typeof item.price === 'number' ? item.price : 500,
        trialPrice: typeof item.trialPrice === 'number' ? item.trialPrice : 150,
        config: item.config || { hair: 'hair_lang_tu', outfit: 'outfit_hoc_sinh', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' }
      }));
      const modalContainer = document.getElementById('modal-container');
      if (modalContainer && modalContainer.innerHTML.includes('Cửa Hàng Hình Mẫu Chibi')) {
        openAvatarModal();
      }
    }
  } catch (e) {
    console.warn('Lỗi parse danh sách Chibi động:', e);
  }
}

window.onGithubChibisUpdated = function(jsonStr) {
  loadDynamicChibis(jsonStr);
};

try {
  if (window.AndroidBridge && typeof window.AndroidBridge.getGithubChibisJson === 'function') {
    const cachedChibisStr = window.AndroidBridge.getGithubChibisJson();
    if (cachedChibisStr) {
      loadDynamicChibis(cachedChibisStr);
    }
    if (typeof window.AndroidBridge.fetchGithubChibis === 'function') {
      window.AndroidBridge.fetchGithubChibis();
    }
  } else {
    fetch(GITHUB_CHIBI_BASE_URL + 'chibis.json')
      .then(res => res.json())
      .then(data => loadDynamicChibis(data))
      .catch(err => console.warn('Lỗi fetch chibis.json trên Web:', err));
  }
} catch (_e) {}

const AVATAR_ITEMS = {};

function renderChibiAvatarSvg(config, size = 100) {
  const c = config || AppState.avatarConfig || { hair: 'hair_ngan_bupbe', outfit: 'outfit_ao_dai_hoa', accessory: 'acc_no_cai_toc', glasses: 'glasses_none' };
  const hair = c.hair || 'hair_ngan_bupbe';
  const outfit = c.outfit || 'outfit_ao_dai_hoa';
  const acc = c.accessory || 'acc_no_cai_toc';
  const glasses = c.glasses || 'glasses_none';

  // 1. Tóc sau
  let backHairSvg = '';
  if (hair === 'hair_bim_no') {
    backHairSvg = `
      <path d="M28 45 C15 56, 10 72, 14 88 C18 82, 22 66, 29 52 Z" fill="#261C14"/>
      <ellipse cx="14" cy="88" rx="4" ry="5.5" fill="#261C14"/>
      <path d="M14 84 L9 81 L9 87 Z M14 84 L19 81 L19 87 Z" fill="#EF4444"/>
      <circle cx="14" cy="84" r="2" fill="#FDE047"/>
      <path d="M92 45 C105 56, 110 72, 106 88 C102 82, 98 66, 91 52 Z" fill="#261C14"/>
      <ellipse cx="106" cy="88" rx="4" ry="5.5" fill="#261C14"/>
      <path d="M106 84 L101 81 L101 87 Z M106 84 L111 81 L111 87 Z" fill="#EF4444"/>
      <circle cx="106" cy="84" r="2" fill="#FDE047"/>
    `;
  } else if (hair === 'hair_dai_bong') {
    backHairSvg = `
      <path d="M22 42 C8 60, 4 88, 16 104 C24 92, 22 68, 28 48 Z" fill="#1C1917"/>
      <path d="M98 42 C112 60, 116 88, 104 104 C96 92, 98 68, 92 48 Z" fill="#1C1917"/>
      <path d="M26 36 C10 55, 8 96, 26 112 C34 98, 28 72, 34 46 Z" fill="#2E241E" opacity="0.8"/>
      <path d="M94 36 C110 55, 112 96, 94 112 C86 98, 92 72, 86 46 Z" fill="#2E241E" opacity="0.8"/>
      <path d="M30 46 C20 70, 24 105, 38 116 C34 102, 32 80, 36 56 Z" fill="#443226" opacity="0.6"/>
      <path d="M90 46 C100 70, 96 105, 82 116 C86 102, 88 80, 84 56 Z" fill="#443226" opacity="0.6"/>
    `;
  } else if (hair === 'hair_ngan_bupbe') {
    backHairSvg = `
      <path d="M24 45 C18 60, 20 75, 28 82 C24 72, 24 58, 28 48 Z" fill="#2E1D10"/>
      <path d="M96 45 C102 60, 100 75, 92 82 C96 72, 96 58, 92 48 Z" fill="#2E1D10"/>
    `;
  } else if (hair === 'hair_duoi_ngua') {
    backHairSvg = `
      <path d="M84 32 C105 24, 118 42, 114 68 C110 56, 102 48, 86 42 Z" fill="#261C14"/>
      <path d="M86 36 C102 32, 112 48, 108 72 C104 60, 96 52, 88 44 Z" fill="#3D2B1F" opacity="0.75"/>
      <circle cx="86" cy="36" r="4.5" fill="#F43F5E"/>
      <circle cx="86" cy="36" r="2" fill="#FDE047"/>
    `;
  } else if (hair === 'hair_suon_hoa') {
    backHairSvg = `
      <path d="M26 42 C16 62, 16 92, 26 112 C28 94, 28 68, 32 48 Z" fill="#1C1917"/>
      <path d="M94 42 C104 62, 104 92, 94 112 C92 94, 92 68, 88 48 Z" fill="#1C1917"/>
    `;
  } else if (hair === 'hair_bui_natra') {
    backHairSvg = `
      <circle cx="28" cy="27" r="13" fill="#261C14"/>
      <circle cx="28" cy="27" r="10" fill="#3B291D"/>
      <circle cx="92" cy="27" r="13" fill="#261C14"/>
      <circle cx="92" cy="27" r="10" fill="#3B291D"/>
      <path d="M28 34 Q22 45 18 52 M28 34 Q26 48 24 55" stroke="#EF4444" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M92 34 Q98 45 102 52 M92 34 Q94 48 96 55" stroke="#EF4444" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    `;
  } else if (hair === 'hair_trang_thong_thai' || hair === 'hair_trang_nguyen') {
    backHairSvg = `
      <path d="M38 27 C16 20, 6 29, 12 35 C20 40, 32 34, 40 31 Z" fill="#B91C1C" stroke="#F59E0B" stroke-width="1.8"/>
      <path d="M82 27 C104 20, 114 29, 108 35 C100 40, 88 34, 80 31 Z" fill="#B91C1C" stroke="#F59E0B" stroke-width="1.8"/>
    `;
  } else if (hair === 'hair_lang_tu') {
    backHairSvg = `
      <path d="M26 44 C22 55, 24 66, 30 70 Z" fill="#2E1D10"/>
      <path d="M94 44 C98 55, 96 66, 90 70 Z" fill="#2E1D10"/>
    `;
  }

  // 2. Quần áo
  let outfitSvg = '';
  if (outfit === 'outfit_dam_cong_chua') {
    outfitSvg = `
      <path d="M38 86 C36 76, 46 72, 60 72 C74 72, 84 76, 82 86 Z" fill="#FFF1F2" stroke="#FDA4AF" stroke-width="1.5"/>
      <path d="M46 73 Q60 80 74 73" stroke="#F472B6" stroke-width="2" fill="none"/>
      <circle cx="60" cy="79" r="2.5" fill="#FB7185"/>
      <path d="M30 106 C32 94, 38 85, 60 85 C82 85, 88 94, 90 106 Q75 109 60 107 Q45 109 30 106 Z" fill="#FFFFFF" stroke="#FBCFE8" stroke-width="1.5"/>
      <path d="M30 106 Q35 103 40 106 Q45 103 50 106 Q55 103 60 106 Q65 103 70 106 Q75 103 80 106 Q85 103 90 106" stroke="#FB7185" stroke-width="1.8" fill="none"/>
      <circle cx="48" cy="94" r="1.5" fill="#F472B6"/>
      <circle cx="60" cy="95" r="2" fill="#E11D48"/>
      <circle cx="72" cy="94" r="1.5" fill="#F472B6"/>
    `;
  } else if (outfit === 'outfit_ao_dai_hoa') {
    outfitSvg = `
      <path d="M36 106 C34 85, 45 74, 60 74 C75 74, 86 85, 84 106 Z" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5"/>
      <path d="M48 74 Q60 78 72 74" stroke="#CBD5E1" stroke-width="2" fill="none"/>
      <path d="M42 76 L78 98 L72 104 L38 80 Z" fill="#FBBF24" stroke="#D97706" stroke-width="0.8"/>
      <g transform="translate(56, 83)">
        <circle cx="0" cy="0" r="5" fill="#EF4444"/>
        <circle cx="0" cy="0" r="2.5" fill="#B91C1C"/>
        <path d="M-4 3 Q-7 7 -3 9 Q1 7 -1 3" fill="#16A34A"/>
        <circle cx="1" cy="-1" r="1" fill="#FFFFFF" opacity="0.6"/>
      </g>
    `;
  } else if (outfit === 'outfit_trang_thong_thai' || outfit === 'outfit_trang_nguyen') {
    outfitSvg = `
      <path d="M36 106 C34 85, 45 74, 60 74 C75 74, 86 85, 84 106 Z" fill="#DC2626" stroke="#991B1B" stroke-width="1.8"/>
      <path d="M53 74 L60 106 L67 74 Z" fill="#FBBF24"/>
      <path d="M45 74 L60 88 L75 74" stroke="#F59E0B" stroke-width="2.5" fill="none"/>
      <rect x="44" y="94" width="32" height="4.5" rx="2" fill="#F59E0B" stroke="#B45309" stroke-width="0.8"/>
      <circle cx="60" cy="96" r="3" fill="#FDE047"/>
      <circle cx="60" cy="96" r="1.5" fill="#DC2626"/>
    `;
  } else if (outfit === 'outfit_doi_vien') {
    outfitSvg = `
      <path d="M36 106 C34 85, 45 74, 60 74 C75 74, 86 85, 84 106 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="1.5"/>
      <path d="M48 74 L54 80 L60 74 L66 80 L72 74" stroke="#94A3B8" stroke-width="1.5" fill="none"/>
      <polygon points="50,76 70,76 60,94" fill="#DC2626"/>
      <polygon points="58,90 56,105 62,99 64,104 62,90" fill="#DC2626"/>
    `;
  } else if (outfit === 'outfit_hoc_sinh') {
    outfitSvg = `
      <path d="M36 106 C34 85, 45 74, 60 74 C75 74, 86 85, 84 106 Z" fill="#65A30D" stroke="#4D7C0F" stroke-width="1.5"/>
      <path d="M44 74 C44 83, 56 85, 58 75 Z" fill="#FFFFFF" stroke="#CA8A04" stroke-width="1.2"/>
      <path d="M76 74 C76 83, 64 85, 62 75 Z" fill="#FFFFFF" stroke="#CA8A04" stroke-width="1.2"/>
      <circle cx="60" cy="85" r="2.2" fill="#FDE047"/>
      <circle cx="60" cy="95" r="2.2" fill="#FDE047"/>
    `;
  } else if (outfit === 'outfit_ba_ba') {
    outfitSvg = `
      <path d="M36 106 C34 85, 45 74, 60 74 C75 74, 86 85, 84 106 Z" fill="#EAB308" stroke="#CA8A04" stroke-width="1.5"/>
      <path d="M42 74 L52 106 L60 106 L48 74 Z" fill="#0284C7" opacity="0.85"/>
      <path d="M43 80 L53 80 M46 88 L56 88 M49 96 L59 96" stroke="#FFFFFF" stroke-width="1.5"/>
      <circle cx="60" cy="82" r="1.8" fill="#713F12"/>
      <circle cx="60" cy="90" r="1.8" fill="#713F12"/>
      <circle cx="60" cy="98" r="1.8" fill="#713F12"/>
    `;
  } else if (outfit === 'outfit_da_hoi') {
    outfitSvg = `
      <path d="M38 86 C36 76, 45 72, 60 72 C74 72, 84 76, 82 86 Z" fill="#7C3AED" stroke="#5B21B6" stroke-width="1.5"/>
      <path d="M30 106 C32 92, 38 85, 60 85 C82 85, 88 92, 90 106 Z" fill="#6D28D9" stroke="#4C1D95" stroke-width="1.5"/>
      <path d="M44 73 Q60 81 76 73" stroke="#FDE047" stroke-width="2" fill="none"/>
      <polygon points="60,77 63,82 68,82 64,85 66,90 60,87 54,90 56,85 52,82 57,82" fill="#FBBF24"/>
    `;
  } else if (outfit === 'outfit_ao_tu_than' || outfit === 'outfit_tu_than') {
    outfitSvg = `
      <path d="M36 106 C34 85, 45 74, 60 74 C75 74, 86 85, 84 106 Z" fill="#F43F5E" stroke="#E11D48" stroke-width="1.5"/>
      <path d="M42 74 L54 106 L66 106 L78 74 Z" fill="#0EA5E9" opacity="0.9"/>
      <path d="M48 74 L60 106 L72 74 Z" fill="#FACC15"/>
      <path d="M48 82 Q60 88 72 82" stroke="#16A34A" stroke-width="2.5" fill="none"/>
      <circle cx="60" cy="85" r="2.5" fill="#E11D48"/>
    `;
  }

  // 3. Tóc trước
  let frontHairSvg = '';
  if (hair === 'hair_dai_bong') {
    frontHairSvg = `
      <path d="M26 46 C20 18, 100 18, 96 46 C90 28, 30 28, 24 46 Z" fill="#1C1917"/>
      <path d="M30 36 C42 46, 52 46, 60 42 C68 46, 78 46, 90 36 Q60 26 30 36 Z" fill="#1C1917"/>
      <path d="M24 44 Q22 62, 27 72 Q25 58, 27 46 Z" fill="#151210"/>
      <path d="M96 44 Q98 62, 93 72 Q95 58, 93 46 Z" fill="#151210"/>
      <path d="M35 30 Q60 25 85 30" stroke="#FDE047" stroke-width="1.2" opacity="0.3" fill="none"/>
    `;
  } else if (hair === 'hair_bim_no') {
    frontHairSvg = `
      <path d="M28 48 C26 24, 94 24, 92 48 C88 32, 32 32, 28 48 Z" fill="#261C14"/>
      <path d="M30 38 Q45 46 60 45 Q75 46 90 38 Q90 30 60 26 Q30 30 30 38 Z" fill="#261C14"/>
      <path d="M28 42 C28 56, 32 62, 34 66 C32 60, 31 52, 31 42 Z" fill="#1C150E"/>
      <path d="M92 42 C92 56, 88 62, 86 66 C88 60, 89 52, 89 42 Z" fill="#1C150E"/>
    `;
  } else if (hair === 'hair_ngan_bupbe') {
    frontHairSvg = `
      <path d="M26 48 C24 22, 96 22, 94 48 C90 30, 30 30, 26 48 Z" fill="#3D2817"/>
      <path d="M30 40 Q60 48 90 40 Q90 30 60 26 Q30 30 30 40 Z" fill="#3D2817"/>
      <path d="M26 44 C26 62, 33 68, 35 70 C32 64, 30 54, 30 44 Z" fill="#2E1D10"/>
      <path d="M94 44 C94 62, 87 68, 85 70 C88 64, 90 54, 90 44 Z" fill="#2E1D10"/>
      <path d="M34 32 L30 28 L30 36 Z M34 32 L38 28 L38 36 Z" fill="#FACC15"/>
      <circle cx="34" cy="32" r="1.5" fill="#FFFFFF"/>
    `;
  } else if (hair === 'hair_duoi_ngua') {
    frontHairSvg = `
      <path d="M28 46 C26 22, 94 22, 92 46 C86 30, 34 30, 28 46 Z" fill="#261C14"/>
      <path d="M30 36 Q50 44 65 40 Q80 36 90 34 Q80 26 60 26 Q34 26 30 36 Z" fill="#261C14"/>
      <path d="M28 44 L30 58 L33 46 Z" fill="#1E1610"/>
      <path d="M92 44 L90 58 L87 46 Z" fill="#1E1610"/>
    `;
  } else if (hair === 'hair_suon_hoa') {
    frontHairSvg = `
      <path d="M26 46 C24 20, 96 20, 94 46 C90 28, 30 28, 26 46 Z" fill="#1C1917"/>
      <path d="M28 36 Q45 44 60 42 Q75 44 92 36 Q90 26 60 25 Q30 26 28 36 Z" fill="#1C1917"/>
      <path d="M26 44 L28 62 L32 46 Z" fill="#151210"/>
      <path d="M94 44 L92 62 L88 46 Z" fill="#151210"/>
    `;
  } else if (hair === 'hair_bui_natra') {
    frontHairSvg = `
      <path d="M30 46 C30 24, 90 24, 90 46 C84 32, 36 32, 30 46 Z" fill="#261C14"/>
      <path d="M32 38 Q60 48 88 38 Q80 34 60 30 Q40 34 32 38 Z" fill="#261C14"/>
      <path d="M54 36 L60 44 L66 36 Z" fill="#261C14"/>
    `;
  } else if (hair === 'hair_trang_thong_thai' || hair === 'hair_trang_nguyen') {
    frontHairSvg = `
      <path d="M36 40 Q60 48 84 40 Q80 34 60 32 Q40 34 36 40 Z" fill="#1C1917"/>
      <path d="M36 34 C38 16, 82 16, 84 34 C86 42, 34 42, 36 34 Z" fill="#DC2626" stroke="#B91C1C" stroke-width="1.5"/>
      <ellipse cx="60" cy="35" rx="24" ry="5.5" fill="#F59E0B"/>
      <rect x="52" y="16" width="16" height="15" rx="3" fill="#DC2626"/>
      <circle cx="60" cy="22" r="5" fill="#FBBF24"/>
      <circle cx="60" cy="22" r="2.2" fill="#B91C1C"/>
    `;
  } else if (hair === 'hair_lang_tu') {
    frontHairSvg = `
      <path d="M26 46 C24 20, 96 20, 94 46 C90 28, 30 28, 26 46 Z" fill="#2E1D10"/>
      <path d="M28 36 Q48 46 56 42 Q74 38 92 34 Q90 26 60 24 Q30 26 28 36 Z" fill="#3D2817"/>
      <path d="M28 44 L30 56 L33 46 Z" fill="#2E1D10"/>
      <path d="M92 44 L90 56 L87 46 Z" fill="#2E1D10"/>
    `;
  }

  // 4. Kính mắt
  let glassesSvg = '';
  if (glasses === 'glasses_kinh_tron') {
    glassesSvg = `
      <g>
        <circle cx="46" cy="50" r="9.5" fill="rgba(255,255,255,0.25)" stroke="#0F172A" stroke-width="2"/>
        <circle cx="74" cy="50" r="9.5" fill="rgba(255,255,255,0.25)" stroke="#0F172A" stroke-width="2"/>
        <line x1="55.5" y1="50" x2="64.5" y2="50" stroke="#0F172A" stroke-width="2"/>
        <line x1="36.5" y1="50" x2="31" y2="48" stroke="#0F172A" stroke-width="1.8"/>
        <line x1="83.5" y1="50" x2="89" y2="48" stroke="#0F172A" stroke-width="1.8"/>
        <path d="M43 45 L48 43 M45 49 L50 47" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
        <path d="M71 45 L76 43 M73 49 L78 47" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.8"/>
      </g>
    `;
  } else if (glasses === 'glasses_kinh_tim') {
    glassesSvg = `
      <g>
        <path d="M36 47 Q46 43 54 48 Q46 57 37 54 Z" fill="rgba(244,114,182,0.3)" stroke="#EC4899" stroke-width="2"/>
        <path d="M84 47 Q74 43 66 48 Q74 57 83 54 Z" fill="rgba(244,114,182,0.3)" stroke="#EC4899" stroke-width="2"/>
        <line x1="54" y1="48" x2="66" y2="48" stroke="#EC4899" stroke-width="2"/>
        <circle cx="42" cy="48" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        <circle cx="78" cy="48" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      </g>
    `;
  } else if (glasses === 'glasses_kinh_sao') {
    glassesSvg = `
      <g transform="translate(0, 3)">
        <polygon points="46,40 49,47 56,48 51,53 52,60 46,56 40,60 41,53 36,48 43,47" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" opacity="0.9"/>
        <polygon points="74,40 77,47 84,48 79,53 80,60 74,56 68,60 69,53 64,48 71,47" fill="#FBBF24" stroke="#D97706" stroke-width="1.5" opacity="0.9"/>
        <line x1="56" y1="50" x2="64" y2="50" stroke="#D97706" stroke-width="2"/>
      </g>
    `;
  } else if (glasses === 'glasses_kinh_vuong') {
    glassesSvg = `
      <g>
        <rect x="36" y="44" width="18" height="13" rx="2.5" fill="rgba(255,255,255,0.25)" stroke="#1E293B" stroke-width="2"/>
        <rect x="66" y="44" width="18" height="13" rx="2.5" fill="rgba(255,255,255,0.25)" stroke="#1E293B" stroke-width="2"/>
        <line x1="54" y1="49" x2="66" y2="49" stroke="#1E293B" stroke-width="2"/>
        <line x1="36" y1="48" x2="31" y2="47" stroke="#1E293B" stroke-width="1.8"/>
        <line x1="84" y1="48" x2="89" y2="47" stroke="#1E293B" stroke-width="1.8"/>
        <path d="M39 47 L44 45" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M69 47 L74 45" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round"/>
      </g>
    `;
  } else if (glasses === 'glasses_ram') {
    glassesSvg = `
      <g>
        <path d="M35 44 L55 44 C54 56, 37 57, 35 44 Z" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <path d="M65 44 L85 44 C83 56, 66 57, 65 44 Z" fill="#0F172A" stroke="#334155" stroke-width="1.5"/>
        <line x1="55" y1="46" x2="65" y2="46" stroke="#334155" stroke-width="2"/>
        <line x1="35" y1="45" x2="31" y2="44" stroke="#334155" stroke-width="1.8"/>
        <line x1="85" y1="45" x2="89" y2="44" stroke="#334155" stroke-width="1.8"/>
        <path d="M38 46 L43 51" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M68 46 L73 51" stroke="rgba(255,255,255,0.45)" stroke-width="1.2" stroke-linecap="round"/>
      </g>
    `;
  } else if (glasses === 'glasses_nua_gong') {
    glassesSvg = `
      <g>
        <path d="M37 46 Q46 43 55 46" stroke="#B45309" stroke-width="2" fill="none"/>
        <rect x="38" y="46" width="16" height="10" rx="2" fill="rgba(255,255,255,0.2)" stroke="#CA8A04" stroke-width="0.8"/>
        <path d="M65 46 Q74 43 83 46" stroke="#B45309" stroke-width="2" fill="none"/>
        <rect x="66" y="46" width="16" height="10" rx="2" fill="rgba(255,255,255,0.2)" stroke="#CA8A04" stroke-width="0.8"/>
        <line x1="55" y1="46" x2="65" y2="46" stroke="#B45309" stroke-width="2"/>
      </g>
    `;
  } else if (glasses === 'glasses_mat_meo') {
    glassesSvg = `
      <g>
        <path d="M34 44 Q46 47 55 46 Q47 57 36 53 Z" fill="rgba(239,68,68,0.2)" stroke="#DC2626" stroke-width="2"/>
        <polygon points="34,44 31,39 37,43" fill="#DC2626"/>
        <path d="M86 44 Q74 47 65 46 Q73 57 84 53 Z" fill="rgba(239,68,68,0.2)" stroke="#DC2626" stroke-width="2"/>
        <polygon points="86,44 89,39 83,43" fill="#DC2626"/>
        <line x1="55" y1="46" x2="65" y2="46" stroke="#DC2626" stroke-width="2"/>
        <circle cx="43" cy="48" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        <circle cx="77" cy="48" r="1.5" fill="#FFFFFF" opacity="0.8"/>
      </g>
    `;
  } else if (glasses === 'glasses_phi_cong') {
    glassesSvg = `
      <g>
        <path d="M35 44 L55 44 C55 56, 37 58, 35 48 Z" fill="rgba(217,119,6,0.25)" stroke="#D97706" stroke-width="2"/>
        <path d="M65 44 L85 44 C85 48, 83 58, 65 56 Z" fill="rgba(217,119,6,0.25)" stroke="#D97706" stroke-width="2"/>
        <line x1="55" y1="45" x2="65" y2="45" stroke="#D97706" stroke-width="2"/>
        <line x1="53" y1="42" x2="67" y2="42" stroke="#B45309" stroke-width="1.8"/>
        <line x1="35" y1="44" x2="31" y2="43" stroke="#D97706" stroke-width="1.8"/>
        <line x1="85" y1="44" x2="89" y2="43" stroke="#D97706" stroke-width="1.8"/>
        <path d="M40 46 L45 52" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
        <path d="M70 46 L75 52" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" opacity="0.7"/>
      </g>
    `;
  } else if (glasses === 'glasses_cau_vong') {
    glassesSvg = `
      <g>
        <circle cx="46" cy="50" r="10" fill="rgba(255,255,255,0.2)" stroke="#EC4899" stroke-width="2.2"/>
        <circle cx="46" cy="50" r="8" fill="none" stroke="#FBBF24" stroke-width="1.2"/>
        <circle cx="74" cy="50" r="10" fill="rgba(255,255,255,0.2)" stroke="#3B82F6" stroke-width="2.2"/>
        <circle cx="74" cy="50" r="8" fill="none" stroke="#10B981" stroke-width="1.2"/>
        <path d="M56 49 Q60 46 64 49" stroke="#8B5CF6" stroke-width="2.2" fill="none"/>
        <line x1="36" y1="49" x2="31" y2="48" stroke="#EC4899" stroke-width="1.8"/>
        <line x1="84" y1="49" x2="89" y2="48" stroke="#3B82F6" stroke-width="1.8"/>
        <circle cx="43" cy="47" r="1.8" fill="#FFFFFF" opacity="0.9"/>
        <circle cx="71" cy="47" r="1.8" fill="#FFFFFF" opacity="0.9"/>
      </g>
    `;
  } else if (glasses === 'glasses_hoa_cuc') {
    glassesSvg = `
      <g>
        <g transform="translate(46, 50)">
          <circle cx="0" cy="0" r="8" fill="rgba(254,240,138,0.3)" stroke="#F59E0B" stroke-width="2"/>
          <circle cx="0" cy="-8" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="8" cy="0" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="0" cy="8" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="-8" cy="0" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="-2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        </g>
        <g transform="translate(74, 50)">
          <circle cx="0" cy="0" r="8" fill="rgba(254,240,138,0.3)" stroke="#F59E0B" stroke-width="2"/>
          <circle cx="0" cy="-8" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="8" cy="0" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="0" cy="8" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="-8" cy="0" r="2.5" fill="#FEF08A" stroke="#EAB308" stroke-width="0.8"/>
          <circle cx="-2" cy="-2" r="1.5" fill="#FFFFFF" opacity="0.8"/>
        </g>
        <line x1="54" y1="50" x2="66" y2="50" stroke="#F59E0B" stroke-width="2"/>
      </g>
    `;
  }

  // 5. Phụ kiện cho nữ
  let accSvg = '';
  if (acc === 'acc_vuong_mien') {
    accSvg = `
      <g>
        <ellipse cx="60" cy="23" rx="16" ry="4" fill="#FDE047" opacity="0.4"/>
        <path d="M43 25 L77 25 L75 28 L45 28 Z" fill="#D97706"/>
        <polygon points="44,25 43,15 51,21 60,9 69,21 77,15 76,25" fill="#FBBF24" stroke="#D97706" stroke-width="1.2"/>
        <circle cx="43" cy="15" r="2.2" fill="#F43F5E"/>
        <circle cx="51" cy="21" r="1.8" fill="#38BDF8"/>
        <circle cx="60" cy="9" r="3" fill="#E11D48"/>
        <circle cx="60" cy="9" r="1.2" fill="#FFFFFF"/>
        <circle cx="69" cy="21" r="1.8" fill="#38BDF8"/>
        <circle cx="77" cy="15" r="2.2" fill="#F43F5E"/>
        <circle cx="60" cy="21" r="2.2" fill="#FFF1F2" stroke="#E11D48" stroke-width="0.8"/>
      </g>
    `;
  } else if (acc === 'acc_no_cai_toc') {
    accSvg = `
      <g transform="translate(80, 24)">
        <path d="M0 0 C-10 -10, -16 -4, -13 5 C-10 11, -2 4, 0 0 Z" fill="#E11D48" stroke="#9F1239" stroke-width="1"/>
        <path d="M0 0 C10 -10, 16 -4, 13 5 C10 11, 2 4, 0 0 Z" fill="#E11D48" stroke="#9F1239" stroke-width="1"/>
        <path d="M-2 3 C-4 10, -8 18, -6 20 C-4 18, -1 12, 0 4 Z" fill="#BE123C"/>
        <path d="M2 3 C4 10, 8 18, 6 20 C4 18, 1 12, 0 4 Z" fill="#BE123C"/>
        <circle cx="0" cy="1" r="3.2" fill="#FDE047" stroke="#D97706" stroke-width="0.8"/>
      </g>
    `;
  } else if (acc === 'acc_bom_hoa') {
    accSvg = `
      <g>
        <path d="M33 34 Q60 16 87 34" stroke="#F472B6" stroke-width="3" stroke-linecap="round" fill="none"/>
        <circle cx="42" cy="26" r="2.2" fill="#FFFFFF" stroke="#F472B6" stroke-width="0.6"/>
        <circle cx="51" cy="21" r="2.2" fill="#FFFFFF" stroke="#F472B6" stroke-width="0.6"/>
        <circle cx="69" cy="21" r="2.2" fill="#FFFFFF" stroke="#F472B6" stroke-width="0.6"/>
        <circle cx="78" cy="26" r="2.2" fill="#FFFFFF" stroke="#F472B6" stroke-width="0.6"/>
        <g transform="translate(60, 19)">
          <circle cx="0" cy="-3.5" r="2.8" fill="#FDA4AF"/>
          <circle cx="3.5" cy="-1" r="2.8" fill="#FDA4AF"/>
          <circle cx="2.5" cy="3" r="2.8" fill="#FDA4AF"/>
          <circle cx="-2.5" cy="3" r="2.8" fill="#FDA4AF"/>
          <circle cx="-3.5" cy="-1" r="2.8" fill="#FDA4AF"/>
          <circle cx="0" cy="0" r="1.8" fill="#FDE047"/>
        </g>
      </g>
    `;
  } else if (acc === 'acc_bom_tai_meo') {
    accSvg = `
      <g>
        <path d="M34 32 Q60 18 86 32" stroke="#EC4899" stroke-width="2.5" fill="none"/>
        <polygon points="36,30 30,12 48,22" fill="#F472B6" stroke="#DB2777" stroke-width="1.2"/>
        <polygon points="36,27 33,16 44,22" fill="#FCE7F3"/>
        <circle cx="37" cy="31" r="2.2" fill="#FBBF24"/>
        <polygon points="84,30 90,12 72,22" fill="#F472B6" stroke="#DB2777" stroke-width="1.2"/>
        <polygon points="84,27 87,16 76,22" fill="#FCE7F3"/>
        <circle cx="83" cy="31" r="2.2" fill="#FBBF24"/>
      </g>
    `;
  } else if (acc === 'acc_kep_buom') {
    accSvg = `
      <g transform="translate(76, 26)">
        <ellipse cx="-4" cy="-4" rx="6" ry="4.5" fill="#FBBF24" opacity="0.9" transform="rotate(-30 -4 -4)"/>
        <ellipse cx="4" cy="-4" rx="6" ry="4.5" fill="#FBBF24" opacity="0.9" transform="rotate(30 4 -4)"/>
        <ellipse cx="-3" cy="3" rx="4" ry="3" fill="#FDE047" opacity="0.8" transform="rotate(-15 -3 3)"/>
        <ellipse cx="3" cy="3" rx="4" ry="3" fill="#FDE047" opacity="0.8" transform="rotate(15 3 3)"/>
        <ellipse cx="0" cy="0" rx="1.5" ry="4" fill="#E11D48"/>
        <circle cx="-2" cy="-5" r="0.8" fill="#D97706"/>
        <circle cx="2" cy="-5" r="0.8" fill="#D97706"/>
      </g>
    `;
  } else if (acc === 'acc_tai_gau') {
    accSvg = `
      <circle cx="32" cy="22" r="10" fill="#78350F" stroke="#451A03" stroke-width="1"/>
      <circle cx="32" cy="22" r="6" fill="#FDE68A"/>
      <circle cx="88" cy="22" r="10" fill="#78350F" stroke="#451A03" stroke-width="1"/>
      <circle cx="88" cy="22" r="6" fill="#FDE68A"/>
      <path d="M34 26 Q60 16 86 26" stroke="#451A03" stroke-width="2" fill="none"/>
    `;
  } else if (acc === 'acc_but_long') {
    accSvg = `
      <g transform="translate(86, 68) rotate(35)">
        <rect x="-2" y="-22" width="4" height="24" rx="1.5" fill="#B45309" stroke="#78350F" stroke-width="0.8"/>
        <path d="M-2 -22 L0 -30 L2 -22 Z" fill="#F8FAFC" stroke="#0F172A" stroke-width="0.8"/>
        <path d="M-1 -26 L0 -30 L1 -26 Z" fill="#0F172A"/>
        <circle cx="0" cy="2" r="2.5" fill="#F59E0B"/>
      </g>
    `;
  } else if (acc === 'acc_sach_tre') {
    accSvg = `
      <g transform="translate(26, 78) rotate(-20)">
        <rect x="-12" y="-14" width="24" height="18" rx="2" fill="#FEF08A" stroke="#CA8A04" stroke-width="1.2"/>
        <line x1="-8" y1="-9" x2="8" y2="-9" stroke="#B45309" stroke-width="1"/>
        <line x1="-8" y1="-5" x2="8" y2="-5" stroke="#B45309" stroke-width="1"/>
        <line x1="-8" y1="-1" x2="8" y2="-1" stroke="#B45309" stroke-width="1"/>
        <line x1="-12" y1="-5" x2="-12" y2="4" stroke="#DC2626" stroke-width="2.5"/>
      </g>
    `;
  } else if (acc === 'acc_quat_giay') {
    accSvg = `
      <g transform="translate(90, 75) rotate(15)">
        <path d="M0 0 L-14 -18 A20 20 0 0 1 14 -18 Z" fill="#FBCFE8" stroke="#DB2777" stroke-width="1"/>
        <circle cx="0" cy="-10" r="3" fill="#F43F5E"/>
        <line x1="0" y1="0" x2="0" y2="8" stroke="#B45309" stroke-width="2"/>
      </g>
    `;
  } else if (acc === 'acc_non_la') {
    accSvg = `
      <g>
        <polygon points="60,8 20,38 100,38" fill="#FDE047" stroke="#D97706" stroke-width="1.5"/>
        <line x1="60" y1="8" x2="35" y2="38" stroke="#D97706" stroke-width="0.8"/>
        <line x1="60" y1="8" x2="85" y2="38" stroke="#D97706" stroke-width="0.8"/>
        <line x1="60" y1="8" x2="60" y2="38" stroke="#D97706" stroke-width="0.8"/>
        <path d="M20 38 Q60 44 100 38" fill="#FACC15" stroke="#D97706" stroke-width="1.2"/>
      </g>
    `;
  } else if (acc === 'acc_mu_sinh_nhat') {
    accSvg = `
      <g>
        <polygon points="60,10 40,36 80,36" fill="#EC4899" stroke="#BE123C" stroke-width="1.2"/>
        <circle cx="60" cy="8" r="3.5" fill="#FDE047"/>
        <line x1="48" y1="22" x2="72" y2="22" stroke="#FFFFFF" stroke-width="2"/>
        <line x1="44" y1="28" x2="76" y2="28" stroke="#FBBF24" stroke-width="2"/>
      </g>
    `;
  } else if (acc === 'acc_vong_hoa') {
    accSvg = `
      <g>
        <path d="M30 32 Q60 14 90 32" stroke="#16A34A" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        <circle cx="36" cy="28" r="3" fill="#F43F5E"/>
        <circle cx="48" cy="22" r="3.5" fill="#FACC15"/>
        <circle cx="60" cy="18" r="3" fill="#38BDF8"/>
        <circle cx="72" cy="22" r="3.5" fill="#F43F5E"/>
        <circle cx="84" cy="28" r="3" fill="#FACC15"/>
      </g>
    `;
  }

  return `
    <svg viewBox="0 10 120 105" width="${size}" height="${size}" class="overflow-visible select-none inline-block">
      <defs>
        <radialGradient id="cb_blush_${size}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FB7185" stop-opacity="0.65"/>
          <stop offset="100%" stop-color="#FB7185" stop-opacity="0"/>
        </radialGradient>
      </defs>

      <!-- Tóc sau -->
      ${backHairSvg}

      <!-- Quần áo -->
      ${outfitSvg}

      <!-- Cổ & Khuôn mặt -->
      <rect x="54" y="66" width="12" height="10" rx="3" fill="#FED7AA"/>
      <ellipse cx="60" cy="52" rx="28" ry="24" fill="#FFF1EE"/>

      <!-- Má hồng -->
      <circle cx="40" cy="58" r="6.5" fill="url(#cb_blush_${size})"/>
      <circle cx="80" cy="58" r="6.5" fill="url(#cb_blush_${size})"/>

      <!-- Mắt -->
      <g>
        <ellipse cx="46" cy="50" rx="5.5" ry="7.2" fill="#1E293B"/>
        <ellipse cx="48" cy="47" rx="2.4" ry="3.4" fill="#FFFFFF"/>
        <circle cx="44.5" cy="53" r="1.3" fill="#FFFFFF"/>
        <path d="M39 46 Q46 41 53 46" stroke="#0F172A" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M53 45 L55 43" stroke="#0F172A" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M40 40 Q46 38 52 41" stroke="#334155" stroke-width="1.3" stroke-linecap="round" fill="none"/>
      </g>
      <g>
        <ellipse cx="74" cy="50" rx="5.5" ry="7.2" fill="#1E293B"/>
        <ellipse cx="76" cy="47" rx="2.4" ry="3.4" fill="#FFFFFF"/>
        <circle cx="72.5" cy="53" r="1.3" fill="#FFFFFF"/>
        <path d="M67 46 Q74 41 81 46" stroke="#0F172A" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M81 45 L83 43" stroke="#0F172A" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M68 41 Q74 38 80 40" stroke="#334155" stroke-width="1.3" stroke-linecap="round" fill="none"/>
      </g>

      <!-- Miệng -->
      <path d="M54 59 Q60 67 66 59" stroke="#E11D48" stroke-width="2" stroke-linecap="round" fill="#FDA4AF"/>

      <!-- Tóc trước -->
      ${frontHairSvg}

      <!-- Kính mắt -->
      ${glassesSvg}

      <!-- Phụ kiện -->
      ${accSvg}
    </svg>
  `;
}

function getCurrentAvatarHtml(size = 40) {
  if (!AppState.useCustomAvatar && AppState.currentAvatarImage) {
    const primaryUrl = getChibiUrl(AppState.currentAvatarImage);
    const fallbackAsset = getChibiFallbackAsset(AppState.currentAvatarImage);
    return `<img src="${primaryUrl}" alt="Avatar" class="w-full h-full object-cover object-[center_15%] rounded-full" onerror="this.onerror=null; this.src='${fallbackAsset}';">`;
  }
  return renderChibiAvatarSvg(AppState.avatarConfig, size);
}

function getCurrentAvatar() {
  return AppState.currentAvatarImage || 'app_logo.png';
}

function openAvatarModal() {
  SoundEngine.playClick();
  const modalContainer = document.getElementById('modal-container');
  const stars = AppState.stars || 0;
  const isAdmin = isAdminAccount();

  const DEFAULT_UNLOCKED_IDS = ['chibi_cong_chua_toc_may', 'chibi_co_be_de_thuong', 'chibi_hoang_tu'];

  const itemsGridHtml = AVATAR_LOOKBOOKS.map(lb => {
    const isEquipped = (AppState.selectedChibiId === lb.id || (lb.id === 'chibi_co_be_de_thuong' && AppState.selectedChibiId === 'chibi_trang_thong_thai'));
    const isDefaultUnlocked = DEFAULT_UNLOCKED_IDS.includes(lb.id);
    const isPurchased = (AppState.purchasedChibis || []).includes(lb.id);
    const isOwned = isAdmin || isDefaultUnlocked || isPurchased;

    return `
      <div class="p-2.5 rounded-2xl border-2 ${isEquipped ? 'border-red-500 bg-red-50/90 ring-2 ring-red-400' : 'border-amber-200 bg-amber-50/40 hover:bg-amber-100/60'} flex items-center gap-2.5 transition-all">
        <div class="w-14 h-14 shrink-0 rounded-2xl bg-white border border-amber-300 flex items-center justify-center p-0.5 shadow-inner overflow-hidden relative cursor-pointer" onclick="${isOwned ? `applyLookbook('${lb.id}')` : `openUnlockChibiModal('${lb.id}')`}">
          <img src="${getChibiUrl(lb.image)}" alt="${lb.name}" class="w-full h-full object-cover object-[center_15%] rounded-xl" onerror="this.onerror=null; this.src='${getChibiFallbackAsset(lb.image)}';">
          ${!isOwned ? '<span class="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">🔒</span>' : ''}
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-1 mb-1">
            <h4 class="font-black text-xs sm:text-sm text-slate-800 truncate">${lb.name}</h4>
            ${isOwned ? `
              <span class="shrink-0 text-[10px] font-extrabold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">Đã mở ✓</span>
            ` : `
              <button onclick="openUnlockChibiModal('${lb.id}')" class="shrink-0 text-[10px] font-extrabold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-400 px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-xs cursor-pointer active:scale-95 transition-all" title="Bấm để xem các lựa chọn dùng thử / đổi vĩnh viễn">
                <span>🔒 Khóa</span>
              </button>
            `}
          </div>
          <div class="mt-2 flex items-center justify-end gap-1 flex-wrap">
            ${isEquipped ? `
              <span class="text-[10px] bg-red-600 text-white px-2.5 py-1 rounded-full font-black shadow-sm">Đang chọn ✓</span>
            ` : isOwned ? `
              <button onclick="applyLookbook('${lb.id}')" class="btn-3d btn-3d-green text-[11px] font-black px-3 py-1 rounded-xl text-white shadow">
                Chọn dùng
              </button>
            ` : `
              <button onclick="openUnlockChibiModal('${lb.id}')" class="btn-3d btn-3d-gold text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-xl text-amber-950 shadow flex items-center gap-1 active:scale-95 transition-all" title="Bấm để mở các lựa chọn dùng thử / đổi vĩnh viễn">
                <span>🔒 Mở khóa</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 pb-16 sm:pb-16">
      <div class="scroll-card max-w-lg w-full p-3.5 sm:p-4 bg-white border-4 border-amber-400 relative shadow-2xl flex flex-col max-h-[82vh] sm:max-h-[85vh] rounded-3xl overflow-hidden">
        <button onclick="closeModal()" class="absolute top-2 right-2 z-20 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-amber-200/80 pr-8 shrink-0 flex-wrap">
          <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-red-600 text-white font-black text-xs shadow-sm">
            <span>🖼️</span>
            <span>Cửa Hàng Hình Mẫu Chibi</span>
          </div>

          <div class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs shadow-sm">
            <span>⭐</span>
            <span id="wardrobe-stars-count">${stars}</span>
            <span class="text-[10px] font-bold">Sao</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5 pb-2 border-b border-amber-200 shrink-0">
          <div class="relative shrink-0">
            <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-300 to-amber-400 p-1 border-2 border-amber-400 shadow-inner flex items-center justify-center overflow-hidden bg-white">
              <div id="wardrobe-current-avatar-preview" class="w-full h-full flex items-center justify-center">
                ${getCurrentAvatarHtml(70)}
              </div>
            </div>
          </div>

          <div class="flex-1 min-w-0 flex flex-col justify-center space-y-1">
            <div>
              <span class="text-[9px] font-bold text-slate-500 uppercase tracking-tight">Hình Mẫu Đang Chọn:</span>
              <h3 class="text-sm sm:text-base font-black text-amber-950 leading-tight truncate">${AppState.avatarName || 'Siêu Trạng Nhí'}</h3>
            </div>

            <div>
              ${isAdmin ? `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-red-600 text-yellow-200 font-black text-[10px] shadow-sm border border-yellow-300">
                  👑 Admin: Mở khóa tất cả
                </span>
              ` : `
                <button onclick="watchRewardedAdForStars(30)" class="btn-3d btn-3d-green px-2.5 py-1 rounded-xl text-white font-black text-[11px] shadow flex items-center justify-center gap-1 active:scale-95 transition-all" title="Xem 1 video ngắn nhận ngay 30 sao đổi hình mẫu">
                  <span>🎬</span>
                  <span>+30 ⭐ (Xem Video)</span>
                </button>
              `}
            </div>
          </div>
        </div>

        <div class="my-1.5 shrink-0 flex items-center justify-between">
          <span class="text-[11px] font-black text-amber-950 uppercase tracking-wide flex items-center gap-1">
            <span>✨</span> Danh Sách Hình Mẫu Chibi (${AVATAR_LOOKBOOKS.length} nhân vật):
          </span>
        </div>

        <div class="flex-1 min-h-0 overflow-y-auto p-1 pr-1.5 my-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            ${itemsGridHtml}
          </div>
        </div>

        <div class="mt-2 pt-2 border-t border-amber-200 flex justify-between items-center shrink-0 gap-2">
          <span class="text-[10px] sm:text-[11px] text-slate-500 font-medium truncate">Thi để nhận thêm Sao!</span>
          <button onclick="closeModal(); updateHeaderUI(); if(!AppState.currentExamMode1 && AppState.exam30Questions.length === 0) renderHome();" class="px-4 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs shrink-0 active:scale-95 transition-all">
            Đóng Cửa Hàng
          </button>
        </div>
      </div>
    </div>
  `;
  safeCreateIcons();
}

function showWardrobeToast(msg) {
  let toast = document.getElementById('wardrobe-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'wardrobe-toast';
    toast.className = 'fixed top-14 left-1/2 -translate-x-1/2 z-[999999] bg-emerald-600 text-white font-extrabold text-xs sm:text-sm px-4 py-2 rounded-full shadow-2xl border-2 border-yellow-300 transition-all flex items-center gap-1.5 animate-bounce';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <span>${msg}</span>`;
  toast.style.display = 'flex';
  if (toast._timer) clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    if (toast) toast.style.display = 'none';
  }, 2200);
}

function equipAvatarItem(category, itemId) {
  if (!AppState.avatarConfig) {
    AppState.avatarConfig = { hair: 'hair_suon_hoa', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' };
  }
  AppState.avatarConfig[category] = itemId;
  AppState.useCustomAvatar = true;
  AppState.avatarName = 'Siêu Trạng Nhí';
  savePersistedState();
  SoundEngine.playClick();
  updateHeaderUI();
  const prevEl = document.getElementById('wardrobe-current-avatar-preview');
  if (prevEl) {
    prevEl.innerHTML = getCurrentAvatarHtml(125);
  }
  openAvatarModal(category);
  showWardrobeToast('Đã mặc thành công vật phẩm mới! (Nhân vật đổi sang Siêu Trạng Nhí)');
}

function buyAndEquipAvatarItem(category, itemId, price) {
  const curStars = AppState.stars || 0;
  const isAdmin = isAdminAccount();
  if (!isAdmin && curStars < price) {
    SoundEngine.playWrong();
    showWardrobeToast(`Bé cần thêm ${price - curStars} ⭐ nữa để đổi!`);
    return;
  }

  if (!isAdmin) {
    AppState.stars = curStars - price;
  }
  if (!AppState.ownedItems) AppState.ownedItems = [];
  if (!AppState.ownedItems.includes(itemId)) {
    AppState.ownedItems.push(itemId);
  }
  if (!AppState.avatarConfig) {
    AppState.avatarConfig = { hair: 'hair_suon_hoa', outfit: 'outfit_ao_dai_hoa', glasses: 'glasses_none', accessory: 'acc_no_cai_toc' };
  }
  AppState.avatarConfig[category] = itemId;
  AppState.useCustomAvatar = true;
  AppState.avatarName = 'Siêu Trạng Nhí';
  savePersistedState();
  SoundEngine.playSuccess();
  updateHeaderUI();
  const prevEl = document.getElementById('wardrobe-current-avatar-preview');
  if (prevEl) {
    prevEl.innerHTML = getCurrentAvatarHtml(125);
  }
  openAvatarModal(category);
  showWardrobeToast(isAdmin ? '👑 Quyền Admin: Đã mặc vật phẩm mới miễn phí!' : 'Đã đổi & mặc thành công vật phẩm mới!');
}

function applyLookbook(lookbookId) {
  const lb = AVATAR_LOOKBOOKS.find(x => x.id === lookbookId || (lookbookId === 'chibi_trang_thong_thai' && x.id === 'chibi_co_be_de_thuong'));
  if (!lb) return;
  AppState.selectedChibiId = lb.id;
  AppState.avatarName = lb.name;
  AppState.currentAvatarImage = lb.image;
  AppState.useCustomAvatar = false;
  if (lb.config) {
    AppState.avatarConfig = { ...lb.config };
  }
  savePersistedState();
  SoundEngine.playSuccess();
  updateHeaderUI();
  const prevEl = document.getElementById('wardrobe-current-avatar-preview');
  if (prevEl) {
    prevEl.innerHTML = getCurrentAvatarHtml(125);
  }
  openAvatarModal('lookbook');
  showWardrobeToast(`Đã chọn nhân vật ${lb.name}!`);
}

function unlockLookbook(lookbookId, neededStars) {
  const lb = AVATAR_LOOKBOOKS.find(x => x.id === lookbookId || (lookbookId === 'chibi_trang_thong_thai' && x.id === 'chibi_co_be_de_thuong'));
  if (!lb) return;
  const curStars = AppState.stars || 0;
  const isAdmin = isAdminAccount();
  if (!isAdmin && curStars < neededStars) {
    SoundEngine.playWrong();
    showWardrobeToast(`Bé cần thêm ${neededStars - curStars} ⭐ để đổi ${lb.name}!`);
    return;
  }

  if (!isAdmin) {
    AppState.stars = curStars - neededStars;
  }
  if (!AppState.ownedChibis) AppState.ownedChibis = [];
  if (!AppState.ownedChibis.includes(lb.id)) {
    AppState.ownedChibis.push(lb.id);
  }
  if (!AppState.purchasedChibis) AppState.purchasedChibis = [];
  if (!AppState.purchasedChibis.includes(lb.id)) {
    AppState.purchasedChibis.push(lb.id);
  }
  AppState.selectedChibiId = lb.id;
  AppState.avatarName = lb.name;
  AppState.currentAvatarImage = lb.image;
  AppState.useCustomAvatar = false;
  if (lb.config) {
    AppState.avatarConfig = { ...lb.config };
  }
  savePersistedState();
  SoundEngine.playFanfare();
  updateHeaderUI();
  const prevEl = document.getElementById('wardrobe-current-avatar-preview');
  if (prevEl) {
    prevEl.innerHTML = getCurrentAvatarHtml(125);
  }
  openAvatarModal('lookbook');
  showWardrobeToast(isAdmin ? `👑 Admin: Mở khóa ${lb.name}!` : `Mở thành công nhân vật ${lb.name}! ⭐🎉`);
}

function openUnlockChibiModal(lookbookId) {
  SoundEngine.playClick();
  const lb = AVATAR_LOOKBOOKS.find(x => x.id === lookbookId);
  if (!lb) return;
  const modalContainer = document.getElementById('modal-container');
  const stars = AppState.stars || 0;

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="scroll-card max-w-sm w-full p-5 sm:p-6 bg-gradient-to-b from-amber-50 via-white to-orange-50/80 rounded-3xl text-center shadow-2xl border-4 border-amber-400 relative overflow-hidden">
        <button onclick="openAvatarModal()" class="absolute top-2.5 right-2.5 z-20 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <div class="relative w-24 h-24 mx-auto mb-3">
          <div class="w-24 h-24 rounded-2xl border-4 border-amber-400 bg-white p-1 shadow-md overflow-hidden flex items-center justify-center">
            <img src="${getChibiUrl(lb.image)}" alt="${lb.name}" class="w-full h-full object-cover object-[center_15%] rounded-xl" onerror="this.onerror=null; this.src='${getChibiFallbackAsset(lb.image)}';">
          </div>
          <span class="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 border border-amber-200 rounded-full w-7 h-7 flex items-center justify-center text-sm shadow">🔒</span>
        </div>

        <h3 class="text-base sm:text-lg font-black text-amber-950 mb-1 leading-tight">${lb.name}</h3>
        <p class="text-xs font-bold text-amber-800/80 mb-4">Số sao hiện có: <b class="text-red-600 font-extrabold text-sm">${stars} ⭐</b></p>

        <div class="space-y-2.5 mb-3">
          <button onclick="trialLookbookWithStars('${lb.id}', ${lb.trialPrice || 150})" class="btn-3d bg-amber-100 hover:bg-amber-200 border-2 border-amber-400 text-amber-950 w-full py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm shadow flex items-center justify-between gap-2">
            <span class="flex items-center gap-1.5">
              <span>✨</span>
              <span>Dùng Thử Bằng Sao</span>
            </span>
            <span class="bg-amber-300/80 text-amber-950 px-2.5 py-0.5 rounded-full font-black text-xs">${lb.trialPrice || 150} ⭐</span>
          </button>

          <button onclick="unlockLookbook('${lb.id}', ${lb.price || 500})" class="btn-3d btn-3d-gold w-full py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm text-amber-950 shadow flex items-center justify-between gap-2">
            <span class="flex items-center gap-1.5">
              <span>👑</span>
              <span>Đổi Vĩnh Viễn</span>
            </span>
            <span class="bg-amber-200/90 text-red-700 px-2.5 py-0.5 rounded-full font-black text-xs">${lb.price || 500} ⭐</span>
          </button>

          <button onclick="watchRewardedAdForChibi('${lb.id}')" class="btn-3d btn-3d-green w-full py-2.5 px-3 rounded-xl font-black text-xs sm:text-sm text-white shadow flex items-center justify-between gap-2 active:scale-95">
            <span class="flex items-center gap-1.5">
              <span>🎬</span>
              <span>Xem Video Dùng Thử</span>
            </span>
            <span class="bg-emerald-700/80 text-white px-2 py-0.5 rounded-full font-extrabold text-[10px]">Miễn phí</span>
          </button>
        </div>

        <button onclick="openAvatarModal()" class="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs active:scale-95 transition-all">
          ◄ Quay Lại Cửa Hàng
        </button>
      </div>
    </div>
  `;
  safeCreateIcons();
}

function trialLookbookWithStars(lookbookId, trialStars) {
  const lb = AVATAR_LOOKBOOKS.find(x => x.id === lookbookId);
  if (!lb) return;
  const curStars = AppState.stars || 0;
  const isAdmin = isAdminAccount();

  if (!isAdmin && curStars < trialStars) {
    SoundEngine.playWrong();
    showWardrobeToast(`Bé cần ${trialStars} ⭐ để dùng thử ${lb.name}!`);
    return;
  }

  if (!isAdmin) {
    AppState.stars = curStars - trialStars;
  }
  applyLookbook(lb.id);
  savePersistedState();
  showWardrobeToast(`✨ Đã dùng thử nhân vật ${lb.name} (${trialStars} ⭐)!`);
}

function triggerScanAndRestoreVip() {
  if (typeof SoundEngine !== 'undefined' && SoundEngine.playClick) {
    SoundEngine.playClick();
  }

  if (window.AndroidBridge && typeof window.AndroidBridge.restorePurchases === 'function') {
    window.AndroidBridge.restorePurchases();
  } else if (window.AndroidBridge && typeof window.AndroidBridge.scanAndRestoreVip === 'function') {
    window.AndroidBridge.scanAndRestoreVip();
  } else {
    showCustomAlert('🔍 Đang thực hiện kiểm tra và khôi phục tài khoản VIP từ Google Play...');
  }
}

function openAccountModal() {
  if (typeof SoundEngine !== 'undefined' && SoundEngine.playClick) {
    SoundEngine.playClick();
  }
  const modalContainer = document.getElementById('modal-container');

  modalContainer.innerHTML = `
    <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="scroll-card max-w-sm w-full p-5 bg-white border-2 border-amber-400 relative shadow-xl">
        <button onclick="closeModal()" class="absolute top-2.5 right-2.5 text-slate-400 hover:text-slate-600 p-1 rounded-full">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>
        <div class="text-center mb-4">
          <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-2 text-2xl font-black">👤</div>
          <h3 class="text-lg font-black text-amber-950">Tài Khoản & Tên Học Sinh</h3>
          <p class="text-xs text-slate-500 mt-0.5">Nhập tên hiển thị trên bảng vàng & thông tin tài khoản</p>
        </div>
        <div class="space-y-3 mb-5">
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Tên học sinh hiển thị:</label>
            <input type="text" id="input-account-name" value="${AppState.studentName || ''}" placeholder="Nhập tên bé..." class="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-sm text-slate-800 focus:outline-none focus:border-amber-500">
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-700 mb-1">Mã kích hoạt VIP / ID tài khoản (nếu có):</label>
            <input type="text" id="input-account-id" value="${AppState.customAccountId || ''}" placeholder="Mã kích hoạt..." class="w-full px-3 py-2 border-2 border-amber-300 rounded-xl font-bold text-sm text-slate-800 focus:outline-none focus:border-amber-500">
          </div>
        </div>
        <div class="space-y-2">
          <button onclick="saveAccountInfo()" class="btn-3d btn-3d-gold w-full py-2.5 rounded-xl font-black text-amber-950 text-sm shadow">
            Lưu Thay Đổi
          </button>
          <button onclick="triggerScanAndRestoreVip()" class="w-full py-2 rounded-xl bg-amber-100 hover:bg-amber-200 border border-amber-300 text-amber-900 font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1">
            <span>🔍</span>
            <span>Khôi Phục Gói VIP Từ Google Play</span>
          </button>
        </div>
      </div>
    </div>
  `;
  safeCreateIcons();
}

function saveAccountInfo() {
  const nameInput = document.getElementById('input-account-name');
  const idInput = document.getElementById('input-account-id');
  if (nameInput && nameInput.value.trim()) {
    AppState.studentName = nameInput.value.trim();
  }
  if (idInput) {
    AppState.customAccountId = idInput.value.trim();
    if (AppState.customAccountId.toLowerCase() === 'uyenlp1310' || AppState.customAccountId.toLowerCase() === 'apptest' || AppState.customAccountId.toLowerCase() === 'testapp') {
      AppState.isAdmin = true;
      AppState.isVip1 = true;
      AppState.isVip2 = true;
      showCustomAlert('👑 Đã xác thực thành công quyền Admin!');
    }
  }
  savePersistedState();
  updateHeaderUI();
  closeModal();
  showCustomAlert('🎉 Đã cập nhật thành công thông tin tài khoản!');
}
