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
    priceBRL: 740,
  },
  {
    id: 2,
    name: "Tirzepatida Lipolles 60mg MD",
    concentration: "1 ampola de 60mg MD",
    description: "Ampola única - total de 60mg.",
    manufacturer: "ETICOS",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/site/media/fotos/produtos/thumbs/big/068c98b7954bf75eb4648aab973bbd167f1fe674.webp",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 3,
    name: "Tirzepatida Lipolles 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "ETICOS",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/site/media/fotos/produtos/thumbs/med/f05ee02e9de115f9378ba1c6bad6e30fcec98ee0.webp",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 4,
    name: "Tirzepatida Tirzec 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "QUIMFA",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_tirzec_15mg_05ml_204052_8e485f7a-bbba-4896-bb61-624a2086ad87.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 5,
    name: "Tirzepatida Lipoland 60mg MD",
    concentration: "Ampola de 60mg",
    description: "Ampola única de 60 mg.",
    manufacturer: "LIPOLAND",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_lipoland_15mg_05ml_1_frasco_204051_e161ad05-31c6-42e2-9beb-476d9bca90a8.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 6,
    name: "Tirzepatida Lipoland 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "LIPOLAND",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_lipoland_15mg_05ml_4_frascos_198734_3acc233b-caab-4b5f-9045-4a0bfa5d67d5.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 7,
    name: "Tirzepatida Gluconex 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "GLUCONEX",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_gluconex_15mg_1ml_198243_ea91a962-658e-400f-959e-e657ff300229.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 8,
    name: "Tirzepatida Tirzedral MD 60mg",
    concentration: "60mg por ampola",
    description: "Ampola única de 60mg.",
    manufacturer: "Tirzedral",
    image: "https://us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_gluconex_15mg_1ml_198243_ea91a962-658e-400f-959e-e657ff300229.med.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 9,
    name: "Tirzepatida T-36 MD",
    concentration: "60mg por ampola",
    description: "Ampola única de 60mg.",
    manufacturer: "T 36",
    image: "",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 10,
    name: "Tirzepatida Tirzedral 15mg",
    concentration: "15mg por Ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "TIRZEDRAL",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_tirzedral_15mg_05ml_204050_545a226f-f7c6-436e-a9f6-cda1fd210da5.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 11,
    name: "Tirzepatida T-36",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "T 36",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_t36_15mg_05ml_204036_172f9994-dbb2-4ecf-a5d8-1d31ece5baf3.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 12,
    name: "Tirzepatida Slimex 60mg MD",
    concentration: "60mg por ampola",
    description: "Ampola única de 60mg.",
    manufacturer: "SLIMEX",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_slimex_md_15mg_06ml_204054_f5b181c2-b47e-4d16-a179-9e7eb7a50bf6.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 13,
    name: "Tirzepatida Slimex 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg cada, totalizando 60 mg.",
    manufacturer: "SLIMEX",
    image: "https://bucket-prod.us-ord-10.linodeobjects.com/bucket-prod/site/media/fotos/modelos/tirzepatida_slimex_15mg_05ml_204055_db54d00e-2857-4a1c-89c0-1154b8564c22.avif",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 14,
    name: "Tirzepatida TNL 60mg MD",
    concentration: "60mg MD",
    description: "Ampola única de 60mg.",
    manufacturer: "TNL",
    image: "https://imgur.com/a/NiOcquf",
    category: "TIRZEPATIDA",
    priceBRL: 680,
  },
  {
    id: 15,
    name: "Tirzepatida TNL 15mg",
    concentration: "15mg por ampola",
    description: "4 ampolas de 15mg, totalizando 60mg.",
    manufacturer: "TNL",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/screenshot2026-06-17072403-450x450.png",
    category: "TIRZEPATIDA",
    priceBRL: 700,
  },
  {
    id: 16,
    name: "Tirzepatida Thera Genetics 60mg Caneta",
    concentration: "Caneta de 60mg",
    description: "Caneta de 60mg",
    manufacturer: "THERA GENETICS",
    image: "https://totalvape.s3.sa-east-1.amazonaws.com/products/809d11f9-4184-4f3b-9817-87e35b03d869.webp?v=1789486203",
    category: "TIRZEPATIDA",
    priceBRL: 820,
  },
  {
    id: 17,
    name: "Tirzepatida Synedica Labs 240mg",
    concentration: "Ampola de 60mg",
    description: "4 Ampolas de 60mg cada, totalizando 240mg",
    manufacturer: "SYNEDICA",
    image: "https://totalvape.s3.sa-east-1.amazonaws.com/products/2373d4ce-a3f0-41f6-9a82-c19326c71932.webp?v=1790015402",
    category: "TIRZEPATIDA",
    priceBRL: 1080,
  },
  {
    id: 18,
    name: "Tirzepatida Synédica Labs 60mg",
    concentration: "Ampola de 60mg",
    description: "1 ampola de 60mg Liofilizada",
    manufacturer: "SYNEDICA",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/tirzerpsynedica-450x450.jpeg",
    category: "TIRZEPATIDA",
    priceBRL: 600,
  },
  {
    id: 19,
    name: "Tirzepatida Tirgegen 60mg",
    concentration: "Ampola com 60mg",
    description: "1 ampola de 60mg Liofilizada",
    manufacturer: "OXYGEN",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRy72LOGaxsr1sw6BW97tuoW_nzobcORohg3MtRVNAaXdbNPYXcRIvxrrS&s=10",
    category: "TIRZEPATIDA",
    priceBRL: 740,
  },
  {
    id: 20,
    name: "Tirzepatida Thera 60mg",
    concentration: "60mg",
    description: "1 ampola de 60mg Liofilizada",
    manufacturer: "THERA",
    image: "https://totalvape.s3.sa-east-1.amazonaws.com/products/4ab49fda-5950-4cfb-a960-afdd172d509f.webp?v=1790105403",
    category: "TIRZEPATIDA",
    priceBRL: 640,
  },
  {
    id: 21,
    name: "Tirzepatida ZPHC 150mg",
    concentration: "30mg em cada ampola",
    description: "5 ampolas de 30mg cada, totalizando 150mg",
    manufacturer: "ZPHC",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS53s0QOwEVuAwj4bE7hARl85vFrNJQFKHN3uqMQi0q3g&s",
    category: "TIRZEPATIDA",
    priceBRL: 1800,
  },
  {
    id: 22,
    name: "Tirzepatida ZPHC 75mg Caneta",
    concentration: "75mg em 1 caneta",
    description: "1 Caneta de 75mg",
    manufacturer: "ZPHC",
    image: "https://precosnoparaguai.s3.amazonaws.com/product_images/d8422ea5-cd2e-4dbc-90e2-c97cdf20aed8.png",
    category: "TIRZEPATIDA",
    priceBRL: 1350,
  },
  {
    id: 23,
    name: "Peptides Sciences 60mg",
    concentration: "Ampola com 60mg",
    description: "Ampola única de 60mg Liofilizada",
    manufacturer: "PEPTIDE SCIENCES",
    image: "https://cdestore.com.py/image/cache/catalog/medicamento/tirzerpatida/screenshot2026-06-24110119-450x450.png",
    category: "TIRZEPATIDA",
    priceBRL: 650,
  },
  {
    id: 24,
    name: "Biogenesis 60mg",
    concentration: "ampola com 60mg",
    description: "1 Ampola de 60mg Liofilizada",
    manufacturer: "BIOGENESIS",
    image: "https://atacadoparaguai.com.py/produto/biogenesis-tirzepatide-60mg-01-vial/",
    category: "TIRZEPATIDA",
    priceBRL: 550,
  },
  {
    id: 25,
    name: "Biogenesis 120mg",
    concentration: "Ampola com 120mg",
    description: "1 Ampola de 120mg Liofilizada",
    manufacturer: "BIOGENESIS",
    image: "https://atacadoparaguai.com.py/produto/biogenesis-tirzepatide-120mg/",
    category: "TIRZEPATIDA",
    priceBRL: 950,
  },
  {
    id: 26,
    name: "USA Peptideos 30mg",
    concentration: "1 Ampola de 30mg",
    description: "1 Ampola de 30mg",
    manufacturer: "USA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxyvVInTP5YjxgS8AaTjiaQyu2DwJpPPS2H4Kkz0zLCw&s=10",
    category: "TIRZEPATIDA",
    priceBRL: 590,
  },
  {
    id: 27,
    name: "USA Peptideos 60mg",
    concentration: "Ampola de 60mg",
    description: "1 ampola de 60mg",
    manufacturer: "USA",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUe4Su9lQYYjGHgC9vhOdsjTA6OCCZuNoPz6ae8DTMPQ&s=10",
    category: "TIRZEPATIDA",
    priceBRL: 700,
  },
  {
    id: 28,
    name: "USA Peptideos 120mg",
    concentration: "120mg",
    description: "1 Ampola de 120mg",
    manufacturer: "USA",
    image: "https://res.cloudinary.com/dpoxr28p0/image/fetch/f_auto,q_auto:good,w_800,c_limit/https%3A%2F%2Fwww.royalvitta.com%2Fproducts%2Fusa-peptides-tirzepatida-120mg-4ml-frasco-multidose.webp%3Fv%3Db003b5c1",
    category: "TIRZEPATIDA",
    priceBRL: 1000,
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