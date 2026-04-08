package no.hvl.dat251.backend.entity

import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import java.util.Date

@Entity
@Table(name = "Study_Group")
class StudyGroup (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    var name : String = "Test Group",

    @ManyToMany
    @JoinTable(
        name = "studygroup_students",
        joinColumns = [JoinColumn(name = "studygroup_id")],
        inverseJoinColumns = [JoinColumn(name = "student_id")]
    )
    var students: MutableSet<Student> = mutableSetOf(),

    @OneToMany(mappedBy = "studyGroup", cascade = [CascadeType.MERGE])
    var studySessions: MutableSet<StudySession> = mutableSetOf(),
    val attendance: HashSet<Student> = hashSetOf(),
) {

    fun addStudent(student: Student) {
        this.students.add(student)
    }
    fun removeStudent(student: Student) {
        this.students.remove(student)
    }

    fun createSession(title: String, startTime: Date, endTime: Date, description: String?, maxSize: Int?, subject: Subject?): StudySession {
        val session: StudySession = if (maxSize == null) {
            StudySession(title, students.size, startTime, endTime, subject, description)
        } else {
            StudySession(title, maxSize, startTime, endTime, subject, description)
        }
        studySessions.add(session)
        return session
    }
}