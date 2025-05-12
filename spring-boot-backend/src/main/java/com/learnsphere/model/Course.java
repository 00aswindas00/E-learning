package com.learnsphere.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    private String title;

    @Size(max = 500)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "instructor_id")
    private User instructor;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "course_students",
               joinColumns = @JoinColumn(name = "course_id"),
               inverseJoinColumns = @JoinColumn(name = "student_id"))
    private List<User> enrolledStudents = new ArrayList<>();
    
    private String imageUrl;
    
    private String category;
    
    private Integer duration; // in hours
    
    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules = new ArrayList<>();
}
