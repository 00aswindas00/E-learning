package com.learnsphere.repository;

import com.learnsphere.model.Course;
import com.learnsphere.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructor(User instructor);
    
    @Query("SELECT c FROM Course c JOIN c.enrolledStudents s WHERE s.id = ?1")
    List<Course> findAllEnrolledCoursesByStudentId(Long studentId);
    
    List<Course> findByTitleContainingIgnoreCase(String keyword);
    
    List<Course> findByCategory(String category);
}
