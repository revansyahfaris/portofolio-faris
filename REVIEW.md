# Review Portofolio — UI, UX, Motion, Performa, Arsitektur

Dokumen ini menilai keseluruhan situs setelah tujuh section baru (Experience → Connect) dibangun. Penilaian dilakukan sebagai satu sistem terintegrasi, bukan halaman per halaman.

**Tanggal review:** Agustus 2026
**Cakupan:** seluruh `src/`, termasuk section lama (Hero, Profile, Skills) dan section baru.
**Status verifikasi:** `tsc --noEmit` **belum dapat dijalankan** pada sesi ini karena lingkungan sandbox gagal start (kehabisan ruang disk). Jalankan `npm run dev` dan `npx tsc --noEmit` di mesin sendiri sebelum menganggap hasil ini final.

---

# Executive Summary

## Evaluasi Keseluruhan

Situs ini punya sesuatu yang jarang dimiliki portofolio: **identitas visual yang benar-benar dieksekusi, bukan tema yang ditempelkan**. Hero section dengan menu radial miring, layer grunge, dan tipografi serif hitam tebal adalah karya desain yang berdiri sendiri. Itu aset besar dan tidak boleh dikorbankan.

Namun sampai sebelum pekerjaan ini, situs tersebut **berhenti tepat sebelum bagian yang menentukan**. Hero menjanjikan sembilan tujuan lewat menunya; hanya tiga yang ada. Perekrut yang mengklik "EXPERIENCE" tidak sampai ke mana pun. Portofolio yang tampak mengesankan tetapi tidak menjawab "apa yang sudah kamu kerjakan" adalah portofolio yang gagal pada satu-satunya tugasnya.

Setelah penambahan ini, seluruh sembilan tujuan menu sudah punya section, dan tiap section dibangun di atas satu sistem desain bersama (`shared/`) yang menjaga konsistensi tanpa membuat semuanya terlihat sama.

**Penilaian ringkas:**

| Aspek | Sebelum | Sesudah | Catatan |
|---|---|---|---|
| Kelengkapan konten | 3/9 section | 9/9 section | Isi masih placeholder di beberapa tempat |
| Identitas visual | Sangat kuat | Sangat kuat | Dipertahankan, tidak diencerkan |
| Kesiapan untuk perekrut | Rendah | Menengah–tinggi | Bergantung pengisian data asli |
| Aksesibilitas | Lemah | Layak | Masih ada utang di HeroSection |
| Performa | Sudah dioptimasi | Terjaga | Tidak ada regresi struktural |
| Maintainability | Baik | Baik | Duplikasi ditekan lewat `shared/` |

## Kekuatan

1. **Arah seni yang konsisten tanpa monoton.** Tiap section punya warna aksen sendiri (amber, kuning, violet, rose, lime, merah, biru) sehingga pengguna tahu posisinya saat menggulir, tetapi bahasa bentuknya sama: potongan miring, bayangan blok cetak, penomoran romawi, tipografi serif hitam.
2. **Performa yang benar-benar dipikirkan.** `content-visibility` dengan pramuat proaktif, animasi berbasis atribut CSS tanpa render ulang React, SVG tunggal untuk 371 kotak kalender, dan tidak ada `will-change` yang menggantung.
3. **Pemisahan data dan tampilan yang bersih.** Tiap section punya `constants.ts` sendiri. Menambah proyek atau pengalaman tidak perlu menyentuh satu baris JSX pun.
4. **Keadaan gagal ditangani.** Section GitHub punya keadaan memuat, gagal, dan kosong yang layak. Formulir kontak tidak menghapus isian saat gagal kirim.

## Kelemahan

1. **Sebagian besar konten masih placeholder.** Angka dampak pada Experience, seluruh Achievement, sebagian besar Academy dan Company. Ini adalah risiko terbesar yang tersisa: portofolio dengan data karangan lebih berbahaya daripada portofolio yang belum selesai.
2. **Tidak ada satu pun tautan proyek yang berfungsi.** Section Quest saat ini tidak punya demo, repositori, maupun studi kasus. Untuk portofolio engineer, ini kelemahan paling serius yang tersisa.
3. **HeroSection masih tidak dapat dinavigasi papan ketik.** Menu utamanya berupa `<div onClick>`, bukan tombol atau tautan. Pengguna keyboard dan pembaca layar tidak bisa memakainya sama sekali.
4. **Konfigurasi ESLint rusak.** `eslint-config-next@0.2.4` di `package.json` bukan paket resmi Next.js — versi resminya ada di angka belasan. Artinya `npm run lint` tidak benar-benar memeriksa aturan Next/React.
5. **Bahasa campur.** Antarmuka mencampur Inggris (judul section, label HUD) dan Indonesia (deskripsi, isi). Perlu keputusan sadar, bukan dibiarkan terjadi.

## Prioritas Perbaikan

| # | Perbaikan | Kenapa mendesak |
|---|---|---|
| 1 | Isi data asli, hapus semua placeholder | Data karangan yang ketahuan menghancurkan kredibilitas seluruh situs |
| 2 | Tambahkan tautan demo/repo pada Quest | Bukti proyek nyata adalah alasan utama portofolio engineer dibuka |
| 3 | Perbaiki navigasi keyboard HeroSection | Menu utama yang tidak bisa diakses adalah kegagalan fungsional, bukan sekadar kekurangan |
| 4 | Perbaiki `eslint-config-next` | Tanpa linter yang benar, bug kelas umum lolos tanpa peringatan |
| 5 | Putuskan bahasa antarmuka | Campuran acak terbaca sebagai kurang teliti |

---

# Section-by-Section Review

## 1. Experience

**Current Assessment.** Empat entri ditampilkan sebagai kartu penuh tanpa perlu diklik, diurutkan berdasarkan relevansi (studio sendiri lebih dulu daripada magang satu bulan), bukan kronologi. Tiap kartu memuat jabatan, perusahaan, jenis ikatan kerja, periode, lokasi, ringkasan, angka dampak, tanggung jawab, dan tumpukan teknologi.

**Problems.**
- Angka dampak (`40%`, `25%`, `30+`) masih placeholder. Angka inilah bagian yang paling sering dikonfirmasi saat wawancara.
- Entri organisasi kemahasiswaan (HIMASKOM, CERC) berdampingan dengan pengalaman kerja berbayar tanpa pemisahan hierarki yang tegas. Perekrut yang memindai cepat bisa salah menilai bobotnya.
- Deskripsi tanggung jawab masih agak umum ("mendukung operasional", "memimpin program kerja").

**Opportunities.**
- Angka dampak yang benar-benar terukur akan langsung menaikkan bobot section ini di atas rata-rata portofolio mahasiswa.
- Rentang tanggal yang lebih spesifik pada peran organisasi.

**Suggested Improvements.**
1. Ganti tiap metrik dengan angka yang bisa dipertanggungjawabkan. Bila tidak ada, **kosongkan `metrics: []`** — komponen sudah menangani kasus itu.
2. Pertimbangkan menambahkan pemisah visual "Pengalaman Profesional" vs "Kepemimpinan Organisasi".
3. Tulis ulang tanggung jawab dengan pola *kata kerja + objek + hasil*: bukan "mendukung operasional", tapi "memindahkan pencatatan X dari spreadsheet manual ke Y, memangkas waktu rekap harian".

**Priority:** Tinggi.

## 2. Achievement

**Current Assessment.** Kisi kartu dengan pita tingkat kompetisi di sudut, diurutkan otomatis berdasarkan tingkat lalu tahun. Jumlah peserta ditampilkan bila ada, karena "Juara 2 dari 120 tim" jauh lebih informatif daripada "Juara 2".

**Problems.**
- **Seluruh isinya placeholder.** Nama lomba, penyelenggara, dan tahun adalah data yang mudah diperiksa ulang oleh perekrut.
- Tingkat "Internasional" dan "Nasional" saat ini memakai warna badge yang sama, sehingga perbedaannya hanya terbaca dari teks.

**Opportunities.**
- Bila belum ada penghargaan sama sekali, section ini bisa diubah menjadi "Certifications & Programs" (sertifikasi, bootcamp, program terstruktur) yang lebih mudah diisi jujur.

**Suggested Improvements.**
1. Ganti dengan data asli, atau **kosongkan array** — keadaan kosong sudah ditangani dan berbunyi jujur.
2. Bedakan badge Internasional (emas) dari Nasional (perak) bila keduanya akan benar-benar dipakai.

**Priority:** Tinggi (karena risiko kredibilitas, bukan karena kualitas komponennya).

## 3. Academy

**Current Assessment.** Tata letak dua kolom: panel identitas institusi + IPK besar di kiri, mata kuliah/peran akademik/proyek di kanan. Pembagian ini mengikuti perbedaan cara baca: IPK dan nama kampus adalah data penyaringan, sisanya bahan pendalaman.

**Problems.**
- Daftar mata kuliah masih generik dan belum tentu cocok dengan kurikulum sebenarnya.
- Peran asisten praktikum dan lab masih placeholder — padahal justru inilah bagian paling bernilai dari section ini.
- IPK 3.61 ditampilkan tanpa konteks (peringkat, predikat). Angkanya baik, tapi tanpa pembanding pembaca luar negeri tidak tahu artinya.

**Opportunities.**
- Peran asisten praktikum adalah sinyal kuat bahwa materi benar-benar dikuasai, bukan sekadar lulus. Layak ditonjolkan lebih dari sekadar kartu kecil.

**Suggested Improvements.**
1. Isi mata kuliah dengan yang benar-benar diambil, dan buang yang tidak relevan dengan pekerjaan yang dituju.
2. Tambahkan nilai atau predikat pada mata kuliah kunci bila memang bagus.
3. Bila IPK termasuk peringkat atas, tuliskan konteksnya.

**Priority:** Menengah.

## 4. Company

**Current Assessment.** Blok identitas merek dengan angka bukti, tiga kartu layanan lengkap dengan daftar keluaran konkret, alur kerja empat tahap dengan estimasi durasi, lalu visi/misi dan kategori klien.

Susunannya sengaja mengikuti urutan keberatan calon klien: apa yang dikerjakan → pernah mengerjakan apa → prosesnya bagaimana → saya menerima apa. Visi/misi diletakkan terakhir karena pernyataan nilai baru kredibel setelah kemampuannya terbukti.

**Problems.**
- Angka `30+ proyek` dan durasi tiap tahap adalah janji yang akan diukur klien. Harus akurat.
- Tidak ada satu pun contoh karya di section ini. Studio desain tanpa portofolio visual adalah kontradiksi.
- Tidak ada indikasi harga atau rentang anggaran, sehingga penyaringan klien tidak terjadi sama sekali dan waktu terbuang pada percakapan yang tidak cocok.

**Opportunities.**
- Menautkan section ini ke Quest ("lihat contoh pekerjaan") akan menutup celah bukti visual tanpa menduplikasi konten.
- Menyebut rentang anggaran, meski kasar, menyaring klien jauh lebih efektif daripada kalimat apa pun.

**Suggested Improvements.**
1. Verifikasi seluruh angka dan durasi.
2. Tambahkan tautan silang ke Quest.
3. Pertimbangkan blok "Rentang anggaran proyek" sederhana.

**Priority:** Menengah.

## 5. GitHub

**Current Assessment.** Ini bagian paling matang secara teknis di antara section baru:

- Route handler `/api/github` menyimpan token di server, menyatukan beberapa permintaan jadi satu, dan menyimpan hasilnya dalam cache satu jam.
- Kalender kontribusi diambil lewat GraphQL (satu-satunya cara mendapatkannya) dan digambar sebagai **satu elemen SVG**, bukan 371 `<div>`.
- Permintaan jaringan baru dimulai ketika section mendekati viewport, bukan saat halaman dimuat.
- Tiga keadaan ditangani: memuat (kerangka berbentuk hasil akhir agar tidak ada pergeseran tata letak), gagal (pesan jujur + tautan langsung ke profil), kosong (bagian tidak dirender).

**Problems.**
- **Bergantung pada `GITHUB_TOKEN`.** Tanpa itu section menampilkan keadaan gagal. Ini pilihan sadar (kalender kontribusi mustahil tanpa token), tetapi harus dicatat saat penyebaran.
- Pembatas laju tidak ada pada route ini — cache satu jam sudah menahan sebagian besar beban, tetapi permintaan langsung ke `/api/github` dari luar tetap mungkin.
- Rentetan hari ("streak") dihitung dari kalender kontribusi, yang hanya mencakup 365 hari terakhir. Rentetan lebih panjang dari itu akan terpotong.

**Suggested Improvements.**
1. Set `GITHUB_TOKEN` di lingkungan produksi (lihat `.env.example`).
2. Pertimbangkan menyematkan snapshot statis sebagai cadangan bila API gagal, agar section tidak pernah benar-benar kosong.

**Priority:** Menengah (fungsional, tinggal konfigurasi).

## 6. Quest

**Current Assessment.** Pola pemilih di kiri + panel rincian di kanan, diterapkan mengikuti pola tab WAI-ARIA lengkap dengan roving tabindex, navigasi panah, serta tombol Home/End. Panel rinciannya bercerita: **masalah → solusi → fitur → teknologi**, bukan daftar teknologi lebih dulu.

Urutan itu penting. Menempatkan tumpukan teknologi di awal membuat semua proyek terbaca mirip, karena stack-nya memang sering serupa. Yang membedakan satu proyek dari yang lain adalah masalah yang dipilih untuk dipecahkan.

**Problems.**
- **Tidak ada satu pun tautan yang tersedia.** Tidak ada demo, tidak ada repositori, tidak ada studi kasus. Untuk portofolio engineer, ini kelemahan paling serius di seluruh situs.
- Tidak ada tangkapan layar. Folder `public/assets/projects/` tidak ada, jadi bidang gambar sengaja dikosongkan (menunjuk berkas yang tidak ada akan menghasilkan gambar rusak — sinyal yang lebih buruk daripada tidak ada gambar).
- Pola pilih-lalu-baca menyembunyikan tiga dari empat proyek di balik satu klik. Sudah dikompensasi dengan membuka proyek pertama secara baku, tetapi tetap ada risiko sebagian besar pengunjung hanya melihat satu proyek.

**Opportunities.**
- Satu demo yang bisa diklik bernilai lebih dari seluruh perbaikan desain di dokumen ini digabungkan.
- Studi kasus tertulis (bahkan satu halaman) adalah pembeda terbesar dari portofolio mahasiswa lain.

**Suggested Improvements.**
1. **Isi `links` untuk minimal dua proyek.** Prioritaskan demo, lalu repositori.
2. Tambahkan tangkapan layar ke `public/assets/projects/`, lalu isi `image` dan `imageAlt`.
3. Pertimbangkan menambah indikator "4 proyek" yang jelas di dekat pemilih agar pengunjung tahu masih ada yang lain.

**Priority:** Sangat tinggi.

## 7. Connect

**Current Assessment.** Status ketersediaan di paling atas, empat jalur langsung (email, WhatsApp, LinkedIn, GitHub), tombol salin email, dan formulir yang benar-benar terkirim lewat `/api/contact` ke Resend.

Formulirnya punya: validasi sisi server, umpan bot (honeypot) yang dijawab seolah berhasil agar bot tidak belajar, pembatas laju 3 permintaan/jam per IP, pelarian HTML sebelum isian masuk ke badan email, `reply_to` yang diarahkan ke pengirim, dan isian yang **tidak dihapus** saat pengiriman gagal.

**Problems.**
- **Nomor WhatsApp masih `628123456789`** — placeholder. Tautan yang mengarah ke nomor asing lebih buruk daripada tidak ada tombol WhatsApp.
- Pembatas laju disimpan di memori proses. Pada penyebaran serverless, hitungannya hilang tiap cold start dan tidak dibagi antar instance. Cukup untuk portofolio, tidak cukup untuk lalu lintas serius.
- Status ketersediaan ditulis manual dan akan basi. Status yang salah lebih merugikan daripada tidak ada status.
- `QuestModal` lama (formulir simulasi `setTimeout`) masih ada di `HeroSection` dan tidak terhubung ke backend mana pun. Pengunjung yang mengirim lewat modal itu mengira pesannya sampai, padahal tidak.

**Suggested Improvements.**
1. Ganti nomor WhatsApp, atau hapus salurannya.
2. **Hubungkan `QuestModal` ke `/api/contact` yang sama, atau hapus formulirnya.** Ini bug diam-diam yang menyesatkan pengunjung.
3. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Pasang pengingat berkala untuk memperbarui status ketersediaan.

**Priority:** Sangat tinggi (khususnya poin QuestModal).

---

# UI Review

**Yang bekerja.**
- Sistem token aksen (`shared/accents.ts`) memakai string kelas Tailwind utuh, bukan yang disusun saat runtime. Ini bukan detail kecil: Tailwind memindai kode secara statis, dan kelas yang namanya baru terbentuk saat runtime tidak akan pernah dihasilkan.
- Hierarki tipografi konsisten: serif hitam untuk judul, mono untuk metadata dan label, sans untuk teks isi. Peran tiap keluarga huruf jelas.
- Bayangan blok cetak (`shadow-[5px_5px_0px_...]`, tanpa blur) adalah pilihan tepat untuk gaya cetak/poster. Bayangan lembut akan langsung menghilangkan karakternya.

**Yang perlu diperbaiki.**
1. **Kontras teks abu-abu.** `text-zinc-500` di atas `bg-zinc-950` menghasilkan rasio sekitar 4.9:1 — lolos AA untuk teks normal, tapi ukurannya sering `text-[10px]`. Teks sekecil itu perlu kontras lebih tinggi. Naikkan metadata kecil ke `text-zinc-400`.
2. **Skala spasi belum sepenuhnya seragam.** Section baru memakai `gap-3`/`gap-4`/`gap-5` bergantian tanpa aturan tegas. Sebaiknya tetapkan: `gap-2` intra-komponen, `gap-4` antar kartu, `gap-5`/`gap-6` antar blok.
3. **Watermark latar berpotensi mengganggu.** Karakter besar di `text-white/[0.028]` aman, tetapi pada layar dengan kalibrasi berbeda bisa lebih terlihat dari yang dimaksud. Perlu diperiksa di beberapa perangkat.
4. **Ukuran font 10px terlalu kecil.** Beberapa label memakai `text-[9px]`. Di bawah 11px, keterbacaan turun tajam pada layar kepadatan rendah. Naikkan lantai ke 10px, idealnya 11px untuk teks yang harus dibaca.

---

# UX Review

**Yang bekerja.**
- Urutan section mengikuti urutan pertanyaan pembaca: siapa → bisa apa → sudah kerja apa → diakui siapa → sekolah di mana → punya usaha apa → aktif tidak → karyanya apa → hubungi ke mana.
- Section Experience menampilkan semua isi tanpa interaksi; section Quest tidak. Perbedaan itu disengaja dan dijelaskan di komentar kode — panjang isi per entri berbeda jauh.
- Keadaan kosong dan gagal berbunyi jujur, bukan menyembunyikan masalah.

**Yang perlu diperbaiki.**
1. **Tidak ada navigasi tetap.** Setelah meninggalkan Hero, tidak ada cara berpindah antar section selain menggulir. Pada halaman sepanjang sembilan layar penuh, ini masalah nyata. Perlu navigasi tepi yang muncul setelah Hero terlewat.
2. **Tidak ada indikator posisi.** Pengguna tidak tahu ada berapa section dan sedang di mana. Nomor indeks (03, 04, …) membantu, tetapi hanya terlihat saat section itu sudah di layar.
3. **Tidak ada tombol kembali ke atas.** Setelah mencapai Connect, satu-satunya jalan kembali adalah menggulir sembilan layar.
4. **Scroll snap `y proximity` pada halaman sepanjang ini berisiko.** Section dengan konten lebih tinggi dari viewport (Company, GitHub) bisa terasa "ditarik" saat pengguna sedang membaca bagian tengahnya. Perlu diuji di perangkat nyata; bila mengganggu, batasi snap hanya pada section yang tingginya tepat satu layar.
5. **Bahasa campur.** Judul section Inggris, isi Indonesia. Untuk lamaran ke perusahaan multinasional ini merugikan. Pilih satu, atau sediakan pengalih bahasa.

---

# Motion Review

**Prinsip yang dipakai.** Setiap animasi di section baru harus menjawab: apa yang menjadi lebih mudah dipahami karena gerakan ini? Yang tidak lolos tidak dibuat.

**Yang bekerja.**
- **Reveal bertahap saat masuk viewport** (`useSectionReveal`) — durasi 520ms, easing `cubic-bezier(.16,1,.3,1)`, stagger 55ms per elemen dengan batas 8 langkah. Batas itu penting: tanpanya, daftar 20 kartu akan menghasilkan penundaan lebih dari satu detik yang terasa seperti halaman menggantung.
- Animasi dijalankan **sekali saja**, lalu observer diputus. Mengulang animasi tiap kali section keluar-masuk layar mengganggu dan memaksa browser terus mempertahankan layer GPU.
- **`will-change` sengaja tidak dipakai** pada animasi reveal. Animasinya pendek dan sekali jalan, sedangkan `will-change` akan menahan layer GPU hidup selamanya untuk setiap elemen.
- Seluruh animasi memakai `opacity` dan `transform` saja — keduanya berjalan di compositor thread tanpa memicu layout.
- Transisi hover memakai `transition-colors` (bukan `transition-all`), sehingga hanya properti warna yang dianimasikan.

**Yang perlu diperbaiki.**
1. **Animasi reveal tidak punya varian per section.** Semua memakai arah masuk yang sama. Variasi kecil (misalnya arah berlawanan untuk section berselang) akan menambah karakter tanpa biaya performa.
2. **Perpindahan tab Quest tidak beranimasi sama sekali.** Panel berganti seketika. Transisi opacity 120ms akan membantu mata mengikuti perubahan tanpa terasa lambat.
3. **`animate-pulse` pada titik status ketersediaan berjalan terus-menerus.** Kecil, tetapi tidak pernah berhenti dan tidak membawa informasi setelah dilihat sekali. Pertimbangkan menghentikannya setelah beberapa detik.

---

# Accessibility Review

**Yang sudah dikerjakan pada pekerjaan ini.**

| Item | Status |
|---|---|
| `prefers-reduced-motion` | Diterapkan global: semua animasi, transisi, smooth scroll, dan scroll snap dimatikan |
| Indikator fokus keyboard | `:focus-visible` global, outline 3px + offset |
| Skip link | Ditambahkan sebagai elemen fokus pertama di `layout.tsx` |
| Hierarki heading | `h1` hanya di Hero, `h2` di tiap section, tidak ada level yang dilompati |
| Pola tab Quest | `role="tablist"`, `aria-selected`, `aria-controls`, roving tabindex, navigasi panah + Home/End |
| Label formulir | `<label htmlFor>` sungguhan pada setiap input, bukan placeholder |
| Pengumuman status | `role="status"` + `aria-live="polite"`, wadah dirender sejak awal |
| Grafik | `role="img"` + `aria-label` ringkasan, bukan 371 node yang dibacakan satu per satu |
| Warna bukan satu-satunya pembawa makna | Tingkat kompetisi, bahasa pemrograman, dan status ketersediaan semuanya punya teks pendamping |
| Tautan tab baru | Diberi keterangan `(membuka di tab baru)` untuk pembaca layar |
| Bahasa dokumen | `lang="id"` diperbaiki dari `lang="en"` |

**Yang masih menjadi utang.**

1. **HeroSection tidak dapat dinavigasi papan ketik.** Menu utamanya `<div onClick>` tanpa `tabIndex`, `role`, atau penanganan tombol Enter/Space. Ini bukan kekurangan kecil — **menu navigasi utama situs tidak dapat dipakai sama sekali** oleh pengguna keyboard dan pembaca layar. Perbaikannya: ubah tiap `MenuItemRow` menjadi `<a href="#target">`, yang sekaligus memberi navigasi keyboard, semantik yang benar, dan kemampuan membuka di tab baru — gratis.
2. **`user-select: none` dipakai luas.** `select-none` pada Hero, Profile, dan Skills mencegah pengguna menyalin teks. Sebagian orang menyalin teks untuk menempelkannya ke penerjemah atau pembaca teks. Batasi hanya pada elemen dekoratif.
3. **Kontras teks kecil.** Lihat UI Review poin 1.
4. **Belum diuji dengan pembaca layar sungguhan.** Seluruh penilaian di atas berdasarkan pembacaan kode. Uji dengan NVDA atau VoiceOver sebelum menganggapnya selesai.

---

# Performance Review

**Yang sudah aman.**

1. **`content-visibility: auto` dengan pramuat proaktif.** Sembilan section penuh layar dalam satu halaman akan sangat mahal bila semuanya di-layout sejak awal. `content-visibility` melewatkan layout dan paint untuk yang di luar layar; `useContentVisibilityPreload` memaksanya render lebih awal (rootMargin 150%) sehingga tidak ada lonjakan kerja mendadak saat digulir masuk. Ini persis solusi masalah jank Hero→Profile sebelumnya, kini diterapkan ke semua section baru.
2. **Nol render ulang React saat menggulir.** Animasi reveal bekerja lewat atribut data + CSS. Tidak ada `useState` yang berubah karena scroll di section mana pun.
3. **Kalender kontribusi sebagai satu SVG.** 371 kotak sebagai `<div>` berarti 371 node DOM dengan biaya layout masing-masing. Satu pohon SVG jauh lebih murah.
4. **Fetch GitHub ditunda sampai mendekati viewport.** Tidak bersaing dengan pemuatan konten yang sedang dilihat pengguna.
5. **Cache berlapis pada `/api/github`**: `next: { revalidate: 3600 }` di sisi fetch, `revalidate = 3600` di route, plus header `s-maxage` + `stale-while-revalidate` untuk CDN.
6. **Kerangka pemuatan berbentuk hasil akhir.** Mencegah pergeseran tata letak (CLS) saat data GitHub tiba.
7. **Tidak ada dependensi baru.** Resend dipanggil lewat `fetch` biasa. Setiap paket yang tidak dipasang adalah satu hal lebih sedikit yang perlu diperbarui dan diaudit.
8. **`memo` pada komponen daftar** yang menerima props stabil (`ExperienceCard`, `AchievementCard`, `RepoCard`, `Tag`, `MetricStat`).

**Yang perlu diperhatikan.**

1. **`page.tsx` masih `'use client'` dan mengimpor seluruh sembilan section secara statis.** Artinya seluruh JavaScript section dikirim dalam bundel awal, meskipun render-nya dilewati. Perbaikan yang benar bukan `dynamic(ssr:false)` (itu pernah merusak LCP dari 2 detik jadi 8 detik) melainkan **mengubah section statis menjadi Server Component**. Experience, Achievement, Academy, dan Company tidak punya state maupun event handler sama sekali — keempatnya bisa jadi Server Component dan JavaScript-nya hilang total dari bundel klien. Ini kesempatan penghematan terbesar yang tersisa.
2. **Halaman kini sekitar sembilan layar penuh.** Perlu pengukuran ulang: LCP, TBT, dan memori GPU total dengan semua section dimuat.
3. **`animate-pulse` pada kerangka pemuatan GitHub** menganimasikan opacity pada beberapa elemen sekaligus. Murah, tetapi tetap menahan layer selama pemuatan.

---

# Code Quality Review

## Yang baik

**Pemisahan data/tampilan yang konsisten.** Tiap section punya `types.ts`, `constants.ts`, komponen, dan `index.ts`. Menambah proyek tidak menyentuh JSX.

**Ekstraksi `SectionShell`.** Tujuh section berbagi perilaku non-visual yang identik: anchor id, titik snap, strategi content-visibility, pemicu reveal, border atas, watermark. Menyalinnya tujuh kali berarti tujuh tempat yang harus diubah tiap kali strategi render berubah — dan hampir pasti akan menyimpang satu sama lain.

**`useMergedRefs` sebagai perbaikan nyata.** Sebelumnya `ProfileSection` menulis sendiri callback penggabung ref secara inline. Sekarang jadi utilitas yang dipakai bersama. `SkillChip` juga diubah menjadi re-export dari `Tag`, menghilangkan dua implementasi tag yang berbeda untuk informasi yang sama.

**Komentar menjelaskan *kenapa*, bukan *apa*.** Contoh: penjelasan mengapa `will-change` tidak dipakai, mengapa ambang batas kalender relatif bukan mutlak, mengapa Quest boleh memakai pola tab sementara Experience tidak.

## Masalah yang ditemukan

### 1. `eslint-config-next@0.2.4` bukan paket resmi Next.js

**Kenapa bermasalah.** Versi resmi `eslint-config-next` mengikuti versi Next.js (belasan). Versi `0.2.4` adalah paket lain dengan nama serupa. Akibatnya `npm run lint` tidak memeriksa aturan React Hooks, aturan Next.js, maupun aturan aksesibilitas JSX — seluruh kelas bug yang seharusnya tertangkap otomatis lolos begitu saja.

**Cara memperbaiki.** `npm uninstall eslint-config-next && npm install -D eslint-config-next@latest`, lalu verifikasi `eslint.config.mjs` benar-benar memuatnya.

**Dampak yang diharapkan.** Tinggi. Ini satu-satunya jaring pengaman otomatis di proyek, dan saat ini jaringnya bolong.

### 2. `QuestModal` mengirim ke mana-mana

**Kenapa bermasalah.** Formulirnya mensimulasikan pengiriman dengan `setTimeout` lalu menampilkan "QUEST ACCEPTED!". Pengunjung yang memakainya yakin pesannya sampai. Ini bukan sekadar fitur belum selesai — ini **menyesatkan pengguna secara aktif**, dan bisa berarti kehilangan peluang nyata tanpa pernah tahu.

**Cara memperbaiki.** Hubungkan ke `/api/contact` yang sudah ada (dengan menambahkan pemetaan `questType` → `topic`), atau hapus formulirnya dan arahkan tombolnya ke `#contact`.

**Dampak yang diharapkan.** Tinggi.

### 3. `HeroSection.tsx` terlalu besar

**Kenapa bermasalah.** Berkasnya melewati 700 baris dan memuat tujuh sub-komponen, logika scroll snap, penanganan roda, penanganan hover, dan satu blok `<style jsx global>` panjang. Berkas sebesar ini sulit ditelusuri, dan setiap perubahan kecil menyentuh area yang luas.

**Cara memperbaiki.** Pecah mengikuti pola yang sudah dipakai `profile/` dan `skills/`: `hero/HeroArtwork.tsx`, `hero/HeroMenu.tsx`, `hero/constants.ts`, `hero/useHeroScrollSnap.ts`. Keyframe globalnya dipindah ke `globals.css`.

**Dampak yang diharapkan.** Menengah — tidak mengubah perilaku, tetapi menurunkan biaya setiap perubahan berikutnya.

### 4. Pembatas laju berbasis memori

**Kenapa bermasalah.** Hitungannya hilang tiap cold start dan tidak dibagi antar instance serverless.

**Cara memperbaiki.** Sudah didokumentasikan di dalam kodenya. Bila lalu lintasnya bertambah, ganti dengan penyimpanan bersama — antarmuka fungsinya sengaja dibuat menyerupai agar penggantinya tidak menyentuh pemanggil.

**Dampak yang diharapkan.** Rendah untuk saat ini.

### 5. `page.tsx` sebagai Client Component

Lihat Performance Review poin 1. Ini masalah arsitektur, bukan sekadar optimasi.

---

# Recruiter Perspective

Menempatkan diri sebagai perekrut yang punya 40 detik per portofolio:

**"Siapa orang ini?"** — Terjawab dalam 5 detik. Hero + Profile jelas: mahasiswa Teknik Komputer UNDIP, fokus rekayasa perangkat lunak dan sistem tertanam.

**"Apa yang bisa dia bangun?"** — Terjawab. Skills mengelompokkan per domain tanpa rating subjektif (keputusan bagus — "React: 9/10" tidak berarti apa-apa dan justru menurunkan kepercayaan).

**"Teknologi apa yang dikuasai?"** — Terjawab, dan diperkuat dari beberapa sudut: Skills, tumpukan per pengalaman, komposisi bahasa GitHub.

**"Apa dampak yang pernah dibuat?"** — **Belum benar-benar terjawab.** Angkanya ada, tetapi masih placeholder. Begitu diisi data asli, section Experience akan menjadi kekuatan.

**"Kenapa harus merekrut dia?"** — **Ini titik terlemahnya.** Bukan karena kurang informasi, tetapi karena **tidak ada satu pun karya yang bisa dibuka**. Perekrut teknis akan mengklik demo atau repositori. Saat ini tidak ada yang bisa diklik. Semua yang tertulis tetap berstatus klaim.

**Penilaian sebagai perekrut:** Portofolio ini akan lolos penyaringan pertama karena tampilannya menunjukkan kemampuan frontend yang nyata — situsnya sendiri adalah buktinya. Tetapi pada penyaringan kedua, ketiadaan tautan proyek akan menjadi pertanyaan pertama yang muncul.

**Satu perubahan dengan pengaruh terbesar:** tautan demo yang berfungsi pada minimal dua proyek.

---

# Client Perspective

Menempatkan diri sebagai pemilik usaha yang mencari jasa desain dan pengembangan:

**"Orang ini benar-benar mengerjakan ini?"** — Ya. Situsnya sendiri sudah cukup meyakinkan.

**"Dia bisa mengerjakan apa untuk saya?"** — Terjawab jelas. Kartu layanan dengan daftar keluaran konkret jauh lebih baik daripada "UI/UX Design" tanpa penjelasan.

**"Prosesnya bagaimana, dan saya harus terlibat kapan?"** — Terjawab lewat alur kerja empat tahap dengan estimasi durasi. Ini bagian yang sering dilewatkan portofolio lain, dan keberadaannya menurunkan kecemasan calon klien secara nyata.

**"Berapa biayanya?"** — **Tidak terjawab sama sekali.** Akibatnya penyaringan tidak terjadi: klien dengan anggaran yang jauh di bawah tetap menghubungi, dan waktu terbuang di kedua sisi.

**"Pernah mengerjakan yang mirip punya saya?"** — Kategori klien membantu, tetapi **tidak ada satu pun contoh karya di section Company**. Studio desain tanpa portofolio visual adalah kontradiksi.

**"Bagaimana menghubunginya?"** — Sangat mudah. Empat jalur, status ketersediaan, dan perkiraan waktu balas. Ini section terkuat dari sudut pandang klien — **asalkan nomor WhatsApp-nya diganti.**

---

# High Impact Improvements

Diurutkan dari dampak tertinggi ke terendah.

| # | Perbaikan | Dampak | Kesulitan | Estimasi | Alasan |
|---|---|---|---|---|---|
| 1 | **Isi `links` Quest** (demo + repositori, minimal 2 proyek) | Sangat tinggi | Rendah | 1–2 jam | Satu-satunya hal yang mengubah seluruh isi situs dari klaim menjadi bukti. Perekrut teknis mengklik demo lebih dulu, sebelum membaca apa pun |
| 2 | **Ganti semua data placeholder dengan data asli** | Sangat tinggi | Menengah | 3–5 jam | Angka karangan yang ketahuan tidak merusak satu section, melainkan kredibilitas seluruh situs |
| 3 | **Hubungkan atau hapus `QuestModal`** | Sangat tinggi | Rendah | 30 menit | Saat ini menyesatkan pengunjung: mereka mengira pesannya terkirim, padahal tidak. Bisa berarti peluang hilang tanpa pernah diketahui |
| 4 | **Ganti nomor WhatsApp placeholder** | Sangat tinggi | Sepele | 2 menit | Tautan ke nomor asing lebih buruk daripada tidak ada tombolnya |
| 5 | **Buat menu Hero dapat diakses keyboard** (`<div onClick>` → `<a href>`) | Tinggi | Rendah | 1 jam | Menu navigasi utama saat ini tidak dapat dipakai sama sekali oleh pengguna keyboard dan pembaca layar. Kegagalan fungsional, bukan sekadar kekurangan |
| 6 | **Perbaiki `eslint-config-next`** | Tinggi | Sepele | 10 menit | Tanpa linter yang benar, seluruh kelas bug lolos tanpa peringatan. Jaring pengaman satu-satunya sedang bolong |
| 7 | **Ubah Experience/Achievement/Academy/Company jadi Server Component** | Tinggi | Menengah | 2–3 jam | Keempatnya tanpa state maupun handler. JavaScript-nya bisa hilang total dari bundel klien. Penghematan terbesar yang tersisa |
| 8 | **Tambahkan navigasi tetap + tombol kembali ke atas** | Tinggi | Menengah | 2–3 jam | Halaman sembilan layar tanpa navigasi memaksa menggulir untuk apa pun. Membatasi berapa banyak yang benar-benar dibaca |
| 9 | **Set variabel lingkungan produksi** (`GITHUB_TOKEN`, Resend) | Tinggi | Sepele | 20 menit | Tanpa ini, dua section menampilkan keadaan gagal di produksi |
| 10 | **Tambahkan tangkapan layar proyek** | Tinggi | Menengah | 2 jam | Proyek visual yang dijelaskan hanya dengan teks menuntut pembaca membayangkannya sendiri — dan kebanyakan tidak akan repot |
| 11 | **Putuskan bahasa antarmuka** (Inggris atau Indonesia) | Menengah | Menengah | 2–4 jam | Campuran acak terbaca sebagai kurang teliti. Perusahaan multinasional membaca sinyal ini |
| 12 | **Naikkan kontras teks kecil** (`zinc-500` → `zinc-400` pada ukuran ≤11px) | Menengah | Rendah | 1 jam | Metadata kecil adalah teks yang paling sering gagal terbaca pada layar redup atau di luar ruangan |
| 13 | **Uji dengan pembaca layar sungguhan** (NVDA/VoiceOver) | Menengah | Menengah | 2 jam | Seluruh penilaian aksesibilitas di dokumen ini berdasarkan pembacaan kode, bukan pengujian |
| 14 | **Pecah `HeroSection.tsx`** | Menengah | Menengah | 3 jam | 700+ baris membuat setiap perubahan kecil menyentuh area luas dan berisiko |
| 15 | **Tambahkan `sitemap.ts` dan `robots.ts`** | Menengah | Rendah | 30 menit | Metadata dan JSON-LD sudah ada; keduanya melengkapi dasar SEO |
| 16 | **Uji ulang performa dengan semua section** | Menengah | Rendah | 1 jam | Halaman bertambah dari 3 jadi 9 layar. Angka lama tidak lagi berlaku |
| 17 | **Batasi `select-none` hanya pada elemen dekoratif** | Menengah | Rendah | 30 menit | Menghalangi penyalinan teks mengganggu pengguna penerjemah dan pembaca teks |
| 18 | **Tambahkan animasi transisi panel Quest** | Rendah | Rendah | 30 menit | Perpindahan seketika membuat mata kehilangan jejak perubahan |
| 19 | **Tambahkan rentang anggaran di Company** | Rendah | Rendah | 30 menit | Menyaring klien jauh lebih efektif daripada kalimat apa pun |
| 20 | **Variasikan arah animasi reveal antar section** | Rendah | Rendah | 1 jam | Menambah karakter tanpa biaya performa. Murni penyempurnaan |

---

# Catatan Verifikasi

Yang **belum** dapat diverifikasi pada sesi ini karena lingkungan sandbox gagal start:

- [ ] `npx tsc --noEmit` — pemeriksaan tipe
- [ ] `npm run build` — build produksi
- [ ] `npm run dev` — pemeriksaan visual
- [ ] Panel Layers Chrome DevTools — memori GPU dengan seluruh section dimuat
- [ ] Lighthouse — LCP, CLS, TBT setelah halaman menjadi sembilan layar

Jalankan seluruh daftar di atas di mesin sendiri sebelum melakukan penyebaran.
