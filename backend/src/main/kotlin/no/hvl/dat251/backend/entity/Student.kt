package no.hvl.dat251.backend.entity

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import no.hvl.dat251.backend.exp.Exp
import no.hvl.dat251.backend.exp.ExpObserver
import java.time.LocalDate

@Entity
@Table(name = "STUDENTS")
class Student(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long? = null,
    var name: String,
    var email: String? = null,
    var dateOfBirth: LocalDate? = null,
    var enrollmentDate: LocalDate? = null,
    @Transient
    var xp: Float = 0f,
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var activeSubjects: MutableList<Subject> = mutableListOf(),
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var completedSubjects: MutableList<Subject> = mutableListOf(),
    @OneToMany(cascade = [(CascadeType.MERGE)])
    var studygroups: MutableList<StudyGroup> = mutableListOf(),
    ) : ExpObserver{
    override fun update(xp: Float) {
        this.xp += xp
    }
}