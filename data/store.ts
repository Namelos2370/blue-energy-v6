// Types définis pour toute l'application
export type Product = {
    id: number;
    title: string;
    price: number;
    tag: string;
    desc: string;
    category: 'hoodie' | 't-shirt' | 'accessoire';
    images: string[]; // Tableau d'images pour la galerie
    stock: number;
    sizes: string[];  // ex: ['S', 'M', 'L']
    colors: string[]; // ex: ['Navy', 'Black']
  };
  
  export type CartItem = Product & { 
    quantity: number;
    selectedSize: string;
    selectedColor: string;
  };
  
  // Tes Produits (V5)
  export const INITIAL_PRODUCTS: Product[] = [
    {
      id: 1,
      title: "The Signature Hoodie",
      price: 10000,
      tag: "Best Seller",
      desc: "Molleton lourd 350g. Intérieur gratté. Coupe intemporelle. Le must-have de la saison.",
      category: 'hoodie',
      images: ["/images/hoodie.png"], 
      stock: 10,
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Navy Blue", "Black"]
    },
    {
      id: 2,
      title: "Classic Polo Navy",
      price: 6000,
      tag: "Premium",
      desc: "100% Coton piqué. Col structuré indéformable. Une élégance discrète pour le bureau ou les sorties.",
      category: 't-shirt',
      images: ["/images/polo.png"],
      stock: 25,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "White"]
    },
    {
      id: 3,
      title: "Emblem Cap",
      price: 2500,
      tag: "Accessoire",
      desc: "Twill de coton, broderie 3D et boucle métal ajustable.",
      category: 'accessoire',
      images: ["/images/cap.png"],
      stock: 5,
      sizes: ["Unique"],
      colors: ["Navy", "Black"]
    }
  ];