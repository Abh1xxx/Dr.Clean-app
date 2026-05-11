# ==============================
# 1. Employee Salary Records
# ==============================

import pandas as pd

data = {
    'Name': ['John', 'Alice', 'Bob', 'David'],
    'Salary': [45000, 60000, 55000, 40000]
}

df = pd.DataFrame(data)

print("Employee Dataset")
print(df.head())

avg_salary = df['Salary'].mean()
print("Average Salary:", avg_salary)

high_earners = df[df['Salary'] > 50000]

print("Employees with Salary > 50000")
print(high_earners)


# ==============================
# 2. Diabetes Prediction
# ==============================

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

data = {
    'Glucose': [120, 140, 130, 150, 160],
    'BMI': [25, 30, 28, 35, 32],
    'Age': [22, 45, 35, 50, 40],
    'Outcome': [0, 1, 0, 1, 1]
}

df = pd.DataFrame(data)

X = df[['Glucose', 'BMI', 'Age']]
y = df['Outcome']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = LogisticRegression()

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("\nDiabetes Prediction Accuracy")
print("Accuracy:", accuracy_score(y_test, predictions))


# ==============================
# 3. Customer Segmentation
# ==============================

from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

data = {
    'Annual_Income': [15, 20, 25, 40, 60, 70],
    'Spending_Score': [39, 81, 6, 77, 40, 76]
}

df = pd.DataFrame(data)

X = df[['Annual_Income', 'Spending_Score']]

kmeans = KMeans(n_clusters=3)

kmeans.fit(X)

df['Cluster'] = kmeans.labels_

print("\nCustomer Segmentation")
print(df)

plt.scatter(
    X['Annual_Income'],
    X['Spending_Score'],
    c=kmeans.labels_
)

plt.xlabel('Annual Income')
plt.ylabel('Spending Score')
plt.title('Customer Segments')

plt.show()


# ==============================
# 4. Student Records
# ==============================

data = {
    'Name': ['Arun', 'Meera', 'Rahul', 'Anu'],
    'Marks': [80, 65, 90, 72]
}

df = pd.DataFrame(data)

print("\nStudent Dataset Information")
print(df.info())

top_students = df[df['Marks'] > 75]

print("Students scoring above 75")
print(top_students)

avg_marks = df['Marks'].mean()

print("Average Marks:", avg_marks)


# ==============================
# 5. Loan Default Prediction
# ==============================

from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix

data = {
    'Income': [30000, 50000, 40000, 60000, 35000],
    'Loan': [10000, 20000, 15000, 25000, 12000],
    'Age': [25, 45, 35, 50, 28],
    'Default': [0, 1, 0, 1, 0]
}

df = pd.DataFrame(data)

X = df[['Income', 'Loan', 'Age']]
y = df['Default']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = KNeighborsClassifier(n_neighbors=3)

model.fit(X_train, y_train)

predictions = model.predict(X_test)

print("\nLoan Default Prediction")

print("Confusion Matrix")
print(confusion_matrix(y_test, predictions))

print("Accuracy:", accuracy_score(y_test, predictions))


# ==============================
# 6. Marketing Customer Clustering
# ==============================

data = {
    'Age': [22, 25, 47, 52, 46, 56],
    'Annual_Spending': [2000, 3000, 15000, 18000, 16000, 20000]
}

df = pd.DataFrame(data)

X = df[['Age', 'Annual_Spending']]

kmeans = KMeans(n_clusters=2)

kmeans.fit(X)

print("\nCluster Centroids")
print(kmeans.cluster_centers_)

plt.scatter(
    X['Age'],
    X['Annual_Spending'],
    c=kmeans.labels_
)

plt.xlabel('Age')
plt.ylabel('Annual Spending')
plt.title('Customer Clusters')

plt.show()



with csv file

# ==============================
# 1. Employee Salary Records
# ==============================

import pandas as pd

# Read CSV file
df = pd.read_csv('employees.csv')

# Display first 5 rows
print("Employee Dataset")
print(df.head())

# Average salary
avg_salary = df['Salary'].mean()
print("Average Salary:", avg_salary)

# Employees with salary > 50000
high_earners = df[df['Salary'] > 50000]

print("Employees with Salary > 50000")
print(high_earners)


# ==============================
# 2. Diabetes Prediction
# ==============================

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load dataset
data = pd.read_csv('diabetes.csv')

X = data[['Glucose', 'BMI', 'Age']]
y = data['Outcome']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train Logistic Regression model
model = LogisticRegression()

model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Accuracy
print("\nDiabetes Prediction Accuracy")
print("Accuracy:", accuracy_score(y_test, predictions))


# ==============================
# 3. Customer Segmentation
# ==============================

from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

# Load dataset
data = pd.read_csv('customers.csv')

X = data[['Annual_Income', 'Spending_Score']]

# Apply K-Means
kmeans = KMeans(n_clusters=3)

kmeans.fit(X)

# Add cluster labels
data['Cluster'] = kmeans.labels_

print("\nCustomer Segmentation")
print(data.head())

# Visualize clusters
plt.scatter(
    X['Annual_Income'],
    X['Spending_Score'],
    c=kmeans.labels_
)

plt.xlabel('Annual Income')
plt.ylabel('Spending Score')
plt.title('Customer Segments')

plt.show()


# ==============================
# 4. Student Records
# ==============================

# Read CSV file
df = pd.read_csv('students.csv')

# Display dataset information
print("\nStudent Dataset Information")
print(df.info())

# Students scoring above 75
top_students = df[df['Marks'] > 75]

print("Students scoring above 75")
print(top_students)

# Average marks
avg_marks = df['Marks'].mean()

print("Average Marks:", avg_marks)


# ==============================
# 5. Loan Default Prediction
# ==============================

from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix

# Load dataset
data = pd.read_csv('loan.csv')

X = data[['Income', 'Loan', 'Age']]
y = data['Default']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train KNN model
model = KNeighborsClassifier(n_neighbors=3)

model.fit(X_train, y_train)

# Predict
predictions = model.predict(X_test)

# Confusion Matrix
print("\nLoan Default Prediction")

print("Confusion Matrix")
print(confusion_matrix(y_test, predictions))

# Accuracy
print("Accuracy:", accuracy_score(y_test, predictions))


# ==============================
# 6. Marketing Customer Clustering
# ==============================

# Load dataset
data = pd.read_csv('marketing.csv')

X = data[['Age', 'Annual_Spending']]

# Apply K-Means
kmeans = KMeans(n_clusters=2)

kmeans.fit(X)

# Display centroids
print("\nCluster Centroids")
print(kmeans.cluster_centers_)

# Visualize clusters
plt.scatter(
    X['Age'],
    X['Annual_Spending'],
    c=kmeans.labels_
)

plt.xlabel('Age')
plt.ylabel('Annual Spending')
plt.title('Customer Clusters')

plt.show()




# Dr. Clean Project

**A full‑stack home services platform built with React, Node.js, and MongoDB**

---

## 🧩 Overview

Dr. Clean is a web application that connects customers with cleaning and maintenance service providers. It features separate clients for users, workers, and administrators, allowing each role to manage bookings, profiles, blogs, jobs, and more.

The repository is split into two main folders:

- **Client/** – Frontend built with React (Vite) and Tailwind CSS.
- **Server/** – Backend API using Express.js, MongoDB (Mongoose), and Cloudinary for image handling.

---

## 🚀 Features

- **Authentication** (email/password, JWT-based)
- **Role-based access control** (user, worker, admin)
- **Service browsing & booking**
- **Profile management (security, edit profile)**
- **Admin dashboard** for managing users, services, bookings, blogs, and workers
- **Worker dashboard** for job assignment tracking
- **Blog creation and viewing**
- **Image uploads via Cloudinary**
- **Protected routes and middleware validations**

---

## 📷 Screenshots

Below are a few example views from the application. Save your images in a `screenshots/` folder at the project root and update the paths as needed.

| Description           | Preview                                                          |
| --------------------- | ---------------------------------------------------------------- |
| Public homepage       | ![Homepage](screenshots/public%20home%20page%20.png)                              |
| Login page            | ![Login](screenshots/Login%20page.png)                                              |
| Signup page           | ![Sign up](screenshots/Sign%20up%20page.png)                                        |
| User dashboard        | ![User Dashboard](screenshots/user%20dashboard.png)                                 |
| User booking page     | ![User Booking](screenshots/user%20booking%20page.png)                              |
| Admin manage services | ![Admin Services](screenshots/admin%20manage%20service%20page%20%281%29.png)       |
| Admin dashboard       | ![Admin Dashboard](screenshots/admin%20dashboard.png)                               |
| Worker dashboard      | ![Worker Dashboard](screenshots/Worker%20dashboard.png)                             |

> 📁 **All screenshot files** are located in the `screenshots/` folder. Filenames include spaces and describe the page; feel free to update this table with any additional views you want to highlight.

## 🛠 Tech Stack

---

## 🛠 Tech Stack

| Layer          | Technology                          |
| -------------- | ----------------------------------- |
| Frontend       | React, Vite, Tailwind CSS, Axios    |
| Backend        | Node.js, Express, MongoDB, Mongoose |
| Dev Tools      | ESLint, Prettier, Vite, nodemon     |
| Authentication | JWT, bcrypt                         |
| Storage        | Cloudinary (images)                 |

---

## 📁 Project Structure

```
Client/
  ├─ src/                  # React source code
  │   ├─ Components/       # Reusable UI components
  │   ├─ Pages/            # Route components
  │   ├─ Context/          # Auth provider, etc.
  │   ├─ Routes/           # React Router setup
  │   └─ Axios/            # Axios configuration

Server/
  ├─ config/               # Database & cloudinary setup
  ├─ Controllers/          # Route handlers
  ├─ Middleware/           # Auth, validation, file uploads
  ├─ Models/               # Mongoose schemas
  ├─ Routes/               # Express routing
  ├─ scripts/              # Seed data script
  └─ Utilities/            # Helpers (tokens, passwords)
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB URI (local or Atlas)
- Cloudinary account (for image uploads)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Dr. Clean/Project"
   ```

2. **Server setup**

   ```bash
   cd Server
   npm install

   # create a `.env` file with:
   #  MONGO_URI=your_mongo_connection_string
   #  JWT_SECRET=your_secret
   #  CLOUDINARY_CLOUD_NAME=
   #  CLOUDINARY_API_KEY=
   #  CLOUDINARY_API_SECRET=

   npm run dev   # starts Express server on configured port
   ```

3. **Client setup**

   ```bash
   cd ../Client
   npm install
   npm run dev    # starts Vite dev server (usually http://localhost:5173)
   ```

4. **Seeding data (optional)**
   ```bash
   node ../Server/scripts/seed.js
   ```

---

## 🧪 Testing

_No automated tests included_. Manual testing can be performed through the UI or by using tools like Postman / Insomnia against the API endpoints.

---

## 📝 API Endpoints

The server exposes versioned routes under `/api/v1`. Example groups include:

- `/auth` – registration, login
- `/users` – profile, security
- `/services` – list, create, update (admin)
- `/bookings` – create, view, manage
- `/blogs` – CRUD operations
- `/assigned-jobs` – worker assignments

Refer to controllers and routes directories for full details.

---

## 🛡 Security & Middleware

- `authMiddleware.js` protects private endpoints
- `adminAuthMW.js` restricts admin-only actions
- `fieldsValidation.js` enforces schema checks
- Uploaded files are handled by `multer.js` and sent to Cloudinary

---

## 🧠 Development Notes

- The client uses React Router v6 and context for authentication state.
- Axios instances are centralized (`Axios/axiosInstance.js`) to include base URL and token.
- Admin and worker dashboards have guards using `ProtectedRoute.jsx`.
- Styling is managed with Tailwind; configuration lives in `tailwind.config.js`.

---

## 📦 Deployment

- Build the frontend using `npm run build` inside `Client` and serve the output with a static server or integrate with the Express backend.
- Ensure environment variables are set for production (MongoDB, Cloudinary, JWT secret).

---

## 🤝 Contributing

Feel free to open issues or submit pull requests. Follow conventional commits and include descriptive messages.

---

## 📄 License

[MIT](LICENSE) (or specify whichever license applies)

---

**Happy coding!** 🎉
