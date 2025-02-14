# HumStudy

HumStudy is a comprehensive EdTech platform built using the MERN stack, designed to cater to the diverse needs of students pursuing higher education. The platform provides a one-stop solution for students, enabling them to build profiles, upload documents, apply to abroad universities, seek education loans, and even book flights. With robust user and admin panels, HumStudy ensures a seamless experience for all its users.

---

## Link

Link to project -> humstudy.com

---

## Features

### User-Facing Features:
1. **Profile Management**:
   - Create and update profiles with essential personal, academic, and professional details.
   - Upload and manage required documents securely.

2. **University Applications**:
   - Explore and apply to a wide range of universities abroad.
   - Track application status and updates.

3. **Education Loans**:
   - Apply for education loans tailored to student needs.
   - View loan eligibility based on the CIBIL score.

4. **Flight Booking**:
   - Book flights directly through the platform for a hassle-free experience.

5. **Integrated Services**:
   - A complete ecosystem catering to the well-being and educational needs of students.

### Admin Panel:
1. **University Management**:
   - Add, update, delete, and view universities listed on the platform.

2. **Flight Management**:
   - Add and manage available flights for student bookings.

3. **Loan Management**:
   - View loan applications submitted by users.
   - Analyze applicant eligibility based on CIBIL scores and other factors.

4. **User Management**:
   - Monitor user activity and profiles.
   - Access detailed user data and application statuses.

---

## Tech Stack

### Frontend:
- **Framework:** React with Material-UI for a responsive and intuitive design
- **State Management:** Context API / Redux

### Backend:
- **Framework:** Node.js with Express
- **Database:** MongoDB for storing user data, universities, loans, and flight details
- **Authentication:** JWT for secure sessions

### Hosting:
- **Frontend:** CPanel
- **Backend:** CPanel

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KaranSapra124/humstudy.git
   ```

2. Navigate to the project directory:
   ```bash
   cd humstudy
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

4. Set up environment variables:
   - Create `.env` files in both `frontend` and `backend` directories.
   - Add keys for database connection, JWT secrets, and third-party integrations (e.g., email services, flight APIs).

5. Run the application:
   - For the backend:
     ```bash
     npm run dev
     ```
   - For the frontend:
     ```bash
     npm run dev
     ```

---

## Usage

1. Sign up to create a profile and log in to the platform.
2. Upload necessary documents and start exploring universities.
3. Apply to your preferred universities and monitor your application status.
4. If required, apply for education loans and check your eligibility.
5. Book flights for a smooth transition to your chosen university.

### Admin Workflow:
1. Log in to the admin panel.
2. Manage universities, flights, and loans effectively through the CRUD interface.
3. Monitor user activity and analyze loan applications for eligibility.

---

## Future Enhancements

1. **Scholarship Management**:
   - Add functionality for students to explore and apply for scholarships.

2. **AI-Powered Recommendations**:
   - Suggest universities, courses, and loans based on user profiles.

3. **Chat Support**:
   - Integrate a real-time chat system for student queries.

4. **Mobile Application**:
   - Launch a mobile app for students to access the platform on the go.

5. **Analytics Dashboard**:
   - Provide admins with detailed insights into platform activity and user trends.

---

## Contributions

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a detailed description of your changes.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for choosing HumStudy as your trusted partner in education!

