package com.learnsphere.repository;

import com.learnsphere.model.Course;
import com.learnsphere.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Long> {
    List<Module> findByCourseOrderByOrderIndex(Course course);
}
