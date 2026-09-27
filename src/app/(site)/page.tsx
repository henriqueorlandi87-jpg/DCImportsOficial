"use client";

import { useState, useRef } from "react";

interface Product {
  id: number;
  name: string;
  concentration: string;
  description: string;
  manufacturer: string;
  image: string;
  category: string;
  priceBRL: number;
  oldPriceBRL?: number;
}

interface CartItem extends Product {
  quantity: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Tirzepatida TG 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "INDUFAR",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/tg15-450x450.png",
    category: "TIRZEPATIDA",
    priceBRL: 810,
  },
  {
    id: 2,
    name: "Tirzepatida Lipolles 60mg MD",
    concentration: "1 ampola de 60mg MD",
    description: "Ampola única - total de 60mg.",
    manufacturer: "ETICOS",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/site/media/fotos/produtos/thumbs/big/068c98b7954bf75eb4648aab973bbd167f1fe674.webp",
    category: "TIRZEPATIDA",
    priceBRL: 810,
  },
  {
    id: 3,
    name: "Tirzepatida Lipolles 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "ETICOS",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/site/media/fotos/produtos/thumbs/med/f05ee02e9de115f9378ba1c6bad6e30fcec98ee0.webp",
    category: "TIRZEPATIDA",
    priceBRL: 770,
  },
  {
    id: 4,
    name: "Tirzepatida Tirzec 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "QUIMFA",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_tirzec_15mg_05ml_204052_8e485f7a-bbba-4896-bb61-624a2086ad87.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 810,
  },
  {
    id: 5,
    name: "Tirzepatida Lipoland 60mg MD",
    concentration: "Ampola de 60mg",
    description: "Ampola única de 60 mg.",
    manufacturer: "LIPOLAND",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_lipoland_15mg_05ml_1_frasco_204051_e161ad05-31c6-42e2-9beb-476d9bca90a8.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 810,
  },
  {
    id: 6,
    name: "Tirzepatida Lipoland 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "LIPOLAND",
    image: "https://i.imgur.com/q0bNmmg.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 810,
  },
  {
    id: 7,
    name: "Tirzepatida Gluconex 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "GLUCONEX",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_gluconex_15mg_1ml_198243_ea91a962-658e-400f-959e-e657ff300229.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 8,
    name: "Tirzepatida Tirzedral MD 60mg",
    concentration: "60mg por ampola",
    description: "Ampola única de 60mg.",
    manufacturer: "Tirzedral",
    image: "https://i.imgur.com/jqnSlJZ.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 9,
    name: "Tirzepatida T-36 MD",
    concentration: "60mg por ampola",
    description: "Ampola única de 60mg.",
    manufacturer: "T 36",
    image: "https://i.imgur.com/5GsdacB.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 10,
    name: "Tirzepatida Tirzedral 15mg",
    concentration: "15mg por Ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "TIRZEDRAL",
    image: "https://i.imgur.com/YiYwyzG.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 11,
    name: "Tirzepatida T-36",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "T 36",
    image: "https://i.imgur.com/hdsp60w.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 12,
    name: "Tirzepatida Slimex 60mg MD",
    concentration: "60mg por ampola",
    description: "Ampola única de 60mg.",
    manufacturer: "SLIMEX",
    image: "https://i.imgur.com/tjwbUdX.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 13,
    name: "Tirzepatida Slimex 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "SLIMEX",
    image: "https://i.imgur.com/DfBA172.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 780,
  },
  {
    id: 14,
    name: "Tirzepatida TNL 60mg MD",
    concentration: "60mg MD",
    description: "Ampola única de 60mg.",
    manufacturer: "TNL",
    image:"https://i.imgur.com/QdlfuMl.png",
    category: "TIRZEPATIDA",
    priceBRL: 720,
  },
  {
    id: 15,
    name: "Tirzepatida TNL 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "TNL",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/screenshot2026-06-17072403-450x450.png",
    category: "TIRZEPATIDA",
    priceBRL: 720,
  },
  {
    id: 16,
    name: "Tirzepatida Thera Genetics 60mg Caneta",
    concentration: "Caneta de 60mg",
    description: "Caneta de 60mg",
    manufacturer: "THERA GENETICS",
    image: "https://totalvape.s3.sa-east-1.amazonaws.com/products/809d11f9-4184-4f3b-9817-87e35b03d869.webp?v=1789486203",
    category: "TIRZEPATIDA",
    priceBRL: 850,
  },
  {
    id: 17,
    name: "Tirzepatida Synedica Labs 240mg",
    concentration: "Ampola de 60mg",
    description: "4 Ampolas de 60mg cada, totalizando 240mg",
    manufacturer: "SYNEDICA",
    image: "https://totalvape.s3.sa-east-1.amazonaws.com/products/2373d4ce-a3f0-41f6-9a82-c19326c71932.webp?v=1790015402",
    category: "TIRZEPATIDA",
    priceBRL: 1120,
  },
  {
    id: 18,
    name: "Tirzepatida Synédica Labs 60mg",
    concentration: "Ampola de 60mg",
    description: "1 ampola de 60mg Liofilizada",
    manufacturer: "SYNEDICA",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/tirzerpsynedica-450x450.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 640,
  },
  {
    id: 19,
    name: "Tirzepatida Tirzegen 60mg",
    concentration: "Ampola com 60mg",
    description: "1 ampola de 60mg Liofilizada",
    manufacturer: "OXYGEN",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRy72LOGaxsr1sw6BW97tuoW_nzobcORohg3MtRVNAaXdbNPYXcRIvxrrS&s=10",
    category: "TIRZEPATIDA",
    priceBRL: 810,
  },
  {
    id: 20,
    name: "Tirzepatida Thera 60mg",
    concentration: "60mg",
    description: "1 ampola de 60mg Liofilizada",
    manufacturer: "THERA",
    image: "https://totalvape.s3.sa-east-1.amazonaws.com/products/4ab49fda-5950-4cfb-a960-afdd172d509f.webp?v=1790105403",
    category: "TIRZEPATIDA",
    priceBRL: 670,
  },
  {
    id: 21,
    name: "Tirzepatida ZPHC 150mg",
    concentration: "30mg em cada ampola",
    description: "5 ampolas de 30mg cada, totalizando 150mg",
    manufacturer: "ZPHC",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53s0QOwEVuAwj4bE7hARl85vFrNJQFKHN3uqMQi0q3g&s",
    category: "TIRZEPATIDA",
    priceBRL: 1850,
  },
  {
    id: 22,
    name: "Tirzepatida ZPHC 75mg Caneta",
    concentration: "75mg em 1 caneta",
    description: "1 Caneta de 75mg",
    manufacturer: "ZPHC",
    image: "https://precosnoparaguai.s3.amazonaws.com/product_images/d8422ea5-cd2e-4dbc-90e2-c97cdf20aed8.png",
    category: "TIRZEPATIDA",
    priceBRL: 1400,
  },
  {
    id: 24,
    name: "Biogenesis 60mg",
    concentration: "ampola com 60mg",
    description: "1 Ampola de 60mg Liofilizada",
    manufacturer: "BIOGENESIS",
    image: "https://i.imgur.com/hxiLmH8.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 580,
  },
  {
    id: 25,
    name: "Biogenesis 120mg",
    concentration: "Ampola com 120mg",
    description: "1 Ampola de 120mg Liofilizada",
    manufacturer: "BIOGENESIS",
    image: "https://i.imgur.com/x58SMEk.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 990,
  },
  {
    id: 27,
    name: "USA Peptideos 60mg",
    concentration: "Ampola de 60mg",
    description: "1 ampola de 60mg",
    manufacturer: "USA Peptides",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUe4Su9lQYYjGHgC9vhOdsjTA6OCCZuNoPz6ae8DTMPQ&s=10",
    category: "TIRZEPATIDA",
    priceBRL: 790,
  },
  {
    id: 28,
    name: "USA Peptideos 120mg",
    concentration: "120mg",
    description: "1 Ampola de 120mg",
    manufacturer: "USA Peptides",
    image: "https://res.cloudinary.com/dpoxr28p0/image/fetch/f_auto,q_auto:good,w_800,c_limit/https%3A%2F%2Fwww.royalvitta.com%2Fproducts%2Fusa-peptides-tirzepatida-120mg-4ml-frasco-multidose.webp%3Fv%3Db003b5c1",
    category: "TIRZEPATIDA",
    priceBRL: 1190,
  },
  {
    id: 101,
    name: "Retatrutida USA 40mg",
    concentration: "1 ampola de 40mg",
    description: "1 Ampola liofilizada de 40mg.",
    manufacturer: "USA Peptides",
    image: "https://i.imgur.com/AytqfCL.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 790.00,
  },
  {
    id: 102,
    name: "Retatrutida USA 150mg",
    concentration: "150mg",
    description: "1 Ampola liofilizada de 150mg.",
    manufacturer: "USA Peptides",
    image: "https://i.imgur.com/Rg2Yq5U.png",
    category: "RETATRUTIDA",
    priceBRL: 1100.00,
  },
  {
    id: 103,
    name: "Retatrutida Retagen Oxygen 40mg Caneta",
    concentration: "40mg Caneta",
    description: "Apresentação em 1 caneta de 40mg.",
    manufacturer: "RETAGEN OXYGEN",
    image: "",
    category: "RETATRUTIDA",
    priceBRL: 920.00,
  },
  {
    id: 104,
    name: "Retatrutida Retagen Oxygen 60mg Liofilizada",
    concentration: "60mg Liofilizada",
    description: "1 Ampola liofilizada de 60mg.",
    manufacturer: "RETAGEN OXYGEN",
    image: "https://i.imgur.com/RC3yU34.png",
    category: "RETATRUTIDA",
    priceBRL: 880.00,
  },
  {
    id: 105,
    name: "Retatrutida Retagen Oxygen 80mg Diluida",
    concentration: "80mg Diluída",
    description: "Apresentação diluída de 80mg.",
    manufacturer: "RETAGEN OXYGEN",
    image: "https://i.imgur.com/n9Dqw0I.png",
    category: "RETATRUTIDA",
    priceBRL: 920.00,
  },
  {
    id: 106,
    name: "Retatrutida Retagen Oxygen 160mg Diluida",
    concentration: "160mg Diluída",
    description: "1 Apresentação diluída de 160mg.",
    manufacturer: "RETAGEN OXYGEN",
    image: "https://i.imgur.com/TtmkBPE.png",
    category: "RETATRUTIDA",
    priceBRL: 1250.00,
  },
  {
    id: 107,
    name: "Retatrutida TNL 48mg Caneta Diluida",
    concentration: "48mg Diluída",
    description: "1 Caneta diluída de 48mg.",
    manufacturer: "TNL",
    image: "https://i.imgur.com/YVyo6LA.png",
    category: "RETATRUTIDA",
    priceBRL: 730.00,
  },
  {
    id: 108,
    name: "Retatrutida TNL 100mg Liofilizada",
    concentration: "100mg Liofilizada",
    description: "1 Ampola liofilizada de 100mg.",
    manufacturer: "TNL",
    image: "https://i.imgur.com/rjjgV6P.png",
    category: "RETATRUTIDA",
    priceBRL: 1560.00,
  },
  {
    id: 109,
    name: "Retatrutida Gen Health 60mg Caneta",
    concentration: "60mg Caneta",
    description: "1 Caneta de 60mg.",
    manufacturer: "GEN HEALTH",
    image: "https://i.imgur.com/qbgIWbp.png",
    category: "RETATRUTIDA",
    priceBRL: 1050.00,
  },
  {
    id: 110,
    name: "Retatrutida Gen Health 60mg Liofilizada",
    concentration: "60mg Liofilizada",
    description: "Ampola liofilizada de 60mg.",
    manufacturer: "GEN HEALTH",
    image: "https://i.imgur.com/p8uDaCz.png",
    category: "RETATRUTIDA",
    priceBRL: 900.00,
  },
  {
    id: 111,
    name: "Retatrutida Gen Health 90mg Liofilizada",
    concentration: "90mg Liofilizada",
    description: "1 Ampola liofilizada de 90mg.",
    manufacturer: "GEN HEALTH",
    image: "https://i.imgur.com/PodXezY.png",
    category: "RETATRUTIDA",
    priceBRL: 1050.00,
  },
  {
    id: 112,
    name: "Retatrutida Gen Health 120mg Liofilizada",
    concentration: "120mg Liofilizada",
    description: "Ampola liofilizada de 120mg.",
    manufacturer: "GEN HEALTH",
    image: "https://i.imgur.com/jYWxAnq.png",
    category: "RETATRUTIDA",
    priceBRL: 1250.00,
  },
  {
    id: 113,
    name: "Retatrutida Gen Health 240mg Liofilizada",
    concentration: "240mg Liofilizada",
    description: "1 Ampola liofilizada de 240mg.",
    manufacturer: "GEN HEALTH",
    image: "",
    category: "RETATRUTIDA",
    priceBRL: 2060.00,
  },
  {
    id: 114,
    name: "Retatrutida Gen Health 300mg Liofilizada",
    concentration: "300mg Liofilizada",
    description: "1 Ampola liofilizada de 300mg.",
    manufacturer: "GEN HEALTH",
    image: "",
    category: "RETATRUTIDA",
    priceBRL: 2460.00,
  },
  {
    id: 115,
    name: "Retatrutida Veltrane 90mg",
    concentration: "90mg Diluida",
    description: "1 Ampola de 90mg Diluida.",
    manufacturer: "VELTRANE",
    image: "https://i.imgur.com/bJiueg9.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 920.00,
  },
  {
    id: 116,
    name: "Retatrutida Veltrane 120mg",
    concentration: "120mg Diluida",
    description: "1 Ampola de 120mg.",
    manufacturer: "VELTRANE",
    image: "https://i.imgur.com/TNZboX9.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 1050.00,
  },
  {
    id: 117,
    name: "Retatrutida Biogenesis 120mg",
    concentration: "120mg",
    description: "1 Ampola de 120mg Liofilizada.",
    manufacturer: "BIOGENESIS",
    image: "https://i.imgur.com/PGLjTOO.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 990.00,
  },
  {
    id: 118,
    name: "Retatrutida Synedica 40 mg Caneta Verde",
    concentration: "40mg Caneta Verde",
    description: "1 Caneta verde de 40mg.",
    manufacturer: "SYNEDICA",
    image: "https://i.imgur.com/MqNWgEZ.png",
    category: "RETATRUTIDA",
    priceBRL: 850.00,
  },
  {
    id: 119,
    name: "Retatrutida Synedica 60 mg Liofilizada",
    concentration: "60mg Liofilizada",
    description: "1 Ampola liofilizada de 60mg.",
    manufacturer: "SYNEDICA",
    image: "https://i.imgur.com/7nRbebI.png",
    category: "RETATRUTIDA",
    priceBRL: 780.00,
  },
  {
    id: 11999,
    name: "Retatrutida Synedica 120 mg Liofilizada",
    concentration: "120mg Liofilizada",
    description: "1 Ampola liofilizada de 120mg.",
    manufacturer: "SYNEDICA",
    image: "https://i.imgur.com/TzzSmug.png",
    category: "RETATRUTIDA",
    priceBRL: 930.00,
  },
  {
    id: 1199,
    name: "Retatrutida Synedica 240 mg Liofilizada",
    concentration: "240mg Liofilizada",
    description: "1 Ampola liofilizada de 240mg.",
    manufacturer: "SYNEDICA",
    image: "https://i.imgur.com/R4h0GAD.png",
    category: "RETATRUTIDA",
    priceBRL: 1550.00,
  },
  {
    id: 120,
    name: "Retatrutida Synedica 60mg Diluido",
    concentration: "60mg Diluído",
    description: "1 Ampola diluída de 60mg.",
    manufacturer: "SYNEDICA",
    image: "https://i.imgur.com/PxveRNt.png",
    category: "RETATRUTIDA",
    priceBRL: 790.00,
  },
  {
    id: 121,
    name: "Retatrutida Synedica 100mg Diluido",
    concentration: "100mg Diluído",
    description: "1 Ampola diluída de 100mg.",
    manufacturer: "SYNEDICA",
    image: "https://i.imgur.com/YUCFlah.png",
    category: "RETATRUTIDA",
    priceBRL: 890.00,
  },
  {
    id: 122,
    name: "Retatrutida Thera 40mg",
    concentration: "40mg",
    description: "1 Ampola de 40mg.",
    manufacturer: "THERA",
    image: "https://i.imgur.com/WK0kNRh.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 660.00,
  },
  {
    id: 123,
    name: "Retatrutida Thera 40 mg Caneta",
    concentration: "40mg Caneta",
    description: "1 Caneta de 40mg.",
    manufacturer: "THERA",
    image: "https://i.imgur.com/taLaekI.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 880.00,
  },
  
  {
    id: 125,
    name: "Retatrutida Ipeptide 120mg",
    concentration: "120mg",
    description: "1 Ampola de 120mg Liofilizada.",
    manufacturer: "IPEPTIDE",
    image: "https://i.imgur.com/dRfSpNH.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 920.00,
  },
  {
    id: 126,
    name: "Retatrutida ZPHC 60 mg 5 Ampolas Liofilizada",
    concentration: "60mg em 5 ampolas",
    description: "1 Caixa com 5 ampolas liofilizadas de 12 mg cada.",
    manufacturer: "ZPHC",
    image: "https://i.imgur.com/F5aIbVF.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 1950.00,
  },
  {
    id: 127,
    name: "Retatrutida ZPHC 60 mg Caneta",
    concentration: "60mg Caneta",
    description: "1 Caneta de 60mg.",
    manufacturer: "ZPHC",
    image: "https://i.imgur.com/eA8ndkW.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 2050.00,
  },
  {
    id: 128,
    name: "Retatrutida ZPHC 80mg 5 ampolas Liofilizado",
    concentration: "80mg em 5 ampolas",
    description: "1 Caixa com 5 ampolas liofilizadas de 16 mg cada.",
    manufacturer: "ZPHC",
    image: "https://i.imgur.com/F5aIbVF.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 2260.00,
  },
  {
    id: 129,
    name: "Retatrutida ZPHC 120mg 5 ampolas Liofilizado",
    concentration: "120mg em 5 ampolas",
    description: "1 Caixa com 5 ampolas liofilizadas de 24 mg cada.",
    manufacturer: "ZPHC",
    image: "https://i.imgur.com/F5aIbVF.jpeg",
    category: "RETATRUTIDA",
    priceBRL: 3120.00,
  },
];

const categories = ["PROMOÇÕES", "RETATRUTIDA", "TIRZEPATIDA", "PEPTÍDEOS", "HORMÔNIOS"];

export default function ZPHCStorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("PROMOÇÕES");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartRef = useRef<HTMLDivElement>(null);

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredProducts = productsData.filter((p) => {
    if (searchTerm.trim() !== "") {
      return (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return selectedCategory === "PROMOÇÕES" 
      ? (p.oldPriceBRL && p.oldPriceBRL > p.priceBRL) 
      : (p.category === selectedCategory);
  });

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const totalBRL = cart.reduce((acc, item) => acc + (item.priceBRL * item.quantity), 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;
    const phoneNumber = "5511985183140";
    let message = "Olá! Gostaria de fazer o seguinte pedido na Dc Imports (Pagamento via PIX):%0A";
    cart.forEach((item, index) => {
      message += `%0A${index + 1}. ${item.name} (${item.concentration}) - Qtd: ${item.quantity} - R$ ${(item.priceBRL * item.quantity).toFixed(2)}`;
    });
    message += `%0A%0A*Total Geral:* R$ ${totalBRL.toFixed(2)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-blue-950 text-white pb-20">
      {/* Cabeçalho */}
      <header className="bg-blue-900 text-white border-b border-blue-800 sticky top-0 z-50 py-4 px-8 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
            <h1 className="text-xl font-extrabold tracking-tight">Dc Imports</h1>
        </div>
        <button 
          onClick={scrollToCart}
          className="bg-white/10 hover:bg-white/25 transition-all px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 cursor-pointer border border-white/10 shadow-sm"
        >
          🛒 Carrinho: <span className="font-bold text-white">{totalItemsCount}</span> itens
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Bloco de Boas-Vindas Verde */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white border border-emerald-400 rounded-3xl p-8 mb-10 shadow-xl text-center">
          <h2 className="text-3xl font-extrabold mb-2">Bem-vindo à Dc Imports! 🚀</h2>
          <p className="text-emerald-100 max-w-2xl mx-auto mb-6 text-base font-medium">
            Trabalhamos com encomendas que vêm <strong>diretamente do Paraguai</strong>, garantindo qualidade e os melhores produtos para você.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto text-sm">
            <div className="bg-white text-emerald-900 p-4 rounded-2xl flex items-center justify-center gap-3 font-extrabold shadow-md border-2 border-emerald-300">
              <span className="text-2xl">💠</span>
              <span>ACEITAMOS EXCLUSIVAMENTE PIX</span>
            </div>
            <div className="bg-white text-emerald-900 p-4 rounded-2xl flex items-center justify-center gap-3 font-extrabold shadow-md border-2 border-emerald-300">
              <span className="text-2xl">📦</span>
              <span>PRODUTOS POSTADOS EM ATÉ 3 DIAS ÚTEIS</span>
            </div>
          </div>
        </div>

        {/* BARRA DE PESQUISA EM QUADRO BRANCO */}
        <div className="max-w-xl mx-auto px-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3.5 bg-white text-gray-900 rounded-2xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base font-medium placeholder-gray-400"
          />
        </div>

        {/* Botões de Filtro */}
        <div className="flex justify-center gap-2 flex-wrap mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSearchTerm("");
              }}
              className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all border ${
                selectedCategory === category && searchTerm === ""
                  ? "bg-blue-600 text-white shadow-md scale-105 border-blue-500"
                  : category === "PROMOÇÕES"
                  ? "bg-red-600 text-white hover:bg-red-500 border-red-500 animate-pulse"
                  : "bg-blue-900/60 text-blue-200 hover:bg-blue-900 border-blue-800"
              }`}
            >
              {category === "PROMOÇÕES" ? "🔥 PROMOÇÕES" : category}
            </button>
          ))}
        </div>

        {/* Grade de Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white text-gray-900 rounded-3xl p-6 shadow-xl flex flex-col justify-between border border-gray-100 relative overflow-hidden">
                {product.oldPriceBRL && product.oldPriceBRL > product.priceBRL && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Oferta
                  </span>
                )}

                <div>
                  <img src={product.image} alt={product.name} className="w-full h-64 object-contain mb-6 rounded-2xl bg-gray-50 p-2" />
                  <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
                  </div>
                  <h3 className="font-extrabold text-2xl mt-1 text-gray-900 leading-tight">{product.name}</h3>
                  <p className="text-gray-600 font-medium mt-2 text-sm">{product.concentration}</p>
                  <p className="text-gray-500 mt-4 text-xs">{product.description}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    {product.oldPriceBRL && product.oldPriceBRL > product.priceBRL && (
                      <span className="text-xs text-gray-400 line-through block font-semibold">
                        R$ {product.oldPriceBRL.toFixed(2)}
                      </span>
                    )}
                    <p className="text-emerald-700 font-extrabold text-3xl tracking-tight">R$ {product.priceBRL.toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-md text-sm uppercase tracking-wide cursor-pointer"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-blue-300 font-medium bg-blue-900/40 rounded-3xl border border-blue-800">
              Nenhum produto encontrado com esse termo de pesquisa.
            </div>
          )}
        </div>
      </main>

      {/* Secção do Carrinho */}
      {cart.length > 0 && (
        <div ref={cartRef} className="mt-16 max-w-4xl mx-auto bg-white text-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-100">
          <h3 className="text-2xl font-extrabold mb-6 text-gray-900 border-b pb-3">Carrinho de Referências</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row justify-between items-center text-sm bg-gray-50 p-4 rounded-2xl border border-gray-100 gap-4">
                <div className="text-center sm:text-left">
                  <span className="font-bold text-gray-900 block text-base">{item.name}</span>
                  <span className="text-xs text-gray-500">{item.concentration}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-sm">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 font-bold text-gray-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[110px]">
                    <span className="font-black text-emerald-700 text-lg block">R$ {(item.priceBRL * item.quantity).toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wider ml-2 cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-xl font-extrabold mb-8 p-6 bg-blue-50 text-blue-900 rounded-2xl border border-blue-100 gap-2">
            <span>Subtotal Geral:</span>
            <span className="text-3xl font-black text-emerald-700">R$ {totalBRL.toFixed(2)}</span>
          </div>

          <button
            onClick={checkoutWhatsApp}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-extrabold py-5 px-8 rounded-2xl transition-all flex items-center justify-center gap-4 text-lg shadow-xl uppercase tracking-widest cursor-pointer"
          >
            Finalizar Pedido via WhatsApp (Pagamento via PIX)
          </button>
        </div>
      )}
    </div>
  );
}