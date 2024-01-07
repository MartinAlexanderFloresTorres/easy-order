import { NewRestaurant, PaymentMethod, SocialMedia } from '@/restaurant/interfaces';

export const DEFAULT_FIELDS: NewRestaurant = {
  name: '',
  description: '',
  address: '',
  phone: '',
  email: '',
  openingHours: '00:00',
  closingTime: '00:00',
  banner: null,
  logo: null,
  gallery: [],
  location: {
    latitude: 0,
    longitude: 0,
  },
  tables: [],
  servicesOffered: [],
  acceptsReservations: true,
  acceptsDelivery: false,
  paymentMethods: [],
  specialHours: [],
  website: '',
  socialMedia: [],
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    name: 'Efectivo',
    image: '/img/efectivo.png',
  },
  {
    name: 'Visa',
    image: '/svg/visa.svg',
  },
  {
    name: 'Yape',
    image: '/img/yape.png',
  },
  {
    name: 'Plin',
    image: '/svg/plin.svg',
  },
  {
    name: 'Interbank',
    image: '/svg/interbank.svg',
  },
  {
    name: 'PayPal',
    image: '/svg/paypal.svg',
  },
  {
    name: 'MasterCard',
    image: '/svg/mastercard.svg',
  },
  {
    name: 'Maestro',
    image: '/svg/maestro.svg',
  },
];
export const SOCIAL_MEDIAS: SocialMedia[] = [
  {
    platform: 'Facebook',
    image: '/svg/facebook.svg',
    link: '',
  },
  {
    platform: 'Instagram',
    image: '/svg/instagram.svg',
    link: '',
  },
  {
    platform: 'Tiktok',
    image: '/svg/tiktok.svg',
    link: '',
  },
  {
    platform: 'WhatsApp',
    image: '/svg/whatsapp.svg',
    link: '',
  },
  {
    platform: 'Youtube',
    image: '/svg/youtube.svg',
    link: '',
  },
  {
    platform: 'Twitter',
    image: '/svg/twitter.svg',
    link: '',
  },
];

export const MAX_GALLERY = 12;

export const LINKS_MORE: { name: string; link: string }[] = [
  {
    link: 'categories',
    name: 'Categorias',
  },
  {
    link: 'coupons',
    name: 'Cupones',
  },
  {
    link: 'tables',
    name: 'Mesas',
  },
  {
    link: 'opening-closing-times',
    name: 'Estado de apertura y cierre',
  },
  {
    link: 'users',
    name: 'Usuarios',
  },
  {
    link: 'sales',
    name: 'Ventas',
  },
  {
    link: 'reports',
    name: 'Reportes',
  },
  {
    link: 'subscription-plan',
    name: 'Plan de suscripción',
  },
  {
    link: 'settings',
    name: 'Configuración',
  },
];

/*   <Link
                to={`/panel/${restaurant.slug}/online-orders`}
                className="px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
                onClick={closeShowMore}
              >
                Pedidos
              </Link>
              <Link
                to={`/panel/${restaurant.slug}/table-orders`}
                className="px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
                onClick={closeShowMore}
              >
                Ordenes
              </Link>
              <Link
                to={`/panel/${restaurant.slug}/menu`}
                className="px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
                onClick={closeShowMore}
              >
                Menu
              </Link>

              <Link
                to={`/panel/${restaurant.slug}/stories`}
                className="px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
                onClick={closeShowMore}
              >
                Historias
              </Link>
              <Link
                to={`/panel/${restaurant.slug}/publications`}
                className="px-5 py-2 text-sm font-semibold rounded-md text-zinc-300 hover:bg-zinc-800 hover:bg-opacity-70 transition-colors duration-300"
                onClick={closeShowMore}
              >
                Publicaciones
              </Link> */

export const LINKS_PREVIEW_RESTAURANT: { name: string; link: string }[] = [
  {
    link: 'online-orders',
    name: 'Pedidos',
  },
  {
    link: 'table-orders',
    name: 'Ordenes',
  },
  {
    link: 'menu',
    name: 'Menu',
  },

  {
    link: 'publications',
    name: 'Publicaciones',
  },
  {
    link: 'stories',
    name: 'Historias',
  },
];
