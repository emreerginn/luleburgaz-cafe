let sepet = JSON.parse(localStorage.getItem("sepet")) || [];

window.onload = function () {
    guncelleSepetSayaci();
    guncelleMiniSepet();
};

function sepeteEkle(ad, fiyat) {
    const urun = sepet.find(item => item.ad === ad);
    if (urun) {
        urun.adet++;
    } else {
        sepet.push({ ad, fiyat, adet: 1 });
    }
    kaydet();
    guncelleSepetSayaci();
    guncelleMiniSepet();
    bildirimGoster(`${ad} sepete eklendi`);
}

function urunSil(index) {
    sepet.splice(index, 1);
    kaydet();
    guncelleSepetSayaci();
    guncelleMiniSepet();
}

function adetArtir(index) {
    sepet[index].adet++;
    kaydet();
    guncelleSepetSayaci();
    guncelleMiniSepet();
}

function adetAzalt(index) {
    if (sepet[index].adet > 1) {
        sepet[index].adet--;
    } else {
        sepet.splice(index, 1);
    }
    kaydet();
    guncelleSepetSayaci();
    guncelleMiniSepet();
}

function kaydet() {
    localStorage.setItem("sepet", JSON.stringify(sepet));
}

function guncelleSepetSayaci() {
    const sayac = document.getElementById("sepetSayac");
    if (sayac) {
        const toplamAdet = sepet.reduce((acc, item) => acc + item.adet, 0);
        sayac.textContent = toplamAdet;
    }
}

function guncelleMiniSepet() {
    const icerik = document.getElementById("miniSepetIcerik");
    if (!icerik) return;

    icerik.innerHTML = "";
    let toplam = 0;

    sepet.forEach((item, i) => {
        const araToplam = item.fiyat * item.adet;
        toplam += araToplam;
        icerik.innerHTML += `
            <div class="urunSatiri">
                <span>${item.ad} x${item.adet} - ${araToplam} TL</span>
                <div>
                    <button onclick="adetArtir(${i})">+</button>
                    <button onclick="adetAzalt(${i})">−</button>
                    <button onclick="urunSil(${i})">❌</button>
                </div>
            </div>
        `;
    });

    icerik.innerHTML += `
        <hr>
        <strong>Toplam: ${toplam} TL</strong><br>
        <button onclick="siparisiTamamla()">✅ Siparişi Onayla</button>
    `;
}

function siparisiTamamla() {
    if (sepet.length === 0) {
        bildirimGoster("Sepet zaten boş!");
        return;
    }
    alert("Siparişiniz alındı! Teşekkür ederiz.");
    sepet = [];
    kaydet();
    guncelleSepetSayaci();
    guncelleMiniSepet();
}

function bildirimGoster(mesaj) {
    const kutu = document.createElement("div");
    kutu.className = "bildirim";
    kutu.textContent = mesaj;
    document.body.appendChild(kutu);
    setTimeout(() => kutu.remove(), 3000);
}

function toggleMiniSepet() {
    const panel = document.getElementById("miniSepet");
    if (panel) panel.classList.toggle("acik");
}