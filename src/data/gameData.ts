export interface InfoCardItem {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconType: 'definition' | 'origin' | 'ingredients' | 'characteristics';
  summary: string;
  details: string[];
  funFact: string;
  minangTerm: string;
}

export interface IngredientItem {
  id: string;
  name: string;
  minangName?: string;
  isCorrect: boolean;
  category: 'Bahan Utama' | 'Bumbu Halus' | 'Rempah Aromatik' | 'Pengecoh';
  roleExplanation: string;
}

export interface CookingStepItem {
  id: string;
  correctOrder: number;
  title: string;
  shortLabel: string;
  description: string;
  culinaryTip: string;
  potStage: 'cut-meat' | 'grind-spice' | 'saute-spice' | 'pour-coconut' | 'simmer-kalio' | 'final-rendang';
}

export interface QuizQuestionItem {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LeaderboardEntry {
  name: string;
  chefCharacter: 'female' | 'male';
  score: number;
  predicate: string;
  date: string;
}

// LEVEL 1 — KENALI RENDANG (4 Kartu Informasi, total 10 poin)
export const LEVEL1_CARDS: InfoCardItem[] = [
  {
    id: 'pengertian',
    number: 1,
    title: 'Pengertian Rendang',
    subtitle: 'Seni Memasak Lambat ("Marandang")',
    iconType: 'definition',
    summary:
      'Rendang adalah masakan tradisional berbahan dasar daging sapi yang dimasak perlahan dalam santan kelapa dan rempah-rempah selama berjam-jam hingga kuahnya mengering dan bumbu meresap sempurna.',
    details: [
      'Kata "Rendang" berasal dari kata "Marandang" dalam bahasa Minangkabau yang berarti memasak santan hingga kering secara perlahan.',
      'Proses memasaknya memakan waktu sekitar 4 hingga 8 jam dengan api kecil dan kesabaran tinggi.',
      'Sebelum menjadi rendang kering berwarna cokelat gelap, masakan melewati tahap Gulai (berkuah) dan Kalio (kuah kental kecokelatan).'
    ],
    funFact: 'Karena dimasak hingga kadar airnya sangat rendah dan kaya rempah antibakteri alami, rendang asli dapat bertahan berminggu-minggu pada suhu ruang tanpa pengawet buatan!',
    minangTerm: 'Marandang = Memasak perlahan hingga kering'
  },
  {
    id: 'asal-usul',
    number: 2,
    title: 'Asal-Usul Rendang',
    subtitle: 'Warisan Budaya Minangkabau, Sumatera Barat',
    iconType: 'origin',
    summary:
      'Rendang berasal dari tanah Minangkabau, Sumatera Barat, dan telah ada sejak abad ke-16 sebagai bekal perjalanan jauh para perantau Minang.',
    details: [
      'Masyarakat Minangkabau memiliki tradisi merantau menggunakan jalur sungai dan laut yang memakan waktu berbulan-bulan, sehingga membutuhkan makanan yang awet.',
      'Rendang selalu hadir pada upacara adat penting seperti kenduri pernikahan, pengangkatan penghulu (Datuk), dan hari raya.',
      'Rendang telah dinobatkan oleh CNN International sebagai salah satu makanan terenak di dunia dan ditetapkan sebagai Warisan Budaya Takbenda Indonesia.'
    ],
    funFact: 'Di Minangkabau, setiap nagari (desa adat) seperti Payakumbuh, Bukittinggi, dan Padang Panjang memiliki variasi racikan rendang yang khas!',
    minangTerm: 'Tanah Asal = Ranah Minang, Sumatera Barat'
  },
  {
    id: 'bahan-utama',
    number: 3,
    title: 'Bahan Utama Rendang',
    subtitle: 'Perpaduan Daging, Santan, dan Rempah Nusantara',
    iconType: 'ingredients',
    summary:
      'Kelezatan rendang lahir dari harmoni tiga kelompok bahan utama: potongan daging sapi pilihan, santan kelapa tua yang kental, serta bumbu cabai dan rempah aromatik.',
    details: [
      'Daging Sapi (Dagiang): Biasanya menggunakan bagian paha belakang (topside/ gandik) yang padat serat agar tidak mudah hancur saat dimasak lama.',
      'Santan Kelapa (Karambia): Menggunakan santan kental dan santan encer dari perasan kelapa tua agar menghasilkan minyak gurih alami.',
      'Bumbu & Rempah (Lado & Pemasak): Cabai merah, bawang merah, bawang putih, jahe, lengkuas, serai, daun jeruk purut, dan daun kunyit.'
    ],
    funFact: 'Untuk memasak 1 kilogram daging sapi rendang, umumnya dibutuhkan santan dari 3 hingga 4 butir kelapa tua utuh!',
    minangTerm: 'Dagiang, Karambia, Lado, dan Pemasak'
  },
  {
    id: 'ciri-khas',
    number: 4,
    title: 'Ciri Khas Rendang',
    subtitle: 'Warna Cokelat Gelap, Empuk, & Kaya Filosofi',
    iconType: 'characteristics',
    summary:
      'Rendang asli memiliki warna cokelat tua hingga kehitaman, tekstur daging yang empuk namun tidak hancur, serta balutan bumbu kental berminyak yang disebut "dedak".',
    details: [
      'Rasa gurih pedas yang seimbang dengan aroma wangi khas daun kunyit, daun jeruk, dan serai.',
      'Mengandung filosofi luhur Minangkabau: Daging melambangkan Niniak Mamak (pemimpin adat), Kelapa melambangkan Cadiak Pandai (kaum intelektual), Cabai melambangkan Alim Ulama, dan Bumbu melambangkan seluruh masyarakat.',
      'Warna gelapnya bukan karena gosong, melainkan hasil karamelisasi alami santan kelapa dan rempah yang diaduk sabar.'
    ],
    funFact: 'Bumbu remah-remah gelap yang menempel pada daging rendang sering menjadi bagian paling diburu karena rasanya sangat gurih!',
    minangTerm: 'Dedak = Bumbu rendang yang mengental & meresap'
  }
];

// LEVEL 2 — SIAPKAN BAHAN (10 Bahan Benar + 6 Bahan Pengecoh, total 30 poin)
export const LEVEL2_INGREDIENTS: IngredientItem[] = [
  {
    id: 'daging-sapi',
    name: 'Daging Sapi',
    minangName: 'Dagiang',
    isCorrect: true,
    category: 'Bahan Utama',
    roleExplanation: 'Bahan utama rendang yang dipotong tebal searah serat agar tetap utuh dan empuk saat dimasak berjam-jam.'
  },
  {
    id: 'santan',
    name: 'Santan',
    minangName: 'Karambia',
    isCorrect: true,
    category: 'Bahan Utama',
    roleExplanation: 'Santan kelapa tua memberikan cita rasa gurih, mengempukkan daging, dan mengeluarkan minyak alami saat mengental.'
  },
  {
    id: 'cabai-merah',
    name: 'Cabai Merah',
    minangName: 'Lado Merah',
    isCorrect: true,
    category: 'Bumbu Halus',
    roleExplanation: 'Memberikan rasa pedas hangat khas Minang serta warna merah kecokelatan alami pada bumbu rendang.'
  },
  {
    id: 'bawang-merah',
    name: 'Bawang Merah',
    minangName: 'Bawang Sirah',
    isCorrect: true,
    category: 'Bumbu Halus',
    roleExplanation: 'Menghasilkan rasa manis gurih alami dan memperkaya kekentalan bumbu (dedak) rendang.'
  },
  {
    id: 'bawang-putih',
    name: 'Bawang Putih',
    minangName: 'Bawang Putiah',
    isCorrect: true,
    category: 'Bumbu Halus',
    roleExplanation: 'Memberikan aroma gurih yang kuat sekaligus berfungsi sebagai pengawet alami masakan.'
  },
  {
    id: 'jahe',
    name: 'Jahe',
    minangName: 'Sipadeh',
    isCorrect: true,
    category: 'Bumbu Halus',
    roleExplanation: 'Menghilangkan bau amis pada daging sapi dan memberi sensasi hangat pada bumbu.'
  },
  {
    id: 'lengkuas',
    name: 'Lengkuas',
    minangName: 'Langkueh',
    isCorrect: true,
    category: 'Rempah Aromatik',
    roleExplanation: 'Rempah wajib yang digeprek atau dihaluskan untuk memberikan aroma harum khas masakan Nusantara.'
  },
  {
    id: 'serai',
    name: 'Serai',
    minangName: 'Sarai',
    isCorrect: true,
    category: 'Rempah Aromatik',
    roleExplanation: 'Batang serai yang dimemarkan menyumbang aroma segar sitrus dan mengurangi aroma lemak berlebih.'
  },
  {
    id: 'daun-jeruk',
    name: 'Daun Jeruk',
    minangName: 'Daun Limau',
    isCorrect: true,
    category: 'Rempah Aromatik',
    roleExplanation: 'Memberikan keharuman segar khas yang membuat aroma santan dan daging semakin menggugah selera.'
  },
  {
    id: 'daun-kunyit',
    name: 'Daun Kunyit',
    minangName: 'Daun Kunyik',
    isCorrect: true,
    category: 'Rempah Aromatik',
    roleExplanation: 'Rempah ikonik masakan Minang yang diikat simpul untuk menciptakan aroma autentik rendang Sumatera Barat.'
  },
  // BAHAN PENGECOH (DECOYS)
  {
    id: 'keju-cheddar',
    name: 'Keju Cheddar',
    isCorrect: false,
    category: 'Pengecoh',
    roleExplanation: 'Bukan bahan rendang! Rasa gurih rendang berasal dari santan kelapa tua, bukan olahan susu atau keju.'
  },
  {
    id: 'saus-tomat',
    name: 'Saus Tomat',
    isCorrect: false,
    category: 'Pengecoh',
    roleExplanation: 'Bukan bahan rendang! Warna dan rasa pedas-gurih rendang berasal dari cabai merah giling dan rempah asli.'
  },
  {
    id: 'wortel',
    name: 'Wortel',
    isCorrect: false,
    category: 'Pengecoh',
    roleExplanation: 'Bukan bahan rendang! Wortel mengandung banyak air dan biasa digunakan untuk sup, bukan untuk marandang.'
  },
  {
    id: 'cokelat-batang',
    name: 'Cokelat Batang',
    isCorrect: false,
    category: 'Pengecoh',
    roleExplanation: 'Bukan bahan rendang! Warna cokelat gelap pada rendang berasal dari karamelisasi santan dan bumbu rempah.'
  },
  {
    id: 'mayones',
    name: 'Mayones',
    isCorrect: false,
    category: 'Pengecoh',
    roleExplanation: 'Bukan bahan rendang! Mayones adalah saus salad modern dan tidak digunakan dalam kuliner tradisional Minang.'
  },
  {
    id: 'mie-instan',
    name: 'Mie Instan',
    isCorrect: false,
    category: 'Pengecoh',
    roleExplanation: 'Bukan bahan memasak rendang! Rendang dimasak dari daging sapi segar, santan, dan rempah-rempah.'
  }
];

// LEVEL 3 — SAATNYA MEMASAK (6 Tahapan Urutan Memasak Rendang, total 30 poin)
export const LEVEL3_STEPS: CookingStepItem[] = [
  {
    id: 'step-1',
    correctOrder: 1,
    title: 'Menyiapkan dan memotong daging sapi.',
    shortLabel: 'Potong Daging Sapi',
    description: 'Pilih daging sapi segar bagian paha, bersihkan, lalu potong kotak agak tebal searah serat agar tidak hancur saat dimasak lama.',
    culinaryTip: 'Jangan memotong daging terlalu tipis supaya teksturnya tetap utuh selama proses marandang.',
    potStage: 'cut-meat'
  },
  {
    id: 'step-2',
    correctOrder: 2,
    title: 'Menghaluskan bumbu.',
    shortLabel: 'Haluskan Bumbu',
    description: 'Haluskan cabai merah, bawang merah, bawang putih, dan jahe, serta memarkan serai dan lengkuas bersama daun kunyit dan daun jeruk.',
    culinaryTip: 'Bumbu yang dihaluskan dengan baik akan menyatu sempurna dengan santan menjadi dedak rendang yang lezat.',
    potStage: 'grind-spice'
  },
  {
    id: 'step-3',
    correctOrder: 3,
    title: 'Menumis bumbu hingga harum.',
    shortLabel: 'Tumis Bumbu Harum',
    description: 'Panaskan kuali, lalu tumis bumbu halus bersama serai, lengkuas, daun jeruk, dan daun kunyit hingga matang dan mengeluarkan aroma harum.',
    culinaryTip: 'Menumis bumbu hingga matang menghilangkan bau langu dari cabai dan bawang mentah.',
    potStage: 'saute-spice'
  },
  {
    id: 'step-4',
    correctOrder: 4,
    title: 'Memasukkan daging dan santan.',
    shortLabel: 'Masukkan Daging & Santan',
    description: 'Masukkan potongan daging sapi dan tuangkan santan kelapa ke dalam kuali berisi bumbu yang sudah harum.',
    culinaryTip: 'Aduk perlahan sejak santan dituangkan supaya santan menyatu dengan bumbu dan tidak pecah.',
    potStage: 'pour-coconut'
  },
  {
    id: 'step-5',
    correctOrder: 5,
    title: 'Memasak dengan api kecil sambil diaduk.',
    shortLabel: 'Masak Api Kecil & Aduk',
    description: 'Kecilkan api dan masak secara perlahan sambil terus diaduk berkala melewati fase Gulai dan Kalio agar santan tidak pecah dan bagian bawah tidak gosong.',
    culinaryTip: 'Kesabaran mengaduk di atas api kecil adalah kunci utama proses marandang khas Minangkabau.',
    potStage: 'simmer-kalio'
  },
  {
    id: 'step-6',
    correctOrder: 6,
    title: 'Memasak hingga daging empuk dan bumbu mengental serta meresap.',
    shortLabel: 'Matang, Kental & Meresap',
    description: 'Teruskan memasak hingga kuah santan menyusut habis, mengeluarkan minyak alami, daging menjadi empuk, dan bumbu mengental cokelat gelap meresap ke daging.',
    culinaryTip: 'Saat bumbu sudah berwarna cokelat tua pekat dan berminyak (dedak), Rendang autentik siap disajikan!',
    potStage: 'final-rendang'
  }
];

// LEVEL 4 — KUIS KULINER (5 Pertanyaan Pilihan Ganda @ 6 Poin = 30 Poin)
export const LEVEL4_QUIZ: QuizQuestionItem[] = [
  {
    id: 1,
    topic: 'Asal-Usul Rendang',
    question: 'Dari daerah dan suku manakah hidangan tradisional Rendang berasal?',
    options: [
      'Suku Minangkabau, Sumatera Barat',
      'Suku Bugis, Sulawesi Selatan',
      'Suku Sunda, Jawa Barat'
    ],
    correctIndex: 0,
    explanation:
      'Benar! Rendang berasal dari masyarakat Minangkabau di Sumatera Barat dan telah menjadi warisan kuliner turun-temurun sejak abad ke-16.'
  },
  {
    id: 2,
    topic: 'Bahan Utama Rendang',
    question: 'Manakah kombinasi bahan utama yang wajib digunakan untuk memasak Rendang sapi asli?',
    options: [
      'Daging sapi, susu cair, dan saus tomat',
      'Daging sapi, santan kelapa, serta cabai dan rempah-rempah',
      'Daging sapi, kecap manis, dan kaldu jamur'
    ],
    correctIndex: 1,
    explanation:
      'Tepat sekali! Tiga pilar bahan utama rendang Minangkabau adalah Dagiang (daging sapi), Karambia (santan kelapa), serta Lado dan Pemasak (cabai dan rempah-rempah).'
  },
  {
    id: 3,
    topic: 'Fungsi Santan',
    question: 'Apa fungsi utama santan kelapa tua dalam proses memasak rendang?',
    options: [
      'Hanya untuk menambah volume air agar cepat mendidih',
      'Memberikan rasa asam segar dan warna putih pada daging',
      'Memberikan rasa gurih, mengempukkan daging, dan menghasilkan minyak alami saat mengental'
    ],
    correctIndex: 2,
    explanation:
      'Hebat! Santan kelapa tua yang dimasak perlahan akan mengeluarkan minyak alami, mengempukkan serat daging, dan membentuk bumbu kental gurih (dedak).'
  },
  {
    id: 4,
    topic: 'Penggunaan Rempah-Rempah',
    question: 'Mengapa daun kunyit, daun jeruk, serai, jahe, dan lengkuas digunakan dalam memasak rendang?',
    options: [
      'Memberikan aroma harum khas, menghilangkan bau amis daging, dan menjadi pengawet alami',
      'Agar daging cepat berubah warna menjadi hijau muda',
      'Sebagai pengganti garam dan cabai merah'
    ],
    correctIndex: 0,
    explanation:
      'Luar biasa! Rempah-rempah Nusantara berfungsi menghilangkan bau amis daging, memberi keharuman khas Minang, dan memiliki sifat antimikroba alami yang membuat rendang awet.'
  },
  {
    id: 5,
    topic: 'Proses Memasak Rendang',
    question: 'Bagaimana teknik memasak rendang ("marandang") yang benar setelah daging dan santan dimasukkan?',
    options: [
      'Dimasak dengan api sangat besar tanpa diaduk selama 15 menit',
      'Dimasak dengan api kecil sambil terus diaduk perlahan hingga daging empuk dan bumbu mengental meresap',
      'Direbus sebentar lalu langsung digoreng di dalam minyak banyak'
    ],
    correctIndex: 1,
    explanation:
      'Sempurna! Memasak dengan api kecil sambil diaduk perlahan menjaga agar santan tidak pecah, bumbu tidak gosong di dasar kuali, dan rempah meresap sempurna ke dalam daging.'
  }
];

export interface PredicateInfo {
  title: 'Chef Rendang Hebat' | 'Chef Berbakat' | 'Calon Chef' | 'Terus Berlatih';
  badgeTier: 'gold' | 'silver' | 'bronze' | 'starter';
  message: string;
  accentColor: string;
}

export function getPredicateInfo(totalScore: number): PredicateInfo {
  if (totalScore >= 90) {
    return {
      title: 'Chef Rendang Hebat',
      badgeTier: 'gold',
      message:
        'Luar biasa! Kamu menguasai sejarah, bahan rempah, teknik marandang, hingga wawasan kuliner rendang Minangkabau dengan sangat sempurna!',
      accentColor: '#D97706'
    };
  }
  if (totalScore >= 75) {
    return {
      title: 'Chef Berbakat',
      badgeTier: 'silver',
      message:
        'Kerja bagus! Kamu sudah memahami sebagian besar rahasia memasak rendang yang lezat. Sedikit latihan lagi untuk mencapai nilai sempurna!',
      accentColor: '#2E7D32'
    };
  }
  if (totalScore >= 60) {
    return {
      title: 'Calon Chef',
      badgeTier: 'bronze',
      message:
        'Awal yang baik! Kamu sudah mengenal dasar-dasar rendang. Ayo mainkan kembali untuk menyempurnakan pilihan bahan dan urutan memasakmu!',
      accentColor: '#B45309'
    };
  }
  return {
    title: 'Terus Berlatih',
    badgeTier: 'starter',
    message:
      'Jangan menyerah! Memasak rendang membutuhkan kesabaran. Pelajari kembali kartu materi di Level 1 dan coba lagi petualanganmu!',
    accentColor: '#9A3412'
  };
}
