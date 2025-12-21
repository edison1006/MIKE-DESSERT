export const translations = {
  en: {
    nav: {
      home: 'Home Page',
      shop: 'Shop',
      menu: 'Menu',
      about: 'About',
    },
    header: {
      searchPlaceholder: 'Search for...',
      account: 'Account',
      cart: 'Cart',
      pickingUp: 'Picking up?',
      selectStore: 'Select store',
    },
    auth: {
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signOut: 'Sign Out',
      welcomeBack: 'Welcome back!',
      joinUs: 'Join us for exclusive offers',
      fullName: 'Full Name',
      email: 'Email',
      password: 'Password',
      createAccount: 'Create Account',
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: 'Already have an account?',
    },
  },
  zh: {
    nav: {
      home: '首页',
      shop: '商店',
      menu: '菜单',
      about: '关于',
    },
    header: {
      searchPlaceholder: '搜索...',
      account: '账户',
      cart: '购物车',
      pickingUp: '自取？',
      selectStore: '选择门店',
    },
    auth: {
      signIn: '登录',
      signUp: '注册',
      signOut: '退出',
      welcomeBack: '欢迎回来！',
      joinUs: '加入我们，享受专属优惠',
      fullName: '姓名',
      email: '邮箱',
      password: '密码',
      createAccount: '创建账户',
      dontHaveAccount: '还没有账户？',
      alreadyHaveAccount: '已有账户？',
    },
  },
  mi: {
    nav: {
      home: 'Kāinga',
      shop: 'Tohu',
      menu: 'Rārangi',
      about: 'Mō',
    },
    header: {
      searchPlaceholder: 'Rapua...',
      account: 'Pūkete',
      cart: 'Kete',
      pickingUp: 'Tiki mai?',
      selectStore: 'Kōwhiri toa',
    },
    auth: {
      signIn: 'Takiuru',
      signUp: 'Rēhita',
      signOut: 'Takiputa',
      welcomeBack: 'Nau mai hoki mai!',
      joinUs: 'Hono mai mō ngā whakaaro motuhake',
      fullName: 'Ingoa Katoa',
      email: 'Īmēra',
      password: 'Kupuhipa',
      createAccount: 'Waihanga Pūkete',
      dontHaveAccount: 'Kāore anō koe i te pūkete?',
      alreadyHaveAccount: 'Kei a koe tētahi pūkete?',
    },
  },
  ko: {
    nav: {
      home: '홈',
      shop: '쇼핑',
      menu: '메뉴',
      about: '소개',
    },
    header: {
      searchPlaceholder: '검색...',
      account: '계정',
      cart: '장바구니',
      pickingUp: '픽업하시나요?',
      selectStore: '매장 선택',
    },
    auth: {
      signIn: '로그인',
      signUp: '회원가입',
      signOut: '로그아웃',
      welcomeBack: '다시 오신 것을 환영합니다!',
      joinUs: '독점 혜택을 받으세요',
      fullName: '이름',
      email: '이메일',
      password: '비밀번호',
      createAccount: '계정 만들기',
      dontHaveAccount: '계정이 없으신가요?',
      alreadyHaveAccount: '이미 계정이 있으신가요?',
    },
  },
  ja: {
    nav: {
      home: 'ホーム',
      shop: 'ショップ',
      menu: 'メニュー',
      about: 'について',
    },
    header: {
      searchPlaceholder: '検索...',
      account: 'アカウント',
      cart: 'カート',
      pickingUp: 'お受け取りですか？',
      selectStore: '店舗を選択',
    },
    auth: {
      signIn: 'ログイン',
      signUp: '新規登録',
      signOut: 'ログアウト',
      welcomeBack: 'おかえりなさい！',
      joinUs: '限定オファーにご参加ください',
      fullName: 'お名前',
      email: 'メールアドレス',
      password: 'パスワード',
      createAccount: 'アカウント作成',
      dontHaveAccount: 'アカウントをお持ちでないですか？',
      alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
    },
  },
};

export const getTranslation = (language, key) => {
  const keys = key.split('.');
  let value = translations[language] || translations.en;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  // 如果当前语言找不到，尝试英文
  if (!value && language !== 'en') {
    value = translations.en;
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
  }
  
  return value || key;
};

