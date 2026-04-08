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
    var activeSubjects: MutableSet<Subject> = mutableSetOf(),
    @ManyToMany(cascade = [(CascadeType.MERGE)])
    var completedSubjects: MutableSet<Subject> = mutableSetOf(),
    @OneToMany(cascade = [(CascadeType.MERGE)])
    var studygroups: MutableSet<StudyGroup> = mutableSetOf()

) {
    fun addStudyGroup(studyGroup: StudyGroup) {
        studygroups.add(studyGroup)
    }
    fun removeStudyGroup(studyGroup: StudyGroup) {
        studygroups.remove(studyGroup)
    }
    fun addActiveSubject(subject: Subject) {
        activeSubjects.add(subject)
    }

    var studygroups: MutableList<StudyGroup> = mutableListOf(),
    ) : ExpObserver{
    override fun update(xp: Float) {
        this.xp += xp
    }
}