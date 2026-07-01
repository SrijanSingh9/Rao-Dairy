---



# Rao Dairy Management System



A full-stack, bilingual web application designed to help local dairy owners in India manage their inventory, track customer orders, and streamline daily delivery routes.



## 🚀 Overview



Rao Dairy Management System bridges the gap between digital efficiency and local business needs. It features a clean, responsive customer-facing storefront and a powerful, bilingual (Hindi/English) **Owner Dashboard** that allows the business owner to manage their operations directly from a mobile phone.



## ✨ Key Features



* **For Customers:**

* Dynamic Product Catalog (fetched in real-time).

* Easy "Add to Cart" functionality.

* Simplified checkout process for direct orders.





* **For Business Owners (Owner Dashboard):**

* **Delivery Route:** A dedicated panel to see pending orders, complete with Google Maps integration and delivery checklists.

* **Inventory Manager:** Real-time stock management. Add new products, update prices, or mark items as "Out of Stock" with a single tap.

* **Sales Ledger:** Automatic calculation of daily revenue and a summary of completed transactions.

* **Bilingual Interface:** All labels and actions are provided in both English and Hindi for ease of use.

* **Auto-Sync:** Dashboard updates automatically every 30 seconds to fetch new orders.







## 🛠 Tech Stack



* **Frontend:** React.js (Vite), Tailwind CSS

* **Backend:** Django, Django REST Framework

* **Database:** PostgreSQL

* **Deployment:** Vercel (Frontend), Render (Backend)



## 📂 Project Structure



```text

rao-dairy/

├── backend/            # Django project

│   ├── core/           # Configuration & Settings

│   └── dairy/          # Business logic, Models, and API Views

└── frontend/           # React application

    └── src/

        ├── components/ # Dashboard, Cart, and Inventory logic

        └── App.jsx     # Routing & View Logic



```



## ⚙️ Getting Started



### Prerequisites



* Python 3.x

* Node.js & npm

* PostgreSQL



### Installation



1. **Clone the repository:**

```bash

git clone https://github.com/yourusername/rao-dairy.git



```





2. **Setup Backend:**

```bash

cd backend

python -m venv venv

source venv/bin/activate  # On Windows: venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver



```





3. **Setup Frontend:**

```bash

cd ../frontend

npm install

npm run dev



```







## 🔐 Accessing the Owner Dashboard



The dashboard is built into the main application. Once running, you can access the owner-specific features by visiting the following URL in your browser:

`http://localhost:5173/?view=owner`


