import { createFileRoute } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Bell,
  Bookmark,
  Check,
  Code2,
  Database,
  FileText,
  Heart,
  Layers3,
  Lightbulb,
  MessageCircle,
  MonitorPlay,
  Search,
  Server,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Upload,
  UserRound,
  UsersRound,
  Youtube,
} from "lucide-react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

export const Route = createFileRoute("/inews-byte")({
  component: INewsByteCaseStudy,
});

// INEWS BYTE CASE STUDY — V3 · PERMANENT DARK HERO
type Language = "en" | "id";

const INDONESIAN_COPY: Record<string, string> = {
  "Overview": "Gambaran Umum",
  "Context": "Konteks",
  "Discovery": "Penemuan",
  "Product Design": "Desain Produk",
  "Build Journey": "Proses Pengembangan",
  "Validation": "Validasi",
  "Reflection": "Refleksi",
  "Agile iterations": "Iterasi Agile",
  "Usability respondents": "Responden usability",
  "Functional scenarios passed": "Skenario fungsional berhasil",
  "Overall usability score": "Skor usability keseluruhan",
  "Observation": "Observasi",
  "Reviewed the existing iNews portal, page-view movement, and the shift toward short-form news consumption.": "Meninjau portal iNews yang ada, pergerakan page view, serta pergeseran konsumsi berita menuju format video singkat.",
  "Literature review": "Studi literatur",
  "Studied academic journals, industry reports, and digital-trend references related to short video, engagement, and usability.": "Mempelajari jurnal akademik, laporan industri, dan referensi tren digital terkait video singkat, engagement, dan usability.",
  "Internal interviews": "Wawancara internal",
  "Gathered expectations and system requirements from iNews product, UI/UX, and IT teams.": "Mengumpulkan ekspektasi serta kebutuhan sistem dari tim produk, UI/UX, dan IT iNews.",
  "Brainstorming": "Brainstorming",
  "Translated findings into feature priorities, interface directions, system flows, and implementation decisions.": "Menerjemahkan temuan menjadi prioritas fitur, arah antarmuka, alur sistem, dan keputusan implementasi.",
  "Questionnaire": "Kuesioner",
  "Evaluated the completed experience with 20 respondents using the USE Questionnaire.": "Mengevaluasi pengalaman yang telah selesai bersama 20 responden menggunakan USE Questionnaire.",
  "Authenticate and securely end a session": "Melakukan autentikasi dan mengakhiri sesi dengan aman",
  "View, search, and filter published videos": "Melihat, mencari, dan memfilter video yang telah diterbitkan",
  "Add videos using YouTube embed links": "Menambahkan video menggunakan tautan embed YouTube",
  "Review complete video information": "Meninjau informasi video secara lengkap",
  "Edit and remove video content": "Mengedit dan menghapus konten video",
  "Moderate inappropriate user comments": "Memoderasi komentar pengguna yang tidak pantas",
  "Register, log in, and manage a profile": "Mendaftar, masuk, dan mengelola profil",
  "Browse and search short-form news videos": "Menjelajahi dan mencari video berita singkat",
  "Open a complete video-detail experience": "Membuka halaman detail video secara lengkap",
  "Like, comment, save, and share content": "Menyukai, mengomentari, menyimpan, dan membagikan konten",
  "Return to a personal saved-video dashboard": "Kembali ke dasbor pribadi berisi video tersimpan",
  "Log out securely after completing a session": "Keluar dengan aman setelah menyelesaikan sesi",
  "Fast to understand": "Cepat dipahami",
  "Short video, concise titles, clear metadata, and direct playback reduce the effort required to access news.": "Video singkat, judul ringkas, metadata yang jelas, dan pemutaran langsung mengurangi upaya pengguna untuk mengakses berita.",
  "Verified by design": "Terverifikasi melalui desain",
  "Content remains connected to the iNews editorial process instead of behaving like unverified social-media uploads.": "Konten tetap terhubung dengan proses editorial iNews, bukan diperlakukan seperti unggahan media sosial yang belum terverifikasi.",
  "Built for participation": "Dirancang untuk partisipasi",
  "Likes, comments, saves, and sharing turn passive reading into a more interactive news experience.": "Fitur suka, komentar, simpan, dan bagikan mengubah konsumsi pasif menjadi pengalaman berita yang lebih interaktif.",
  "YouTube Embed": "Embed YouTube",
  "Weeks 1-2": "Minggu 1–2",
  "Weeks 3-4": "Minggu 3–4",
  "Weeks 5-6": "Minggu 5–6",
  "Weeks 7-8": "Minggu 7–8",
  "Weeks 9-10": "Minggu 9–10",
  "Weeks 11-12": "Minggu 11–12",
  "Authentication foundation": "Fondasi autentikasi",
  "Built admin and public login, registration, session validation, password protection, and secure logout.": "Membangun login admin dan publik, registrasi, validasi sesi, perlindungan kata sandi, serta logout yang aman.",
  "Secure access for both system roles.": "Akses aman untuk kedua peran sistem.",
  "Editorial content management": "Pengelolaan konten editorial",
  "Created the admin video list, add, edit, detail, validation, and delete flows.": "Membuat daftar video admin serta alur tambah, edit, detail, validasi, dan hapus.",
  "One workspace for editorial publishing.": "Satu ruang kerja untuk publikasi editorial.",
  "Public discovery and playback": "Penemuan dan pemutaran publik",
  "Built the public video grid, detail view, playback, likes, and sharing.": "Membangun grid video publik, tampilan detail, pemutaran, fitur suka, dan berbagi.",
  "Verified news became easier to discover and distribute.": "Berita terverifikasi menjadi lebih mudah ditemukan dan didistribusikan.",
  "Content search": "Pencarian konten",
  "Added keyword search for both administrator and public views.": "Menambahkan pencarian kata kunci pada tampilan admin dan publik.",
  "Relevant stories became faster to find.": "Berita yang relevan menjadi lebih cepat ditemukan.",
  "Conversation and personalisation": "Percakapan dan personalisasi",
  "Added comments, saving, and a bookmarked-video dashboard.": "Menambahkan komentar, penyimpanan, dan dasbor video yang ditandai.",
  "The product supported interaction and return visits.": "Produk mendukung interaksi dan kunjungan kembali.",
  "Profile, moderation, and refinement": "Profil, moderasi, dan penyempurnaan",
  "Completed profile editing, comment moderation, integration review, and stability checks.": "Menyelesaikan penyuntingan profil, moderasi komentar, peninjauan integrasi, dan pemeriksaan stabilitas.",
  "All core flows worked as one connected system.": "Seluruh alur utama bekerja sebagai satu sistem yang terhubung.",
  "Editorial workspace": "Ruang kerja editorial",
  "A structured path from YouTube upload to iNews publication.": "Alur terstruktur dari unggahan YouTube hingga publikasi di iNews.",
  "Administrators can authenticate, review the video library, add a YouTube embed link, complete the required metadata, edit existing content, and remove content when necessary.": "Admin dapat melakukan autentikasi, meninjau pustaka video, menambahkan tautan embed YouTube, melengkapi metadata, mengedit konten, dan menghapusnya bila diperlukan.",
  "Clear content-management hierarchy": "Hierarki pengelolaan konten yang jelas",
  "Form validation for complete publishing data": "Validasi formulir untuk kelengkapan data publikasi",
  "Search, filters, detail review, and moderation": "Pencarian, filter, peninjauan detail, dan moderasi",
  "Public discovery": "Penemuan publik",
  "Familiar portal patterns make short video easy to browse.": "Pola portal yang familiar membuat video singkat mudah dijelajahi.",
  "The public experience keeps familiar iNews navigation while introducing a dedicated video grid with thumbnails, categories, durations, and a direct path into the complete story.": "Pengalaman publik mempertahankan navigasi iNews yang familiar sambil memperkenalkan grid video khusus dengan thumbnail, kategori, durasi, dan akses langsung ke berita lengkap.",
  "Searchable short-video grid": "Grid video singkat yang dapat dicari",
  "Recognisable iNews structure and advertising spaces": "Struktur iNews dan ruang iklan yang mudah dikenali",
  "Clear transition from discovery to playback": "Transisi jelas dari penemuan ke pemutaran",
  "Engagement and return visits": "Engagement dan kunjungan kembali",
  "Interaction continues after the video finishes.": "Interaksi tetap berlanjut setelah video selesai.",
  "Users can respond through likes and comments, share a video, save it for later, revisit saved content, and update their account information.": "Pengguna dapat merespons melalui suka dan komentar, membagikan video, menyimpannya, membuka kembali konten tersimpan, dan memperbarui informasi akun.",
  "Like, comment, save, and share": "Suka, komentar, simpan, dan bagikan",
  "Personal saved-video dashboard": "Dasbor pribadi untuk video tersimpan",
  "Profile control and secure logout": "Kontrol profil dan logout yang aman",
  "Usefulness": "Kegunaan",
  "Respondents considered iNews Byte a useful and efficient alternative for understanding news quickly.": "Responden menilai iNews Byte sebagai alternatif yang berguna dan efisien untuk memahami berita dengan cepat.",
  "Ease of Use": "Kemudahan Penggunaan",
  "The highest result indicates that navigation and core interactions were clear without additional guidance.": "Hasil tertinggi menunjukkan bahwa navigasi dan interaksi utama dapat dipahami tanpa panduan tambahan.",
  "Satisfaction": "Kepuasan",
  "Respondents reported a comfortable experience and willingness to use the feature again.": "Responden merasakan pengalaman yang nyaman dan bersedia menggunakan fitur tersebut kembali.",
  "Agile framework used to organise the complete project": "Kerangka Agile yang digunakan untuk mengatur keseluruhan proyek",
  "Homepage and detail-view design documentation": "Dokumentasi desain homepage dan tampilan detail",
  "Six-iteration development planning": "Perencanaan pengembangan dalam enam iterasi",
  "System demonstration documentation": "Dokumentasi demonstrasi sistem",
  "Back to projects": "Kembali ke proyek",
  "iNews Byte · Product Design & Development": "iNews Byte · Desain & Pengembangan Produk",
  "Final Project · Product Design · Web Development": "Proyek Akhir · Desain Produk · Pengembangan Web",
  "Reframing verified journalism for an audience shaped by short, visual, and interactive news.": "Merancang ulang jurnalisme terverifikasi untuk audiens yang terbentuk oleh berita singkat, visual, dan interaktif.",
  "Research": "Riset",
  "Agile Development": "Pengembangan Agile",
  "USE Questionnaire": "USE Questionnaire",
  "Read the story": "Baca ceritanya",
  "Project Journey": "Perjalanan Proyek",
  "Project Overview": "Gambaran Proyek",
  "A news portal response to the short-video era.": "Respons portal berita terhadap era video singkat.",
  "A desktop short-video channel that brings verified news into the existing iNews ecosystem.": "Kanal video singkat desktop yang menghadirkan berita terverifikasi ke dalam ekosistem iNews.",
  "I handled the project end to end—from research and requirements to interface design, development, and evaluation.": "Saya menangani proyek secara menyeluruh, mulai dari riset dan kebutuhan hingga desain antarmuka, pengembangan, dan evaluasi.",
  "The core tension was simple: iNews needed to protect newsroom credibility while adapting to audiences who expect information to be concise, visual, and immediately interactive.": "Tantangan utamanya sederhana: iNews perlu menjaga kredibilitas ruang redaksi sambil beradaptasi dengan audiens yang mengharapkan informasi ringkas, visual, dan langsung interaktif.",
  "Instead of copying a social feed, iNews Byte connects topic planning, production, YouTube upload, administrator publishing, and public interaction in one structured product flow.": "Alih-alih meniru feed media sosial, iNews Byte menghubungkan perencanaan topik, produksi, unggahan YouTube, publikasi admin, dan interaksi publik dalam satu alur produk yang terstruktur.",
  "How might iNews make verified news feel as immediate as short-form social video without losing editorial control?": "Bagaimana iNews dapat membuat berita terverifikasi terasa secepat video singkat media sosial tanpa kehilangan kendali editorial?",
  "Organisation": "Organisasi",
  "Project": "Proyek",
  "Final Project · 2025": "Proyek Akhir · 2025",
  "Role": "Peran",
  "Research · UI/UX · Development · Testing": "Riset · UI/UX · Pengembangan · Pengujian",
  "Collaboration": "Kolaborasi",
  "Product · UI/UX · IT · Editorial": "Produk · UI/UX · IT · Editorial",
  "Platform": "Platform",
  "Desktop web · Local deployment": "Web desktop · Deployment lokal",
  "The working system was demonstrated during the final-project presentation.": "Sistem yang berfungsi didemonstrasikan pada presentasi proyek akhir.",
  "Context & Challenge": "Konteks & Tantangan",
  "The portal was competing for attention, not only for credibility.": "Portal ini bersaing untuk mendapatkan perhatian, bukan hanya kredibilitas.",
  "The research showed a widening gap between traditional portal behaviour and the fast, visual patterns increasingly preferred by Gen Z and Millennial audiences.": "Riset menunjukkan kesenjangan yang semakin lebar antara perilaku portal tradisional dan pola cepat serta visual yang semakin disukai audiens Gen Z dan Milenial.",
  "iNews page-view movement": "Pergerakan page view iNews",
  "Aug 2024": "Agu 2024",
  "Oct 2024": "Okt 2024",
  "Dec 2024": "Des 2024",
  "The data did not show a dramatic collapse, but it revealed stagnation followed by a decline—an important signal in a media business where attention and page views affect reach and advertising value.": "Data tidak menunjukkan penurunan drastis, tetapi memperlihatkan stagnasi yang diikuti penurunan—sebuah sinyal penting dalam bisnis media ketika perhatian dan page view memengaruhi jangkauan serta nilai iklan.",
  "average monthly TikTok usage in 2023": "rata-rata penggunaan TikTok bulanan pada 2023",
  "average monthly TikTok usage in 2024": "rata-rata penggunaan TikTok bulanan pada 2024",
  "Short video had become more than entertainment. Its concise, visual, and trend-driven format increasingly shaped how younger audiences accessed information.": "Video singkat telah menjadi lebih dari sekadar hiburan. Formatnya yang ringkas, visual, dan digerakkan tren semakin membentuk cara audiens muda mengakses informasi.",
  "Create a dedicated short-video news channel": "Membuat kanal berita video singkat khusus",
  "Deliver concise news video within the iNews portal rather than sending users to an unrelated platform.": "Menyajikan video berita ringkas di dalam portal iNews tanpa mengarahkan pengguna ke platform lain.",
  "Support engagement and repeat visits": "Mendukung engagement dan kunjungan berulang",
  "Use interaction, saving, sharing, and discoverability to create more reasons for users to stay and return.": "Menggunakan interaksi, penyimpanan, berbagi, dan kemudahan penemuan agar pengguna memiliki lebih banyak alasan untuk bertahan dan kembali.",
  "Evaluate the complete experience": "Mengevaluasi pengalaman secara menyeluruh",
  "Verify functional behaviour through black-box testing and evaluate usefulness, ease of use, and satisfaction through the USE Questionnaire.": "Memverifikasi fungsi melalui black-box testing serta mengevaluasi kegunaan, kemudahan penggunaan, dan kepuasan melalui USE Questionnaire.",
  "Discovery & Definition": "Penemuan & Perumusan",
  "Research moved the project from a trend assumption to a defined product problem.": "Riset mengubah asumsi tren menjadi permasalahan produk yang terdefinisi.",
  "Five inputs were combined to understand the business context, internal workflow, expected functionality, and eventual user experience.": "Lima sumber informasi digabungkan untuk memahami konteks bisnis, alur kerja internal, fungsi yang diharapkan, dan pengalaman pengguna akhir.",
  "Defence documentation showing interviews, literature review, brainstorming, and questionnaire activities.": "Dokumentasi sidang yang menampilkan wawancara, studi literatur, brainstorming, dan aktivitas kuesioner.",
  "What the organisation needed": "Kebutuhan organisasi",
  "A controlled publishing system that still feels current.": "Sistem publikasi terkendali yang tetap terasa relevan.",
  "A verified editorial path from production to publication": "Alur editorial terverifikasi dari produksi hingga publikasi",
  "YouTube integration without duplicating video hosting": "Integrasi YouTube tanpa menduplikasi hosting video",
  "Content administration, search, filters, and moderation": "Administrasi konten, pencarian, filter, dan moderasi",
  "A solution capable of supporting engagement and page-view goals": "Solusi yang mampu mendukung target engagement dan page view",
  "What the audience needed": "Kebutuhan audiens",
  "Fast access without sacrificing context or trust.": "Akses cepat tanpa mengorbankan konteks atau kepercayaan.",
  "Short, visual news that is easy to scan and understand": "Berita singkat dan visual yang mudah dipindai serta dipahami",
  "Simple search and direct video playback": "Pencarian sederhana dan pemutaran video langsung",
  "Clear details before and during viewing": "Detail yang jelas sebelum dan selama menonton",
  "Interaction through likes, comments, saves, and sharing": "Interaksi melalui suka, komentar, simpan, dan bagikan",
  "Primary roles": "Peran utama",
  "Admin + Public user": "Admin + Pengguna publik",
  "Environment": "Lingkungan",
  "Modern desktop browsers": "Browser desktop modern",
  "Architecture": "Arsitektur",
  "Client-server web system": "Sistem web client-server",
  "Content source": "Sumber konten",
  "iNews YouTube embeds": "Embed YouTube iNews",
  "Product & System Design": "Desain Produk & Sistem",
  "The experience connects newsroom control with public participation.": "Pengalaman ini menghubungkan kendali ruang redaksi dengan partisipasi publik.",
  "The design is not only a set of screens. It translates the editorial workflow, two user roles, content priorities, and interaction requirements into one coherent system.": "Desain ini bukan sekadar kumpulan layar. Desain menerjemahkan alur editorial, dua peran pengguna, prioritas konten, dan kebutuhan interaksi menjadi satu sistem yang koheren.",
  "Administrator": "Administrator",
  "The editorial side manages verified video content and platform safety.": "Sisi editorial mengelola konten video terverifikasi dan keamanan platform.",
  "Public User": "Pengguna Publik",
  "The audience side supports discovery, viewing, interaction, and personal content management.": "Sisi audiens mendukung penemuan, penayangan, interaksi, dan pengelolaan konten pribadi.",
  "Editorial workflow": "Alur editorial",
  "From newsroom idea to public interaction.": "Dari ide ruang redaksi hingga interaksi publik.",
  "The workflow begins with topic selection and script approval, continues through research, storyboard, production, editing, review, and YouTube upload, then moves into administrator publication and public engagement on iNews Byte.": "Alur dimulai dari pemilihan topik dan persetujuan naskah, dilanjutkan dengan riset, storyboard, produksi, penyuntingan, peninjauan, dan unggahan YouTube, kemudian berlanjut ke publikasi admin serta engagement publik di iNews Byte.",
  "Use-case architecture": "Arsitektur use case",
  "Two actors with clearly separated responsibilities.": "Dua aktor dengan tanggung jawab yang terpisah jelas.",
  "The use-case diagram documents administrator content management and moderation alongside public discovery, interaction, profile management, and saved-content access.": "Diagram use case mendokumentasikan pengelolaan konten dan moderasi oleh admin, serta penemuan, interaksi, pengelolaan profil, dan akses konten tersimpan oleh publik.",
  "Homepage": "Homepage",
  "A discoverable video grid inside a familiar iNews structure.": "Grid video yang mudah ditemukan dalam struktur iNews yang familiar.",
  "The homepage retains the iNews logo, search, login, categories, and advertising areas, then introduces iNews Byte through a dedicated section and video cards containing thumbnails, titles, categories, and duration.": "Homepage mempertahankan logo iNews, pencarian, login, kategori, dan area iklan, kemudian memperkenalkan iNews Byte melalui bagian khusus dan kartu video yang memuat thumbnail, judul, kategori, serta durasi.",
  "Familiar portal navigation": "Navigasi portal yang familiar",
  "728 × 90 and 970 × 250 advertising placements": "Penempatan iklan 728 × 90 dan 970 × 250",
  "Scannable video metadata and direct selection": "Metadata video yang mudah dipindai dan pilihan langsung",
  "Video Detail": "Detail Video",
  "Context, playback, and interaction stay on one page.": "Konteks, pemutaran, dan interaksi berada dalam satu halaman.",
  "The detail view combines a video player, title, publication information, concise description, engagement metrics, sharing, saving, and discussion.": "Tampilan detail menggabungkan pemutar video, judul, informasi publikasi, deskripsi ringkas, metrik engagement, berbagi, menyimpan, dan diskusi.",
  "Direct playback without leaving the portal": "Pemutaran langsung tanpa meninggalkan portal",
  "Context before and during viewing": "Konteks sebelum dan selama menonton",
  "Like, comment, save, and share actions": "Aksi suka, komentar, simpan, dan bagikan",
  "Presentation evidence showing the homepage and detailed video interface explored during the design stage.": "Bukti presentasi yang menampilkan homepage dan antarmuka detail video yang dieksplorasi pada tahap desain.",
  "Six iterations turned the concept into one working system.": "Enam iterasi mengubah konsep menjadi satu sistem yang berfungsi.",
  "The build moved from secure access and publishing to discovery, interaction, personalisation, and refinement.": "Pengembangan bergerak dari akses aman dan publikasi menuju penemuan, interaksi, personalisasi, dan penyempurnaan.",
  "Project documentation: the implementation plan organised features by iteration and priority.": "Dokumentasi proyek: rencana implementasi mengatur fitur berdasarkan iterasi dan prioritas.",
  "Project evidence": "Bukti proyek",
  "Design, planning, and demonstration were documented throughout the project.": "Desain, perencanaan, dan demonstrasi didokumentasikan sepanjang proyek.",
  "Selected slides are included as supporting evidence without forcing the reader through the full academic presentation.": "Slide terpilih disertakan sebagai bukti pendukung tanpa mengharuskan pembaca menelusuri seluruh presentasi akademik.",
  "The system was tested for both functional reliability and user experience.": "Sistem diuji dari sisi keandalan fungsi dan pengalaman pengguna.",
  "Black-box testing checked whether each feature produced the expected result, while the USE Questionnaire measured usefulness, ease of use, and satisfaction after respondents completed realistic tasks.": "Black-box testing memeriksa apakah setiap fitur menghasilkan keluaran yang diharapkan, sedangkan USE Questionnaire mengukur kegunaan, kemudahan penggunaan, dan kepuasan setelah responden menyelesaikan tugas yang realistis.",
  "Admin scenarios passed": "Skenario admin berhasil",
  "Public-user scenarios passed": "Skenario pengguna publik berhasil",
  "Tasks completed before survey": "Tugas selesai sebelum survei",
  "USE statements rated": "Pernyataan USE yang dinilai",
  "Search for a news video": "Mencari video berita",
  "Play and review a video story": "Memutar dan meninjau video berita",
  "Like the selected video": "Menyukai video terpilih",
  "Save content for later": "Menyimpan konten untuk dilihat nanti",
  "Share a news video": "Membagikan video berita",
  "Submit a comment": "Mengirim komentar",
  "The 20 respondents represented students, workers, and members of the public who had used digital news platforms for at least six months. Each rated nine statements on a five-point Likert scale.": "Dua puluh responden terdiri atas mahasiswa, pekerja, dan masyarakat umum yang telah menggunakan platform berita digital setidaknya selama enam bulan. Setiap responden menilai sembilan pernyataan menggunakan skala Likert lima poin.",
  "All documented administrator and public-user scenarios produced the expected result.": "Seluruh skenario admin dan pengguna publik yang didokumentasikan menghasilkan keluaran sesuai harapan.",
  "Result interpretation": "Interpretasi hasil",
  "Ease of Use led the evaluation, while Usefulness revealed the clearest improvement opportunity.": "Kemudahan Penggunaan memperoleh hasil tertinggi, sedangkan Kegunaan menunjukkan peluang perbaikan yang paling jelas.",
  "The combined usability score reached 95.22%, placing the system in a very-high category. The result validates the experience quality, but it does not yet prove an increase in production page views because the project was evaluated as a locally deployed system rather than a live commercial rollout.": "Skor usability gabungan mencapai 95,22% dan menempatkan sistem dalam kategori sangat tinggi. Hasil ini memvalidasi kualitas pengalaman, tetapi belum membuktikan peningkatan page view produksi karena proyek dievaluasi melalui deployment lokal, bukan peluncuran komersial langsung.",
  "Presentation evidence summarising the USE Questionnaire and the three evaluated dimensions.": "Bukti presentasi yang merangkum USE Questionnaire dan tiga dimensi yang dievaluasi.",
  "The strongest result was not a single screen—it was a complete, validated product flow.": "Hasil terkuatnya bukan satu layar, melainkan alur produk lengkap yang telah divalidasi.",
  "iNews Byte connected verified editorial production, administrator publishing, public discovery, interaction, personalisation, and evaluation within one coherent web system.": "iNews Byte menghubungkan produksi editorial terverifikasi, publikasi admin, penemuan publik, interaksi, personalisasi, dan evaluasi dalam satu sistem web yang koheren.",
  "What the project demonstrated": "Hal yang dibuktikan proyek",
  "End-to-end product ownership": "Kepemilikan produk secara menyeluruh",
  "Research, requirements, interface design, system logic, implementation, and evaluation were treated as one connected process.": "Riset, kebutuhan, desain antarmuka, logika sistem, implementasi, dan evaluasi diperlakukan sebagai satu proses yang saling terhubung.",
  "Credibility can shape interaction design": "Kredibilitas dapat membentuk desain interaksi",
  "The product adopted short-video behaviour without removing the editorial workflow that differentiates professional news media.": "Produk mengadopsi perilaku video singkat tanpa menghilangkan alur editorial yang membedakan media berita profesional.",
  "Validation must follow implementation": "Validasi harus mengikuti implementasi",
  "Functional testing confirmed reliability, while usability testing showed how the experience was perceived by actual users.": "Pengujian fungsi mengonfirmasi keandalan, sedangkan usability testing menunjukkan bagaimana pengalaman dipersepsikan oleh pengguna nyata.",
  "Recommended next steps": "Langkah lanjutan yang disarankan",
  "Relevant notifications": "Notifikasi yang relevan",
  "Notify users about new stories in preferred categories or currently trending videos.": "Memberi tahu pengguna tentang berita baru dalam kategori pilihan atau video yang sedang tren.",
  "Mobile optimisation": "Optimasi mobile",
  "Prioritise a fully responsive experience across screen sizes because news consumption is heavily mobile.": "Memprioritaskan pengalaman yang sepenuhnya responsif pada berbagai ukuran layar karena konsumsi berita sangat dominan melalui perangkat mobile.",
  "Production-impact measurement": "Pengukuran dampak produksi",
  "After a live rollout, compare page views, watch behaviour, return visits, and interaction rates against the original portal baseline.": "Setelah peluncuran langsung, membandingkan page view, perilaku menonton, kunjungan kembali, dan tingkat interaksi dengan baseline portal awal.",
  "Final outcome": "Hasil akhir",
  "Verified news, redesigned around the behaviour of a new digital audience.": "Berita terverifikasi yang dirancang ulang berdasarkan perilaku audiens digital baru.",
  "The final system delivered a functional short-video news channel with editorial management, public interaction, and a very-high usability result—while clearly identifying the work still required before measuring real business impact.": "Sistem akhir menghadirkan kanal berita video singkat yang berfungsi, dilengkapi pengelolaan editorial, interaksi publik, dan hasil usability sangat tinggi, sekaligus mengidentifikasi pekerjaan yang masih diperlukan sebelum mengukur dampak bisnis nyata.",
  "Open final report": "Buka laporan akhir",
  "System role": "Peran sistem",
  "Build at a glance": "Ringkasan pengembangan",
  "A staged build that kept each release functional and reviewable.": "Pengembangan bertahap yang menjaga setiap rilis tetap berfungsi dan dapat ditinjau.",
  "Iterations": "Iterasi",
  "Weeks": "Minggu",
  "Technologies": "Teknologi",
  "Flows passed": "Alur berhasil",
  "Technology stack": "Technology stack",
  "Iteration": "Iterasi",
  "USE Questionnaire results": "Hasil USE Questionnaire",
  "Combined usability": "Usability gabungan",
  "Choose language": "Pilih bahasa",
};

function translateCopy(value: string, language: Language): string {
  return language === "id" ? INDONESIAN_COPY[value] ?? value : value;
}

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  tr: (value: string) => string;
};

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

const NAV_ITEMS = [
  { number: "00", label: "Overview", href: "#overview" },
  { number: "01", label: "Context", href: "#context" },
  { number: "02", label: "Discovery", href: "#discovery" },
  { number: "03", label: "Product Design", href: "#design" },
  { number: "04", label: "Build Journey", href: "#development" },
  { number: "05", label: "Validation", href: "#testing" },
  { number: "06", label: "Reflection", href: "#summary" },
];

const OVERVIEW_STATS = [
  { value: "6", label: "Agile iterations" },
  { value: "20", label: "Usability respondents" },
  { value: "20/20", label: "Functional scenarios passed" },
  { value: "95.22%", label: "Overall usability score" },
];

const RESEARCH_METHODS = [
  {
    number: "01",
    title: "Observation",
    text: "Reviewed the existing iNews portal, page-view movement, and the shift toward short-form news consumption.",
  },
  {
    number: "02",
    title: "Literature review",
    text: "Studied academic journals, industry reports, and digital-trend references related to short video, engagement, and usability.",
  },
  {
    number: "03",
    title: "Internal interviews",
    text: "Gathered expectations and system requirements from iNews product, UI/UX, and IT teams.",
  },
  {
    number: "04",
    title: "Brainstorming",
    text: "Translated findings into feature priorities, interface directions, system flows, and implementation decisions.",
  },
  {
    number: "05",
    title: "Questionnaire",
    text: "Evaluated the completed experience with 20 respondents using the USE Questionnaire.",
  },
];

const ADMIN_FEATURES = [
  "Authenticate and securely end a session",
  "View, search, and filter published videos",
  "Add videos using YouTube embed links",
  "Review complete video information",
  "Edit and remove video content",
  "Moderate inappropriate user comments",
];

const USER_FEATURES = [
  "Register, log in, and manage a profile",
  "Browse and search short-form news videos",
  "Open a complete video-detail experience",
  "Like, comment, save, and share content",
  "Return to a personal saved-video dashboard",
  "Log out securely after completing a session",
];

const PRODUCT_PRINCIPLES = [
  {
    number: "01",
    title: "Fast to understand",
    text: "Short video, concise titles, clear metadata, and direct playback reduce the effort required to access news.",
  },
  {
    number: "02",
    title: "Verified by design",
    text: "Content remains connected to the iNews editorial process instead of behaving like unverified social-media uploads.",
  },
  {
    number: "03",
    title: "Built for participation",
    text: "Likes, comments, saves, and sharing turn passive reading into a more interactive news experience.",
  },
];

const TECH_STACK = [
  { label: "HTML", icon: Code2 },
  { label: "CSS", icon: Code2 },
  { label: "JavaScript", icon: Code2 },
  { label: "PHP", icon: Server },
  { label: "CodeIgniter 4", icon: Server },
  { label: "MySQL", icon: Database },
  { label: "YouTube Embed", icon: Youtube },
];

const ITERATIONS = [
  {
    number: "01",
    weeks: "Weeks 1-2",
    title: "Authentication foundation",
    text: "Built admin and public login, registration, session validation, password protection, and secure logout.",
    outcome: "Secure access for both system roles.",
  },
  {
    number: "02",
    weeks: "Weeks 3-4",
    title: "Editorial content management",
    text: "Created the admin video list, add, edit, detail, validation, and delete flows.",
    outcome: "One workspace for editorial publishing.",
  },
  {
    number: "03",
    weeks: "Weeks 5-6",
    title: "Public discovery and playback",
    text: "Built the public video grid, detail view, playback, likes, and sharing.",
    outcome: "Verified news became easier to discover and distribute.",
  },
  {
    number: "04",
    weeks: "Weeks 7-8",
    title: "Content search",
    text: "Added keyword search for both administrator and public views.",
    outcome: "Relevant stories became faster to find.",
  },
  {
    number: "05",
    weeks: "Weeks 9-10",
    title: "Conversation and personalisation",
    text: "Added comments, saving, and a bookmarked-video dashboard.",
    outcome: "The product supported interaction and return visits.",
  },
  {
    number: "06",
    weeks: "Weeks 11-12",
    title: "Profile, moderation, and refinement",
    text: "Completed profile editing, comment moderation, integration review, and stability checks.",
    outcome: "All core flows worked as one connected system.",
  },
];

const FEATURE_STORIES = [
  {
    eyebrow: "Editorial workspace",
    title: "A structured path from YouTube upload to iNews publication.",
    description:
      "Administrators can authenticate, review the video library, add a YouTube embed link, complete the required metadata, edit existing content, and remove content when necessary.",
    points: [
      "Clear content-management hierarchy",
      "Form validation for complete publishing data",
      "Search, filters, detail review, and moderation",
    ],
    primaryImage: "/images/inews-byte/features/video-admin.png",
    secondaryImage: "/images/inews-byte/features/add-video.png",
    reverse: false,
  },
  {
    eyebrow: "Public discovery",
    title: "Familiar portal patterns make short video easy to browse.",
    description:
      "The public experience keeps familiar iNews navigation while introducing a dedicated video grid with thumbnails, categories, durations, and a direct path into the complete story.",
    points: [
      "Searchable short-video grid",
      "Recognisable iNews structure and advertising spaces",
      "Clear transition from discovery to playback",
    ],
    primaryImage: "/images/inews-byte/features/home-user.png",
    secondaryImage: "/images/inews-byte/features/detail-video.png",
    reverse: true,
  },
  {
    eyebrow: "Engagement and return visits",
    title: "Interaction continues after the video finishes.",
    description:
      "Users can respond through likes and comments, share a video, save it for later, revisit saved content, and update their account information.",
    points: [
      "Like, comment, save, and share",
      "Personal saved-video dashboard",
      "Profile control and secure logout",
    ],
    primaryImage: "/images/inews-byte/features/comments.png",
    secondaryImage: "/images/inews-byte/features/saved-video.png",
    reverse: false,
  },
];

const USE_RESULTS = [
  {
    value: "93.33%",
    average: "4.67 / 5",
    label: "Usefulness",
    description:
      "Respondents considered iNews Byte a useful and efficient alternative for understanding news quickly.",
  },
  {
    value: "96.33%",
    average: "4.82 / 5",
    label: "Ease of Use",
    description:
      "The highest result indicates that navigation and core interactions were clear without additional guidance.",
  },
  {
    value: "96.00%",
    average: "4.80 / 5",
    label: "Satisfaction",
    description:
      "Respondents reported a comfortable experience and willingness to use the feature again.",
  },
];

const EVIDENCE_GALLERY = [
  {
    src: "/images/inews-byte/evidence/agile-framework.png",
    label: "Agile framework used to organise the complete project",
  },
  {
    src: "/images/inews-byte/evidence/wireframe-evidence.png",
    label: "Homepage and detail-view design documentation",
  },
  {
    src: "/images/inews-byte/evidence/iteration-plan.png",
    label: "Six-iteration development planning",
  },
  {
    src: "/images/inews-byte/evidence/demo-documentation.png",
    label: "System demonstration documentation",
  },
];

function INewsByteCaseStudy() {
  const pageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState("overview");
  const [language, setLanguage] = useState<Language>("en");
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

  const heroY = useTransform(scrollYProgress, [0, 0.18], [0, -120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0.18]);

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("inews-byte-language");
    if (savedLanguage === "en" || savedLanguage === "id") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("inews-byte-language", language);
    document.documentElement.lang = language === "id" ? "id" : "en";
  }, [language]);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector<HTMLElement>(item.href),
    ).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -60% 0px",
        threshold: [0.08, 0.2, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, tr }}>
      <div
        ref={pageRef}
        className={`relative overflow-clip bg-bg text-text-primary ${
          isDark
            ? ""
            : "bg-white text-slate-950 [&_.text-muted]:text-slate-600 [&_.text-text-secondary]:text-slate-700 [&_.text-text-primary]:text-slate-950 [&_.border-stroke]:border-slate-200 [&_.bg-bg]:bg-white [&_.bg-surface]:bg-white [&_.bg-surface-elevated]:bg-white"
        }`}
      >
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScale }}
        className={`fixed inset-x-0 top-0 z-[100] h-[2px] origin-left ${
          isDark
            ? "bg-gradient-to-r from-red-600 via-rose-500 to-orange-400"
            : "bg-red-700"
        }`}
      />

      <header className="fixed inset-x-0 top-0 z-[80] px-4 pt-4 md:px-7 md:pt-6">
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-stroke bg-surface/85 px-3 py-2 backdrop-blur-2xl md:px-4 ${
            isDark
              ? "shadow-[0_16px_58px_rgba(0,0,0,0.56),inset_0_1px_0_rgba(255,255,255,0.07)]"
              : "!border-white/70 !bg-white/[0.58] shadow-[0_18px_48px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.92)]"
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
            {tr("iNews Byte · Product Design & Development")}
          </span>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center rounded-full border p-1 backdrop-blur-xl ${
                isDark
                  ? "border-white/10 bg-white/[0.04]"
                  : "border-white/70 bg-white/[0.42] shadow-[inset_0_1px_0_rgba(255,255,255,0.86)]"
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
                    className={`rounded-full px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition ${
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
          </div>
        </div>
      </header>

      <section className="relative min-h-[100svh] overflow-hidden bg-[#050505]">
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { y: heroY, opacity: heroOpacity }
          }
          className="absolute inset-0"
        >
          {prefersReducedMotion ? (
  <img
    src="/images/inews-byte/hero/inews-byte-hero.png"
    alt="iNews Byte short-form news platform"
    className="h-full w-full object-cover object-center"
  />
) : (
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    poster="/images/inews-byte/hero/inews-byte-hero.png"
    aria-hidden="true"
    className="h-full w-full object-cover object-center"
  >
    <source
      src="/videos/inews-byte/inews-byte-hero.mp4"
      type="video/mp4"
    />
  </video>
)}
        </motion.div>

        <div className="absolute inset-0 bg-black/66" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(220,38,38,0.28),transparent_32%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/95" />

        {!prefersReducedMotion && (
          <>
            <motion.div
              aria-hidden="true"
              animate={{
                x: [0, 42, 0],
                y: [0, -28, 0],
                opacity: [0.18, 0.34, 0.18],
              }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-[12%] top-[22%] h-52 w-52 rounded-full bg-red-500/20 blur-[110px]"
            />
            <motion.div
              aria-hidden="true"
              animate={{
                x: [0, -30, 0],
                y: [0, 24, 0],
                opacity: [0.12, 0.24, 0.12],
              }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[8%] left-[24%] h-44 w-44 rounded-full bg-orange-400/15 blur-[100px]"
            />
          </>
        )}

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1440px] items-end px-6 pb-20 pt-32 md:px-10 md:pb-24 lg:px-16">
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 34, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-6xl"
          >
            <p className="text-[9px] uppercase tracking-[0.42em] text-red-300/80 md:text-[10px]">
              {tr("Final Project · Product Design · Web Development")}
            </p>

            <h1 className="mt-5 max-w-5xl text-[clamp(4rem,8vw,7.4rem)] leading-[0.86] tracking-[-0.07em] text-white">
              iNews
              <span className="font-display italic text-red-400"> Byte.</span>
            </h1>

            <p className="mt-6 max-w-3xl text-[15px] leading-7 text-white/70 md:text-lg md:leading-8">
              {tr("Reframing verified journalism for an audience shaped by short, visual, and interactive news.")}
            </p>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {[
                "Research",
                "UI/UX",
                "Agile Development",
                "CodeIgniter 4",
                "USE Questionnaire",
              ].map((item, index) => (
                <motion.span
                  key={tr(item)}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 + index * 0.07, duration: 0.45 }}
                  className="rounded-full border border-white/12 bg-white/[0.045] px-3.5 py-1.5 text-[10px] text-white/65 backdrop-blur-md"
                >
                  {tr(item)}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <a
          href="#overview"
          aria-label="Scroll to iNews Byte project overview"
          className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 text-xs uppercase tracking-[0.24em] text-white/50 transition hover:text-red-300 md:flex"
        >
          {tr("Read the story")}
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/30">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </section>

      <div className={`mx-auto grid max-w-[1440px] ${isDark ? "" : "bg-white"} lg:grid-cols-[230px_minmax(0,1fr)]`}>
        <aside className="hidden border-r border-stroke px-6 lg:block">
          <div className="sticky top-32 py-24">
            <p className="text-[9px] uppercase tracking-[0.32em] text-muted">
              {tr("Project Journey")}
            </p>

            <nav className="mt-7 space-y-2">
              {NAV_ITEMS.map((item) => {
                const id = item.href.replace("#", "");
                const isActive = activeSection === id;

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs transition ${
                      isActive
                        ? isDark
                          ? "bg-red-500/10 text-text-primary"
                          : "text-slate-950"
                        : isDark
                          ? "text-muted hover:bg-red-500/[0.07] hover:text-text-primary"
                          : "text-slate-500 hover:text-slate-950"
                    }`}
                  >
                    <motion.span
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0.35 }}
                      className="absolute -left-6 h-7 w-[2px] origin-center rounded-full bg-red-500"
                    />
                    <span
                      className={`font-display italic transition ${
                        isActive ? "text-red-500" : "text-red-500/60"
                      }`}
                    >
                      {item.number}
                    </span>
                    {tr(item.label)}
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
                eyebrow={tr("Project Overview")}
                title={tr("A news portal response to the short-video era.")}
                description={tr("A desktop short-video channel that brings verified news into the existing iNews ecosystem.")}
              />
            </Reveal>

            <div className="mt-11 max-w-4xl space-y-5 text-[15px] leading-8 text-text-secondary md:text-base">
              <Reveal>
                <p>
                  {tr("I handled the project end to end—from research and requirements to interface design, development, and evaluation.")}
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <p>
                  {tr("The core tension was simple: iNews needed to protect newsroom credibility while adapting to audiences who expect information to be concise, visual, and immediately interactive.")}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <p>
                  {tr("Instead of copying a social feed, iNews Byte connects topic planning, production, YouTube upload, administrator publishing, and public interaction in one structured product flow.")}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <motion.blockquote
                whileHover={prefersReducedMotion ? undefined : { x: 8 }}
                transition={{ duration: 0.35 }}
                className="mt-11 max-w-4xl border-l border-red-500/80 pl-6 font-display text-[clamp(1.65rem,3vw,2.5rem)] italic leading-[1.3] text-text-primary"
              >
                {tr("How might iNews make verified news feel as immediate as short-form social video without losing editorial control?")}
              </motion.blockquote>
            </Reveal>

            <Reveal delay={0.08}>
              <dl className="mt-14 grid gap-x-8 gap-y-8 border-y border-stroke py-8 sm:grid-cols-2 xl:grid-cols-5">
                <ProjectFact label="Organisation" value="iNews Media Group" />
                <ProjectFact label="Project" value="Final Project · 2025" />
                <ProjectFact
                  label="Role"
                  value="Research · UI/UX · Development · Testing"
                />
                <ProjectFact
                  label="Collaboration"
                  value="Product · UI/UX · IT · Editorial"
                />
                <ProjectFact
                  label="Platform"
                  value="Desktop web · Local deployment"
                />
              </dl>
            </Reveal>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {OVERVIEW_STATS.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.05}>
                  <StatCard value={stat.value} label={stat.label} />
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.08}>
              <figure className="group mt-14 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 md:p-4">
                <div className="overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/images/inews-byte/evidence/demo-documentation.png"
                    alt="iNews Byte system demonstration presented during the final-project defence"
                    className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.018]"
                  />
                </div>
                <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-muted md:px-4">
                  {tr("The working system was demonstrated during the final-project presentation.")}
                </figcaption>
              </figure>
            </Reveal>
          </section>

          <section
            id="context"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="01"
                eyebrow={tr("Context & Challenge")}
                title={tr("The portal was competing for attention, not only for credibility.")}
                description={tr("The research showed a widening gap between traditional portal behaviour and the fast, visual patterns increasingly preferred by Gen Z and Millennial audiences.")}
              />
            </Reveal>

            <div className="mt-16 grid gap-14 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                    {tr("iNews page-view movement")}
                  </p>
                  <div className="mt-8 space-y-7">
                    {[
                      { month: "Aug 2024", value: "13.05M", width: "99.8%" },
                      { month: "Oct 2024", value: "13.08M", width: "100%" },
                      { month: "Dec 2024", value: "12.95M", width: "99%" },
                    ].map((item, index) => (
                      <div key={tr(item.month)}>
                        <div className="flex items-end justify-between gap-4">
                          <span className="text-sm text-muted">{tr(item.month)}</span>
                          <span className="text-2xl tracking-[-0.04em] text-text-primary">
                            {item.value}
                          </span>
                        </div>
                        <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-stroke">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: 0.1 + index * 0.1,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{ width: item.width }}
                            className="h-full origin-left bg-gradient-to-r from-red-600 to-orange-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-7 text-sm leading-7 text-muted">
                    {tr("The data did not show a dramatic collapse, but it revealed stagnation followed by a decline—an important signal in a media business where attention and page views affect reach and advertising value.")}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="border-l border-stroke pl-7 md:pl-10">
                  <span className="font-display text-6xl italic text-red-500 md:text-8xl">
                    29h
                  </span>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-muted">
                    {tr("average monthly TikTok usage in 2023")}
                  </p>

                  <div className="my-9 flex items-center gap-4">
                    <span className="h-px flex-1 bg-stroke" />
                    <ArrowUpRight className="h-5 w-5 text-red-500" />
                  </div>

                  <span className="font-display text-6xl italic text-red-500 md:text-8xl">
                    38h 26m
                  </span>
                  <p className="mt-2 text-sm uppercase tracking-[0.22em] text-muted">
                    {tr("average monthly TikTok usage in 2024")}
                  </p>

                  <p className="mt-8 text-base leading-8 text-text-secondary">
                    {tr("Short video had become more than entertainment. Its concise, visual, and trend-driven format increasingly shaped how younger audiences accessed information.")}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="mt-20 border-y border-stroke">
              {[
                {
                  number: "01",
                  title: "Create a dedicated short-video news channel",
                  text: "Deliver concise news video within the iNews portal rather than sending users to an unrelated platform.",
                },
                {
                  number: "02",
                  title: "Support engagement and repeat visits",
                  text: "Use interaction, saving, sharing, and discoverability to create more reasons for users to stay and return.",
                },
                {
                  number: "03",
                  title: "Evaluate the complete experience",
                  text: "Verify functional behaviour through black-box testing and evaluate usefulness, ease of use, and satisfaction through the USE Questionnaire.",
                },
              ].map((objective, index) => (
                <Reveal key={objective.number} delay={index * 0.05}>
                  <div className="grid gap-5 border-b border-stroke py-8 last:border-b-0 md:grid-cols-[90px_0.8fr_1.2fr] md:items-start">
                    <span className="font-display text-3xl italic text-red-500">
                      {objective.number}
                    </span>
                    <h3 className="text-xl leading-7 tracking-[-0.03em] text-text-primary md:text-2xl">
                      {tr(objective.title)}
                    </h3>
                    <p className="text-sm leading-7 text-muted">
                      {tr(objective.text)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section
            id="discovery"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="02"
                eyebrow={tr("Discovery & Definition")}
                title={tr("Research moved the project from a trend assumption to a defined product problem.")}
                description={tr("Five inputs were combined to understand the business context, internal workflow, expected functionality, and eventual user experience.")}
              />
            </Reveal>

            <div className="mt-16 grid gap-14 xl:grid-cols-[0.9fr_1.1fr]">
              <Reveal>
                <figure className="sticky top-32 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3">
                  <img
                    src="/images/inews-byte/evidence/research-methods.png"
                    alt="Research methods slide from the iNews Byte final-project defence"
                    className="aspect-[16/9] w-full rounded-[1.5rem] object-contain"
                  />
                  <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-muted">
                    {tr("Defence documentation showing interviews, literature review, brainstorming, and questionnaire activities.")}
                  </figcaption>
                </figure>
              </Reveal>

              <ResearchTimeline />
            </div>

            <div className="mt-20 grid gap-12 border-y border-stroke py-14 xl:grid-cols-2">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                    {tr("What the organisation needed")}
                  </p>
                  <h3 className="mt-4 text-3xl tracking-[-0.04em] text-text-primary">
                    {tr("A controlled publishing system that still feels current.")}
                  </h3>
                  <div className="mt-8 space-y-4">
                    {[
                      "A verified editorial path from production to publication",
                      "YouTube integration without duplicating video hosting",
                      "Content administration, search, filters, and moderation",
                      "A solution capable of supporting engagement and page-view goals",
                    ].map((item) => (
                      <LineItem key={item}>{item}</LineItem>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                    {tr("What the audience needed")}
                  </p>
                  <h3 className="mt-4 text-3xl tracking-[-0.04em] text-text-primary">
                    {tr("Fast access without sacrificing context or trust.")}
                  </h3>
                  <div className="mt-8 space-y-4">
                    {[
                      "Short, visual news that is easy to scan and understand",
                      "Simple search and direct video playback",
                      "Clear details before and during viewing",
                      "Interaction through likes, comments, saves, and sharing",
                    ].map((item) => (
                      <LineItem key={item}>{item}</LineItem>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <div className="mt-14 grid gap-5 md:grid-cols-4">
                <ScopeItem label="Primary roles" value="Admin + Public user" />
                <ScopeItem label="Environment" value="Modern desktop browsers" />
                <ScopeItem label="Architecture" value="Client-server web system" />
                <ScopeItem label="Content source" value="iNews YouTube embeds" />
              </div>
            </Reveal>
          </section>

          <section
            id="design"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="03"
                eyebrow={tr("Product & System Design")}
                title={tr("The experience connects newsroom control with public participation.")}
                description={tr("The design is not only a set of screens. It translates the editorial workflow, two user roles, content priorities, and interaction requirements into one coherent system.")}
              />
            </Reveal>

            <div className="mt-16 border-y border-stroke">
              {PRODUCT_PRINCIPLES.map((principle, index) => (
                <Reveal key={principle.number} delay={index * 0.05}>
                  <div className="grid gap-5 border-b border-stroke py-9 last:border-b-0 md:grid-cols-[90px_0.9fr_1.1fr] md:items-start">
                    <span className="font-display text-3xl italic text-red-500">
                      {principle.number}
                    </span>
                    <h3 className="text-2xl tracking-[-0.03em] text-text-primary">
                      {tr(principle.title)}
                    </h3>
                    <p className="text-sm leading-7 text-muted">
                      {tr(principle.text)}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-20 grid gap-14 xl:grid-cols-2">
              <RoleColumn
                title="Administrator"
                description="The editorial side manages verified video content and platform safety."
                items={ADMIN_FEATURES}
                icon={Upload}
              />
              <RoleColumn
                title="Public User"
                description="The audience side supports discovery, viewing, interaction, and personal content management."
                items={USER_FEATURES}
                icon={UserRound}
              />
            </div>

            <div className="mt-20 space-y-16">
              <DesignStory
                number="01"
                eyebrow="Editorial workflow"
                title="From newsroom idea to public interaction."
                description="The workflow begins with topic selection and script approval, continues through research, storyboard, production, editing, review, and YouTube upload, then moves into administrator publication and public engagement on iNews Byte."
                image="/images/inews-byte/design/workflow.png"
              />

              <DesignStory
                number="02"
                eyebrow="Use-case architecture"
                title="Two actors with clearly separated responsibilities."
                description="The use-case diagram documents administrator content management and moderation alongside public discovery, interaction, profile management, and saved-content access."
                image="/images/inews-byte/design/use-case.png"
                reverse
              />
            </div>

            <div className="mt-20 grid gap-6 xl:grid-cols-2">
              <InterfaceDecision
                eyebrow="Homepage"
                title="A discoverable video grid inside a familiar iNews structure."
                description="The homepage retains the iNews logo, search, login, categories, and advertising areas, then introduces iNews Byte through a dedicated section and video cards containing thumbnails, titles, categories, and duration."
                image="/images/inews-byte/design/homepage-design.png"
                points={[
                  "Familiar portal navigation",
                  "728 × 90 and 970 × 250 advertising placements",
                  "Scannable video metadata and direct selection",
                ]}
              />

              <InterfaceDecision
                eyebrow="Video Detail"
                title="Context, playback, and interaction stay on one page."
                description="The detail view combines a video player, title, publication information, concise description, engagement metrics, sharing, saving, and discussion."
                image="/images/inews-byte/design/video-detail-design.png"
                points={[
                  "Direct playback without leaving the portal",
                  "Context before and during viewing",
                  "Like, comment, save, and share actions",
                ]}
              />
            </div>

            <Reveal delay={0.1}>
              <figure className="mt-16 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 md:p-4">
                <img
                  src="/images/inews-byte/evidence/wireframe-evidence.png"
                  alt="iNews Byte homepage and detail-view wireframe documentation"
                  className="aspect-[16/9] w-full rounded-[1.5rem] object-cover"
                />
                <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-muted md:px-4">
                  {tr("Presentation evidence showing the homepage and detailed video interface explored during the design stage.")}
                </figcaption>
              </figure>
            </Reveal>
          </section>

          <section
            id="development"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <div className="grid gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.65fr)] xl:items-stretch">
              <Reveal>
                <SectionHeading
                  number="04"
                  eyebrow={tr("Build Journey")}
                  title={tr("Six iterations turned the concept into one working system.")}
                  description={tr("The build moved from secure access and publishing to discovery, interaction, personalisation, and refinement.")}
                />
              </Reveal>

              <Reveal delay={0.08}>
                <BuildSnapshot prefersReducedMotion={Boolean(prefersReducedMotion)} />
              </Reveal>
            </div>

            <BuildTimeline />

            <Reveal delay={0.08}>
              <figure className="mt-16 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 md:p-4">
                <img
                  src="/images/inews-byte/evidence/iteration-plan.png"
                  alt="Six-iteration development plan from the iNews Byte final-project defence"
                  className="aspect-[16/9] w-full rounded-[1.5rem] object-cover"
                />
                <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-muted md:px-4">
                  {tr("Project documentation: the implementation plan organised features by iteration and priority.")}
                </figcaption>
              </figure>
            </Reveal>

            <div className="mt-24 space-y-24">
              {FEATURE_STORIES.map((feature, index) => (
                <FeatureStory key={feature.title} {...feature} index={index} />
              ))}
            </div>

            <Reveal delay={0.08}>
              <div className="mt-20">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                      {tr("Project evidence")}
                    </p>
                    <h3 className="mt-3 max-w-3xl text-3xl tracking-[-0.04em] text-text-primary md:text-4xl">
                      {tr("Design, planning, and demonstration were documented throughout the project.")}
                    </h3>
                  </div>
                  <p className="max-w-md text-sm leading-7 text-muted">
                    {tr("Selected slides are included as supporting evidence without forcing the reader through the full academic presentation.")}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {EVIDENCE_GALLERY.map((item, index) => (
                    <figure
                      key={item.src}
                      className="group overflow-hidden rounded-[1.7rem] border border-stroke bg-surface p-3"
                    >
                      <div className="overflow-hidden rounded-[1.25rem]">
                        <img
                          src={item.src}
                          alt={tr(item.label)}
                          loading="lazy"
                          className="aspect-[16/9] w-full object-cover transition duration-700 group-hover:scale-[1.02]"
                        />
                      </div>
                      <figcaption className="flex items-start justify-between gap-5 px-2 pb-2 pt-4">
                        <span className="text-xs leading-6 text-muted">
                          {tr(item.label)}
                        </span>
                        <span className="font-display text-base italic text-red-500/70">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          <section
            id="testing"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="05"
                eyebrow={tr("Validation")}
                title={tr("The system was tested for both functional reliability and user experience.")}
                description={tr("Black-box testing checked whether each feature produced the expected result, while the USE Questionnaire measured usefulness, ease of use, and satisfaction after respondents completed realistic tasks.")}
              />
            </Reveal>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Reveal>
                <StatCard value="9" label="Admin scenarios passed" />
              </Reveal>
              <Reveal delay={0.04}>
                <StatCard value="11" label="Public-user scenarios passed" />
              </Reveal>
              <Reveal delay={0.08}>
                <StatCard value="6" label="Tasks completed before survey" />
              </Reveal>
              <Reveal delay={0.12}>
                <StatCard value="9" label="USE statements rated" />
              </Reveal>
            </div>

            <div className="mt-16 grid gap-12 xl:grid-cols-[0.8fr_1.2fr] xl:items-start">
              <Reveal>
                <div className="border-y border-stroke">
                  {[
                    {
                      icon: Search,
                      text: "Search for a news video",
                    },
                    {
                      icon: MonitorPlay,
                      text: "Play and review a video story",
                    },
                    {
                      icon: Heart,
                      text: "Like the selected video",
                    },
                    {
                      icon: Bookmark,
                      text: "Save content for later",
                    },
                    {
                      icon: Share2,
                      text: "Share a news video",
                    },
                    {
                      icon: MessageCircle,
                      text: "Submit a comment",
                    },
                  ].map((task) => {
                    const Icon = task.icon;
                    return (
                      <div
                        key={tr(task.text)}
                        className="flex items-center gap-4 border-b border-stroke py-4 last:border-b-0"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-red-500" />
                        <span className="text-sm text-text-secondary">
                          {tr(task.text)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-6 text-sm leading-7 text-muted">
                  {tr("The 20 respondents represented students, workers, and members of the public who had used digital news platforms for at least six months. Each rated nine statements on a five-point Likert scale.")}
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <figure className="overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3">
                  <img
                    src="/images/inews-byte/evidence/blackbox-evidence.png"
                    alt="Black-box testing documentation from the final-project defence"
                    className="aspect-[16/9] w-full rounded-[1.5rem] object-cover"
                  />
                  <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-muted">
                    {tr("All documented administrator and public-user scenarios produced the expected result.")}
                  </figcaption>
                </figure>
              </Reveal>
            </div>

            <div className="mt-20 grid gap-5 lg:grid-cols-3">
              {USE_RESULTS.map((result, index) => (
                <Reveal key={tr(result.label)} delay={index * 0.06}>
                  <UsabilityCard {...result} />
                </Reveal>
              ))}
            </div>

            <div className="mt-12 grid gap-12 xl:grid-cols-[1.1fr_0.9fr] xl:items-center">
              <Reveal>
                <UsabilityBars />
              </Reveal>

              <Reveal delay={0.08}>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                    {tr("Result interpretation")}
                  </p>
                  <h3 className="mt-5 text-4xl leading-tight tracking-[-0.05em] text-text-primary">
                    {tr("Ease of Use led the evaluation, while Usefulness revealed the clearest improvement opportunity.")}
                  </h3>
                  <p className="mt-6 text-sm leading-7 text-muted md:text-base md:leading-8">
                    {tr("The combined usability score reached 95.22%, placing the system in a very-high category. The result validates the experience quality, but it does not yet prove an increase in production page views because the project was evaluated as a locally deployed system rather than a live commercial rollout.")}
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <figure className="mt-16 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 md:p-4">
                <img
                  src="/images/inews-byte/evidence/usability-evidence.png"
                  alt="USE Questionnaire results from the iNews Byte final-project defence"
                  className="aspect-[16/9] w-full rounded-[1.5rem] object-cover"
                />
                <figcaption className="px-3 pb-2 pt-4 text-xs leading-6 text-muted md:px-4">
                  {tr("Presentation evidence summarising the USE Questionnaire and the three evaluated dimensions.")}
                </figcaption>
              </figure>
            </Reveal>
          </section>

          <section
            id="summary"
            className="scroll-mt-32 border-t border-stroke py-24 md:py-32"
          >
            <Reveal>
              <SectionHeading
                number="06"
                eyebrow={tr("Reflection")}
                title={tr("The strongest result was not a single screen—it was a complete, validated product flow.")}
                description={tr("iNews Byte connected verified editorial production, administrator publishing, public discovery, interaction, personalisation, and evaluation within one coherent web system.")}
              />
            </Reveal>

            <div className="mt-16 grid gap-14 xl:grid-cols-[1.08fr_0.92fr]">
              <Reveal>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                    {tr("What the project demonstrated")}
                  </p>
                  <div className="mt-8 space-y-7">
                    <ReflectionPoint
                      icon={Layers3}
                      title="End-to-end product ownership"
                      text="Research, requirements, interface design, system logic, implementation, and evaluation were treated as one connected process."
                    />
                    <ReflectionPoint
                      icon={ShieldCheck}
                      title="Credibility can shape interaction design"
                      text="The product adopted short-video behaviour without removing the editorial workflow that differentiates professional news media."
                    />
                    <ReflectionPoint
                      icon={UsersRound}
                      title="Validation must follow implementation"
                      text="Functional testing confirmed reliability, while usability testing showed how the experience was perceived by actual users."
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="border-l border-stroke pl-7 md:pl-10">
                  <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
                    {tr("Recommended next steps")}
                  </p>
                  <div className="mt-8 space-y-9">
                    <NextStep
                      icon={Bell}
                      number="01"
                      title="Relevant notifications"
                      text="Notify users about new stories in preferred categories or currently trending videos."
                    />
                    <NextStep
                      icon={Smartphone}
                      number="02"
                      title="Mobile optimisation"
                      text="Prioritise a fully responsive experience across screen sizes because news consumption is heavily mobile."
                    />
                    <NextStep
                      icon={BarChart3}
                      number="03"
                      title="Production-impact measurement"
                      text="After a live rollout, compare page views, watch behaviour, return visits, and interaction rates against the original portal baseline."
                    />
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <div
                className={`relative mt-20 overflow-hidden rounded-[2.6rem] bg-surface px-6 py-16 text-center md:px-10 md:py-24 ${
                  isDark
                    ? "border border-red-400/20"
                    : "border border-slate-200 bg-white"
                }`}
              >
                {isDark && (
                  <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[680px] -translate-x-1/2 rounded-full bg-red-500/12 blur-[120px]" />
                )}

                <div className="relative">
                  <Sparkles className="mx-auto h-7 w-7 text-red-500" />

                  <p className="mt-7 text-[9px] uppercase tracking-[0.34em] text-muted">
                    {tr("Final outcome")}
                  </p>

                  <h2 className="mx-auto mt-5 max-w-5xl text-4xl leading-[1.04] tracking-[-0.05em] text-text-primary md:text-6xl">
                    {tr("Verified news, redesigned around the behaviour of a new digital audience.")}
                  </h2>

                  <p className="mx-auto mt-7 max-w-3xl text-sm leading-7 text-muted md:text-base md:leading-8">
                    {tr("The final system delivered a functional short-video news channel with editorial management, public interaction, and a very-high usability result—while clearly identifying the work still required before measuring real business impact.")}
                  </p>

                  <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a
                      href="https://drive.google.com/file/d/1NnSm8Gjz9gVCm2vM-jVK0bOr7ZrGKTT0/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group inline-flex items-center gap-3 rounded-full border border-red-400/30 bg-red-500 px-6 py-3.5 text-sm text-white transition hover:-translate-y-1 hover:bg-red-400 ${
                        isDark ? "shadow-[0_0_28px_rgba(239,68,68,0.28)]" : "shadow-none"
                      }`}
                    >
                      <FileText className="h-4 w-4" />
                      {tr("Open final report")}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>

                    <a
                      href="/#work"
                      className="group inline-flex items-center gap-3 rounded-full border border-stroke bg-surface-elevated px-6 py-3.5 text-sm text-text-secondary transition hover:-translate-y-1 hover:border-red-400/40 hover:text-text-primary"
                    >
                      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      {tr("Back to projects")}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </main>
      </div>
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
  const { tr } = useLanguage();
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="font-display text-xl italic text-red-500">
          {number}
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-8 origin-left bg-red-500/55"
        />
        <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
          {tr(eyebrow)}
        </p>
      </div>

      <h2 className="mt-6 max-w-5xl text-[clamp(2.65rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.05em] text-text-primary">
        {tr(title)}
      </h2>

      <p className="mt-5 max-w-3xl text-[15px] leading-8 text-muted md:text-base">
        {tr(description)}
      </p>
    </div>
  );
}

function ProjectFact({ label, value }: { label: string; value: string }) {
  const { tr } = useLanguage();
  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.25 }}
      className="border-l border-stroke pl-4"
    >
      <dt className="text-[9px] uppercase tracking-[0.23em] text-muted">
        {tr(label)}
      </dt>
      <dd className="mt-2 text-sm leading-6 text-text-primary">{tr(value)}</dd>
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  const { tr } = useLanguage();
  const { isDark } = useTheme();
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative h-full overflow-hidden rounded-[1.4rem] border border-stroke bg-surface p-5 md:p-6"
    >
      <motion.div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl transition duration-500 ${
          isDark ? "bg-red-500/0 group-hover:bg-red-500/15" : "bg-transparent"
        }`}
      />
      <p className="relative text-3xl tracking-[-0.04em] text-text-primary md:text-4xl">
        {tr(value)}
      </p>
      <p className="relative mt-3 text-xs leading-5 text-muted">{tr(label)}</p>
    </motion.article>
  );
}

function ResearchTimeline() {
  const { tr } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.3,
  });

  return (
    <div ref={timelineRef} className="relative pl-12 md:pl-16">
      <div className="absolute bottom-3 left-[13px] top-3 w-px bg-stroke md:left-[17px]" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute bottom-3 left-[13px] top-3 w-px origin-top bg-gradient-to-b from-red-500 via-rose-500 to-orange-400 md:left-[17px]"
      />

      <div className="space-y-14">
        {RESEARCH_METHODS.map((method, index) => (
          <Reveal key={method.number} delay={index * 0.04}>
            <div className="relative">
              <span className="absolute -left-[47px] top-1 flex h-7 w-7 items-center justify-center rounded-full border border-red-400/35 bg-bg font-display text-xs italic text-red-500 md:-left-[61px] md:h-9 md:w-9 md:text-sm">
                {method.number}
              </span>
              <h3 className="text-2xl tracking-[-0.03em] text-text-primary">
                {tr(method.title)}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
                {tr(method.text)}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function LineItem({ children }: { children: ReactNode }) {
  const { tr } = useLanguage();
  const content = typeof children === "string" ? tr(children) : children;
  return (
    <div className="flex items-start gap-4 border-b border-stroke pb-4 last:border-b-0">
      <Check className="mt-1 h-4 w-4 shrink-0 text-red-500" />
      <p className="text-sm leading-7 text-text-secondary">{content}</p>
    </div>
  );
}

function ScopeItem({ label, value }: { label: string; value: string }) {
  const { tr } = useLanguage();
  return (
    <div className="border-l border-stroke pl-4">
      <p className="text-[9px] uppercase tracking-[0.22em] text-muted">
        {tr(label)}
      </p>
      <p className="mt-2 text-sm leading-6 text-text-primary">{tr(value)}</p>
    </div>
  );
}

function RoleColumn({
  title,
  description,
  items,
  icon: Icon,
}: {
  title: string;
  description: string;
  items: string[];
  icon: typeof Upload;
}) {
  const { tr } = useLanguage();
  const { isDark } = useTheme();
  return (
    <Reveal>
      <div className="border-t border-stroke pt-7">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
              {tr("System role")}
            </p>
            <h3 className="mt-4 text-4xl tracking-[-0.05em] text-text-primary">
              {tr(title)}
            </h3>
          </div>
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-red-500 ${
              isDark
                ? "border-red-400/25 bg-red-500/10"
                : "border-slate-200 bg-white"
            }`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-7 text-muted">
          {tr(description)}
        </p>

        <div className="mt-8 border-y border-stroke">
          {items.map((item, index) => (
            <div
              key={item}
              className="grid grid-cols-[42px_1fr] items-start border-b border-stroke py-4 last:border-b-0"
            >
              <span className="font-display text-sm italic text-red-500/65">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm leading-6 text-text-secondary">
                {tr(item)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function DesignStory({
  number,
  eyebrow,
  title,
  description,
  image,
  reverse = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
}) {
  const { tr } = useLanguage();
  return (
    <Reveal>
      <article className="group grid gap-10 xl:grid-cols-12 xl:items-center">
        <div className={reverse ? "xl:order-2 xl:col-span-5" : "xl:col-span-5"}>
          <span className="font-display text-5xl italic text-red-500/80">
            {number}
          </span>
          <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-red-500">
            {tr(eyebrow)}
          </p>
          <h3 className="mt-4 text-4xl leading-tight tracking-[-0.05em] text-text-primary">
            {tr(title)}
          </h3>
          <p className="mt-6 text-sm leading-7 text-muted md:text-base md:leading-8">
            {tr(description)}
          </p>
        </div>

        <figure
          className={`overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 ${
            reverse ? "xl:order-1 xl:col-span-7" : "xl:col-span-7"
          }`}
        >
          <img
            src={image}
            alt={tr(title)}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-[1.5rem] object-contain"
          />
        </figure>
      </article>
    </Reveal>
  );
}

function InterfaceDecision({
  eyebrow,
  title,
  description,
  image,
  points,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  points: string[];
}) {
  const { tr } = useLanguage();
  return (
    <Reveal>
      <article className="h-full overflow-hidden rounded-[2rem] border border-stroke bg-surface">
        <div className="p-3">
          <img
            src={image}
            alt={tr(title)}
            loading="lazy"
            className="aspect-[16/10] w-full rounded-[1.5rem] object-contain"
          />
        </div>
        <div className="border-t border-stroke p-6 md:p-8">
          <p className="text-[9px] uppercase tracking-[0.28em] text-red-500">
            {tr(eyebrow)}
          </p>
          <h3 className="mt-4 text-3xl tracking-[-0.04em] text-text-primary">
            {tr(title)}
          </h3>
          <p className="mt-5 text-sm leading-7 text-muted">{tr(description)}</p>
          <div className="mt-7 space-y-3">
            {points.map((point) => (
              <div key={tr(point)} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-red-500" />
                <span className="text-sm leading-6 text-text-secondary">
                  {tr(point)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function BuildSnapshot({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const { tr } = useLanguage();
  const { isDark } = useTheme();
  const buildMetrics = [
    { value: "06", label: "Iterations" },
    { value: "12", label: "Weeks" },
    { value: "07", label: "Technologies" },
    { value: "20/20", label: "Flows passed" },
  ];

  return (
    <motion.aside
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative h-full min-h-[360px] overflow-hidden rounded-[2rem] border border-stroke bg-surface p-6 md:p-7"
    >
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: 360,
              }
        }
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className={`pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border ${
          isDark ? "border-red-500/15" : "border-slate-200"
        }`}
      />
      <motion.div
        aria-hidden="true"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                rotate: -360,
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className={`pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-dashed ${
          isDark ? "border-orange-400/20" : "border-slate-200"
        }`}
      />
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -right-20 bottom-0 h-52 w-52 rounded-full blur-[90px] ${
          isDark ? "bg-red-500/10" : "bg-transparent"
        }`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-red-500">
              {tr("Build at a glance")}
            </p>
            <p className="mt-3 max-w-xs text-sm leading-7 text-muted">
              {tr("A staged build that kept each release functional and reviewable.")}
            </p>
          </div>
          <span className="font-display text-6xl italic text-red-500/35">
            06
          </span>
        </div>

        <div className="mt-7 grid grid-cols-2 border-y border-stroke">
          {buildMetrics.map((metric, index) => (
            <motion.div
              key={tr(metric.label)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * index, duration: 0.45 }}
              className={`py-5 ${
                index % 2 === 0 ? "border-r border-stroke pr-5" : "pl-5"
              } ${index < 2 ? "border-b border-stroke" : ""}`}
            >
              <p className="text-2xl tracking-[-0.04em] text-text-primary">
                {metric.value}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                {tr(metric.label)}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <p className="text-[9px] uppercase tracking-[0.28em] text-muted">
            {tr("Technology stack")}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {TECH_STACK.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.span
                  key={tr(item.label)}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 + index * 0.045, duration: 0.35 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -3 }}
                  className="inline-flex items-center gap-2 rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-[10px] text-muted"
                >
                  <Icon className="h-3.5 w-3.5 text-red-500" />
                  {tr(item.label)}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function BuildTimeline() {
  const { tr } = useLanguage();
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 72%", "end 58%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.3,
  });

  return (
    <div ref={timelineRef} className="relative mt-16 pl-11 md:pl-20">
      <div className="absolute bottom-4 left-[11px] top-4 w-px bg-stroke md:left-[23px]" />
      <motion.div
        style={{ scaleY: progress }}
        className="absolute bottom-4 left-[11px] top-4 w-px origin-top bg-gradient-to-b from-red-600 via-rose-500 to-orange-400 md:left-[23px]"
      />

      <div className="space-y-12">
        {ITERATIONS.map((iteration, index) => (
          <Reveal key={iteration.number} delay={index * 0.04}>
            <motion.article
              whileHover={{ x: 6 }}
              transition={{ duration: 0.28 }}
              className="group relative grid gap-5 border-b border-stroke pb-11 last:border-b-0 md:grid-cols-[145px_1fr]"
            >
              <span className="absolute -left-[42px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-red-400/40 bg-bg font-display text-[10px] italic text-red-500 md:-left-[68px] md:h-12 md:w-12 md:text-sm">
                {iteration.number}
              </span>

              <div>
                <p className="text-[9px] uppercase tracking-[0.25em] text-muted">
                  {tr(iteration.weeks)}
                </p>
                <span className="mt-3 block font-display text-2xl italic text-red-500/70">
                  {tr("Iteration")} {iteration.number}
                </span>
              </div>

              <div>
                <h3 className="text-2xl tracking-[-0.04em] text-text-primary md:text-[1.75rem]">
                  {tr(iteration.title)}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted md:text-[15px] md:leading-7">
                  {tr(iteration.text)}
                </p>
                <p className="mt-4 flex items-start gap-3 text-sm leading-7 text-text-secondary">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-red-500" />
                  {tr(iteration.outcome)}
                </p>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FeatureStory({
  eyebrow,
  title,
  description,
  points,
  primaryImage,
  secondaryImage,
  reverse,
  index,
}: {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  primaryImage: string;
  secondaryImage: string;
  reverse: boolean;
  index: number;
}) {
  const { tr } = useLanguage();
  const { isDark } = useTheme();
  return (
    <Reveal>
      <article className="group grid gap-10 xl:grid-cols-12 xl:items-center">
        <div
          className={
            reverse ? "xl:order-2 xl:col-span-5" : "xl:col-span-5"
          }
        >
          <span className="font-display text-5xl italic text-red-500/70">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-red-500">
            {tr(eyebrow)}
          </p>
          <h3 className="mt-4 text-4xl leading-tight tracking-[-0.05em] text-text-primary">
            {tr(title)}
          </h3>
          <p className="mt-6 text-sm leading-7 text-muted md:text-base md:leading-8">
            {tr(description)}
          </p>
          <div className="mt-7 space-y-3">
            {points.map((point) => (
              <LineItem key={point}>{point}</LineItem>
            ))}
          </div>
        </div>

        <div
          className={`relative min-h-[430px] ${
            reverse ? "xl:order-1 xl:col-span-7" : "xl:col-span-7"
          }`}
        >
          <div
            className={`absolute inset-x-0 top-0 overflow-hidden rounded-[2rem] border border-stroke bg-surface p-3 ${
              isDark ? "shadow-[0_28px_80px_rgba(0,0,0,0.18)]" : "shadow-none"
            }`}
          >
            <img
              src={primaryImage}
              alt={`${tr(title)} primary interface`}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-[1.5rem] object-cover object-top transition duration-700 group-hover:scale-[1.018]"
            />
          </div>
          <div
            className={`absolute bottom-0 right-0 w-[48%] overflow-hidden rounded-[1.5rem] border border-stroke bg-surface p-2 ${
              isDark ? "shadow-[0_22px_65px_rgba(0,0,0,0.24)]" : "shadow-none"
            }`}
          >
            <img
              src={secondaryImage}
              alt={`${tr(title)} supporting interface`}
              loading="lazy"
              className="aspect-[4/3] w-full rounded-[1.1rem] object-cover object-top transition duration-700 group-hover:-translate-y-1 group-hover:scale-[1.025]"
            />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function UsabilityCard({
  value,
  average,
  label,
  description,
}: {
  value: string;
  average: string;
  label: string;
  description: string;
}) {
  const { tr } = useLanguage();
  return (
    <article className="h-full rounded-[1.7rem] border border-stroke bg-surface p-6 md:p-7">
      <div className="flex items-start justify-between gap-5">
        <p className="text-4xl tracking-[-0.05em] text-red-500 md:text-5xl">
          {value}
        </p>
        <span className="rounded-full border border-stroke bg-surface-elevated px-3 py-1.5 text-[10px] text-muted">
          {average}
        </span>
      </div>
      <h3 className="mt-7 text-xl text-text-primary">{tr(label)}</h3>
      <p className="mt-4 text-sm leading-7 text-muted">{tr(description)}</p>
    </article>
  );
}

function UsabilityBars() {
  const { tr } = useLanguage();
  return (
    <div className="border-y border-stroke py-9">
      <div className="flex items-center gap-3">
        <BarChart3 className="h-5 w-5 text-red-500" />
        <p className="text-[9px] uppercase tracking-[0.3em] text-muted">
          {tr("USE Questionnaire results")}
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {USE_RESULTS.map((result, index) => (
          <div key={tr(result.label)}>
            <div className="flex items-end justify-between gap-4">
              <span className="text-sm text-text-secondary">{tr(result.label)}</span>
              <span className="text-xl tracking-[-0.03em] text-text-primary">
                {result.value}
              </span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-stroke">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ width: result.value }}
                className="h-full origin-left rounded-full bg-gradient-to-r from-red-600 via-rose-500 to-orange-400"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-stroke pt-6">
        <span className="text-sm text-muted">{tr("Combined usability")}</span>
        <span className="font-display text-4xl italic text-red-500">
          95.22%
        </span>
      </div>
    </div>
  );
}

function ReflectionPoint({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Lightbulb;
  title: string;
  text: string;
}) {
  const { tr } = useLanguage();
  const { isDark } = useTheme();
  return (
    <div className="grid grid-cols-[48px_1fr] gap-5 border-b border-stroke pb-7 last:border-b-0">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-red-500 ${
          isDark ? "border-red-400/25 bg-red-500/10" : "border-slate-200 bg-white"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="text-xl text-text-primary">{tr(title)}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{tr(text)}</p>
      </div>
    </div>
  );
}

function NextStep({
  icon: Icon,
  number,
  title,
  text,
}: {
  icon: typeof Bell;
  number: string;
  title: string;
  text: string;
}) {
  const { tr } = useLanguage();
  const { isDark } = useTheme();
  return (
    <div className="grid grid-cols-[48px_1fr] gap-5">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-full border text-red-500 ${
          isDark ? "border-red-400/25 bg-red-500/10" : "border-slate-200 bg-white"
        }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <span className="font-display text-sm italic text-red-500/70">
          {number}
        </span>
        <h3 className="mt-2 text-xl text-text-primary">{tr(title)}</h3>
        <p className="mt-3 text-sm leading-7 text-muted">{tr(text)}</p>
      </div>
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 26, filter: "blur(8px)" }
      }
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}