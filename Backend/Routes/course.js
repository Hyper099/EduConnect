const { Router } = require("express");
const connectDatabase = require("../Database/database");
const { CourseSchema } = require("../Database/schema");
const { instructorAuth, studentAuth } = require("../Middleware/authMiddleware");

const courseRouter = Router();

// Add Course (Add to COURSES and COURSE_DETAILS)
courseRouter.post("/add", instructorAuth, async (req, res) => {
   try {
      const result = CourseSchema.safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({ error: result.error.format() });
      }

      const { title, description, price, duration, category, accessPeriod } = result.data;
      const instructorId = req.instructor.id;

      const db = await connectDatabase();

      // Check for the Category:
      // if the category exists , use its id else insert it as new category.
      const cleanedCategory = category.toLowerCase().trim();
      const [rows] = await db.execute(
         "SELECT id FROM CATEGORIES WHERE NAME = (?)", [cleanedCategory]
      );

      let categoryId;

      if (rows.length > 0) {
         categoryId = rows[0].id;
      } else {
         const [categoryResult] = await db.execute(
            "INSERT INTO CATEGORIES (NAME) VALUES(?)", [cleanedCategory]
         );
         categoryId = categoryResult.insertId;
      }


      // Insert into COURSES first
      const [courseResult] = await db.execute(
         "INSERT INTO COURSES (instructor_id) VALUES (?)",
         [instructorId]
      );
      const courseId = courseResult.insertId;

      // Insert into COURSE_DETAILS
      await db.execute(
         "INSERT INTO COURSE_DETAILS (course_id, title, description, price, category_id, duration, access_period) VALUES (?, ?, ?, ?, ?, ?, ?)",
         [courseId, title, description, price, categoryId, duration, accessPeriod]
      );

      res.status(201).json({ message: "Course added successfully.", courseId });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to add course." });
   }
});

// Update Course Details only (from COURSE_DETAILS)
courseRouter.put("/update/:id", instructorAuth, async (req, res) => {
   try {
      const courseId = req.params.id;
      const instructorId = req.instructor.id;
      const result = CourseSchema.partial().safeParse(req.body);
      if (!result.success) {
         return res.status(400).json({ error: result.error.format() });
      }

      const { title, description, price, duration, category, accessPeriod } = result.data;
      const db = await connectDatabase();

      // Check ownership
      const [courses] = await db.execute("SELECT * FROM COURSES WHERE id = ? AND instructor_id = ?", [courseId, instructorId]);
      if (courses.length === 0) {
         return res.status(403).json({ error: "Unauthorized or course not found." });
      }

      let categoryId;
      if (category) {
         const cleanedCategory = category.toLowerCase().trim();
         const [rows] = await db.execute(
            "SELECT id FROM CATEGORIES WHERE NAME = (?)", [cleanedCategory]
         );

         if (rows.length > 0) {
            categoryId = rows[0].id;
         } else {
            const [categoryResult] = await db.execute(
               "INSERT INTO CATEGORIES (NAME) VALUES(?)", [cleanedCategory]
            );
            categoryId = categoryResult.insertId;
         }
      }
      const [update] = await db.execute(
         `UPDATE COURSE_DETAILS
         SET title = ?, description = ?, price = ?, duration = ?, category_id = ?, access_period = ?
         WHERE course_id = ? `,
         [title, description, price, duration, categoryId, accessPeriod, courseId]
      );

      res.status(200).json({ message: "Course updated successfully.", update });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error updating course." });
   }
});

// Delete Course from both tables
courseRouter.delete("/delete/:id", instructorAuth, async (req, res) => {
   try {
      const courseId = req.params.id;
      const db = await connectDatabase();

      const [courses] = await db.execute("SELECT * FROM COURSES WHERE id = ? AND instructor_id = ?", [courseId, req.instructor.id]);
      if (courses.length === 0) {
         return res.status(403).json({ error: "Unauthorized or course not found." });
      }

      await db.execute("DELETE FROM COURSES WHERE id = ?", [courseId]);

      res.status(200).json({ message: "Course deleted successfully." });
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error deleting course." });
   }
});

// Get All Courses (JOIN with category, instructor, enrollment count)
courseRouter.get("/", async (req, res) => {
   try {
      const db = await connectDatabase();
      const [results] = await db.execute(`
         SELECT 
            C.id,
            CD.title,
            CD.description,
            CD.price,
            CD.category_id,
            CAT.name AS category,
            CD.duration,
            CD.access_period,
            CD.created_at,
            C.instructor_id,
            CONCAT(I.firstName, ' ', I.lastName) AS instructor_name,
            COALESCE(E.enrollment_count, 0) AS students
         FROM COURSES C
         JOIN COURSE_DETAILS CD ON CD.course_id = C.id
         LEFT JOIN CATEGORIES CAT ON CAT.id = CD.category_id
         LEFT JOIN INSTRUCTOR I ON I.id = C.instructor_id
         LEFT JOIN (
            SELECT course_id, COUNT(*) AS enrollment_count
            FROM ENROLLMENT
            GROUP BY course_id
         ) E ON E.course_id = C.id
      `);
      res.status(200).json(results);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching courses." });
   }
});

// Get single course by ID (JOIN with category, instructor, enrollment count)
courseRouter.get("/:id", async (req, res) => {
   try {
      const { id } = req.params;
      const db = await connectDatabase();
      const [result] = await db.execute(`
         SELECT 
            C.id AS course_id,
            CD.title,
            CD.description,
            CD.price,
            CD.category_id,
            CAT.name AS category,
            CD.duration,
            CD.access_period,
            CD.created_at,
            C.instructor_id,
            CONCAT(I.firstName, ' ', I.lastName) AS instructor_name,
            COALESCE(E.enrollment_count, 0) AS students
         FROM COURSES C
         JOIN COURSE_DETAILS CD ON CD.course_id = C.id
         LEFT JOIN CATEGORIES CAT ON CAT.id = CD.category_id
         LEFT JOIN INSTRUCTOR I ON I.id = C.instructor_id
         LEFT JOIN (
            SELECT course_id, COUNT(*) AS enrollment_count
            FROM ENROLLMENT
            GROUP BY course_id
         ) E ON E.course_id = C.id
         WHERE C.id = ?
      `, [id]);

      if (result.length === 0) {
         return res.status(404).json({ error: "Course not found." });
      }

      res.status(200).json(result[0]);
   } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching course." });
   }
});

// Endpoint for student course enrollment
courseRouter.post("/enroll", studentAuth, async (req, res) => {
   try {
      const studentId = req.student.id;
      const { courseId } = req.body;
      const db = await connectDatabase();

      // Check if student is already enrolled in the course
      const [existingEnrollment] = await db.execute(
         `SELECT * FROM ENROLLMENT
          WHERE student_id = ? AND course_id = ?`,
         [studentId, courseId]
      );
      if (existingEnrollment.length > 0) {
         return res.status(400).json({ error: "You have already enrolled in this course." });
      }

      // Retrieve course access period
      const [courseResult] = await db.execute(
         "SELECT access_period FROM COURSE_DETAILS WHERE course_id = ?", 
         [courseId]
      );

      // Calculate enrollment and expiry dates
      const accessPeriod = courseResult[0]?.access_period || 0;
      const enrollmentDate = new Date().toISOString().split("T")[0];
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + accessPeriod);

      // Insert new enrollment record
      const [result] = await db.execute(
         "INSERT INTO ENROLLMENT (student_id, course_id, enrollment_date, start_date, expiry_date) VALUES (?, ?, ?, ?, ?)",
         [studentId, courseId, enrollmentDate, enrollmentDate, expiryDate.toISOString().split("T")[0]]
      );

      res.json({ message: "Enrollment successful", id: result.insertId });
   } catch (err) {
      console.error("Error during enrollment:", err);
      res.status(500).json({ error: "Failed to enroll in the course." });
   }
});

// Endpoint to retrieve enrolled students for a specific course
courseRouter.get("/enrolled-students/:id", instructorAuth, async (req, res) => {
   try {
      const courseId = req.params.id;
      const db = await connectDatabase();

      // Check if instructor is authorized to view this course
      const [course] = await db.execute(
         "SELECT * FROM COURSES WHERE id = ? AND instructor_id = ?",
         [courseId, req.instructor.id]
      );
      if (course.length === 0) {
         return res.status(403).json({ error: "Unauthorized access to this course or Course not Found." });
      }
      
      // Fetch enrolled students with detailed information
      const [results] = await db.execute(
         `SELECT
            S.id AS student_id,
            S.firstName,
            S.lastName,
            S.email,
            E.enrollment_date,
            E.start_date,
            E.expiry_date
         FROM STUDENT S
         JOIN ENROLLMENT E ON S.id = E.student_id
         WHERE E.course_id = ?`,
         [courseId]
      );

      res.status(200).json(results);
   } catch (err) {
      console.error("Error fetching enrolled students:", err);
      res.status(500).json({ error: "Failed to fetch enrolled students." });
   }
});

module.exports = courseRouter;
