interface StatisticsCardProps {
  title: string;
  value: string;
  bgColor: string;
  textColor: string;
}

export default function StatisticsCard({
  title,
  value,
  bgColor,
  textColor,
}: StatisticsCardProps) {
  return (
    <div
      className={`p-4 ${bgColor} rounded-lg`}
      role="region"
      aria-label={title}
    >
      <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
      <p className="text-2xl font-bold" aria-label={`${title}: ${value}`}>
        {value}
      </p>
    </div>
  );
}
