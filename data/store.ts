// Types définis pour toute l'application
export type Category = 'hoodie' | 't-shirt' | 'polo' | 'jogging' | 'accessoire';

export type PromoCode = {
  code: string;
  percent: number;
};

export type Product = {
    id: number;
    title: string;
    price: number;
    tag: string;
    desc: string;
    category: Category;
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
  
  // Catalogue (grille des prix professionnelle — broderie uniquement)
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "The Signature Hoodie",
    price: 10000,
    tag: "Best Seller",
    desc: "Pull à capuche en molleton lourd, intérieur gratté, broderie Blue Energy. Coupe oversize intemporelle.",
    category: 'hoodie',
    images: ["/images/hoodie.png"],
    stock: 10,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Navy"]
  },
  {
    id: 2,
    title: "Classic Polo Navy",
    price: 7000,
    tag: "Premium",
    desc: "Coton piqué, col structuré indéformable, broderie Blue Energy. Une élégance discrète pour le bureau ou les sorties.",
    category: 'polo',
    images: ["/images/polo.png"],
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "White"]
  },
  {
    id: 3,
    title: "Emblem Cap",
    price: 5000,
    tag: "Accessoire",
    desc: "Casquette en twill de coton, broderie 3D et boucle métal ajustable.",
    category: 'accessoire',
    images: ["/images/cap.png"],
    stock: 5,
    sizes: ["Unique"],
    colors: ["Navy", "Black"]
  },
  {
    id: 4,
    title: "Ensemble Bleu Ciel",
    price: 18000,
    tag: "Nouveau",
    desc: "Pull à capuche + pantalon jogging assortis en molleton épais, bleu ciel, broderie Blue Energy sur les deux pièces. Le look complet.",
    category: 'jogging',
    images: ["/images/ensemble-1.jpg", "/images/ensemble-2.jpg"],
    stock: 10,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Bleu ciel"]
  },
  {
    id: 5,
    title: "T-shirt Signature",
    price: 6500,
    tag: "Nouveau",
    desc: "T-shirt oversize en coton épais, coupe ample et confortable, broderie Blue Energy sur la poitrine.",
    category: 't-shirt',
    images: ["/images/tshirt.jpg"],
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Blanc"]
  }
];
