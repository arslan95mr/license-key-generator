# 🔐 License Key Generator Tool

This is a secure **offline license key generator tool** built with **Node.js (Express)** and **React.js** using **Material UI (MUI)**. It is designed to generate license keys for software that uses subscription models such as:

- ✅ Monthly
- ✅ Yearly
- ✅ Lifetime

> The license keys are digitally signed using RSA private keys, ensuring offline verification.

## 🚀 Features

- 🔐 **Generate RSA-signed license keys**
- 📄 **License file output** (`.key` format)
- 📆 Expiration logic (color-coded)
- 🧑 Customer identification
- 🗃️ React Table with searchable and paginated list
- 📥 Download license key files
- 🧭 Built-in React Router with MUI styling

---

## 🧑‍💻 Getting Started

Generate RSA Keys
> openssl genrsa -out private.key 2048
> openssl rsa -in private.key -pubout -out public.key
