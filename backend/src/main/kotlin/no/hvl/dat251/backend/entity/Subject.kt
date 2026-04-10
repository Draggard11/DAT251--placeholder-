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
data class Subject(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var subjectCode: String = "Test subject",

    @ManyToMany
    var studyGroups: MutableSet<StudyGroup> = mutableSetOf(),

    @ManyToMany
    var students: MutableSet<Student> =  mutableSetOf()) {

    fun addStudent(student: Student) {
        students.add(student)
    }

    fun addGroup(group: StudyGroup) {
        studyGroups.add(group)
    }



}
