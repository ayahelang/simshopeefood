const faktorHarga = 2.6

const komisiShopee = 0.25
const subsidiPromo = 0.15
const subsidiOngkir = 0.05

function showPage(id) {

    document.getElementById("menu").style.display = "none"
    document.getElementById("hargaPage").style.display = "none"
    document.getElementById("simulasiPage").style.display = "none"

    document.getElementById(id).style.display = "block"

}

function backMenu() {

    document.getElementById("menu").style.display = "block"
    document.getElementById("hargaPage").style.display = "none"
    document.getElementById("simulasiPage").style.display = "none"

}

function hitungHarga() {

    let offline = parseFloat(document.getElementById("offline").value)
    let admin = parseFloat(document.getElementById("admin").value)

    let target = offline + admin

    let hargaOnline = Math.round(target * faktorHarga / 1000) * 1000

    let komisi = hargaOnline * komisiShopee
    let promo = hargaOnline * subsidiPromo
    let ongkir = hargaOnline * subsidiOngkir

    let totalPotongan = komisi + promo + ongkir

    let uangMasuk = hargaOnline - totalPotongan

    document.getElementById("hasilHarga").innerHTML =

        `
<table class="resultTable">

<tr>
<td>Target Uang Masuk Merchant</td>
<td><b>Rp ${target.toLocaleString()}</b></td>
</tr>

<tr>
<td>Harga Online Disarankan</td>
<td><b>Rp ${hargaOnline.toLocaleString()}</b></td>
</tr>

<tr class="section">
<td colspan="2">Estimasi Potongan Shopee</td>
</tr>

<tr>
<td>Komisi Shopee</td>
<td>- Rp ${Math.round(komisi).toLocaleString()}</td>
</tr>

<tr>
<td>Subsidi Promo Makanan</td>
<td>- Rp ${Math.round(promo).toLocaleString()}</td>
</tr>

<tr>
<td>Subsidi Promo Ongkir</td>
<td>- Rp ${Math.round(ongkir).toLocaleString()}</td>
</tr>

<tr class="highlight">
<td>Uang Bersih Masuk Merchant</td>
<td>Rp ${Math.round(uangMasuk).toLocaleString()}</td>
</tr>

</table>
`

}

function addItem() {

    let container = document.getElementById("items")

    let html =

        `
<div class="item">

<label>Nama Item</label>
<input type="text" class="nama">

<label>Harga Offline</label>
<input type="number" class="offline">

<label>Biaya Admin</label>
<input type="number" class="admin">

<label>Jumlah</label>
<input type="number" class="qty" value="1">

</div>
`

    container.insertAdjacentHTML("beforeend", html)

}

addItem()


function hitungSimulasi() {

    let items = document.querySelectorAll(".item")

    let subtotalMenu = 0

    items.forEach(item => {

        let offline = parseFloat(item.querySelector(".offline").value)

        let admin = parseFloat(item.querySelector(".admin").value)

        let qty = parseFloat(item.querySelector(".qty").value)

        let target = offline + admin

        let hargaOnline = target * faktorHarga

        subtotalMenu += hargaOnline * qty

    })

    let diskonPembeli = subtotalMenu * 0.50

    let promoMerchant = subtotalMenu * subsidiPromo

    let ongkirMerchant = subtotalMenu * subsidiOngkir

    let komisi = subtotalMenu * komisiShopee

    let uangMasuk = subtotalMenu - promoMerchant - ongkirMerchant - komisi

    let dibayarPembeli = subtotalMenu - diskonPembeli

    let pendapatanShopee = komisi + promoMerchant + ongkirMerchant

    let pendapatanKurir = 8000

    document.getElementById("hasilSimulasi").innerHTML =

        `
<table class="resultTable">

<tr>
<td>Subtotal Menu</td>
<td><b>Rp ${Math.round(subtotalMenu).toLocaleString()}</b></td>
</tr>

<tr>
<td>Harga Sebelum Diskon</td>
<td>Rp ${Math.round(subtotalMenu).toLocaleString()}</td>
</tr>

<tr>
<td>Diskon Pembeli (50%)</td>
<td>- Rp ${Math.round(diskonPembeli).toLocaleString()}</td>
</tr>

<tr class="highlight">
<td>Total Dibayar Pembeli</td>
<td>Rp ${Math.round(dibayarPembeli).toLocaleString()}</td>
</tr>

<tr class="section">
<td colspan="2">Potongan ke Merchant</td>
</tr>

<tr>
<td>Subsidi Promo Makanan</td>
<td>- Rp ${Math.round(promoMerchant).toLocaleString()}</td>
</tr>

<tr>
<td>Subsidi Promo Ongkir</td>
<td>- Rp ${Math.round(ongkirMerchant).toLocaleString()}</td>
</tr>

<tr>
<td>Komisi Shopee</td>
<td>- Rp ${Math.round(komisi).toLocaleString()}</td>
</tr>

<tr class="highlight">
<td>Uang Masuk Merchant</td>
<td>Rp ${Math.round(uangMasuk).toLocaleString()}</td>
</tr>

<tr class="section">
<td colspan="2">Distribusi Pendapatan</td>
</tr>

<tr>
<td>Pendapatan Shopee</td>
<td>Rp ${Math.round(pendapatanShopee).toLocaleString()}</td>
</tr>

<tr>
<td>Pendapatan Kurir</td>
<td>Rp ${Math.round(pendapatanKurir).toLocaleString()}</td>
</tr>

</table>
`

}