import PreviewCard from "./PreviewCard";
import data from "../../../../../assets/example1.json";
import PreviewPlaceholder from "../../../../../ui/PreviewPlaceholder";

interface SummaryCardProps {
  summary: string;
  title: string;
}

const SummaryCard = ({ summary, title }: SummaryCardProps) => (
  <PreviewCard title={title}>
    <PreviewPlaceholder
      justify
      size={300}
      value={summary}
      placeholder={data.summary}
    />
  </PreviewCard>
);

export default SummaryCard;
