"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Wifi,
  Camera,
  User,
  Heart,
  MapPin,
  MessageCircle,
  Shield,
  AlertTriangle,
  Lock,
  Activity,
  Eye,
  CheckCircle,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useGeolocation } from "@/hooks/useGeolocation"

type AppStep = "landing" | "form" | "verification" | "preliminary" | "generating" | "result" | "offer"

// Updated sales proof messages without specific cities/states
const SalesProofPopup = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [currentMessage, setCurrentMessage] = useState("")

  const salesMessages = [
    "✅ Julia de São Paulo desbloqueou um relatório há 12 minutos",
    "✅ Camila visualizou o histórico de conversas recentemente",
    "✅ Mariana acabou de acessar fotos confidenciais",
    "✅ Fernanda concluiu uma análise completa agora mesmo",
    "✅ Beatriz obteve acesso ao relatório confidencial momentos atrás",
    "✅ Amanda realizou uma verificação completa agora mesmo",
  ]

  useEffect(() => {
    if (show) {
      const randomMessage = salesMessages[Math.floor(Math.random() * salesMessages.length)]
      setCurrentMessage(randomMessage)
    }
  }, [show])

  if (!show) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: -20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: -20 }}
      className="fixed bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-xs z-50 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4"
      style={{
        fontSize: "13px",
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{currentMessage}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 flex-shrink-0"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
    </motion.div>
  )
}

// Arrays organizados por gênero e faixa etária
const malePhotos1824 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg",
]

const malePhotos2534 = [
  "https://blobs.vusercontent.net/blob/male-25-34-male-andyreiddvip.jpg-JfW3WQX7spc75NBSfoH1ink8qFF9bg.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-franchescox.jpg-SSxdBZNDEbogmHbY6WPnSteKDSLnOy.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-augst_ts.jpg-nu4ttxScgp63AQU9M9uUAQw6ujbhmq.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-nanoargentino.jpg-MupFxTgua62ieJ17as9NXcynMYNbgN.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-shyguyishere.jpg-94TD8ArDNT2ZBDw0N2M0G9hJah6UKk.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-carterlander08.jpg-yVyzRYbS0aGVhbvEX0Mjss5h51nySK.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-matthewteddy.jpg-gGny9NX0j88eVzP1iJqKZPEVWZ0Ogs.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-tomidiazj.jpg-uuVCkrFp6AHIQkyUkoUnQ4seoDKeL7.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-latinblondarg.jpg-erLXKeyVnCQFjS4QaZLFLFhu1I0yro.jpeg",
  "https://blobs.vusercontent.net/blob/male-25-34-male-bushidoboy.jpg-Ye68jGO1s2usgp6AabdJo4bGpnxCTl.jpeg",
]

const malePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-morocholatino87.jpg-bam8DFyuAfzBux5zmL9lscgSfnbJ4w.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-ovalo-sex.jpg-TdxtGZRqBJy2V8x9kVfSml7x6QJpjt.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-josepbgfeet.jpg-f25HHQX8Dso5oQBIE1uCIP3oC3KYrd.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thesuitedboss.jpg-3CFJKVgZyyuzeIPk0klRBy6ixqjsHF.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoink.jpg-0YCHbmDqw9dWCItx4Of9GbWBbpiZOZ.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-nicoalpalo22.jpg-bPAd1S83ZoBGkoJyaKZ0BSEveTVHG1.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-tunacho.jpg-2wHzLphZ2mKamlOeZmIfo1F09LM6pR.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-thebigitaliansub.jpg-rcFp57YB2XDXYQ1ObWSzBY0QDTVkcI.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/male-35-44-male-puntogof.jpg-9b6bkanYwTL6acvIqT3AC87dvvnXFZ.jpeg",
]

const malePhotos4554 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/3SJBR44DZ9c6pLRVDTA0Ww/public/male/45-54/male-45-54-hombrelatinoarg.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/2xC10Dbr0Yi98WJdnWWgm4/public/male/45-54/male-45-54-petemastersxxx.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/wKcNRFe1QqreA4CfjbJQ7a/public/male/45-54/male-45-54-scorcherb8.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0TwfWC666HpVosmkj_QPc_/public/male/45-54/male-45-54-coachtennisdad.jpg",
]

const femalePhotos1824 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg",
  "https://blobs.vusercontent.net/blob/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg",
]

const femalePhotos2534 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-bustanutters.jpg-PfzSPm0cPx7xUL939wZRvkH6X4MnMI.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-megnut.jpg-JDM9fK1I9XwHyJHqn36CZyjwv55ycS.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-siswet.jpg-5Ovue3nSIBKAMGL74rU3Ct4qf7bpFN.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ThorriandJax.jpg-CZTrwFISinAcSSvxRrAcUWtMDYTaiO.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-juicyjade9.jpg-nOS27Xu6KrOgaCRuu9862Hk73NegAs.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-ruth_lee.jpg-J5flhVFgEjhvJiSFhj0ZuBY3tGwjRI.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-graciebon1.jpg-kfctbLLp6OUl4Kc0OhSYyglGCLl29f.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-brujita.roja.jpg-KZxlryBKf0XVbOHRNdGAMBpPQTa82Z.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-25-34-female-toomanypeaches.jpg-6PDRsf3v2Nalrv9eRaku1bX8wh5kOe.jpeg",
]

const femalePhotos3544 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-belle_oharaxxx.jpg-Pq9aUAbtUDVI9UrrzZJlkfEC0cxuQv.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-txhotwife84_free.jpg-QV1C6Nj4fbSzTRIyGs7p4kiqtozXCx.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-malmalloy.jpg-B7c4Pg36GwUFFIayybP0fiyWqkv51R.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-anialisimo.jpg-EcQ66PmaeU25fFT0xV8udt4mMqLwhC.jpeg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/female-35-44-female-syrenjaymes.jpg-N4w0IhzPmQNbX0BqZRFeTvdBdGNn3Y.jpeg",
]

const femalePhotos4554 = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/AEJxds2OT7Gt-B4VLJXv4a/public/female/45-54/female-45-54-annikarose69.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1BUA6sJloJdt-jvL9MCX_i/public/female/45-54/female-45-54-AvrilShowers.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/ZP3nTnsBf-eH5TZPmJ2Y5l/public/female/45-54/female-45-54-casey_deluxe.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/_JzuRXZpf_Z2oSrQsFwVqy/public/female/45-54/female-45-54-eroticnikki.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/fvveni81HkNN0LrqIB4JXJ/public/female/45-54/female-45-54-goldieblair.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/N2QWnE3U5cy91m0VkVFzLX/public/female/45-54/female-45-54-jemmaluv.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/FJ77Pjm_R4YXKajt4cDFr4/public/female/45-54/female-45-54-lolamaverick.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/0z6995_0sJh478H4DUzkcd/public/female/45-54/female-45-54-MissHawthorn.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/1RCbILUlOe_6Oh3C6E1a9F/public/female/45-54/female-45-54-quiet_winner_76.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/uGH4sQMZaiDPeeyCrYTD2K/public/female/45-54/female-45-54-rileysweetnsexy.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/utg8RGec_BylfuoPKcczJ0/public/female/45-54/female-45-54-rose.curvy.xxx.png",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/W8GGhX3aDfLrw4OPchlLIa/public/female/45-54/female-45-54-Solymx2.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/NpqvlUBeE3bPdFwQAhge5Z/public/female/45-54/female-45-54-stellahere.jpg",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/git-blob/prj_dZrimM68aR5IMjhoid0WpfWib30j/fKgrGvdsa_GC0eLH-l5HTM/public/female/45-54/female-45-54-usapippa.jpg",
]

const maleNames = {
  "18-24": ["Enzo", "Miguel", "Arthur", "Heitor", "Theo", "Davi", "Gabriel", "Bernardo", "Samuel", "João", "Pedro", "Lucas", "Guilherme", "Matheus", "Rafael", "Felipe", "Gustavo", "Nicolas", "Lorenzo", "Cauã"],
  "25-34": ["Bruno", "Leonardo", "Rodrigo", "Daniel", "Thiago", "Marcos", "Vinicius", "André", "Fernando", "Ricardo", "Carlos", "Eduardo", "Diego", "Leandro", "Fábio", "Alexandre", "Marcelo", "Renan", "Vitor", "Jonas"],
  "35-44": ["Adriano", "Roberto", "Júlio", "César", "Sérgio", "Paulo", "Rogério", "Cláudio", "Ricardo", "Márcio", "Anderson", "Luciano", "Fábio", "Leandro", "Emerson", "Cristiano", "Ronaldo", "Wagner", "Elias", "Gilberto"],
  "45-54": ["Antônio", "Francisco", "José", "Carlos", "Jorge", "Luiz", "Edson", "Mauro", "Valdir", "Osvaldo", "Geraldo", "Raimundo", "Nelson", "Walter", "Armando", "Renato", "Ivan", "Mário", "Celso", "Laércio"],
}

const femaleNames = {
  "18-24": ["Júlia", "Sophia", "Isabella", "Manuela", "Giovanna", "Alice", "Laura", "Maria", "Beatriz", "Ana", "Clara", "Mariana", "Gabriela", "Yasmin", "Lívia", "Helena", "Letícia", "Nicole", "Rafaela", "Larissa"],
  "25-34": ["Camila", "Fernanda", "Amanda", "Bruna", "Patrícia", "Aline", "Vanessa", "Juliana", "Priscila", "Thais", "Carolina", "Daniela", "Adriana", "Cristiane", "Tatiane", "Renata", "Carla", "Débora", "Sabrina", "Michele"],
  "35-44": ["Luciana", "Sandra", "Mônica", "Simone", "Elaine", "Alessandra", "Fabiana", "Andrea", "Claudia", "Marcia", "Gisele", "Viviane", "Liliane", "Flávia", "Suelen", "Erica", "Raquel", "Cintia", "Josiane", "Paula"],
  "45-54": ["Vera", "Sônia", "Regina", "Lúcia", "Maria", "Aparecida", "Fátima", "Teresa", "Solange", "Rosana", "Eliana", "Marta", "Denise", "Angela", "Cristina", "Silvia", "Helena", "Isabel", "Elisabete", "Cleide"],
}

export default function SigiloX() {
  const [currentStep, setCurrentStep] = useState<AppStep>("landing")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [selectedGender, setSelectedGender] = useState("")
  const [lastTinderUse, setLastTinderUse] = useState("")
  const [cityChange, setCityChange] = useState("")
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false)
  const [photoError, setPhotoError] = useState("")
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const [isPhotoPrivate, setIsPhotoPrivate] = useState(false)
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [verificationMessage, setVerificationMessage] = useState("Iniciando análise...")
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [generatingMessage, setGeneratingMessage] = useState("Analisando fotos de perfil...")
  const [stepCompleted, setStepCompleted] = useState({
    profilePhotos: false,
    conversations: false,
    finalizing: false,
  })
  const [timeLeft, setTimeLeft] = useState(9 * 60 + 50) // 9:50
  const [showSalesPopup, setShowSalesPopup] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showSalesProof, setShowSalesProof] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null)
  const [ageRange, setAgeRange] = useState("")
  const [generatedProfiles, setGeneratedProfiles] = useState<any[]>([])
  const [selectedRandomPhoto, setSelectedRandomPhoto] = useState<string | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<any>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+55",
    name: "Brasil",
    flag: "🇧🇷",
    placeholder: "(11) 99999-9999",
  })
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")

  // --- Estados e Lógica de Pagamento ---
  const [isLoadingPayment, setIsLoadingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Novos estados para coletar dados do cliente na página de oferta
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerDocument, setCustomerDocument] = useState("");

  const [selectedBumps, setSelectedBumps] = useState({
    whats: false,
    insta: false,
    facebook: false,
    gps: false,
  });

  const orderBumps = [
    { id: "whats", title: "Whats Check", description: "Com apenas o número da pessoa que você deseja, espie todas as conversas em tempo real.", image: "https://production-mundpay.s3.us-east-2.amazonaws.com/products/2025/7/22/cG85NwREQbg777zS0waBsG1ZrXHLQYgZuWDwNW9P.png", price: "19,90" },
    { id: "insta", title: "Insta Check", description: "Com apenas o @perfil do Instagram da pessoa que você deseja, espie todas as conversas em tempo real.", image: "https://production-mundpay.s3.us-east-2.amazonaws.com/products/2025/7/22/Hl4Tu36WAuJ3Jjao8JSMGeeks8FHqZBNJfFxVaq3.png", price: "19,90" },
    { id: "facebook", title: "Facebook Check", description: "Espionagem em tempo real no Facebook e Messenger (Fotos, mensagens, curtidas e visualizações)", image: "https://production-mundpay.s3.us-east-2.amazonaws.com/products/2025/7/22/Zxh2MGvqtT6ZHaDIIMOmXlkMsZILHwrPQYbO6oOX.png", price: "19,90" },
    { id: "gps", title: "GPS Check", description: "Rastreie a localização da pessoa desejada 24 horas por dia via GPS", image: "https://production-mundpay.s3.us-east-2.amazonaws.com/products/2025/7/22/KoCqOCc5VG630gRfHFLayYSZaUQyLdPGEnQPNM3R.png", price: "24,90" },
  ];

  const handleBumpToggle = (bumpId: "whats" | "insta" | "facebook" | "gps") => {
    setSelectedBumps((prev) => ({ ...prev, [bumpId]: !prev[bumpId] }));
  };

  const handleCreatePayment = async () => {
    setIsLoadingPayment(true);
    setPaymentError(null);
    setPaymentResult(null);

    const selectedBumpIds = Object.keys(selectedBumps).filter(
        (key) => selectedBumps[key as keyof typeof selectedBumps]
    );

    try {
        const response = await fetch("/api/create-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                selectedBumps: selectedBumpIds,
                customer: {
                    email: customerEmail,
                    name: customerName,
                    document: customerDocument.replace(/\D/g, ''), // Envia somente números
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Não foi possível gerar o pagamento.");
        }
        setPaymentResult(data);
    } catch (error: any) {
        setPaymentError(error.message);
        console.error("Erro ao processar pagamento:", error);
    } finally {
        setIsLoadingPayment(false);
    }
  };
  // --- Fim da Lógica de Pagamento ---

  const [debouncedPhone, setDebouncedPhone] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      const cleanPhone = phoneNumber.replace(/[^0-9]/g, "")
      setDebouncedPhone(cleanPhone)
    }, 800)
    return () => clearTimeout(handler)
  }, [phoneNumber])

  useEffect(() => {
    const fetchWhatsAppPhoto = async () => {
      if (debouncedPhone.length < 10) {
        setProfilePhoto(null)
        setIsPhotoPrivate(false)
        return
      }

      setIsLoadingPhoto(true)
      setPhotoError("")
      const fallbackUrl = "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="

      try {
        const response = await fetch("/api/whatsapp-photo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: debouncedPhone }),
        })
        const data = await response.json()
        if (!response.ok || !data.success) {
          throw new Error(data.error || "Falha ao buscar foto")
        }
        setProfilePhoto(data.result)
        setIsPhotoPrivate(!!data.is_photo_private)
      } catch (error) {
        console.error("Erro ao buscar foto:", error)
        setProfilePhoto(fallbackUrl)
        setIsPhotoPrivate(true)
        setPhotoError("Não foi possível carregar a foto.")
      } finally {
        setIsLoadingPhoto(false)
      }
    }
    if (debouncedPhone) {
      fetchWhatsAppPhoto()
    }
  }, [debouncedPhone])

  const handlePhoneChange = (value: string) => {
    let formattedValue = value
    if (!value.startsWith(selectedCountry.code)) {
      if (value && !value.startsWith("+")) {
        formattedValue = selectedCountry.code + " " + value
      } else if (value.startsWith("+") && !value.startsWith(selectedCountry.code)) {
        formattedValue = value
      } else {
        formattedValue = selectedCountry.code + " " + value.replace(selectedCountry.code, "").trim()
      }
    }
    setPhoneNumber(formattedValue)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showCountryDropdown) {
        const target = event.target as Element
        if (!target.closest(".relative")) {
          setShowCountryDropdown(false)
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showCountryDropdown])

  const countries = [
    { code: "+55", name: "Brasil", flag: "🇧🇷", placeholder: "(11) 99999-9999" },
    { code: "+1", name: "Estados Unidos", flag: "🇺🇸", placeholder: "(555) 123-4567" },
    { code: "+351", name: "Portugal", flag: "🇵🇹", placeholder: "912 345 678" },
    // Adicione outros países se desejar
  ]

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) || country.code.includes(countrySearch),
  )

  const { city } = useGeolocation()

  const matrixCodes = ["4bda7c", "x1f801", "uSr9ub", "r31sw", "3cqvt", "ebwvi", "4qd1tu", "str5y4", "ect2So", "xfnpBj", "kqjJu", "2v46yn", "q619ma", "wdtqdo", "14mkee", "pbb3eu", "vbncg8", "begaSh", "7rq", "dcboeu", "keyxs", "3Qehu", "N8135s", "nx794n", "11aqSi", "zBcpp", "s1xcBm", "u91xnm", "1s7mec", "Y8fmf", "11masu", "ye1f2t"]

  const getProgressSteps = () => [
    { id: "form", label: "Config", fullLabel: "Configuração", mobileLabel: "Config", completed: ["form", "verification", "preliminary", "generating", "result", "offer"].includes(currentStep) },
    { id: "verification", label: "Verif", fullLabel: "Verificação", mobileLabel: "Verif", completed: ["verification", "preliminary", "generating", "result", "offer"].includes(currentStep) },
    { id: "preliminary", label: "Result", fullLabel: "Resultado", mobileLabel: "Resultado", completed: ["preliminary", "generating", "result", "offer"].includes(currentStep) },
    { id: "generating", label: "Relat", fullLabel: "Relatório", mobileLabel: "Relatório", completed: ["generating", "result", "offer"].includes(currentStep) },
    { id: "offer", label: "Desbl", fullLabel: "Desbloquear", mobileLabel: "Acesso", completed: currentStep === "offer" },
  ]

  useEffect(() => {
    if (currentStep === "result" || currentStep === "offer") {
      const timer = setInterval(() => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)), 1000)
      return () => clearInterval(timer)
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === "verification") {
      const messages = [
        { progress: 0, message: "Verificando atividade do Tinder na sua área..." },
        { progress: 15, message: "Cruzando dados de reconhecimento facial..." },
        { progress: 30, message: "Analisando padrões de login recentes..." },
        { progress: 45, message: "Escaneando Bumble, Hinge e outras plataformas..." },
        { progress: 60, message: "Detectando atividade de localização suspeita..." },
        { progress: 75, message: "Compilando evidências confidenciais..." },
        { progress: 90, message: "Quase lá - finalizando seu relatório..." },
        { progress: 100, message: "Investigação concluída com sucesso!" },
      ]
      const interval = setInterval(() => {
        setVerificationProgress((prev) => {
          const newProgress = prev + Math.random() * 8 + 2
          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 25)
          if (currentMessage) setVerificationMessage(currentMessage.message)
          if (newProgress >= 100) {
            setTimeout(() => setCurrentStep("preliminary"), 1000)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep])

  useEffect(() => {
    if (currentStep === "generating") {
      const baseMessages = [
        { progress: 0, message: "Analisando fotos de perfil..." },
        { progress: 20, message: "Processando histórico de mensagens..." },
        { progress: 40, message: "Verificando últimos locais acessados..." },
        { progress: 60, message: "Compilando dados de atividade..." },
        { progress: 80, message: "Criptografando informações sensíveis..." },
        { progress: 95, message: "Finalizando relatório completo..." },
        { progress: 100, message: "Relatório gerado com sucesso!" },
      ]
      const messages = city ? [...baseMessages.slice(0, 2), { progress: 30, message: `Analisando atividades recentes na região de ${city}...` }, ...baseMessages.slice(2)] : baseMessages
      const interval = setInterval(() => {
        setGeneratingProgress((prev) => {
          const newProgress = prev + 100 / 75
          if (newProgress >= 33 && !stepCompleted.profilePhotos) setStepCompleted((p) => ({ ...p, profilePhotos: true }))
          if (newProgress >= 66 && !stepCompleted.conversations) setStepCompleted((p) => ({ ...p, conversations: true }))
          if (newProgress >= 90 && !stepCompleted.finalizing) setStepCompleted((p) => ({ ...p, finalizing: true }))
          const currentMessage = messages.find((m) => newProgress >= m.progress && newProgress < m.progress + 20)
          if (currentMessage) setGeneratingMessage(currentMessage.message)
          if (newProgress >= 100) {
            setTimeout(() => {
              if (stepCompleted.profilePhotos && stepCompleted.conversations && stepCompleted.finalizing) setCurrentStep("result")
            }, 1500)
            return 100
          }
          return Math.min(newProgress, 100)
        })
      }, 400)
      return () => clearInterval(interval)
    }
  }, [currentStep, city, stepCompleted])

  useEffect(() => {
    if (["generating", "result", "offer"].includes(currentStep)) {
      const showProof = () => {
        if (Math.random() < 0.7) {
          setShowSalesProof(true)
          setTimeout(() => setShowSalesProof(false), 6000)
        }
      }
      const initialTimeout = setTimeout(showProof, 5000)
      const interval = setInterval(showProof, 25000)
      return () => {
        clearTimeout(initialTimeout)
        clearInterval(interval)
      }
    }
  }, [currentStep])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const blockedImages = ["https://i.ibb.co/PZmmjcxb/CHAT1.png", "https://i.ibb.co/20581vtC/CHAT2.png", "https://i.ibb.co/LzFZdXXH/CHAT3.png", "https://i.ibb.co/kvWFRct/CHAT4.png"]

  const nextSlide = useCallback(() => setCurrentSlide((prev) => (prev + 1) % blockedImages.length), [blockedImages.length])
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + blockedImages.length) % blockedImages.length)

  useEffect(() => {
    if (currentStep === "result") {
      const interval = setInterval(nextSlide, 4000)
      return () => clearInterval(interval)
    }
  }, [currentStep, nextSlide])

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setUploadedPhoto(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const generateFakeProfiles = useCallback(() => {
    const profiles: any[] = []
    const usedNames: string[] = []
    const usedImages: string[] = []

    const getUniqueItem = (sourceArray: string[], usedArray: string[]) => {
      if (!sourceArray || sourceArray.length === 0) return "/placeholder.svg"
      const availableItems = sourceArray.filter((item) => !usedArray.includes(item))
      const source = availableItems.length > 0 ? availableItems : sourceArray
      const selectedItem = source[Math.floor(Math.random() * source.length)]
      usedArray.push(selectedItem)
      return selectedItem
    }

    const matchLocation = city || ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba"][Math.floor(Math.random() * 4)]
    const sampleBios = ["Aventureiro, amante de café...", "Fã de academia de dia, maratonista de Netflix à noite...", "Artista, sonhador e filósofo de meio período..."]
    const orientations = ["Hétero", "Bissexual", "Pansexual", "Queer"]

    for (let i = 0; i < 3; i++) {
      let profileGender: "masculino" | "feminino"
      let profileAgeRange: keyof typeof maleNames
      if (selectedGender === "nao-binario") {
        profileGender = Math.random() < 0.5 ? "masculino" : "feminino"
        const ageRanges: (keyof typeof maleNames)[] = ["18-24", "25-34", "35-44", "45-54"]
        profileAgeRange = ageRanges[Math.floor(Math.random() * ageRanges.length)]
      } else {
        profileGender = selectedGender === "masculino" ? "feminino" : "masculino"
        profileAgeRange = ageRange as keyof typeof maleNames
      }

      const names = profileGender === "masculino" ? maleNames[profileAgeRange] : femaleNames[profileAgeRange]
      let photoArray: string[] = []
      if (profileGender === 'masculino') {
        if (profileAgeRange === '18-24') photoArray = malePhotos1824;
        else if (profileAgeRange === '25-34') photoArray = malePhotos2534;
        else if (profileAgeRange === '35-44') photoArray = malePhotos3544;
        else photoArray = malePhotos4554;
      } else {
        if (profileAgeRange === '18-24') photoArray = femalePhotos1824;
        else if (profileAgeRange === '25-34') photoArray = femalePhotos2534;
        else if (profileAgeRange === '35-44') photoArray = femalePhotos3544;
        else photoArray = femalePhotos4554;
      }

      const name = getUniqueItem(names || [], usedNames)
      const profileImage = getUniqueItem(photoArray, usedImages)
      // CORREÇÃO APLICADA AQUI
      const age = Math.floor(Math.random() * 7) + (Number.parseInt(profileAgeRange.split("-")[0]) || 25)

      profiles.push({
        name,
        age,
        lastSeen: `há ${Math.floor(Math.random() * 24)}h`,
        description: "Usuário ativo, frequentemente online",
        image: profileImage,
        bio: sampleBios[Math.floor(Math.random() * sampleBios.length)],
        location: `Mora em ${matchLocation}`,
        distance: `${Math.floor(Math.random() * 15) + 1} km de distância`,
        orientation: orientations[Math.floor(Math.random() * orientations.length)],
        verified: Math.random() > 0.5,
      })
    }
    setGeneratedProfiles(profiles)
  }, [selectedGender, ageRange, city])

  const openProfileModal = (profile: any) => {
    setSelectedProfile(profile)
    setIsProfileModalOpen(true)
  }
  const closeProfileModal = () => setIsProfileModalOpen(false)

  useEffect(() => {
    if (currentStep === "result") generateFakeProfiles()
  }, [currentStep, generateFakeProfiles])

  const canVerify = phoneNumber.length >= 10 && selectedGender && profilePhoto && lastTinderUse && cityChange && ageRange
  const handleSubmitForm = async () => {
    if (canVerify) setCurrentStep("verification")
  }
  const canPay = customerName && customerEmail.includes('@') && customerDocument.length >= 11;

  return (
    <div className="min-h-screen" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Barra de Progresso Global */}
      {currentStep !== "landing" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="stepper-container overflow-x-auto px-3 py-3">
            <div className="flex items-center gap-2 min-w-max">
              {getProgressSteps().map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="stepper-step flex items-center gap-2 min-w-[80px] sm:min-w-[100px]">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0 ${step.completed ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" : "bg-gray-200 text-gray-500"}`}>
                      {step.completed ? "✓" : index + 1}
                    </div>
                    <span className={`font-medium transition-colors duration-300 text-xs sm:text-sm whitespace-nowrap ${step.completed ? "text-green-600" : "text-gray-500"}`}>
                      <span className="block sm:hidden">{step.mobileLabel}</span>
                      <span className="hidden sm:block">{step.fullLabel}</span>
                    </span>
                  </div>
                  {index < getProgressSteps().length - 1 && <div className="w-6 sm:w-8 h-px bg-gray-300 mx-2 sm:mx-3 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showSalesProof && ["generating", "result", "offer"].includes(currentStep) && (
          <SalesProofPopup show={showSalesProof} onClose={() => setShowSalesProof(false)} />
        )}
      </AnimatePresence>

      <div className={currentStep !== "landing" ? "pt-16 sm:pt-20" : ""}>
        <AnimatePresence mode="wait">
          {/* Landing Page */}
          {currentStep === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 sm:opacity-20">
                {matrixCodes.slice(0, 15).map((code, index) => (
                  <motion.div key={index} className="absolute text-green-400 text-xs font-mono" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3 + Math.random() * 2, repeat: Number.POSITIVE_INFINITY, delay: Math.random() * 2 }}>
                    {code}
                  </motion.div>
                ))}
              </div>
              <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12">
                <div className="text-center mb-12 sm:mb-16">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, type: "spring" }} className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-[#FF0066] to-[#FF3333] rounded-2xl mb-6 sm:mb-8 shadow-2xl">
                    <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </motion.div>
                  <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-4 px-2 leading-tight">
                    Aquela Pulga Atrás da Orelha Não Desaparece...<br />
                    <span className="text-[#FF3B30] text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold">E Você Está Certo em Confiar Nela</span>
                  </motion.h1>
                  <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-[#CCCCCC] mb-6 text-base sm:text-lg md:text-xl px-4 max-w-3xl mx-auto font-medium">
                    Pare de perder o sono se perguntando se a pessoa ainda está usando aplicativos de namoro. Obtenha as respostas que você precisa - de forma completamente anônima.
                  </motion.p>
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="inline-flex items-center gap-2 bg-green-600/20 text-green-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm mt-4 border border-green-500/30">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">Sistema de Detecção Avançado - Atualizado em Junho de 2025</span>
                  </motion.div>
                </div>
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }} className="max-w-2xl mx-auto space-y-3 sm:space-y-4 mb-8 sm:mb-12 px-4">
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Activity className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" /><span className="font-semibold text-sm sm:text-base">✅ Veja o último login (mesmo quando dizem que 'não usam mais' apps)</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" /><span className="font-semibold text-sm sm:text-base">✅ Descubra de onde a pessoa está realmente usando os aplicativos</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Eye className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" /><span className="font-semibold text-sm sm:text-base">✅ Acesse as conversas que não querem que você veja</span>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4 bg-white/10 backdrop-blur-sm text-white px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-[#00FF99]" /><span className="font-semibold text-sm sm:text-base">✅ Sua investigação permanece completamente privada</span>
                  </div>
                </motion.div>
                <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1.0 }} className="text-center mb-12 sm:mb-16 px-4">
                  <Button onClick={() => setCurrentStep("form")} className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 px-6 sm:px-8 text-sm sm:text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 w-full max-w-md mx-auto flex items-center justify-center text-center overflow-hidden">
                    <span className="block text-center leading-tight px-2 break-words whitespace-normal">🔍 DESCUBRA A VERDADE – INICIAR BUSCA ANÔNIMA</span>
                  </Button>
                  <p className="text-sm text-gray-300 mt-4 font-medium">Investigação 100% anônima. A pessoa nunca saberá que você verificou.</p>
                </motion.div>
              </div>
              <div className="bg-white py-12 sm:py-16">
                <div className="container mx-auto px-4">
                  <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#333333] mb-4">Você Não Está Sendo Paranoico(a) -</h2>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0066] to-[#FF3333] mb-6">Você Está se Protegendo</h3>
                    <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">Pare de duvidar dos seus instintos. Obtenha a clareza necessária para tomar decisões informadas sobre seu relacionamento.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 sm:mb-12">
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"><Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" /></div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">ATIVIDADE RECENTE</h4><p className="text-xs sm:text-sm text-gray-600">Veja quando usaram apps de namoro pela última vez</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"><MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" /></div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">LOCALIZAÇÃO EXATA</h4><p className="text-xs sm:text-sm text-gray-600">Onde estiveram usando os apps</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"><Camera className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" /></div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">FOTOS OCULTAS</h4><p className="text-xs sm:text-sm text-gray-600">Fotos que não querem que você veja</p>
                    </div>
                    <div className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"><MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" /></div>
                      <h4 className="font-bold text-[#333333] mb-2 text-sm sm:text-base">CONVERSAS PRIVADAS</h4><p className="text-xs sm:text-sm text-gray-600">O que realmente estão dizendo a outras pessoas</p>
                    </div>
                  </div>
                  <div className="text-center mb-8 sm:mb-12">
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#333333] mb-6 sm:mb-8 px-2">Você Não Está Sozinho(a) - Veja o que Outros Descobriram</h3>
                    <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="Foto de Laura" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm" />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2"><p className="font-bold text-[#333333] text-base sm:text-lg">Laura, 32</p><p className="text-xs sm:text-sm text-green-600 font-medium">✓ Usuária Verificada</p></div>
                          <div className="mb-3"><svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg><p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">Eu sabia que algo estava errado. O relatório confirmou meus piores medos, mas pelo menos agora eu podia tomar uma decisão informada em vez de viver em constante ansiedade.</p></div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1"><span>⭐⭐⭐⭐⭐</span></div>
                        </div>
                      </div>
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfHwwfHx8MA%3D%3D" alt="Foto de Fernanda" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm" />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2"><p className="font-bold text-[#333333] text-base sm:text-lg">Fernanda, 28</p><p className="text-xs sm:text-sm text-blue-600 font-medium">Investigação concluída em Junho de 2025</p></div>
                          <div className="mb-3"><svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg><p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">Os melhores R$17 que já gastei. Me poupou meses de incerteza e me deu o encerramento que eu precisava. Meus instintos estavam certos o tempo todo.</p></div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1"><span>⭐⭐⭐⭐⭐</span></div>
                        </div>
                      </div>
                      <div className="testimonial-card bg-white rounded-xl shadow-lg p-4 sm:p-5 flex items-start gap-4">
                        <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8MHx8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80" alt="Foto de Beatriz" className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0 border-2 border-gray-200 shadow-sm" />
                        <div className="flex-1 min-w-0 text-left">
                          <div className="mb-2"><p className="font-bold text-[#333333] text-base sm:text-lg">Beatriz, 35</p><p className="text-xs sm:text-sm text-green-600 font-medium">✓ Usuária Verificada</p></div>
                          <div className="mb-3"><svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 float-left mr-1 mt-1" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" /></svg><p className="text-[#444444] text-base sm:text-lg leading-relaxed font-normal">Eu me senti culpada por verificar, mas meus instintos estavam certos. Agora posso seguir em frente com confiança em vez de viver na dúvida.</p></div>
                          <div className="flex items-center text-[#FFD700] text-sm sm:text-base gap-1"><span>⭐⭐⭐⭐⭐</span></div>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setCurrentStep("form")} className="bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base md:text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full max-w-sm mx-auto flex items-center justify-center text-center overflow-hidden">
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">🔍 INICIAR MINHA INVESTIGAÇÃO ANÔNIMA</span>
                    </Button>
                  </div>
                  <div className="text-center px-4"><p className="text-xs text-gray-500 flex items-center justify-center gap-2 font-medium"><Shield className="w-4 h-4" />100% anônimo - Sua investigação permanece completamente privada</p></div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Formulário */}
          {currentStep === "form" && (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-[#6C63FF] relative overflow-hidden">
                <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 flex items-center justify-center min-h-screen">
                    <div className="w-full max-w-lg">
                        <div className="text-center mb-6 sm:mb-8">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl"><Wifi className="w-8 h-8 sm:w-10 sm:h-10 text-[#6C63FF]" /></div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">🔍 Ajude-nos a Encontrar o que Estão Escondendo</h1>
                            <p className="text-gray-200 text-sm sm:text-base px-4 leading-relaxed">Quanto mais detalhes você fornecer, mais fundo podemos investigar. Tudo permanece 100% anônimo.</p>
                        </div>
                        <Card className="bg-white rounded-2xl shadow-lg border-0">
                            <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">Envie a Foto para Reconhecimento Facial</label>
                                    <div className="text-center">
                                        {uploadedPhoto ? (
                                            <div className="relative inline-block">
                                                <img src={uploadedPhoto} alt="Uploaded" className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-blue-500 shadow-lg" />
                                                <button onClick={() => setUploadedPhoto(null)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">×</button>
                                            </div>
                                        ) : (
                                            <div className="w-24 h-24 sm:w-28 sm:h-28 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:border-blue-500 transition-colors">
                                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                                <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-3 font-medium">Vamos escanear todas as plataformas de namoro para encontrar perfis correspondentes.</p>
                                </div>
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-2 sm:mb-3">Número de WhatsApp que a pessoa usa</label>
                                    <div className="flex gap-2 sm:gap-3">
                                      <div className="relative">
                                          <button type="button" onClick={() => setShowCountryDropdown(!showCountryDropdown)} className="bg-gray-100 px-3 sm:px-4 py-2 sm:py-3 rounded-xl border text-gray-600 flex-shrink-0 font-medium text-sm sm:text-base flex items-center gap-2 hover:bg-gray-200 transition-colors duration-200 min-w-[80px] sm:min-w-[90px]">
                                              <span className="text-lg">{selectedCountry.flag}</span><span>{selectedCountry.code}</span><svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                          </button>
                                          {showCountryDropdown && (
                                              <div className="absolute top-full left-0 mt-1 bg-white border rounded-xl shadow-lg z-50 w-80 max-h-60 overflow-y-auto">
                                                  <div className="p-2"><input type="text" placeholder="Buscar país..." value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                                                  {filteredCountries.map((country) => (
                                                      <button key={country.code} type="button" onClick={() => { setSelectedCountry(country); setShowCountryDropdown(false); setCountrySearch(""); const currentNumber = phoneNumber.replace(/^\+\d+\s*/, ""); setPhoneNumber(country.code + " " + currentNumber); }} className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                                          <span className="text-lg">{country.flag}</span><span className="font-medium">{country.code}</span><span className="text-gray-600">{country.name}</span>
                                                      </button>
                                                  ))}
                                              </div>
                                          )}
                                      </div>
                                      <Input type="tel" placeholder={selectedCountry.placeholder} value={phoneNumber} onChange={(e) => handlePhoneChange(e.target.value)} className="flex-1 py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">Isso nos ajuda a rastrear a atividade do dispositivo e cruzar com os padrões de uso de aplicativos de namoro.</p>
                                    {(profilePhoto || isLoadingPhoto) && (
                                        <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                {isLoadingPhoto ? <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-200 rounded-xl animate-pulse" /> : <img src={profilePhoto || "/placeholder.svg"} alt="WhatsApp Profile" className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border-2 border-gray-200" />}
                                                <div className="flex-1"><p className="font-semibold text-[#333333] text-sm sm:text-base">Perfil do WhatsApp Encontrado</p><p className="text-xs sm:text-sm text-gray-600">{isPhotoPrivate ? "Foto privada detectada" : "Foto do perfil carregada"}</p></div>
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">Qual o gênero da pessoa?</label>
                                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                        {[{ value: "masculino", label: "Homem", icon: "👨" }, { value: "feminino", label: "Mulher", icon: "👩" }, { value: "nao-binario", label: "Não-binário", icon: "🧑" }].map((option) => (
                                            <button key={option.value} type="button" onClick={() => setSelectedGender(option.value)} className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${selectedGender === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                                                <div className="text-lg sm:text-xl mb-1 sm:mb-2">{option.icon}</div><div className="text-xs sm:text-sm font-medium">{option.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">Qual a idade da pessoa?</label>
                                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                        {[{ value: "18-24", label: "18-24 anos" }, { value: "25-34", label: "25-34 anos" }, { value: "35-44", label: "35-44 anos" }, { value: "45-54", label: "45+ anos" }].map((option) => (
                                            <button key={option.value} type="button" onClick={() => setAgeRange(option.value)} className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-center ${ageRange === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                                                <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-2 font-medium">Isso nos ajuda a refinar os parâmetros de busca em todas as plataformas de namoro.</p>
                                </div>
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">Quando você começou a suspeitar?</label>
                                    <div className="space-y-2 sm:space-y-3">
                                        {[{ value: "week", label: "Na última semana", desc: "(mudanças de comportamento recentes)" }, { value: "month", label: "No último mês", desc: "(distanciamento gradual/escondendo o celular)" }, { value: "longer", label: "Há mais de um mês", desc: "(sentimento contínuo)" }, { value: "sure", label: "Só preciso ter certeza", desc: "" }].map((option) => (
                                            <button key={option.value} type="button" onClick={() => setLastTinderUse(option.value)} className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${lastTinderUse === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                                                <div className="font-medium text-sm sm:text-base">{option.label}</div>{option.desc && <div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm sm:text-base font-semibold text-[#333333] mb-3 sm:mb-4">A pessoa tem "trabalhado até tarde" ou viajado?</label>
                                    <div className="space-y-2 sm:space-y-3">
                                        {[{ value: "yes", label: "Sim", desc: '"Novas demandas de trabalho" ou viagens inexplicadas' }, { value: "no", label: "Não", desc: "Mudanças de comportamento aconteceram em casa" }, { value: "unknown", label: "Não sei", desc: "A pessoa é reservada sobre a agenda" }].map((option) => (
                                            <button key={option.value} type="button" onClick={() => setCityChange(option.value)} className={`w-full p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 text-left ${cityChange === option.value ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300"}`}>
                                                <div className="font-medium text-sm sm:text-base">{option.label}</div><div className="text-xs sm:text-sm text-gray-500 mt-1">{option.desc}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <Button onClick={handleSubmitForm} disabled={!canVerify} className={`w-full py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-xl transition-all duration-300 overflow-hidden ${canVerify ? "bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white shadow-lg hover:shadow-xl transform hover:scale-105" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}>
                                    <span className="block text-center leading-tight px-2">🔍 INICIAR INVESTIGAÇÃO</span>
                                </Button>
                                <div className="text-center"><p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium"><Lock className="w-4 h-4" />Seus dados são criptografados e excluídos automaticamente após 24 horas</p></div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </motion.div>
          )}

          {/* Outras etapas (Verification, Preliminary, etc.) */}
          {/* ... cole o código das outras etapas aqui ... */}
		  {/* Verification - Mobile Optimized */}
          {currentStep === "verification" && (
            <motion.div
              key="verification"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      🔍 Escaneando Todas as Plataformas de Namoro...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={verificationProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{verificationMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Escaneando Tinder, Bumble, Hinge...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Processando reconhecimento facial...
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full animate-pulse" />
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">
                          Análise de dados de localização...
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Conexão segura e criptografada - Nenhum rastro deixado para trás
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Preliminary Results - Mobile Optimized */}
          {currentStep === "preliminary" && (
            <motion.div
              key="preliminary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-lg">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8">
                    {/* Alert Header */}
                    <div className="text-center mb-6 sm:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg animate-pulse">
                        <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-3 sm:mb-4">
                        Encontramos o que Você Estava Procurando...
                      </h2>
                    </div>

                    {/* Alert Box */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 flex-shrink-0" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-700">
                          PERFIS DE NAMORO ATIVOS DETECTADOS
                        </h3>
                      </div>
                      <p className="text-sm sm:text-base text-red-600 font-medium leading-relaxed">
                        Nosso sistema descobriu múltiplos perfis ativos vinculados a esta pessoa em 3 plataformas de
                        namoro diferentes.
                      </p>
                    </div>

                    {/* Key Findings */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Última Atividade: 18 horas atrás
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">Apesar de afirmar que 'apagou tudo'...</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            3 Apps de Namoro Ativos Atualmente
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">Tinder, Bumble e uma plataforma premium</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl">
                        <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-[#333333] text-sm sm:text-base mb-1 sm:mb-2">
                            Conversas Recentes Detectadas
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-600">
                            Mensagens ativas com múltiplos matches esta semana
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Next Step Box */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs sm:text-sm font-bold">💡</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-blue-700">
                          O que Você Verá no Relatório Completo:
                        </h3>
                      </div>
                      <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-blue-600">
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Prints de todos os perfis ativos
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Conversas recentes e o que estão dizendo
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Locais exatos onde estiveram usando os apps
                        </li>
                        <li className="flex items-center gap-2 sm:gap-3">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0" />
                          Linha do tempo de toda a atividade (você ficará chocado(a))
                        </li>
                      </ul>
                    </div>
                    
                    <Button
                      onClick={() => setCurrentStep("generating")}
                      className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-3 sm:py-4 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6 overflow-hidden flex items-center justify-center text-center"
                    >
                      <span className="block text-center leading-tight px-2 break-words whitespace-normal">
                        🔓 DESBLOQUEAR EVIDÊNCIA COMPLETA – VER TUDO
                      </span>
                    </Button>
                    
                    <div className="text-center">
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium">
                        <Lock className="w-4 h-4" />
                        Anonimato completo garantido - A pessoa nunca saberá que você verificou
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Generating Report - Mobile Optimized */}
          {currentStep === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] flex items-center justify-center px-4 py-8"
            >
              <div className="w-full max-w-md">
                <Card className="bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-lg">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 sm:mb-6">
                      📊 Gerando Relatório Completo...
                    </h2>

                    <div className="mb-6 sm:mb-8">
                      <Progress value={generatingProgress} className="h-3 sm:h-4 mb-4 sm:mb-6" />
                      <p className="text-sm sm:text-base text-gray-600 font-medium">{generatingMessage}</p>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${stepCompleted.profilePhotos ? "bg-green-50" : "bg-blue-50"}`}>
                        {stepCompleted.profilePhotos ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />}
                        <span className="text-xs sm:text-sm text-gray-700 font-medium">Fotos do perfil analisadas</span>
                      </div>
                      <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${stepCompleted.conversations ? "bg-green-50" : stepCompleted.profilePhotos ? "bg-blue-50" : "bg-gray-50"}`}>
                        {stepCompleted.conversations ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : stepCompleted.profilePhotos ? <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />}
                        <span className={`text-xs sm:text-sm font-medium ${stepCompleted.conversations || stepCompleted.profilePhotos ? "text-gray-700" : "text-gray-500"}`}>Processando conversas...</span>
                      </div>
                      <div className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl ${stepCompleted.finalizing ? "bg-green-50" : stepCompleted.conversations ? "bg-blue-50" : "bg-gray-50"}`}>
                        {stepCompleted.finalizing ? <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" /> : stepCompleted.conversations ? <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" /> : <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-300 rounded-full" />}
                        <span className={`text-xs sm:text-sm font-medium ${stepCompleted.finalizing || stepCompleted.conversations ? "text-gray-700" : "text-gray-500"}`}>Finalizando relatório...</span>
                      </div>
                    </div>
                    <div className="text-center"><p className="text-xs sm:text-sm text-gray-500 flex items-center justify-center gap-2 font-medium"><Lock className="w-4 h-4" />Criptografando dados sensíveis para sua privacidade</p></div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Result - Mobile Optimized */}
          {currentStep === "result" && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8">
              <div className="container mx-auto max-w-4xl">
                {(profilePhoto || uploadedPhoto) && (
                  <div className="flex justify-center mb-6 sm:mb-8">
                    <div className="relative">
                      <img src={uploadedPhoto || profilePhoto || ""} alt="Profile" className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                      {isPhotoPrivate && <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center"><Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" /></div>}
                    </div>
                  </div>
                )}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl shadow-lg"><div className="flex items-center gap-2 sm:gap-3"><AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" /><div><h3 className="font-bold text-sm sm:text-base">🚨 PERFIL ENCONTRADO - ESTÃO ATIVOS NO TINDER</h3><p className="text-xs sm:text-sm opacity-90">Visto por último: Online agora</p></div></div></div>
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 sm:p-4 rounded-xl shadow-lg"><div className="flex items-center gap-2 sm:gap-3"><AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" /><div><h3 className="font-bold text-sm sm:text-base">⚠️ ATENÇÃO: PERFIL ATIVO ENCONTRADO!</h3><p className="text-xs sm:text-sm opacity-90">Confirmamos que este número está vinculado a um perfil ATIVO no Tinder. Registros de uso recentes detectados em {city || "sua área"}.</p></div></div></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg"><div className="text-xl sm:text-2xl font-bold text-red-500 mb-1">6</div><div className="text-xs sm:text-sm text-gray-600 font-medium">MATCHES (7 DIAS)</div></div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg"><div className="text-xl sm:text-2xl font-bold text-orange-500 mb-1">30</div><div className="text-xs sm:text-sm text-gray-600 font-medium">CURTIDAS (7 DIAS)</div></div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg"><div className="text-xl sm:text-2xl font-bold text-purple-500 mb-1">4</div><div className="text-xs sm:text-sm text-gray-600 font-medium">CHATS ATIVOS</div></div>
                  <div className="bg-white rounded-xl p-3 sm:p-4 text-center shadow-lg"><div className="text-xl sm:text-2xl font-bold text-green-500 mb-1">18h</div><div className="text-xs sm:text-sm text-gray-600 font-medium">ÚLTIMA ATIVIDADE</div></div>
                </div>
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">🔥 MATCHES RECENTES ENCONTRADOS</h3>
                    <p className="text-sm text-gray-600 text-left mb-6">Toque em um match para ver mais informações</p>
                    <div className="space-y-4">
                      {generatedProfiles.map((profile, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => openProfileModal(profile)}>
                          <div className="relative">{profile.image ? <img src={profile.image} alt={profile.name} className="w-12 h-12 rounded-full object-cover" /> : <div className="w-12 h-12 rounded-full bg-pink-200 flex items-center justify-center"><User className="w-6 h-6 text-pink-600" /></div>}<div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div></div>
                          <div className="flex-1"><div className="flex items-center justify-between"><h4 className="font-semibold text-gray-900">{profile.name}, {profile.age}</h4><div className="w-2 h-2 bg-green-500 rounded-full"></div></div><p className="text-sm text-gray-600">Visto por último: {profile.lastSeen}</p><p className="text-sm text-green-600">Chat ativo: frequentemente online</p></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white rounded-2xl shadow-lg border-0 mb-6 sm:mb-8">
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">📸 FOTOS CENSURADAS</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Veja todas as fotos do perfil (incluindo as que você nunca viu)</p>
                    <div className="relative">
                      <div className="overflow-hidden rounded-xl"><div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>{blockedImages.map((image, index) => (<div key={index} className="w-full flex-shrink-0 relative"><img src={image} alt={`Conversa de chat ${index + 1}`} className="w-full h-48 sm:h-64 object-cover" style={{ filter: "blur(8px) brightness(0.7)" }} /><div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"><div className="text-center"><Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white mx-auto mb-2 opacity-80" /><p className="text-white text-xs font-bold opacity-80">BLOQUEADO</p></div></div></div>))}</div></div>
                      <button onClick={prevSlide} className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"><svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
                      <button onClick={nextSlide} className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"><svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
                      <div className="flex justify-center gap-2 mt-4">{blockedImages.map((_, index) => (<button key={index} onClick={() => setCurrentSlide(index)} className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors ${index === currentSlide ? "bg-blue-500" : "bg-gray-300"}`} />))}</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"><Lock className="w-8 h-8 sm:w-10 sm:h-10 text-white" /></div>
                      <h3 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4">🔓 DESBLOQUEAR RELATÓRIO COMPLETO</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Tenha acesso instantâneo ao relatório completo com fotos sem censura e histórico completo de conversas.</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 sm:p-6 rounded-xl shadow-lg mb-4 sm:mb-6">
                      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3"><AlertTriangle className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" /><span className="font-bold text-lg sm:text-xl">O RELATÓRIO SERÁ APAGADO EM:</span></div>
                      <div className="text-center mb-3"><div className="text-3xl sm:text-4xl font-bold mb-2">{formatTime(timeLeft)}</div></div>
                      <p className="text-sm sm:text-base text-center leading-relaxed opacity-90">Após o tempo expirar, este relatório será permanentemente excluído por razões de privacidade. Esta oferta não pode ser recuperada posteriormente.</p>
                    </div>
                    <Button onClick={() => setCurrentStep("offer")} className="w-full bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-sm sm:text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 sm:mb-6">
                      <span className="block text-center leading-tight px-2">🔓 DESBLOQUEAR MEU RELATÓRIO - ESTOU PRONTO(A) PARA A VERDADE</span>
                    </Button>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-4 sm:mb-6"><p className="text-sm sm:text-base text-blue-700 font-medium leading-relaxed">Você não está invadindo a privacidade - você está protegendo seu bem-estar emocional. Você tem o direito de tomar decisões informadas sobre seu relacionamento.</p></div>
                  </CardContent>
                </Card>

                {isProfileModalOpen && selectedProfile && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    {/* ... código do modal do perfil ... */}
                    {isProfileModalOpen && selectedProfile && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                      {/* Header com botão de fechar */}
                      <div className="relative">
                        <button
                          onClick={closeProfileModal}
                          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white bg-opacity-80 rounded-full flex items-center justify-center shadow-lg"
                        >
                          <X className="w-5 h-5 text-gray-700" />
                        </button>

                        {/* Imagem do Perfil */}
                        <div className="relative h-96 bg-gray-200 rounded-t-2xl overflow-hidden">
                          <img
                            src={selectedProfile.image || "/placeholder.svg"}
                            alt={selectedProfile.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Overlay de gradiente */}
                          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent"></div>

                          {/* Overlay com nome e informações básicas */}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <div className="flex items-center gap-2 mb-1">
                              <h2 className="text-3xl font-bold">{selectedProfile.name}</h2>
                              {selectedProfile.verified && (
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4 text-sm opacity-90">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{selectedProfile.orientation}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{selectedProfile.location}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 text-sm opacity-90 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{selectedProfile.distance}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Conteúdo do Perfil */}
                      <div className="p-6 space-y-6">
                        {/* Seção Sobre Mim */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">Sobre Mim</h3>
                          <p className="text-gray-700 leading-relaxed">{selectedProfile.bio}</p>
                        </div>

                        {/* Tags de Personalidade */}
                        {selectedProfile.personality && (
                          <div>
                            <div className="flex flex-wrap gap-2">
                              {selectedProfile.personality.map((tag: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Seção Meus Interesses */}
                        {selectedProfile.interests && (
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Meus Interesses</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProfile.interests.map((interest: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-300"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Botões de Ação */}
                        <div className="flex gap-4 pt-4">
                          <button className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                            Passar
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-pink-500 to-red-500 text-white py-3 rounded-full font-semibold hover:bg-pink-600 hover:to-red-600 transition-colors">
                            Curtir
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

		  {/* Offer Page - CORRIGIDA */}
          {currentStep === "offer" && (
            <motion.div key="offer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gradient-to-br from-[#1C2833] to-[#6C63FF] px-4 py-6 sm:py-8">
              <div className="container mx-auto max-w-2xl">
                <Card className="bg-white rounded-2xl shadow-lg border-0">
                  <CardContent className="p-6 sm:p-8 text-center">
                    {/* Se o pagamento ainda não foi criado, mostra a oferta */}
                    {!paymentResult ? (
                      <>
                        {/* Header */}
                        <div className="mb-6 sm:mb-8">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                            <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                          </div>
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#333333] mb-3 sm:mb-4">
                            Você Merece Saber a Verdade Completa
                          </h1>
                          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                            Pare de se perguntar. Pare de perder o sono. Obtenha todos os detalhes - de forma totalmente confidencial.
                          </p>
                          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-4 sm:p-6">
                            <p className="text-sm sm:text-base text-red-700 font-semibold leading-relaxed">
                              Seus instintos estavam certos. Agora veja exatamente o que eles têm escondido enquanto olham nos seus olhos e mentem.
                            </p>
                          </div>
                        </div>

                        {/* Price Section */}
                        <div className="mb-6 sm:mb-8">
                          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <div className="text-2xl sm:text-3xl text-gray-400 line-through">R$47,00</div>
                            <div className="text-4xl sm:text-5xl font-bold text-[#FF0066]">R$17,00</div>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-bold mb-4">
                            🔥 62% OFF - TEMPO LIMITADO
                          </div>
                          <p className="text-sm sm:text-base text-gray-600 font-medium">
                            Pagamento único para acesso vitalício ao seu relatório completo
                          </p>
                        </div>

                        {/* What You'll Unlock */}
                        <div className="text-left mb-6 sm:mb-8">
                          <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6 text-center">
                            O que Você Vai Desbloquear:
                          </h3>
                          <div className="space-y-3 sm:space-y-4">
                            <div className="flex items-start gap-3 sm:gap-4"><CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" /><span className="text-sm sm:text-base text-gray-700 font-medium">Todas as Fotos do Perfil (incluindo as que eles acham que você nunca verá)</span></div>
                            <div className="flex items-start gap-3 sm:gap-4"><CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0 mt-1" /><span className="text-sm sm:text-base text-gray-700 font-medium">Histórico Completo de Conversas (veja exatamente o que estão dizendo a outras pessoas)</span></div>
                          </div>
                        </div>

                        {/* Order Bumps Section */}
                        <div className="text-center mb-6 sm:mb-8">
                          <h3 className="text-lg sm:text-xl font-bold text-[#333333] mb-4 sm:mb-6">Turbine Sua Investigação (Opcional)</h3>
                          <div className="space-y-4">
                            {orderBumps.map((bump) => (
                              <div key={bump.id} onClick={() => handleBumpToggle(bump.id as "whats" | "insta" | "facebook" | "gps")} className={`p-4 border-2 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-300 ${selectedBumps[bump.id as keyof typeof selectedBumps] ? "border-green-500 bg-green-50 shadow-md" : "border-gray-200 hover:border-gray-300"}`}>
                                <img src={bump.image} alt={bump.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                <div className="flex-1 text-left">
                                  <h4 className="font-bold text-base sm:text-lg text-gray-800">{bump.title}</h4>
                                  <p className="text-xs sm:text-sm text-gray-600">{bump.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-green-600 text-base sm:text-lg whitespace-nowrap">+ R${bump.price}</p>
                                  <div className="mt-2 flex justify-end">
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${selectedBumps[bump.id as keyof typeof selectedBumps] ? "bg-green-500" : "border border-gray-400 bg-white"}`}>
                                      {selectedBumps[bump.id as keyof typeof selectedBumps] && <CheckCircle className="w-5 h-5 text-white" />}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Formulário de Dados do Cliente */}
                        <div className="text-left mb-6 sm:mb-8 bg-gray-50 p-6 rounded-xl border">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">Dados para Pagamento</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo</label>
                                    <Input type="text" placeholder="Seu nome completo" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                                    <Input type="email" placeholder="seuemail@exemplo.com" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} className="w-full" />
                                    <p className="text-xs text-gray-500 mt-1">Enviaremos o acesso ao seu relatório neste e-mail.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">CPF</label>
                                    <Input type="text" placeholder="000.000.000-00" value={customerDocument} onChange={(e) => setCustomerDocument(e.target.value)} className="w-full" />
                                </div>
                            </div>
                        </div>


                        {/* Final CTA Button */}
                        <Button onClick={handleCreatePayment} disabled={isLoadingPayment || !canPay} className="w-full text-center bg-gradient-to-r from-[#FF0066] to-[#FF3333] hover:from-[#FF0066] hover:to-[#FF3333] text-white font-bold py-4 sm:py-6 text-base sm:text-lg md:text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden disabled:bg-gray-400 disabled:cursor-not-allowed">
                          {isLoadingPayment ? "Processando Pagamento..." : "PAGAR COM PIX E DESBLOQUEAR TUDO"}
                        </Button>
                        {!canPay && <p className="text-xs text-gray-500 mt-2">Por favor, preencha todos os dados para continuar.</p>}
                        {paymentError && <p className="text-red-500 mt-4">{paymentError}</p>}
                      </>
                    ) : (
                      // Se o pagamento foi criado com sucesso, mostra os dados do PIX
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quase lá! Pague com PIX para liberar seu acesso.</h2>
                        <p className="text-gray-600 mb-6">Escaneie o QR Code com o app do seu banco ou use o código Copia e Cola.</p>
                        <img src={paymentResult.pix_qr_code_url} alt="PIX QR Code" className="mx-auto w-64 h-64 border-4 border-gray-200 rounded-lg" />
                        <div className="mt-6">
                          <label className="block text-sm font-medium text-gray-700">PIX Copia e Cola</label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <input type="text" readOnly value={paymentResult.pix_copy_paste} className="flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 p-2 bg-gray-100" />
                            <button onClick={() => navigator.clipboard.writeText(paymentResult.pix_copy_paste)} className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100">
                              Copiar
                            </button>
                          </div>
                        </div>
                        <p className="mt-8 text-sm text-gray-500">
                          Após a confirmação do pagamento, você receberá um e-mail com o acesso ao seu relatório completo.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
