import { useEffect, useState } from 'react';
import ClientAxios from '@/config/ClientAxios';
import Plan from '@/subscription-plans/components/Plan';
import { SubscriptionPlan } from '@/subscription-plans/interfaces';
import { COLORS_BACKGROUND } from '@/subscription-plans/constants';

const SubscriptionPlansPage = () => {
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>([]);

  useEffect(() => {
    const fetchSubscriptionPlans = async () => {
      const { data } = await ClientAxios.get('/subscription-plan');

      setSubscriptionPlans(data);
    };
    fetchSubscriptionPlans();
  }, []);

  return (
    <div className="container mx-auto py-10 flex flex-wrap items-stretch justify-center gap-4">
      {subscriptionPlans.map((subscriptionPlan) => (
        <Plan key={subscriptionPlan._id} plan={subscriptionPlan} className={COLORS_BACKGROUND[subscriptionPlan.type]} />
      ))}
    </div>
  );
};

export default SubscriptionPlansPage;
