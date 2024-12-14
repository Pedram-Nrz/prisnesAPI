import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function seed() {
   
  const user = await prisma.user.create({
        data:{
            name:"pedram",
            email:"pedram@p.com",
            password:"dummypassword"
        },
        select:{name:true, email:true, id:true}
    });

   const products = await prisma.product.createMany({
    data:[
        { "productName": "Laptop", "price": 899.00, "stockQuantity": 15 },
        { "productName": "Smartphone", "price": 699.00, "stockQuantity": 25 },
        { "productName": "Headphones", "price": 150.00, "stockQuantity": 30 },
        { "productName": "Tablet", "price": 320.00, "stockQuantity": 20 },
        { "productName": "Smartwatch", "price": 199.00, "stockQuantity": 40 },
        { "productName": "Camera", "price": 450.00, "stockQuantity": 10 },
        { "productName": "Monitor", "price": 250.00, "stockQuantity": 8 },
        { "productName": "Keyboard", "price": 60.00, "stockQuantity": 50 },
        { "productName": "Mouse", "price": 25.00, "stockQuantity": 100 },
        { "productName": "Printer", "price": 150.00, "stockQuantity": 12 }
      ],
    skipDuplicates:true
    });  

  console.log({ user, products });
}

// execute seed() to seed the db
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => { 
    await prisma.$disconnect();
  });
