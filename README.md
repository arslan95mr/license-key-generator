# 🔐 License Key Generator Tool

This is a secure **offline license key generator tool** built with **Node.js (Express)** and **React.js** using **Material UI (MUI)**. It is designed to generate license keys for software that uses subscription models such as:

- ✅ Monthly
- ✅ Yearly
- ✅ Lifetime

> The license keys are digitally signed using RSA private keys, ensuring offline verification.

---

## 📁 Project Structure
license-key-generator/
├── client/                      # React frontend (MUI, React Router)
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── pages/               # Application pages
│   │   └── ...                  # Other folders (hooks, utils, etc.)
│   └── package.json             # Frontend dependencies and scripts
│
├── server/                      # Node.js backend (Express)
│   ├── controllers/             # Request handlers and business logic
│   ├── helper/                  # Helper functions (e.g., key generation, signing)
│   ├── routes/                  # API route definitions
│   ├── utils/                   # Utility modules
│   ├── generated/               # Folder for generated license key files (*.key)
│   ├── license/                 # RSA key files (private.key, public.key)
│   ├── router.js                # Main API router
│   └── server.js                # Backend entry point
│
├── .gitignore                   # Git ignore rules (node_modules, license/, etc.)
├── README.md                    # Project documentation (you’re reading it!)
└── ...                          # Other config or dotfiles


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
