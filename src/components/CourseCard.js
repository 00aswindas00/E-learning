import React from 'react';
import './CourseCard.css';

function CourseCard({ course, role }) {
return (
<div className="course-card">
<div className="course-header">
<h3>{course.title}</h3>
{role === 'teacher' && (
<span className="student-count">{course.students} Students</span>
)}
{role === 'student' && (
<span className="instructor">{course.instructor}</span>
)}
</div>

<div className="course-progress">
<div className="progress-label">
<span>Progress</span>
<span>{course.progress || 0}%</span>
</div>
<div className="progress-bar">
<div className="progress-fill" style={{ width: `${course.progress || 0}%` }}></div>
</div>
</div>

<div className="course-actions">
{role === 'teacher' ? (
<>
<button className="primary-btn">Manage</button>
<button className="secondary-btn">Edit</button>
</>
) : (
<>
<button className="primary-btn">Continue</button>
<button className="secondary-btn">Resources</button>
</>
)}
</div>
</div>
);
}

export default CourseCard;