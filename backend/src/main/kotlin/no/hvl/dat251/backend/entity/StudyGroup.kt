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
import jakarta.persistence.OneToOne
import jakarta.persistence.Table
import no.hvl.dat251.backend.entity.Student

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
    var studySessions: MutableSet<StudySession> = mutableSetOf()


) {

    fun addStudent(student: Student) {
        this.students.add(student)
    }
    fun removeStudent(student: Student) {
        this.students.remove(student)
    }

}