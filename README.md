<div align="center">

<br/>

```
███████╗ █████╗ ███████╗██╗   ██╗██████╗ ██╗██╗     ██╗
██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝██╔══██╗██║██║     ██║
█████╗  ███████║███████╗ ╚████╔╝ ██████╔╝██║██║     ██║
██╔══╝  ██╔══██║╚════██║  ╚██╔╝  ██╔══██╗██║██║     ██║
███████╗██║  ██║███████║   ██║   ██████╔╝██║███████╗███████╗
╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   ╚═════╝ ╚═╝╚══════╝╚══════╝
```

### Smart Inventory & Billing — Built for Real Shops, Not Spreadsheets

<br/>

[![React Native](https://img.shields.io/badge/React_Native-0.7x-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Kotlin](https://img.shields.io/badge/Kotlin-1.9-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white)](https://kotlinlang.org/)
[![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)](https://android.com/)
[![License](https://img.shields.io/badge/License-MIT-22C55E?style=for-the-badge)](LICENSE)

<br/>

</div>

---

## 🧩 What Problem Does EasyBill Solve?

Most small shop owners — **kirana stores, mobile repair shops, medical stores, stationery shops** — still rely on handwritten bills or messy Excel files. This causes:

- ❌ Slow billing at the counter (customer waiting)
- ❌ Manually remembering or searching for item names and prices every time
- ❌ Unprofessional receipts shared over WhatsApp
- ❌ No UPI payment info on the bill
- ❌ Data shared to cloud — privacy risk

**EasyBill solves all of this.** It's a fully offline, fast, and professional billing app that runs entirely on your Android phone — no internet, no subscription, no data leak.

---

## 📱 App Overview

EasyBill is a **React Native Android app** with five core screens:

| Screen | What It Does |
|---|---|
| ⚙️ **Settings** | Enter your shop name, address, GST number, UPI ID once — auto-appears on every bill |
| 📦 **Item Database** | Add items with barcode, name, and rate — so billing is instant without typing prices manually |
| 🧾 **Billing Screen** | Scan or search items, set quantity, generate a professional receipt in seconds |
| 🕓 **Bill History** | View all previously generated bills — never lose a record |
| 🧾 **Receipt Screen** | Preview the final bill with shop details, items, total, and UPI info before saving |

---

## 📸 Screenshots

| Billing Screen | Bill History | Settings |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/billing.png" width="200" alt="Billing Screen" /> | <img src="./assets/screenshots/history.png" width="200" alt="Bill History" /> | <img src="./assets/screenshots/settings.png" width="200" alt="Settings Screen" /> |
| Search items, set qty, generate bill | All past bills in one place | Shop info & UPI setup |

| Receipt Screen | &nbsp; | &nbsp; |
|:---:|:---:|:---:|
| <img src="./assets/screenshots/receipt.png" width="200" alt="Receipt Screen" /> | &nbsp; | &nbsp; |
| Final receipt preview before saving | &nbsp; | &nbsp; |

---

## ✨ Key Features

### 🚀 Bill in Under 10 Seconds
Search for any item, set quantity, and the bill is ready. Designed for speed at the counter — no lag, no loading screens.

### 📦 Item Database for Fast Billing
Add your items once — barcode, name, and rate. During billing, just scan the barcode or search by name and the price fills in automatically. No need to remember or type prices at the counter.

### 📥 Downloadable Receipts
Bills are captured as high-quality images and saved directly to your phone's Gallery. Share via WhatsApp or print anytime.

### 💳 UPI Integration on Bills
Your UPI ID and QR-friendly payment info is printed on every bill automatically — customers know exactly how to pay.

### 🔒 100% Offline & Private
All data stays on your device using AsyncStorage. Nothing goes to any server. No account needed, no subscription.

### 🎨 Clean Material Design UI
Professional, dark-mode-supported interface that looks good and works fast. Built with Material Community Icons for a native Android feel.

---

## 🛠️ Tech Stack

```
EasyBill
├── Frontend          → React Native (TypeScript)
├── Native Modules    → Kotlin (Android)
├── UI Icons          → react-native-vector-icons (Material Community)
├── Local Storage     → AsyncStorage
├── Receipt Capture   → react-native-view-shot
└── Gallery Save      → react-native-camera-roll
```

**Why this stack?**
- **React Native + TypeScript** — Fast development with type safety
- **AsyncStorage** — Lightweight local database, no setup required
- **Kotlin Native Modules** — For performance-critical file operations
- **react-native-view-shot** — Converts the bill component into a shareable image

---

## 🚀 How to Run Locally (Step-by-Step)

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or above)
- [Android Studio](https://developer.android.com/studio) with Android SDK
- [JDK 17](https://www.oracle.com/java/technologies/downloads/)
- React Native CLI: `npm install -g react-native-cli`
- An Android device or emulator (API 24+)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/your-username/EasyBill.git
cd EasyBill
```

---

### Step 2 — Install Dependencies

```bash
npm install
```

---

### Step 3 — Android Setup

Make sure your Android emulator is running OR connect a physical device with USB Debugging enabled.

```bash
# Check connected devices
adb devices
```

---

### Step 4 — Run the Metro Bundler

```bash
npx react-native start
```

Keep this terminal open.

---

### Step 5 — Build & Launch on Android

Open a new terminal in the project folder and run:

```bash
npx react-native run-android
```

The app will build and install on your device/emulator automatically.

---

### Step 6 — First Launch Setup

1. Open **EasyBill** on your device
2. Go to ⚙️ **Settings / Shop Info**
3. Enter your shop name, address, GST number, and UPI ID
4. Save — this info will appear on every bill you generate

---

## 📖 How to Use EasyBill

### Adding Items to the Database

1. Tap the **Items** tab
2. Tap **"Add Item"** (+ button)
3. Enter: Item Name, Barcode, Rate (₹)
4. Save — the item is now searchable during billing

### Creating a Bill

1. Go to the **Billing** tab
2. Search for an item by name
3. Set the quantity
4. Add more items if needed
5. Tap **"Generate Bill"**
6. The bill preview appears with your shop info, items, total, and UPI details

### Saving the Bill

1. After generating the bill, tap **"Save to Gallery"**
2. The receipt is saved as an image to your phone's gallery
3. Share directly via WhatsApp, email, or print

---

## 🔮 Planned Features (Roadmap)

- [ ] PDF bill export
- [ ] Low stock alerts / notifications
- [ ] Monthly sales summary report
- [ ] Multi-language support (Hindi, Tamil, Telugu)
- [ ] Barcode scanner integration for faster billing
- [ ] Backup & restore via local file export

---

## 🙋 About This Project

EasyBill was built as a **personal portfolio project** to demonstrate real-world mobile app development skills including:

- Building production-grade React Native apps with TypeScript
- Managing local state and persistence without a backend
- Integrating native Android modules (Kotlin) for file system access
- Designing clean, user-friendly mobile UIs for non-technical users
- Solving a genuine problem faced by millions of small business owners in India

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built with ❤️ for Indian small business owners

**[Portfolio](https://your-portfolio.com)** · **[LinkedIn](https://linkedin.com/in/your-profile)** · **[GitHub](https://github.com/your-username)**

</div>
