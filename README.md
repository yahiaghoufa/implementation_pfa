# 🎓 University Club Management System (ISIMM)

## 🌟 Project Overview
This project is a **University Club Management System** developed for the *Institut Supérieur d'Informatique et de Mathématiques de Monastir (ISIMM)*. The platform is designed to help students, clubs, and administrators manage events, memberships, and communications more effectively.

---

## ✨ Key Features

- 🏷️ **User Authentication & Roles**
  - Secure login/register system
  - Role-based access for students, club admins, and super admins

- 🏛️ **Club Management**
  - Club creation, member requests, approvals
  - Department-based categorization (Informatique, Mathématiques, TI)

- 📆 **Event Planning**
  - Club event creation & editing
  - Public event calendar with filter options

- 📣 **Announcements & News**
  - Admin dashboard for broadcasting updates
  - Notification system for members

- 📊 **Analytics**
  - Track student participation and club growth
  - View charts on engagement metrics

---

## 🤖 AI Integration (Optional Ideas)

### 1. DeepSeek API (for chat or event suggestion assistant)
**Steps:**
1. Get API key from [DeepSeek](https://platform.deepseek.com)
2. Fill in your key in `config/ai_config.json`
3. Enable the integration from the admin dashboard

### 2. Botpress Chatbot (for student FAQs)
**Steps:**
1. Deploy Botpress server
2. Set up webhook in `config/botpress_config.json`
3. Import the custom flow from `/templates/botpress-flow.json`

---

## ⚙️ Technical Stack

| Layer            | Technology             |
|------------------|------------------------|
| 🖥️ Frontend       | React.js + Tailwind CSS |
| 🧠 State Mgmt     | Redux Toolkit          |
| 🌐 Backend        | Node.js + Express.js    |
| 🗄️ Database       | MongoDB Atlas           |
| 🔐 Auth           | JWT + Bcrypt            |
| ☁️ Hosting        | Vercel / Render / Railway (optional) |
| 🐳 Containerization | Docker (optional)       |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yahiaghoufa/club-management-isimm.git
cd club-management-isimm

# Install dependencies
npm install

# Set up environment
cp .env.example .env
# (Edit the .env file with your credentials)

# Run the development server
npm run dev
