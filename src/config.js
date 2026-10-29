// ✏️ EDIT EVERYTHING HERE — the whole site reads from this one file.
export const config = {
  groom: 'Kalaiyarasan',
  bride: 'Vennila',
  monogram: 'K & V',
  hashtag: 'KalaiwedsNila',
  tagline: 'request the honour of your presence',
  headline: 'THURSDAY · 12 NOVEMBER 2026',
  footerPlace: '12 November 2026 · Bargur, Krishnagiri',

  // Optional couple photo for the hero arch, e.g. '/photos/couple.jpg' (put file in /public/photos)
  heroImage: '',

  intro:
    'With hearts full of joy and the grace of the almighty, our families invite you to witness Kalaiyarasan and Vennila tie the knot — and begin their forever.',
  tamilLine: 'உங்கள் வருகையே எங்கள் பாக்கியம்',
  tamilSub: 'YOUR PRESENCE IS OUR BLESSING',

  // Countdown target (local time)
  countdownTo: '2026-11-12T18:30:00+05:30',

  // Optional background music: put an mp3 in /public and set e.g. '/music.mp3'
  music: '/assets/wedding-song.mp3',

  events: [
    {
      title: 'Wedding Ceremony',
      date: 'Fri · 13 Nov 2026',
      time: '6.30 AM',
      venue: 'Sri Hariswar Mahal, Malappadi Bargur',
      map: 'https://maps.app.goo.gl/dcj8S5NhugyJ1a7U8',
      icon: 'thaali',
    },
    {
      title: 'Reception',
      date: 'Thu · 12 Nov 2026',
      time: '6.30 PM',
      venue: 'Sri Hariswar Mahal, Malappadi Bargur',
      map: 'https://maps.app.goo.gl/dcj8S5NhugyJ1a7U8',
      icon: 'sparkles',
    },
  ],

  // Add real photos: put files in /public/photos and set src: '/photos/one.jpg'
  gallery: [
    { src: '', caption: 'The first meeting' },
    { src: '', caption: 'A walk on the beach' },
    { src: '', caption: 'Families meet' },
    { src: '', caption: 'Jasmine preparations' },
    { src: '', caption: 'Muhurtham' },
    { src: '', caption: 'The reception' },
  ],
}
