package no.hvl.dat251.backend.entity

import jakarta.persistence.*
import java.time.LocalDate

@Entity
class Student(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,

    var name: String,

    var email: String? = null,
    var dateOfBirth: LocalDate? = null,
    var enrollmentDate: LocalDate? = null,
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var activeSubjects: MutableList<Subject> = mutableListOf(),
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var completedSubjects: MutableList<Subject> = mutableListOf(),
    @OneToMany(cascade = [(CascadeType.MERGE)])
    var studygroups: MutableList<StudyGroup> = mutableListOf()

) {

}