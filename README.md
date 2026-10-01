# Özüm Bakery — Web Sitesi

Bursa, İznik ve İstanbul'da hizmet veren butik pastane için statik web sitesi.
Build adımı gerektirmez; dosyalar olduğu gibi GitHub Pages, Netlify, Vercel veya herhangi bir hosting'e yüklenebilir.

## Dosya yapısı

```
index.html          Sayfa iskeleti
css/style.css       Tasarım (renkler :root içinde)
js/config.js        WhatsApp numarası, marka adı, Instagram, hizmet bölgeleri
js/main.js          Verileri sayfaya basan script
data/products.js    Ürün listesi
data/references.js  Referans / müşteri yorumu listesi
assets/img/         Ürün ve referans görselleri
```

## İlk kurulum

1. `js/config.js` dosyasını açın ve `whatsappNumber` değerini kendi numaranızla değiştirin
   (ülke kodu ile, `+` ve boşluk olmadan; örn. `905321234567`).
2. İsteğe bağlı: `instagram` alanına kullanıcı adınızı yazın.

## Ürün ekleme

`data/products.js` içindeki `PRODUCTS` listesine yeni bir nesne ekleyin:

```js
{
  name: "Frambuazlı Cheesecake",
  category: "Pastalar",
  description: "Taze frambuaz ve ev yapımı bisküvi tabanı.",
  image: "assets/img/cheesecake.jpg",
  price: "650 ₺",   // isteğe bağlı
},
```

Birden fazla kategori olduğunda ürünler bölümünde otomatik filtre butonları çıkar.
Her ürün kartındaki "Sipariş Ver" butonu, ürün adını içeren hazır bir WhatsApp mesajı açar.

## Referans ekleme

`data/references.js` içindeki `REFERENCES` listesine ekleyin:

```js
{
  name: "Ayşe K.",
  location: "Bursa",
  event: "Nişan",
  text: "Nişan pastamız harikaydı, herkes çok beğendi!",
  image: "assets/img/ref1.jpg", // isteğe bağlı
},
```

Liste boşken her iki bölümde de "yakında" mesajı gösterilir.

## Yerelde görüntüleme

`index.html` dosyasını tarayıcıda açmanız yeterlidir. Dilerseniz:

```bash
python3 -m http.server 8080
```

ardından `http://localhost:8080` adresine gidin.

## Yayınlama (GitHub Pages)

Repo ayarlarında **Settings → Pages → Source: Deploy from a branch** seçip
`main` dalını ve `/ (root)` klasörünü seçmeniz yeterlidir.
