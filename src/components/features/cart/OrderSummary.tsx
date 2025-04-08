interface OrderSummaryProps {
    orderId?: string;     
    subtotal: number;     
    deliveryFee?:  number | string;  
    discount: number;     
    paid?: boolean;       
    currency?: string;    
  }
  
  
  const OrderSummary = ({
    orderId,
    subtotal=0,
    deliveryFee=0,
    discount=0,
    paid = false,
    currency = 'USD'
  }: OrderSummaryProps) => {

    const safeNumber = (value: unknown): number => {
        if (typeof value === 'string') {
          
          const cleanedValue = value.replace(/[^0-9.-]/g, '')
          const parsed = parseFloat(cleanedValue)
          return Number.isFinite(parsed) ? parsed : 0
        }
        const num = Number(value)
        return Number.isFinite(num) ? num : 0
      };

       
  const safeSubtotal = safeNumber(subtotal)
  const safeDeliveryFee = safeNumber(deliveryFee)
  const safeDiscount = safeNumber(discount)


  const calculateTotal = () => {
    return safeSubtotal + (Number.isFinite(safeDeliveryFee) ? safeDeliveryFee : 0) - safeDiscount
  };
   
    const formatCurrency = (value: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(value);
    };

  
    
    const summaryRows = [
      { 
        label: 'Subtotal',
        value: safeSubtotal,
        emphasis: true,
        secondary: false
      },
      {
        label: 'Delivery fee',
        value: deliveryFee,
        emphasis: false,
        secondary: true
      },
      {
        label: 'Discount',
        value: -discount,
        emphasis: false,
        format: (v: number) => v === 0 ? 'Free' : formatCurrency(v),
        secondary: true
      }
    ];
  
    return (
      <div className="space-y-3">
       
        {summaryRows.map((row, index) => (
          <div key={row.label} className="flex justify-between">
            <span className={
              `pl-2 ${row.secondary ? 'text-gray-500' : 'text-gray-800'} 
              ${!row.secondary && 'font-semibold'}`
            }>
              {row.label}
            </span>
            <span className={
              `${row.emphasis ? 'font-semibold' : ''} 
              ${row.secondary ? 'text-gray-500' : 'text-gray-800'}`
            }>
              {row.value !== undefined ? formatCurrency(Number(row.value)) : '-'}
            </span>
          </div>
        ))}
        
        <hr className="border-dashed border-t-2 my-2" />
  
        
        <div className="flex justify-between font-semibold text-lg">
          <span className="pl-2">Total</span>
          <span>{formatCurrency(calculateTotal())}</span>
        </div>
  
        
        {orderId && (
          <div className="pt-4 border-t mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 pl-2">Payment Status</span>
              <span className={paid ? 'text-green-600' : 'text-red-600'}>
                {paid ? 'Paid' : 'Unpaid'}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-gray-500 pl-2">Amount Paid</span>
              <span className="font-medium">
                {paid ? formatCurrency(calculateTotal()) : formatCurrency(0)}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default OrderSummary;