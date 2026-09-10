import { PayStatus } from "@/components/pay-status";

export default async function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PayStatus orderId={id} />;
}
