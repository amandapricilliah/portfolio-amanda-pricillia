// USER COMPLAINTS CASE STUDY — V2 · EN/ID + CLICKABLE INSIGHT NAVIGATION
import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  FileText,
  ImageIcon,
  Maximize2,
  MessageCircle,
  PenLine,
  Share2,
  TimerReset,
  UsersRound,
  X,
} from "lucide-react";
import { createPortal } from "react-dom";
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/user-complaints")({
  component: UserComplaintsCaseStudy,
});

const PROJECT_REPORT_URL =
  "https://drive.google.com/drive/folders/1-2pnlPcaP8G9x5XzvXR-T6QLabpgS34Q?usp=drive_link";


type Language = "en" | "id";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  tr: (value: string) => string;
};

const INDONESIAN_COPY: Record<string, string> = {
  "Overview": "Ringkasan",
  "Research": "Riset",
  "Synthesis": "Sintesis",
  "Product logic": "Logika produk",
  "Wireframes": "Wireframe",
  "Validation": "Validasi",
  "Reflection": "Refleksi",
  "Back to projects": "Kembali ke proyek",
  "User Complaints · Product Design Story": "User Complaints · Cerita Desain Produk",
  "Open internship report": "Buka laporan magang",
  "Choose language": "Pilih bahasa",
  "Media complaint publishing feature": "Fitur publikasi keluhan melalui media",
  "A public complaint should be easier to publish, find, discuss, and follow up.": "Keluhan publik harus lebih mudah dipublikasikan, ditemukan, didiskusikan, dan ditindaklanjuti.",
  "The feature connects public visibility, structured evidence, discussion, and personal complaint management inside the iNews website.": "Fitur ini menghubungkan visibilitas publik, bukti yang terstruktur, diskusi, dan pengelolaan keluhan pribadi di dalam situs iNews.",
  "Context": "Konteks",
  "Role": "Peran",
  "Method": "Metode",
  "Scope": "Cakupan",
  "UI/UX Designer": "Desainer UI/UX",
  "Design Thinking": "Design Thinking",
  "Research to testing": "Riset hingga pengujian",
  "Publish": "Publikasikan",
  "Tell the complete story": "Ceritakan masalah secara lengkap",
  "Discuss": "Diskusikan",
  "Keep responses together": "Satukan seluruh tanggapan",
  "Follow up": "Tindak lanjuti",
  "Make progress visible": "Tampilkan perkembangan secara jelas",
  "Case study path": "Alur studi kasus",
  "Project overview": "Ringkasan proyek",
  "A complaint should become a traceable public record—not another message lost across channels.": "Keluhan harus menjadi catatan publik yang dapat ditelusuri—bukan pesan lain yang hilang di berbagai kanal.",
  "The feature was designed for the iNews website so users could publish complaints about products, services, applications, websites, or other company-owned offerings, then interact through likes, dislikes, comments, sharing, reporting, and bookmarks.": "Fitur ini dirancang untuk situs iNews agar pengguna dapat mempublikasikan keluhan tentang produk, layanan, aplikasi, situs web, atau penawaran milik perusahaan lainnya, lalu berinteraksi melalui suka, tidak suka, komentar, berbagi, melaporkan, dan bookmark.",
  "Core proposition": "Proposisi utama",
  "Public visibility creates accountability, while structured interaction keeps the complaint useful after publication.": "Visibilitas publik menciptakan akuntabilitas, sedangkan interaksi yang terstruktur menjaga keluhan tetap berguna setelah dipublikasikan.",
  "Visibility was intended to encourage faster, more transparent follow-up.": "Visibilitas dirancang untuk mendorong tindak lanjut yang lebih cepat dan transparan.",
  "Challenge": "Tantangan",
  "Complaint channels were fragmented, responses were slow, and users had little visibility after submitting an issue.": "Kanal pengaduan tersebar, tanggapan berjalan lambat, dan pengguna hampir tidak dapat melihat perkembangan setelah mengirim masalah.",
  "Goal": "Tujuan",
  "Create a clear publication flow that supports discovery, evidence, public discussion, and follow-up.": "Membuat alur publikasi yang jelas untuk mendukung pencarian, bukti, diskusi publik, dan tindak lanjut.",
  "My responsibility": "Tanggung jawab saya",
  "Question Mark, Home, Complaint Detail, Write Complaint, and Notifications.": "Question Mark, Beranda, Detail Keluhan, Tulis Keluhan, dan Notifikasi.",
  "Team collaboration": "Kolaborasi tim",
  "A second designer handled Bookmark, Edit Profile, and the Profile Dashboard.": "Desainer kedua mengerjakan Bookmark, Edit Profil, dan Dashboard Profil.",
  "Tools": "Perangkat",
  "Figma for interface design and FigJam for flows, prioritisation, and information architecture.": "Figma digunakan untuk desain antarmuka, sedangkan FigJam digunakan untuk alur, prioritas, dan arsitektur informasi.",
  "Project boundary": "Batas proyek",
  "The internship report covered design, prototyping, and usability evaluation—not production deployment.": "Laporan magang mencakup desain, prototyping, dan evaluasi usability—bukan deployment produksi.",
  "Designed complaint journey": "Perjalanan keluhan yang dirancang",
  "Turn the issue into a complete, structured story.": "Ubah masalah menjadi cerita yang lengkap dan terstruktur.",
  "Make visible": "Tampilkan ke publik",
  "Place the complaint inside a searchable news environment.": "Tempatkan keluhan di lingkungan berita yang dapat dicari.",
  "Build discussion": "Bangun diskusi",
  "Connect support, comments, sharing, and reporting.": "Hubungkan dukungan, komentar, berbagi, dan pelaporan.",
  "Follow progress": "Pantau perkembangan",
  "Keep updates and account activity easy to revisit.": "Buat pembaruan dan aktivitas akun mudah ditinjau kembali.",
  "Empathize": "Empathize",
  "Research replaced assumptions with evidence about where complaints break down.": "Riset menggantikan asumsi dengan bukti tentang titik kegagalan proses pengaduan.",
  "The research combined a 136-response Google Forms survey, four selected interviews, and brainstorming. The survey mapped behaviour at scale, while the interviews explored interests, influences, goals, expectations, motivation, and pain points in more depth.": "Riset menggabungkan survei Google Forms dengan 136 respons, empat wawancara terpilih, dan brainstorming. Survei memetakan perilaku dalam skala luas, sedangkan wawancara menggali minat, pengaruh, tujuan, ekspektasi, motivasi, dan pain point secara lebih mendalam.",
  "survey responses": "respons survei",
  "Quantitative baseline collected through Google Forms.": "Baseline kuantitatif dikumpulkan melalui Google Forms.",
  "interested in the feature": "tertarik pada fitur",
  "121 respondents wanted a public complaint feature in online news.": "121 responden menginginkan fitur keluhan publik pada portal berita daring.",
  "wanted an open response": "menginginkan tanggapan terbuka",
  "124 respondents were more interested when the related party could reply publicly.": "124 responden lebih tertarik ketika pihak terkait dapat memberikan tanggapan secara publik.",
  "valued similar cases": "menganggap kasus serupa berguna",
  "Respondents felt helped when they could find complaints similar to their own.": "Responden merasa terbantu ketika dapat menemukan keluhan yang serupa dengan masalah mereka.",
  "Where people submit complaints": "Kanal penyampaian keluhan",
  "Social platforms led because they were public and easy to access.": "Media sosial paling banyak dipilih karena terbuka dan mudah diakses.",
  "Where people search for similar cases": "Tempat mencari kasus serupa",
  "Discovery also happened outside official service channels.": "Pencarian kasus juga terjadi di luar kanal layanan resmi.",
  "Social media": "Media sosial",
  "Customer service": "Layanan pelanggan",
  "Online news": "Portal berita daring",
  "Email": "Email",
  "Search engines": "Mesin pencari",
  "Participant profile": "Profil partisipan",
  "Broad survey, focused interviews.": "Survei luas, wawancara terfokus.",
  "The survey included readers across age groups, professions, and locations. The largest groups were people aged 18–24, Tangerang residents, and students. Four respondents were then selected for deeper interviews, producing different perspectives from students, a private employee, and a civil servant.": "Survei melibatkan pembaca dari beragam usia, profesi, dan lokasi. Kelompok terbesar adalah usia 18–24 tahun, warga Tangerang, dan mahasiswa. Empat responden kemudian dipilih untuk wawancara mendalam yang mewakili mahasiswa, pegawai swasta, dan aparatur sipil negara.",
  "aged 18–24": "berusia 18–24 tahun",
  "49 respondents": "49 responden",
  "lived in Tangerang": "tinggal di Tangerang",
  "67 respondents": "67 responden",
  "students": "mahasiswa",
  "45 respondents": "45 responden",
  "Open the complete research evidence archive": "Buka arsip bukti riset lengkap",
  "Define + Ideate": "Define + Ideate",
  "Five recurring problems became a focused product direction.": "Lima masalah berulang diterjemahkan menjadi arah produk yang terfokus.",
  "Survey and interview findings were organised into pain points, needs, expectations, and solution ideas. The goal was not to implement every suggestion, but to connect each design decision to a documented user problem.": "Temuan survei dan wawancara disusun menjadi pain point, kebutuhan, ekspektasi, dan ide solusi. Tujuannya bukan menerapkan semua saran, tetapi menghubungkan setiap keputusan desain dengan masalah pengguna yang terdokumentasi.",
  "Slow response": "Tanggapan lambat",
  "Users struggle to get a timely, useful response from the related party.": "Pengguna kesulitan memperoleh tanggapan yang cepat dan berguna dari pihak terkait.",
  "Visible progress, clear responsibility, and a response they can trust.": "Perkembangan yang terlihat, tanggung jawab yang jelas, dan tanggapan yang dapat dipercaya.",
  "Notifications, status tracking, public replies, and response-time cues.": "Notifikasi, pelacakan status, tanggapan publik, dan informasi waktu respons.",
  "Hard to find the right channel": "Sulit menemukan kanal yang tepat",
  "Official contact points are difficult to find and the same issue is scattered across platforms.": "Kontak resmi sulit ditemukan dan masalah yang sama tersebar di berbagai platform.",
  "A searchable record organised by topic, date, and related company.": "Catatan yang dapat dicari berdasarkan topik, tanggal, dan perusahaan terkait.",
  "Keyword search, date filters, classification, and complaint discovery.": "Pencarian kata kunci, filter tanggal, klasifikasi, dan penemuan keluhan.",
  "Confusing submission": "Proses pengiriman membingungkan",
  "The complaint process can feel long, unclear, and easy to abandon.": "Proses pengaduan dapat terasa panjang, tidak jelas, dan mudah ditinggalkan.",
  "A guided form that explains what information is required at each step.": "Formulir terpandu yang menjelaskan informasi yang dibutuhkan pada setiap langkah.",
  "Step-by-step writing flow, autofill, image upload, and clearer field grouping.": "Alur penulisan bertahap, autofill, unggah gambar, dan pengelompokan field yang lebih jelas.",
  "Poor digital access": "Akses digital kurang baik",
  "Existing complaint pages are not always user-friendly, especially on smaller screens.": "Halaman pengaduan yang ada belum selalu ramah pengguna, terutama pada layar kecil.",
  "Readable, responsive access that works within a familiar news platform.": "Akses yang mudah dibaca, responsif, dan berada dalam platform berita yang familiar.",
  "Mobile-responsive layouts, familiar portal patterns, and progressive disclosure.": "Layout responsif mobile, pola portal yang familiar, dan progressive disclosure.",
  "Fear of false claims": "Kekhawatiran terhadap klaim palsu",
  "Users worry that public complaints can become misleading, unverifiable, or abusive.": "Pengguna khawatir keluhan publik dapat menyesatkan, sulit diverifikasi, atau disalahgunakan.",
  "Safety controls without removing the ability to speak publicly.": "Kontrol keamanan tanpa menghilangkan kemampuan untuk menyampaikan masalah secara publik.",
  "Reporting, moderation, identity options, evidence upload, and future verification support.": "Pelaporan, moderasi, pilihan identitas, unggah bukti, dan dukungan verifikasi di masa mendatang.",
  "Select insight": "Pilih insight",
  "View insight": "Lihat insight",
  "Active insight": "Insight aktif",
  "User need": "Kebutuhan pengguna",
  "Design response": "Respons desain",
  "Prioritisation": "Prioritas",
  "One feature system, three levels of commitment.": "Satu sistem fitur dengan tiga tingkat komitmen.",
  "The original matrix compared priority with feasibility. The web version below keeps the decision readable without reproducing a dense board of sticky notes.": "Matriks asli membandingkan prioritas dengan kelayakan. Versi web di bawah mempertahankan keputusan agar mudah dibaca tanpa menyalin papan sticky note yang padat.",
  "Build now": "Bangun sekarang",
  "High value and feasible within the project scope.": "Bernilai tinggi dan memungkinkan dikerjakan dalam cakupan proyek.",
  "Shape carefully": "Rancang dengan cermat",
  "Important ideas that needed additional logic or design definition.": "Ide penting yang membutuhkan logika atau definisi desain tambahan.",
  "Future system layer": "Lapisan sistem masa depan",
  "Useful directions deferred because they required operational or technical support.": "Arah yang berguna tetapi ditunda karena membutuhkan dukungan operasional atau teknis.",
  "Like and unlike": "Suka dan tidak suka",
  "Automatic notifications": "Notifikasi otomatis",
  "Image evidence upload": "Unggah bukti gambar",
  "Anonymous or public identity": "Identitas anonim atau publik",
  "Personal dashboard": "Dashboard pribadi",
  "Bookmark": "Bookmark",
  "Comments": "Komentar",
  "Keyword and date search": "Pencarian kata kunci dan tanggal",
  "Guided complaint wizard": "Panduan pengaduan bertahap",
  "Automatic classification": "Klasifikasi otomatis",
  "Autofill": "Autofill",
  "Related-complaint forum": "Forum keluhan terkait",
  "Complaint tracking": "Pelacakan keluhan",
  "Verified company accounts": "Akun perusahaan terverifikasi",
  "Response-time measurement": "Pengukuran waktu respons",
  "Pinned official replies": "Tanggapan resmi yang disematkan",
  "FAQ and rating": "FAQ dan rating",
  "Hoax detection": "Deteksi hoaks",
  "Review the original matrix and deferred ideas": "Tinjau matriks asli dan ide yang ditunda",
  "Prototype structure": "Struktur prototipe",
  "The product was organised before screens were polished.": "Produk disusun sebelum tampilan layar dipoles.",
  "Eleven task flows mapped specific user actions, while the information architecture grouped the experience into discovery, complaint detail, publishing, and account management.": "Sebelas task flow memetakan tindakan pengguna secara spesifik, sedangkan arsitektur informasi mengelompokkan pengalaman menjadi pencarian, detail keluhan, publikasi, dan pengelolaan akun.",
  "Four connected journeys": "Empat perjalanan yang saling terhubung",
  "Discover complaints": "Temukan keluhan",
  "Find a relevant case before creating a new one.": "Temukan kasus yang relevan sebelum membuat keluhan baru.",
  "Open home": "Buka beranda",
  "Choose topic or date": "Pilih topik atau tanggal",
  "Search keywords": "Cari kata kunci",
  "Open complaint detail": "Buka detail keluhan",
  "Users can compare similar cases and avoid repeating information.": "Pengguna dapat membandingkan kasus serupa dan menghindari pengulangan informasi.",
  "Publish a complaint": "Publikasikan keluhan",
  "Turn a problem into a structured public submission.": "Ubah masalah menjadi pengajuan publik yang terstruktur.",
  "Sign in": "Masuk",
  "Open write complaint": "Buka halaman tulis keluhan",
  "Complete required fields": "Lengkapi field wajib",
  "Add evidence": "Tambahkan bukti",
  "The complaint becomes visible, searchable, and ready for interaction.": "Keluhan menjadi terlihat, dapat dicari, dan siap untuk direspons.",
  "Engage and follow up": "Berinteraksi dan tindak lanjuti",
  "Keep discussion and updates connected to the original issue.": "Jaga diskusi dan pembaruan tetap terhubung dengan masalah awal.",
  "Open detail": "Buka detail",
  "Like or unlike": "Suka atau tidak suka",
  "Comment": "Komentar",
  "Share": "Bagikan",
  "Report or bookmark": "Laporkan atau bookmark",
  "Public interaction stays attached to one complaint record.": "Interaksi publik tetap terhubung dengan satu catatan keluhan.",
  "Manage personal activity": "Kelola aktivitas pribadi",
  "Give users control after publication.": "Berikan kontrol kepada pengguna setelah publikasi.",
  "Open dashboard": "Buka dashboard",
  "Review own posts": "Tinjau posting sendiri",
  "Edit or delete": "Edit atau hapus",
  "Check notifications": "Periksa notifikasi",
  "Update profile": "Perbarui profil",
  "Published complaints and account activity remain manageable.": "Keluhan yang dipublikasikan dan aktivitas akun tetap dapat dikelola.",
  "Selected task flow": "Task flow terpilih",
  "Open original diagram": "Buka diagram asli",
  "Outcome": "Hasil",
  "Information architecture": "Arsitektur informasi",
  "Four branches keep the experience understandable.": "Empat cabang menjaga pengalaman tetap mudah dipahami.",
  "Instead of displaying the full architecture screenshot, this interactive map exposes one branch at a time. The complete original remains available as supporting evidence.": "Alih-alih menampilkan screenshot arsitektur secara penuh, peta interaktif ini memperlihatkan satu cabang pada satu waktu. Versi asli lengkap tetap tersedia sebagai bukti pendukung.",
  "Open structure archive": "Buka arsip struktur",
  "Discover": "Temukan",
  "Home": "Beranda",
  "Latest complaints": "Keluhan terbaru",
  "Trending topics": "Topik tren",
  "Top viral": "Paling viral",
  "Search": "Pencarian",
  "Date and topic filters": "Filter tanggal dan topik",
  "Complaint detail": "Detail keluhan",
  "Article content": "Isi artikel",
  "Like / unlike": "Suka / tidak suka",
  "Report": "Laporkan",
  "Account": "Akun",
  "Own complaints": "Keluhan sendiri",
  "Notifications": "Notifikasi",
  "Profile": "Profil",
  "Help guide": "Panduan bantuan",
  "Write complaint": "Tulis keluhan",
  "Identity choice": "Pilihan identitas",
  "Category": "Kategori",
  "Company": "Perusahaan",
  "Chronology": "Kronologi",
  "Evidence upload": "Unggah bukti",
  "Wireframe system": "Sistem wireframe",
  "Five key screens explain the product without turning the page into an image gallery.": "Lima layar utama menjelaskan produk tanpa mengubah halaman menjadi galeri gambar.",
  "The supplied asset pack contains the wireframe evidence for Home, Complaint Detail, More Options, Comments, and Write Complaint. This section keeps one screen in focus and explains the design intent beside it.": "Paket aset memuat bukti wireframe untuk Beranda, Detail Keluhan, Opsi Lainnya, Komentar, dan Tulis Keluhan. Bagian ini menampilkan satu layar sebagai fokus dan menjelaskan tujuan desain di sampingnya.",
  "More options": "Opsi lainnya",
  "Selected screen": "Layar terpilih",
  "Balances complaint discovery with familiar news-portal content.": "Menyeimbangkan pencarian keluhan dengan konten portal berita yang familiar.",
  "Multiple discovery paths": "Beberapa jalur pencarian",
  "Visible topic and date controls": "Kontrol topik dan tanggal yang terlihat",
  "Clear route to write a complaint": "Jalur yang jelas untuk menulis keluhan",
  "Keeps evidence, context, and public interaction in one reading flow.": "Menjaga bukti, konteks, dan interaksi publik dalam satu alur membaca.",
  "Article-first hierarchy": "Hierarki yang mengutamakan artikel",
  "Action group for support and sharing": "Kelompok aksi untuk dukungan dan berbagi",
  "Related discussion remains visible": "Diskusi terkait tetap terlihat",
  "Separates secondary or sensitive actions from the primary reading experience.": "Memisahkan tindakan sekunder atau sensitif dari pengalaman membaca utama.",
  "Report is available but not dominant": "Fitur laporan tersedia tetapi tidak dominan",
  "Progressive disclosure": "Progressive disclosure",
  "Less visual noise": "Lebih sedikit gangguan visual",
  "Supports discussion while preserving the original complaint as the central record.": "Mendukung diskusi dengan tetap mempertahankan keluhan asli sebagai catatan utama.",
  "Threaded response hierarchy": "Hierarki tanggapan bertingkat",
  "Clear author distinction": "Perbedaan penulis yang jelas",
  "Moderation-ready structure": "Struktur yang siap dimoderasi",
  "Guides users through the information required to publish a credible complaint.": "Memandu pengguna melalui informasi yang dibutuhkan untuk mempublikasikan keluhan yang kredibel.",
  "Grouped form fields": "Field formulir yang dikelompokkan",
  "Evidence area": "Area bukti",
  "Publication controls and review": "Kontrol publikasi dan peninjauan",
  "Usability testing": "Usability testing",
  "Most tasks felt very easy; the writing flow exposed the clearest product risk.": "Sebagian besar tugas terasa sangat mudah; alur penulisan menunjukkan risiko produk yang paling jelas.",
  "The report tested six prototype tasks with participants aged 17–25 who had complaint experience, matched the defined personas, used Android or iPhone devices, and represented different Indonesian regions. SEQ used a 1–6 scale, while severity used 1 as catastrophic and 4 as low priority.": "Laporan menguji enam tugas prototipe kepada partisipan berusia 17–25 tahun yang memiliki pengalaman mengajukan keluhan, sesuai dengan persona, menggunakan perangkat Android atau iPhone, dan berasal dari beberapa wilayah Indonesia. SEQ menggunakan skala 1–6, sedangkan severity menggunakan nilai 1 untuk masalah katastrofik dan 4 untuk prioritas rendah.",
  "average SEQ": "rata-rata SEQ",
  "Across the six detailed task results": "Berdasarkan enam hasil tugas terperinci",
  "tasks scored SEQ 6": "tugas memperoleh SEQ 6",
  "Very easy for the participant": "Sangat mudah bagi partisipan",
  "priority issues": "masalah prioritas",
  "Mobile sharing and complaint form resilience": "Berbagi melalui mobile dan ketahanan formulir keluhan",
  "Test results": "Hasil pengujian",
  "SEQ": "SEQ",
  "Severity": "Severity",
  "Mobile sharing": "Berbagi melalui mobile",
  "The auto-generated Instagram Story template worked better on desktop than mobile.": "Template Instagram Story otomatis bekerja lebih baik di desktop dibandingkan mobile.",
  "Create a mobile-specific composition and test the export path on actual devices.": "Buat komposisi khusus mobile dan uji alur ekspor pada perangkat nyata.",
  "Draft protection": "Perlindungan draf",
  "Leaving the write page could erase completed fields.": "Meninggalkan halaman penulisan dapat menghapus field yang telah diisi.",
  "Autosave a local or account-based draft and warn users before destructive navigation.": "Simpan draf secara otomatis di perangkat atau akun dan berikan peringatan sebelum navigasi yang menghapus data.",
  "Form clarity": "Kejelasan formulir",
  "The complaint form felt confusing to the participant.": "Formulir keluhan terasa membingungkan bagi partisipan.",
  "Reduce cognitive load through field grouping, progressive steps, examples, and visible completion status.": "Kurangi beban kognitif melalui pengelompokan field, langkah bertahap, contoh, dan status penyelesaian yang terlihat.",
  "Finding": "Temuan",
  "Recommended iteration": "Iterasi yang disarankan",
  "06 · Reflection": "06 · Refleksi",
  "The strongest design decision was turning a complaint into a connected lifecycle.": "Keputusan desain terkuat adalah mengubah keluhan menjadi siklus yang saling terhubung.",
  "The project connected research, prioritisation, information architecture, writing, public interaction, personal management, and usability evaluation. It also showed that adding more features is not enough: the submission flow must protect user effort, and media-sharing behaviour must be tested on the device where it will actually happen.": "Proyek ini menghubungkan riset, prioritas, arsitektur informasi, penulisan, interaksi publik, pengelolaan pribadi, dan evaluasi usability. Proyek ini juga menunjukkan bahwa menambahkan banyak fitur saja tidak cukup: alur pengiriman harus melindungi usaha pengguna, dan perilaku berbagi media harus diuji pada perangkat yang benar-benar digunakan.",
  "Evidence before interface": "Bukti sebelum antarmuka",
  "Survey and interviews established the real behaviour and expectations behind complaint publishing.": "Survei dan wawancara menjelaskan perilaku serta ekspektasi nyata di balik publikasi keluhan.",
  "Scope before decoration": "Cakupan sebelum dekorasi",
  "Prioritisation separated feasible, important features from ideas that needed operational support.": "Prioritas memisahkan fitur penting yang layak dikerjakan dari ide yang membutuhkan dukungan operasional.",
  "Testing before confidence": "Pengujian sebelum keyakinan",
  "The form and mobile-sharing issues were visible only after participants completed realistic tasks.": "Masalah formulir dan berbagi melalui mobile baru terlihat setelah partisipan menyelesaikan tugas yang realistis.",
  "Click outside or press Esc to close": "Klik di luar atau tekan Esc untuk menutup",
  "Project evidence": "Bukti proyek",
  "Close evidence preview": "Tutup pratinjau bukti",
  "Previous": "Sebelumnya",
  "Next": "Berikutnya",
  "evidence": "bukti",
  "wireframe": "wireframe",
  "Add the project image here": "Tambahkan gambar proyek di sini",
  "iNews · Complaint publishing feature": "iNews · Fitur publikasi keluhan",
  "User": "User",
  "Complaints.": "Complaints.",
  "A public complaint experience that turns scattered issues into structured, searchable, and discussable records inside a trusted news platform.": "Pengalaman pengaduan publik yang mengubah masalah tersebar menjadi catatan yang terstruktur, dapat dicari, dan dapat didiskusikan di dalam platform berita tepercaya.",
  "Selected task": "Tugas terpilih",
  "The welcome page and discovery content were completed without a meaningful obstacle.": "Halaman pembuka dan konten pencarian dapat diselesaikan tanpa hambatan berarti.",
  "Core actions worked, but the auto-generated Instagram Story experience needed a mobile-specific treatment.": "Aksi utama dapat digunakan, tetapi pengalaman Instagram Story otomatis membutuhkan perlakuan khusus untuk mobile.",
  "The form felt confusing, and leaving the page could erase entered data because no draft autosave was available.": "Formulir terasa membingungkan, dan meninggalkan halaman dapat menghapus data yang telah diisi karena belum tersedia autosave draf.",
  "Own complaint": "Keluhan sendiri",
  "Users could find and manage their published complaint through the dashboard or public list.": "Pengguna dapat menemukan dan mengelola keluhan yang telah dipublikasikan melalui dashboard atau daftar publik.",
  "Notification access and meaning were understood without difficulty.": "Akses dan fungsi notifikasi dapat dipahami tanpa kesulitan.",
  "The Question Mark page made guidance easy to find and understand.": "Halaman Question Mark membuat panduan mudah ditemukan dan dipahami.",
};

function translateCopy(value: string, language: Language): string {
  return language === "id" ? INDONESIAN_COPY[value] ?? value : value;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: "en" as Language,
      setLanguage: () => undefined,
      tr: (value: string) => value,
    };
  }
  return context;
}

type GalleryImage = {
  src: string;
  alt: string;
  label: string;
};

type LightboxState = {
  images: GalleryImage[];
  index: number;
} | null;

type Direction = "prev" | "next";

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "research", label: "Research" },
  { id: "synthesis", label: "Synthesis" },
  { id: "logic", label: "Product logic" },
  { id: "wireframe", label: "Wireframes" },
  { id: "validation", label: "Validation" },
  { id: "reflection", label: "Reflection" },
] as const;

const HERO_IMAGE: GalleryImage = {
  src: "/images/user-complaints/user-complaints-cover.png",
  alt: "User Complaints feature cover",
  label: "User Complaints cover",
};

const RESEARCH_ARCHIVE: GalleryImage[] = [
  {
    src: "/images/user-complaints/research/survey-form.png",
    alt: "Google Form used in User Complaints research",
    label: "Survey form",
  },
  {
    src: "/images/user-complaints/research/survey-result-summary.png",
    alt: "Detailed survey result summary",
    label: "Survey result summary",
  },
  {
    src: "/images/user-complaints/research/strong-points.png",
    alt: "Strong points derived from research",
    label: "Strong points",
  },
  {
    src: "/images/user-complaints/research/user-personas.png",
    alt: "Interview-based User Complaints personas",
    label: "Interview personas",
  },
  {
    src: "/images/user-complaints/research/user-insights.png",
    alt: "Pain points, needs, expectations, and solution ideas",
    label: "User insights",
  },
];

const DEFINE_ARCHIVE: GalleryImage[] = [
  {
    src: "/images/user-complaints/define/prioritization-matrix.png",
    alt: "User Complaints prioritization matrix",
    label: "Prioritization matrix",
  },
  {
    src: "/images/user-complaints/define/not-implemented-features.png",
    alt: "Deferred User Complaints feature ideas",
    label: "Deferred feature ideas",
  },
];

const TASK_FLOW_IMAGES: GalleryImage[] = [
  ["sign-in.png", "Sign in"],
  ["dashboard.png", "Dashboard"],
  ["add-profile.png", "Add profile"],
  ["topic-filter.png", "Topic filter"],
  ["search-index-filter.png", "Search index"],
  ["post-detail.png", "Complaint detail"],
  ["comment-detail.png", "Comment detail"],
  ["write-complaint.png", "Write complaint"],
  ["bookmark.png", "Bookmark"],
  ["notification-popup.png", "Notification"],
  ["profile-page.png", "Profile"],
].map(([file, label], index) => ({
  src: `/images/user-complaints/task-flow/${file}`,
  alt: `${label} task flow`,
  label: `${String(index + 1).padStart(2, "0")} · ${label}`,
}));

const STRUCTURE_ARCHIVE: GalleryImage[] = [
  {
    src: "/images/user-complaints/structure/information-architecture.png",
    alt: "User Complaints information architecture",
    label: "Information architecture",
  },
  {
    src: "/images/user-complaints/exploration/references.png",
    alt: "Visual references collected for User Complaints",
    label: "Design references",
  },
  {
    src: "/images/user-complaints/exploration/ux-sketches.png",
    alt: "Early User Complaints UX sketches",
    label: "UX sketches",
  },
];

const WIREFRAME_IMAGES: GalleryImage[] = [
  {
    src: "/images/user-complaints/wireframe/home.png",
    alt: "User Complaints home wireframe",
    label: "Home",
  },
  {
    src: "/images/user-complaints/wireframe/complaint-detail.png",
    alt: "Complaint detail wireframe",
    label: "Complaint detail",
  },
  {
    src: "/images/user-complaints/wireframe/more-options.png",
    alt: "More options wireframe",
    label: "More options",
  },
  {
    src: "/images/user-complaints/wireframe/comments.png",
    alt: "Comments wireframe",
    label: "Comments",
  },
  {
    src: "/images/user-complaints/wireframe/write-complaint.png",
    alt: "Write complaint wireframe",
    label: "Write complaint",
  },
];

const SURVEY_METRICS = [
  {
    value: "136",
    label: "survey responses",
    note: "Quantitative baseline collected through Google Forms.",
  },
  {
    value: "89%",
    label: "interested in the feature",
    note: "121 respondents wanted a public complaint feature in online news.",
  },
  {
    value: "91.2%",
    label: "wanted an open response",
    note: "124 respondents were more interested when the related party could reply publicly.",
  },
  {
    value: "78.7%",
    label: "valued similar cases",
    note: "Respondents felt helped when they could find complaints similar to their own.",
  },
];

const COMPLAINT_CHANNELS = [
  { label: "Social media", value: 55.9 },
  { label: "Customer service", value: 40.4 },
  { label: "Online news", value: 13.2 },
  { label: "Email", value: 11.8 },
];

const DISCOVERY_CHANNELS = [
  { label: "Social media", value: 66.9 },
  { label: "Search engines", value: 41.9 },
  { label: "Online news", value: 21.3 },
];

const PAIN_POINTS = [
  {
    id: "response",
    label: "Slow response",
    statement: "Users struggle to get a timely, useful response from the related party.",
    need: "Visible progress, clear responsibility, and a response they can trust.",
    response: "Notifications, status tracking, public replies, and response-time cues.",
  },
  {
    id: "channel",
    label: "Hard to find the right channel",
    statement: "Official contact points are difficult to find and the same issue is scattered across platforms.",
    need: "A searchable record organised by topic, date, and related company.",
    response: "Keyword search, date filters, classification, and complaint discovery.",
  },
  {
    id: "submission",
    label: "Confusing submission",
    statement: "The complaint process can feel long, unclear, and easy to abandon.",
    need: "A guided form that explains what information is required at each step.",
    response: "Step-by-step writing flow, autofill, image upload, and clearer field grouping.",
  },
  {
    id: "access",
    label: "Poor digital access",
    statement: "Existing complaint pages are not always user-friendly, especially on smaller screens.",
    need: "Readable, responsive access that works within a familiar news platform.",
    response: "Mobile-responsive layouts, familiar portal patterns, and progressive disclosure.",
  },
  {
    id: "trust",
    label: "Fear of false claims",
    statement: "Users worry that public complaints can become misleading, unverifiable, or abusive.",
    need: "Safety controls without removing the ability to speak publicly.",
    response: "Reporting, moderation, identity options, evidence upload, and future verification support.",
  },
];

const PRIORITY_GROUPS = [
  {
    label: "Build now",
    description: "High value and feasible within the project scope.",
    items: [
      "Like and unlike",
      "Automatic notifications",
      "Image evidence upload",
      "Anonymous or public identity",
      "Personal dashboard",
      "Bookmark",
      "Comments",
      "Keyword and date search",
    ],
  },
  {
    label: "Shape carefully",
    description: "Important ideas that needed additional logic or design definition.",
    items: [
      "Guided complaint wizard",
      "Automatic classification",
      "Autofill",
      "Related-complaint forum",
    ],
  },
  {
    label: "Future system layer",
    description: "Useful directions deferred because they required operational or technical support.",
    items: [
      "Complaint tracking",
      "Verified company accounts",
      "Response-time measurement",
      "Pinned official replies",
      "FAQ and rating",
      "Hoax detection",
    ],
  },
];

const FLOW_STORIES = [
  {
    title: "Discover complaints",
    caption: "Find a relevant case before creating a new one.",
    steps: ["Open home", "Choose topic or date", "Search keywords", "Open complaint detail"],
    outcome: "Users can compare similar cases and avoid repeating information.",
    imageIndex: 3,
  },
  {
    title: "Publish a complaint",
    caption: "Turn a problem into a structured public submission.",
    steps: ["Sign in", "Open write complaint", "Complete required fields", "Add evidence", "Publish"],
    outcome: "The complaint becomes visible, searchable, and ready for interaction.",
    imageIndex: 7,
  },
  {
    title: "Engage and follow up",
    caption: "Keep discussion and updates connected to the original issue.",
    steps: ["Open detail", "Like or unlike", "Comment", "Share", "Report or bookmark"],
    outcome: "Public interaction stays attached to one complaint record.",
    imageIndex: 5,
  },
  {
    title: "Manage personal activity",
    caption: "Give users control after publication.",
    steps: ["Open dashboard", "Review own posts", "Edit or delete", "Check notifications", "Update profile"],
    outcome: "Published complaints and account activity remain manageable.",
    imageIndex: 1,
  },
];

const ARCHITECTURE_BRANCHES = [
  {
    label: "Discover",
    items: ["Home", "Latest complaints", "Trending topics", "Top viral", "Search", "Date and topic filters"],
  },
  {
    label: "Complaint detail",
    items: ["Article content", "Like / unlike", "Comments", "Share", "Bookmark", "Report"],
  },
  {
    label: "Publish",
    items: ["Write complaint", "Identity choice", "Category", "Company", "Chronology", "Evidence upload"],
  },
  {
    label: "Account",
    items: ["Dashboard", "Own complaints", "Edit / delete", "Notifications", "Profile", "Help guide"],
  },
];

const WIREFRAME_DETAILS = [
  {
    title: "Home",
    purpose: "Balances complaint discovery with familiar news-portal content.",
    decisions: ["Multiple discovery paths", "Visible topic and date controls", "Clear route to write a complaint"],
  },
  {
    title: "Complaint detail",
    purpose: "Keeps evidence, context, and public interaction in one reading flow.",
    decisions: ["Article-first hierarchy", "Action group for support and sharing", "Related discussion remains visible"],
  },
  {
    title: "More options",
    purpose: "Separates secondary or sensitive actions from the primary reading experience.",
    decisions: ["Report is available but not dominant", "Progressive disclosure", "Less visual noise"],
  },
  {
    title: "Comments",
    purpose: "Supports discussion while preserving the original complaint as the central record.",
    decisions: ["Threaded response hierarchy", "Clear author distinction", "Moderation-ready structure"],
  },
  {
    title: "Write complaint",
    purpose: "Guides users through the information required to publish a credible complaint.",
    decisions: ["Grouped form fields", "Evidence area", "Publication controls and review"],
  },
];

const TEST_RESULTS = [
  {
    task: "Home",
    seq: 6,
    severity: 4,
    summary: "The welcome page and discovery content were completed without a meaningful obstacle.",
  },
  {
    task: "Complaint detail",
    seq: 6,
    severity: 2,
    summary: "Core actions worked, but the auto-generated Instagram Story experience needed a mobile-specific treatment.",
  },
  {
    task: "Write complaint",
    seq: 3,
    severity: 2,
    summary: "The form felt confusing, and leaving the page could erase entered data because no draft autosave was available.",
  },
  {
    task: "Own complaint",
    seq: 6,
    severity: 4,
    summary: "Users could find and manage their published complaint through the dashboard or public list.",
  },
  {
    task: "Notifications",
    seq: 6,
    severity: 4,
    summary: "Notification access and meaning were understood without difficulty.",
  },
  {
    task: "Help guide",
    seq: 6,
    severity: 4,
    summary: "The Question Mark page made guidance easy to find and understand.",
  },
];

function UserComplaintsCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();

  const [activeSection, setActiveSection] = useState("overview");
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [painIndex, setPainIndex] = useState(0);
  const [flowIndex, setFlowIndex] = useState(0);
  const [architectureIndex, setArchitectureIndex] = useState(0);
  const [wireframeIndex, setWireframeIndex] = useState(0);
  const [testIndex, setTestIndex] = useState(0);
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    return window.localStorage.getItem("user-complaints-language") === "id" ? "id" : "en";
  });

  const tr = (value: string) => translateCopy(value, language);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.25,
  });

  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -90]);
  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 0.96]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.2]);

  const averageSeq = useMemo(
    () => (TEST_RESULTS.reduce((total, item) => total + item.seq, 0) / TEST_RESULTS.length).toFixed(1),
    [],
  );

  const openGallery = (images: GalleryImage[], index = 0) => {
    setLightbox({ images, index });
  };

  const moveLightbox = (direction: Direction) => {
    setLightbox((current) => {
      if (!current) return current;
      const offset = direction === "next" ? 1 : -1;
      return {
        ...current,
        index: (current.index + offset + current.images.length) % current.images.length,
      };
    });
  };

  const moveWireframe = (direction: Direction) => {
    const offset = direction === "next" ? 1 : -1;
    setWireframeIndex((current) =>
      (current + offset + WIREFRAME_IMAGES.length) % WIREFRAME_IMAGES.length,
    );
  };

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      {
        rootMargin: "-26% 0px -58% 0px",
        threshold: [0.06, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user-complaints-language", language);
      document.documentElement.lang = language;
    }
  }, [language]);

  useEffect(() => {
    if (!lightbox) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowLeft") moveLightbox("prev");
      if (event.key === "ArrowRight") moveLightbox("next");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightbox]);

  const lightboxPortal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {lightbox && (
              <motion.div
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/[0.88] p-4 backdrop-blur-xl md:p-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) setLightbox(null);
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="User Complaints evidence preview"
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                  transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative flex max-h-[92vh] w-full max-w-[1400px] flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.15] bg-[#070a10] shadow-[0_30px_120px_rgba(0,0,0,0.9)]"
                >
                  <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-7">
                    <div className="min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.3em] text-blue-200/50">{tr("Project evidence")}</p>
                      <p className="mt-1 truncate text-sm text-white/75 md:text-base">
                        {tr(lightbox.images[lightbox.index].label)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLightbox(null)}
                      aria-label={tr("Close evidence preview")}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-white/60 transition hover:rotate-90 hover:text-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="relative flex min-h-0 flex-1 items-center justify-center bg-black/[0.45] p-3 md:p-6">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightbox.images[lightbox.index].src}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -14 }}
                        transition={{ duration: 0.28 }}
                        className="flex h-full w-full items-center justify-center"
                      >
                        <ImageWithFallback
                          image={lightbox.images[lightbox.index]}
                          className="max-h-[72vh] w-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>

                    {lightbox.images.length > 1 && (
                      <>
                        <GalleryArrow direction="prev" onClick={() => moveLightbox("prev")} />
                        <GalleryArrow direction="next" onClick={() => moveLightbox("next")} />
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 md:px-7">
                    <span className="text-xs text-white/[0.35]">{tr("Click outside or press Esc to close")}</span>
                    <span className="font-display text-lg italic text-blue-100/[0.65]">
                      {String(lightbox.index + 1).padStart(2, "0")}
                      <span className="mx-1.5 text-white/20">/</span>
                      {String(lightbox.images.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )
      : null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr }}>
    <div
      ref={pageRef}
      className={`relative overflow-clip bg-bg text-text-primary ${
        isDark
          ? ""
          : "bg-white text-slate-950 [&_.text-muted]:text-slate-500 [&_.text-text-secondary]:text-slate-700 [&_.text-text-primary]:text-slate-950 [&_.border-stroke]:border-slate-200 [&_.bg-surface]:bg-white [&_.bg-surface-elevated]:bg-slate-50"
      }`}
    >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600"
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border px-3 py-2 backdrop-blur-2xl md:px-4 ${
            isDark
              ? "border-white/10 bg-black/[0.58] shadow-[0_16px_58px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "border-white/75 bg-white/[0.62] shadow-[0_16px_45px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]"
          }`}
        >
          <a
            href="/#work"
            className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs text-muted transition hover:bg-surface-elevated hover:text-text-primary"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {tr("Back to projects")}
          </a>

          <span className="hidden text-[9px] uppercase tracking-[0.3em] text-muted sm:block">
            {tr("User Complaints · Product Design Story")}
          </span>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center rounded-full border p-1 backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-white/70 bg-white/[0.48]"
              }`}
              aria-label={tr("Choose language")}
            >
              {(["en", "id"] as Language[]).map((option) => {
                const isActive = language === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setLanguage(option)}
                    aria-pressed={isActive}
                    className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition ${
                      isActive
                        ? isDark
                          ? "bg-white text-black"
                          : "bg-slate-950 text-white"
                        : isDark
                          ? "text-white/45 hover:text-white"
                          : "text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            <ThemeToggle />
            <a
              href={PROJECT_REPORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-xs transition sm:inline-flex ${
                isDark
                  ? "border-blue-400/30 bg-blue-500/10 text-blue-100/75 hover:border-blue-400/[0.55] hover:text-white"
                  : "border-slate-200 bg-white/70 text-slate-700 hover:border-blue-700 hover:text-blue-900"
              }`}
            >
              {tr("Open internship report")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </header>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-20 pt-32 md:px-10 lg:px-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: isDark
              ? "radial-gradient(circle at 74% 38%, rgba(37,99,235,0.20), transparent 32%), radial-gradient(circle at 20% 76%, rgba(14,165,233,0.09), transparent 34%)"
              : "radial-gradient(circle at 74% 38%, rgba(37,99,235,0.08), transparent 31%), radial-gradient(circle at 20% 76%, rgba(14,165,233,0.05), transparent 32%)",
          }}
        />

        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: heroY, scale: heroScale, opacity: heroOpacity }
          }
          className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="relative z-10">
            <Reveal>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-9 bg-blue-600/[0.55]" />
                <span className={`text-[9px] uppercase tracking-[0.34em] ${isDark ? "text-blue-300/70" : "text-blue-900"}`}>
                  {tr("iNews · Complaint publishing feature")}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.07}>
              <h1 className="max-w-3xl text-[clamp(3rem,6.3vw,5.8rem)] leading-[0.9] tracking-[-0.06em] text-text-primary">
                {tr("User")}
                <span className={`block font-display italic ${isDark ? "text-blue-200" : "text-blue-900"}`}>
                  {tr("Complaints.")}
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-6 max-w-xl text-sm leading-7 text-text-secondary md:text-base md:leading-8">
                {tr("A public complaint experience that turns scattered issues into structured, searchable, and discussable records inside a trusted news platform.")}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-9 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 border-y border-stroke py-6 sm:grid-cols-4">
                {[
                  ["Context", "iNews TV"],
                  ["Role", "UI/UX Designer"],
                  ["Method", "Design Thinking"],
                  ["Scope", "Research to testing"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-[9px] uppercase tracking-[0.23em] text-muted">{tr(label)}</p>
                    <p className="mt-2 text-sm text-text-secondary">{tr(value)}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="relative">
            <div className={`absolute -inset-10 rounded-full blur-[110px] ${isDark ? "bg-blue-500/[0.14]" : "bg-slate-200/70"}`} />
            <motion.button
              type="button"
              onClick={() => openGallery([HERO_IMAGE])}
              whileHover={prefersReducedMotion ? undefined : { y: -7, rotate: -0.5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[2.2rem] border p-3 text-left backdrop-blur-xl md:p-4 ${
                isDark
                  ? "border-white/10 bg-black/[0.42] shadow-[0_38px_110px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "border-white/80 bg-white/[0.76] shadow-[0_30px_80px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.98)]"
              }`}
            >
              <div className="relative overflow-hidden rounded-[1.6rem] bg-black/5">
                <ImageWithFallback
                  image={HERO_IMAGE}
                  priority
                  className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                />
                <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] bg-black/[0.45] text-white/75 backdrop-blur-md">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>
            </motion.button>

            <FloatingSignal
              icon={PenLine}
              label="Publish"
              value="Tell the complete story"
              delay={0}
              className="-left-3 top-[13%]"
            />
            <FloatingSignal
              icon={MessageCircle}
              label="Discuss"
              value="Keep responses together"
              delay={0.9}
              className="-right-4 top-[36%]"
            />
            <FloatingSignal
              icon={Bell}
              label="Follow up"
              value="Make progress visible"
              delay={1.6}
              className="bottom-[8%] left-[8%]"
            />
          </Reveal>
        </motion.div>
      </section>

      <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="hidden border-r border-stroke px-5 lg:block">
          <div className="sticky top-32 py-24">
            <p className="mb-6 text-[9px] uppercase tracking-[0.3em] text-muted">{tr("Case study path")}</p>
            <nav className="relative space-y-1" aria-label="Case study sections">
              <span className="absolute bottom-4 left-[14px] top-4 w-px bg-stroke" />
              {SECTIONS.map((section, index) => {
                const isActive = activeSection === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl py-2.5 text-xs transition ${
                      isActive ? "text-text-primary" : "text-muted hover:text-text-primary"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={{ scale: isActive ? 1 : 0.72 }}
                      className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border ${
                        isActive
                          ? isDark
                            ? "border-blue-400 bg-blue-500"
                            : "border-blue-900 bg-blue-900"
                          : "border-stroke bg-bg"
                      }`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-white" : "bg-muted"}`} />
                    </motion.span>
                    <span className={`font-display italic ${isActive ? "text-blue-600" : "text-blue-500/[0.55]"}`}>
                      {String(index).padStart(2, "0")}
                    </span>
                    <span>{tr(section.label)}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="min-w-0 px-5 md:px-9 lg:px-12 xl:px-16">
          <section id="overview" className="scroll-mt-32 py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="00"
                eyebrow="Project overview"
                title="A complaint should become a traceable public record—not another message lost across channels."
                description="The feature was designed for the iNews website so users could publish complaints about products, services, applications, websites, or other company-owned offerings, then interact through likes, dislikes, comments, sharing, reporting, and bookmarks."
              />
            </Reveal>

            <div className="mt-14 grid gap-14 xl:grid-cols-[0.86fr_1.14fr]">
              <Reveal>
                <div className="xl:sticky xl:top-32">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-blue-600">{tr("Core proposition")}</p>
                  <p className="mt-5 max-w-xl text-xl leading-8 tracking-[-0.025em] text-text-primary md:text-2xl md:leading-9">
                    {tr("Public visibility creates accountability, while structured interaction keeps the complaint useful after publication.")}
                  </p>
                  <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                    <Eye className="h-4 w-4 text-blue-600" />
                    {tr("Visibility was intended to encourage faster, more transparent follow-up.")}
                  </div>
                </div>
              </Reveal>

              <div className="border-y border-stroke">
                {[
                  ["Challenge", "Complaint channels were fragmented, responses were slow, and users had little visibility after submitting an issue."],
                  ["Goal", "Create a clear publication flow that supports discovery, evidence, public discussion, and follow-up."],
                  ["My responsibility", "Question Mark, Home, Complaint Detail, Write Complaint, and Notifications."],
                  ["Team collaboration", "A second designer handled Bookmark, Edit Profile, and the Profile Dashboard."],
                  ["Tools", "Figma for interface design and FigJam for flows, prioritisation, and information architecture."],
                  ["Project boundary", "The internship report covered design, prototyping, and usability evaluation—not production deployment."],
                ].map(([label, value], index) => (
                  <Reveal key={label} delay={index * 0.045}>
                    <div className="grid gap-3 border-b border-stroke py-7 last:border-b-0 md:grid-cols-[175px_1fr] md:gap-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.27em] text-blue-700">{tr(label)}</p>
                      <p className="max-w-3xl text-sm leading-7 text-text-secondary md:text-base">{tr(value)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.08}>
              <div className="mt-20 border-y border-stroke py-10">
                <p className="text-[9px] uppercase tracking-[0.3em] text-muted">{tr("Designed complaint journey")}</p>
                <div className="relative mt-8 grid gap-7 md:grid-cols-4">
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-[8%] right-[8%] top-5 hidden h-px origin-left bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-600 md:block"
                  />
                  {[
                    [PenLine, "Publish", "Turn the issue into a complete, structured story."],
                    [Eye, "Make visible", "Place the complaint inside a searchable news environment."],
                    [UsersRound, "Build discussion", "Connect support, comments, sharing, and reporting."],
                    [Bell, "Follow progress", "Keep updates and account activity easy to revisit."],
                  ].map(([Icon, title, text], index) => {
                    const JourneyIcon = Icon as typeof PenLine;
                    return (
                      <div key={title as string} className="relative">
                        <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full ${isDark ? "bg-blue-500 text-white" : "bg-blue-950 text-white"}`}>
                          <JourneyIcon className="h-4 w-4" />
                        </span>
                        <p className="mt-5 text-base font-medium text-text-primary">{tr(title as string)}</p>
                        <p className="mt-2 text-sm leading-6 text-muted">{tr(text as string)}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </section>

          <section id="research" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow="Empathize"
                title="Research replaced assumptions with evidence about where complaints break down."
                description="The research combined a 136-response Google Forms survey, four selected interviews, and brainstorming. The survey mapped behaviour at scale, while the interviews explored interests, influences, goals, expectations, motivation, and pain points in more depth."
              />
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-stroke bg-stroke sm:grid-cols-2 xl:grid-cols-4">
              {SURVEY_METRICS.map((metric, index) => (
                <Reveal key={metric.label} delay={index * 0.05}>
                  <div className="h-full bg-bg p-6 md:p-7">
                    <p className="text-3xl tracking-[-0.04em] text-text-primary md:text-4xl">{metric.value}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.16em] text-blue-700">{tr(metric.label)}</p>
                    <p className="mt-4 text-sm leading-6 text-muted">{tr(metric.note)}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-20 grid gap-14 xl:grid-cols-2">
              <Reveal>
                <DataBars
                  eyebrow="Where people submit complaints"
                  title="Social platforms led because they were public and easy to access."
                  data={COMPLAINT_CHANNELS}
                />
              </Reveal>
              <Reveal delay={0.08}>
                <DataBars
                  eyebrow="Where people search for similar cases"
                  title="Discovery also happened outside official service channels."
                  data={DISCOVERY_CHANNELS}
                />
              </Reveal>
            </div>

            <div className="mt-20 grid gap-12 border-y border-stroke py-12 xl:grid-cols-[0.74fr_1.26fr]">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-blue-700">{tr("Participant profile")}</p>
                  <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
                    {tr("Broad survey, focused interviews.")}
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
                    {tr("The survey included readers across age groups, professions, and locations. The largest groups were people aged 18–24, Tangerang residents, and students. Four respondents were then selected for deeper interviews, producing different perspectives from students, a private employee, and a civil servant.")}
                  </p>
                </div>
              </Reveal>

              <div className="grid gap-0 border-y border-stroke md:grid-cols-3 md:border-y-0">
                {[
                  ["36%", "aged 18–24", "49 respondents"],
                  ["49.3%", "lived in Tangerang", "67 respondents"],
                  ["33.1%", "students", "45 respondents"],
                ].map(([value, label, note], index) => (
                  <Reveal key={label} delay={index * 0.06}>
                    <div className="h-full border-b border-stroke py-6 md:border-b-0 md:border-l md:px-7 md:py-0">
                      <p className="text-2xl tracking-[-0.035em] text-text-primary">{value}</p>
                      <p className="mt-2 text-sm text-text-secondary">{tr(label)}</p>
                      <p className="mt-2 text-xs text-muted">{tr(note)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.08}>
              <button
                type="button"
                onClick={() => openGallery(RESEARCH_ARCHIVE)}
                className="group mt-9 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-blue-700"
              >
                {tr("Open the complete research evidence archive")}
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated transition group-hover:rotate-45 group-hover:border-blue-700">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          </section>

          <section id="synthesis" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow="Define + Ideate"
                title="Five recurring problems became a focused product direction."
                description="Survey and interview findings were organised into pain points, needs, expectations, and solution ideas. The goal was not to implement every suggestion, but to connect each design decision to a documented user problem."
              />
            </Reveal>

            <div className="mt-16 grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
              <div>
                <p className="mb-3 text-[9px] uppercase tracking-[0.28em] text-muted">
                  {tr("Select insight")}
                </p>
                <div className="space-y-2">
                  {PAIN_POINTS.map((item, index) => {
                    const isActive = painIndex === index;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setPainIndex(index)}
                        whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                        className={`group flex w-full items-center gap-4 rounded-[1.15rem] border px-4 py-4 text-left transition ${
                          isActive
                            ? isDark
                              ? "border-blue-400/40 bg-blue-500/12 text-white"
                              : "border-blue-900 bg-blue-950 text-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                            : isDark
                              ? "border-white/8 bg-white/[0.025] text-muted hover:border-blue-400/30 hover:bg-blue-500/[0.07] hover:text-white"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-slate-950"
                        }`}
                      >
                        <span className={`font-display text-lg italic ${isActive ? "text-current" : "text-blue-600"}`}>
                          0{index + 1}
                        </span>
                        <span className="min-w-0 flex-1 text-sm font-medium md:text-base">{tr(item.label)}</span>
                        <span className={`hidden text-[9px] uppercase tracking-[0.18em] sm:block ${isActive ? "text-current/65" : "text-muted"}`}>
                          {tr("View insight")}
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-[1.75rem] border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={PAIN_POINTS[painIndex].id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.32 }}
                  >
                    <p className="text-[9px] uppercase tracking-[0.28em] text-blue-700">{tr("Active insight")}</p>
                    <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
                      {tr(PAIN_POINTS[painIndex].statement)}
                    </h3>

                    <div className="mt-9 grid gap-7 border-y border-stroke py-7 md:grid-cols-2">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.25em] text-muted">{tr("User need")}</p>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">{tr(PAIN_POINTS[painIndex].need)}</p>
                      </div>
                      <div className="md:border-l md:border-stroke md:pl-7">
                        <p className="text-[9px] uppercase tracking-[0.25em] text-muted">{tr("Design response")}</p>
                        <p className="mt-3 text-sm leading-7 text-text-secondary">{tr(PAIN_POINTS[painIndex].response)}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-24">
              <div className="mb-10 grid gap-6 xl:grid-cols-[0.8fr_1.2fr] xl:items-end">
                <Reveal>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-blue-700">{tr("Prioritisation")}</p>
                    <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
                      {tr("One feature system, three levels of commitment.")}
                    </h3>
                  </div>
                </Reveal>
                <Reveal delay={0.06}>
                  <p className="max-w-2xl text-sm leading-7 text-muted">
                    {tr("The original matrix compared priority with feasibility. The web version below keeps the decision readable without reproducing a dense board of sticky notes.")}
                  </p>
                </Reveal>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-stroke">
                {PRIORITY_GROUPS.map((group, index) => (
                  <Reveal key={tr(group.label)} delay={index * 0.06}>
                    <div className="grid gap-5 border-b border-stroke p-6 last:border-b-0 md:grid-cols-[58px_220px_minmax(0,1fr)] md:items-start md:gap-7">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${isDark ? "bg-blue-500/[0.12] text-blue-300" : "bg-blue-950 text-white"}`}>
                        0{index + 1}
                      </span>
                      <div>
                        <h4 className="text-lg font-medium text-text-primary">{tr(group.label)}</h4>
                        <p className="mt-2 text-sm leading-6 text-muted">{tr(group.description)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item, itemIndex) => (
                          <motion.span
                            key={tr(item)}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: itemIndex * 0.035, duration: 0.3 }}
                            whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                            className={`rounded-full border px-3.5 py-2 text-xs md:text-sm ${
                              isDark
                                ? "border-white/10 bg-white/[0.04] text-text-secondary"
                                : "border-slate-200 bg-slate-50 text-slate-700"
                            }`}
                          >
                            {tr(item)}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <button
                type="button"
                onClick={() => openGallery(DEFINE_ARCHIVE)}
                className="group mt-7 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-blue-700"
              >
                {tr("Review the original matrix and deferred ideas")}
                <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </section>

          <section id="logic" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow="Prototype structure"
                title="The product was organised before screens were polished."
                description="Eleven task flows mapped specific user actions, while the information architecture grouped the experience into discovery, complaint detail, publishing, and account management."
              />
            </Reveal>

            <div className="mt-16 grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
              <div className="xl:sticky xl:top-32">
                <p className="text-[9px] uppercase tracking-[0.3em] text-blue-700">{tr("Four connected journeys")}</p>
                <div className="mt-5 space-y-2">
                  {FLOW_STORIES.map((flow, index) => {
                    const isActive = flowIndex === index;
                    return (
                      <motion.button
                        key={flow.title}
                        type="button"
                        onClick={() => setFlowIndex(index)}
                        whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                        className={`group flex w-full items-center gap-4 rounded-[1.15rem] border px-4 py-4 text-left transition ${
                          isActive
                            ? isDark
                              ? "border-blue-400/40 bg-blue-500/12 text-white"
                              : "border-blue-900 bg-blue-950 text-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
                            : isDark
                              ? "border-white/8 bg-white/[0.025] text-muted hover:border-blue-400/30 hover:bg-blue-500/[0.07] hover:text-white"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-slate-950"
                        }`}
                      >
                        <span className={`font-display text-lg italic ${isActive ? "text-current" : "text-blue-600"}`}>
                          0{index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium md:text-base">{tr(flow.title)}</span>
                          <span className={`mt-1 block text-xs leading-5 ${isActive ? "text-current/65" : "text-muted"}`}>
                            {tr(flow.caption)}
                          </span>
                        </span>
                        <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <div className={`rounded-[1.75rem] border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tr(FLOW_STORIES[flowIndex].title)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.34 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.28em] text-blue-700">{tr("Selected task flow")}</p>
                        <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
                          {tr(FLOW_STORIES[flowIndex].title)}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => openGallery(TASK_FLOW_IMAGES, FLOW_STORIES[flowIndex].imageIndex)}
                        className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface-elevated px-4 py-2 text-xs text-text-secondary transition hover:border-blue-700 hover:text-blue-700"
                      >
                        {tr("Open original diagram")}
                        <Maximize2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="relative mt-10 space-y-0">
                      <span className="absolute bottom-4 left-[17px] top-4 w-px bg-stroke" />
                      {FLOW_STORIES[flowIndex].steps.map((step, index) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.07, duration: 0.35 }}
                          className="relative flex items-center gap-5 py-4"
                        >
                          <span className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border text-xs ${
                            isDark ? "border-blue-400/[0.35] bg-[#0b101a] text-blue-300" : "border-blue-900 bg-white text-blue-900"
                          }`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="text-sm text-text-secondary md:text-base">{tr(step)}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-7 border-t border-stroke pt-6">
                      <p className="text-[9px] uppercase tracking-[0.25em] text-muted">{tr("Outcome")}</p>
                      <p className="mt-3 text-sm leading-7 text-text-secondary">{tr(FLOW_STORIES[flowIndex].outcome)}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-24 grid gap-12 xl:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-blue-700">{tr("Information architecture")}</p>
                  <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
                    {tr("Four branches keep the experience understandable.")}
                  </h3>
                  <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
                    {tr("Instead of displaying the full architecture screenshot, this interactive map exposes one branch at a time. The complete original remains available as supporting evidence.")}
                  </p>
                  <button
                    type="button"
                    onClick={() => openGallery(STRUCTURE_ARCHIVE)}
                    className="mt-7 inline-flex items-center gap-3 text-sm text-text-secondary transition hover:text-blue-700"
                  >
                    {tr("Open structure archive")}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>

              <div>
                <div className="flex flex-wrap gap-2">
                  {ARCHITECTURE_BRANCHES.map((branch, index) => (
                    <button
                      key={tr(branch.label)}
                      type="button"
                      onClick={() => setArchitectureIndex(index)}
                      className={`rounded-full border px-4 py-2 text-xs transition md:text-sm ${
                        architectureIndex === index
                          ? isDark
                            ? "border-blue-400 bg-blue-500 text-white"
                            : "border-blue-950 bg-blue-950 text-white"
                          : "border-stroke bg-surface-elevated text-muted hover:border-blue-700 hover:text-text-primary"
                      }`}
                    >
                      {tr(branch.label)}
                    </button>
                  ))}
                </div>

                <div className="relative mt-7 border-y border-stroke py-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={ARCHITECTURE_BRANCHES[architectureIndex].label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid gap-3 sm:grid-cols-2">
                        {ARCHITECTURE_BRANCHES[architectureIndex].items.map((item, index) => (
                          <motion.div
                            key={tr(item)}
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.045 }}
                            className="flex items-center gap-3 border-b border-stroke py-3 text-sm text-text-secondary"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
                            {tr(item)}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          <section id="wireframe" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="04"
                eyebrow="Wireframe system"
                title="Five key screens explain the product without turning the page into an image gallery."
                description="The supplied asset pack contains the wireframe evidence for Home, Complaint Detail, More Options, Comments, and Write Complaint. This section keeps one screen in focus and explains the design intent beside it."
              />
            </Reveal>

            <Reveal delay={0.06}>
              <div className={`mt-14 overflow-hidden rounded-[1.75rem] border p-4 md:p-5 ${isDark ? "border-white/10 bg-white/[0.025]" : "border-slate-200 bg-white"}`}>
                <div className="flex gap-2 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {WIREFRAME_IMAGES.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() => setWireframeIndex(index)}
                      className={`shrink-0 rounded-full border px-4 py-2 text-xs transition ${
                        wireframeIndex === index
                          ? isDark
                            ? "border-blue-400 bg-blue-500 text-white"
                            : "border-blue-950 bg-blue-950 text-white"
                          : "border-stroke bg-surface-elevated text-muted hover:border-blue-700 hover:text-text-primary"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")} · {tr(image.label)}
                    </button>
                  ))}
                </div>

                <div className="mt-3 grid gap-7 xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,0.75fr)] xl:items-stretch">
                  <button
                    type="button"
                    onClick={() => openGallery(WIREFRAME_IMAGES, wireframeIndex)}
                    className="group relative overflow-hidden rounded-[1.45rem] bg-slate-100 text-left dark:bg-black/20"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={WIREFRAME_IMAGES[wireframeIndex].src}
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <ImageWithFallback
                          image={WIREFRAME_IMAGES[wireframeIndex]}
                          className="aspect-[16/10] w-full object-contain transition duration-700 group-hover:scale-[1.01]"
                        />
                      </motion.div>
                    </AnimatePresence>
                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] bg-black/[0.45] text-white/75 backdrop-blur-md">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </button>

                  <div className="flex flex-col justify-between border-y border-stroke py-6 xl:border-y-0 xl:border-l xl:py-4 xl:pl-7">
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.28em] text-blue-700">{tr("Selected screen")}</p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={tr(WIREFRAME_DETAILS[wireframeIndex].title)}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                        >
                          <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary">
                            {tr(WIREFRAME_DETAILS[wireframeIndex].title)}
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-muted">
                            {tr(WIREFRAME_DETAILS[wireframeIndex].purpose)}
                          </p>
                          <div className="mt-7 space-y-3">
                            {WIREFRAME_DETAILS[wireframeIndex].decisions.map((decision) => (
                              <div key={tr(decision)} className="flex items-start gap-3 text-sm leading-6 text-text-secondary">
                                <Check className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                                {tr(decision)}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-xs text-muted">
                        {String(wireframeIndex + 1).padStart(2, "0")} / {String(WIREFRAME_IMAGES.length).padStart(2, "0")}
                      </span>
                      <div className="flex gap-2">
                        <RoundArrow direction="prev" onClick={() => moveWireframe("prev")} />
                        <RoundArrow direction="next" onClick={() => moveWireframe("next")} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="validation" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <Reveal>
              <SectionHeading
                number="05"
                eyebrow="Usability testing"
                title="Most tasks felt very easy; the writing flow exposed the clearest product risk."
                description="The report tested six prototype tasks with participants aged 17–25 who had complaint experience, matched the defined personas, used Android or iPhone devices, and represented different Indonesian regions. SEQ used a 1–6 scale, while severity used 1 as catastrophic and 4 as low priority."
              />
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[1.5rem] border border-stroke bg-stroke sm:grid-cols-3">
              {[
                [averageSeq, "average SEQ", "Across the six detailed task results"],
                ["5 / 6", "tasks scored SEQ 6", "Very easy for the participant"],
                ["2", "priority issues", "Mobile sharing and complaint form resilience"],
              ].map(([value, label, note], index) => (
                <Reveal key={label} delay={index * 0.05}>
                  <div className="h-full bg-bg p-6 md:p-7">
                    <p className="text-3xl tracking-[-0.04em] text-text-primary">{value}</p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-blue-700">{tr(label)}</p>
                    <p className="mt-3 text-sm leading-6 text-muted">{tr(note)}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-16 grid gap-10 xl:grid-cols-[0.72fr_1.28fr]">
              <div className="border-y border-stroke">
                {TEST_RESULTS.map((result, index) => {
                  const isActive = testIndex === index;
                  return (
                    <button
                      key={result.task}
                      type="button"
                      onClick={() => setTestIndex(index)}
                      className={`grid w-full grid-cols-[1fr_58px] items-center gap-4 border-b border-stroke py-5 text-left last:border-b-0 ${
                        isActive ? "text-text-primary" : "text-muted hover:text-text-primary"
                      }`}
                    >
                      <span className="text-sm md:text-base">{tr(result.task)}</span>
                      <span className={`text-right font-display text-xl italic ${isActive ? "text-blue-700" : "text-blue-500/[0.45]"}`}>
                        {result.seq}/6
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className={`rounded-[1.75rem] border p-6 md:p-8 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tr(TEST_RESULTS[testIndex].task)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.32 }}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.28em] text-blue-700">{tr("Selected task")}</p>
                        <h3 className="mt-4 text-2xl tracking-[-0.035em] text-text-primary md:text-3xl">
                          {tr(TEST_RESULTS[testIndex].task)}
                        </h3>
                      </div>
                      <div className="flex gap-2">
                        <span className="rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-xs text-text-secondary">
                          {tr("SEQ")} {TEST_RESULTS[testIndex].seq}/6
                        </span>
                        <span className="rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-xs text-text-secondary">
                          {tr("Severity")} {TEST_RESULTS[testIndex].severity}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 h-2 overflow-hidden rounded-full bg-stroke">
                      <motion.div
                        key={`${tr(TEST_RESULTS[testIndex].task)}-bar`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: TEST_RESULTS[testIndex].seq / 6 }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full origin-left rounded-full bg-gradient-to-r from-blue-700 to-sky-500"
                      />
                    </div>

                    <p className="mt-7 text-sm leading-7 text-text-secondary md:text-base">
                      {tr(TEST_RESULTS[testIndex].summary)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-20 border-y border-stroke">
              {[
                {
                  icon: Share2,
                  label: "Mobile sharing",
                  issue: "The auto-generated Instagram Story template worked better on desktop than mobile.",
                  action: "Create a mobile-specific composition and test the export path on actual devices.",
                },
                {
                  icon: TimerReset,
                  label: "Draft protection",
                  issue: "Leaving the write page could erase completed fields.",
                  action: "Autosave a local or account-based draft and warn users before destructive navigation.",
                },
                {
                  icon: PenLine,
                  label: "Form clarity",
                  issue: "The complaint form felt confusing to the participant.",
                  action: "Reduce cognitive load through field grouping, progressive steps, examples, and visible completion status.",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={item.label} delay={index * 0.06}>
                    <div className="grid gap-5 border-b border-stroke py-8 last:border-b-0 md:grid-cols-[54px_180px_1fr_1fr] md:items-start md:gap-7">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-full ${isDark ? "bg-blue-500/[0.12] text-blue-300" : "bg-blue-950 text-white"}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <h4 className="text-base font-medium text-text-primary">{tr(item.label)}</h4>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.23em] text-muted">{tr("Finding")}</p>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">{tr(item.issue)}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.23em] text-muted">{tr("Recommended iteration")}</p>
                        <p className="mt-2 text-sm leading-6 text-text-secondary">{tr(item.action)}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </section>

          <section id="reflection" className="scroll-mt-32 border-t border-stroke py-24 md:py-32">
            <div className={`relative overflow-hidden rounded-[2rem] border px-6 py-14 md:px-10 md:py-20 ${isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"}`}>
              <div className="relative grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
                <Reveal>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-blue-700">{tr("06 · Reflection")}</p>
                    <h2 className="mt-5 max-w-2xl text-[clamp(2rem,4vw,3.4rem)] leading-[1.05] tracking-[-0.04em] text-text-primary">
                      {tr("The strongest design decision was turning a complaint into a connected lifecycle.")}
                    </h2>
                  </div>
                </Reveal>

                <Reveal delay={0.08}>
                  <div>
                    <p className="text-sm leading-7 text-text-secondary md:text-base md:leading-8">
                      {tr("The project connected research, prioritisation, information architecture, writing, public interaction, personal management, and usability evaluation. It also showed that adding more features is not enough: the submission flow must protect user effort, and media-sharing behaviour must be tested on the device where it will actually happen.")}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={PROJECT_REPORT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm transition hover:-translate-y-1 ${
                          isDark
                            ? "border-blue-400/[0.35] bg-blue-500/[0.12] text-text-primary hover:border-blue-400/[0.65]"
                            : "border-blue-950 bg-blue-950 text-white hover:bg-blue-900"
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        {tr("Open internship report")}
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <a
                        href="/#work"
                        className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-5 py-3 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-blue-700 hover:text-text-primary"
                      >
                        <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
                        {tr("Back to projects")}
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="mt-12 grid gap-0 border-y border-stroke md:grid-cols-3">
                {[
                  ["Evidence before interface", "Survey and interviews established the real behaviour and expectations behind complaint publishing."],
                  ["Scope before decoration", "Prioritisation separated feasible, important features from ideas that needed operational support."],
                  ["Testing before confidence", "The form and mobile-sharing issues were visible only after participants completed realistic tasks."],
                ].map(([title, text], index) => (
                  <Reveal key={title} delay={index * 0.06}>
                    <div className="h-full border-b border-stroke py-7 last:border-b-0 md:border-b-0 md:border-l md:px-7 md:first:border-l-0">
                      <span className="font-display text-xl italic text-blue-700">0{index + 1}</span>
                      <h3 className="mt-5 text-base font-medium text-text-primary">{tr(title)}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{tr(text)}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {lightboxPortal}
    </div>
    </LanguageContext.Provider>
  );
}

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  const { isDark } = useTheme();
  const { tr } = useLanguage();

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-3">
        <span className={`font-display text-xl italic ${isDark ? "text-blue-400/70" : "text-blue-900"}`}>
          {number}
        </span>
        <span className={`h-px w-9 ${isDark ? "bg-blue-400/[0.35]" : "bg-blue-900/30"}`} />
        <span className="text-[9px] uppercase tracking-[0.3em] text-muted">{tr(eyebrow)}</span>
      </div>
      <h2 className="mt-6 text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.04] tracking-[-0.04em] text-text-primary">
        {tr(title)}
      </h2>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
        {tr(description)}
      </p>
    </div>
  );
}

function DataBars({
  eyebrow,
  title,
  data,
}: {
  eyebrow: string;
  title: string;
  data: { label: string; value: number }[];
}) {
  const { tr } = useLanguage();
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.3em] text-blue-700">{tr(eyebrow)}</p>
      <h3 className="mt-4 max-w-xl text-2xl leading-tight tracking-[-0.035em] text-text-primary md:text-3xl">
        {tr(title)}
      </h3>
      <div className="mt-8 space-y-6">
        {data.map((item, index) => (
          <div key={item.label}>
            <div className="flex items-end justify-between gap-4">
              <span className="text-sm text-text-secondary">{tr(item.label)}</span>
              <span className="font-display text-lg italic text-blue-700">{item.value}%</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-stroke">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: item.value / 100 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-blue-800 to-sky-500"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingSignal({
  icon: Icon,
  label,
  value,
  delay,
  className,
}: {
  icon: typeof PenLine;
  label: string;
  value: string;
  delay: number;
  className: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const { tr } = useLanguage();

  return (
    <motion.div
      animate={prefersReducedMotion ? undefined : { y: [0, -8, 0], rotate: [0, 0.5, 0] }}
      transition={{ duration: 4.8, delay, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute z-20 hidden items-center gap-3 rounded-full border py-2 pl-2 pr-4 backdrop-blur-xl md:flex ${className} ${
        isDark
          ? "border-white/10 bg-black/50 text-white shadow-[0_16px_45px_rgba(0,0,0,0.32)]"
          : "border-white/80 bg-white/[0.76] text-slate-950 shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
      }`}
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${isDark ? "bg-blue-500/20" : "bg-blue-100"}`}>
        <Icon className={`h-4 w-4 ${isDark ? "text-blue-300" : "text-blue-900"}`} />
      </span>
      <span>
        <span className={`block text-[8px] uppercase tracking-[0.22em] ${isDark ? "text-white/[0.45]" : "text-slate-500"}`}>
          {tr(label)}
        </span>
        <span className={`mt-0.5 block text-xs ${isDark ? "text-white/80" : "text-slate-900"}`}>{tr(value)}</span>
      </span>
    </motion.div>
  );
}

function RoundArrow({ direction, onClick }: { direction: Direction; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const { tr } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${tr(direction === "prev" ? "Previous" : "Next")} ${tr("wireframe")}`}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-surface-elevated text-muted transition hover:border-blue-700 hover:text-text-primary"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

function GalleryArrow({ direction, onClick }: { direction: Direction; onClick: () => void }) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const { tr } = useLanguage();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${tr(direction === "prev" ? "Previous" : "Next")} ${tr("evidence")}`}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.15] bg-black/60 text-white/[0.65] backdrop-blur-md transition hover:border-blue-300/50 hover:text-white ${
        direction === "prev" ? "left-4 md:left-7" : "right-4 md:right-7"
      }`}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageWithFallback({
  image,
  className,
  priority = false,
}: {
  image: GalleryImage;
  className: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const { isDark } = useTheme();
  const { tr } = useLanguage();

  if (hasError) {
    return (
      <div className={`flex min-h-[220px] items-center justify-center ${isDark ? "bg-white/[0.04]" : "bg-slate-50"} ${className}`}>
        <div className="max-w-sm px-6 text-center">
          <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border ${isDark ? "border-white/10 bg-white/[0.04]" : "border-slate-200 bg-white"}`}>
            <ImageIcon className="h-5 w-5 text-blue-700" />
          </div>
          <p className="mt-4 text-sm text-muted">{tr("Add the project image here")}</p>
          <p className="mt-2 break-all font-mono text-[10px] leading-5 text-muted">{image.src}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => setHasError(true)}
      className={className}
    />
  );
}