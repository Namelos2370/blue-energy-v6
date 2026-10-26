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
    colorImages?: Record<string, number>; // couleur -> index de la photo à afficher
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
    images: ["/images/pull-blanc.jpg", "/images/pull-blanc-2.jpg", "/images/pull-blanc-3.jpg", "/images/pull-blanc-4.jpg"],
    stock: 10,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Blanc"]
  },
  {
    id: 3,
    title: "Casquette Blue Energy",
    price: 5000,
    tag: "Accessoire",
    desc: "Casquette en coton épais, visière courbée avec surpiqûres, œillets de ventilation, fermeture ajustable et broderie Blue Energy en relief.",
    category: 'accessoire',
    images: [
      "/images/casquette-navy.jpg",
      "/images/casquette-bordeaux.jpg",
      "/images/casquette-kaki.jpg"
    ],
    stock: 15,
    sizes: ["Unique"],
    colors: ["Navy", "Bordeaux", "Kaki"],
    colorImages: { "Navy": 0, "Bordeaux": 1, "Kaki": 2 }
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
    title: "Polo Manches Longues",
    price: 7000,
    tag: "Nouveau",
    desc: "Polo à manches longues : col chemise sur encolure en V, manches rayées et broderie Blue Energy. Une pièce habillée et confortable, disponible en trois couleurs.",
    category: 'polo',
    images: ["/images/polo-ml-navy.jpg", "/images/polo-ml-bordeaux.jpg", "/images/polo-ml-kaki.jpg"],
    stock: 10,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Navy", "Bordeaux", "Kaki"],
    colorImages: { "Navy": 0, "Bordeaux": 1, "Kaki": 2 }
  },
  {
    id: 6,
    title: "T-shirt Signature",
    price: 6500,
    tag: "Nouveau",
    desc: "T-shirt en coton jersey, col côtelé et coupe ajustée, avec la broderie Blue Energy bleu marine sur la poitrine.",
    category: 't-shirt',
    images: ["/images/tshirt-sauge.jpg", "/images/tshirt-noir-1.jpg", "/images/tshirt-noir-2.jpg", "/images/tshirt-noir-3.jpg", "/images/tshirt-noir-4.jpg", "/images/tshirt-noir-5.jpg"],
    stock: 20,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sauge", "Noir"],
    colorImages: { Sauge: 0, Noir: 1 }
  }
];
