
// ─── Types ───────────────────────────────────────────────────────────────────
export interface CartItem {
    name: string;
    barcode: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface BillRecord {
    id: string;
    date: string;
    time: string;
    items: CartItem[];
    subtotal: number;
    grandTotal: number;
}