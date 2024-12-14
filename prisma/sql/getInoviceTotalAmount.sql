SELECT SUM(i.quantity * p.price * (1 - i."itemDiscount")) as totalAmount
FROM "InvoiceItems" i
JOIN "Product" p ON i."productId" = p.id
WHERE i."invoiceId" = $1