package no.hvl.dat251.backend.entity

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import no.hvl.dat251.backend.entity.Student

@Entity
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
    var students: MutableList<Student> = mutableListOf()

    ) {

    fun addStudent(student: Student) {
        this.students.add(student)
    }
    fun removeStudent(student: Student) {
        this.students.remove(student)
    }

}