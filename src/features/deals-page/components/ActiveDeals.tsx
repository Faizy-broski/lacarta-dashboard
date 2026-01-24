import DealCard from "../components/DealCard"

export default function ActiveDeals() {
  return (
    <div>
      <h2 className="font-semibold mb-4">
        Active Deals <span className="text-muted-foreground">(4)</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((_, i) => (
          <DealCard
            key={i}
            image="https://picsum.photos/400/300"
            profile="https://picsum.photos/400/300"
            name="La Vitrola"
            title="20% Off Spa Experience"
            company="Casa San Agustin"
            date="Jan 1 – Mar 31"
            tags={["Featured"]}
          />
        ))}
      </div>
    </div>
  )
}
