import PlanCard from "./PlanCard"

export default function PlanGrid() {
  return (
    <section className="space-y-4 my-4">
      <h2 className="text-xl font-semibold">Plan Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <PlanCard
          title="Free"
          price="$0"
          subtitle="Free"
          features={[
            "5 posts per month",
            "1 real estate listing",
            "Basic support",
          ]}
          accent="gray"
        />

        <PlanCard
          title="Standard"
          price="$19"
          subtitle="7 days free trial"
          features={[
            "25 posts per month",
            "10 real estate listings",
            "Email support",
          ]}
          accent="gold"
        />

        <PlanCard
          title="Premium"
          price="$49"
          subtitle="14 days free trial"
          features={[
            "100 posts per month",
            "Priority support",
            "Advanced analytics",
          ]}
          accent="red"
          active
        />

        <PlanCard
          title="Elite"
          price="$99"
          subtitle="30 days free trial"
          features={[
            "Unlimited posts",
            "Dedicated support",
            "Full analytics suite",
          ]}
          accent="green"
        />
      </div>
    </section>
  )
}
