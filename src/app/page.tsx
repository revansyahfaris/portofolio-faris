import HeroSection from '@/components/ui/HeroSection';
import ProfileSection from '@/components/ui/ProfileSection';
import SkillsSection from '@/components/ui/SkillsSection';
import ExperienceSection from '@/components/ui/ExperienceSection';
import AchievementSection from '@/components/ui/AchievementSection';
import AcademySection from '@/components/ui/AcademySection';
import CompanySection from '@/components/ui/CompanySection';
import GithubSection from '@/components/ui/GithubSection';
import QuestSection from '@/components/ui/QuestSection';
import ConnectSection from '@/components/ui/ConnectSection';
import SmoothScroll from '@/components/ui/SmoothScroll';

/**
 * Halaman utama portofolio.
 *
 * Urutan section mengikuti urutan menu pada HeroSection dan disusun berdasarkan
 * apa yang paling menentukan penilaian pembaca: siapa orangnya (Profile), apa yang
 * dikuasai (Skills), apa yang sudah dikerjakan secara profesional (Experience),
 * pengakuan pihak luar (Achievement), latar pendidikan (Academy), unit kerja
 * mandiri (Company), bukti aktivitas berkelanjutan (GitHub), karya (Quest), dan
 * terakhir jalur menghubungi (Connect).
 *
 * Seluruh section di bawah Hero dirender lewat SectionShell yang sudah menangani
 * content-visibility, sehingga menambahkannya di sini tidak membuat biaya render
 * awal halaman ikut bertambah — browser melewati layout dan paint untuk bagian
 * yang belum mendekati viewport.
 *
 * Berkas ini sengaja TIDAK memakai 'use client'. Setelah QuestModal dinonaktifkan,
 * halaman ini tidak lagi menyimpan state apa pun, sehingga bisa tetap menjadi
 * Server Component. Tiap section yang memang butuh interaktivitas sudah menandai
 * dirinya sendiri dengan 'use client', jadi menaruh penanda itu di sini hanya akan
 * memaksa kerangka halaman ikut terkirim ke browser tanpa alasan.
 *
 * PENTING: jangan bungkus section mana pun dengan dynamic(ssr:false). Wrapper
 * semacam itu mencegah anak-anaknya dirender di server dan pernah membuat LCP
 * naik dari sekitar 2 detik menjadi 8 detik.
 *
 * Catatan QuestModal: formulir pada modal itu masih menyimulasikan pengiriman
 * (setTimeout) dan tidak terhubung ke backend mana pun, sehingga tidak dipasang di
 * sini. Tombol pemicunya masih ada di dalam HeroSection — sebaiknya diarahkan ke
 * #contact, atau modalnya dihubungkan ke /api/contact yang sudah tersedia.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative bg-[#06100D] text-[#F2F7F4] min-h-screen overflow-x-hidden">
        {/* Konten kritis yang harus langsung terlihat (above-the-fold) */}
        <HeroSection />

        <ProfileSection />
        <SkillsSection />
        <ExperienceSection />
        <AchievementSection />
        <AcademySection />
        <CompanySection />
        <GithubSection />
        <QuestSection />
        <ConnectSection />
      </main>
    </SmoothScroll>
  );
}
