import mongoose from "mongoose";
import dotenv from "dotenv";
import ProductModel from "./Models/Product.model.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_STRING;

const categories = [
  {
    name: "Laptop",
    brands: ["Acer", "Asus", "Dell", "HP", "Lenovo", "Apple", "MSI", "Samsung"],
    suffix: "Laptop",
  },
  {
    name: "Mobile",
    brands: ["Samsung", "Apple", "Xiaomi", "OnePlus", "Realme", "Vivo", "Oppo", "Nokia"],
    suffix: "Phone",
  },
  {
    name: "MotherBoard",
    brands: ["ASUS", "Gigabyte", "MSI", "ASRock", "Biostar", "Intel"],
    suffix: "Board",
  },
  {
    name: "Processer",
    brands: ["Intel", "AMD"],
    suffix: "Processor",
  },
];

const cores = [
  "i3",
  "i5",
  "i7",
  "i9",
  "Ryzen 3",
  "Ryzen 5",
  "Ryzen 7",
  "Ryzen 9",
];

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDateBetween(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function getCategoryByIndex(index) {
  return categories[index % categories.length];
}

function generateProduct(i) {
  const categoryObj = getCategoryByIndex(i);

  const createdAt = randomDateBetween(
    new Date("2022-01-01T00:00:00.000Z"),
    new Date("2024-12-31T23:59:59.000Z")
  );

  const updatedAt = new Date(
    createdAt.getTime() + randomInt(1, 1000 * 60 * 60 * 24 * 30)
  );

  const brand = categoryObj.brands[i % categoryObj.brands.length];

  return {
    name: `${brand} ${categoryObj.suffix} ${i + 1}`,
    model_number: `${categoryObj.name.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(6, "0")}`,
    category: categoryObj.name,
    core: categoryObj.name === "Laptop" || categoryObj.name === "Processer"
      ? cores[randomInt(0, cores.length - 1)]
      : undefined,
    createdAt,
    updatedAt,
  };
}

async function seed() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await ProductModel.deleteMany({});

    const total = 200000;
    const batchSize = 5000;

    for (let start = 0; start < total; start += batchSize) {
      const batch = [];

      for (let i = start; i < Math.min(start + batchSize, total); i++) {
        const item = generateProduct(i);

        if (item.core === undefined) {
          delete item.core;
        }

        batch.push(item);
      }

      await ProductModel.insertMany(batch, { ordered: false });
      console.log(`Inserted ${Math.min(start + batchSize, total)} / ${total}`);
    }

    console.log("200000 records inserted successfully");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Seeding failed:", error);
    await mongoose.disconnect();
  }
}

seed();