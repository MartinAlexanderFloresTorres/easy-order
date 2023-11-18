import Plan from '@/subscription-plans/components/Plan';

const SubscriptionPlansPage = () => {
  return (
    <div className="container mx-auto py-10 flex flex-wrap items-center justify-center gap-4">
      <Plan
        title="Free"
        type="free"
        price={0}
        description="Este plan es gratis para siempre. Solo necesitas seleccionarlo y registrarte."
        features={[
          {
            id: 1,
            description: 'Acceso al panel del resturante.',
            isAvailable: true,
          },
          {
            id: 2,
            description: 'Subida de imagenes.',
            isAvailable: true,
          },
          {
            id: 3,
            description: 'Gestion de restaurante.',
            isAvailable: true,
          },
          {
            id: 4,
            description: 'Gestion de mesas maximas 10 mesas.',
            isAvailable: true,
          },
          {
            id: 5,
            description: 'Gestion de pedidos.',
            isAvailable: true,
          },
          {
            id: 6,
            description: 'Gestion y Creacion de platos, bebidas, postres maximo 5 por categoria.',
            isAvailable: true,
          },
          {
            id: 7,
            description: '2 historias maximas subidas por dia',
            isAvailable: true,
          },
          {
            id: 8,
            description: 'Pedidos en tiempo real.',
            isAvailable: true,
          },
          {
            id: 9,
            description: 'Posicionate entre los primeros resultados de busqueda.',
            isAvailable: false,
          },
          {
            id: 10,
            description: 'Posicionate entre los mejores restaurantes.',
            isAvailable: false,
          },
          {
            id: 11,
            description: 'Gestion de usuarios.',
            isAvailable: false,
          },
          {
            id: 12,
            description: 'Gestion de roles.',
            isAvailable: false,
          },
          {
            id: 13,
            description: 'Gestion de permisos.',
            isAvailable: false,
          },
          {
            id: 14,
            description: 'Gestion de categorias.',
            isAvailable: false,
          },
          {
            id: 15,
            description: 'Gestion de ventas.',
            isAvailable: false,
          },
          {
            id: 16,
            description: 'Gestion de reportes.',
            isAvailable: false,
          },
          {
            id: 17,
            description: 'Gestion de comprobantes.',
            isAvailable: false,
          },
          {
            id: 18,
            description: 'Acceso a configuraciones.',
            isAvailable: false,
          },
          {
            id: 19,
            description: 'Acceso a la API.',
            isAvailable: false,
          },
        ]}
        className="bg-gradient-to-r from-green-400 to-green-700"
      />
      <Plan
        title="Basic"
        type="basic"
        price={30}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, tempora!"
        features={[
          {
            id: 1,
            description: 'Acceso al panel del resturante.',
            isAvailable: true,
          },
          {
            id: 2,
            description: 'Subida de imagenes.',
            isAvailable: true,
          },
          {
            id: 3,
            description: 'Gestion de restaurante.',
            isAvailable: true,
          },
          {
            id: 4,
            description: 'Gestion de mesas maximas 16 mesas.',
            isAvailable: true,
          },
          {
            id: 5,
            description: 'Gestion de pedidos.',
            isAvailable: true,
          },
          {
            id: 6,
            description: 'Gestion y Creacion de platos, bebidas, postres maximo 8 por categoria.',
            isAvailable: true,
          },
          {
            id: 7,
            description: '6 historias maximas subidas por dia',
            isAvailable: true,
          },
          {
            id: 8,
            description: 'Pedidos en tiempo real.',
            isAvailable: true,
          },
          {
            id: 9,
            description: 'Posicionate entre los primeros resultados de busqueda.',
            isAvailable: true,
          },
          {
            id: 10,
            description: 'Posicionate entre los mejores restaurantes.',
            isAvailable: false,
          },
          {
            id: 11,
            description: 'Gestion de usuarios.',
            isAvailable: false,
          },
          {
            id: 12,
            description: 'Gestion de roles.',
            isAvailable: false,
          },
          {
            id: 13,
            description: 'Gestion de permisos.',
            isAvailable: false,
          },
          {
            id: 14,
            description: 'Gestion de categorias.',
            isAvailable: true,
          },
          {
            id: 15,
            description: 'Gestion de ventas.',
            isAvailable: false,
          },
          {
            id: 16,
            description: 'Gestion de reportes.',
            isAvailable: false,
          },
          {
            id: 17,
            description: 'Gestion de comprobantes.',
            isAvailable: false,
          },
          {
            id: 18,
            description: 'Acceso a configuraciones.',
            isAvailable: true,
          },
          {
            id: 19,
            description: 'Acceso a la API.',
            isAvailable: false,
          },
        ]}
        className="bg-gradient-to-r from-blue-400 to-blue-700"
      />
      <Plan
        title="Premium"
        type="premium"
        price={60}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, tempora!"
        features={[
          {
            id: 1,
            description: 'Acceso al panel del resturante.',
            isAvailable: true,
          },
          {
            id: 2,
            description: 'Subida de imagenes.',
            isAvailable: true,
          },
          {
            id: 3,
            description: 'Gestion de restaurante.',
            isAvailable: true,
          },
          {
            id: 4,
            description: 'Gestion de mesas maximas 50 mesas.',
            isAvailable: true,
          },
          {
            id: 5,
            description: 'Gestion de pedidos.',
            isAvailable: true,
          },
          {
            id: 6,
            description: 'Gestion y Creacion de platos, bebidas, postres maximo 50 por categoria.',
            isAvailable: true,
          },
          {
            id: 7,
            description: '30 historias maximas subidas por dia',
            isAvailable: true,
          },
          {
            id: 8,
            description: 'Pedidos en tiempo real.',
            isAvailable: true,
          },
          {
            id: 9,
            description: 'Posicionate entre los primeros resultados de busqueda.',
            isAvailable: true,
          },
          {
            id: 10,
            description: 'Posicionate entre los mejores restaurantes.',
            isAvailable: true,
          },
          {
            id: 11,
            description: 'Gestion de usuarios.',
            isAvailable: true,
          },
          {
            id: 12,
            description: 'Gestion de roles.',
            isAvailable: true,
          },
          {
            id: 13,
            description: 'Gestion de permisos.',
            isAvailable: true,
          },
          {
            id: 14,
            description: 'Gestion de categorias.',
            isAvailable: true,
          },
          {
            id: 15,
            description: 'Gestion de ventas.',
            isAvailable: true,
          },
          {
            id: 16,
            description: 'Gestion de reportes.',
            isAvailable: true,
          },
          {
            id: 17,
            description: 'Gestion de comprobantes.',
            isAvailable: true,
          },
          {
            id: 18,
            description: 'Acceso a configuraciones.',
            isAvailable: true,
          },
          {
            id: 19,
            description: 'Acceso a la API.',
            isAvailable: false,
          },
        ]}
        className="bg-gradient-to-r from-purple-400 to-purple-700"
      />
      <Plan
        title="Enterprise"
        type="enterprise"
        price={900}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, tempora!"
        features={[
          {
            id: 1,
            description: 'Acceso al panel del resturante.',
            isAvailable: true,
          },
          {
            id: 2,
            description: 'Subida de imagenes.',
            isAvailable: true,
          },
          {
            id: 3,
            description: 'Gestion de restaurante.',
            isAvailable: true,
          },
          {
            id: 4,
            description: 'Gestion de mesas ilimitadas.',
            isAvailable: true,
          },
          {
            id: 5,
            description: 'Gestion de pedidos.',
            isAvailable: true,
          },
          {
            id: 6,
            description: 'Gestion y Creacion de platos, bebidas, postres ilimitados.',
            isAvailable: true,
          },
          {
            id: 7,
            description: 'Historias ilimitadas',
            isAvailable: true,
          },
          {
            id: 8,
            description: 'Pedidos en tiempo real.',
            isAvailable: true,
          },
          {
            id: 9,
            description: 'Posicionate entre los primeros resultados de busqueda.',
            isAvailable: true,
          },
          {
            id: 10,
            description: 'Posicionate entre los mejores restaurantes.',
            isAvailable: true,
          },
          {
            id: 11,
            description: 'Gestion de usuarios.',
            isAvailable: true,
          },
          {
            id: 12,
            description: 'Gestion de roles.',
            isAvailable: true,
          },
          {
            id: 13,
            description: 'Gestion de permisos.',
            isAvailable: true,
          },
          {
            id: 14,
            description: 'Gestion de categorias.',
            isAvailable: true,
          },
          {
            id: 15,
            description: 'Gestion de ventas.',
            isAvailable: true,
          },
          {
            id: 16,
            description: 'Gestion de reportes.',
            isAvailable: true,
          },
          {
            id: 17,
            description: 'Gestion de comprobantes.',
            isAvailable: true,
          },
          {
            id: 18,
            description: 'Acceso a configuraciones.',
            isAvailable: true,
          },
          {
            id: 19,
            description: 'Acceso a la API.',
            isAvailable: true,
          },
        ]}
        className="bg-gradient-to-r from-red-400 to-red-700"
      />
    </div>
  );
};

export default SubscriptionPlansPage;
